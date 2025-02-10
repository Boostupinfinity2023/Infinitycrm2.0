import { lazy, useEffect } from 'react';
const Mailboxs = lazy(() => import('../../Inbox/Mail_body'));
const Promotional = lazy(() => import('../../Admin/Promotional/Promtoial_list'));
const Userprofile = lazy(() => import('../../components/Layouts/Profile_update'));
const Notification = lazy(() => import('../../Notificationtable'));
const Analytics = lazy(() => import('../../pages/dashboard/StaffDashboard'));
const Analytics2 = lazy(() => import('../../pages/dashboard/Staff2dashboard'));
//Staff Route
const Notes = lazy(() => import('../../pages/agent/Notes'));
const University = lazy(() => import('./../../Admin/University/add_univeristy'));
const CourseList = lazy(() => import('./../../Admin/University/Programlist'));
const Add_univeristy = lazy(() => import('./../../pages/university/view_university'));
const Cources_view = lazy(() => import('./../../pages/university/cources_view'));
const ViewFullProgram = lazy(() => import('../../Admin/University/FullInfomationProgramView'));
const StaffLead = lazy(() => import('./../../staff/lead/TableLead'));
const StaffDeal = lazy(() => import('./../../staff/Deal/Deal_Karban'));
const ClientView = lazy(() => import('../../staff/application/application'));
const LeadApplicationView = lazy(() => import('../../staff/LeadApplication/application'));
const Leaves = lazy(() => import('../../staff/Leave'));
const ViewAnnouncement = lazy(() => import('../../staff/Viewannouncement'));
const Rejectfile = lazy(() => import('../../staff/Rejectfile'));
const StaffRoute = [
    {
        path: 'Mail/:MailboxId',
        element: <Mailboxs />,
        layout: '',
    },
    {
        path: 'Promotional',
        element: <Promotional />,
        layout: '',
    },
    {
        path: 'Profile',
        element: <Userprofile />,
        layout: '',
    },
    {
        path: 'Notification',
        element: <Notification />,
        layout: '',
    },
    {
        path: 'dashboard',
        element: <Analytics2 />,
        layout: '',
    },
    {
        path: '/',
        element: <Analytics />,
        layout: '',
    },
    {
        path: 'lead/client',
        element: <StaffLead />,
        layout: '',
    },
    {
        path: 'cource/view',
        element: <Cources_view />,
        layout: '',
    },
    {
        path: 'university/add',
        element: <University />,
        layout: 'default',
    },
    {
        path: 'university/course/:universityId',
        element: <CourseList />,
        layout: 'default',
    },
    {
        path: 'university/add',
        element: <University />,
        layout: 'default',
    },
    {
        path: 'university/view',
        element: <Add_univeristy />,
        layout: 'default',
    },
    {
        path: 'university/program/view/:programId',
        element: <ViewFullProgram />,
        layout: 'default',
    },
    //Stff Paths
    {
        path: 'client/deal',
        element: <StaffDeal />,
    },
    {
        path: 'note',
        element: <Notes />,
    },
    {
        path: 'client/view/:file_id/:client_id/:encrypt_id/:type',
        element: <ClientView />,
    },
    {
        path: 'client/lead/view/:file_id/:client_id/:encrypt_id/',
        element: <LeadApplicationView />,
    },
    {
        path: 'leave',
        element: <Leaves />,
    },
    {
        path: 'viewAnnouncement',
        element: <ViewAnnouncement />,
    },
    {
        path: 'reject/file',
        element: <Rejectfile />,
    },
];

export { StaffRoute };
