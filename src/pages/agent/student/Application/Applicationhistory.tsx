import React, { useState, useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spinner } from "@nextui-org/react";
import { v1GETDATA } from '../../../../APIurl/url';
import jwt from '../../../../getLoggedUser/GetUserInfomation';
import { useParams, NavLink } from 'react-router-dom';
import Blank from '../../../../staff/LeadApplication/tab/blank';
import debounce from 'lodash.debounce';
import Emptyimage from '../../../../../public/TableEmpty/Empty.jpg';
export default function App({ FileID, client_id }: any) {

    const [loader, setloader] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const token = jwt('jwt');
    // const { client_id } = useParams();
    const [loaddata, setloaddata] = useState(true);
    const [ApplicationTotal, setApplicaton] = useState([]);
    const [page, setpage] = useState(1);
    const [Totalpage, Settotalpage] = useState(1);


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
                    PAGE_REQUEST: 'Total.applications.json.History',
                    ClientId: client_id,
                    FileID: FileID,
                    page: page,
                }),
            });
            const data = await res.json();
            setApplicaton(data.data);
            Settotalpage(data.total_pages);
            setpage(data.current_page);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setloaddata(false);
        }
    }, 300); // Adjust the debounce delay as needed

    useEffect(() => {
        debouncedTotalapplication();
    }, [page]);


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
        <Table isStriped aria-label="Example static collection table"
            className="table4"

            bottomContent={
                <div className="flex w-full justify-center">
                    <Pagination
                        isCompact
                        showControls
                        showShadow
                        color="primary"
                        page={page}
                        total={Totalpage}
                        onChange={(page) => setpage(page)}
                    />
                </div>
            }
        >
            <TableHeader>
                <TableColumn>Id</TableColumn>
                <TableColumn>Notes</TableColumn>
                <TableColumn>Comment</TableColumn>
                <TableColumn>Date</TableColumn>
            </TableHeader>
            <TableBody emptyContent={<div className='flex justify-center'><img src={Emptyimage} alt="" width={'20%'} /></div>}
                loadingContent={<Spinner size="lg" />}
                loadingState={loaddata ? 'loading' : 'idle'}
            >
                {ApplicationTotal.map((Applicat: any, index: any) => (
                    <TableRow key={index}>
                        <TableCell data-column="Id">{index + 1}</TableCell>
                        <TableCell data-column="Notes">
                            <div
                                dangerouslySetInnerHTML={{ __html: Applicat.NOTES }}
                            />
                        </TableCell>
                        <TableCell data-column="Comment">  <div
                            dangerouslySetInnerHTML={{ __html: Applicat.COMMENT }}
                        /></TableCell>
                        <TableCell data-column="Date">
                            {formatDateTime(Applicat.ACTION_DATE)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
