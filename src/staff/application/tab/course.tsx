import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import AddNewCourse from '../helper_modal/NewCourseEnroll';
import { useEffect, useState, useCallback } from 'react';
import { GETDATA } from '../../../APIurl/url';
import { useParams } from 'react-router-dom';
import jwt from '../../../getLoggedUser/GetUserInfomation';
import { Chip } from '@nextui-org/chip';
import OfferLetterView from '../helper_modal/ViewOfferLetter';
import { debounce } from 'lodash';
import "../style.css";
import Emptyimage from '../../../../public/TableEmpty/Empty.jpg';
import { CgAddR } from "react-icons/cg";
import { Tooltip } from 'antd';
interface CourseProps {
    className: string;
    ClientInformation: any;
}
const Course: React.FC<CourseProps> = ({ className, ClientInformation }) => {
    const token = jwt('jwt');
    const { file_id } = useParams();
    const { client_id } = useParams();
    const { encrypt_id } = useParams();

    const [OfferLetter, setOfferletter] = useState([]);
    const [loaddata, setloader] = useState(false);
    const [Refresh, setrefresh] = useState(false);

    const getData = useCallback(
        debounce(async () => {
            setloader(true);
            try {
                const response = await fetch(GETDATA + '?action=client_application-offerltter', {
                    method: 'POST',
                    headers: {
                        Authenticate: `Bearer ${token}`,
                        'x-token-access': 'true',
                    },
                    body: JSON.stringify({
                        PAGE_REQUEST: 'STUDENT_APPLICATION_OFFERLETTER_STAFF',
                        file_id: file_id,
                        client_id: client_id,
                        encrypt_id: encrypt_id,
                    }),
                });

                const data = await response.json();
                setOfferletter(data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setloader(false);
            }
        }, 300), // Adjust the debounce delay if needed
        [file_id, client_id, encrypt_id, token] // Dependencies for the fetch call
    );

    useEffect(() => {
        getData();
    }, [Refresh, getData]);


    const formatDateTime = (datetime: any) => {
        const date = new Date(datetime);

        if (datetime == null) {
            return '----';
        }


        // Define options for date and time formatting
        const dateOptions: any = { day: '2-digit', month: 'long', year: 'numeric' };
        const timeOptions: any = { hour: 'numeric', minute: '2-digit', hour12: true };

        // Format date and time
        const formattedDate = date.toLocaleDateString('en-GB', dateOptions); // "31 July 2024"
        const formattedTime = date.toLocaleTimeString('en-GB', timeOptions); // "1:45 PM"

        return `${formattedDate} (${formattedTime})`;
    };
    const trimWords = (text: any, wordLimit: any) => {
        return text.split(' ').slice(0, wordLimit).join(' ') + '...';
    };
    // console.log(OfferLetter);
    return (
        <>
        <div className="coursetableup">
            <AddNewCourse ClientData={(ClientInformation)} Refreshda={setrefresh} />
            <Table aria-label="Example static collection table" className='tableLong_data'>
                <TableHeader>
                    <TableColumn className="app_history_table_heading">University Name</TableColumn>
                    <TableColumn className="app_history_table_heading">Course Name</TableColumn>
                    <TableColumn className="app_history_table_heading">Application Fees</TableColumn>
                    <TableColumn className="app_history_table_heading">Responsive Person</TableColumn>
                    <TableColumn className="app_history_table_heading">Application Create Date</TableColumn>
                    <TableColumn className="app_history_table_heading">Last Modification</TableColumn>
                    <TableColumn className="app_history_table_heading">Action</TableColumn>
                </TableHeader>
                <TableBody emptyContent={<div className='flex justify-center'><img src={Emptyimage} alt="" width={'20%'} /></div>}>
                    {loaddata ? (
                        []
                    ) : (
                        OfferLetter.map((value: any, index) => (
                            <TableRow key={index}>
                                <TableCell className="table_font_app" data-column="University Name">{value?.UNIVERSITY_NAME}</TableCell>
                                <TableCell className="table_font_app" data-column="Course Name">
                                    <Tooltip color='#006ED9' title={
                                        <> {value?.COURSE_NAME}
                                            <p>Intake : {value?.INTAKE}</p>
                                        </>
                                    }
                                        overlayStyle={{ maxWidth: '100%' }}
                                    >
                                        {trimWords(value.COURSE_NAME, 5)}
                                    </Tooltip>
                                </TableCell>
                                <TableCell className="table_font_app" data-column="Application Fees">{value.APPLICATION_FEE}</TableCell>

                                <TableCell className="table_font_app" data-column="Responsive Person">
                                    <Tooltip color='#006ED9' title={
                                        <>Email : {value?.RESPONSIVE_PERSON_EMAIL}
                                        </>
                                    }
                                        overlayStyle={{ maxWidth: '100%' }}
                                    >
                                        {value.RESPONSIVE_PERSON_NAME}
                                    </Tooltip>
                                </TableCell>
                                <TableCell className="table_font_app" data-column="Application Create Date">{formatDateTime(value.OFFER_LETTER_CREATE)}</TableCell>
                                <TableCell className="table_font_app" data-column="Last Modification">
                                    {formatDateTime(value.OFFER_LETTER_UPDATE)}
                                    <small>
                                        <br />
                                        Status:
                                        <strong>
                                            {' '}
                                            <Chip color="primary" size="sm">
                                                {value.CURRENT_STATUS_STAGE}
                                            </Chip>{' '}
                                        </strong>
                                        <br />
                                    </small>
                                </TableCell>
                                <TableCell className="table_font_app flex gap-3 mobtabalign" data-column="Action">

                                    <OfferLetterView data-column="Action" application_data={value} Refreshda={setrefresh} />


                                    {/* <Tooltip title="Add GIC">
                                        <CgAddR style={{ color: '#006ed9', fontSize: 'large' }} />
                                    </Tooltip> */}
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
        </>

    );
};

export default Course;
