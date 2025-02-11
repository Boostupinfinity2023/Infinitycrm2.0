import { colors } from "@nextui-org/react";
import { AnyARecord } from "dns";
import React, { useState, useRef, useEffect } from "react";
import { FaTrash, FaSave, FaEdit, FaEye } from "react-icons/fa";
import { NavLink, useParams } from 'react-router-dom';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Tabs, Tab, Checkbox } from "@nextui-org/react";
import { message, Select, Space } from "antd";
import { V1MailTemplate } from "../../APIurl/url";
import jwt from '../../getLoggedUser/GetUserInfomation';
import { IoMdArrowRoundBack } from "react-icons/io";
import { Editor } from "primereact/editor";
const Adminplaceholder = ["Admin_name", "Admin_email", "Admin_phone"];
const Staffplaceholder = ["Staff_name", "Staff_email", "Staff_phone"];
const Agentplaceholder = ["Agent_name", "Agent_email", "Agent_phone"];
const Clientplaceholder = ["Student_ID", "Student_name", "Student_email", "Student_phone", "student_Passport", "Status", "University_Name", "Course_Applied", "Edu_ID"];
const MailTemplateForm = () => {
    const { TemplateId } = useParams();
    const { EditTemplate } = useParams();
    const trigerfuncation = [
        {
            label: "Student Profile Created", value: "INSERT_USER_ENQUIRE_FORM_DATA", ReceiverData: Staffplaceholder, StudentData: Clientplaceholder, other: [
                "Create At"
            ], ReceivermailData: [
                { value: 'getstaffMail', label: 'Staff' }
            ]
        },
        {
            label: "Profile Updated by Agent", value: "STUDENT_PROFILE_FILE", ReceiverData: Staffplaceholder, StudentData: Clientplaceholder, other: [
                "Create At"
            ], ReceivermailData: [
                { value: 'getstaffMail', label: 'Staff' }
            ]
        },
        {
            label: "Profile Accepted by Staff", value: "File.Acceept.Staff.Client.", ReceiverData: Agentplaceholder, StudentData: Clientplaceholder, other: [
                "Create At"
            ], ReceivermailData: [
                { value: 'getagentMail', label: 'Agent' },
            ]
        },
        {
            label: "Profile Rejected by Staff", value: "File.Reject.Staff.Client.", ReceiverData: Agentplaceholder, StudentData: Clientplaceholder,
            other: [
                "Create At"
            ], ReceivermailData: [
                { value: 'getagentMail', label: 'Agent' },
            ]
        },
        {
            label: "Application Comment Added By Agent", value: "INSERT.COMMENT.Student.Agent", ReceiverData: Staffplaceholder, StudentData: Clientplaceholder,
            other: [
                "Create At"
            ], ReceivermailData: [
                { value: 'getstaffMail', label: 'Staff' }
            ]
        },
        {
            label: "Application Comment Added By Staff", value: "INSERT.COMMENT.USERPROFILE.INSERT.STAFF", ReceiverData: Agentplaceholder, StudentData: Clientplaceholder,
            other: [
                "Create At"
            ], ReceivermailData: [
                { value: 'getagentMail', label: 'Agent' },
            ]
        },
        {
            label: "Additional Services Added by Agent", value: "ADD.ADDITIONS.FILE.ADD", ReceiverData: Staffplaceholder, StudentData: Clientplaceholder,
            other: [
                "Create At"
            ], ReceivermailData: [
                { value: 'getagentMail', label: 'Agent' },
            ]
        },
        {
            label: "Document Request Sent", value: "INSERT_DOCUMENT_REQUEST_DATA", ReceiverData: Agentplaceholder, StudentData: Clientplaceholder,
            other: [
                "Create At"
            ], ReceivermailData: [
                { value: 'getstaffMail', label: 'Staff' }
            ]
        },
        {
            label: "Document Uploaded by Agent", value: "Document.Upload.Staff.Client.", ReceiverData: Staffplaceholder, StudentData: Clientplaceholder,
            other: [
                "Create At"
            ], ReceivermailData: [
                { value: 'getagentMail', label: 'Agent' },
            ]
        },
        {
            label: "Application Status Changed by Staff", value: "DEAL.STATUS.UPDATE", ReceiverData: Agentplaceholder, StudentData: Clientplaceholder,
            other: [
                "Create At"
            ], ReceivermailData: [
                { value: 'getagentMail', label: 'Agent' },
            ]
        },
        {
            label: "Offer Letter Applied by Staff", value: "INSERT_OFFERLETTER_APPLICATION", ReceiverData: Agentplaceholder, StudentData: Clientplaceholder,
            other: [
                "Create At"
            ], ReceivermailData: [
                { value: 'getagentMail', label: 'Agent' },
            ]
        },
        {
            label: "Offer Letter Comment Added", value: "INSERT_OFFER_LETTER_COMMENT", ReceiverData: Agentplaceholder, StudentData: Clientplaceholder,
            other: [
                "Create At"
            ], ReceivermailData: [
                { value: 'getagentMail', label: 'Agent' },
            ]
        },
        {
            label: "Task Added by Staff", value: "CREATE.TASKS.DEAL.LEAD.STAFF", ReceiverData: Agentplaceholder, StudentData: Clientplaceholder,
            other: [
                "Create At"
            ], ReceivermailData: [
                { value: 'getagentMail', label: 'Agent' },
            ]
        },
        {
            label: "Profile Ready for Commission", value: "Profile.Completed.Commission", ReceiverData: Agentplaceholder, StudentData: Clientplaceholder,
            other: [
                "Create At"
            ], ReceivermailData: [
                { value: 'getagentMail', label: 'Agent' },
            ]
        },
        {
            label: "Commission Paid", value: "INSERT_PAYMENT_STATUS", ReceiverData: Agentplaceholder, StudentData: Clientplaceholder,
            other: [
                "Create At"
            ], ReceivermailData: [
                { value: 'getagentMail', label: 'Agent' },
            ]
        },
    ];




    const [Fetchload, setfetchload] = useState(false);
    const [selectedTrigger, setSelectedTrigger]: any = useState(null);
    const [Templatename, setTemplatename] = useState("");
    const [subject, setSubject] = useState("");
    const [TemplateType, setTemplateType] = useState("");
    const [CCMail, setccmail] = useState([]);
    const [Receivermail, seReceivermail] = useState([]);
    const [content, setContent] = useState("");
    const [selectedTags, setSelectedTags]: any = useState([]);
    const [previewMode, setPreviewMode] = useState(false);
    const [errors, setErrors]: any = useState({});

    const [showPopup, setShowPopup] = useState(false); // Show/hide placeholder popup
    const [position, setPosition] = useState({ top: 0, left: 0 }); // Position of popup
    const quillRef: any = useRef(null);
    const popupRef = useRef<HTMLDivElement | null>(null);

    //fetch edit template from template


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(V1MailTemplate, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authenticate: `Bearer ${jwttoken}`,
                    },
                    body: JSON.stringify({
                        PageRequestAction: "GetEditTemplate",
                        TemplateId: TemplateId,
                        EditTemplate: EditTemplate

                    }),
                });

                const result = await response.json();
                const data = result['data'][0];

                const selectedValue = data.TRIGER_AFTER;
                const trigger = trigerfuncation.find(t => t.value === selectedValue);
                if (trigger) {
                    setSelectedTrigger(trigger);
                } else {
                    setSelectedTrigger(null);
                    setShowPopup(false);
                }

                setTemplatename(data.TEMP_ID);
                setTemplateType(data.TRIGER_AFTER);
                setSubject(data.MAIL_SUBJECT);
                setccmail(JSON.parse(data.MAIL_CC));
                seReceivermail(JSON.parse(data.RECEIVER_MAIL));
                setContent(data.MAIL_TEMPLATE_CONTENT);
                setfetchload(false);
            } catch (error) {
                setfetchload(false);
                setloading(false);
                console.error("Error fetching mail templates:", error);
            }
        };

        fetchData();
    }, [Fetchload]);



    const handleTagChange = (tag: any) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter((t: any) => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const validateForm = () => {
        const newErrors: any = {};
        if (!Templatename.trim()) newErrors.Templatename = "Template name is required";
        if (!TemplateType) newErrors.TemplateType = "Trigger function is required";
        if (!subject.trim()) newErrors.subject = "Subject is required";
        if (Receivermail.length === 0) newErrors.Receivermail = "Receiver email is required";
        if (!content.trim()) newErrors.content = "Content is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (validateForm()) {
            // const newTemplate = { subject, recipientEmail, senderName, senderEmail, content, selectedTags };
            // setTemplates([...templates, newTemplate]);
            resetForm();
        }
    };

    const resetForm = () => {
        setTemplatename("");
        setSubject("");
        setTemplateType("");
        setccmail([]);
        seReceivermail([]);
        setContent("");
        setSelectedTags();
        setErrors({});
    };


    const [storedRange, setStoredRange] = useState<any>(null);
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.ctrlKey && e.key === 'p') {
            e.preventDefault();

            const editor = quillRef.current?.getEditor();
            if (editor) {
                const range = editor.getSelection();
                if (range) {
                    setStoredRange(range); // Store the selection range

                    const bounds = editor.getBounds(range.index);
                    setPosition({ top: bounds.top, left: bounds.left });
                    setShowPopup(true);
                } else {
                    console.log("No selection");
                }
            }
        } else if (e.key === '[') {
            e.preventDefault();

            const editor = quillRef.current?.getEditor();
            if (editor) {
                const range = editor.getSelection();
                if (range) {
                    setStoredRange(range); // Store the selection range

                    const bounds = editor.getBounds(range.index);
                    setPosition({ top: bounds.top, left: bounds.left });
                    setShowPopup(true);
                } else {
                    console.log("No selection");
                }
            }
        }
    };

    const insertPlaceholder = (placeholder: string) => {
        const editor = quillRef.current?.getEditor();
        if (storedRange) {
            editor.insertText(storedRange.index, `[${placeholder}]`);
        } else {
            console.log("No range stored to insert the placeholder.");
        }

        setShowPopup(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setShowPopup(false); // Close the popup if clicking outside
                setStoredRange(null); // Clear the stored range
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const renderPlaceholders = (placeholders: string[]) => {
        return placeholders.map((placeholder, index) => (
            <Checkbox key={index} onChange={() => insertPlaceholder(placeholder)}>
                {placeholder}
            </Checkbox>
        ));
    };

    const getOtherFields = (templateType: any) => {
        const selectedTrigger = trigerfuncation.find(trigger => trigger.value === templateType);
        return selectedTrigger ? selectedTrigger.other : [];
    };


    const jwttoken = jwt('jwt');
    const [loading, setloading] = useState(false)
    const handleSubmissionTemplate = async (event: any) => {
        event.preventDefault();
        if (!validateForm()) {
            return false;
        }
        setloading(true)
        /*
            *@targets form input and submit
            *@form input validation error hanlding template
            *@select assignment to 
        */

        const forminputs = new FormData(event.target);

        try {
            const response = await fetch(V1MailTemplate, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authenticate: `Bearer ${jwttoken}`,
                },
                body: JSON.stringify({
                    ID: TemplateId,
                    templateName: Templatename,
                    subject: subject,
                    templateType: TemplateType,
                    ccMail: CCMail,
                    receiverEmail: Receivermail,
                    content: content,
                    PageRequestAction: 'EditmaitemplateData'
                }),
            });

            const apiresponse = await response.json();
            if (apiresponse?.status === false && apiresponse?.error) {
                apiresponse?.error.map((values: any, index: any) => {
                    message.error(values);
                })
                setloading(false);
            } else if (apiresponse?.status === false) {
                setloading(false);
                message.error("Failed to save template");
            } else if (apiresponse?.status === true) {
                setloading(false);
                setfetchload(true);
                message.success("Template Update successfully");

            }
        } catch (err) {
            setloading(false);
            message.error("Failed to save template");
        }
    }

    const handleTemplateChange = (e: any) => {
        const selectedValue = e.target.value;
        setTemplateType(selectedValue);
        const trigger = trigerfuncation.find(t => t.value === selectedValue);
        if (trigger) {
            setSelectedTrigger(trigger);
        } else {
            setSelectedTrigger(null);
            setShowPopup(false);
        }
        setErrors((prev: any) => ({ ...prev, TemplateType: false }));
    };

    const handleEditorChange = (content: any) => {
        // Handle editor content change here

        setContent(content.htmlValue);
    };


    return (
        <div className="container mx-auto p-6 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <NavLink className="btn btn-primary" to={`/admin/setting/Mail`}><IoMdArrowRoundBack /></NavLink>
                <h1 className="text-3xl font-bold mb-6 text-center" style={{ color: "#0975de" }}>Edit Mail Template</h1>
                <div>

                </div>
            </div>
            <form onSubmit={handleSubmissionTemplate}>
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                                Template Name
                            </label>
                            <input
                                type="text"
                                id="subject"
                                value={Templatename}
                                onChange={(e) => setTemplatename(e.target.value)}
                                className={`w-full px-3 py-2 border rounded-md ${errors.Templatename ? "border-red-500" : "border-gray-300"}`}
                                placeholder="Enter Template Name"
                            />
                            {errors.Templatename && <p className="text-red-500 text-xs mt-1">{errors.Templatename}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                                Triger Function
                            </label>
                            <select
                                name="subject"
                                id="subject"
                                className={`w-full px-3 py-2 border rounded-md ${errors.TemplateType ? "border-red-500" : "border-gray-300"}`}
                                onChange={handleTemplateChange}   // Handle trigger change
                                value={TemplateType}  // Bind selected trigger value
                                disabled
                            >
                                <option value="">Select Trigger</option>
                                {trigerfuncation.map((trigger) => (
                                    <option key={trigger.value} value={trigger.value}>
                                        {trigger.label}
                                    </option>
                                ))}
                            </select>

                            {errors.TemplateType && <p className="text-red-500 text-xs mt-1">{errors.TemplateType}</p>}
                        </div>
                    </div>
                    <div className="grid grid-cols-1  gap-4">
                        <div className="mb-4">
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                                Subject
                            </label>
                            <input
                                type="text"
                                id="subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className={`w-full px-3 py-2 border rounded-md ${errors.subject ? "border-red-500" : "border-gray-300"}`}
                                placeholder="Enter subject"
                            />
                            {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                        </div>

                    </div>
                    {/* <div className="grid grid-cols-2 gap-4">
                        <div className="">
                            <div className="mb-4">
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                                    Receiver Mail
                                </label>

                                <Select
                                    mode="multiple"
                                    style={{ width: '100%' }}
                                    placeholder="Select Receiver Mail"
                                    onChange={(e: any) => (seReceivermail(e))}
                                    value={Receivermail}
                                    options={selectedTrigger && selectedTrigger.ReceivermailData}
                                />
                                {errors.Receivermail && <p className="text-red-500 text-xs mt-1">{errors.Receivermail}</p>}
                            </div>
                        </div>

                        <div className="">
                            <div className="mb-4">
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                                    CC Mail
                                </label>
                                <Select
                                    // className={`border rounded-md  ${errors.CCMail ? "border-red-500" : "border-gray-300"}`}
                                    mode="multiple"
                                    style={{ width: '100%' }}
                                    value={CCMail}
                                    placeholder="Select CC Mail"
                                    onChange={(e: any) => (setccmail(e))}
                                    options={[
                                        { value: 'getadminMail', label: 'Admin' },

                                    ]}
                                />
                                {errors.CCMail && <p className="text-red-500 text-xs mt-1">{errors.CCMail}</p>}
                            </div>
                        </div>
                    </div> */}
                    <div className="mb-4" style={{ position: 'relative' }} >
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                            Content
                        </label>

                        [Student_ID] [Student_name] [Student_email] [Student_phone] [student_Passport] [Status] [University_Name] [Course_Applied] [Edu_ID]
                        <Editor
                            value={content}
                            onTextChange={handleEditorChange} // Assuming onTextChange is the correct prop for handling changes in the Editor

                            placeholder="Enter your description" // Add other props as needed
                            name="CommentText"
                        />
                        {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}
                        <p className="text-sm text-gray-500 mt-2">
                            Character count: {content.replace(/<[^>]*>/g, "").length}
                        </p>

                        {showPopup && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: position.top + 60,
                                    left: position.left + 20,
                                    backgroundColor: 'white',
                                    border: '1px solid #ccc',
                                    padding: '10px',
                                    zIndex: 1000,
                                }}
                            >
                                <div className="flex justify-end ">
                                    <button className="btn btn-primary" style={{ position: "absolute", right: "-48px", top: "-1px" }} onClick={() => setShowPopup(false)}>X</button>
                                </div>
                                <Tabs aria-label="Tabs sizes" color="primary" variant="underlined">
                                    <Tab key="ReceiverData" title="Receiver Data">
                                        <div className="p-4 grid gap-2">
                                            {selectedTrigger && renderPlaceholders(selectedTrigger.ReceiverData)}
                                        </div>
                                    </Tab>
                                    <Tab key="StudentData" title="Student Data">
                                        <div className="p-4 grid gap-2">
                                            {selectedTrigger && renderPlaceholders(selectedTrigger.StudentData)}
                                        </div>
                                    </Tab>
                                    <Tab key="Other" title="Other">
                                        <div className="p-4 grid gap-2">
                                            {selectedTrigger && renderPlaceholders(selectedTrigger.other)}
                                        </div>
                                    </Tab>
                                </Tabs>


                            </div>
                        )}
                    </div>
                    <div className="flex justify-between items-center mt-6">
                        <button
                            disabled={loading}
                            type="submit"
                            className="btn btn-primary"

                        >
                            {loading ? 'waiting please...' : 'Edit Template'}
                        </button>
                        <p
                            onClick={() => setPreviewMode(!previewMode)}
                            className="btn btn-primary"
                        >
                            {previewMode ? "Edit Mode" : "Preview Mode"}
                        </p>
                    </div>
                </div>
            </form>
            {previewMode && (
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6 animate-fade-in">
                    <h2 className="text-2xl font-bold mb-4">Preview</h2>
                    <div className="border rounded-md p-4">
                        <p><strong>Subject:</strong> {subject}</p>
                        <p><strong>To:</strong> {Receivermail}</p>
                        <div className="mt-4">
                            <strong>Content:</strong>
                            <div dangerouslySetInnerHTML={{ __html: content }} />
                        </div>
                    </div>
                </div>
            )}





        </div>
    );
};

export default MailTemplateForm;