import React, { useState, useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue, Chip, Select, SelectItem, User, Spinner, Input } from "@nextui-org/react";

import jwt from '../../../../getLoggedUser/GetUserInfomation';
import { v1GETDATA } from '../../../../APIurl/url';
import { useParams, NavLink } from 'react-router-dom';
import debounce from 'lodash.debounce';
import Emptyimage from '../../../../../public/TableEmpty/Empty.jpg';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Tooltip, Space } from 'antd';
import './Commission.css'
export default function App() {

    const wordLimit = 20; // Set your desired word limit

    const truncatedDescription = (description: any, limit: any) => {
        const words = description.split(' ');
        if (words.length <= limit) return description;
        return words.slice(0, limit).join(' ') + '...';
    };


    const MySwal = withReactContent(Swal);
    const token = jwt('jwt');
    const [loaddata, setloaddata] = useState(false);
    const [load, setload] = useState('');
    const [Refresh, SetRefresh] = useState(false);
    const [Page, Setpage] = useState(1);
    const [ApplicationTotal, setApplicaton] = useState([]);
    const [Totalpage, settotalpage] = useState(1);
    const [ColStatus, Setcolstatus]: any = useState();

    const debouncedTotalapplication = debounce(async () => {
        setloaddata(true);
        setload('loading');
        try {
            const res = await fetch(v1GETDATA, {
                method: 'POST',
                headers: {
                    Authenticate: `Bearer ${token}`,
                    'x-token-access': `true`,
                },
                body: JSON.stringify({
                    PAGE_REQUEST: 'TOTAL.COMMISSION.JSON.HISTORY.AGENT',
                    Page: Page,
                    ColStatus: ColStatus == "" ? null : ColStatus,
                }),
            });
            const data = await res.json();
            setApplicaton(data.data);
            settotalpage(data.total_pages)
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setload('idle');
            setloaddata(false);
        }
    }, 300);


    useEffect(() => {
        debouncedTotalapplication();
    }, [Refresh, ColStatus]);



    const Handaltaskstatus = async (ID: any, key: any) => {
        let statusdata = key.target.value;
        setloaddata(true);
        setload('loading');
        try {
            const res = await fetch(v1GETDATA + '?action=insertComment', {
                method: 'POST',
                headers: {
                    Authenticate: `Bearer ${token}`,
                    'x-token-access': `true`,
                },
                body: JSON.stringify({
                    PAGE_REQUEST: 'TASK.UPDATE.AGENT',
                    ID: ID,
                    statusdata: statusdata,
                }),
            });

            const response = await res.json();
            if (response.status == true) {

                MySwal.fire({
                    title: response.message,
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    showCloseButton: true,
                    customClass: {
                        popup: `color-default`,
                    },
                })
            } else {
                MySwal.fire({
                    title: response.message,
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    showCloseButton: true,
                    customClass: {
                        popup: `color-danger`,
                    },
                });
            }
        } catch (err) {
            MySwal.fire({
                title: 'Error your form and form components please refresh page and try again',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                showCloseButton: true,
                customClass: {
                    popup: `color-success`,
                },
            });
        }
        setloaddata(false);
        setload('idle');
    }


    return (<>
        <div className="commission grid gap-4">
            <div className="grid grid-cols-5 gap-4">
                <div className="col-span-4">
                    <h3 className="text-2xl">COMMISSION </h3>

                </div>
                <div className="col-span-1">
                    <div className="w-full flex flex-col gap-4 ">
                        <Space className="filterSelAlign">
                            <h3 className="text-2xl">Filter</h3>

                            <div className="flex w-full flex-wrap gap-4">
                                <Select
                                    placeholder="Select Status"
                                    size={'sm'}
                                    onChange={(e) => {
                                        Setcolstatus(e.target.value);
                                    }}
                                >
                                    <SelectItem key="Paid">
                                        Paid
                                    </SelectItem>
                                    <SelectItem key="Unpaid">
                                        Unpaid
                                    </SelectItem>
                                </Select>

                            </div>
                        </Space>

                    </div>
                </div>
            </div>

            <Table
                className="CommissionsTable"
                aria-label="Example table with client side pagination"
                bottomContent={
                    <div className="flex w-full justify-center">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="primary"
                            page={Page}
                            total={Totalpage}
                            onChange={(page) => Setpage(page)}
                        />
                    </div>
                }
                classNames={{
                    wrapper: "min-h-[222px]",
                }}
            >
                <TableHeader >
                    <TableColumn >Client Name & Email</TableColumn>
                    <TableColumn >Application Country</TableColumn>
                    <TableColumn>Complete By</TableColumn>
                    <TableColumn>Commission Price</TableColumn>
                    <TableColumn>Last Comment</TableColumn>
                    <TableColumn>Commission Status</TableColumn>

                </TableHeader>
                <TableBody items={ApplicationTotal} emptyContent={<div className='flex justify-center'><img src={Emptyimage} alt="" width={'20%'} /></div>} loadingContent={<Spinner size="lg" />}
                    loadingState={loaddata ? 'loading' : 'idle'}
                >
                    {ApplicationTotal.map((Applicat: any, index: any) => (
                        <TableRow key={index} >
                            <TableCell data-column="Client Name & Email">
                                <span>
                                    <Tooltip color="#006ed9" title={
                                        <>
                                            <p><b>Email :</b> {Applicat.student_email}</p>
                                            <p><b>Number :</b> {Applicat.student_number}</p>
                                        </>
                                    } overlayStyle={{ maxWidth: '100%' }} >
                                        <NavLink to={`/agent/client/view/${Applicat.student_ID}/${Applicat.student_UUID}`}>
                                            <b></b> {Applicat.FIRST_NAME} {Applicat.MIDDLE_NAME} {Applicat.LAST_NAME}
                                        </NavLink>
                                    </Tooltip>
                                </span>
                            </TableCell>
                            <TableCell data-column="Application Country">

                                {
                                    Applicat.COUNTRY_NAME
                                }

                            </TableCell>
                            <TableCell data-column="Complete By">
                                <span>
                                    <Tooltip color="#006ed9" title={
                                        <>
                                            <p><b>Email :</b> {Applicat.staff_email}</p>
                                            <p><b>Number :</b> {Applicat.staff_number}</p>
                                        </>
                                    } overlayStyle={{ maxWidth: '100%' }} >

                                        {Applicat.staff_name}

                                    </Tooltip>
                                </span>

                            </TableCell>

                            <TableCell data-column="Commission Price">
                                <span >
                                    {Applicat.CURRENCY_TYPE}
                                    {Applicat.COMMISSION_PRICE}
                                </span>
                            </TableCell>
                            <TableCell data-column="Last Comment">{Applicat.LAST_COMMENT ? Applicat.LAST_COMMENT : '--'}</TableCell>
                            <TableCell data-column="Commission Status">{Applicat.PAID_COMMSSION_STATUS}</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    </>
    );
}
