import { lazy, useEffect } from 'react';
const Promotional = lazy(() => import('../../Admin/Promotional/Promtoial_list'));
const Country = lazy(() => import('../../Admin/Setting/Country/Countrylist'));
const Document = lazy(() => import('../../Admin/Setting/Document/Documentlist'));
const Userprofile = lazy(() => import('../../components/Layouts/Profile_update'));
const Notification = lazy(() => import('../../Notificationtable'));
const Analytics = lazy(() => import('../../pages/dashboard/AdminDashboard'));
const Analytics2 = lazy(() => import('../../pages/dashboard/Admin2dashboard'));

//leads
const AI = lazy(() => import('../../pages/AI/AI'));

const Thankspage = lazy(() => import('../../pages/dashboard/ThanksPage'));
//Agent Route
const Profile = lazy(() => import('../../pages/agent/client_detail'));

const Notes = lazy(() => import('../../pages/agent/Notes'));
const Commision = lazy(() => import('../../pages/agent/commision'));
const Calendar = lazy(() => import('../../pages/agent/Calendar'));
const ClientForm = lazy(() => import('../../pages/agent/ClientForm'));
const Mailbox = lazy(() => import('../../pages/agent/Mailbox'));
const Chat = lazy(() => import('../../pages/agent/Chat'));
const Profile2 = lazy(() => import('../../pages/Users/Profile'));
const Students = lazy(() => import('../../pages/agent/Students'));

//Staff Route
const Basic = lazy(() => import('../../pages/staff/userlist'));

//Admin Route
const UserList = lazy(() => import('../../pages/admin/userlist'));
const Add = lazy(() => import('../../pages/admin/Invoice/Add'));
const Edit = lazy(() => import('../../pages/admin/Invoice/Edit'));
const Preview = lazy(() => import('../../pages/admin/Invoice/Preview'));
const CreateTask = lazy(() => import('./../../pages/Task/TaskData'));

//Task Routes
const Task = lazy(() => import('../../Task&Project/Task'));
const Edittask = lazy(() => import('../../Task&Project/API_HELPER/Edit_task'));

//HRM Routes
const Leave = lazy(() => import('../../HRM/Leaves'));
const ManageLeave = lazy(() => import('../../HRM/Leaves/ApproviedLeaves'));
const Inventory = lazy(() => import('../../HRM/Inventory/Inventory'));
const Clocklist = lazy(() => import('../../HRM/Clocklist'));
const HMRUSER = lazy(() => import('../../HRM/user/User_load'));
const ViewFullProgram = lazy(() => import('../../Admin/University/FullInfomationProgramView'));

// University Route

// Lazy load the component for the university dashboard.
// URL: /page/univeristy/add_univeristy
const Allprogram = lazy(() => import('./../../Admin/University/Allprogram'));
const University = lazy(() => import('./../../Admin/University/add_univeristy'));
const CourseList = lazy(() => import('./../../Admin/University/Programlist'));
const Add_univeristy = lazy(() => import('./../../pages/university/view_university'));
const Cources_view = lazy(() => import('./../../pages/university/cources_view'));

const ClientRecord = lazy(() => import('./../../pages/agent/student/student_record'));
const Deal = lazy(() => import('./../../Deal/Deal_Karban'));

// const ClientViews = lazy(() => import('../../pages/agent/student/student_application'));

//Setting Components Data And Routing

const LeadStatus = lazy(() => import('../../Admin/Setting/LeadStatus'));
const DealStatus = lazy(() => import('../../Admin/Setting/DealStatus'));

//Student Data

const StudentApplication = lazy(() => import('../../Admin/student/Applications'));
const CommisionSetting = lazy(() => import('../../Admin/comission/ComissionPrice'));
const AgentCommission = lazy(() => import('../../Admin/comission/CommissionData'));
const StudentOfferltterApplication = lazy(() => import('../../Admin/OfferLetter/Application'));
//Student Loan And Services
const Loan = lazy(() => import('../../Admin/Loan/Application'));
//Lead & Deal Staff And Admin 
const StaffDeal = lazy(() => import('../../Admin/StaffDeal/Deal_Karban'));
const AgentLead = lazy(() => import('../../Admin/AgentLead/Deal_Karban'));
const ClientView = lazy(() => import('../../staff/application/application'));

const StudentProfile = lazy(() => import('../../pages/agent/student/student_application'));
// const StudentProfile = lazy(() => import('../../Admin/StudentProfile/student_application'));
const Announcement = lazy(() => import('../../Admin/Announcement/Announcwementlist'));

const Rejectfile = lazy(() => import('../../staff/Rejectfile'));


// mail template

