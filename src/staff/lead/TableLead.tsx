import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Table } from 'antd';
import '../../pages/agent/student/style.css';
import { TableColumnsType, Dropdown, Menu, message } from 'antd';
import { NavLink } from 'react-router-dom';
import { GETDATA } from '../../APIurl/url';
import { v1GETDATA } from '../../APIurl/url';
import userInfo from '../../getLoggedUser/GetUserInfomation';
import { EyeOutlined, DeleteOutlined, MailOutlined, FileDoneOutlined, MoreOutlined, CheckCircleOutlined, ClockCircleOutlined, SyncOutlined, CheckOutlined } from '@ant-design/icons';
import jwt from '../../getLoggedUser/GetUserInfomation';
import Rejectfile from '../../staff/Rejectfile';
import Fullview from '../../staff/application/tab/Full_infomation';
import Commentview from './Commentview';
import { Tag } from 'antd';
import { debounce } from 'lodash';
import Swal from 'sweetalert2';
import { Tooltip } from 'antd';
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
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

export default function TableLead() {
    const token = jwt('jwt');
    const [loading, setLoader] = useState(true);
    const [limit, setlimit] = useState(10);
    const [page, setpage] = useState(1);
    const [dataview, setdataview] = useState('asc');
    const [viewCol, setviewCol] = useState('ID');
    const [total_record, set_total_record] = useState(0);
    const [ApplicationId, setApplicationId] = useState('');
    const [PassportNumber, setPassportNumber] = useState('');
    const [StudentNameEmail, setStudentNameEmail] = useState('');
    const [ClientRecord, setClientRecord] = useState([]);
    const [pagerefresh, setpageRefresh] = useState(false);
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
                StudentNameEmail,
                {
                    method: 'POST',
                    headers: {
                        Authenticate: `Bearer ${token}`,
                        'x-token-access': 'true',
                    },
                    body: JSON.stringify({
                        PAGE_REQUEST: 'Staffdata.getStudent.leaderboard',
                        RequesterUser: 'Staff',
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

    //modal show and hide


    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [ID, setID] = React.useState();
    const [DecryptID, setdecryptID] = React.useState();

    const openModal = (ID: any, decryptID: any) => {

        setdecryptID(decryptID);
        setID(ID);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    //modal comment
    const [iscommentOpen, setIscommentOpen] = React.useState(false);
    const [Comment, Setcomment] = React.useState();


    const openCOmment = (Comment: any) => {
        setIscommentOpen(true);
        Setcomment(Comment);
    };

    const closecomment = () => {
        setIscommentOpen(false);
    };


    //handle Accept file funcation

    const HandleAcceptfun = (File_ID: any, Client_ID: any, SENDER_ID: any) => {
        Swal.fire({
            title: 'Are you sure?',
            // text: "Do you accept this file?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {

                const Acceptfile = async () => {
                    const payload = { REQUEST: 'File.Acceept.Staff.', is_Admin: false, isValid: true };
                    const secretKey = 'JwtSecret';
                    const currentTimestampInSeconds = Math.floor(Date.now() / 1000);
                    const expirationTimestampInSeconds = currentTimestampInSeconds + 20;
                    const expiresIn = expirationTimestampInSeconds - currentTimestampInSeconds;

                    try {
                        const responseData: any = await fetch(v1GETDATA + '?action=Update.client.record', {
                            method: 'POST',
                            headers: {
                                Authenticate: `Bearer ${token}`,
                                'x-token-access': 'true',
                            },
                            body: JSON.stringify({
                                PAGE_REQUEST: 'File.Acceept.Staff.Client.',
                                RequesterUser: 'Staff',
                                File_ID: File_ID,
                                Client_ID: Client_ID,
                                SENDER_ID: SENDER_ID,
                            }),
                        });
                        const data = await responseData.json();

                        if (data.status == true) {
                            message.success("Accepted");
                            setpageRefresh(true);
                        } else {
                            message.error("something Wrong!");
                        }

                    } catch (err) {
                        console.error(err);
                    }
                };

                Acceptfile();


            }
        });
    }


    // Handle Reject application file
    const HandleRejectfun = (File_ID: any, Client_ID: any, SENDER_ID: any) => {
        Swal.fire({
            text: "Do you want to reject this file?",
            // icon: 'warning',
            input: 'textarea',
            inputPlaceholder: 'Enter your reason for rejection...',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            reverseButtons: true,
            preConfirm: (comment) => {
                if (!comment) {
                    Swal.showValidationMessage('You need to provide a reason for rejection');
                }
                return comment;
            }
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                const comment = result.value; // Get the rejection comment from Swal

                const RejectFile = async () => {
                    try {
                        const responseData: any = await fetch(v1GETDATA + '?action=Update.client.record', {
                            method: 'POST',
                            headers: {
                                Authenticate: `Bearer ${token}`,
                                'x-token-access': 'true',
                            },
                            body: JSON.stringify({
                                PAGE_REQUEST: 'File.Reject.Staff.Client.',
                                RequesterUser: 'Staff',
                                File_ID: File_ID,
                                Client_ID: Client_ID,
                                SENDER_ID: SENDER_ID,
                                Comment: comment,
                            }),
                        });
                        const data = await responseData.json();

                        if (data.status == true) {
                            message.success("Rejected");
                            setpageRefresh(true);
                        } else {
                            message.error("something Wrong!");
                        }

                    } catch (err) {
                        console.error(err);
                        Swal.fire(
                            'Error!',
                            'There was an error processing your request.',
                            'error'
                        );
                    }
                };

                RejectFile();
            }
        });
    }



    const storedUserId = sessionStorage.getItem('studentdataloader');
    useEffect(() => {
        GetStudentData();
        if (storedUserId) {
            sessionStorage.clear();
        }
    }, [ApplicationId, PassportNumber, StudentNameEmail, viewCol, dataview, pagerefresh, page]);

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


    const menu = (event: any, fullInfo: any) => (
        <Menu>
            <Menu.Item key="1">
                <NavLink to="#" className="ml-3" title="View client Details" onClick={() => { openModal(fullInfo.ID, fullInfo.decryptID) }}>
                    <EyeOutlined className="text-blue-900" /> View
                </NavLink>
            </Menu.Item>
            {/* <Menu.Item key="2">
                <NavLink to={'#'} className="ml-3" title="View Agent Comment" onClick={() => { openCOmment(fullInfo.SENDER_COMMENT) }}>
                    <EyeOutlined /> View Agent Comment
                </NavLink>
            </Menu.Item> */}
            <Menu.Item key="3">
                <NavLink to="#" className="ml-3" title="Accept File" onClick={() => { HandleAcceptfun(fullInfo.File_ID, fullInfo.CLIENT_ID, fullInfo.SENDER_ID) }}>
                    <MailOutlined className="text-blue-900" /> Accept File
                </NavLink>
            </Menu.Item>
            <Menu.Item key="4">
                <NavLink to={'#'} className="ml-3" title="delete client record" onClick={() => { HandleRejectfun(fullInfo.File_ID, fullInfo.CLIENT_ID, fullInfo.SENDER_ID) }}>
                    <DeleteOutlined className="text-red-500" /> Reject file
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
            className: 'text-style',
            title: 'First Name',
            dataIndex: 'FIRST_NAME',
            sortDirections: ['ascend', 'descend'],
            sorter: {
                compare: (a: any, b: any) => a.ID - b.ID,
                multiple: 3,
            },
            ellipsis: true,
            key: 'FIRST_NAME',
            render: (event, fullInfo: any) => (
                <>
                    <Tooltip color='#006ed9' title={
                        <>
                            <p>Email : {fullInfo.EMAIL}</p>
                            <p>Phone Number : {fullInfo.PHONE_NUMBER}</p>
                            <p>D.O.B : {fullInfo.DATE_OF_BIRTH}</p>
                        </>
                    } overlayStyle={{ maxWidth: '100%' }} >
                        <span data-column="First Name">{fullInfo.FIRST_NAME} {fullInfo.LAST_NAME}</span>
                    </Tooltip>

                </>
            ),
        },
        {
            className: 'text-style',
            title: 'Country of Citizenship',
            dataIndex: 'COUNTRY_OF_CITIZENSHIP',
            key: 'COUNTRY_OF_CITIZENSHIP',
            sorter: {
                compare: (a: any, b: any) => a.ID - b.ID,
                multiple: 3,
            },
            ellipsis: true,

            render: (text) => <span data-column="Country of Citizenship">{text}</span>,
        },
        {
            className: 'text-style',
            title: 'Passport Number',
            dataIndex: 'PASSPORT_NUMBER',
            key: 'PASSPORT_NUMBER',
            render: (text) => <span data-column="Passport Number">{text}</span>,
        },
        {
            className: 'text-style',
            title: 'Passport Expiry Date',
            dataIndex: 'PASSPORT_EXPIRY_DATE',
            key: 'PASSPORT_EXPIRY_DATE',
            render: (text) => <span data-column="Passport Expiry Date">{text}</span>,
        },
        {
            className: 'text-style ',
            title: 'Gender',
            dataIndex: 'GENDER',
            key: 'GENDER',
            render: (text) => <span data-column="Gender">{text}</span>,
        },
        {
            className: 'text-style text-center',
            title: 'Action',
            fixed: 'right',
            render: (event, fullInfo: any) => (
                <Dropdown overlay={menu(event, fullInfo)} trigger={['click']}>
                    <a data-column="Action" className="ant-dropdown-link text-xl" onClick={(e) => e.preventDefault()}>
                        <MoreOutlined />
                    </a>
                </Dropdown>
            ),
            width: 100,
        },
    ];

    const [leftOffset, setLeftOffset] = useState(0); // Initial left offset
    const tableRef: any = useRef(null); // Ref for the table container

    const moveScroll = (event: any) => {
        const movementX = event.nativeEvent.movementX;
        const newLeftOffset = leftOffset + movementX;


        const minLeftOffset = 0;
        const maxLeftOffset = 55;

        if (newLeftOffset >= minLeftOffset && newLeftOffset <= maxLeftOffset) {
            setLeftOffset(newLeftOffset);
            if (tableRef.current) {
                tableRef.current.scrollLeft = '500px';

                tableRef.current.scrollLeft = (newLeftOffset / maxLeftOffset) * (tableRef.current.scrollWidth - tableRef.current.clientWidth);
            }
        }
    };
    const sizes = ['sm'];
    const table_heading: any = [

        { key: 'FIRST_NAME', label: 'First Name' },
        { key: 'FIRST_NAME', label: 'First Name' },
        { key: 'LAST_NAME', label: 'Last Name' },
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

    return (
        <>
            {isModalOpen ? <Fullview isOpen={isModalOpen} onClose={closeModal} client_id={ID} encrypt_id={DecryptID} /> : ''}


            <Tabs aria-label="Options">
                <Tab key="All_Application" title="All Applications">
                    <div>
                        <ul className="flex justify-between mt-3">
                            <li>
                                <h4 className="bold-font-700 aplicaton-font">Application Record</h4>
                            </li>
                            <li className="flex appacstafbtn">
                                <button
                                    className="btn btn-primary btn-sm h-[35px]"
                                    onClick={() => {
                                        pagerefresh ? setpageRefresh(false) : setpageRefresh(true);
                                    }}
                                >
                                    Refresh
                                </button>
                            </li>
                        </ul>
                    </div>


                    <div className="table-background staftabappli" ref={tableRef}>
                        <Table
                            className="my-class-table table"
                            columns={columns}
                            dataSource={ClientRecord}
                            // scroll={{ x: 2000 }}
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

                        {/* <div id="mini-map" className="css-18v91cr">
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
                </div> */}
                    </div>
                </Tab>


                <Tab key="photos" title="Rejected Applications">
                    <Rejectfile />
                </Tab>
            </Tabs>


            <div className="justify-end">{/* <Pagination total={10} initialPage={1} /> */}</div>

            {/* Comment modal */}
            <Commentview isOpen={iscommentOpen} onClose={closecomment} Comment={Comment} />
        </>
    );
};
