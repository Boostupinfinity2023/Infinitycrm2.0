"use client"

import { useState, useRef } from "react"
import {
    X,
    Minus,
    Maximize2,
    ChevronDown,
    Paperclip,
    Image,
    Link,
    Smile,
    Clock,
    Trash2,
    File,
    MoreVertical,
    Send,
} from "lucide-react"
import { message } from "antd";
import { AjaxIntegration } from "../../APIurl/url";
import jwt from '../../getLoggedUser/GetUserInfomation';
export default function ComposeModal({ onClose }: any) {
    const token = jwt('jwt');
    const [isLoading, setisLoading] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    const [attachments, setAttachments] = useState<File[]>([])
    const [showCc, setShowCc] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [showBcc, setShowBcc] = useState(false);
    const [subject, setSubject] = useState("")
    const [body, setBody] = useState("")
    const [recipients, setRecipients] = useState({
        to: "",
        cc: "",
        bcc: "",
    })

    const handleCcClick = () => {
        if (recipients.cc) {
            setRecipients((prev) => ({
                ...prev,
                bcc: prev.cc,
                cc: "",
            }))
            setShowBcc(true)
        }
    }

    const handleFileAttachment = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.files)
        if (event.target.files) {
            setAttachments((prev) => [...prev, ...Array.from(event.target.files as FileList)])
        }
    }

    const removeAttachment = (index: number) => {
        setAttachments((prev) => prev.filter((_, i) => i !== index))
    }


    const handleSendEmail = async () => {
        // Validate recipient fields
        if (!recipients.to) {
            message.error('Please enter a recipient email address.');
            return;
        }

        // Create FormData to send attachments and email data
        const formData = new FormData();

        // Add email data
        formData.append('to', recipients.to);
        formData.append('cc', showCc ? recipients.cc : '');
        formData.append('bcc', showBcc ? recipients.bcc : '');
        formData.append('subject', subject);
        formData.append('message', body);

        // Append files to FormData
        attachments.forEach((file, index) => {
            formData.append(`attachments[]`, file);
        });

        try {
            const response = await fetch(`${AjaxIntegration}?action=Mailsend&access=private`, {
                method: 'POST',
                headers: {
                    Authenticate: `${token}`, // Add authentication header if required
                },
                body: formData, // Send FormData directly
            });

            const result = await response.json();
            console.log(result);
            if (result.status) {
                alert('Email sent successfully!');
            } else {
                message.error(`${result.message}`);
            }
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Failed to send email.');
        }
    };


    return (
        <div
            className={`fixed ${isMaximized
                ? "top-[13%] left-[16%] right-[30%] w-[80%]"
                : isMinimized
                    ? "bottom-0 right-20 w-[500px]"
                    : "bottom-0 right-20 w-[600px]"
                } 
      bg-white rounded-t-lg flex flex-col Hd overscroll-auto`} // Update 2
        >
            {/* Header */}
            <div className="bg-[#f2f6fc] px-4 py-2 rounded-t-lg flex items-center justify-between">
                <h3 className="text-sm text-gray-700">New Message</h3>
                <div className="flex items-center gap-2">
                    <button onClick={() => {
                        setIsMinimized(!isMinimized)
                        setIsMaximized(false)
                    }

                    } className="p-1 hover:bg-gray-200 rounded">
                        <Minus className="h-4 w-4" />
                    </button>
                    <button onClick={() => {
                        setIsMaximized(!isMaximized)
                        setIsMinimized(false)
                    }

                    } className="p-1 hover:bg-gray-200 rounded">
                        {" "}
                        {/* Update 3 */}
                        <Maximize2 className="h-4 w-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-200 rounded" onClick={() => onClose(false)}>
                        <X className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Compose Form */}
            {!isMinimized && (
                <div className="flex-1 flex flex-col">
                    {/* Recipients */}
                    <div className="border-b">
                        <div className="flex items-center px-4 py-2">
                            <span className="w-12 text-sm text-gray-600">To</span>
                            <input
                                type="text"
                                className="flex-1 outline-none"
                                value={recipients.to}
                                onChange={(e) => setRecipients((prev) => ({ ...prev, to: e.target.value }))}
                                placeholder="Recipients"
                            />
                            <div className="flex items-center gap-2">
                                <button onClick={() => setShowCc(!showCc)} className="text-gray-600 text-sm hover:text-gray-800">
                                    Cc
                                </button>
                                <button onClick={() => setShowBcc(!showBcc)} className="text-gray-600 text-sm hover:text-gray-800">
                                    Bcc
                                </button>
                            </div>
                        </div>

                        {showCc && (
                            <div className="flex items-center px-4 py-2 border-t">
                                <span className="w-12 text-sm text-gray-600">Cc</span>
                                <input
                                    type="text"
                                    className="flex-1 outline-none"
                                    value={recipients.cc}
                                    onChange={(e) => setRecipients((prev) => ({ ...prev, cc: e.target.value }))}
                                    onClick={handleCcClick}
                                    placeholder="Carbon copy"
                                />
                            </div>
                        )}

                        {showBcc && (
                            <div className="flex items-center px-4 py-2 border-t">
                                <span className="w-12 text-sm text-gray-600">Bcc</span>
                                <input
                                    type="text"
                                    className="flex-1 outline-none"
                                    value={recipients.bcc}
                                    onChange={(e) => setRecipients((prev) => ({ ...prev, bcc: e.target.value }))}
                                    placeholder="Blind carbon copy"
                                />
                            </div>
                        )}
                    </div>

                    {/* Subject */}
                    <div className="border-b">
                        <div className="flex items-center px-4 py-2">
                            <input type="text" className="flex-1 outline-none" placeholder="Subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                            />
                        </div>
                    </div>

                    {attachments.length > 0 && (
                        <div className="border-b px-4 py-2">
                            <div className="flex flex-wrap gap-2">
                                {attachments.map((file, index) => (
                                    <div key={index} className="flex items-center bg-gray-100 rounded px-2 py-1">
                                        <File className="h-4 w-4 mr-2" />
                                        <span className="text-sm">{file.name}</span>
                                        <button onClick={() => removeAttachment(index)} className="ml-2 text-gray-500 hover:text-gray-700">
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}


                    {/* Editor */}
                    <div className="flex-1 p-1 Compose-Editor ">
                        <div className="flex-1 flex flex-col  h-[400px] ">

                            <div
                                className={`flex-1 p-4 outline-none overflow-auto`} // Update 5
                                contentEditable={true}
                                dangerouslySetInnerHTML={{ __html: "" }}
                                onInput={(e) => setBody(e.currentTarget.innerHTML)}
                                role="textbox"
                                aria-multiline="true"
                                aria-label="Email content"
                            />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t px-4 py-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleSendEmail}
                                disabled={isLoading}
                                className={`px-4 py-2 bg-blue-600 text-white rounded-full flex items-center gap-2 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                                {isLoading ? "Sending..." : "Send"}
                                <ChevronDown className="h-4 w-4" />
                            </button>

                            <div className="flex items-center gap-1">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileAttachment}
                                    className="hidden"
                                    multiple
                                />
                                <button onClick={() => {
                                    if (fileInputRef.current) {
                                        fileInputRef.current.click();
                                    }
                                }} className="p-2 hover:bg-gray-100 rounded">
                                    <Paperclip className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-1">
                            <button className="p-2 hover:bg-gray-100 rounded" onClick={() => onClose(false)}>
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

