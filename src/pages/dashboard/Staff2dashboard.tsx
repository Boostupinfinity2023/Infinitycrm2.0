import { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import CustomIcon1 from '../../../public/Icon/CustomIcon1';
import CustomIcon2 from '../../../public/Icon/CustomIcon6';
import CustomIcon3 from '../../../public/Icon/CustomIcon7';
import CustomIcon4 from '../../../public/Icon/CustomIcon8';

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Spinner } from "@nextui-org/react";
import { Link } from 'react-router-dom';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import Token from '../../getLoggedUser/GetUserInfomation';
import { v1Dashboard } from '../../APIurl/url';
import { DatePicker, Space } from 'antd';
import '../../Admin/University/modal/modal-phone.css';
import './adminresponsive.css';
import {
    Card, CardBody, Breadcrumbs,
    BreadcrumbItem, Select, SelectItem, Dropdown as Dropdowns
} from "@nextui-org/react";
const { RangePicker } = DatePicker;
const Analytics = () => {
    const [isOpen, setIsOpen] = useState(true); // Modal will open by default
    const globalVar = window.globalVariable;
    const JwtToken = Token('jwt');
    const [AdminCountry, Setadmincountry]: any = useState();
    const [AgentData, SetAgentData]: any = useState();
    const [HISTORYCHART, Sethistorychart]: any = useState();
    const [PerformanceCHART, SetPerformancechart]: any = useState();
    const [HistoryYear, SetHistoryYear]: any = useState();
    const [HistoryCountry, SetHistorycountry]: any = useState();
    const [PerformanceYear, SetPerformanceYear]: any = useState();
    const [PerformanceCountry, SetPerformancecountry]: any = useState();


    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [Announcement, SetAnnouncement]: any = useState([]);
    const [loader, Setloader]: any = useState(false);


    const [selectedAnnouncement, setSelectedAnnouncement]: any = useState(null);
    const [Modalhide, setmodalhide]: any = useState(false);

    const handleViewAnnouncement = (announcement: any) => {
        setSelectedAnnouncement(announcement);
        setmodalhide(true);
    };


    const [loading] = useState(false);

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





    const Topbar = async () => {
        try {
            const responseData: any = await fetch(v1Dashboard, {
                method: 'POST',
                headers: {
                    Authenticate: `Bearer ${JwtToken}`,
                    'x-token-access': 'true',
                },
                body: JSON.stringify({
                    PAGE_REQUEST: 'STAFF.DASHBOARD.TOPBAR.',
                    RequesterUser: 'Admin',
                }),
            });
            const data = await responseData.json();
            SetAgentData(await data.data[0])

        } catch (err) {
            console.error(err);

        }
    }



    const debouncedgettopbar = debounce(Topbar, 300);





    useEffect(() => {
        debouncedgettopbar();
    }, [AdminCountry]);


    const Historychart = async () => {
        try {
            const responseData: any = await fetch(v1Dashboard, {
                method: 'POST',
                headers: {
                    Authenticate: `Bearer ${JwtToken}`,
                    'x-token-access': 'true',
                },
                body: JSON.stringify({
                    PAGE_REQUEST: 'ADMIN.DASHBOARD.HISTORYCHART',
                    RequesterUser: 'ADMIN',
                    Historyuser: globalVar?.UID,
                    HistoryYear: HistoryYear,
                    HistoryCountry: HistoryCountry,
                }),
            });
            const data = await responseData.json();
            Sethistorychart(await data.data[0])

        } catch (err) {
            console.error(err);

        }
    }

    const debouncedhistorychart = debounce(Historychart, 300);

    useEffect(() => {
        if (globalVar != null) {
            debouncedhistorychart();
        }
    }, [globalVar]);


    const Performancechart = async () => {
        try {
            const responseData: any = await fetch(v1Dashboard, {
                method: 'POST',
                headers: {
                    Authenticate: `Bearer ${JwtToken}`,
                    'x-token-access': 'true',
                },
                body: JSON.stringify({
                    PAGE_REQUEST: 'ADMIN.DASHBOARD.PerformanceCHART',
                    RequesterUser: 'ADMIN',
                    PerformanceCountry: PerformanceCountry,
                    PerformanceYear: PerformanceYear,
                    Performanceuser: 1
                }),
            });
            const data = await responseData.json();
            SetPerformancechart(await data)

        } catch (err) {
            console.error(err);

        }
    }
    const debouncedPerformancechart = debounce(Performancechart, 300);

    useEffect(() => {
        if (globalVar != null) {
            debouncedPerformancechart();
        }
    }, [globalVar]);


    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 6 }, (_, i) => currentYear - i);


    const salesByCategory: any = {
        series: [AgentData?.Total_Leave_approved || 0, AgentData?.Total_Leave_notapproved || 0],
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
            colors: ['#00CD69', '#0975DE', '#FF5C24'],
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
            labels: ['Approved leave', 'Unapproved'],
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
    const uniqueVisitorSeries: any = {
        series: [
            {
                name: 'No. of Application Rejected',
                data: [HISTORYCHART?.TOTAL_Rejected],
            },
            {
                name: 'No. of Application Accepted',
                data: [HISTORYCHART?.TOTAL_Accepted],
            },
            {
                name: 'No. of Application Completed',
                data: [HISTORYCHART?.TOTAL_Complete],
            },

        ],
        options: {
            chart: {
                height: 360,
                type: 'bar',
                fontFamily: 'Sora',
                toolbar: {
                    show: false,
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                width: 20,
                colors: ['transparent'],
            },
            colors: ['#FF5C24', '#0975DE', '#00CD69'],
            dropShadow: {
                enabled: true,
                color: '#515365',
                opacity: 2,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '50%',
                    borderRadius: 0,
                    borderRadiusApplication: 'end',
                },
            },
            legend: {
                position: 'bottom',
                horizontalAlign: 'center',
                fontSize: '14px',
                itemMargin: {
                    horizontal: 3,
                    vertical: 3,
                },
            },
            grid: {
                borderColor: '#e0e6ed',
                padding: {
                    left: 20,
                    right: 20,
                },
                xaxis: {
                    lines: {
                        show: false,
                    },
                },
            },
            xaxis: {
                categories: ['All Staff'],
                axisBorder: {
                    show: true,
                    color: '#e0e6ed',
                },
            },
            yaxis: {
                tickAmount: 6,
                opposite: false,
                labels: {
                    offsetX: 0,
                },
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'light',
                    type: 'vertical',
                    shadeIntensity: 0.3,
                    inverseColors: false,
                    opacityFrom: 100,
                    opacityTo: 100,
                    stops: [0, 100],
                },
            },
            tooltip: {
                marker: {
                    show: true,
                },
            },
        },
    };
    const revenueChart: any = {
        series: [
            {
                name: 'All Staff',
                data: PerformanceCHART ? PerformanceCHART : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            },
        ],
        options: {
            chart: {
                height: 200,
                type: 'area',
                fontFamily: 'sora',
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
            colors: ['#1B55E2'],
            markers: {
                discrete: [
                    {
                        seriesIndex: 0,
                        dataPointIndex: 6,
                        fillColor: '#1B55E2',
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
                    offsetX: 0,
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
                    offsetX: -10,
                    offsetY: 0,
                    style: {
                        fontSize: '12px',
                        cssClass: 'apexcharts-yaxis-title',
                    },
                },
                opposite: false,
            },
            grid: {
                borderColor: '#E0E6ED',
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
                    opacityFrom: 0.28,
                    opacityTo: 0.05,
                    stops: [45, 100],
                },
            },
        },
    };
    const siderStyle: React.CSSProperties = {
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        insetInlineStart: 0,
        top: 0,
        bottom: 0,
        scrollbarWidth: 'thin',
        scrollbarColor: 'unset',
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
                {/* <Button className="All_Countries">All Countries <IconCaretDown /></Button> */}
            </div>

            <div className="pt-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <Card>
                        <CardBody className="flex flex-col items-center justify-center p-4 gap-4">
                            <CustomIcon1 />
                            <div className="total_number">Total Application : <span className="">{AgentData?.Total_Apllication || 0}</span></div>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody className="flex flex-col items-center justify-center p-4 gap-4">
                            <CustomIcon4 />
                            <div className="total_number">Applications Complete : <span className="">{AgentData?.Total_Apllication_Complete || 0}</span></div>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody className="flex flex-col items-center justify-center p-4 gap-4">
                            <CustomIcon2 />
                            <div className="total_number">Application Accepted : <span className="">{AgentData?.Total_Apllication_Accepted || 0}</span></div>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody className="flex flex-col items-center justify-center p-4 gap-4">
                            <CustomIcon3 />
                            <div className="total_number">Rejected: <span className="">{AgentData?.Total_Apllication_Rejected || 0}</span></div>
                        </CardBody>
                    </Card>
                </div>


            </div>

            <div className="grid grid-cols-3 lg:grid-cols-3 gap-8">
                <Card className="col-span-2">
                    <CardBody className="p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="graph_heading">Announcements</h3>
                            <Link to="#" className="text-blue-500 text-sm">View All</Link>
                        </div>
                        <ul className="space-y-2">
                            {Announcement.length > 0 ? (
                                Announcement.map((announcement: any, i: any) => (
                                    <li key={i} className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm">
                                        <span className="mb-1 sm:mb-0">{announcement.TITLE}</span>
                                        <div className="flex items-center space-x-2">
                                            <Link to="#" onClick={() => handleViewAnnouncement(announcement)} className="text-blue-500">View Announcement</Link>
                                            <span className="text-gray-400">{announcement.CREATE_AT}</span>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <li className="flex justify-center items-center">No Announcement Data</li>
                            )}
                        </ul>

                    </CardBody>
                </Card>
                <Card className="col-span-1">
                    <CardBody className="p-4">
                        <h3 className="graph_heading">Leave Requests</h3>
                        <ReactApexChart className="set_graph" series={salesByCategory.series} options={salesByCategory.options} type="donut" height={460} />
                    </CardBody>
                </Card>
            </div>

            <div className="mt-3 grid grid-cols-2 lg:grid-cols-2 gap-8">

                <Card className="col-span-2">
                    <CardBody className="p-4">
                        <div className="flex justify-between gap-4">
                            <div className="col-span-6">
                                <h3 className="graph_heading">History</h3>
                                {/* <p className="set_par_text">This is a dummy text placeholder</p> */}
                            </div>

                            <div className="col-span-1">
                                <Select

                                    placeholder="2024"
                                    className="bg-default w-[200px]"
                                    onChange={(e) => SetHistoryYear(e.target.value)}
                                >
                                    <SelectItem key={'2024'}>
                                        2024
                                    </SelectItem>
                                    <SelectItem key={'2023'}>
                                        2023
                                    </SelectItem>
                                    <SelectItem key={'2022'}>
                                        2022
                                    </SelectItem>
                                    <SelectItem key={'2021'}>
                                        2021
                                    </SelectItem>
                                    <SelectItem key={'2020'}>
                                        2020
                                    </SelectItem>
                                </Select>
                            </div>

                        </div>
                        <ReactApexChart options={uniqueVisitorSeries.options} series={uniqueVisitorSeries.series} type="bar" height={360} className="overflow-hidden" />
                    </CardBody>
                </Card>
            </div>

            <div className="mt-3 grid grid-cols-2 lg:grid-cols-2 gap-8">

                <Card className="col-span-2">
                    <CardBody className="p-4">
                        <div className="flex justify-between gap-4">
                            <div className="col-span-6">
                                <h3 className="graph_heading">Performance</h3>
                                {/* <p className="set_par_text">This is a dummy text placeholder</p> */}
                            </div>

                            <div className="col-span-1">
                                <Select
                                    placeholder="2024"
                                    className="bg-default w-[200px]"
                                    onChange={(e) => SetPerformanceYear(e.target.value)}
                                >
                                    <SelectItem key={'2021'}>
                                        2021
                                    </SelectItem>
                                    <SelectItem key={'2022'}>
                                        2022
                                    </SelectItem>
                                    <SelectItem key={'2023'}>
                                        2023
                                    </SelectItem>
                                    <SelectItem key={'2024'}>
                                        2024
                                    </SelectItem>
                                </Select>
                            </div>

                        </div>
                        <ReactApexChart series={revenueChart.series} options={revenueChart.options} type="area" height={325} />
                    </CardBody>
                </Card>
            </div>

            {Modalhide == true ?
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


        </div>
    );
};

export default Analytics;
