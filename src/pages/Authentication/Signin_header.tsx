import React, { useState } from 'react'

import { useNavigate, NavLink } from 'react-router-dom'; export default function Signin_header() {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };
    return (
        <header>
            <nav className="bg-white border-gray-200 dark:bg-gray-800 headerbar">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl paddingLaptop">
                    <a href="#" className="flex items-center logoCol">
                        <img src="/edu-blue.svg" className="header_logo" alt="Logo" />
                    </a>
                    <div className="flex items-center lg:order-2 lg:hidden">
                        <NavLink
                            to="/"
                            className="design_btn text-gray-800 "
                        >
                            Sign-in
                        </NavLink>


                        <button
                            data-collapse-toggle="mobile-menu-2"
                            type="button"
                            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="mobile-menu-2"
                            aria-expanded="false"
                            onClick={toggleMobileMenu}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fill-rule="evenodd"
                                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                            <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fill-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <div className={`${isMobileMenuOpen ? 'flex' : 'hidden'
                        } justify-between items-center w-full lg:flex lg:w-auto lg:order-1 md:order-2`} id="mobile-menu-2">
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-2 xl:space-x-4 lg:mt-0 menupadding">
                            <li>
                                <a href="/" className="design_menu" aria-current="page">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="/about" className="design_menu" aria-current="page">
                                    About us
                                </a>
                            </li>
                            <li>
                                <a href="/contact" className="design_menu" aria-current="page">
                                    Contact us
                                </a>
                            </li>
                            <li>
                                <a href="/Partner_with_us" className="design_menu" aria-current="page">
                                    Partner with us
                                </a>
                            </li>
                            <li>
                                <div className='design_menu_signup'>
                                    <NavLink
                                        to="/signup"
                                        className="design_btn text-gray-800"
                                    >
                                        Sign up
                                    </NavLink>
                                </div>
                            </li>


                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}
