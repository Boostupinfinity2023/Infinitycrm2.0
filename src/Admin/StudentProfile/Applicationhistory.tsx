import React, { useState, useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spinner } from "@nextui-org/react";
import { v1GETDATA } from '../../APIurl/url';
import jwt from '../../getLoggedUser/GetUserInfomation';
import { useParams, NavLink } from 'react-router-dom';
import Blank from '../../staff/LeadApplication/tab/blank';
import debounce from 'lodash.debounce';
export default function App({ FileID }: any) {

    const [loader, setloader] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const token = jwt('jwt');
    const { client_id } = useParams();
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
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setloaddata(false);
        }
    }, 300); // Adjust the debounce delay as needed

    useEffect(() => {
        debouncedTotalapplication();
    }, []);

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
                <TableColumn>Responsive persone</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No Application history."}
                loadingContent={<Spinner size="lg" />}
                loadingState={loaddata ? 'loading' : 'idle'}
            >
                {ApplicationTotal.map((Applicat: any, index: any) => (
                    <TableRow key={index}>
                        <TableCell data-column="Id">{index + 1}</TableCell>
                        <TableCell data-column="Notes">{Applicat.NOTES}</TableCell>
                        <TableCell data-column="Comment">{Applicat.COMMENT}</TableCell>
                        <TableCell data-column="Responsive persone">{Applicat.CLIENT_NAME} - ({Applicat.COUNTRY_NAME})</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
