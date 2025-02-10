import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { IRootState } from '../../store';
import { toggleRTL, toggleTheme, toggleSidebar } from '../../store/themeConfigSlice';
import { LiaSignOutAltSolid } from "react-icons/lia";
import IconMenu from '../Icon/IconMenu';
import Logo from '../../../public/Image/Boostup-logo.png';
import Swal from 'sweetalert2';
import Token from './../../getLoggedUser/GetUserInfomation';
import Clocked from './Clock';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import jwt from '../../getLoggedUser/GetUserInfomation';
import Notification from '../../Notificationshow';
import { Badge, Avatar, Dropdown as Dropdowns } from "@nextui-org/react";
import { message } from 'antd';
import Notification_grop from './Notification_drop';
import { Search, Headset, X, Phone, User } from 'lucide-react'
import { GETDATA } from '../../APIurl/url';
import { debounce } from 'lodash';
const Header = ({ userdata }: any) => {
    const token = jwt('jwt');
    const globalVar = window.globalVariable;
    const senderId = localStorage.getItem('SID');
    const location = useLocation();
    useEffect(() => {
        const selector = document.querySelector('ul.horizontal-menu a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const all: any = document.querySelectorAll('ul.horizontal-menu .nav-link.active');
            for (let i = 0; i < all.length; i++) {
                all[0]?.classList.remove('active');
            }
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link');
                if (ele) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele?.classList.add('active');
                    });
                }
            }
        }
    }, [location]);
    const JwtToken = Token('jwt');

    // const [Notification, setNotification] = useState([]);
    // const NewNotification = async () => {
    //     const res = await fetch(GETDATA + '?action=new-notification-data', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Authenticate: `Bearer ${JwtToken}`,
    //         },
    //         body: JSON.stringify({
    //             PAGE_REQUEST: 'NEW_NOTIFICATION_DATA_FETCH',
    //         }),
    //     });

    //     const response = await res.json();
    //     if (response.status === 'true' && response.data.length > 0) {
    //         setNotification(response.data);
    //     }

    // };


    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const dispatch = useDispatch();

    const [search, setSearch] = useState(false);
    const url = localStorage.getItem('profileurl');
    function deleteCookie(name: any) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }

    function SignOut() {
        Swal.fire({
            title: 'Log Out',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Log Out',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                const cookiesToDelete = ['jwt'];
                const localStorageKeysToDelete = [
                    'auth_token', 'UserEmail', 'USERID', 'profileurl', 'is_admin', 'SSID', 'UserName', 'SID', 'assigned_role'
                ];

                // Delete cookies
                cookiesToDelete.forEach(deleteCookie);


                localStorageKeysToDelete.forEach((key) => localStorage.removeItem(key));
                message.success(`Logged Out !`);

                window.location.href = '/';

            }
        });
    }

    //search query
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [searchData, setSearchData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const Searchinfo = async () => {
        if (!searchQuery.trim()) {
            setSearchData([]); // Clear data if the search query is empty
            return;
        }
        setIsLoading(true);
        try {
            const res = await fetch(GETDATA + "?action=new-notification-data", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authenticate: `Bearer ${JwtToken}`,
                },
                body: JSON.stringify({
                    PAGE_REQUEST: "Searchdata_fetach",
                    searchQuery: searchQuery,
                }),
            });

            const response = await res.json();
            if (response.status === true && response.data.length > 0) {
                setSearchData(response.data);
            } else {
                setSearchData([]); // Clear if no data is returned
            }
        } catch (error) {
            console.error("Error fetching search data:", error);
        } finally {
            setIsLoading(false); // End loading
        }
    };

    // Debounced search function
    const DebounceSearchinfo = debounce(() => {
        Searchinfo();

    }, 1000);

    useEffect(() => {
        if (searchQuery) {
            DebounceSearchinfo();
        }

        // Cleanup the debounce on unmount
        return () => {
            DebounceSearchinfo.cancel();
        };
    }, [searchQuery]);

    const searchRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSearching(false);
                setSearchData([]);
                setSearchQuery('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className={`z-40 ${themeConfig.semidark && themeConfig.menu === 'horizontal' ? 'dark' : ''}`}>
            <div className="shadow-sm">
                <div className="relative Headercolor flex w-full items-center px-5 py-2.5 dark:bg-black">
                    <div className="horizontal-logo flex lg:hidden justify-between items-center ltr:mr-2 rtl:ml-2">

                        <img className="set_staff_logo w-[4rem]" src={Logo} alt="logo" />


                        <button
                            type="button"
                            className="collapse-icon flex-none dark:text-[#d0d2d6] hover:text-primary dark:hover:text-primary flex lg:hidden ltr:ml-2 rtl:mr-2 p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60"
                            onClick={() => {
                                dispatch(toggleSidebar());
                            }}
                        >
                            <IconMenu className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="ltr:mr-2 rtl:ml-2 hidden sm:block">
                        <ul className="flex items-center space-x-2 rtl:space-x-reverse dark:text-[#d0d2d6]">
                            <li>
                                {/* <Link to="#" className="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                                        />
                                    </svg>
                                </Link> */}
                            </li>
                        </ul>
                    </div>
                    <div className="sm:flex-1 ltr:sm:ml-0 ltr:ml-auto sm:rtl:mr-0 rtl:mr-auto flex items-center space-x-1.5 lg:space-x-2 rtl:space-x-reverse dark:text-[#d0d2d6] gap-4">
                        <div className="sm:ltr:mr-auto sm:rtl:ml-auto">

                        </div>

                        <div className="lg:flex border-r-2 sm:hidden gap-5  Mediamobile items-center">
                            <div className="relative w-[300px]" ref={searchRef}>
                                <input
                                    type="text"
                                    placeholder="Student ID / Name / passport / Ema.."
                                    value={searchQuery}
                                    onFocus={() => setIsSearching(true)}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value)
                                        setIsSearching(true)
                                    }}
                                    className="w-full rounded-full bg-[#eee] border border-gray-200 px-4 py-2 pr-7 truncate text-sm focus:outline-none"
                                />

                                {searchQuery ? (
                                    <X className="absolute right-3 top-2.5 h-4 w-4 text-gray-400"
                                        onClick={() => {
                                            setIsSearching(false);
                                            setSearchData([]); // Clear the search data
                                            setSearchQuery(''); // Clear the input field
                                        }} />

                                ) : (
                                    <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                                )}

                                {isSearching && searchQuery && (

                                    <div className="absolute mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
                                        <div className="max-h-60 overflow-auto p-2">
                                            {isLoading && (
                                                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-50">
                                                    <div className="w-6 h-6 border-4 border-t-4 border-gray-300 border-solid rounded-full animate-spin"></div>
                                                </div>
                                            )}

                                            {!isLoading && searchData.length > 0 ?
                                                <div
                                                    className="cursor-pointer rounded-md p-2-100 grid gap-2"
                                                >
                                                    {searchData.map((search: any, index: any) => {
                                                        return (
                                                            <>
                                                                {globalVar.ROLE === 'agent' && (
                                                                    <Link
                                                                        className='hover:bg-gray'
                                                                        to={`/agent/client/view/${search.ID}/${search.CLIENT_ID}`}
                                                                        key={index}
                                                                        onClick={() => {
                                                                            setIsSearching(false);
                                                                            setSearchData([]);
                                                                        }}
                                                                    >
                                                                        <div className="flex items-center justify-between">
                                                                            <div className="flex items-center gap-2">
                                                                                <div className="grid">
                                                                                    <span className="text-sm font-medium text-gray-900">
                                                                                        {search.Full_name}
                                                                                    </span>
                                                                                    <small>Student ID: {search.ID}</small>
                                                                                </div>
                                                                            </div>
                                                                            <span className="text-sm text-gray-500">Application</span>
                                                                        </div>
                                                                    </Link>
                                                                )}

                                                                {globalVar.ROLE === 'staff' && (
                                                                    <Link
                                                                        className='hover:bg-gray'
                                                                        to={`/staff/client/view/${search.ID}/${search.Lead_ID}/${search.CLIENT_ID}/staff`}
                                                                        key={index}
                                                                        onClick={() => {
                                                                            setIsSearching(false);
                                                                            setSearchData([]);
                                                                        }}
                                                                    >
                                                                        <div className="flex items-center justify-between">
                                                                            <div className="flex items-center gap-2">
                                                                                <div className="grid">
                                                                                    <span className="text-sm font-medium text-gray-900">
                                                                                        {search.Full_name}
                                                                                    </span>
                                                                                    <small>Student ID: {search.ID}</small>
                                                                                </div>
                                                                            </div>
                                                                            <span className="text-sm text-gray-500">Application</span>
                                                                        </div>
                                                                    </Link>
                                                                )}
                                                                {globalVar.ROLE === 'admin' && (
                                                                    <Link
                                                                        className=''
                                                                        to={`/admin/student/view/${search.ID}/${search.CLIENT_ID}`}
                                                                        key={index}
                                                                        onClick={() => {
                                                                            setIsSearching(false);
                                                                            setSearchData([]);
                                                                        }}
                                                                    >
                                                                        <div className="flex items-center justify-between hover:bg-gray-300 p-1">
                                                                            <div className="flex items-center gap-2">
                                                                                <div className="grid">
                                                                                    <span className="text-sm font-medium text-gray-900">
                                                                                        {search.Full_name}
                                                                                    </span>
                                                                                    <small>Student ID: {search.ID}</small>
                                                                                </div>
                                                                            </div>
                                                                            <span className="text-sm text-gray-500">Application</span>
                                                                        </div>
                                                                    </Link>
                                                                )}
                                                            </>
                                                        );
                                                    })}

                                                </div>
                                                :
                                                <div className="p-2 text-sm text-gray-500">No results found</div>
                                            }
                                        </div>
                                    </div>

                                )}

                            </div>
                            <div className=''>
                                <Clocked />
                            </div>

                            <Notification_grop />
                        </div>

                        <div className="dropdown shrink-0 flex">


                            <Dropdown>
                                <DropdownTrigger>
                                    <div className='flex'>
                                        <Avatar className="mr-3 Mediamobile" showFallback isBordered src={globalVar?.ProfileUrl} />
                                        <p className="nav_text2">{globalVar?.ClientName} <br></br><span>{globalVar?.ROLE?.toUpperCase()}</span></p>
                                    </div>
                                </DropdownTrigger>
                                <DropdownMenu variant="faded" aria-label="Static Actions">

                                    <DropdownItem key="profile" className="h-14 gap-2">
                                        <p className="font-semibold">Signed in as</p>
                                        <p className="font-semibold">{globalVar?.Email}</p>
                                    </DropdownItem>
                                    <DropdownItem key="settings" href={`/${globalVar?.ROLE}/profile`}>
                                        My Profile
                                    </DropdownItem>

                                    <DropdownItem key="delete" className="text-danger" color="danger" onClick={SignOut} startContent={<LiaSignOutAltSolid className="text-danger text-xl" />}>
                                        Logout
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>


                            {/* <Link to="#" className="text-danger !py-3" onClick={SignOut}>
                                <ExitToAppIcon />
                                Sign Out
                            </Link> */}

                        </div>
                    </div>
                </div>
            </div>
            <Notification />
        </header>
    );
};

export default Header;