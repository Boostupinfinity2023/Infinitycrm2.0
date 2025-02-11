import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, CardFooter, CardHeader } from "@nextui-org/react";
import Token from '../../getLoggedUser/GetUserInfomation';
import { v1Dashboard } from '../../APIurl/url';
import { DatePicker, Space } from 'antd';
import { debounce } from 'lodash';
import './AgentDashboard.css';
import { Tooltip } from 'antd';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CustomIcon1 from '../../../public/Icon/CustomIcon1';
import CustomIcon2 from '../../../public/Icon/CustomIcon2';
import CustomIcon6 from '../../../public/Icon/CustomIcon6';
import CustomIcon7 from '../../../public/Icon/CustomIcon7';
import CustomIcon8 from '../../../public/Icon/CustomIcon8';
import Skeleton from './dashboardSkeleton ';
import {
    Card, CardBody, Breadcrumbs,
    BreadcrumbItem, Select, SelectItem, Dropdown as Dropdowns
} from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Spinner } from "@nextui-org/react";
const { RangePicker } = DatePicker;
import { ArrowDown, ArrowUp, ArrowUpDown, Eye, ArrowRight, Globe } from "lucide-react";
const Analytics = () => {
    const globalVar = window.globalVariable;
    const JwtToken = Token('jwt');
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Analytics Admin'));
    });

    const [isOpen, setIsOpen] = useState(false); // Modal will open by default
    const [Myapplication, Setmyappliaction]: any = useState([]);
    const [ApplicationcurrentPage, setapplicationCurrentPage] = useState(1);
    const [ApplicationrowsPerPage, setApplicationrowsperpage] = useState(10); // Number of rows per page
    const [totalApplicationRecords, setTotalApplicationRecords] = useState(0);
    const [sortField, setSortField] = useState("sfh.ID");
    const [sortOrder, setSortOrder] = useState("ASC"); // 'asc' or 'desc'
    const [Applictionloading, setApllictionLoading] = useState(false);
    const rowsPerPageOptions = [10, 20, 50];

    const closeModal = () => setIsOpen(false);
    const [country, Setdefultcountry]: any = useState();
    const [AgentData, SetAgentData]: any = useState();
    const [Chartdata, Setchartdata]: any = useState();
    const [Taskdata, Settaskdata]: any = useState([]);
    const [Announcement, SetAnnouncement]: any = useState([]);
    const [Comment, SetComment]: any = useState([]);
    const [loader, Setloader]: any = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [AllCountrys, Setallcountry]: any = useState([]);

    const [loading] = useState(false);
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;


    const [selectedAnnouncement, setSelectedAnnouncement]: any = useState(null);
    const [Modalhide, setmodalhide]: any = useState(false);
    const [Pageloder, Setpageloder]: any = useState(false);
    const handleViewAnnouncement = (announcement: any) => {
        setSelectedAnnouncement(announcement);
        setIsOpen(true);
        setmodalhide(true);
    };


    const Defultcountry = (value: any) => {
        Setdefultcountry(value);
    }
    useEffect(() => {
        const Myappication = async () => {
            setApllictionLoading(true);
            try {
                const responseData: any = await fetch(`${v1Dashboard}?currentPage=${ApplicationcurrentPage}&rowsPerPage=${ApplicationrowsPerPage}&sortField=${sortField}&sortOrder=${sortOrder}`, {
                    method: 'POST',
                    headers: {
                        Authenticate: `Bearer ${JwtToken}`,
                        'x-token-access': 'true',
                    },
                    body: JSON.stringify({
                        PAGE_REQUEST: 'Get_myappication',
                        RequesterUser: 'agent',
                        country: country,
                    }),
                });
                const data = await responseData.json();
                Setmyappliaction(await data.data)
                setTotalApplicationRecords(data.totalRecords);
            } catch (err) {
                console.error(err);

            } finally {
                setApllictionLoading(false); // Stop loader
            }
        }
        Myappication();
    }, [country, ApplicationcurrentPage, ApplicationrowsPerPage, sortField, sortOrder]);


    useEffect(() => {
        const Client = async () => {
            Setpageloder(true);
            try {
                const responseData: any = await fetch(v1Dashboard + '?action=view.client.record', {
                    method: 'POST',
                    headers: {
                        Authenticate: `Bearer ${JwtToken}`,
                        'x-token-access': 'true',
                    },
                    body: JSON.stringify({
                        PAGE_REQUEST: 'AGENTDATA_DASHBOARD',
                        RequesterUser: 'agent',
                        country: country,
                    }),
                });
                const data = await responseData.json();
                SetAgentData(await data.data[0])

            } catch (err) {
                console.error(err);

            }
            Setpageloder(false);
        }

        const Chartback = async () => {
            try {
                const responseData: any = await fetch(v1Dashboard + '?action=view.client.record', {
                    method: 'POST',
                    headers: {
                        Authenticate: `Bearer ${JwtToken}`,
                        'x-token-access': 'true',
                    },
                    body: JSON.stringify({
                        PAGE_REQUEST: 'AGENTDATA_DASHBOARD_CHART',
                        RequesterUser: 'agent',
                        country: country,
                    }),
                });
                const data = await responseData.json();
                Setchartdata(await data.data)

            } catch (err) {
                console.error(err);

            }
        }

        const Taskmanagement = async () => {
            try {
                const responseData: any = await fetch(v1Dashboard + '?action=view.client.record', {
                    method: 'POST',
                    headers: {
                        Authenticate: `Bearer ${JwtToken}`,
                        'x-token-access': 'true',
                    },
                    body: JSON.stringify({
                        PAGE_REQUEST: 'AGENTDATA_DASHBOARD_TasksManagement',
                        RequesterUser: 'agent',
                        country: country,
                    }),
                });
                const data = await responseData.json();
                Settaskdata(await data.data)

            } catch (err) {
                console.error(err);

            }
        }




        Client();
        Chartback();
        Taskmanagement();
    }, [country]);

    const GETSTAFFAnnouncement = async () => {
        Setloader(true);
        try {
            const responseData: any = await fetch(
                `${v1Dashboard}?currentPage=${currentPage}&rowsPerPage=${rowsPerPage}&sortField=id&sortOrder=desc`,
                {
                    method: 'POST',
                    headers: {
                        Authenticate: `Bearer ${JwtToken}`,
                    },
                    body: JSON.stringify({
                        PAGE_REQUEST: 'GET.ANNOUNCEMENT.DATA',
                    }),
                }
            );
            const data = await responseData.json();
            SetAnnouncement(data.data);
            Setloader(false);
        } catch (err) {
            console.error(err);
            Setloader(false);
        }
    };


    const debouncedGetStaff = debounce(GETSTAFFAnnouncement, 300);

    useEffect(() => {
        debouncedGetStaff();
    }, []);



    const GETAGENTCOMMENT = async () => {
        Setloader(true);
        try {
            const responseData: any = await fetch(
                `${v1Dashboard}?currentPage=${currentPage}&rowsPerPage=${rowsPerPage}&sortField=id&sortOrder=desc`,
                {
                    method: 'POST',
                    headers: {
                        Authenticate: `Bearer ${JwtToken}`,
                    },
                    body: JSON.stringify({
                        PAGE_REQUEST: 'GET.AGENT.COMMENT',
                        country: country,
                    }),
                }
            );
            const data = await responseData.json();
            SetComment(data.data);
            Setloader(false);
        } catch (err) {
            console.error(err);
            Setloader(false);
        }
    };


    const debouncedGetComment = debounce(GETAGENTCOMMENT, 300);

    useEffect(() => {
        debouncedGetComment();
    }, [country]);

    const Allcountry = async () => {
        try {
            const responseData: any = await fetch(v1Dashboard, {
                method: 'POST',
                headers: {
                    Authenticate: `Bearer ${JwtToken}`,
                    'x-token-access': 'true',
                },
                body: JSON.stringify({
                    PAGE_REQUEST: 'ADMIN.GETALLCOUNTRY',
                    RequesterUser: 'Admin',
                }),
            });
            const data = await responseData.json();
            Setallcountry(data.data)
        } catch (err) {
            console.error(err);

        }
    }
    const DebounceAllcountry = debounce(Allcountry, 300);
    useEffect(() => {
        DebounceAllcountry();
    }, []);


    const loadingState = loader ? "loading" : "idle";
    //Revenue Chart
    const revenueChart: any = {
        series: [
            {
                name: 'Accepted',
                data: Chartdata?.InHand || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            },
            {
                name: 'Rejected',
                data: Chartdata?.OnHold || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            },

        ],
        options: {
            chart: {
                height: 325,
                type: 'area',
                fontFamily: 'Nunito, sans-serif',
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },

            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                curve: 'smooth',
                width: 2,
                lineCap: 'square',
            },
            dropShadow: {
                enabled: true,
                opacity: 0.2,
                blur: 10,
                left: -7,
                top: 22,
            },
            colors: isDark ? ['#2daa0f', '#E7515A'] : ['#2daa0f', '#E7515A'],
            markers: {
                discrete: [
                    {
                        seriesIndex: 0,
                        dataPointIndex: 6,
                        fillColor: '#2daa0f',
                        strokeColor: 'transparent',
                        size: 7,
                    },
                    {
                        seriesIndex: 1,
                        dataPointIndex: 5,
                        fillColor: '#E7515A',
                        strokeColor: 'transparent',
                        size: 7,
                    },
                ],
            },
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            xaxis: {
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
                crosshairs: {
                    show: true,
                },
                labels: {
                    offsetX: isRtl ? 2 : 0,
                    offsetY: 5,
                    style: {
                        fontSize: '12px',
                        cssClass: 'apexcharts-xaxis-title',
                    },
                },
            },
            yaxis: {
                tickAmount: 7,
                labels: {
                    formatter: (value: number) => {
                        return Math.trunc(value);
                    },
                    offsetX: isRtl ? -30 : -10,
                    offsetY: 0,
                    style: {
                        fontSize: '12px',
                        cssClass: 'apexcharts-yaxis-title',
                    },
                },
                opposite: isRtl ? true : false,
            },
            grid: {
                borderColor: isDark ? '#191E3A' : '#E0E6ED',
                strokeDashArray: 5,
                xaxis: {
                    lines: {
                        show: true,
                    },
                },
                yaxis: {
                    lines: {
                        show: false,
                    },
                },
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                fontSize: '16px',
                markers: {
                    width: 10,
                    height: 10,
                    offsetX: -2,
                },
                itemMargin: {
                    horizontal: 10,
                    vertical: 5,
                },
            },
            tooltip: {
                marker: {
                    show: true,
                },
                x: {
                    show: false,
                },
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: !1,
                    opacityFrom: isDark ? 0.19 : 0.28,
                    opacityTo: 0.05,
                    stops: isDark ? [100, 100] : [45, 100],
                },
            },
        },
    };


    const salesByCategory: any = {
        series: [AgentData?.Total_Pending_task || 0, AgentData?.Total_Hold_task || 0, AgentData?.Total_Complete_task || 0],
        options: {
            chart: {
                type: 'donut',
                height: 260,
                fontFamily: 'Sora',
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 20,
                colors: '#fff',
            },
            colors: ['#FF5C24', '#0975DE', '#00CD69'],
            legend: {
                position: 'bottom',
                horizontalAlign: 'center',
                fontSize: '12px',
                markers: {
                    width: 10,
                    height: 10,
                    offsetX: -2,
                },
                height: 20,
                offsetY: 0,
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '60%',
                        background: 'transparent',
                        labels: {
                            show: true,
                            name: {
                                show: true,
                                fontSize: '20px',
                                offsetY: -10,
                            },
                            value: {
                                show: true,
                                fontSize: '20px',
                                color: undefined,
                                offsetY: 16,
                                formatter: (val: any) => {
                                    return val;
                                },
                            },
                            total: {
                                show: true,
                                label: 'Total',
                                color: '#888ea8',
                                fontSize: '20px',
                                formatter: (w: any) => {
                                    return w.globals.seriesTotals.reduce(function (a: any, b: any) {
                                        return a + b;
                                    }, 0);
                                },
                            },
                        },
                    },
                },
            },
            labels: ['Pending', 'Hold', 'Complete'],
            states: {
                hover: {
                    filter: {
                        type: 'none',
                        value: 0.15,
                    },
                },
                active: {
                    filter: {
                        type: 'none',
                        value: 0.15,
                    },
                },
            },
        },
    };


    const wordLimit = 10; // Set your desired word limit

    const truncatedDescription = (description: any, limit: any) => {
        const words = description.split(' ');
        if (words.length <= limit) return description;
        return words.slice(0, limit).join(' ') + '...';
    };

    function formatDateTime(inputDateTime: any) {
        const date = new Date(inputDateTime);

        // Extracting parts of the date
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = String(date.getFullYear()).slice(-2); // Last two digits of the year

        // Extracting parts of the time
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12; // The hour '0' should be '12'

        // Formatting the date and time
        return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
    }


    const [isOpenTAsk, setIsOpenTask] = useState(false);
    const [selectedData, setSelectedData]: any = useState(null);

    const onOpenChange = (open: any) => {
        setIsOpenTask(open);
        if (!open) {
            setSelectedData(null); // Clear data when modal closes
        }
    };

    const handleViewClick = (data: any) => {
        setSelectedData(data);
        setIsOpenTask(true);
    };
    const trimText = (text: string, length: number) => {
        if (!text) return "Null";
        return text.length > length ? text.substring(0, length) + "..." : text;
    };

    // const Defultcountry = (value: any) => {
    //     Setadmincountry(value);
    //     SetHistorycountry(value);
    //     SetPerformancecountry(value);
    // }

    const handleSort = (field: string) => {
        const newSortOrder = sortField === field && sortOrder === "ASC" ? "DESC" : "ASC";
        setSortField(field);
        setSortOrder(newSortOrder);
    };

    const renderSortIcon = (columnKey: string) => {
        if (sortField === columnKey) {
            if (sortOrder === "ASC") return <ArrowUp size={16} />;
            if (sortOrder === "DESC") return <ArrowDown size={16} />;
        }
        return <ArrowUpDown size={16} />;
    };

    return (
        <div>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 set_width">
                <div className="flex flex-col flex-wrap gap-4">
                    <h1 className="text-2xl font-bold mb-4 lg:mb-0">Welcome {globalVar?.ClientName ? globalVar?.ClientName : '-----'} !</h1>
                    <Breadcrumbs >
                        <BreadcrumbItem>Home</BreadcrumbItem>
                        <BreadcrumbItem color="primary" >Dashboard </BreadcrumbItem>
                    </Breadcrumbs>
                </div>
                <Select
                    style={{ backgroundColor: 'hsla(209.59deg, 100%, 42.55%, 0.11)' }}
                    placeholder="All Countries "
                    className="All_Countries w-[250px]"
                    onChange={(e) => Defultcountry(e.target.value)}
                >
                    {AllCountrys.length > 0 ? (
                        AllCountrys.map((Country: any, i: any) => (
                            <SelectItem key={Country.ID}>
                                {Country.COUNTRY_NAME}
                            </SelectItem>
                        ))
                    ) : (
                        <SelectItem key={'Empty'}>
                            Empty Country
                        </SelectItem>

                    )}

                </Select>

            </div>

            {
                Pageloder == true ? <Skeleton /> :
                    <>
                        <div className="pt-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6 mb-6 text-white">

                                <Card>
                                    <CardBody className="flex flex-col items-center justify-center p-4 gap-4">
                                        <CustomIcon8 />
                                        <div className="total_number">Total Task : <span className="">{AgentData?.Total_Task || 0}</span></div>
                                    </CardBody>
                                </Card>
                                <Card>
                                    <CardBody className="flex flex-col items-center justify-center p-4 gap-4">
                                        <CustomIcon2 />
                                        <div className="total_number">Total Applications : <span className="">{AgentData?.Total_Apllication || 0}</span></div>
                                    </CardBody>
                                </Card>
                                <Card>
                                    <CardBody className="flex flex-col items-center justify-center p-4 gap-4">
                                        <CustomIcon6 />
                                        <div className="total_number">Total Accepted : <span className="">{AgentData?.Total_Apllication_Accepted || 0}</span></div>
                                    </CardBody>
                                </Card>
                                <Card>
                                    <CardBody className="flex flex-col items-center justify-center p-4 gap-4">
                                        <CustomIcon7 />
                                        <div className="total_number">Total Rejected : <span className="">{AgentData?.Total_Apllication_Rejected || 0}</span></div>
                                    </CardBody>
                                </Card>
                                <Card>
                                    <CardBody className="flex flex-col items-center justify-center p-4 gap-4">
                                        <CustomIcon1 />
                                        <div className="total_number">Total Student : <span className="">{AgentData?.Total_Students || 0}</span></div>
                                    </CardBody>
                                </Card>


                            </div>



                        </div>



                        <div className="grid grid-cols-3 lg:grid-cols-3 gap-8 Announcement-grid">
                            <Card className="col-span-2">
                                <CardBody className="p-4">
                                    <div className="flex justify-between items-center ">
                                        <h3 className="graph_heading">Announcements</h3>
                                        <Link to="/agent/viewAnnouncement" className="text-blue-500 text-sm">View All</Link>
                                    </div>

                                    <Table hideHeader aria-label="Example static collection table" removeWrapper>
                                        <TableHeader>
                                            <TableColumn>#</TableColumn>
                                            <TableColumn>Title</TableColumn>
                                            <TableColumn>Date</TableColumn>
                                            <TableColumn>STATUS</TableColumn>
                                        </TableHeader>
                                        <TableBody emptyContent={"No rows to display."}>
                                            {Announcement.length > 0 ? (
                                                Announcement.map((announcement: any, i: any) => (
                                                    <TableRow key={i + 1}>
                                                        <TableCell data-column="#" >{i + 1}</TableCell>
                                                        <TableCell data-column="Title">{announcement.TITLE}</TableCell>
                                                        <TableCell data-column="Date ">{formatDateTime(announcement.CREATE_AT)}</TableCell>
                                                        <TableCell data-column="Status"> <Link to="#" onClick={() => handleViewAnnouncement(announcement)} className="text-blue-500">View Announcement</Link>    </TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                []
                                            )}
                                        </TableBody>
                                    </Table>
                                </CardBody>
                            </Card>
                            <Card className="col-span-1">
                                <CardBody className="p-4">
                                    <h3 className="graph_heading">Task Record</h3>
                                    <ReactApexChart className="set_graph" series={salesByCategory.series} options={salesByCategory.options} type="donut" height={460} />
                                </CardBody>
                            </Card>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 pt-5">
                            <Card className="col-span-2">
                                <CardHeader className=" flex justify-between items-center">
                                    <h3 className="graph_heading">My Applications</h3>
                                    <Link to="/agent/lead" className="text-blue-500 text-sm flex gap-1">View All <ArrowRight size={20} /></Link>
                                </CardHeader>
                                <CardBody className="">
                                    <Table className="Comment-Table my-application" aria-label="Sortable Table" removeWrapper>
                                        <TableHeader>
                                            <TableColumn onClick={() => handleSort("cdp.ID")}><span className='flex gap-3'>Edunet ID {renderSortIcon("cdp.ID")}</span></TableColumn>
                                            <TableColumn onClick={() => handleSort("cdp.FIRST_NAME")}><span className='flex gap-3'>Student Name {renderSortIcon("cdp.FIRST_NAME")}</span></TableColumn>
                                            <TableColumn>University Name</TableColumn>
                                            <TableColumn>Course Name</TableColumn>
                                            <TableColumn>Status</TableColumn>
                                            <TableColumn>Date Added</TableColumn>
                                            <TableColumn>Action</TableColumn>
                                        </TableHeader>
                                        <TableBody emptyContent={"No rows to display."} loadingContent={<Spinner />}
                                            loadingState={Applictionloading === true ? 'loading' : 'idle'}>
                                            {Myapplication.map((application: any, index: number) => (
                                                <TableRow key={application.ID}>
                                                    <TableCell data-column="Edunet ID" >{application.lead_ID}</TableCell>
                                                    <TableCell data-column="Student Name">
                                                        {application.Application_Name == null ? '---' :
                                                            <div className='grid'>
                                                                <span className="mat-mdc-tooltip-trigger fw-semibold student_name"> {application.Application_Name}</span>
                                                                <span className="student_passport fw-semibold">  {application.PASSPORT_NUMBER}</span>
                                                            </div>
                                                        }
                                                    </TableCell>
                                                    <TableCell data-column="University Name" >
                                                        {application.University_Name == null ? '---' :
                                                            <div className='grid'>
                                                                <span className="mat-mdc-tooltip-trigger fw-semibold student_name"> {application.University_Name}</span>
                                                                <span className="student_passport fw-semibold">  {application.CONTACT_PHONE}</span>
                                                            </div>
                                                        }
                                                    </TableCell>
                                                    <TableCell data-column="Course Name">
                                                        {application.Program_Name == null ? '---' :
                                                            <div className='grid'>
                                                                <Tooltip title={application.Program_Name} >
                                                                    <span className="mat-mdc-tooltip-trigger fw-semibold student_name"> {trimText(application.Program_Name, 20)}</span>
                                                                </Tooltip>
                                                                <span className="intake_name"> Intake : {application.INTAKE}</span>
                                                            </div>
                                                        }
                                                    </TableCell>
                                                    <TableCell data-column="Status">
                                                        {application.Application_Status === "In-Hand"
                                                            ? application.Deal_Status
                                                            : application.Application_Status}
                                                    </TableCell>
                                                    <TableCell data-column="Date Added">{formatDateTime(application.SENDING_DATE_TIME)}</TableCell>
                                                    <TableCell data-column="Action"><Link to={`/agent/client/view/${application.CLIENT_ID}/${application.CLIENT_ID_Encrypt}`} className="text-blue-500"><Eye /></Link></TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardBody>
                                <CardFooter className="flex justify-between items-center mt-4">
                                    <div>

                                    </div>
                                    <div className='myapplication-pagination'>
                                        {/* <Pagination
                                            isCompact
                                            showControls
                                            total={Math.ceil(totalApplicationRecords / ApplicationrowsPerPage)}
                                            initialPage={ApplicationcurrentPage}
                                            onChange={ApllicationPageChange}
                                        /> */}
                                    </div>
                                    <div className='myapplication-perpage'>
                                        <Select
                                            aria-label="Rows Per Page"
                                            defaultSelectedKeys={[String(ApplicationrowsPerPage)]}
                                            onChange={(event: any) => setApplicationrowsperpage(event.target.value)}
                                            style={{ width: 150 }}
                                        >
                                            {rowsPerPageOptions.map((value) => (
                                                <SelectItem key={value} value={String(value)}>
                                                    {`${value} rows`}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                    </div>
                                </CardFooter>
                            </Card>

                        </div>

                        <div className="pt-5">
                            <div className="grid ">
                                <div className="grid  gap-6 mb-6">
                                    <div className="panel h-full ">
                                        <div className="flex items-center justify-between dark:text-white-light mb-5">
                                            <h5 className="font-bold text-lg ">Accepted and Rejected</h5>
                                            <div className="dropdown">
                                                <Space direction="vertical">
                                                    {/* <RangePicker picker="month" /> */}

                                                </Space>
                                            </div>
                                        </div>

                                        <div className="relative">
                                            <div className="bg-white dark:bg-black rounded-lg overflow-hidden">
                                                {loading ? (
                                                    <div className="min-h-[325px] grid place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                                                        <span className="animate-spin border-2 border-black dark:border-white !border-l-transparent  rounded-full w-5 h-5 inline-flex"></span>
                                                    </div>
                                                ) : (
                                                    <ReactApexChart series={revenueChart.series} options={revenueChart.options} type="area" height={325} />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
                                <Card className="col-span-2">
                                    <CardBody className="p-4">
                                        <div className="flex justify-between items-center ">
                                            <h3 className="graph_heading">Current Comment</h3>
                                            {/* <Link to="/agent/viewAnnouncement" className="text-blue-500 text-sm">View All</Link> */}
                                        </div>

                                        <Table className="Comment-Table" aria-label="Example static collection table" removeWrapper>
                                            <TableHeader>
                                                <TableColumn>#</TableColumn>
                                                <TableColumn >Client Details</TableColumn>
                                                <TableColumn >Comment Title</TableColumn>
                                                <TableColumn >Create By</TableColumn>
                                            </TableHeader>
                                            <TableBody emptyContent={"No rows to display."}>
                                                {Comment.length > 0 ? (
                                                    Comment.map((Comment: any, i: any) => (
                                                        <TableRow key={i + 1}>
                                                            <TableCell data-column="#">{i + 1}</TableCell>
                                                            <TableCell data-column="Client Details">
                                                                <Tooltip color={'#0975de'} title={
                                                                    <>
                                                                        <p>Email : {Comment.EMAIL}</p>
                                                                        <p>Number : {Comment.PHONE_NUMBER}</p>
                                                                        <p>D.O.B : {Comment.DATE_OF_BIRTH}</p>
                                                                        <p>Passport Number : {Comment.PASSPORT_NUMBER}</p>
                                                                    </>
                                                                } overlayStyle={{ maxWidth: '100%' }}>
                                                                    <Link to={`/agent/client/view/${Comment.APPLICATION_ID}/${Comment.APPLICATION_CLIENT_ID}`} className="text-blue-500 text-sm"><span>{Comment.FIRST_NAME} {Comment.MIDDLE_NAME} {Comment.LAST_NAME}</span></Link>
                                                                </Tooltip>
                                                            </TableCell>
                                                            <TableCell data-column="Comment Title" >{Comment.COMMENT_RELETED}</TableCell>
                                                            <TableCell data-column="Create By">{formatDateTime(Comment.COMMENT_CREATE)}</TableCell>
                                                        </TableRow>
                                                    ))
                                                ) : (
                                                    []
                                                )}
                                            </TableBody>
                                        </Table>
                                    </CardBody>
                                </Card>

                            </div>


                            <div className="grid lg:grid-cols-3 gap-6 mb-6 mt-3">
                                {/* <div className="panel h-full p-0 lg:col-span-2"> */}
                                {/* <div className="flex items-start justify-between dark:text-white-light mb-5 p-5 border-b  border-white-light dark:border-[#1b2e4b]"> */}
                                {/* <h5 className="font-semibold text-lg ">Files</h5>
                            <div className="dropdown">
                                <Dropdown
                                    offset={[0, 5]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="hover:text-primary"
                                    button={<IconHorizontalDots className="text-black/70 dark:text-white/70 hover:!text-primary" />}
                                >
                                    <ul>
                                        <li>
                                            <button type="button">View</button>
                                        </li>
                                        <li>
                                            <button type="button">Update</button>
                                        </li>
                                        <li>
                                            <button type="button">Delete</button>
                                        </li>
                                    </ul>
                                </Dropdown>
                            </div> */}
                                {/* </div> */}

                                {/* <ReactApexChart options={uniqueVisitorSeries.options} series={uniqueVisitorSeries.series} type="bar" height={360} className="overflow-hidden" /> */}
                                {/* </div> */}
                                <div className="panel h-full w-full col-span-2">
                                    <div className="flex items-center justify-between mb-5">
                                        <h5 className="font-semibold text-lg dark:text-white-light">Task management</h5>
                                    </div>
                                    <div className="table-responsive">
                                        <Table removeWrapper aria-label="Example static collection table"

                                        >
                                            <TableHeader>
                                                <TableColumn>Task Title</TableColumn>
                                                {/* <TableColumn>Task Description</TableColumn> */}
                                                <TableColumn>Priority</TableColumn>
                                                <TableColumn>Deadline</TableColumn>
                                                <TableColumn>Action</TableColumn>
                                            </TableHeader>
                                            <TableBody className='bg-white'>
                                                {Taskdata.map((Applicat: any, index: any) => (
                                                    <TableRow key={index}>
                                                        <TableCell data-column="Task Title" className='text-blue-500'><Link to={`/agent/client/view/${Applicat.FILE_ID}/${Applicat.FILE_CLIENT_ID}`}>({Applicat.SENDER_COUNTRY} department) {Applicat.TASK_TITLE}</Link></TableCell>
                                                        {/* <TableCell data-column="Task Description" title={Applicat.TASK_DESCRIPTION}>{truncatedDescription(Applicat.TASK_DESCRIPTION, 10)}</TableCell> */}
                                                        <TableCell data-column="Priority"> <Chip color="primary">{Applicat.TASK_PRIORITY}</Chip></TableCell>
                                                        <TableCell data-column="Deadline">{Applicat.DEADLINE}</TableCell>
                                                        <TableCell data-column="Action" >
                                                            <RemoveRedEyeIcon onClick={() => handleViewClick(Applicat)} />
                                                        </TableCell>
                                                    </TableRow>
                                                ))}

                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                                <div className="panel h-full">
                                    <div className="flex items-start justify-between dark:text-white-light mb-5 -mx-5 p-5 pt-0 border-b  border-white-light dark:border-[#1b2e4b]">
                                        <h5 className="font-semibold text-lg ">Your balance</h5>
                                        <div className="dropdown">
                                            {/*
                                <Dropdown
                                    offset={[0, 5]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="hover:text-primary"
                                    button={<IconHorizontalDots className="text-black/70 dark:text-white/70 hover:!text-primary" />}
                                >
                                    <ul>
                                        <li>
                                            <button type="button">View All</button>
                                        </li>
                                        <li>
                                            <button type="button">Mark as Read</button>
                                        </li>
                                    </ul>
                                </Dropdown>
                                */}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between gap-6">
                                            <dt className="text-xl leading-loose tracking-wide font-medium">Commissions</dt>
                                            <dd className="text-xl leading-loose tracking-wide font-medium">
                                                <div className="css-anbbrp">$ {AgentData?.Total_Commission_Price || 0} CAD</div>
                                            </dd>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {isOpen == true ?
                                <Modal isOpen={isOpen} onOpenChange={(visible) => setIsOpen(visible)} size='5xl' scrollBehavior={'inside'}>
                                    <ModalContent>
                                        {(onClose) => (
                                            <>
                                                <ModalHeader className="flex flex-col gap-1">Announcement</ModalHeader>
                                                <ModalBody>
                                                    <Table aria-label="Example empty table">
                                                        <TableHeader>
                                                            <TableColumn>#</TableColumn>
                                                            <TableColumn style={{ textAlign: 'left' }}>Announcement</TableColumn>
                                                        </TableHeader>
                                                        <TableBody emptyContent={"No rows to display."} loadingContent={<Spinner />}>
                                                            {selectedAnnouncement ? (
                                                                <TableRow key={selectedAnnouncement.ID}>
                                                                    <TableCell>1.</TableCell>
                                                                    <TableCell style={{ textAlign: 'left' }}>
                                                                        <div><b>{selectedAnnouncement.TITLE}</b></div>
                                                                        <br />
                                                                        <div dangerouslySetInnerHTML={{ __html: selectedAnnouncement.DETAILS }} />
                                                                    </TableCell>
                                                                </TableRow>
                                                            ) : (
                                                                <TableRow>
                                                                    <TableCell colSpan={2} style={{ textAlign: 'center' }}>No announcement selected.</TableCell>
                                                                </TableRow>
                                                            )}
                                                        </TableBody>

                                                    </Table>
                                                </ModalBody>
                                            </>
                                        )}
                                    </ModalContent>
                                </Modal>
                                : ''}


                            {selectedData && (
                                <Modal isOpen={isOpenTAsk} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
                                    <ModalContent>
                                        {(onClose) => (
                                            <>
                                                <ModalHeader className="flex flex-col gap-1">Task Details</ModalHeader>
                                                <ModalBody>
                                                    <p><strong>Created By:</strong> {selectedData.SENDER_NAME}</p>
                                                    <p><strong>Task Title:</strong> {selectedData.TASK_TITLE}</p>
                                                    <p><strong>Task description:</strong> {selectedData.TASK_DESCRIPTION}</p>
                                                    <p><strong>Task Priority:</strong> {selectedData.TASK_PRIORITY}</p>
                                                    <p><strong>Task Created On:</strong> {formatDateTime(selectedData.SENDING_DATE_TIME)}</p>
                                                    <p><strong>Task Deadline:</strong> {selectedData.DEADLINE}</p>
                                                    {/* Add more data fields as needed */}
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button color="primary" variant="light" onPress={onClose}>
                                                        Close
                                                    </Button>
                                                </ModalFooter>
                                            </>
                                        )}
                                    </ModalContent>
                                </Modal>
                            )}


                        </div>
                    </>
            }
        </div >
    );
};

export default Analytics;
