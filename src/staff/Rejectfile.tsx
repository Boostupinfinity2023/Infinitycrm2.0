
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Table } from 'antd';
import '../pages/agent/student/style.css';
import { TableColumnsType, Dropdown, Menu, Empty } from 'antd';
import { NavLink } from 'react-router-dom';
import { GETDATA } from '../APIurl/url';
import { v1GETDATA } from '../APIurl/url';
import userInfo from '../getLoggedUser/GetUserInfomation';
import { EyeOutlined, DeleteOutlined, MailOutlined, FileDoneOutlined, MoreOutlined, CheckCircleOutlined, ClockCircleOutlined, SyncOutlined, CheckOutlined } from '@ant-design/icons';
import jwt from '../getLoggedUser/GetUserInfomation';

import Fullview from '../staff/application/tab/Full_infomation';
import { Tag } from 'antd';
import { Input, Select, SelectItem, User } from '@nextui-org/react';
import { Pagination } from '@nextui-org/react';
import { debounce } from 'lodash';
import Swal from 'sweetalert2';
import { Tooltip } from 'antd';
import Emptyimage from '../../public/TableEmpty/Empty.jpg';
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
                        PAGE_REQUEST: 'Staff.Reject.file',
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
            text: "Do you accept this file?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, accept it!'
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
                            Swal.fire(
                                'Accepted!',
                                'You have accepted the file.',
                                'success'
                            );
                            setpageRefresh(true);
                        } else {
                            Swal.fire(
                                'Something Wrong!',
                                'Error! To Accepted the file',
                                'error'
                            );
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
            confirmButtonText: 'Yes, reject it!',
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
                                Comment: comment, // Include the comment in the payload
                            }),
                        });
                        const data = await responseData.json();

                        if (data.status == true) {
                            Swal.fire(
                                'Rejected!',

                                'success'
                            );
                            setpageRefresh(true);
                        } else {
                            Swal.fire(
                                'Something went wrong!',
                                'Error! Unable to reject the file.',
                                'error'
                            );
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
    }, [ApplicationId, PassportNumber, StudentNameEmail, viewCol, dataview, pagerefresh]);

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
                <NavLink to="#" className="ml-3" title="View client Details" onClick={() => { openModal(fullInfo.CLIENT_ID, fullInfo.decryptID) }}>
                    <EyeOutlined className="text-blue-900" /> View
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
    const truncateText = (text: any, limit: any) => {
        return text.length > limit ? text.substring(0, limit) + "..." : text;
    };
    const columns: TableColumnsType<DataType> = [

        {
            className: 'text-style',
            title: 'Client Details',
            dataIndex: 'FIRST_NAME',
            key: 'FIRST_NAME',
            width: 100,
            render: (text, fullInfo: any) => (
                <Tooltip color='#006ed9' title={
                    <div>
                        <p>Email: {fullInfo.EMAIL}</p>
                        <p>Phone: {fullInfo.PHONE_NUMBER}</p>
                        <p>Gender: {fullInfo.GENDER}</p>
                        <p>Passport Number: {fullInfo.PASSPORT_NUMBER}</p>
                        <p>Passport Expiry Date: {fullInfo.PASSPORT_EXPIRY_DATE}</p>
                    </div>
                } overlayStyle={{ maxWidth: '100%' }} >
                    <span data-column="Client Details">{text} {fullInfo.LAST_NAME}</span>
                </Tooltip>
            ),
        },
        {
            className: 'text-style',
            title: 'Agent Details',
            dataIndex: 'Agent',
            key: 'Agent',
            width: 100,
            render: (text, fullInfo: any) => (
                <span data-column="Agent Details">
                <User className="imghidemob"
                    name={fullInfo.Agent_Name}
                    description={fullInfo.Agent_Email}
                    avatarProps={{
                        src: `${fullInfo.Agent_profile}`,
                        showFallback: true
                    }}
                />
                </span>
            ),
        },
        {
            className: 'text-style',
            title: 'Responsive Person',
            dataIndex: 'Responsive_person',
            key: 'Responsive_person',
            width: 100,
            render: (text, fullInfo: any) => (
                <>
                <span data-column="Responsive Person" className='truncate'>
                <User className="imghidemob"
                    name={fullInfo.RESPONSIVE_PERSON_Name}
                    description={fullInfo.RESPONSIVE_PERSON_Email}
                    avatarProps={{
                        src: `${fullInfo.RESPONSIVE_PERSON_profile}`,
                        showFallback: true
                    }}
                />
                </span>
                </>           
            ),
        },
        {
            className: 'text-style',
            title: 'Current Status',
            dataIndex: 'CURRENT_STATUTS',
            key: 'CURRENT_STATUTS',
            width: 100,
            render: (text) =>
                <span data-column="Current Status">{text}</span>,
        },
        {
            className: 'text-style',
            title: 'Rejected Comment',
            dataIndex: 'Rejected_Comment',
            key: 'Rejected_Comment',
            width: 40,
            render: (text) => <>
                <Tooltip color='#006ed9' title={
                    <div>
                        <p>{text}</p>
                    </div>
                }>
                    <span className='truncate' data-column="Reject Comment">{truncateText(text, 25)}</span>
                </Tooltip>
            </>,
        }, 
        {
            className: 'text-style',
            title: 'Action',
            fixed: 'right',
            render: (event, fullInfo: any) => (
               <span data-column="Action">
                <NavLink to="#" className="ml-3" title="View client Details" onClick={() => { openModal(fullInfo.CLIENT_ID, fullInfo.decryptID) }}>
                    <EyeOutlined className="text-blue-900" />
                </NavLink>
                </span>
            ),
            width: 100,
        }

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
            <div>
                <ul className="flex justify-between mt-3">
                    <li>
                        <h4 className="bold-font-700 aplicaton-font">Rejected Application</h4>
                    </li>
                    <li className="flex rejectadmnbtn">
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
            <div className="grid grid-cols-5 gap-11 set_margin_bottom">
                <div className="col-span-3">

                </div>
                {/* <div className="col-span-2">
                    <div className="w-full flex flex-col gap-4">
                        <h3 className="h3_tag">Filtter Column Name</h3>
                        {sizes.map((size) => (
                            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                <Select
                                    items={table_heading}
                                    placeholder="Select Column Heading"
                                    size={'sm'}
                                    onChange={(e) => {
                                        setviewCol(e.target.value);
                                    }}
                                >
                                    {(table_heading: any) => <SelectItem key={table_heading.key}>{table_heading.label}</SelectItem>}
                                </Select>
                                <Select
                                    items={OrderBy}
                                    // label="Select Column Heading"
                                    placeholder="Select Column Heading"
                                    size={'sm'}
                                    onChange={(e: any) => {
                                        setdataview(e.target.value);
                                    }}
                                >
                                    {(OrderBy: any) => <SelectItem key={OrderBy.key}>{OrderBy.label}</SelectItem>}
                                </Select>
                            </div>
                        ))}
                    </div>
                </div> */}
            </div>

            <div className="table-background threebtnspace admintableuup" ref={tableRef}>
                <Table
                    className="my-class-table table"
                    columns={columns}
                    dataSource={ClientRecord}

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

                />


            </div>
            <div className="justify-end">{/* <Pagination total={10} initialPage={1} /> */}</div>


        </>
    );
};
