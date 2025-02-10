import React, { useState, useEffect, useCallback } from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Switch, Input, Spinner, Pagination, CardHeader, CardFooter, Card, CardBody } from "@nextui-org/react";
import { ArrowDown, ArrowUp, ArrowUpDown, Eye } from "lucide-react";
import { v1Dashboard } from '../../../../APIurl/url';
import Token from '../../../../getLoggedUser/GetUserInfomation';
import { Tooltip } from 'antd';
import ViewApplication from '../Totalapplicationview';
import SortIcon from '@mui/icons-material/Sort';
import debounce from 'lodash.debounce';
export default function myapplication({ pagerefresh }: any) {

    //modal window
    const [openModal, setOpenModal] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [client_id, setclient_id] = useState(null);
    const [RESPONSIVE_PERSON, setRESPONSIVE_PERSON] = useState(null);
    const handleOpenModal = (application: any, client_id: any, RESPONSIVE_PERSON: any) => {
        setSelectedApplication(application);
        setclient_id(client_id);
        setRESPONSIVE_PERSON(RESPONSIVE_PERSON);
        setOpenModal(true);
    };
    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedApplication(null);
    };

    //filter window
    const [Filterhide, setFilterhide] = useState(false);
    const [ApplicationId, setApplicationId] = useState('');
    const [PassportNumber, setPassportNumber] = useState('');
    const [StudentNameEmail, setStudentNameEmail] = useState('');
    const [StudentName, setStudentName] = useState('');

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

    const handleSearchName = useCallback(
        debounce((searchTerm) => {
            setStudentName(searchTerm);
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

    const handleKeyfirstname = (event: any) => {
        const searchTerm = event.target.value;
        handleSearchName(searchTerm);
    };


    const [Myapplication, Setmyappliaction]: any = useState([]);
    const [ApplicationcurrentPage, setapplicationCurrentPage] = useState(1);
    const [ApplicationrowsPerPage, setApplicationrowsperpage] = useState(10); // Number of rows per page
    const [totalApplicationRecords, setTotalApplicationRecords] = useState(0);
    const [sortField, setSortField] = useState("sfh.ID");
    const [sortOrder, setSortOrder] = useState("ASC"); // 'asc' or 'desc'
    const rowsPerPageOptions = [10, 20, 50, 100];
    const [Applictionloading, setApllictionLoading] = useState(false);

    const JwtToken = Token('jwt');


    const trimText = (text: string, length: number) => {
        if (!text) return "Null";
        return text.length > length ? text.substring(0, length) + "..." : text;
    };

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

    const ApllicationPageChange = (page: number) => {
        setapplicationCurrentPage(page);
    };

    useEffect(() => {
        const Myappication = async () => {
            setApllictionLoading(true);
            try {
                const responseData: any = await fetch(`${v1Dashboard}?currentPage=${ApplicationcurrentPage}&rowsPerPage=${ApplicationrowsPerPage}&sortField=${sortField}&sortOrder=${sortOrder}&ApplicationId=${ApplicationId}&passportId=${PassportNumber}&StudentNameEmail=${StudentNameEmail}&StudentName=${StudentName}`, {
                    method: 'POST',
                    headers: {
                        Authenticate: `Bearer ${JwtToken}`,
                        'x-token-access': 'true',
                    },
                    body: JSON.stringify({
                        PAGE_REQUEST: 'Get_myappication',
                        RequesterUser: 'agent',
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
    }, [ApplicationcurrentPage, ApplicationrowsPerPage, sortField, sortOrder, pagerefresh, ApplicationId, PassportNumber, StudentNameEmail, StudentName]);

    function formatDateTime(inputDateTime: any) {
        const date = new Date(inputDateTime);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }

    return (
        <>

            <div className='flex justify-end'>
                <button
                    className="btn modal-btn-custom stubtnup"
                    onClick={() => {
                        Filterhide ? setFilterhide(false) : setFilterhide(true);
                    }}
                >
                    <SortIcon />
                </button>

            </div>

            {Filterhide == true ?
                <div className="grid  gap-3">
                    <div className="col-span-3">
                        <div className="w-full flex flex-col gap-4">
                            <h3 className="h3_tag">Search Application Data</h3>
                            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                <Input size={'md'} type="text" className="color_placeholder" placeholder="Student ID" onChange={handleKeyDown} />
                                <Input size={'md'} type="text" className="color_placeholder" placeholder="Passport Number" onChange={handleKeyDownPassport} />
                                <Input size={'md'} type="text" className="color_placeholder" placeholder="Student Email" onChange={handleKeyDownName} />
                                <Input size={'md'} type="text" className="color_placeholder" placeholder="Student Name" onChange={handleKeyfirstname} />
                            </div>
                        </div>
                    </div>

                </div>
                : ''}

            <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 pt-5">
                <Card className="col-span-2">
                    <CardBody>
                        <Table className="Comment-Table my-application" aria-label="Sortable Table" removeWrapper>
                            <TableHeader>
                                <TableColumn onClick={() => handleSort("sfh.ID")}><span className='flex gap-3'># {renderSortIcon("sfh.ID")}</span></TableColumn>
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
                                        <TableCell data-column="#" >{index + 1 + (ApplicationcurrentPage - 1) * ApplicationrowsPerPage}</TableCell>
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
                                        <TableCell data-column="Action">

                                            <a
                                                href={`/agent/client/view/${application.CLIENT_ID}/${application.CLIENT_ID_Encrypt}`}
                                                className="text-[#006ed9]"
                                            >
                                                <Eye />
                                            </a>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                    </CardBody>
                    <CardFooter className='flex justify-center items-center mt-4'>

                        <Pagination
                            isCompact
                            showControls
                            total={Math.ceil(totalApplicationRecords / ApplicationrowsPerPage)}
                            initialPage={ApplicationcurrentPage}
                            onChange={ApllicationPageChange}
                        />
                    </CardFooter>
                </Card>


                {openModal && (
                    <ViewApplication
                        isOpen={openModal}
                        onClose={handleCloseModal}
                        application={selectedApplication}
                        client_id={client_id}
                        RESPONSIVE_PERSON={RESPONSIVE_PERSON}
                    />
                )}

            </div>
        </>
    )
}
