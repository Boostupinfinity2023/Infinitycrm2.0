import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, remove, get, query, equalTo, orderByChild } from "firebase/database";
import { initializeApp } from "firebase/app";
import toast, { Toaster } from 'react-hot-toast';
import { NavLink } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
    const globalVar = window.globalVariable;

    // Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyBTayWDUm9Wr84ftUJzNzZ2ioqajmJOWP4",
        authDomain: "notificationsky-4f989.firebaseapp.com",
        databaseURL: "https://notificationsky-4f989-default-rtdb.firebaseio.com",
        projectId: "notificationsky-4f989",
        storageBucket: "notificationsky-4f989.appspot.com",
        messagingSenderId: "141889229847",
        appId: "1:141889229847:web:0e72293583886cb733b852",
        measurementId: "G-X3ZPC6BDSH"
    };

    // Initialize Firebase app and database
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    const notificationsRef = ref(db, '/notifications');

    const portalTypeFilter = globalVar?.ROLE;
    const recipientIdFilter = globalVar?.UID;

    const [notifications, setNotifications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const deleteNotification = async (NotifyID: string) => {
        try {
            // Reference to the notifications node
            const notificationsRef = ref(db, '/notifications');
            const notificationsQuery = query(
                notificationsRef,
                orderByChild('id'),
                equalTo(NotifyID)
            );

            // Get the data
            const snapshot = await get(notificationsQuery);

            if (snapshot.exists()) {
                const notifications = snapshot.val();
                const deletePromises = Object.keys(notifications).map(async (key) => {
                    const notificationRef = ref(db, `/notifications/${key}`);
                    return remove(notificationRef);
                });

                // Wait for all delete operations to complete
                await Promise.all(deletePromises);
                console.log(`Notifications with Client_File_ID ${NotifyID} deleted from Firebase.`);
            } else {
                console.log(`No notifications found with Client_File_ID ${NotifyID}.`);
            }
        } catch (error) {
            console.error(`Failed to delete notifications with Client_File_ID ${NotifyID}:`, error);
        }
    };


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
                // toast.success('Notification marked as read.');
            } else {
                throw new Error('Failed to update status in MySQL.');
            }
        } catch (error) {
            // toast.error('Error handling notification click.');
            console.error(error);
        }
    };
    const getNotificationLink = (notif: any) => {
        let link = '#'; // Default link in case no condition matches

        switch (notif.portal_type) {
            case 'agent':
                switch (notif.notification_type) {
                    case 'New Comment Added By Staff':
                        link = `/agent/client/view/${notif.Client_File_ID}/${notif.Encrypted_ID}`;
                        break;
                    case 'Document requirement send By Staff':
                        link = `/agent/client/view/${notif.Client_File_ID}/${notif.Encrypted_ID}`;
                        break;
                    case 'Application status chnages by Staff':
                        link = `/agent/client/view/${notif.Client_File_ID}/${notif.Encrypted_ID}`;
                        break;
                    case 'Application Accepted by Staff':
                        link = `/agent/client/view/${notif.Client_File_ID}/${notif.Encrypted_ID}`;
                        break;
                    case 'Application Rejected by Staff':
                        link = `/agent/client/view/${notif.Client_File_ID}/${notif.Encrypted_ID}`;
                        break;
                    case 'Offer letter Apply by staff':
                        link = `/agent/client/view/${notif.Client_File_ID}/${notif.Encrypted_ID}`;
                        break;
                    case 'New Comment Added in offer letter by':
                        link = `/agent/client/view/${notif.Client_File_ID}/${notif.Encrypted_ID}`;
                        break;
                    default:
                        link = '#';
                        break;
                }
                break;

            case 'staff':
                switch (notif.notification_type) {
                    case 'New Comment Added By Agent':
                        link = `/staff/client/view/${notif.Lead_ID}/${notif.Client_File_ID}/${notif.Encrypted_ID}/staff`;
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
                        link = `/admin/student/view/${notif.Client_File_ID}/${notif.Encrypted_ID}`;
                        break;
                    case 'Offer letter Apply by staff':
                        link = `/admin/student/offer-letter-application`;
                        break;

                    case 'Application status chnages by Staff':
                        link = `/admin/client/view/${notif.Lead_ID}/${notif.Client_File_ID}/${notif.Encrypted_ID}/staff`;
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

    useEffect(() => {
        const unsubscribe = onValue(notificationsRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const filteredNotifications = Object.values(data).filter((notif: any) =>
                    notif.portal_type === portalTypeFilter &&
                    notif.recipient_id === `${recipientIdFilter}`
                );

                filteredNotifications.forEach((notif: any) => {
                    toast(
                        <>
                            <NavLink
                                to={getNotificationLink(notif)}
                                onClick={() => handleNotificationClick(notif)}
                            >
                                <h3>{notif.title}</h3>
                                <p>{notif.message}</p>
                                <small>{new Date(notif.created_at).toLocaleString()}</small>
                            </NavLink>
                        </>,
                        {
                            position: "top-right",
                            duration: 6000,
                        }
                    );

                    deleteNotification(notif.id);
                });

                setNotifications(filteredNotifications);
            } else {
                console.log('No data available');
                setNotifications([]);
            }
            setLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [portalTypeFilter, recipientIdFilter]);

    return (
        <>
            <Toaster />
        </>
        // <div>
        //     <Toaster />
        //     <h1>{portalTypeFilter} Dashboard ID={recipientIdFilter}</h1>
        //     {loading ? (
        //         <p>Loading...</p>
        //     ) : notifications.length > 0 ? (
        //         <ul>
        //             {notifications.map((notif) => (
        //                 <li key={notif.id}>
        //                     <h3>{notif.title}</h3>
        //                     <p>{notif.message}</p>
        //                     <small>{new Date(notif.created_at).toLocaleString()}</small>
        //                 </li>
        //             ))}
        //         </ul>
        //     ) : (
        //         <p>No notifications</p>
        //     )}
        // </div>
    );
};

export default AdminDashboard;
