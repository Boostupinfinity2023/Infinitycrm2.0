import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Table } from 'antd';
import './style.css';
import { TableColumnsType, Dropdown, Menu } from 'antd';
import AddStudent from '../Students';
import { NavLink } from 'react-router-dom';
import { GETDATA } from '../../../APIurl/url';
import userInfo from '../../../getLoggedUser/GetUserInfomation';
import { EyeOutlined } from '@ant-design/icons';
import jwt from '../../../getLoggedUser/GetUserInfomation';
import FileTransferModal from './modal/Student_File_Transfer';
import { Tag } from 'antd';
import { Input } from '@nextui-org/react';
import debounce from 'lodash.debounce';
import SortIcon from '@mui/icons-material/Sort';
import { Tooltip } from 'antd';
interface DataType {
    key: string;
    ID: any;
    highestEducation: string;
    studentId: string;
    firstName: string;
    email: string;
    lastName: string;
    nationality: string;
    FIRST_NAME: string;
    owner: string;
    action: any;
    tags: string[];
}


export default function Studentrecord({ pagerefresh }: any) {
    const token = jwt('jwt');
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
    // const [pagerefresh, setpageRefresh] = useState(false);


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
                        'x-token-access': 'true',
                    },
                    body: JSON.stringify({
                        PAGE_REQUEST: 'STUDENT_DATA_NEW',
                        RequesterUser: 'agent',
                        userId: UserAuthID,
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
    }, [ApplicationId, PassportNumber, StudentNameEmail, viewCol, dataview, pagerefresh, StudentName, page, limit]);

    const TableView = (pagination: any, filters: any, sorter: any, extra: any) => {
        const newOrderCol = sorter.columnKey || viewCol;
        const newDataview = sorter.order === 'ascend' ? 'asc' : 'desc';

        // Reset sorting if the same column is clicked
        if (newOrderCol === viewCol) {
            setviewCol(newOrderCol);
            setdataview(newDataview);
        } else {
            setviewCol(newOrderCol);
            setdataview(newDataview);
        }
    };

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
    const menu = (event: any, fullInfo: any) => (
        <Menu>
            <Menu.Item key="1">
                <NavLink to={`/agent/client/view/${fullInfo.ID}/${fullInfo.CLIENT_ID}`} className="ml-3">
                    <EyeOutlined className="text-blue-900" title="view and edit client record" /> View
                </NavLink>
            </Menu.Item>
        </Menu>
    );

    const RenderFunction = ({ color, children }: any) => {
        if (children === 'Rivew') {
            return <Tag data-column="FILE STATUS" color="processing">{children}</Tag>;
        } else if (children === 'On-Hold') {
            return <Tag data-column="FILE STATUS" color="warning">{children}</Tag>;
        } else if (children === 'Completed') {
            return <Tag data-column="FILE STATUS" color="success">{children}</Tag>;
        } else if (children === 'Transfer') {
            return <Tag data-column="FILE STATUS" color="success">{children}</Tag>;
        } else if (children === 'Not-accepted') {
            return <Tag data-column="FILE STATUS" color="success">{children}</Tag>;
        } else if (children === 'In-Hand') {
            return <Tag data-column="FILE STATUS" color="processing">{children}</Tag>;
        } else {
            return <Tag data-column="FILE STATUS" color="default">{children}</Tag>;
        }
    };
    const columns: TableColumnsType = [
        {
            title: 'ID',
            sortDirections: ['ascend', 'descend'],
            sorter: {
                compare: (a: any, b: any) => a.ID - b.ID,
                multiple: 3,
            },
            // ellipsis: true,
            className: 'text-style',
            dataIndex: 'ID',
            key: 'ID',
            fixed: 'left',
            width: 100,
            render: (event, fullInfo: any) => (
                <>
                    <NavLink to={`/agent/client/view/${event}/${fullInfo.CLIENT_ID}`} className="text-color-blue" data-column="ID" >
                        {event}
                    </NavLink>
                </>
            ),
        },
        {
            className: 'text-style',
            title: 'Client NAME',
            dataIndex: 'FIRST_NAME',
            sortDirections: ['ascend', 'descend'],
            sorter: {
                compare: (a: any, b: any) => a.FIRST_NAME - b.FIRST_NAME,
                multiple: 3,
            },
            key: 'FIRST_NAME',
            render: (text: string, fullInfo: any) => (
                <Tooltip color={'#0975de'} title={
                    <>
                        <p><strong>Email :</strong> {fullInfo.EMAIL}</p>
                        <p><strong>Number :</strong> {fullInfo.PHONE_NUMBER}</p>
                        <p><strong>D.O.B :</strong> {fullInfo.DATE_OF_BIRTH}</p>
                        <p><strong>COUNTRY OF CITIZENSHIP :</strong> {fullInfo.COUNTRY_OF_CITIZENSHIP}</p>
                    </>

                }
                    overlayStyle={{ maxWidth: '100%' }} >
                    <NavLink to={`/agent/client/view/${fullInfo.ID}/${fullInfo.CLIENT_ID}`} className="text-color-blue" data-column="Client Name" >
                        <span>{text} {fullInfo.LAST_NAME}</span>
                    </NavLink>
                </Tooltip>
                // <span data-column="First Name">{text}</span> // Custom attribute added here
            ),
        },
        {
            className: 'text-style',
            title: 'PASSPORT',
            dataIndex: 'PASSPORT_NUMBER',
            key: 'PASSPORT_NUMBER',
            render: (text: string) => (
                <span data-column="PASSPORT NUMBER">{text}</span> // Custom attribute added here
            ),
        },
        {
            className: 'text-style',
            title: 'PASSPORT EXPIRY DATE',
            dataIndex: 'PASSPORT_EXPIRY_DATE',
            key: 'PASSPORT_EXPIRY_DATE',
            render: (text: string) => (
                <span data-column="PASSPORT EXPIRY DATE">{text}</span> // Custom attribute added here
            ),
        },
        {
            className: 'text-style text-center',
            title: 'GENDER',
            dataIndex: 'GENDER',
            key: 'GENDER',
            width: 100,
            render: (text: string) => (
                <span data-column="GENDER">{text}</span> // Custom attribute added here
            ),
        },
        {
            className: 'text-style text-center',
            title: 'FILE STATUS',
            dataIndex: 'AGENT_FILE_STATUS',
            key: 'AGENT_FILE_STATUS',
            fixed: 'right',
            width: 150,
            render: (event) => <RenderFunction color={event}>
                {event}
            </RenderFunction>,
        },
        {
            className: 'text-style text-center',
            title: 'Action',
            fixed: 'right',
            render: (event, fullInfo) => (
                <>
                    <NavLink to={`/agent/client/view/${fullInfo.ID}/${fullInfo.CLIENT_ID}`} className="ml-3" data-column="Action">
                        <EyeOutlined className="text-blue-900" title="view and edit client record" />
                    </NavLink>
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

        const minLeftOffset = 0;
        const maxLeftOffset = 55;

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

    const handleKeyfirstname = (event: any) => {
        const searchTerm = event.target.value;
        handleSearchName(searchTerm);
    };

    return (
        <div className='grid gap-3'>
            <div className='flex justify-end'>
                <button
                    className="btn modal-btn-custom stubtnup"
                    onClick={() => {
                        Filterhide ? setFilterhide(false) : setFilterhide(true);
                    }}
                >
                    <SortIcon />
                </button>

            </div>

            {Filterhide == true ?
                <div className="grid  gap-3">
                    <div className="col-span-3">
                        <div className="w-full flex flex-col gap-4">
                            <h3 className="h3_tag">Search Application Data</h3>
                            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                <Input size={'md'} type="text" className="color_placeholder" placeholder="Application ID" onChange={handleKeyDown} />
                                <Input size={'md'} type="text" className="color_placeholder" placeholder="Passport Number" onChange={handleKeyDownPassport} />
                                <Input size={'md'} type="text" className="color_placeholder" placeholder="Student Email" onChange={handleKeyDownName} />
                                <Input size={'md'} type="text" className="color_placeholder" placeholder="Student Name" onChange={handleKeyfirstname} />
                            </div>
                        </div>
                    </div>

                </div>
                : ''}
            <div className="table-background scroll-container sturectbup" ref={tableRef}>
                <Table

                    className="my-class-table table w-full Student-record"
                    columns={columns}
                    dataSource={ClientRecord}
                    scroll={{ x: 'max-content' }}
                    onChange={TableView}
                    loading={loading}
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


            </div>
            <div className="justify-end">{/* <Pagination total={10} initialPage={1} /> */}</div>
        </div>
    );
};
