import { Star, Tag, Users } from 'lucide-react';
import React, { useState, useEffect } from 'react';
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
    Skeleton,
} from "@nextui-org/react";
import EmailDisplay from './EmailDisplay';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
export default function EmailList({ activeComponent, userinfo }: any) {
    const { MailboxId }: any = useParams();
    const token = jwt('jwt');
    const categories = [
        { icon: Tag, label: "Primary", active: true },
    ]
    const { googlesearch } = useSelector((state: any) => state?.themeConfig);
    const [Maillists, setmaillists] = useState([]);
    const [Totalmails, settotalmails] = useState(0);
    const [nextPageToken, setNextPageToken] = useState(null);
    const [loader, setloader] = useState(true);
    const [Refrsh, setrefrsh] = useState(false);
    const [Typemail, settypemail] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    const [Displayload, setdisplayload] = useState(false);

    useEffect(() => {
        // Reset pagination when activeComponent changes
        setCurrentPage(1);
        setNextPageToken(null);
    }, [Maillists]);


    useEffect(() => {
        setSelectedMail(null);

    }, [MailboxId]);
    useEffect(() => {

        const Connectcheck = setTimeout(async () => {
            setCurrentPage(1);
            setNextPageToken(null);
            setrefrsh(false);
            setloader(true);
            try {
                const apiRoutes = await ApiCall(
                    `${AjaxIntegration}?action=Maillist&access=private&page=${currentPage}&pageToken=${nextPageToken}&limit=${itemsPerPage}&Typemail=${Typemail}&Menufilter=${MailboxId.toLowerCase()}&q=${googlesearch !== null ? googlesearch : ''}`,
                    'get',
                    {
                        Authenticate: `${token}`,
                        'x-token-access': 'true',
                    },
                    null
                );
                if (apiRoutes.status && apiRoutes.code === 200) {
                    setmaillists(apiRoutes.data);
                    setNextPageToken(apiRoutes.nextPageToken);
                    settotalmails(apiRoutes.nextPageToken);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            setloader(false);
        }, 500);

        return (() => clearTimeout(Connectcheck))
    }, [googlesearch, currentPage, Typemail, MailboxId, Refrsh]);

    function formatEmailDate(date: any) {
        const emailDate = new Date(date);
        const now = new Date();
        if (
            emailDate.getDate() === now.getDate() &&
            emailDate.getMonth() === now.getMonth() &&
            emailDate.getFullYear() === now.getFullYear()
        ) {
            // Format as time (e.g., 4:00 PM)
            const hours = emailDate.getHours();
            const minutes = emailDate.getMinutes().toString().padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const formattedHour = hours % 12 || 12;
            return `${formattedHour}:${minutes} ${ampm}`;
        }
        if (
            emailDate.getMonth() === now.getMonth() &&
            emailDate.getFullYear() === now.getFullYear()
        ) {
            // Format as "Jan 6"
            const monthShortNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return `${monthShortNames[emailDate.getMonth()]} ${emailDate.getDate()}`;
        }
        const year = emailDate.getFullYear().toString().slice(-2);
        const month = (emailDate.getMonth() + 1).toString().padStart(2, '0');
        const day = emailDate.getDate().toString().padStart(2, '0');
        return `${month}/${day}/${year}`;
    }


    const totalPages = Math.ceil(Totalmails / itemsPerPage);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };


    const applyFilter = (filter: any) => {
        settypemail(filter);
    };
    const [selectedMail, setSelectedMail] = useState(null);
    const handleMailClick = async (email: any) => {
        setdisplayload(true);
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
        setdisplayload(false);
    };

    const handleMailstared = async (email: any) => {
        try {
            const apiRoutes = await ApiCall(
                `${AjaxIntegration}?action=markEmailAsStarred&access=private&messageId=${email.id}&Starred=${email.is_starred}`,
                'POST',
                {
                    Authenticate: `${token}`,
                    'x-token-access': 'true',
                },
                null
            );
            if (apiRoutes.status && apiRoutes.code === 200) {
                setmaillists((prevMailLists: any) =>
                    prevMailLists.map((item: any) =>
                        item.id === email.id ? { ...item, is_starred: apiRoutes.starred } : item
                    )
                );
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setdisplayload(false);
    };

    // Function to handle back button click
    const handleBackToList = () => {
        setSelectedMail(null); // Clear the selected mail to show the list again
    };

    return (
        <div className="">
            {Displayload ? (
                <div className="logo-loader">
                    <div className="loaderlogo-wrapper">
                        {/* <img src="/loader_fav.png" alt="Logo" className="loader-logo" /> */}
                    </div>
                </div>
            ) : ''}
            {selectedMail ? (
                // Render the EmailDisplay component when an email is selected
                <EmailDisplay userinfo={userinfo} email={selectedMail} onBack={handleBackToList} setmaillists={setmaillists} />
            ) : (
                <div>
                    <div className="flex items-center justify-between px-4">
                        <div className="flex items-center space-x-2">

                            <button className="h-9 w-9" onClick={() => { setrefrsh(true) }}>
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
                                {`${(currentPage - 1) * itemsPerPage + 1} - ${Math.min(currentPage * itemsPerPage, Totalmails)} `}
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

                            </button>
                        ))}
                    </div>

                    <div className="dark:divide-gray-700 mt-2">
                        {loader ?
                            (
                                Array(8).fill(true).map((_, i) => (
                                    <div className="w-full flex items-center gap-3 mt-5" key={i}>
                                        <div>
                                            <Skeleton className="flex rounded-full w-12 h-12" />
                                        </div>
                                        <div className="w-full flex flex-col gap-2">
                                            <Skeleton className="h-4 w-3/5 rounded-lg" />
                                            <Skeleton className="h-10 w-full rounded-lg" />
                                        </div>
                                    </div>
                                ))
                            ) : Maillists.length === 0 ? (
                                <div className="text-center text-gray-500 mt-5">
                                    {'No messages available'}
                                </div>
                            ) : (
                                Maillists.map((email: any, i) => (
                                    <div
                                        key={i}

                                        className={`${email.is_unread ? '' : 'bg-[#f2f6fc]'} flex items-center px-4 py-2 group zA`}
                                    >
                                        {/* <Checkbox /> */}

                                        <button className={`ml-4 text-gray-400 hover:text-yellow-400 ${email.is_starred ? 'MailStar' : ''}`} onClick={() => handleMailstared(email)}>
                                            <Star className={`h-5 w-5`} />
                                        </button>
                                        <div className="ml-4 min-w-0 flex-1" onClick={() => handleMailClick(email)}>
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
                                ))
                            )
                        }


                    </div>
                </div>
            )}
        </div>
    )
}
