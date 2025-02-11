import React, { useState, useEffect, useCallback } from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Switch, Spinner, Pagination, CardHeader, CardFooter, Card, CardBody } from "@nextui-org/react";
import { ArrowDown, ArrowUp, ArrowUpDown, Eye } from "lucide-react";
import { Promotional } from '../../APIurl/url';
import Add_Promtion from './Add_promtoial';
import Token from '../../getLoggedUser/GetUserInfomation';
import { message, Tooltip, Select, Input } from 'antd';
import debounce from 'lodash.debounce';
import { Link, NavLink } from 'react-router-dom';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import Swal from 'sweetalert2';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Editor } from "primereact/editor";
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;
import Flatpickr from 'react-flatpickr';

export default function myapplication() {

    const [messageApi, contextHolder] = message.useMessage();
    const [MyPromotional, SetMyPromotional]: any = useState([]);
    const [PromotionalcurrentPage, setCurrentPage] = useState(1);
    const [PromotionalrowsPerPage, setrowsperpage] = useState(10); // Number of rows per page
    const [totalPromotional, setTotalMyPromotional] = useState(1);
    const [sortField, setSortField] = useState("ID");
    const [sortOrder, setSortOrder] = useState("DESC"); // 'asc' or 'desc'
    const rowsPerPageOptions = [10, 20, 50, 100];
    const [load, setLoading] = useState(false);
    const [Promotionalload, setpromotionalLoading] = useState(false);

    const JwtToken = Token('jwt');

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
        setCurrentPage(page);
    };

    useEffect(() => {
        const MyPromotional = async () => {
            setpromotionalLoading(true);
            try {
                const responseData: any = await fetch(`${Promotional}?currentPage=${PromotionalcurrentPage}&rowsPerPage=${PromotionalrowsPerPage}&sortField=${sortField}&sortOrder=${sortOrder}`, {
                    method: 'POST',
                    headers: {
                        Authenticate: `Bearer ${JwtToken}`,
                        'x-token-access': 'true',
                    },
                    body: JSON.stringify({
                        PAGE_REQUEST: 'Get_PromotionalActivity',
                    }),
                });
                const data = await responseData.json();
                SetMyPromotional(await data.data)
                setTotalMyPromotional(data.totalRecords);
            } catch (err: any) {
                messageApi.error(err);
            } finally {
                setpromotionalLoading(false);
                setLoading(false);
            }
        }
        MyPromotional();
    }, [PromotionalcurrentPage, PromotionalrowsPerPage, sortField, sortOrder, load]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const options: any = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const [selectedAnnouncement, setSelectedAnnouncement]: any = useState(null);
    const [Modalhide, setmodalhide]: any = useState(false);
    const [isOpens, setIsOpens] = useState(false);
    const handleViewAnnouncement = (announcement: any) => {
        setSelectedAnnouncement(announcement);
        setIsOpens(true);
        setmodalhide(true);
    };

    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [ANNOUNCEMENTID, setID] = useState('');
    const [editorData, setEditorData] = useState('');
    const [Startdate, setstartdata]: any = useState('');
    const [Enddate, setenddate]: any = useState('');
    const [Updateloader, setupdateLoader] = useState(false);
    const [Selectuser, setselectuser] = useState('All');
    const onOpenChange = (open: any) => setIsOpen(open);
    const HandleEdit = (staff: any) => {
        setID(staff.ID);
        setTitle(staff.Title);
        setselectuser(staff.Select_user);
        setEditorData(staff.Description);
        setstartdata(staff.Start_date);
        setenddate(staff.End_date);
        setIsOpen(true);
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };
    const handleEditorChange = (value: any) => {
        setEditorData(value.htmlValue);
    };
    const handlestartdate = (date: Date[]) => {
        const adjustedDate = new Date(date[0].getTime() - date[0].getTimezoneOffset() * 60000);
        setstartdata(adjustedDate.toISOString());
    };

    const handleenddate = (date: Date[]) => {
        const adjustedDate = new Date(date[0].getTime() - date[0].getTimezoneOffset() * 60000);
        setenddate(adjustedDate.toISOString());
    };


    const HandleDelete = async (id: any) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
            });

            if (result.isConfirmed) {
                setLoading(true);

                const responseData: any = await fetch(
                    `${Promotional}?action=DELETE.Promotional&PromotionalID=${id}`,
                    {
                        method: 'POST',
                        headers: {
                            Authenticate: `Bearer ${JwtToken}`,
                        },
                        body: JSON.stringify({
                            PAGE_REQUEST: 'DELETE.Promotional.DATA',
                        }),
                    }
                );

                const data = await responseData.json();

                if (data.status === true) {
                    message.success('Deleted')
                } else {
                    message.success('Failed to delete the announcement')
                }

                setLoading(false);
            }
        } catch (err) {
            console.error(err);
            Swal.fire('Error', 'An error occurred while deleting the announcement.', 'error');
            setLoading(false);
        }
    };

    const UpdateAnnouncement = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation checks
        if (!title || !editorData || !Startdate || !Enddate) {
            alert('All fields are required');
            return;
        }

        setupdateLoader(true);
        try {
            const response = await fetch(Promotional + '?action=view.client.record&limit=', {
                method: 'POST',
                headers: {
                    Authenticate: `Bearer ${JwtToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    PAGE_REQUEST: 'UPDAET.Promotional.REQUEST',
                    ANNOUNCEMENTID,
                    title,
                    content: editorData,
                    Startdate,
                    Enddate,
                    Selectuser,
                }),
            });

            const data = await response.json();
            if (data.status) {
                setIsOpen(false);
                message.success('Promotional Activity Updated');
            } else {
                message.error('Something went wrong');
            }
        } catch (err) {
            console.error(err);
            alert('Failed to Promotional Activity');
        } finally {
            setLoading(true);
            setupdateLoader(false);
        }
    };

    return (
        <>

            <div className='flex justify-end'>
                {window.globalVariable?.ROLE === 'admin' ?
                    <Add_Promtion setLoading={setLoading} />
                    : ''
                }
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 pt-5">
                <Card className="col-span-2">
                    <CardBody>
                        <Table className="Comment-Table my-application" aria-label="Sortable Table" removeWrapper>
                            <TableHeader>
                                <TableColumn onClick={() => handleSort("sfh.ID")}><span className='flex gap-3'># {renderSortIcon("sfh.ID")}</span></TableColumn>
                                <TableColumn onClick={() => handleSort("cdp.FIRST_NAME")}><span className='flex gap-3'>Title {renderSortIcon("cdp.FIRST_NAME")}</span></TableColumn>
                                <TableColumn>Start date</TableColumn>
                                <TableColumn>End date</TableColumn>
                                <TableColumn>  {window.globalVariable?.ROLE === 'admin' ? 'Action' : 'view'}</TableColumn>
                            </TableHeader>
                            <TableBody emptyContent={"No rows to display."} loadingContent={<Spinner />}
                                loadingState={Promotionalload === true ? 'loading' : 'idle'}>
                                {MyPromotional.map((application: any, index: number) => (
                                    <TableRow key={application.ID}>
                                        <TableCell data-column="#" >{index + 1 + (PromotionalcurrentPage - 1) * PromotionalrowsPerPage}</TableCell>
                                        <TableCell data-column="Title" >{application.Title}</TableCell>
                                        <TableCell data-column="Start date" >{formatDate(application.Start_date)}</TableCell>
                                        <TableCell data-column="End date" >{formatDate(application.End_date)}</TableCell>
                                        <TableCell data-column="Action">
                                            <div className="flex text-2xl gap-3 mobtabalign">
                                                <Tooltip showArrow={true} title="View">
                                                    <Link to="#" onClick={() => handleViewAnnouncement(application)} className="text-blue-500 text-center"> <Eye /></Link>
                                                </Tooltip>
                                                {window.globalVariable?.ROLE === 'admin' ? <>
                                                    <Tooltip showArrow={true} title="Edit">
                                                        <span className="cursor-pointer" onClick={() => HandleEdit(application)} ><CiEdit style={{ color: '#006ed9' }} /></span>
                                                    </Tooltip>
                                                    <Tooltip showArrow={true} title="Delete">
                                                        <span className="cursor-pointer" onClick={() => HandleDelete(application.ID)}><MdDeleteOutline style={{ color: '#ff0000' }} /></span>
                                                    </Tooltip>
                                                </>
                                                    : ''}
                                            </div>
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
                            total={Math.ceil(totalPromotional / PromotionalrowsPerPage)}
                            initialPage={PromotionalcurrentPage}
                            onChange={ApllicationPageChange}
                        />
                    </CardFooter>
                </Card>




                {isOpens == true ?
                    <Modal isOpen={isOpens} onOpenChange={(visible) => setIsOpens(visible)} size='5xl' scrollBehavior={'inside'} className='h-[400px]'>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1 bg-[#f7f8f7] rounded-large">{selectedAnnouncement.Title}</ModalHeader>
                                    <ModalBody>
                                        <div className="Promotional_Description" dangerouslySetInnerHTML={{ __html: selectedAnnouncement.Description }} />
                                    </ModalBody>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                    : ''}




                <Modal size={'2xl'} isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Update Promotional Activity</ModalHeader>
                                <ModalBody>
                                    <form className="grid gap-3" onSubmit={UpdateAnnouncement}>
                                        <div className="titledev grid gap-1">
                                            <span className="text-[#666] font-semibold">Title</span>
                                            <Input type="text" placeholder="Title" value={title} onChange={handleTitleChange} size="large" />
                                        </div>
                                        <div className="selcetuser-dev grid gap-1">
                                            <span className="text-[#666] font-semibold">Select User <small>(e.g. Agent/staff)</small></span>
                                            <Select
                                                showSearch
                                                placeholder="Select"
                                                size="large"
                                                aria-label="Select"
                                                defaultValue={[Selectuser]}
                                                onChange={(value: any) => setselectuser(value)}
                                                options={[
                                                    {
                                                        value: 'All',
                                                        label: 'All',
                                                    },
                                                    {
                                                        value: 'Agent',
                                                        label: 'Agent',
                                                    },
                                                    {
                                                        value: 'Staff',
                                                        label: 'Staff',
                                                    },
                                                ]}
                                            />
                                        </div>

                                        <div className="editor_dev grid gap-1">
                                            <span className="text-[#666] font-semibold">Description</span>
                                            <Editor
                                                value={editorData}
                                                onTextChange={handleEditorChange}
                                                style={{ height: '200px' }}
                                            />
                                        </div>
                                        <div className="editor_dev grid gap-1">
                                            <span className="text-[#666] font-semibold">Start / End Date</span>
                                            <div className='flex'>
                                                <Flatpickr
                                                    name="Deadline"
                                                    className="design_input p-3"
                                                    placeholder="valid till"
                                                    value={Startdate}
                                                    onChange={handlestartdate}
                                                    options={{
                                                        onClose: () => '',
                                                    }}
                                                />
                                                <Flatpickr
                                                    name="Deadline"
                                                    className="design_input p-3"
                                                    placeholder="valid till"
                                                    value={Enddate}
                                                    onChange={handleenddate}
                                                    options={{
                                                        onClose: () => '',
                                                    }}
                                                />
                                            </div>
                                        </div>


                                        <ModalFooter>


                                            <Button className="danger-btn" onPress={onClose}>
                                                Cancel
                                            </Button>
                                            <Button color="primary" type="submit" disabled={Updateloader}>
                                                {Updateloader ? 'Wait..' : 'Update'}
                                            </Button>
                                        </ModalFooter>
                                    </form>
                                </ModalBody>
                            </>
                        )}
                    </ModalContent>
                </Modal>

            </div>
        </>
    )
}
