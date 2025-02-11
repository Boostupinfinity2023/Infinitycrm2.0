import React, { useState, useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination } from "@nextui-org/react"
import jwt from '../../../getLoggedUser/GetUserInfomation';
import { v1GETDATA } from '../../../APIurl/url';
import { useParams, NavLink } from 'react-router-dom';
import Blank from '../../../staff/LeadApplication/tab/blank';
import debounce from 'lodash.debounce';
import Emptyimage from '../../../../public/TableEmpty/Empty.jpg';
const ApplicationHistory = () => {

  const [loader, setloader] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const token = jwt('jwt');
  const { client_id } = useParams();
  const { file_id } = useParams();
  const [loaddata, setloaddata] = useState(true);
  const [ApplicationTotal, setApplicaton] = useState([]);
  const [page, setpage] = useState(1);
  const [Totalpage, settotalpage] = useState(1);

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
          PAGE_REQUEST: 'Total.applications.json.History.Staff',
          ClientId: client_id,
          FileID: file_id,
          page: page
        }),
      });
      const data = await res.json();
      setApplicaton(data.data);
      settotalpage(data.total_pages);
      setpage(data.current_page);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setloaddata(false);
    }
  }, 300);


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
    <>
      <Table removeWrapper aria-label="Example static collection table" className="tableLong_data aphesup">
        <TableHeader className="set_border_th_bg_color">
          <TableColumn className="app_history_table_heading">#</TableColumn>
          <TableColumn className="app_history_table_heading">Date</TableColumn>
          <TableColumn className="app_history_table_heading">Comment</TableColumn>
          <TableColumn className="app_history_table_heading">Status</TableColumn>
        </TableHeader>
        <TableBody emptyContent={<div className='flex justify-center'><img src={Emptyimage} alt="" width={'20%'} /></div>}>
          {ApplicationTotal.map((Applicat: any, index: any) => (
            <TableRow key={index + 1}>
              <TableCell data-column="#">{index + 1}</TableCell>
              <TableCell data-column="Date">{formatDateTime(Applicat.ACTION_DATE)}</TableCell>
              <TableCell data-column="Comment"><div dangerouslySetInnerHTML={{ __html: Applicat.COMMENT }} /></TableCell>
              <TableCell data-column="Status"><div dangerouslySetInnerHTML={{ __html: Applicat.NOTES }} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {ApplicationTotal.length > 0 ?
        <div className='flex justify-center mt-4'>
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
        : ''}

    </>
  );
};

export default ApplicationHistory;
