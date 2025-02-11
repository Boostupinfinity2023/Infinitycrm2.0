import React, { useState, useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue, Chip, Select, SelectItem, User, Spinner, Input } from "@nextui-org/react";

import jwt from '../../../../getLoggedUser/GetUserInfomation';
import { v1GETDATA } from '../../../../APIurl/url';
import { useParams, NavLink } from 'react-router-dom';
import debounce from 'lodash.debounce';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './services.css';
import { Modal, ModalContent, useDisclosure, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { Tooltip, message } from 'antd';
import Emptyimage from '../../../../../public/TableEmpty/Empty.jpg';
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
                    PAGE_REQUEST: 'TOTAL.TASK.JSON.HISTORY.AGENT',
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
                message.success('Status Updated');
            } else {
                message.error(response.message);

            }
        } catch (err) {
            message.error('Error your form and form components please refresh page and try again');
        }
        setloaddata(false);
        setload('idle');
    }
    function formatDateTime(inputDateTime: any) {
        const date = new Date(inputDateTime);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = String(date.getFullYear()).slice(-2); // Last two digits of the year
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12; // The hour '0' should be '12'
        return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
    }

    const [isOpen, setIsOpen] = useState(false);
    const [selectedData, setSelectedData]: any = useState(null);

    const onOpenChange = (open: any) => {
        setIsOpen(open);
        if (!open) {
            setSelectedData(null); // Clear data when modal closes
        }
    };

    const handleViewClick = (data: any) => {
        setSelectedData(data);
        setIsOpen(true);
    };

    return (<>
        <div className="grid gap-4">
            <div className="grid grid-cols-5 gap-2 set_margin_bottom">
               
                <div className="col-span-4  filterhend">
                <h3 className="text-2xl">Filter Task</h3>
                </div>
                
                <div className="col-span-1">
                
                    <div className="w-full flex flex-col gap-4">
                       

                        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                            <Select
                                placeholder="Select Status"
                                size={'sm'}
                                onChange={(e) => {
                                    Setcolstatus(e.target.value);
                                }}
                            >
                                <SelectItem key="Hold">
                                    Hold
                                </SelectItem>
                                <SelectItem key="Pending">
                                    Pending
                                </SelectItem>
                                <SelectItem key="Complete">
                                    Complete
                                </SelectItem>
                            </Select>

                        </div>

                    </div>
                </div>
            </div>
       

            <Table

                aria-label="Example table with client side pagination"
                className="tableLong_data_tabmob"
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
                    <TableColumn >#</TableColumn>
                    <TableColumn >Create By</TableColumn>
                    <TableColumn >Task Title</TableColumn>
                    <TableColumn>Task Create</TableColumn>
                    <TableColumn>Status</TableColumn>
                    <TableColumn>Action</TableColumn>
                </TableHeader>
                <TableBody items={ApplicationTotal} emptyContent={<div className='flex justify-center'><img src={Emptyimage} alt="" width={'20%'} /></div>} loadingContent={<Spinner size="lg" />}
                    loadingState={loaddata ? 'loading' : 'idle'}
                >
                    {ApplicationTotal.map((Applicat: any, index: any) => (
                        <TableRow key={index} className="set_table_call_data">
                            <TableCell data-column="#" >
                                <NavLink className="underline underline-offset-4 text-blue-600" to={`/agent/client/view/${Applicat.FILE_ID}/${Applicat.FILE_CLIENT_ID}`}>
                                    {index + 1}
                                </NavLink>
                            </TableCell>
                            <TableCell data-column="Create By" className="phone_profily_icon">
                                <Tooltip title={Applicat.SENDER_EMAIL}>
                                    <NavLink className="underline underline-offset-4 text-blue-600" to={`/agent/client/view/${Applicat.FILE_ID}/${Applicat.FILE_CLIENT_ID}`}>
                                        <span>{Applicat.SENDER_NAME + `- (${Applicat.SENDER_COUNTRY})`}</span>
                                    </NavLink>
                                </Tooltip>

                            </TableCell>
                            <TableCell data-column="Task Title">
                                <NavLink className="underline underline-offset-4 text-blue-600" to={`/agent/client/view/${Applicat.FILE_ID}/${Applicat.FILE_CLIENT_ID}`}> {Applicat.TASK_TITLE} </NavLink>
                            </TableCell>
                            <TableCell data-column="Task Create">{formatDateTime(Applicat.SENDING_DATE_TIME)}</TableCell>
                            <TableCell data-column="Status" className="tasktbalign">
                                {/* {Applicat.TASK_STATUS} */}
                                <Select 
                                    // label="Select Task Priority"
                                    name="task_priority"
                                    className="set_width_select w-[150px]"
                                    selectedKeys={[`${Applicat.TASK_STATUS}`]}
                                    onChange={(key) => Handaltaskstatus(Applicat.ID, key)}
                                >
                                    <SelectItem  key="Hold"> Hold</SelectItem>
                                    <SelectItem key="Pending"> Pending</SelectItem>
                                    <SelectItem key="Complete"> Complete</SelectItem>
                                </Select>
                            </TableCell>
                            <TableCell data-column="Action"><RemoveRedEyeIcon onClick={() => handleViewClick(Applicat)} /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>



        {selectedData && (
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
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
                                <Button className="danger-btn" onPress={onClose}>
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        )}


    </>
    );
}
