import React, { useState, useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { Card, CardBody } from "@nextui-org/react";
import { v1GETDATA } from '../../../APIurl/url';
import jwt from '../../../getLoggedUser/GetUserInfomation';
import { useParams, NavLink } from 'react-router-dom';
import Blank from '../../../staff/LeadApplication/tab/blank';
import ViewApplication from './Totalapplicationview';
import debounce from 'lodash.debounce';
import { Chip } from "@nextui-org/react";
import './TotalApplication.css';
import { Tooltip } from 'antd';
import Emptyimage from '../../../../public/TableEmpty/Empty.jpg';
import {
    CheckOutlined,
    CloseOutlined,
    EyeOutlined,

} from '@ant-design/icons';
export default function App() {
    const [loader, setloader] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [RESPONSIVE_PERSON, setRESPONSIVE_PERSON] = useState(null);
    const token = jwt('jwt');
    const { client_id } = useParams();
    const [loaddata, setloaddata] = useState(true);
    const [ApplicationTotal, setApplicaton] = useState([]);

    const debouncedTotalapplication = debounce(async () => {
        setloaddata(true);
        try {
            const res = await fetch(v1GETDATA, {
                method: 'POST',
                headers: {
                    Authenticate: `Bearer ${token}`,
                    'x-token-access': `true`,
                },
                body: JSON.stringify({
                    PAGE_REQUEST: 'Total.applications.json',
                    ClientId: client_id,
                }),
            });
            const data = await res.json();
            setApplicaton(data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setloaddata(false);
        }
    }, 300); // Adjust the debounce delay as needed

    useEffect(() => {
        debouncedTotalapplication();
    }, []);


    const handleOpenModal = (application: any, RESPONSIVE_PERSON: any) => {
        setSelectedApplication(application);
        setRESPONSIVE_PERSON(RESPONSIVE_PERSON);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedApplication(null);
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
    return (

        loaddata ? (
            <Blank />
        ) : (<>
            <Card >
                <CardBody className="mobilpad0">
                    <Table removeWrapper aria-label="Example static collection table" className="tableLong_data Total-application">
                        <TableHeader>
                            <TableColumn>Transfer Date</TableColumn>
                            <TableColumn>Application ID</TableColumn>
                            <TableColumn>Responsive Persone</TableColumn>
                            <TableColumn>Application Status</TableColumn>
                            <TableColumn>Action</TableColumn>
                        </TableHeader>
                        <TableBody emptyContent={<div className='flex justify-center'><img src={Emptyimage} alt="" width={'20%'} /></div>}>
                            {ApplicationTotal.map((Applicat: any, index: any) => (
                                <TableRow key={index}>
                                    <TableCell data-column="Transfer Date"><span className="design_span_td"  >{formatDateTime(Applicat?.SENDING_DATE_TIME)}</span></TableCell>
                                    <TableCell data-column="Application Id"><span className="design_span_td" >#App-{Applicat?.ID}</span></TableCell>
                                    <TableCell data-column="Responsive Persone"><span className="design_span_td" > {Applicat?.CLIENT_NAME} - ({Applicat?.COUNTRY_NAME})</span></TableCell>
                                    <TableCell className="design_span_td" data-column="Application Status">
                                        {Applicat.CURRENT_STATUTS === 'In-Hand' ? (
                                            <Chip

                                                variant="dot"
                                                color="success"
                                                className="design_span_td2 border-none" data-column="Application Status"
                                            >
                                                Accepted
                                            </Chip>
                                        ) : Applicat.CURRENT_STATUTS === 'Not-accepted' ? (
                                            <Chip

                                                variant="dot"
                                                color="danger"
                                                className="design_span_td2" data-column="Application Status"
                                            >
                                                Not Accepted
                                            </Chip>

                                        ) :

                                            <Tooltip title={Applicat.Rejected_Comment}>
                                                <Chip

                                                    variant="dot"
                                                    color="danger"
                                                    className="design_span_td2" data-column="Application Status"
                                                >Rejected
                                                </Chip>
                                            </Tooltip>

                                        }
                                    </TableCell>
                                    <TableCell data-column="Action">
                                        <div className="relative flex items-center gap-2 design_span_td3 mobtabalign" >
                                            {/* <Tooltip content="Details"> */}
                                            <EyeOutlined className="text-lg text-default-400 cursor-pointer active:opacity-50 "
                                                onClick={() => handleOpenModal(Applicat?.ID, Applicat?.RESPONSIVE_PERSON)} />
                                            {/* </Tooltip> */}
                                        </div>
                                    </TableCell>
                                </TableRow>


                            ))}

                        </TableBody>
                    </Table>
                </CardBody>
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
        </>
        )

    );
}
