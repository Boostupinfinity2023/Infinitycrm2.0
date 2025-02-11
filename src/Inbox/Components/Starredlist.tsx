import { Star, Tag, Users } from 'lucide-react';
import React, { useState, useEffect } from 'react';
// import { Checkbox } from "@/components/ui/checkbox"
import { debounce } from 'lodash';
import { ApiCall } from "../../APIurl/API_call"
import { AjaxIntegration } from "../../APIurl/url"
import jwt from '../../getLoggedUser/GetUserInfomation';
import { Inbox, MailCheck, Paperclip, MoreVertical, RefreshCcw, ChevronLeft, ChevronRight } from "lucide-react"
import {
    Dropdown,
    DropdownSection,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
    cn,
} from "@nextui-org/react";
import EmailDisplay from './EmailDisplay';

export default function EmailList() {
    const token = jwt('jwt');
    const emails = [
        {
            sender: "Google",
            subject: "Security alert",
            preview: "Boost-gmail-integration was granted access to your Google Account...",
            time: "10:55 AM",
        },
        {
            sender: "Growth.Design",
            subject: "🚀 UX in 60 seconds (special edition)",
            preview: "#015: quiz time!",
            time: "Jan 16",
        },
        // Add more emails as needed
    ]

    const categories = [
        { icon: Tag, label: "Primary", count: "18 new", active: true },
        { icon: Tag, label: "Promotions", count: "18 new" },
        { icon: Users, label: "Social", count: "1 new" },
    ]

    const [Maillists, setmaillists] = useState([]);
    const [Totalmails, settotalmails] = useState(0);
    const [loader, setloader] = useState(false);
    const [Typemail, settypemail] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;
    useEffect(() => {
        const Connectcheck = async () => {
            setloader(true);
            try {
                const apiRoutes = await ApiCall(
                    `${AjaxIntegration}?action=Maillist&access=private&page=${currentPage}&limit=${itemsPerPage}&Typemail=${Typemail}`,
                    'POST',
                    {
                        Authenticate: `${token}`,
                        'x-token-access': 'true',
                    },
                    null
                );
                if (apiRoutes.status && apiRoutes.code === 200) {
                    setmaillists(apiRoutes.data);
                    settotalmails(apiRoutes.Totalmail);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            setloader(false);
        };

        const debouncedConnect = debounce(Connectcheck, 300);
        debouncedConnect();
        return () => {
            debouncedConnect.cancel();
        };
    }, [currentPage, Typemail]);


    function formatEmailDate(date: any) {
        const emailDate = new Date(date); // Convert input date to Date object
        const now = new Date();

        // Check if the date is today
        if (
            emailDate.getDate() === now.getDate() &&
            emailDate.getMonth() === now.getMonth() &&
            emailDate.getFullYear() === now.getFullYear()
        ) {
            // Format as time (e.g., 4:00 PM)
            const hours = emailDate.getHours();
            const minutes = emailDate.getMinutes().toString().padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const formattedHour = hours % 12 || 12; // Convert 0 to 12 for 12-hour clock
            return `${formattedHour}:${minutes} ${ampm}`;
        }

        // Check if the date is within the current month
        if (
            emailDate.getMonth() === now.getMonth() &&
            emailDate.getFullYear() === now.getFullYear()
        ) {
            // Format as "Jan 6"
            const monthShortNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return `${monthShortNames[emailDate.getMonth()]} ${emailDate.getDate()}`;
        }

        // For other dates, format as "MM/DD/YY"
        const year = emailDate.getFullYear().toString().slice(-2); // Last two digits of the year
        const month = (emailDate.getMonth() + 1).toString().padStart(2, '0');
        const day = emailDate.getDate().toString().padStart(2, '0');
        return `${month}/${day}/${year}`;
    }


    const totalPages = Math.ceil(Totalmails / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };


    const applyFilter = (filter: any) => {
        settypemail(filter);
        // const params = new URLSearchParams(window.location.search);
        // params.set('filter', filter);
        // window.location.search = params.toString(); // Triggers API call with the updated filter
    };
    const [selectedMail, setSelectedMail] = useState(null);
    const handleMailClick = async (email: any) => {
        try {
            const apiRoutes = await ApiCall(
                `${AjaxIntegration}?action=Maildisplay&access=private&messageId=${email.id}`,
                'POST',
                {
                    Authenticate: `${token}`,
                    'x-token-access': 'true',
                },
                null
            );
            if (apiRoutes.status && apiRoutes.code === 200) {
                setSelectedMail(apiRoutes.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Function to handle back button click
    const handleBackToList = () => {
        setSelectedMail(null); // Clear the selected mail to show the list again
    };




    return (
        <div className="">
            {/* {loader ? (
                <div className="logo-loader">
                    <div className="loaderlogo-wrapper">
                        <img src="/loader_fav.png" alt="Logo" className="loader-logo" />
                    </div>
                </div>
            ) : ''} */}
            {selectedMail ? (
                // Render the EmailDisplay component when an email is selected
                <EmailDisplay email={selectedMail} onBack={handleBackToList} />
            ) : (
                <div>
                    <div className="flex items-center justify-between px-4">
                        <div className="flex items-center space-x-2">

                            <button className="h-9 w-9" onClick={() => { setloader(true) }}>
                                <RefreshCcw className="h-4 w-4" />
                            </button>
                            <Dropdown>
                                <DropdownTrigger>
                                    <MoreVertical className="h-4 w-4" />
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Static Actions">
                                    <DropdownItem key="all" onClick={() => applyFilter('all')}>
                                        <div className="flex items-center gap-2">
                                            <Inbox className="h-4 w-4" /> All Mail
                                        </div>
                                    </DropdownItem>
                                    <DropdownItem key="unread" onClick={() => applyFilter('unread')}>
                                        <div className="flex items-center gap-2">
                                            <MailCheck className="h-4 w-4" /> Unread Mail
                                        </div>
                                    </DropdownItem>
                                    <DropdownItem key="hasAttachment" onClick={() => applyFilter('hasAttachment')}>
                                        <div className="flex items-center gap-2">
                                            <Paperclip className="h-4 w-4" /> Has Attachment
                                        </div>
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>


                        </div>

                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-600">
                                {`${(currentPage - 1) * itemsPerPage + 1} - ${Math.min(currentPage * itemsPerPage, Totalmails)} of ${Totalmails}`}
                            </span>
                            <div className="flex items-center">
                                <button
                                    className="h-9 w-9"
                                    onClick={handlePreviousPage}
                                    disabled={currentPage === 1}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </button>
                                <button
                                    className="h-9 w-9"
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-b dark:border-gray-700">
                        {categories.map((category) => (
                            <button
                                onClick={() => { setloader(true) }}
                                key={category.label}
                                className={`flex items-center gap-2 px-4 py-3 text-sm text-gray-600 dark:text-gray-300 border-b-2 ${category.active
                                    ? "border-blue-500 text-blue-500"
                                    : "border-transparent"
                                    }`}
                            >
                                <category.icon className="w-4 h-4" />
                                {category.label}
                                {category.count && (
                                    <span className="text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">
                                        {category.count}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="divide-y dark:divide-gray-700">
                        {Maillists.map((email: any, i) => (
                            <div
                                key={i}
                                onClick={() => handleMailClick(email)}
                                className={`${email.is_unread ? '' : 'bg-[#f2f6fc]'} flex items-center px-4 py-2 group zA`}
                            >
                                {/* <Checkbox /> */}

                                <button className={`ml-4 text-gray-400 hover:text-yellow-400 ${email.is_starred ? 'MailStar' : ''}`}>
                                    <Star className={`h-5 w-5`} />
                                </button>
                                <div className="ml-4 min-w-0 flex-1">
                                    <div className="flex items-center justify-between">
                                        <p className="truncate text-sm font-medium text-gray-900">  {email?.senderName}</p>
                                        <p className="ml-2 flex-shrink-0 Mail-time">{formatEmailDate(email.date)}</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="truncate text-sm text-gray-500">
                                            <span className="font-medium text-gray-900">{email?.subject}</span> - {email.snippet}
                                        </p>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

