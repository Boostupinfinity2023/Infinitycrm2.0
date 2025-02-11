'use client'

import { useState, useEffect } from "react";
import { ApiCall } from "../../APIurl/API_call"
import { AjaxApi } from "../../APIurl/url"
import { debounce } from 'lodash';
import jwt from '../../getLoggedUser/GetUserInfomation';
import AddStudent from '../../pages/agent/Students';
import { Select, Input } from 'antd';
import { useLocation } from "react-router-dom";
export default function CoursePage() {




    const token = jwt('jwt');

    const [viewType, setViewType] = useState<'grid' | 'list'>('grid')
    const [searchTerm, setSearchTerm] = useState('');
    const [Courses, setCourse] = useState([]);
    const [Createload, setcreateloader] = useState(false);
    const [loader, setloader] = useState(false);
    const [Universitys, setUniversitys] = useState([])
    const [debouncedValue, setDebouncedValue] = useState('');
    const [Currentpage, setcurrentpage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [Totalcourse, setTotalcourse] = useState(0);
    const [selectedCountry, setSelectedcountry] = useState("");
    const [selectedUniversity, setSelectedUniversity] = useState("");
    const [Allcountry, setcountry] = useState([])

    const [sccountries, setscCountries] = useState([]);


    const location = useLocation();

    useEffect(() => {
        // Extract the country parameter from the query string
        const params = new URLSearchParams(location.search);
        const countryFromUrl = params.get("country");
        if (countryFromUrl) {
            setSelectedcountry(countryFromUrl);
        }
    }, [location.search]);

    const fetchCountryDatasc = debounce(async () => {
        const res = await fetch('/country.json');
        const data = await res.json();
        const countryOptions = data.countries.map((country: any) => ({
            value: country.name,
            label: country.name,
            id: country.id,
        }));
        setscCountries(countryOptions);
    }, 300);

    useEffect(() => {
        fetchCountryDatasc();
        return () => {
            fetchCountryDatasc.cancel();
        };
    }, []);



    useEffect(() => {
        const Alluniversity = async () => {
            try {
                const apiRoutes = await ApiCall(
                    `${AjaxApi}?action=GET.UNIVERSITY.DATA.SELECT`,
                    'POST',
                    {
                        Authenticate: `${token}`,
                        'x-token-access': 'true',
                    },
                    null
                );
                if (apiRoutes.status) {
                    setUniversitys(apiRoutes.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        const debouncedAlluniversity = debounce(Alluniversity, 300);
        debouncedAlluniversity();
        return () => {
            debouncedAlluniversity.cancel();
        };
    }, []);

    useEffect(() => {
        const Allcountry = async () => {
            try {
                const apiRoutes = await ApiCall(
                    `${AjaxApi}?action=GET.COUNTRY.DATA`,
                    'POST',
                    {
                        Authenticate: `${token}`,
                        'x-token-access': 'true',
                    },
                    null
                );
                if (apiRoutes.status) {
                    setcountry(apiRoutes.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        const debouncedAllcountry = debounce(Allcountry, 300);
        debouncedAllcountry();
        return () => {
            debouncedAllcountry.cancel();
        };
    }, []);



    useEffect(() => {
        const fetchData = async () => {
            setloader(true);
            try {
                const apiRoutes = await ApiCall(
                    `${AjaxApi}?action=GET.COURSESEARCH.DATA&itemsPerPage=${itemsPerPage}&Currentpage=${Currentpage}&selectedCountry=${selectedCountry}&selectedCourse=${debouncedValue}&selectedUniversity=${selectedUniversity}`,
                    'POST',
                    {
                        Authenticate: `${token}`,
                        'x-token-access': 'true',
                    },
                    null
                );
                if (apiRoutes.status) {
                    setCourse(apiRoutes.data);
                    setTotalcourse(apiRoutes.total);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            setloader(false);
        };
        const debouncedFetch = debounce(fetchData, 300);
        debouncedFetch();
        return () => {
            debouncedFetch.cancel();
        };
    }, [Currentpage, itemsPerPage, selectedCountry, debouncedValue, selectedUniversity]);


    const startItem = (Currentpage - 1) * itemsPerPage + 1;
    const endItem = Math.min(Currentpage * itemsPerPage, Totalcourse);


    const handlePrevPage = () => {
        if (Currentpage > 1) setcurrentpage(Currentpage - 1);
    };

    const handleNextPage = () => {
        if (Currentpage < Math.ceil(Totalcourse / itemsPerPage)) setcurrentpage(Currentpage + 1);
    };

    const debounceTimeout = 500; // in milliseconds
    let timeoutId: NodeJS.Timeout;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            setSearchTerm(value);
        }, debounceTimeout);
        setDebouncedValue(value);
    };
    return (
        <div className="p-4">
            <style>{`
               .Applybutton .modal-btn-custom{
               width: 100%;
               }
              .Applybutton .modal-btn-custom>span.p-button-icon.p-c.p-button-icon-left.pi.pi-plus{
                display: none;
               }
                }
            `}</style>
            {loader && (
                <div className="logo-loader">
                    <div className="loaderlogo-wrapper">
                        {/* <img src="/loader_fav.png" alt="Logo" className="loader-logo" /> */}
                    </div>
                </div>
            )}
            <div className="flex justify-between">
                <h1 className="text-xl font-bold mb-6">Courses</h1>
                <AddStudent setcreateloader={setcreateloader} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 URM-card">
                <Select
                    size="large"
                    showSearch
                    allowClear
                    placeholder="Select a country"
                    optionFilterProp="children"
                    value={selectedCountry != '' ? selectedCountry : []} // Bind the selected value
                    onChange={(e: any) => setSelectedcountry(e)} // Update the state on selection
                    options={Allcountry.map((country: any) => ({
                        value: country?.COUNTRY_NAME,
                        label: country?.COUNTRY_NAME,
                    }))}
                />

                <Select
                    allowClear
                    showSearch
                    style={{ height: 36 }}
                    placeholder="Student Nationality"
                    optionFilterProp="children"
                    filterOption={(input: any, option: any) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    options={sccountries}
                />

                <Select
                    size="large"
                    showSearch
                    allowClear
                    placeholder="Select a university"
                    optionFilterProp="label"
                    onChange={(e) => setSelectedUniversity(e)}
                    options={Universitys.map((University: any) => ({
                        value: University?.ID,
                        label: University?.NAME,
                    }))}
                />

                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search by Course Name"
                        className="w-full p-2 pl-10 border rounded-md"
                        onChange={handleInputChange}
                        value={debouncedValue}
                    />

                </div>
            </div>
            <div className="flex justify-end gap-2 mb-6 items-center">
                <span className="text-sm text-gray-500 mr-2">Select View</span>
                {/* <button
                    onClick={() => setViewType('list')}
                    className={`p-2 rounded-md ${viewType === 'list'
                        ? 'bg-gray-900 text-white'
                        : 'border hover:bg-gray-50'
                        }`}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button> */}
                <button
                    onClick={() => setViewType('grid')}
                    className={`p-2 rounded-md ${viewType === 'grid'
                        ? 'bg-[#006ED9] text-white'
                        : 'border hover:bg-[#006ED9]'
                        }`}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                </button>
            </div>

            <div className={`grid gap-6 ${viewType === 'grid'
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
                : 'grid-cols-1'
                }`}>

                {Courses.length == 0 ?
                    <div className="text-center py-10">
                        <p className="text-lg text-gray-500">No courses data available</p>
                    </div>

                    :
                    Courses.map((course: any, index) => (
                        <div key={index + 1} className="border rounded-lg overflow-hidden bg-white flex flex-col">
                            <div className="relative h-28 grid gap-1 p-1">
                                <div key={index} className="relative col-span-2 row-span-2 overflow-hidden rounded-md">
                                    <img
                                        src={course.banner_image != null ? course.banner_image : 'https://harmanjeetsinghvirdi.com/CRM/University_image/University_image/Campus_Shot.png'}
                                        alt={`campus`}
                                        className="object-cover"
                                    />
                                </div>

                                <div className="absolute left-4 bottom-4 bg-white rounded-full p-2 shadow-lg">
                                    <img
                                        src={course.university_logo}
                                        alt={`Logo`}
                                        width={40}
                                        height={40}
                                        className="rounded-full"
                                    />
                                </div>
                            </div>

                            <div className="p-4 flex-grow">
                                <h3 className="font-semibold text-lg mb-2">{course.program_name}</h3>
                                <p className="text-sm text-gray-600 mb-3">{course.university_name}</p>

                                <div className="space-y-1 grid gap-3">
                                    <div className="grid grid-cols-2 gap-4">
                                        <span className="text-sm">Tuition Fee:</span>
                                        <span className="font-medium">{course.tuition_fee}</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <span className="text-sm">Application Fee:</span>
                                        <span className="font-medium">£{course.application_fee}</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <span className="text-sm">Duration:</span>
                                        <span className="font-medium whitespace-nowrap overflow-hidden text-ellipsis" title={course.duration}>{course.duration}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 pt-0 Applybutton">
                                {/* <AddStudent /> */}
                                {/* <button className="w-full bg-[#006ED9] hover:bg-[#006ED9] text-white py-2 rounded-md transition-colors">
                                APPLY NOW
                            </button> */}
                            </div>
                        </div>

                    ))}
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 URM-footer mt-4">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Items per page:</span>
                    <div className="relative w-[70px]">
                        <select
                            value={itemsPerPage}
                            onChange={(e) => {
                                setItemsPerPage(Number(e.target.value));
                                setcurrentpage(1);
                            }}
                            className="w-full p-2 border rounded-md appearance-none bg-white pr-8"
                        >
                            <option value="12">12</option>
                            <option value="24">24</option>
                            <option value="36">36</option>
                            <option value="48">48</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-4">
                    <div className="text-sm text-gray-500">
                        {startItem} - {endItem} of {Totalcourse}
                    </div>
                    <div className="flex items-center gap-1">
                        <button
                            className="p-2 border rounded-md hover:bg-gray-50"
                            onClick={handlePrevPage}
                            disabled={Currentpage === 1}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 " />
                            </svg>
                        </button>
                        <button
                            className="p-2 border rounded-md hover:bg-gray-50"
                            onClick={handleNextPage}
                            disabled={Currentpage === Math.ceil(Totalcourse / itemsPerPage)}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>


        </div>
    )
}

