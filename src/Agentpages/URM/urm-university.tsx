'use client'


import { useState, useEffect } from "react"
import { ApiCall } from "../../APIurl/API_call"
import { AjaxApi } from "../../APIurl/url"
import { debounce } from 'lodash';
import jwt from '../../getLoggedUser/GetUserInfomation';
import { Select, Input } from 'antd';
export default function UniversityListing() {
    const [Allcountry, setcountry] = useState([])
    const [Universitys, setUniversitys] = useState([])
    const [selectedCountry, setSelectedcountry] = useState("")
    const [selectedUniversity, setSelectedUniversity] = useState("")
    const [debouncedValue, setDebouncedValue] = useState('');
    const [Currentpage, setcurrentpage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(9)
    const [Totaluniversity, setTotaluniversity] = useState(0)
    const [loader, setloader] = useState(false)
    const token = jwt('jwt');

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
                    `${AjaxApi}?action=GET.URM.DATA&itemsPerPage=${itemsPerPage}&Currentpage=${Currentpage}&selectedCountry=${selectedCountry}&selectedUniversity=${debouncedValue}`,
                    'POST',
                    {
                        Authenticate: `${token}`,
                        'x-token-access': 'true',
                    },
                    null
                );
                if (apiRoutes.status) {
                    setUniversitys(apiRoutes.data);
                    setTotaluniversity(apiRoutes.total);
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
    }, [Currentpage, itemsPerPage, selectedCountry, debouncedValue]);


    const startItem = (Currentpage - 1) * itemsPerPage + 1;
    const endItem = Math.min(Currentpage * itemsPerPage, Totaluniversity);


    const handlePrevPage = () => {
        if (Currentpage > 1) setcurrentpage(Currentpage - 1);
    };

    const handleNextPage = () => {
        if (Currentpage < Math.ceil(Totaluniversity / itemsPerPage)) setcurrentpage(Currentpage + 1);
    };

    const debounceTimeout = 500; // in milliseconds
    let timeoutId: NodeJS.Timeout;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            setSelectedUniversity(value);
        }, debounceTimeout);
        setDebouncedValue(value);
    };


    return (
        <div className="mx-auto">

            {loader && (
                <div className="logo-loader">
                    <div className="loaderlogo-wrapper">
                        {/* <img src="/loader_fav.png" alt="Logo" className="loader-logo" /> */}
                    </div>
                </div>
            )}


            <h1 className="text-2xl font-bold mb-6">University ({Totaluniversity})</h1>
            <div className="flex gap-3 mb-8 URM-card">
                {/* <select
                    value={selectedUniversity}
                    onChange={(e) => setSelectedUniversity(e.target.value)}
                    className="w-full p-2 border rounded-md appearance-none bg-white pr-8"
                >
                    <option value="">University Name</option> */}
                {/* {universities.map((uni) => (
                            <option key={uni.id} value={uni.id}>
                                {uni.name}
                            </option>
                        ))} */}
                {/* </select> */}

                <Select
                    style={{ width: 300 }}
                    size="large"
                    showSearch
                    allowClear
                    placeholder="Select a country"
                    optionFilterProp="label"
                    onChange={(e) => setSelectedcountry(e)}
                    options={Allcountry.map((country: any) => ({
                        value: country?.COUNTRY_NAME,
                        label: country?.COUNTRY_NAME,
                    }))}
                />

                <Input placeholder="University Name" style={{ width: 300 }} onChange={handleInputChange}
                    value={debouncedValue} />

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">

                {Universitys.length == 0 ?
                    <div className="text-center py-10">
                        <p className="text-lg text-gray-500">No university data available</p>
                    </div>

                    :

                    Universitys.map((university: any, index) => (
                        <div key={index + university?.ID} className="border rounded-lg overflow-hidden bg-white">
                            <div className="flex items-center gap-3 p-4 border-b">
                                <div className="w-12 h-12 relative flex-shrink-0">
                                    <img
                                        src={university.LOGO_URL}
                                        alt={`logo`}

                                        className="object-contain"
                                    />
                                </div>
                                <h3 className="font-medium text-sm">{university.NAME}</h3>
                            </div>
                            <div className="p-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="">
                                        <p className="text-sm text-gray-500">Email</p>
                                        <p className="text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis" title={university.CONTACT_EMAIL} >{university.CONTACT_EMAIL}</p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">Mobile No.</p>
                                        <p className="text-sm font-medium">{university.CONTACT_PHONE}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 URM-footer">
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
                            <option value="9">9</option>
                            <option value="18">18</option>
                            <option value="27">27</option>
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
                        {startItem} - {endItem} of {Totaluniversity}
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
                            disabled={Currentpage === Math.ceil(Totaluniversity / itemsPerPage)}
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

