import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Table } from 'antd';
import '../../components/style.css';
import { TableColumnsType, Menu, Empty } from 'antd';
import { NavLink } from 'react-router-dom';
import { GETDATA } from '../../APIurl/url';
import userInfo from '../../getLoggedUser/GetUserInfomation';
import { EyeOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import { Input } from '@nextui-org/react';
import debounce from 'lodash.debounce';
import ViewKanban from '../AgentLead/Deal_Karban';
import { Tooltip } from 'antd';
import Createstudent from '../../pages/agent/Students';
import SortIcon from '@mui/icons-material/Sort';
import Emptyimage from '../../../public/TableEmpty/Empty.jpg';
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
    const [pagerefresh, setpageRefresh] = useState(false);
    const [usertype, SetUserType] = useState('agent');
    const [Showfilter, Setshowfilter] = useState('Table');

    const [Filterhide, setFilterhide] = useState(false);

    const GetStudentData = async () => {
        setLoader(true);
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
                        PAGE_REQUEST: 'STUDENT_DATA_FETCH_ADMIN_SIDE_FULL_ACCESS',
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

    function TableView(pagination: any, filters: any, sorter: any, extra: any) {
        setviewCol(sorter.columnKey);
        setdataview(sorter.order == 'ascend' ? 'asc' : 'desc');
    }

    const onChangePage = (page: any, pageSize: any) => {
        setpage(page);
        setlimit(pageSize);
        setviewCol('ID');
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

                <NavLink to={`/admin/student/view/${event.ID}/${event.CLIENT_ID}`} className="">
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
            title: 'ID',
            className: 'text-style',
            dataIndex: 'ID',
            key: 'ID',
            fixed: 'left',
            width: 100,
            sortDirections: ['ascend', 'descend'],
            sorter: {
                compare: (a: any, b: any) => a.ID - b.ID,
                multiple: 3,
            },
            render: (event, fullInfo: any) => (
                <NavLink to={`/admin/student/view/${event}/${fullInfo.CLIENT_ID}`} className="text-color-blue" data-column="Id">
                    {event}
                </NavLink>
            ),
        },
        {
            className: 'text-style',
            title: 'Client Details',
            dataIndex: 'Client',
            key: 'Client',
            sortDirections: ['ascend', 'descend'],
            sorter: {
                compare: (a: any, b: any) => a.ID - b.ID,
                multiple: 3,
            },

            render: (text: string, fullInfo: any) => (
                <Tooltip color='#006ED9' title={
                    <>
                        <p>Email : {fullInfo.EMAIL}</p>
                        <p>Phone Number : {fullInfo.PHONE_NUMBER}</p>
                        <p>D.O.B : {fullInfo.DATE_OF_BIRTH}</p>
                    </>
                } overlayStyle={{ maxWidth: '100%' }}>
                    <span data-column="Client">{fullInfo.FIRST_NAME} {fullInfo.LAST_NAME}</span>
                </Tooltip>
            ),
        },
        {
            className: 'text-style text-center',
            title: 'Country of Citizenship',
            dataIndex: 'COUNTRY_OF_CITIZENSHIP',
            key: 'COUNTRY_OF_CITIZENSHIP',
            width: 250,
            sorter: {
                compare: (a: any, b: any) => a.ID - b.ID,
                multiple: 3,
            },

            render: (text: string) => (
                <span data-column="Country of Citizenship">{text}</span> // Custom attribute added here
            ),
        },
        {
            className: 'text-style',
            title: 'Passport Number',
            dataIndex: 'PASSPORT_NUMBER',
            key: 'PASSPORT_NUMBER',
            render: (text: string) => (
                <span data-column="Passport Number">{text}</span> // Custom attribute added here
            ),
        },
        {
            className: 'text-style',
            title: 'Passport Expiry Date',
            dataIndex: 'PASSPORT_EXPIRY_DATE',
            key: 'PASSPORT_EXPIRY_DATE',
            render: (text: string) => (
                <span data-column="Passport Expiry Date">{text}</span> // Custom attribute added here
            ),
        },
        {
            className: 'text-style text-center',
            title: 'Gender',
            dataIndex: 'GENDER',
            key: 'GENDER',
            width: 100,
            render: (text: string) => (
                <span data-column="Gender">{text}</span> // Custom attribute added here
            ),
        },
        {
            className: 'text-style text-center',
            title: 'File Status',
            dataIndex: 'AGENT_FILE_STATUS',
            key: 'AGENT_FILE_STATUS',
            fixed: 'right',
            render: (event) => <span data-column="File Status">
                <RenderFunction color={event}>{event}</RenderFunction>
            </span>,
        },
        {
            className: 'text-style text-center',
            title: 'Action',
            fixed: 'right',
            render: (event) => (
                <>
                    <NavLink to={`/admin/student/view/${event.ID}/${event.CLIENT_ID}`} className="" data-column="Action" >
                        <EyeOutlined className="text-blue-900" title="view and edit client record" />
                    </NavLink>
                </>
            ),
            width: 100,
        }

    ];
    const [leftOffset, setLeftOffset] = useState(0); // Initial left offset
    const tableRef: any = useRef(null); // Ref for the table container

    // Function to handle mouse move for scrolling
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

    const handleTabChange = (key: any) => {
        debounceSetFilterCol(key);
    };

    const debounceSetFilterCol = useCallback(
        debounce((key) => {
            Setshowfilter(key);
        }, 300),
        []
    );


    const handleKeyfirstname = (event: any) => {
        const searchTerm = event.target.value;
        handleSearchName(searchTerm);
    };
    return (
        <>
            <div>
                <ul className="flex justify-between">
                    <li>
                        {/* <h4 className="bold-font-700 font-32px">Student Application</h4> */}
                    </li>
                    <li className='crtbtnup'>
                        <div className='flex justify-end btndnadmin'>
                            <Createstudent className="" Refresh={setpageRefresh} />

                            <button
                                className="btn modal-btn-custom adminmobbtns adminsidebtndown"
                                onClick={() => {
                                    Filterhide ? setFilterhide(false) : setFilterhide(true);
                                }}
                            >
                                <SortIcon />
                            </button>

                        </div>


                        {/* <Tabs aria-label="Options" onSelectionChange={handleTabChange}>
                            <Tab key="Table" title={
                                <div className="flex items-center space-x-2">
                                    <TableViewIcon />
                                </div>
                            }>
                            </Tab>
                            <Tab key="Kanban" title={
                                <div className="flex items-center space-x-2">
                                    <ViewKanbanIcon />
                                </div>
                            }>
                            </Tab>

                        </Tabs> */}

                    </li>
                </ul>
            </div>

            {Showfilter == 'Table' ? (
                <div>

                    {
                        Filterhide == true ?
                            < div className="grid  gap-11 set_margin_bottom mt-5">
                                <div className="col-span-3">
                                    <div className="w-full flex flex-col gap-4">
                                        <h3 className="h3_tag adminsidedown"> Application Filter </h3>
                                        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                            <Input size={'md'} type="text" placeholder="Application ID" onChange={handleKeyDown} />
                                            <Input size={'md'} type="text" placeholder="Passport Number" onChange={handleKeyDownPassport} />
                                            <Input size={'md'} type="text" placeholder="Student Email" onChange={handleKeyDownName} />
                                            <Input size={'md'} type="text" placeholder="Student Name" onChange={handleKeyfirstname} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : ''
                    }
                    <br />
                    <div className="table-background scroll-container adtblup" ref={tableRef}>
                        <Table className="" columns={columns} dataSource={ClientRecord} onChange={TableView} loading={loading}
                            locale={{
                                emptyText: (
                                    <Empty
                                        image={
                                            <div className="flex justify-center">
                                                <img src={Emptyimage} alt="No Data" style={{ width: '8%' }} />
                                            </div>
                                        }
                                        description={'No Data Available'} // No description below the image
                                    />
                                ),
                            }}
                            pagination={{
                                current: page,
                                pageSize: limit,
                                total: total_record,
                                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                                showSizeChanger: true,
                                pageSizeOptions: ['10', '20', '50', '100'],
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
                </div >
            ) : <ViewKanban />}
        </>
    );
};

export default App;
