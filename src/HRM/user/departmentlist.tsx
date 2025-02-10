import React, { useState, useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spinner } from "@nextui-org/react";
import userInfo from '../../getLoggedUser/GetUserInfomation';
import { GETDATA } from '../../APIurl/url';
import debounce from 'lodash.debounce';
import Swal from 'sweetalert2';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { MdDeleteOutline } from "react-icons/md";
import { Button } from "antd";
import Emptyimage from '../../../public/TableEmpty/Empty.jpg';
import { Tooltip } from 'antd';
export default function App() {
    const token = userInfo('jwt');
    const [loader, setLoader] = useState(false);
    const [Refresh, setrefresh] = useState(false);
    const [Stafflist, Setstafflist] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    const GETSTAFF = async () => {
        setLoader(true);
        setrefresh(false);
        const UserAuthID = await userInfo('auth_token');
        try {
            const responseData: any = await fetch(
                `${GETDATA}?currentPage=${currentPage}&rowsPerPage=${rowsPerPage}&sortField=id&sortOrder=desc`,
                {
                    method: 'POST',
                    headers: {
                        Authenticate: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        PAGE_REQUEST: 'GET.COUNTRY.DATA',
                    }),
                }
            );
            const data = await responseData.json();
            console.log(data.data);
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
    }, [currentPage, Refresh]);

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
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                reverseButtons: true,
            });

            if (result.isConfirmed) {
                setLoader(true);
                const responseData: any = await fetch(
                    `${GETDATA}?action=DELETE.ANNOUNCEMENT&AnnouncementID=${id}`,
                    {
                        method: 'POST',
                        headers: {
                            Authenticate: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            PAGE_REQUEST: 'DELETE.COUNTRY.DATA',
                        }),
                    }
                );
                const data = await responseData.json();
                if (data.status == true) {
                    Swal.fire('Deleted!', '', 'success');
                    GETSTAFF();
                } else {
                    Swal.fire('Error', 'Failed to delete the announcement.', 'error');
                }
                setLoader(false);
            }
        } catch (err) {
            console.error(err);
            Swal.fire('Error', 'An error occurred while deleting the announcement.', 'error');
            setLoader(false);
        }
    };



    return (
        <div className="grid gap-4">

            <div className="flex justify-end">

                <Button className="btn btn-primary " onClick={() => setrefresh(true)}>Refresh</Button>
            </div>
            <Table aria-label="Example empty table" className="table6">
                <TableHeader>
                    <TableColumn>#</TableColumn>
                    <TableColumn>Country Name</TableColumn>
                    <TableColumn>Action</TableColumn>
                </TableHeader>
                <TableBody emptyContent={<div className='flex justify-center'><img src={Emptyimage} alt="" width={'20%'} /></div>}
                    loadingContent={<Spinner />}
                    loadingState={loadingState}
                >
                    {Stafflist.length > 0 ? (
                        Stafflist.map((staff: any, index: any) => (
                            <TableRow key={staff.ID}>
                                <TableCell data-column="#">{(currentPage - 1) * rowsPerPage + index + 1}</TableCell>
                                <TableCell data-column="Country Name" style={{ textAlign: 'left' }}>
                                    <div><strong>{staff.COUNTRY_NAME}</strong></div>

                                </TableCell>
                                <TableCell data-column="Action" onClick={() => HandleDelete(staff.ID)} className="cursor-pointer text-2xl delbtnend">
                                    {/* Add actions here if needed */}
                                    <Tooltip showArrow={true} title="Delete">
                                        <MdDeleteOutline style={{ color: '#ff0000' }} />
                                    </Tooltip>
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
    );
}
