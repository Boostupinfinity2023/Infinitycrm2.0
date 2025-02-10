import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Table } from 'antd';
import '../../components/style.css';
import { TableColumnsType, Dropdown, Menu, Empty } from 'antd';
import { NavLink } from 'react-router-dom';
import { GETDATA } from '../../APIurl/url';
import userInfo from '../../getLoggedUser/GetUserInfomation';
import { EyeOutlined } from '@ant-design/icons';
import debounce from 'lodash.debounce';
import { Tooltip } from 'antd';
import Emptyimage from '../../../public/TableEmpty/Empty.jpg';
interface DataType {
    key: string;
    highestEducation: string;
    studentId: string;
    firstName: string;
    email: string;
    lastName: string;
    nationality: string;
    owner: string;
    action: any;
    tags: string[];
}

const App: React.FC = () => {
    const token = userInfo('jwt');
    const [loading, setLoader] = useState(true);
    const [limit, setlimit] = useState(10);
    const [page, setpage] = useState(1);
    const [dataview, setdataview] = useState('desc');
    const [viewCol, setviewCol] = useState('ID');
    const [total_record, set_total_record] = useState(0);
    const [ApplicationId, setApplicationId] = useState('');
    const [PassportNumber, setPassportNumber] = useState('');
    const [StudentNameEmail, setStudentNameEmail] = useState('');
    const [ClientRecord, setClientRecord] = useState([]);
    const [pagerefresh, setpageRefresh] = useState(false);
    const [StatusOfferLetter, offerletterStatus] = useState('');
    const [OfferLetterStatus, setOfferStatus] = useState([]);
    const GetStudentData = async () => {
        setLoader(true);
        const UserAuthID = await userInfo('auth_token');
        try {
            const responseData: any = await fetch(
                GETDATA +
                '?action=view.client.record&limit=' +
                limit +
                '&page=' +
                page +
                '&orderby=' +
                dataview +
                '&orderCol=' +
                viewCol +
                '&ApplicationId=' +
                ApplicationId +
                '&passportId=' +
                PassportNumber +
                '&StudentNameEmail=' +
                StudentNameEmail,
                {
                    method: 'POST',
                    headers: {
                        Authenticate: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        PAGE_REQUEST: 'STUDENT_OFFER_LETTER_DATA_RECORD',
                        'FilterData': StatusOfferLetter
                    }),
                }
            );
            const data = await responseData.json();
            setClientRecord(data.data);
            setOfferStatus(data.statusList);
            setLoader(false);
        } catch (err) {
            console.error(err);
            setLoader(false);
        }
    };

    const storedUserId = sessionStorage.getItem('studentdataloader');
    const debouncedGetStudentData = debounce(GetStudentData, 300);
    useEffect(() => {
        debouncedGetStudentData();
        if (storedUserId) {
            sessionStorage.clear();
        }
    }, [ApplicationId, PassportNumber, StudentNameEmail, viewCol, dataview, pagerefresh, StatusOfferLetter]);

    function TableView(pagination: any, filters: any, sorter: any, extra: any) {
        setviewCol(sorter.columnKey);
        setdataview(sorter.order == 'ascend' ? 'asc' : 'desc');
    }

    const menu = (event: any) => (
        <Menu>
            <Menu.Item key="1">
                <NavLink to={`/admin/student/view/${event.ID}/${event.CLIENT_IDS}`} className="">
                    <EyeOutlined className="text-blue-900" title="view and edit client record" /> View
                </NavLink>
            </Menu.Item>
        </Menu>
    );

    const columns: TableColumnsType<DataType> = [
        {
            title: 'ID',
            className: 'text-style',
            dataIndex: 'ID',
            key: 'ID',
            fixed: 'left',
            sortDirections: ['ascend', 'descend'],
            sorter: {
                compare: (a: any, b: any) => a.ID - b.ID,
                multiple: 3,
            },
            width: 100,
            render: (event, fullInfo: any) => (
                <span data-column="ID">
                    <NavLink to={`/admin/student/view/${fullInfo.CLIENT_ID}/${fullInfo.CLIENT_IDS}`} className="text-color-blue">
                        {fullInfo.CLIENT_ID}
                    </NavLink>
                </span>
            ),
        },
        {
            className: 'text-style',
            title: 'Client Deatils',
            dataIndex: 'EMAIL',
            key: 'EMAIL',
            width: 250,
            sortDirections: ['ascend', 'descend'],
            sorter: {
                compare: (a: any, b: any) => a.FIRST_NAME - b.FIRST_NAME,
                multiple: 3,
            },
            render: (event, fullInfo: any) => (
                <Tooltip color={'#0975de'} title={
                    <>
                        <p>Email : {fullInfo.EMAIL}</p>
                        <p>PHONE_NUMBER : {fullInfo.PHONE_NUMBER}</p>
                        <p>D.O.B : {fullInfo.DATE_OF_BIRTH}</p>
                        <p>Email : {fullInfo.EMAIL}</p>
                    </>
                } overlayStyle={{ maxWidth: '100%' }}>
                    <span data-column="Client Deatils">{fullInfo.FIRST_NAME} {fullInfo.LAST_NAME}</span>
                </Tooltip>
            ),
        },


        {
            className: 'text-style text-center',
            title: 'Country of Citizenship',
            dataIndex: 'COUNTRY_OF_CITIZENSHIP',
            key: 'COUNTRY_OF_CITIZENSHIP',
            width: 250,
            render: (event) => (
                <span data-column="Country of Citizenship">
                    {event}
                </span>
            ),
        },
        {
            className: 'text-style',
            title: 'Passport',
            dataIndex: 'PASSPORT_NUMBER',
            key: 'PASSPORT_NUMBER',
            render: (event) => (
                <span data-column="Passport">
                    {event}
                </span>
            ),
        },
        {
            className: 'text-style',
            title: 'Passport Expiry Date',
            dataIndex: 'PASSPORT_EXPIRY_DATE',
            key: 'PASSPORT_EXPIRY_DATE',
            render: (event) => (
                <span data-column="Passport Expiry Date">
                    {event}
                </span>
            ),
        },
        {
            className: 'text-style text-center',
            title: 'Gender',
            dataIndex: 'GENDER',
            key: 'GENDER',
            width: 100,
            render: (event) => (
                <span data-column="Gender">
                    {event}
                </span>
            ),
        },
        {
            className: 'text-style text-center',
            title: 'Action',
            fixed: 'right',
            render: (event) => (
                <span data-column="Action">
                    <NavLink to={`/admin/student/view/${event.CLIENT_ID}/${event.CLIENT_IDS}`} className="">
                        <EyeOutlined className="text-blue-900" title="view and edit client record" />
                    </NavLink>
                </span>
            ),
            width: 100,
        },

    ];
    const [leftOffset, setLeftOffset] = useState(0); // Initial left offset
    const tableRef: any = useRef(null); // Ref for the table container

    // Function to handle mouse move for scrolling
    const moveScroll = (event: any) => {
        const movementX = event.nativeEvent.movementX;
        const newLeftOffset = leftOffset + movementX;

        // Adjust these constants based on your specific setup
        const minLeftOffset = 0;
        const maxLeftOffset = 55; // Adjust this based on your actual maximum scroll width

        // Ensure newLeftOffset stays within the min-max range
        if (newLeftOffset >= minLeftOffset && newLeftOffset <= maxLeftOffset) {
            setLeftOffset(newLeftOffset);
            if (tableRef.current) {
                tableRef.current.scrollLeft = '500px';
                console.log(tableRef.current.clientWidth);
                tableRef.current.scrollLeft = (newLeftOffset / maxLeftOffset) * (tableRef.current.scrollWidth - tableRef.current.clientWidth);
            }
        }
    };
    const sizes = ['sm'];
    const table_heading: any = [
        { key: 'ID', label: 'ID' },
        { key: 'EMAIL', label: 'Email Id' },
        { key: 'FIRST_NAME', label: 'First Name' },
        { key: 'LAST_NAME', label: 'Last Name' },
        { key: 'PHONE_NUMBER', label: 'Phone Number' },
        { key: 'DATE_OF_BIRTH', label: 'Date Of Birth' },
        { key: 'Country Of Citizenship', label: 'Country Of Citizenship' },
        { key: 'PASSPORT_NUMBER', label: 'Passport' },
        { key: 'PASSPORT_EXPIRY_DATE', label: 'Passport Expiry Date' },
    ];
    const OrderBy: any = [
        { key: 'asc', label: 'asc' },
        { key: 'desc', label: 'desc' },
    ];

    console.table(OfferLetterStatus)
    return (
        <div className='bg-white p-5 rounded-xl'>
            <div>
                <ul className="flex justify-between">
                    <li>
                        <h4 className="bold-font-700 font-32px">Offer-Letter Application</h4>
                    </li>
                </ul>
            </div>
            <div className="grid grid-cols-5 gap-11 set_margin_bottom mt-5">
                <div className="col-span-3">
                    <div className="w-full flex flex-col gap-4" />
                </div>
                <div className="col-span-2">
                </div>
            </div>
            <br />
            <div className="table-background scroll-container offerpagetbup" ref={tableRef}>
                <Table
                    className=""
                    columns={columns}
                    dataSource={ClientRecord}
                    onChange={TableView}
                    loading={loading}
                    locale={{
                        emptyText: (
                            <Empty
                                image={
                                    <div className="flex justify-center">
                                        <img src={Emptyimage} alt="No Data" style={{ width: '8%' }} />
                                    </div>
                                }
                                description={'No Data Available'} // No description below the image
                            />
                        ),
                    }}
                />

                <div id="mini-map" className="css-18v91cr">
                    <div className="css-hxyrcv">
                        <span style={{ display: 'inline-flex' }}>
                            <div aria-label="column-0" className="css-1czhqfs" />
                            <div aria-label="column-1" className="css-1czhqfs" />
                            <div aria-label="column-2" className="css-1czhqfs" />
                            <div aria-label="column-3" className="css-1czhqfs" />
                            <div aria-label="column-4" className="css-1czhqfs" />
                            <div aria-label="column-5" className="css-1czhqfs" />
                            <div aria-label="column-6" className="css-1czhqfs" />
                            <div aria-label="column-7" className="css-1czhqfs" />
                        </span>
                        <div className="css-11cntbg" style={{ left: `${leftOffset}px` }} onMouseMove={moveScroll} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
