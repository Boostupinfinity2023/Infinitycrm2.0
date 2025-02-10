export interface Notification {
    id: number;
    portal_type: 'admin' | 'agent' | 'staff';
    recipient_id: number;
    title: string;
    message: string;
    is_read: boolean;
    created_at: string;
    read_at?: string | null;
    notification_type: string;
}
