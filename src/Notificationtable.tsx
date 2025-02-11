
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Table } from 'antd';
import { TableColumnsType, Dropdown, Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import { GETDATA } from './APIurl/url';
import { v1GETDATA } from './APIurl/url';
import userInfo from './getLoggedUser/GetUserInfomation';
import { EyeOutlined, DeleteOutlined, MailOutlined, FileDoneOutlined, MoreOutlined, CheckCircleOutlined, ClockCircleOutlined, SyncOutlined, CheckOutlined } from '@ant-design/icons';
import jwt from './getLoggedUser/GetUserInfomation';
import { Tag } from 'antd';
import { Input, Select, SelectItem, User } from '@nextui-org/react';
import { Pagination } from '@nextui-org/react';
import { debounce } from 'lodash';
import Swal from 'sweetalert2';
import { Tooltip } from 'antd';

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
    const [pagerefresh, setpageRefresh] = useState(false);
    const [Getnotification, setgetnotification] = useState([]);
    const GetNotification = async () => {
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
                viewCol,
                {
                    method: 'POST',
                    headers: {
                        Authenticate: `Bearer ${token}`,
                        'x-token-access': 'true',
                    },
                    body: JSON.stringify({
                        PAGE_REQUEST: 'Get.All.Notification',
                    }),
                }
            );
            const data = await responseData.json();
            setgetnotification(data.data);
            set_total_record(data.total);
            setLoader(false);
        } catch (err) {
            console.error(err);
            setLoader(false);
        }
    };

    const debouncedgetnotification = debounce(GetNotification, 300);
    useEffect(() => {
        debouncedgetnotification();
    }, [page, viewCol]);

    const handleNotificationClick = async (notif: any) => {
        try {
            // Update status in MySQL database via API call
            const response = await fetch('https://harmanjeetsinghvirdi.com/CRM/API/V1/vendor/Read_Notification.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-token-access': 'true',
                },
                body: JSON.stringify({
                    PAGE_REQUEST: 'Notification_Read_Status_Change',
                    id: notif.id,
                    is_read: true,
                }),
            });

            if (response.ok) {

            } else {
                throw new Error('Failed to update status in MySQL.');
            }
        } catch (error) {

            console.error(error);
        }
    };
    const getNotificationLink = (notif: any) => {
        let link = '#'; // Default link in case no condition matches

        switch (notif.portal_type) {
            case 'agent':
                switch (notif.notification_type) {
                    case 'New Comment Added By Staff':
                        link = `/agent/client/view/${notif.Client_File_ID}/${notif.File_ID_Encrypted}`;
                        break;
                    case 'Document requirement send By Staff':
                        link = `/agent/client/view/${notif.Client_File_ID}/${notif.File_ID_Encrypted}`;
                        break;
                    case 'Application status chnages by Staff':
                        link = `/agent/client/view/${notif.Client_File_ID}/${notif.File_ID_Encrypted}`;
                        break;
                    case 'Application Accepted by Staff':
                        link = `/agent/client/view/${notif.Client_File_ID}/${notif.File_ID_Encrypted}`;
                        break;
                    case 'Application Rejected by Staff':
                        link = `/agent/client/view/${notif.Client_File_ID}/${notif.File_ID_Encrypted}`;
                        break;
                    case 'Offer letter Apply by staff':
                        link = `/agent/client/view/${notif.Client_File_ID}/${notif.File_ID_Encrypted}`;
                        break;
                    case 'New Comment Added in offer letter by':
                        link = `/agent/client/view/${notif.Client_File_ID}/${notif.File_ID_Encrypted}`;
                        break;
                    default:
                        link = '#';
                        break;
                }
                break;

            case 'staff':
                switch (notif.notification_type) {
                    case 'New Comment Added By Agent':
                        link = `/staff/client/view/${notif.Lead_ID}/${notif.Client_File_ID}/${notif.File_ID_Encrypted}/staff`;
                        break;
                    case 'New Student Created By Agent':
                        link = `/staff/lead/client`;
                        break;
                    case 'Document Upload By Agent':
                        link = `/staff/client/deal`;
                        break;
                    default:
                        link = '#';
                        break;
                }
                break;

            case 'admin':
                switch (notif.notification_type) {
                    case 'New Student Created By admin':
                        link = `/admin/student/view/${notif.Client_File_ID}/${notif.File_ID_Encrypted}`;
                        break;
                    case 'Offer letter Apply by staff':
                        link = `/admin/student/offer-letter-application`;
                        break;

                    case 'Application status chnages by Staff':
                        link = `/admin/client/view/${notif.Lead_ID}/${notif.Client_File_ID}/${notif.File_ID_Encrypted}/staff`;
                        break;
                    default:
                        link = '#';
                        break;
                }
                break;


            default:
                link = '#';
                break;
        }

        return link;
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


    const menu = (event: any, fullInfo: any) => (
        <Menu>
            <Menu.Item key="1">
                <NavLink to="#" className="ml-3" title="View client Details">
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
    const columns: TableColumnsType<DataType> = [
        {
            className: 'text-style',
            title: '#',
            fixed: 'right',
            render: (event, fullInfo: any, index: any) => (
                <NavLink to={getNotificationLink(fullInfo)} className="ml-3" title="View client Details" key={index}>
                    {index + 1}
                </NavLink>
            ),
            width: 100,
        },
        {
            className: 'text-style',
            title: 'Notification',
            dataIndex: 'FIRST_NAME',
            key: 'FIRST_NAME',
            width: 100,
            render: (text, fullInfo: any) => (
                <>
                    <NavLink
                        to={getNotificationLink(fullInfo)}
                        onClick={() => handleNotificationClick(fullInfo)}
                    >
                        <h3>{fullInfo.title}</h3>
                        <p>{fullInfo.message}</p>

                    </NavLink>
                </>
            ),
        },

        {
            className: 'text-style',
            title: 'Current Status',
            dataIndex: 'created_at',
            key: 'created_at',
            width: 100,
            render: (text) => <span data-column="Country of Citizenship">{new Date(text).toLocaleString()}</span>,
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


    return (
        <>


            <div className="" ref={tableRef}>
                <Table
                    className="my-class-table "
                    columns={columns}
                    dataSource={Getnotification}

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



        </>
    );
};
