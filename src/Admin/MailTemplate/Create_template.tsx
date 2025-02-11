import { colors } from "@nextui-org/react";
import { AnyARecord } from "dns";
import React, { useState, useRef, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { NavLink } from 'react-router-dom';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Tabs, Tab, Checkbox } from "@nextui-org/react";
import { message, Select, Space } from "antd";
import { V1MailTemplate } from "../../APIurl/url";
import jwt from '../../getLoggedUser/GetUserInfomation';
import { IoMdArrowRoundBack } from "react-icons/io";
const Adminplaceholder = ["Admin_name", "Admin_email", "Admin_phone"];
const Staffplaceholder = ["Staff_name", "Staff_email", "Staff_phone"];
const Agentplaceholder = ["Agent_name", "Agent_email", "Agent_phone"];
const Clientplaceholder = ["Student_ID", "Student_name", "Student_email", "Student_phone", "student_Passport"];
const MailTemplateForm = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
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


    const [selectedTrigger, setSelectedTrigger]: any = useState(null);
    const [Templatename, setTemplatename] = useState("");
    const [subject, setSubject] = useState("");
    const [TemplateType, setTemplateType] = useState("");
    const [CCMail, setccmail] = useState([]);
    const [Receivermail, seReceivermail] = useState([]);
    const [recipientEmail, setRecipientEmail] = useState("");
    const [senderName, setSenderName] = useState("");
    const [senderEmail, setSenderEmail] = useState("");
    const [content, setContent] = useState("");
    const [selectedTags, setSelectedTags]: any = useState([]);
    const [previewMode, setPreviewMode] = useState(false);
    const [errors, setErrors]: any = useState({});

    const [showPopup, setShowPopup] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const quillRef: any = useRef(null);
    const popupRef = useRef<HTMLDivElement | null>(null);
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
                    templateName: Templatename,
                    subject: subject,
                    templateType: TemplateType,
                    ccMail: CCMail,
                    receiverEmail: Receivermail,
                    content: content,
                    PageRequestAction: 'MailTemaplateConfigrationPost'
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
                message.success("Template saved successfully");
                resetForm();
            }
        } catch (err) {
            setloading(false);
            message.error("Failed to save template");
        }
    }

    const handleTriggerSelect = (trigger: any) => {
        setSelectedTrigger(trigger);
        setShowPopup(true);
        setPosition({ top: 100, left: 100 });
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
    const editorRef: any = useRef(null);
    const execCommand = (command: any, value: any = null) => {
        document.execCommand(command, false, value);
        editorRef.current?.focus();
    };

    const handleFormat = (command: any) => {
        execCommand(command);
    };
    const handleLink = () => {
        const url = prompt('Enter URL:');
        if (url) execCommand('createLink', url);
    };

    const handleUnlink = () => {
        execCommand('unlink');
    };

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            const selection: any = window.getSelection();
            const range = selection.getRangeAt(0);
            const startNode = range.startContainer;

            // Check if we're in a list item
            const listItem = startNode.closest('li');
            if (listItem && !listItem.textContent.trim()) {
                e.preventDefault();
                execCommand('outdent');
            }
        }
    };

    return (
        <div className="container mx-auto p-6 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <NavLink className="btn btn-primary" to={`/admin/setting/Mail`}><IoMdArrowRoundBack /></NavLink>
                <h1 className="text-3xl font-bold mb-6 text-center" style={{ color: "#0975de" }}>Create Mail Template</h1>
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
                    <div className="grid grid-cols-2 gap-4">
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
                                    placeholder="Select CC Mail"
                                    onChange={(e: any) => (setccmail(e))}
                                    defaultValue={['getadminMail']}
                                    options={[
                                        { value: 'getadminMail', label: 'Admin' },

                                    ]}
                                />

                            </div>
                        </div>
                    </div>
                    <div className="mb-4" style={{ position: 'relative' }} >
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                            Content
                        </label>
                        <div className="rounded-lg p-4 flex flex-col border">
                            <div
                                ref={editorRef}
                                onInput={(e) => setContent(e.currentTarget.innerHTML)}
                                onKeyDown={handleKeyDown}
                                className="w-full h-[400px] max-h-[300px] overflow-y-auto resize-none outline-none font-light rounded-lg p-2 mb-4"
                                contentEditable
                                // dangerouslySetInnerHTML={{ __html: content }}
                                data-placeholder={content === "" ? "Compose your email..." : ""}
                            >
                            </div>

                            <div className="bg-white shadow-md rounded-md p-2 flex items-center space-x-2 shadow-reply">
                                <button type="button" className="p-2 hover:bg-gray-200 rounded text-gray-600" onClick={() => execCommand('undo')} >
                                    <i className="fas fa-undo" />
                                </button>
                                <button type="button" className="p-2 hover:bg-gray-200 rounded text-gray-600" onClick={() => execCommand('redo')}>
                                    <i className="fas fa-redo" />
                                </button>
                                <button type="button" className="p-2 hover:bg-gray-200 rounded text-gray-600" onClick={() => handleFormat('bold')}>
                                    <i className="fas fa-bold" />
                                </button>
                                <button type="button" className="p-2 hover:bg-gray-200 rounded text-gray-600" onClick={() => handleFormat('italic')}>
                                    <i className="fas fa-italic" />
                                </button>
                                <button type="button" className="p-2 hover:bg-gray-200 rounded text-gray-600" onClick={() => handleFormat('underline')}>
                                    <i className="fas fa-underline" />
                                </button>
                                <button type="button" className="p-2 hover:bg-gray-200 rounded text-gray-600" onClick={() => handleFormat('Left')}>
                                    <i className="fas fa-align-left" />
                                </button>
                                <button type="button" className="p-2 hover:bg-gray-200 rounded text-gray-600" onClick={() => handleFormat('Center')}>
                                    <i className="fas fa-align-center" />
                                </button>
                                <button type="button" className="p-2 hover:bg-gray-200 rounded text-gray-600" onClick={() => handleFormat('Right')}>
                                    <i className="fas fa-align-right" />
                                </button>
                                <button type="button" className="p-2 hover:bg-gray-200 rounded text-gray-600" onClick={() => handleFormat('Full')}>
                                    <i className="fas fa-align-justify" />
                                </button>
                                <button type="button" className="p-2 hover:bg-gray-200 rounded text-gray-600" onClick={() => handleFormat('bullet')}>
                                    <i className="fas fa-list-ul" />
                                </button>
                                <button type="button" className="p-2 hover:bg-gray-200 rounded text-gray-600" onClick={() => handleFormat('number')}>
                                    <i className="fas fa-list-ol" />
                                </button>
                                <button type="button" className="p-2 hover:bg-gray-200 rounded text-gray-600" onClick={() => handleFormat('indent')}>
                                    <i className="fas fa-indent" />
                                </button>
                                <button type="button" className="p-2 hover:bg-gray-200 rounded text-gray-600" onClick={() => handleFormat('outdent')}>
                                    <i className="fas fa-outdent" />
                                </button>
                                <button type="button" className="p-2 hover:bg-gray-200 rounded text-gray-600" onClick={() => handleFormat('formatBlock')}>
                                    <i className="fas fa-quote-right" />
                                </button>
                                <button type="button" className="p-2 hover:bg-gray-200 rounded text-gray-600" onClick={handleLink} >
                                    <i className="fas fa-link" />
                                </button>
                                <button type="button" className="p-2 hover:bg-gray-200 rounded text-gray-600" onClick={handleUnlink}  >
                                    <i className="fas fa-unlink" />
                                </button>
                            </div>
                        </div>
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
                            {loading ? 'waiting please...' : 'Save Template'}
                        </button>
                        <p
                            onClick={() => onOpen()}
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
                        <p><strong>From:</strong> {senderName} &lt;{senderEmail}&gt;</p>
                        <p><strong>To:</strong> {recipientEmail}</p>
                        <div className="mt-4">
                            <strong>Content:</strong>
                            <div dangerouslySetInnerHTML={{ __html: content }} />
                        </div>
                    </div>
                </div>
            )}



            <Modal
                size={'3xl'}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Preview</ModalHeader>
                            <ModalBody>
                                <div className="bg-white rounded-lg shadow-lg p-6 mb-6 animate-fade-in">

                                    <div className="border rounded-md p-4">
                                        <p><strong>Subject:</strong> {subject}</p>
                                        <p><strong>To:</strong> {Receivermail.toString() === 'getstaffMail' ? 'Staff Mail' : 'Agent mail'}</p>

                                        <p><strong>CC:</strong> Admin mail</p>
                                        <div className="mt-4">
                                            <strong>Content:</strong>
                                            <div dangerouslySetInnerHTML={{ __html: content }} />
                                        </div>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>



        </div>
    );
};

export default MailTemplateForm;