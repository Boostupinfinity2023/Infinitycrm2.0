import React, { useEffect, useState } from 'react';
import { database, ref, onValue } from './firebaseConfig';
import { Notification } from './types';

interface NotificationsProps {
    portalType?: 'admin' | 'agent' | 'staff'; // Make props optional
    recipientId?: number; // Make props optional
}

const Notifications: React.FC<NotificationsProps> = ({
    portalType = 'admin', // Default value
    recipientId = 2,     // Default value
}) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const notificationsRef = ref(database, 'notifications');

        // Subscribe to real-time updates
        const unsubscribe = onValue(notificationsRef, (snapshot) => {
            const data = snapshot.val();
            console.log('Firebase Data:', data); // For debugging

            if (data) {
                const filteredNotifications = Object.values(data).filter(
                    (notif: any) => notif.portal_type === portalType && notif.recipient_id === recipientId
                ) as Notification[];
                setNotifications(filteredNotifications);
            } else {
                setNotifications([]);
            }
            setLoading(false);
        }, (error) => {
            console.error('Error fetching data: ', error);
            setLoading(false);
        });

        // Cleanup function to unsubscribe from real-time updates
        return () => {
            unsubscribe();
        };
    }, [portalType, recipientId]);

    return (
        <div>
            <h2>Notifications</h2>
            {loading ? (
                <p>Loading...</p>
            ) : notifications.length > 0 ? (
                <ul>
                    {notifications.map((notif) => (
                        <li key={notif.id}>
                            <h3>{notif.title}</h3>
                            <p>{notif.message}</p>
                            <small>{new Date(notif.created_at).toLocaleString()}</small>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No notifications</p>
            )}
        </div>
    );
};

export default Notifications;
