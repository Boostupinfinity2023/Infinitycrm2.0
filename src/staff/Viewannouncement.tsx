import React, { useState, useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spinner } from "@nextui-org/react";
import Addanno from "../Admin/Announcement/Addannoun";
import userInfo from '../getLoggedUser/GetUserInfomation';
import { ClockAPI } from '../APIurl/url';
import { UPDATE } from '../APIurl/url';
import debounce from 'lodash.debounce';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { Tooltip } from 'antd';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Input, message } from 'antd';
import { Select } from 'antd';
import { Editor } from "primereact/editor";
import Flatpickr from 'react-flatpickr';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
export default function App() {
    const MySwal = withReactContent(Swal);
    const globalVar = window.globalVariable;
    const token = userInfo('jwt');
    const [loader, setLoader] = useState(false);
    const [Updateloader, setupdateLoader] = useState(false);
    const [Refrsh, setrefrshing] = useState(false);
    const [Stafflist, Setstafflist] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);


    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [ANNOUNCEMENTID, setID] = useState('');
    const [editorData, setEditorData] = useState('');
    const [deadline, setDeadline] = useState('');
    const [Selectuser, setselectuser] = useState('All');
    const onOpenChange = (open: any) => setIsOpen(open);

    const GETSTAFF = async () => {
        setLoader(true);
        const UserAuthID = await userInfo('auth_token');
        try {
            const responseData: any = await fetch(
                `${ClockAPI}?currentPage=${currentPage}&rowsPerPage=${rowsPerPage}&sortField=id&sortOrder=desc`,
                {
                    method: 'POST',
                    headers: {
                        Authenticate: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        PAGE_REQUEST: 'GET.ANNOUNCEMENT.DATA',
                    }),
                }
            );
            const data = await responseData.json();

            Setstafflist(data.data);
            setTotalPages(Math.ceil(data.total / rowsPerPage)); // Adjust total pages calculation
            setLoader(false);
        } catch (err) {
            console.error(err);
            setLoader(false);
        }
    };

    const debouncedGetStaff = debounce(GETSTAFF, 300);

    useEffect(() => {
        debouncedGetStaff();
    }, [currentPage, Refrsh]);

    const handlePageChange = (page: any) => {
        setCurrentPage(page);
    };

    const loadingState = loader ? "loading" : "idle";


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
                setLoader(true);
                const responseData: any = await fetch(
                    `${ClockAPI}?action=DELETE.ANNOUNCEMENT&AnnouncementID=${id}`,
                    {
                        method: 'POST',
                        headers: {
                            Authenticate: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            PAGE_REQUEST: 'DELETE.ANNOUNCEMENT.DATA',
                        }),
                    }
                );
                const data = await responseData.json();
                if (data.status == true) {
                    message.success('Deleted');
                    GETSTAFF();
                } else {
                    message.error('Failed to delete announcement');
                }
                setLoader(false);
            }
        } catch (err) {

            setLoader(false);
        }

    }

    const handleEditorChange = (value: any) => {
        setEditorData(value.htmlValue);
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleDeadlineChange = (date: Date[]) => {
        const localDateString = date[0].toLocaleDateString('en-CA');
        setDeadline(localDateString);

    };

    const HandleEdit = (staff: any) => {
        setID(staff.ID);
        setTitle(staff.TITLE);
        setselectuser(staff.USER_TYPE);
        setEditorData(staff.DETAILS);
        setDeadline(staff.POST_DEADLINE);
        setIsOpen(true);
    };

    const UpdateAnnouncement = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation checks
        if (!title || !editorData || !deadline) {
            alert('All fields are required');
            return;
        }

        setupdateLoader(true);
        try {
            const response = await fetch(UPDATE + '?action=view.client.record&limit=', {
                method: 'POST',
                headers: {
                    Authenticate: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    PAGE_REQUEST: 'UPDAET.ANNOUNCEMENT.REQUEST',
                    ANNOUNCEMENTID,
                    title,
                    content: editorData,
                    deadline,
                    Selectuser,
                }),
            });

            const data = await response.json();
            if (data.status) {
                setIsOpen(false);
                message.success('Announcement Updated');
                GETSTAFF();

            } else {
                message.error('Something went wrong');
            }
        } catch (err) {
            console.error(err);
            alert('Failed to publish announcement');
        } finally {
            setrefrshing(true);
            setupdateLoader(false);
        }
    };

    return (
        <>
            <div className="grid gap-4">

                <div className="flex justify-end">
                    <Addanno Refresh={setrefrshing} />
                </div>

                <Table aria-label="Example empty table" className='table6'>
                    <TableHeader>
                        <TableColumn>#</TableColumn>
                        <TableColumn style={{ width: '70%', textAlign: 'left' }}>Announcement</TableColumn>
                        <TableColumn>Action</TableColumn>
                    </TableHeader>
                    <TableBody emptyContent={"No rows to display."}
                        loadingContent={<Spinner />}
                        loadingState={loadingState}
                    >
                        {Stafflist.length > 0 ? (
                            Stafflist.map((staff: any, index: any) => (
                                <TableRow key={staff.ID}>
                                    <TableCell data-column="#">{(currentPage - 1) * rowsPerPage + index + 1}</TableCell>
                                    <TableCell data-column="Announcement"style={{ textAlign: 'left' }}>
                                        <div><b>{staff.TITLE}</b></div>
                                        <br />
                                        <div className="anntextstyle" dangerouslySetInnerHTML={{ __html: staff.DETAILS }} />
                                    </TableCell >
                                    <TableCell data-column="Action" >
                                        {globalVar.UID == staff.CREATE_BY ?
                                            <div className="flex text-2xl gap-3 mobtabalign">

                                                <Tooltip showArrow={true} title="Edit">
                                                    <span className="cursor-pointer" onClick={() => HandleEdit(staff)}><CiEdit style={{ color: '#006ed9' }} /></span>
                                                </Tooltip>
                                                <Tooltip showArrow={true} title="Delete">
                                                    <span className="cursor-pointer" onClick={() => HandleDelete(staff.ID)}><MdDeleteOutline style={{ color: '#ff0000' }} /></span>
                                                </Tooltip>

                                            </div>
                                            : '---'}
                                        {/* Add actions here if needed */}



                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            []
                        )}
                    </TableBody>
                </Table>

                <div className="flex justify-center">
                    <Pagination
                        isCompact
                        showControls
                        total={totalPages}
                        initialPage={currentPage}
                        onChange={handlePageChange}
                    />
                </div>
            </div>

            <Modal size={'2xl'} isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Update Announcement</ModalHeader>
                            <ModalBody>
                                <form className="grid gap-3" onSubmit={UpdateAnnouncement}>
                                    <Input
                                        type="text"
                                        placeholder="Announcement Title"
                                        // className="design_input"
                                        value={title}
                                        onChange={handleTitleChange}
                                    />
                                    {/* <Input placeholder="Basic usage" onChange={handleTitleChange} value={title} /> */}

                                    <Select
                                        showSearch
                                        placeholder="Select"

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


                                    <Editor
                                        value={editorData}
                                        onTextChange={handleEditorChange}
                                        style={{ height: '320px' }}
                                    />

                                    <Flatpickr
                                        name="Deadline"
                                        className="design_input p-3"
                                        placeholder="valid till"
                                        value={deadline}
                                        onChange={handleDeadlineChange}
                                        options={{
                                            onClose: () => '',
                                            position: "above"
                                        }}
                                    />

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
        </>

    );
}
