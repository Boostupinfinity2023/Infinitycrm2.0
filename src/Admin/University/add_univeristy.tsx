import { useEffect, useState } from 'react';
import './style.css';
import { Empty } from 'antd';
import { Pagination, Select, SelectItem } from "@nextui-org/react";
// Collapse components
import UniversityAPi from '../../__PrivateApi/University';
import debounce from 'lodash.debounce';
import { NavLink } from 'react-router-dom';
import AddUniversity from './modal/AddNewUniversity';
import Blank from '../../components/Blanktow';
import { v1Dashboard } from '../../APIurl/url';
import Token from '../../getLoggedUser/GetUserInfomation';
//Edit Section
import EditUniversity from './modal/EditUniveristy';
import VisibilityIcon from '@mui/icons-material/Visibility';
export default function App() {
    const JwtToken = Token('jwt');
    const [laoder, setloader] = useState(true);
    const [search_input, setsearchuniveristy] = useState('');
    const [UniversityData, setUniversityData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [totalPages, setTotalPages] = useState(1);
    const [AllCountrys, Setallcountry]: any = useState([]);
    const [Filtercountry, SetCountry]: any = useState();

    const debouncedFetchData = debounce(async (search_input, currentPage, itemsPerPage, totalPages, Filtercountry) => {
        setloader(true)
        try {
            const response = await UniversityAPi(search_input, currentPage, itemsPerPage, totalPages, Filtercountry);
            setUniversityData(response?.data || []);
            setTotalPages(Math.ceil(response?.total / itemsPerPage));
        } catch (error) {
            console.error(error);
        }
        setloader(false);
    }, 300);

    useEffect(() => {
        if (laoder === true) {
            debouncedFetchData(search_input, currentPage, itemsPerPage, totalPages, Filtercountry);
        }
    }, [laoder]);
    const HanldeSearch = () => {
        debouncedFetchData(search_input, currentPage, itemsPerPage, totalPages, Filtercountry);
    }

    const handlePageChange = (page: any) => {
        setCurrentPage(page);
        debouncedFetchData(search_input, page, itemsPerPage, totalPages, Filtercountry);
    }

    const handleItemsPerPageChange = (value: any) => {
        setItemsPerPage(parseInt(value.target.value));
        setCurrentPage(1);
        debouncedFetchData(search_input, currentPage, itemsPerPage, totalPages, Filtercountry);
    }

    const Handlecountryselct = (value: any) => {
        SetCountry(parseInt(value.target.value));
        debouncedFetchData(search_input, currentPage, itemsPerPage, totalPages, Filtercountry);
    }

    const [total, settotal] = useState(0);
    const globalVar = window.globalVariable;

    function stripHtmlTags(str: any) {
        return str ? str.replace(/<[^>]*>/g, '') : 'empty';
    }

    const Allcountry = async () => {
        try {
            const responseData: any = await fetch(v1Dashboard, {
                method: 'POST',
                headers: {
                    Authenticate: `Bearer ${JwtToken}`,
                    'x-token-access': 'true',
                },
                body: JSON.stringify({
                    PAGE_REQUEST: 'ADMIN.GETALLCOUNTRY',
                    RequesterUser: 'Admin',
                }),
            });
            const data = await responseData.json();
            Setallcountry(data.data)
        } catch (err) {
            console.error(err);

        }
    }
    const DebounceAllcountry = debounce(Allcountry, 300);
    useEffect(() => {
        DebounceAllcountry();
    }, []);
    return (
        <>

            <div className={`grid grid-cols-6 gap-0`}>
                <style>{`
                       .Country-filter .bg-default-100 {
                            background-color: #002e791c;
                            border-radius: 10px;
                        }

                       .Country-filter .text-foreground-500 {
                                color: hsl(217.89deg 10.61% 64.9%);
                                font-size: 13px;
                            }

                `}</style >
                <div className="col-span-8 ml-2">
                    <div className="coll card-content">
                        <div className="navbar-fix">

                            <div className="d-flex">

                                <div className="ul-list m-2 after-line">

                                    <div className='University-filter grid grid-cols-12 gap-2'>
                                        <div className='col-span-2 Country-filter'>
                                            <Select
                                                label="Country Type"
                                                onChange={Handlecountryselct}
                                                size={'sm'}
                                            >
                                                {AllCountrys.length > 0 ? (
                                                    AllCountrys.map((Country: any, i: any) => (
                                                        <SelectItem key={Country.ID}>
                                                            {Country.COUNTRY_NAME}
                                                        </SelectItem>
                                                    ))
                                                ) : (
                                                    <SelectItem key={'Empty'}>
                                                        Empty Country
                                                    </SelectItem>

                                                )}
                                            </Select>
                                        </div>
                                        <div className="flex gap-2 col-span-4 design_search_form unimargin">
                                            <input type="text" className="search_input" placeholder="Search from over 80,000 + courses" aria-label="First name" onChange={(e: any) => { setsearchuniveristy(e.target.value) }} />
                                            <button className="Search_btn" type='button' onClick={HanldeSearch}>Search</button>
                                        </div>
                                        <div className="col-span-4 gap-2" />
                                        <div className="flex col-span-2 gap-4">
                                            <div>
                                                <AddUniversity />
                                            </div>
                                            <div>
                                                <a className="cursor-pointer refrashiconcenter" onClick={() => (laoder ? setloader(false) : setloader(true))}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                                                        />
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                    </div>


                                    <form>
                                        <div className="grid grid-cols-12 gap-2">

                                            <div className="col-span-4" />



                                        </div>
                                    </form>
                                </div>
                                <hr className="border-b-0.5 border-gray-300"></hr>
                            </div>
                            {laoder ? (
                                <Blank number={5} />
                            ) : (
                                (UniversityData.length > 0) ?
                                    UniversityData.map((value: any, index) => (
                                        <div className="grid grid-cols-8 gap-4 course-list2" key={index}>
                                            <div className="col-span-1 design_clg_img">
                                                <img
                                                    src={value.UNIVERSITY_LOGO}
                                                    className="university_logo"
                                                    loading="lazy"
                                                    onError={(e: any) => {
                                                        e.target.src = 'https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg';
                                                    }}
                                                />
                                            </div>
                                            <div className="col-span-5 pt-3">
                                                <h4 className="design_h4 cursor-pointer">{value.UNIVERSITY_NAME}</h4>
                                                <p className="text-md font-500">{value.UNIVERSITY_ADDRESS}</p>
                                                <p className="text-md font-500 truncate">{stripHtmlTags(value.UNIVERSITY_DESCRIPTION)}</p>
                                                <div className="grup_btn truncate">
                                                    <NavLink to={value.UNIVERSITY_WEBSITE} className=" ml-2 font-blue-200">
                                                        {value.UNIVERSITY_WEBSITE}
                                                    </NavLink>
                                                </div>
                                            </div>
                                            <div className="col-span-2 flex">
                                                <NavLink to={`/${globalVar.ROLE}/university/course/${value.UNIVERSITY_ID}`} className="btn btn-University_c w-2/3">
                                                    <VisibilityIcon />
                                                </NavLink>
                                                <EditUniversity>{value}</EditUniversity>
                                            </div>
                                        </div>
                                    )) : <Empty className='h-[350px] mt-10' />
                            )}
                        </div>
                        <div className='flex justify-between phnSetup'>
                            <div>
                                <Select
                                    label="Items Per Page"
                                    className='w-[200px]'
                                    placeholder={itemsPerPage.toString()}
                                    onChange={handleItemsPerPageChange}
                                >
                                    <SelectItem key="20">20</SelectItem>
                                    <SelectItem key="50">50</SelectItem>
                                    <SelectItem key="100">100</SelectItem>
                                </Select>
                            </div>
                            <Pagination
                                showControls
                                total={totalPages}
                                initialPage={1}
                                page={currentPage}
                                onChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>



            </div>
        </>
    );
}
