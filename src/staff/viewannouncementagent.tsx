import React, { useState, useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spinner } from "@nextui-org/react";
import { Link, NavLink } from 'react-router-dom';
import userInfo from '../getLoggedUser/GetUserInfomation';
import { ClockAPI } from '../APIurl/url';
import debounce from 'lodash.debounce';
import { Eye } from "lucide-react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
export default function App() {
    const globalVar = window.globalVariable;
    const token = userInfo('jwt');
    const [loader, setLoader] = useState(false);
    const [Stafflist, Setstafflist] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

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
    }, [currentPage]);

    const handlePageChange = (page: any) => {
        setCurrentPage(page);
    };

    const loadingState = loader ? "loading" : "idle";


    const HandleDelete = async (id: any) => {
        try {
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
                GETSTAFF();
            } else {
                console.error('Failed to delete announcement.');
            }
            setLoader(false);
        } catch (err) {

            setLoader(false);
        }

    }
    const [selectedAnnouncement, setSelectedAnnouncement]: any = useState(null);
    const [Modalhide, setmodalhide]: any = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const handleViewAnnouncement = (announcement: any) => {
        setSelectedAnnouncement(announcement);
        setIsOpen(true);
        setmodalhide(true);
    };
    return (
        <div className="grid gap-4">



            <Table aria-label="Example empty table" className="tableLong_data_tabmob">
                <TableHeader>
                    <TableColumn>#</TableColumn>
                    <TableColumn>Title</TableColumn>
                    <TableColumn>Date Added</TableColumn>
                    <TableColumn>View</TableColumn>

                </TableHeader>
                <TableBody emptyContent={"No rows to display."}
                    loadingContent={<Spinner />}
                    loadingState={loadingState}
                >
                    {Stafflist.length > 0 ? (
                        Stafflist.map((staff: any, index: any) => (
                            <TableRow key={staff.ID}>
                                <TableCell data-column="#">{(currentPage - 1) * rowsPerPage + index + 1}</TableCell>
                                <TableCell data-column="Title"><div>{staff.TITLE}</div></TableCell>
                                <TableCell data-column="Date Added"><div>{staff.CREATE_AT}</div></TableCell>
                                <TableCell data-column="Date Added"><Link to="#" onClick={() => handleViewAnnouncement(staff)} className="text-blue-500 text-center"> <Eye /></Link></TableCell>
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



            {isOpen == true ?
                <Modal isOpen={isOpen} onOpenChange={(visible) => setIsOpen(visible)} size='5xl' scrollBehavior={'inside'} className='h-[400px]'>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1 bg-[#f7f8f7] rounded-large">{selectedAnnouncement.TITLE}</ModalHeader>
                                <ModalBody>
                                    <div dangerouslySetInnerHTML={{ __html: selectedAnnouncement.DETAILS }} />
                                </ModalBody>
                            </>
                        )}
                    </ModalContent>
                </Modal>
                : ''}

        </div>
    );
}
