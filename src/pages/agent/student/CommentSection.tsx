import { useState, useEffect } from 'react'
import jwt from '../../../getLoggedUser/GetUserInfomation';
import { DatePicker } from 'antd';
import { useParams } from 'react-router-dom';
import { Pagination } from "@nextui-org/react";
import { INSERTDATA } from '../../../APIurl/url';
import { GETDATA } from '../../../APIurl/url';
import { v1GETDATA } from '../../../APIurl/url';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User } from "@nextui-org/react";
import Emptyimage from '../../../../public/TableEmpty/Empty.jpg';
import ADDCOMMENT from './ADDCOMMENT';

interface CommentData {
  ID: number;
  COMMENT_ID: number;
  COMMENT_RELETED: string;
  COMMENT_TEXT: string;
  IS_PUBLIC: boolean;
  COMMENT_DATE: string;
  COMMENT_LAST_UPDATE: string;
  RESPONSIVE_PERSON_NAME: string;
  RESPONSIVE_PERSON_PROFILE_URL: string;
  RESPONSIVE_PERSON_ID: number;
  RESPONSIVE_PERSON_EMAIL: string;
}
interface ResponsiveUser {
  RESPONSIVE_PERSON: number;
  CLIENT_NAME: string;
  BRANCH: number;
  COUNTRY_NAME: string;
}

export default function CommentSection() {
  const MySwal = withReactContent(Swal);
  const [selectedValues, setselectedValues] = useState<string[]>([]);

  const userSelectChange = (value: any) => {
    if (value.includes('All_Memmber')) {
      const filteredValue: any = ['All_Memmber'];

      setselectedValues(filteredValue);
    } else {
      console.log(value);
      setselectedValues(value);
    }
  };




  //handalcomment form control 
  const token = jwt('jwt');
  const { client_id } = useParams();
  const [loader, setloader] = useState(false);
  const [refresh, setrefresh] = useState(false);



  // fetch data of Comment
  const { RangePicker } = DatePicker;
  const [loaddata, setloaddata] = useState(true);

  const [limit, setlimit] = useState(10);
  const [page, setpage] = useState(1);
  const [Totalpage, settotalpage] = useState(1);
  const [daterange, setdaterange] = useState('');
  const [userby, setuserBy] = useState('');
  const [totalData, settotalData] = useState(0);
  const [CommentData, setCommentdata] = useState<CommentData[]>([]);
  const [Responsiveuser, setResponsive] = useState<ResponsiveUser[]>([]);
  const Commentfetch = async () => {
    setloaddata(true);
    const res = await fetch(GETDATA + `?limit=${limit}&page=${page}&daterange=${daterange}&userby=${userby}`, {
      method: 'POST',
      headers: {
        Authenticate: `Bearer ${token}`,
        'x-token-access': `true`,
      },
      body: JSON.stringify({
        PAGE_REQUEST: 'CLIENT_FILE_COMMENT_DATA_LIST',
        ClientId: client_id,
      }),
    });
    const data = await res.json();
    settotalData(data.total_count);
    settotalpage(data.total_pages);
    setCommentdata((prevData) => {
      // const newComments = data.data.filter((newComment: CommentData) => !prevData.some((existingComment) => existingComment.COMMENT_ID === newComment.COMMENT_ID));
      return data.data;
    });
    setloaddata(false);
  };

  const Responseveperson = async () => {
    setloaddata(true);
    const res = await fetch(v1GETDATA, {
      method: 'POST',
      headers: {
        Authenticate: `Bearer ${token}`,
        'x-token-access': `true`,
      },
      body: JSON.stringify({
        PAGE_REQUEST: 'Comment.responseve.person.',
        ClientId: client_id,
      }),
    });
    const data = await res.json();
    setResponsive(data.data);
    setloaddata(false);
  };



  useEffect(() => {
    Commentfetch();
    Responseveperson();
  }, [page, refresh]);



  // convert date in dd MM YY
  const convertDate = (inputDate: any) => {
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  const options = [
    { value: 'All_Memmber', label: 'All Member' },
    ...Responsiveuser.map(user => ({
      value: user.RESPONSIVE_PERSON,
      label: `${user.CLIENT_NAME} - (${user.COUNTRY_NAME})`
    }))
  ];

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
      <div className='studappup'>
        <ADDCOMMENT className="" Refresh={setrefresh} />

        <div className='mt-2'>

          <Table aria-label="Example static collection table" className='tableLong_data'>
            <TableHeader>
              <TableColumn>#</TableColumn>
              <TableColumn>Comment</TableColumn>
              <TableColumn>Comment By</TableColumn>
              <TableColumn>Date</TableColumn>
            </TableHeader>
            <TableBody emptyContent={<div className='flex justify-center'><img src={Emptyimage} alt="" width={'20%'} /></div>}>
              {CommentData.map((value: any, index: number) => (
                <TableRow key={index + 1}>
                  <TableCell data-column="#">{index + 1}</TableCell>
                  <TableCell data-column="Comment">

                    <b> Comment Title :</b> {value.COMMENT_RELETED}
                    <br></br>
                    <br></br>
                    <div
                      dangerouslySetInnerHTML={{ __html: value.COMMENT_TEXT }}
                    />
                  </TableCell>
                  <TableCell data-column="Comment By">
                    <User
                      name={value.RESPONSIVE_PERSON_NAME}
                      description={value.RESPONSIVE_PERSON_EMAIL}
                      avatarProps={{
                        showFallback: true,
                        src: `${value.RESPONSIVE_PERSON_PROFILE_URL}`
                      }}
                    /></TableCell>
                  <TableCell data-column="Date">{formatDateTime(value.COMMENT_DATE)}</TableCell>
                </TableRow>
              ))}

            </TableBody>
          </Table>
          {CommentData.length > 0 ?
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
        </div>
      </div>

    </>

  )
}