const Mail_tmp_table = lazy(() => import('../../Admin/MailTemplate/Mail_tem_table'));
const Mail_tmp_table_Create = lazy(() => import('../../Admin/MailTemplate/Create_template'));
const Mail_tmp_table_Edit = lazy(() => import('../../Admin/MailTemplate/Edit_template'));
const Mailboxs = lazy(() => import('../../Inbox/Mail_body'));
const AdminRoute = [
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
        path: 'setting/country',
        element: <Country />,
        layout: '',
    },
    {
        path: 'setting/Document',
        element: <Document />,
        layout: '',
    },
    {
        path: 'setting/Edit_template/:TemplateId/:EditTemplate',
        element: <Mail_tmp_table_Edit />,
        layout: '',
    },
    {
        path: 'setting/Create_template',
        element: <Mail_tmp_table_Create />,
        layout: '',
    },
    {
        path: 'setting/Mail',
        element: <Mail_tmp_table />,
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
        path: 'dashboard2',
        element: <Analytics2 />,
        layout: '',
    },
    {
        path: 'cource/view',
        element: <Cources_view />,
        layout: '',
    },
    {
        path: 'staff/student/application',
        element: <StudentApplication />,
        layout: '',
    },
    {
        path: 'student/view/:client_id/:encrypt_id',
        element: <StudentProfile />,
        layout: '',
    },
    {
        path: 'agent/student/lead',
        element: <AgentLead />,
        layout: '',
    },
    {
        path: 'staff/student/deal',
        element: <StaffDeal />,
        layout: '',
    },
    {
        path: 'student/offer-letter-application',
        element: <StudentOfferltterApplication />,
        layout: '',
    },
    {
        path: 'student/loan-services',
        element: <Loan />,
        layout: '',
    },
    {
        path: 'commission/pay',
        element: <AgentCommission />,
        layout: '',
    },
    {
        path: 'commission/setting/manage',
        element: <CommisionSetting />,
        layout: '',
    },
    // {
    //     path: 'setting/lead',
    //     element: <LeadStatus />,
    //     layout: '',
    // },

    {
        path: 'setting/Lead',
        element: <DealStatus />,
        layout: '',
    },
    {
        path: '',
        element: <Analytics />,
        layout: '',
    },
    {
        path: 'thanks',
        element: <Thankspage />,
        layout: 'blank',
    },
    {
        path: 'ai',
        element: <AI />,
        layout: 'default',
    },
    {
        path: 'analytics',
        element: <Analytics />,
        layout: 'default',
    },

    //Admin dashboard Route
    {
        path: 'admin/userlist',
        element: <UserList />,
        layout: 'default',
    },
    {
        path: 'admin/Invoice/add',
        element: <Add />,
        layout: 'default',
    },

    {
        path: 'admin/Invoice/edit',
        element: <Edit />,
        layout: 'default',
    },

    {
        path: 'admin/Invoice/preview',
        element: <Preview />,
        layout: 'default',
    },

    {
        path: 'task/create',
        element: <CreateTask />,
        layout: 'default',
    },

    {
        path: 'university/Programs',
        element: <Allprogram />,
        layout: 'default',
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

    //Agents path

    {
        path: 'agent/Students',
        element: <Students />,
    },
    {
        path: 'agent/Profile',
        element: <Profile />,
    },
    {
        path: 'users/Profile',
        element: <Profile2 />,
    },
    {
        path: 'agent/Mailbox',
        element: <Mailbox />,
    },
    {
        path: 'agent/Chat',
        element: <Chat />,
    },
    {
        path: 'agent/Task',
        element: <Task />,
    },
    {
        path: 'agent/Notes',
        element: <Notes />,
    },
    {
        path: 'agent/Commision',
        element: <Commision />,
    },
    {
        path: 'agent/Calendar',
        element: <Calendar />,
    },
    {
        path: 'agent/ClientForm',
        element: <ClientForm />,
    },

    //Stff Paths
    {
        path: 'staff/table',
        element: <Basic />,
    },
    {
        path: 'HRM/Company',
        element: <HMRUSER />,
    },
    {
        path: 'test',
        element: <HMRUSER />,
        layout: 'blank_page',
    },

    //HRM USER & Deopartment routes
    {
        path: 'HRM/Company/:TABNAME',
        element: <HMRUSER />,
    },
    {
        path: 'HRM/Company/leave',
        element: <Leave />,
    },
    {
        path: 'HRM/Company/User/leave',
        element: <ManageLeave />,
    },
    {
        path: 'HRM/Company/inventory',
        element: <Inventory />,
    },
    {
        path: 'HRM/Company/clocklist',
        element: <Clocklist />,
    },

    //task path
    {
        path: 'page/company/task/:TabsnameID',
        element: <Task />,
        layout: '',
    },
    {
        path: 'page/company/task/View/:TASKTOKEN/:EncryptId',
        element: <Edittask />,
    },
    {
        path: 'client/record',
        element: <ClientRecord />,
    },
    {
        path: 'deal',
        element: <Deal />,
    },
    {
        path: 'client/view/:file_id/:client_id/:encrypt_id/:type',
        element: <ClientView />,
    },
    {
        path: 'announcement',
        element: <Announcement />,
    },
    {
        path: 'reject/file',
        element: <Rejectfile />,
    },
];

export { AdminRoute };
