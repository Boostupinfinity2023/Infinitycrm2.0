import React, { useState, useEffect } from 'react'
import jwt from '../../getLoggedUser/GetUserInfomation';
import { GETDATA } from '../../APIurl/url';
import { debounce } from 'lodash';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User, Badge } from "@nextui-org/react";
import { NavLink } from 'react-router-dom';
import IconBell from '../../../public/Icon/IconBell';
export default function Notification_drop() {
    const globalVar = window.globalVariable;
    const token = jwt('jwt');
    const [Getnotification, setgetnotification] = useState([]);
    const [Refresh, setRefresh] = useState(false);
    const GetNotification = async () => {
        setRefresh(false); // Reset the refresh state after making the API call
        try {
            const responseData: any = await fetch(
                GETDATA,
                {
                    method: 'POST',
                    headers: {
                        Authenticate: `Bearer ${token}`,
                        'x-token-access': 'true',
                    },
                    body: JSON.stringify({
                        PAGE_REQUEST: 'GetNotification',
                    }),
                }
            );
            const data = await responseData.json();
            setgetnotification(data.data);
        } catch (err) {
            console.error(err);
        }
    };

    const debouncedgetnotification = debounce(GetNotification, 300);
    useEffect(() => {
        debouncedgetnotification();
    }, [Refresh]);

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
                setRefresh(true);
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
                        link = `/agent/client/view/${notif.Client_File_ID}/${notif.File_ID_Encrypted}#Comment`;
                        break;
                    case 'Document requirement send By Staff':
                        link = `/agent/client/view/${notif.Client_File_ID}/${notif.File_ID_Encrypted}#Documents`;
                        break;
                    case 'Application status chnages by Staff':
                        link = `/agent/client/view/${notif.Client_File_ID}/${notif.File_ID_Encrypted}#Applications`;
                        break;
                    case 'Application Accepted by Staff':
                        link = `/agent/client/view/${notif.Client_File_ID}/${notif.File_ID_Encrypted}#Applications`;
                        break;
                    case 'Application Rejected by Staff':
                        link = `/agent/client/view/${notif.Client_File_ID}/${notif.File_ID_Encrypted}#Applications`;
                        break;
                    case 'Offer letter Apply by staff':
                        link = `/agent/client/view/${notif.Client_File_ID}/${notif.File_ID_Encrypted}#Applications`;
                        break;
                    case 'New Comment Added in offer letter by':
                        link = `/agent/client/view/${notif.Client_File_ID}/${notif.File_ID_Encrypted}#Applications`;
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



    return (
        <Dropdown>
            <DropdownTrigger>
                <p className="me-5">
                    <Badge
                        content={Getnotification.length}
                        shape="circle"
                        className="icon"
                    >
                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.914062" y="0.695312" width="35.0943" height="35.114" rx="17.5472" fill="#1980E4" />
                            <path d="M16.865 11.8125C15.46 11.8125 14.1126 12.3706 13.1191 13.3641C12.1257 14.3575 11.5676 15.7049 11.5676 17.1099V21.2418L10.3951 23.0076C10.2545 23.2243 10.1748 23.4748 10.1643 23.7328C10.1537 23.9909 10.2127 24.247 10.3351 24.4744C10.4575 24.7019 10.6388 24.8922 10.8599 25.0256C11.0811 25.159 11.334 25.2304 11.5923 25.2325H22.1376C22.3975 25.2317 22.6524 25.1605 22.8751 25.0266C23.0979 24.8927 23.2803 24.701 23.403 24.4719C23.5257 24.2427 23.5842 23.9847 23.5722 23.725C23.5602 23.4654 23.4781 23.2138 23.3348 22.997L22.1623 21.2418V17.1099C22.1623 15.7049 21.6042 14.3575 20.6108 13.3641C19.6173 12.3706 18.2699 11.8125 16.865 11.8125Z" fill="white" />
                            <path d="M16.8649 27.3516C17.3026 27.3511 17.7295 27.215 18.0868 26.9621C18.4441 26.7091 18.7143 26.3517 18.8602 25.9389H14.8695C15.0154 26.3517 15.2856 26.7091 15.6429 26.9621C16.0002 27.215 16.4271 27.3511 16.8649 27.3516Z" fill="white" />
                            <rect x="19.4235" y="10.4205" width="5.98507" height="5.98927" rx="2.99253" fill="white" />
                            <rect x="19.4235" y="10.4205" width="5.98507" height="5.98927" rx="2.99253" stroke="#1980E4" stroke-width="1.49732" />
                            <rect x="20.9199" y="12.668" width="1.8706" height="1.87165" rx="0.935298" fill="white" />
                            <rect x="20.9199" y="12.668" width="1.8706" height="1.87165" rx="0.935298" fill="white" />
                        </svg>

                    </Badge>

                </p>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions" >
                {
                    [
                        ...Getnotification.map((notification: any, index: number) => (
                            <DropdownItem key={index} className='border-b-1'>
                                <NavLink
                                    to={getNotificationLink(notification)}
                                    onClick={() => handleNotificationClick(notification)}
                                >
                                    <h3>{notification.title}</h3>
                                    <p>{notification.message}</p>
                                    <small>{new Date(notification.created_at).toLocaleString()}</small>
                                </NavLink>
                            </DropdownItem>
                        )),
                        <DropdownItem key="view-all" className='text-center'>
                            <NavLink to={`/${globalVar?.ROLE}/notification`}>
                                View all
                            </NavLink>
                        </DropdownItem>
                    ] as any // Casting the array to any type to satisfy the CollectionElement requirement
                }
            </DropdownMenu>
        </Dropdown>
    )
}
