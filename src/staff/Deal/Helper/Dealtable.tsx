import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Table } from 'antd';
import '../../../components/style.css';
import { TableColumnsType, Dropdown, Menu, message } from 'antd';
import { NavLink } from 'react-router-dom';
import { GETDATA } from '../../../APIurl/url';
import { v1GETDATA } from '../../../APIurl/url';
import userInfo from '../../../getLoggedUser/GetUserInfomation';
import { EyeOutlined, DeleteOutlined, MailOutlined, FileDoneOutlined, MoreOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import { Input, Select, SelectItem } from '@nextui-org/react';
import debounce from 'lodash.debounce';
import Swal from 'sweetalert2';
import { Tooltip } from 'antd';
import SortIcon from '@mui/icons-material/Sort';
interface DataType {
    key: string;
    highestEducation: string;
    studentId: string;
    firstName: string;
    email: string;
    lastName: string;
    nationality: string;
    owner: string;
    action: any;
    tags: string[];
}

const App: React.FC = () => {
    const token = userInfo('jwt');
    const [loading, setLoader] = useState(true);
    const [limit, setlimit] = useState(10);
    const [page, setpage] = useState(1);
    const [dataview, setdataview] = useState('desc');
    const [viewCol, setviewCol] = useState('ID');
    const [total_record, set_total_record] = useState(0);
    const [ApplicationId, setApplicationId] = useState('');
    const [PassportNumber, setPassportNumber] = useState('');
    const [StudentNameEmail, setStudentNameEmail] = useState('');
    const [StudentName, setStudentName] = useState('');
    const [ClientRecord, setClientRecord] = useState([]);
    const [Dealstatus, Setdealstatus] = useState([]);
    const [pagerefresh, setpageRefresh] = useState(false);
    const [usertype, SetUserType] = useState('agent');


    const [Filterhide, setFilterhide] = useState(false);

    const GetStudentData = async () => {
        setLoader(true);
        setpageRefresh(false);
        const UserAuthID = await userInfo('auth_token');
        try {
            const responseData: any = await fetch(
                GETDATA +
                '?action=view.client.record&limit=' +
                limit +
                '&page=' +
                page +
                '&orderby=' +
                dataview +
                '&orderCol=' +
                viewCol +
                '&ApplicationId=' +
                ApplicationId +
                '&passportId=' +
                PassportNumber +
                '&StudentNameEmail=' +
                StudentNameEmail +
                '&StudentName=' +
                StudentName,
                {
                    method: 'POST',
                    headers: {
                        Authenticate: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        PAGE_REQUEST: 'DEAL_DATA_FETCH_STAFF_SIDE_TABLE',
                        UserRole: usertype,
                    }),
                }
            );
            const data = await responseData.json();
            setClientRecord(data.data);
            set_total_record(data.total);
            setLoader(false);
        } catch (err) {
            console.error(err);
            setLoader(false);
        }
    };

    const storedUserId = sessionStorage.getItem('studentdataloader');
    const debouncedGetStudentData = debounce(GetStudentData, 300);
    useEffect(() => {
        debouncedGetStudentData();
        if (storedUserId) {
            sessionStorage.clear();
        }
    }, [ApplicationId, PassportNumber, StudentNameEmail, viewCol, dataview, pagerefresh, usertype, StudentName, page, limit]);


    const GETDEALSTATUS = async () => {
        try {
            const responseData: any = await fetch(
                v1GETDATA,
                {
                    method: 'POST',
                    headers: {
                        Authenticate: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        PAGE_REQUEST: 'DEAL.STATUS.FETCH',
                        'StatusType': 'Deal',
                    }),
                }
            );
            const data = await responseData.json();
            Setdealstatus(data.data);
        } catch (err) {
            console.error(err);
        }
    };

    const debouncedGetDealstatus = debounce(GETDEALSTATUS, 300);
    useEffect(() => {
        debouncedGetDealstatus();
    }, []);

    const HandaleDealstatus = async (Status_ID: any, Deal_ID: any) => {
        try {
            const { value: comment } = await Swal.fire({
                title: 'Comment',
                input: 'textarea',
                inputPlaceholder: 'Type your comment here...',
                inputAttributes: {
                    'aria-label': 'Type your comment here',
                },
                confirmButtonText: 'Submit',
                cancelButtonText: 'Cancel',
                showCancelButton: true,
                reverseButtons: true,
            });

            if (comment) {
                const responseData: any = await fetch(v1GETDATA, {
                    method: 'POST',
                    headers: {
                        Authenticate: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        PAGE_REQUEST: 'DEAL.STATUS.UPDATE',
                        StatusType: 'Deal',
                        Status_ID: Status_ID,
                        Deal_ID: Deal_ID,
                        Comment: comment, // Include the comment in the request body
                    }),
                });
                const data = await responseData.json();
                if (data.status == true) {
                    message.success('Lead status Changed');
                    setpageRefresh(true);
                } else {
                    message.error(data.message);
                }
            } else {
                message.warning('Comments is required');
            }
        } catch (err) {
            console.error(err);
            Swal.fire('Error', 'An error occurred while updating the deal status', 'error');
        }
    };



    function TableView(pagination: any, filters: any, sorter: any, extra: any) {
        setviewCol(sorter.columnKey);
        setdataview(sorter.order == 'ascend' ? 'asc' : 'desc');
    }

    const onChangePage = (page: any, pageSize: any) => {
        setpage(page);
        setlimit(pageSize);
    };
    const items: any['items'] = [
        {
            label: '1st menu item',
            key: '1',
            icon: <EyeOutlined />,
        },
        {
            label: '2nd menu item',
            key: '2',
            icon: <EyeOutlined />,
        },
        {
            label: '3rd menu item',
            key: '3',
            icon: <EyeOutlined />,
            danger: true,
        },
        {
            label: '4rd menu item',
            key: '4',
            icon: <EyeOutlined />,
            danger: true,
            disabled: true,
        },
    ];

    //File Transfer
    function FileTransfer(event: any) {
        setTransferFile(true);
        setTransferFileInfo(event);
    }

    const [isfileTransfer, setTransferFile] = useState(false);
    const [isfileTransferInfo, setTransferFileInfo] = useState('');
    const menu = (event: any) => (
        <Menu>
            <Menu.Item key="1">

                <NavLink to={`/staff/client/view/${event.ID}/${event.application_id}/${event.CLIENT_ID}/staff`} className="">
                    <EyeOutlined className="text-blue-900" title="view and edit client record" />
                </NavLink>
            </Menu.Item>
        </Menu>
    );

    const RenderFunction = ({ color, children }: any) => {
        if (children === 'Rivew') {
            return <Tag color="processing">{children}</Tag>;
        } else if (children === 'On-Hold') {
            return <Tag color="warning">{children}</Tag>;
        } else if (children === 'Completed') {
            return <Tag color="success">{children}</Tag>;
        } else if (children === 'Transfer') {
            return <Tag color="success">{children}</Tag>;
        } else if (children === 'Not-accepted') {
            return <Tag color="success">{children}</Tag>;
        } else if (children === 'In-Hand') {
            return <Tag color="processing">{children}</Tag>;
        } else {
            return <Tag color="default">{children}</Tag>;
        }
    };
    const columns: TableColumnsType<DataType> = [

        {
            title: 'Application ID',
            className: 'text-style',
            dataIndex: 'ID',
            key: 'ID',

            sortDirections: ['ascend', 'descend'],
            sorter: {
                compare: (a: any, b: any) => a.ID - b.ID,
                multiple: 3,
            },
            render: (event, fullInfo: any) => (
                <NavLink to={`/staff/client/view/${fullInfo.ID}/${fullInfo.application_id}/${fullInfo.CLIENT_ID}/staff`} className="text-color-blue" data-column="Application ID">
                    {fullInfo.application_id}
                </NavLink>
            ),
        },
        {
            className: 'text-style',
            title: 'Client Detail',
            dataIndex: 'EMAIL',
            key: 'EMAIL',
            width: 250,
            render: (event, fullInfo: any) => (
                <Tooltip color='#006ed9' title={fullInfo.EMAIL}>
                    <NavLink to={`/staff/client/view/${fullInfo.ID}/${fullInfo.application_id}/${fullInfo.CLIENT_ID}/staff`} className="text-color-blue" data-column="Application ID">
                        <span>{fullInfo.FIRST_NAME} {fullInfo.LAST_NAME}</span>
                    </NavLink>
                </Tooltip>


            ),
        },
        {
            className: 'text-style',
            title: 'Agent Detail',
            dataIndex: 'AGENT',
            key: 'AGENT',
            width: 250,
            render: (event, fullInfo: any) => (
                <Tooltip color='#006ed9' title={JSON.parse(fullInfo.CREATE_INFO).CREATE_EMAIL}>
                    <span data-column="Agent Detail">{JSON.parse(fullInfo.CREATE_INFO).CREATE_NAME}</span>
                </Tooltip>
            ),
        },

        {
            className: 'text-style',
            title: 'Client Number',
            dataIndex: 'PHONE_NUMBER',
            key: 'PHONE_NUMBER',
            render: (text: string) => (
                <span data-column="Client Number">{text}</span>
            ),
        },
        {
            className: 'text-style',
            title: 'Client D.O.B',
            dataIndex: 'DATE_OF_BIRTH',
            key: 'DATE_OF_BIRTH',
            width: 150,
            render: (text: string) => (
                <span data-column="Client D.O.B">{text}</span>
            ),
        },
        {
            className: 'text-style',
            title: 'Client Passport No.',
            dataIndex: 'PASSPORT_NUMBER',
            key: 'PASSPORT_NUMBER',
            render: (text: string) => (
                <span data-column="Client Passport No.">{text}</span>
            ),
        },
        {
            className: 'text-style text-center',
            title: 'Application Status',
            dataIndex: 'DEAL_STATUS',
            key: 'DEAL_STATUS',
            fixed: 'right',
            width: 450,
            render: (event, fullInfo: any) => (
                <Select
                    items={Dealstatus}
                    placeholder="Select Column Heading"
                    aria-label="Select Column Heading"
                    size={'sm'}
                    selectedKeys={[`${event}`]}
                    onChange={(e) => {
                        HandaleDealstatus(e.target.value, fullInfo.ID);
                    }}
                >
                    {(Dealstatus: any) => <SelectItem key={Dealstatus.ID}>{Dealstatus.STATUS}</SelectItem>}
                </Select>
            ),
        },
        {
            className: 'text-style text-center',
            title: 'Action',
            fixed: 'left',
            render: (event) => (
                <>
                <span data-column="Action">
                    <NavLink to={`/staff/client/view/${event.ID}/${event.application_id}/${event.CLIENT_ID}/staff`} className="">
                        <EyeOutlined className="text-blue-900" title="view and edit client record" />
                    </NavLink>
                    </span>
                </>
            ),
            width: 100,
        },
    ];

    const [leftOffset, setLeftOffset] = useState(0);
    const tableRef: any = useRef(null);
    const moveScroll = (event: any) => {
        const movementX = event.nativeEvent.movementX;
        const newLeftOffset = leftOffset + movementX;

        // Adjust these constants based on your specific setup
        const minLeftOffset = 0;
        const maxLeftOffset = 55; // Adjust this based on your actual maximum scroll width

        // Ensure newLeftOffset stays within the min-max range
        if (newLeftOffset >= minLeftOffset && newLeftOffset <= maxLeftOffset) {
            setLeftOffset(newLeftOffset);
            if (tableRef.current) {
                tableRef.current.scrollLeft = '500px';
                console.log(tableRef.current.clientWidth);
                tableRef.current.scrollLeft = (newLeftOffset / maxLeftOffset) * (tableRef.current.scrollWidth - tableRef.current.clientWidth);
            }
        }
    };
    const sizes = ['sm'];
    const table_heading: any = [
        { key: 'ID', label: 'ID' },
        { key: 'EMAIL', label: 'Email Id' },
        { key: 'FIRST_NAME', label: 'First Name' },
        { key: 'LAST_NAME', label: 'Last Name' },
        { key: 'PHONE_NUMBER', label: 'Phone Number' },
        { key: 'DATE_OF_BIRTH', label: 'Date Of Birth' },
        { key: 'Country Of Citizenship', label: 'Country Of Citizenship' },
        { key: 'PASSPORT_NUMBER', label: 'Passport' },
        { key: 'PASSPORT_EXPIRY_DATE', label: 'Passport Expiry Date' },
    ];
    const OrderBy: any = [
        { key: 'asc', label: 'asc' },
        { key: 'desc', label: 'desc' },
    ];

    const userRole: any = [
        { key: 'agent', label: 'agent' },
        { key: 'staff', label: 'staff' },
    ];
    const handleSearch = useCallback(
        debounce((searchTerm) => {
            setApplicationId(searchTerm);
        }, 200),
        []
    );

    const handleSearchPassport = useCallback(
        debounce((searchTerm) => {
            setPassportNumber(searchTerm);
        }, 200),
        []
    );

    const handleSearchNameEmail = useCallback(
        debounce((searchTerm) => {
            setStudentNameEmail(searchTerm);
        }, 200),
        []
    );
    const handleSearchName = useCallback(
        debounce((searchTerm) => {
            setStudentName(searchTerm);
        }, 200),
        []
    );

    const handleKeyDown = (event: any) => {
        const searchTerm = event.target.value;
        handleSearch(searchTerm);
    };

    const handleKeyDownPassport = (event: any) => {
        const searchTerm = event.target.value;
        handleSearchPassport(searchTerm);
    };

    const handleKeyDownName = (event: any) => {
        const searchTerm = event.target.value;
        handleSearchNameEmail(searchTerm);
    };

    const handleKeyName = (event: any) => {
        const searchTerm = event.target.value;
        handleSearchName(searchTerm);
    };

    return (
        <div>

            <div className='flex justify-end'>
                <button
                    className="btn bg-primary text-white"
                    onClick={() => {
                        Filterhide ? setFilterhide(false) : setFilterhide(true);
                    }}
                >
                    <SortIcon />
                </button>

            </div>

            {Filterhide == true ?
                <div className="grid  gap-11 set_margin_bottom">
                    <div className="col-span-3">
                        <div className="w-full flex flex-col gap-4">
                            <h3 className="h3_tag text-2xl"> Application Filters </h3>
                            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                <Input size={'md'} type="text" placeholder="Application ID" onChange={handleKeyDown} />
                                <Input size={'md'} type="text" placeholder="Client Passport No." onChange={handleKeyDownPassport} />
                                <Input size={'md'} type="text" placeholder="Client Email" onChange={handleKeyDownName} />
                                <Input size={'md'} type="text" placeholder="Client Name" onChange={handleKeyName} />
                            </div>
                        </div>
                    </div>

                </div>
                : ''}
            <br />
            <div className="table-background scroll-container" ref={tableRef}>
                <Table className="" columns={columns} dataSource={ClientRecord} onChange={TableView} loading={loading}
                    pagination={{
                        current: page,
                        pageSize: limit,
                        total: total_record,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                        showSizeChanger: true,
                        pageSizeOptions: ['20', '50', '100'],
                        onChange: onChangePage,
                    }}
                />

                <div id="mini-map" className="css-18v91cr">
                    <div className="css-hxyrcv">
                        <span style={{ display: 'inline-flex' }}>
                            <div aria-label="column-0" className="css-1czhqfs" />
                            <div aria-label="column-1" className="css-1czhqfs" />
                            <div aria-label="column-2" className="css-1czhqfs" />
                            <div aria-label="column-3" className="css-1czhqfs" />
                            <div aria-label="column-4" className="css-1czhqfs" />
                            <div aria-label="column-5" className="css-1czhqfs" />
                            <div aria-label="column-6" className="css-1czhqfs" />
                            <div aria-label="column-7" className="css-1czhqfs" />
                        </span>
                        <div className="css-11cntbg" style={{ left: `${leftOffset}px` }} onMouseMove={moveScroll} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
