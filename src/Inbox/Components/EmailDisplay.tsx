import React, { useCallback, useEffect, useState } from "react";
import {
    ChevronDown, ArrowLeft, Printer, Star, CornerUpLeft, Forward
} from "lucide-react"
import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";
import Reply from "./Reply";
import { NavLink } from "react-router-dom";
import jwt from '../../getLoggedUser/GetUserInfomation';
import debounce from "lodash.debounce";
import { ApiCall } from "../../APIurl/API_call"
import { AjaxIntegration } from "../../APIurl/url"
const EmailDisplay = ({ email, onBack, userinfo, setmaillists }: any) => {
    const token = jwt('jwt');
    const splitEmail = email.from.split(/<|>/); // Split on '<' and '>'
    const Sendername = splitEmail[0].trim();  // "Brevo"
    const senderAddress = splitEmail[1];

    function formatEmailDate(dateString: any) {
        const date = new Date(dateString);

        // Format the date in the format: Tue, Jan 21, 11:41 AM
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'short', // Tue
            month: 'short', // Jan
            day: '2-digit', // 21
            hour: '2-digit', // 11
            minute: '2-digit', // 41
            hour12: true, // 12-hour format (AM/PM)
        };

        const formattedDate = date.toLocaleString('en-US', options).replace(',', ''); // Format the date without the extra comma

        // Calculate the time difference (e.g., 23 hours ago)
        const now = new Date();
        const timeDiff = Math.floor((now.getTime() - date.getTime()) / 1000); // Time difference in seconds

        let timeAgo = '';
        if (timeDiff < 60) {
            timeAgo = `${timeDiff} seconds ago`;
        } else if (timeDiff < 3600) {
            const minutes = Math.floor(timeDiff / 60);
            timeAgo = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else if (timeDiff < 86400) {
            const hours = Math.floor(timeDiff / 3600);
            timeAgo = `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (timeDiff < 2592000) {
            const days = Math.floor(timeDiff / 86400);
            timeAgo = `${days} day${days > 1 ? 's' : ''} ago`;
        } else {
            const months = Math.floor(timeDiff / 2592000);
            timeAgo = `${months} month${months > 1 ? 's' : ''} ago`;
        }

        return `${formattedDate} (${timeAgo})`;
    }

    const handlePrint = () => {
        const printContent = `
        <html>
            <head>
                <title>${email.subject}</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        padding: 20px;
                    }
                    h1 {
                        font-size: 1.5em;
                        color: #333;
                    }
                    p {
                        color: #555;
                    }
                    .email-header {
                        border-bottom: 1px solid #ddd;
                        margin-bottom: 10px;
                        padding-bottom: 10px;
                    }
                </style>
            </head>
            <body>
                <div class="email-header">
                    <h1>${email.subject}</h1>
                    <p><strong>From:</strong> ${Sendername} &lt;${senderAddress}&gt;</p>
                    <p><strong>To:</strong> ${email.to}</p>
                    <p><strong>Date:</strong> ${formatEmailDate(email.date)}</p>
                </div>
                <div class="email-body">
                    ${email.body}
                </div>
            </body>
        </html>
    `;

        const printWindow: any = window.open('', '_blank');
        printWindow.document.open();
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    };

    const [reply, setreply] = useState(false);
    const Reply_mail = () => {
        setreply(!reply);
    }


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
                email.is_starred = apiRoutes.starred;
                setmaillists((prevMailLists: any) =>
                    prevMailLists.map((item: any) =>
                        item.id === email.id ? { ...item, is_starred: apiRoutes.starred } : item
                    )
                );
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }

    };


    return (

        <div className="">
            {/* Email Header */}
            <div className="p-4 border-b">
                <div className="flex items-center justify-between MD-subject">
                    <h1 className="text-2xl text-gray-800 flex items-center gap-2">
                        <button className="p-2 mr-3 hover:bg-gray-100 rounded-full" onClick={onBack}>
                            <ArrowLeft className="h-5 w-5 text-gray-600" />
                        </button>
                        {email.subject}
                    </h1>
                    <div className="flex gap-2">
                        {email?.Application?.application_id && (
                            <NavLink
                                target="_blank"
                                to={
                                    userinfo?.ROLE === 'agent'
                                        ? `/${userinfo?.ROLE}/client/view/${email?.Application?.application_id}/${email?.Application?.filterid}`
                                        : userinfo?.ROLE === 'staff'
                                            ? `/${userinfo?.ROLE}/client/view/${email?.Application?.application_id}/${email?.Application?.Lead_ID}/${email?.Application?.filterid}/staff`
                                            : userinfo?.ROLE === 'admin'
                                                ? `/${userinfo?.ROLE}/student/view/${email?.Application?.application_id}/${email?.Application?.filterid}`
                                                : "#"
                                }
                            >
                                <button
                                    title={email?.Application?.firstName + " " + email?.Application?.lastName}
                                    className="ApplictionButton"
                                >
                                    VIEW APPLICATION
                                </button>
                            </NavLink>

                        )}
                        <button className="inline-flex items-center gap-2 ApplictionButton" onClick={Reply_mail}>
                            <CornerUpLeft className="h-4 w-4" />
                            Reply
                        </button>
                        <button
                            className="p-2 hover:bg-gray-100 rounded-full"
                            onClick={handlePrint}>
                            <Printer className="h-5 w-5 text-gray-600" />
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-medium">  {Sendername ? Sendername.charAt(0).toUpperCase() : ''}</span>
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="font-medium">{Sendername}</span>
                                <span className="text-gray-600 text-sm ml-2">{senderAddress}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <span className="text-sm">{formatEmailDate(email.date)}</span>
                                <button className={`p-2 hover:bg-gray-100 rounded-full ${email.is_starred ? 'MailStar' : ''}`} onClick={() => handleMailstared(email)}>
                                    <Star className="h-5 w-5" />
                                </button>

                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-600 text-sm">to me </span>
                            <Popover placement="bottom-start"  >
                                <PopoverTrigger className="cursor-pointer bg-gray-100 rounded-full p-1">
                                    <ChevronDown className="h-5 w-5" />
                                </PopoverTrigger>
                                <PopoverContent className="mt-4 bg-gray-50 rounded-lg border p-4 text-sm">

                                    <div className="grid grid-cols-[auto,1fr] gap-x-4 gap-y-2">
                                        <span className="text-gray-500">from:</span>
                                        <div>
                                            <span>{Sendername} </span>
                                            <span className="text-gray-500">{senderAddress}</span>
                                        </div>

                                        <span className="text-gray-500">to:</span>
                                        <span>{email.to}</span>

                                        <span className="text-gray-500">date:</span>
                                        <span>{formatEmailDate(email.date)}</span>

                                        <span className="text-gray-500">subject:</span>
                                        <span>{email.subject}</span>
                                    </div>

                                </PopoverContent>
                            </Popover>

                        </div>
                    </div>
                </div>
            </div>

            {/* Email Content */}
            <div className="">

                <iframe
                    title="Email Viewer"
                    srcDoc={`
                        <html>
                            <head>
                                <style>
                                    body {
                                        font: small / 1.5 Arial, Helvetica, sans-serif;
                                        background-color: #f9f9f9;
                                        color: #333;
                                        padding: 10px;
                                        font-size: 14px;
                                    }
                                </style>
                            </head>
                            <body>
                                ${email.body}
                            </body>
                        </html>
            `}
                    style={{
                        width: "100%",
                        height: "600px",
                    }}
                />

            </div>

            {/* Action Buttons */}
            {reply && <Reply userdata={userinfo} setreply={setreply} email={email} className={`transition-all duration-500 ease-in-out transform ${reply
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 -translate-y-5 scale-95"
                } mt-4 bg-gray-100 p-4 rounded shadow-md`}
            />}
        </div>

    );
};

export default EmailDisplay;
