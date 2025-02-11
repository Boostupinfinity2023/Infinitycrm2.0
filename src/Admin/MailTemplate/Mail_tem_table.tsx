import React, { useState, useEffect } from "react";
import Emptyimage from '../../../public/TableEmpty/Empty.jpg';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    getKeyValue,
    Switch,
    Spinner,
    User,
    Button
} from "@nextui-org/react";
import { NavLink } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { FaRegEye } from "react-icons/fa6";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { V1MailTemplate } from "../../APIurl/url";
import jwt from "../../getLoggedUser/GetUserInfomation";
import { message } from "antd";
import Swal from "sweetalert2";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { Pagination } from "@nextui-org/react";
import { switchClasses } from "@mui/base";
const columns = [
    {
        key: "key",
        label: "#",
    },
    {
        key: "TEMP_ID",
        label: "Template Name",
    },
    {
        key: "TRIGER_AFTER",
        label: "Triger Template",
    },
    {
        key: "IS_ACTIVE",
        label: "Active/Deactive",
    },
    {
        key: "USER_NAME",
        label: "Create By",
    },
    {
        key: "CREATE_AT",
        label: "Create At",
    },
    {
        key: "Action",
        label: "Action",
    },
];

const trigerfuncation = [
    {
        label: "Student Profile Created", value: "INSERT_USER_ENQUIRE_FORM_DATA"
    },
    {
        label: "Profile Updated by Agent", value: "STUDENT_PROFILE_FILE", other: [
            "Create At"
        ]
    },
    {
        label: "Profile Accepted by Staff", value: "File.Acceept.Staff.Client."
    },
    {
        label: "Profile Rejected by Staff", value: "File.Reject.Staff.Client."
    },
    {
        label: "Application Comment Added By Agent", value: "INSERT.COMMENT.Student.Agent"
    },
    {
        label: "Application Comment Added By Staff", value: "INSERT.COMMENT.USERPROFILE.INSERT.STAFF"
    },
    {
        label: "Additional Services Added by Agent", value: "ADD.ADDITIONS.FILE.ADD"
    },
    {
        label: "Document Request Sent", value: "INSERT_DOCUMENT_REQUEST_DATA"
    },
    {
        label: "Document Uploaded by Agent", value: "Document.Upload.Staff.Client."
    },
    {
        label: "Application Status Changed by Staff", value: "DEAL.STATUS.UPDATE"
    },
    {
        label: "Offer Letter Applied by Staff", value: "INSERT_OFFERLETTER_APPLICATION"
    },
    {
        label: "Offer Letter Comment Added", value: "INSERT_OFFER_LETTER_COMMENT"
    },
    {
        label: "Task Added by Staff", value: "CREATE.TASKS.DEAL.LEAD.STAFF"
    },
    {
        label: "Profile Ready for Commission", value: "Profile.Completed.Commission"
    },
    {
        label: "Commission Paid", value: "INSERT_PAYMENT_STATUS"
    },
];
export default function App() {
    const jwttoken = jwt("jwt");
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedTemplate, setSelectedTemplate]: any = useState(null);
    const [Page, setPage] = useState(1);
    const [Totalpage, settotalpage] = useState(0);
    const [Limit, setlimit] = useState(18);
    const [index, setindex] = useState(0);
    const [loading, setloading] = useState(false);
    const [Activeload, setActiveload] = useState(false);
    const [templatedata, settemplatedata] = useState([]);

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
                        Page: Page,
                        Totalpage: Totalpage,
                        Limit: Limit,
                        PageRequestAction: "Getmailtemplate",
                    }),
                });

                const result = await response.json();
                settemplatedata(result['data']['data']);
                settotalpage(result['data']['totalPages']);
                setloading(false);
            } catch (error) {
                setloading(false);
                console.error("Error fetching mail templates:", error);
            }
        };

        fetchData();
    }, [Limit, Page, loading, jwttoken]);

    const getTriggerLabel = (value: any) => {
        const trigger = trigerfuncation.find((t) => t.value === value);
        return trigger ? trigger.label : "Unknown Trigger";
    };

    // Function to handle viewing details
    const handleViewDetails = (template: any) => {
        setSelectedTemplate(template);
        onOpen();  // Open the modal
    };

    //Active and deactivated mail templates
    const handleActive = async (MAIL_TEMP_ID: any) => {
        setActiveload(true);
        try {
            const response = await fetch(V1MailTemplate, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authenticate: `Bearer ${jwttoken}`,
                },
                body: JSON.stringify({
                    MAIL_TEMP_ID: MAIL_TEMP_ID,
                    PageRequestAction: "MailTemplateActive",
                }),
            });

            const result = await response.json();
            if (result.status == true) {
                setloading(true);
                setActiveload(false);
                message.success("Status updated");
            } else {
                setActiveload(false);
                message.error("something went wrong");
            }
        } catch (error) {
            setActiveload(false);
            console.error("Error fetching mail templates:", error);
        }
    };

    const HandleDelete = async (MAIL_TEMP_ID: any) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to delete this mail template?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(V1MailTemplate, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authenticate: `Bearer ${jwttoken}`,
                        },
                        body: JSON.stringify({
                            MAIL_TEMP_ID: MAIL_TEMP_ID,
                            PageRequestAction: "MailTemplateDelete",
                        }),
                    });

                    const res = await response.json();
                    if (res.status === true) {
                        setloading(true);
                        message.success("Mail template deleted successfully");
                    } else {
                        message.error("Something went wrong");
                    }
                } catch (error) {
                    console.error("Error fetching mail templates:", error);
                }
            }
        });
    };
    const filter_key = (key: any) => {
        const filter = columns.find((value) => value?.key === key)
        return (filter?.label)

    }
    return (
        <>
            <div className="">
                <div className="flex justify-end mb-3">
                    {/* <NavLink to="/admin/setting/create_template" className="btn btn-primary">
                        <IoMdAdd />
                        Create Template
                    </NavLink> */}
                </div>
                <Table aria-label="Mail Templates" className="docmenttable"
                    bottomContent={
                        Totalpage > 0 ? (
                            <div className="flex w-full justify-center">
                                <Pagination
                                    isCompact
                                    showControls
                                    showShadow
                                    color="primary"
                                    page={Page}
                                    total={Totalpage}
                                    onChange={(page) => setPage(page)}
                                />
                            </div>
                        ) : null
                    }
                >
                    <TableHeader columns={columns}>
                        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                    </TableHeader>
                    <TableBody
                        isLoading={loading}
                        items={templatedata}
                        emptyContent={<div className='flex justify-center'><img src={Emptyimage} alt="" width={'20%'} /></div>}
                        loadingContent={<Spinner label="Loading..." />}
                    >
                        {templatedata.map((item: any, index: any) => (
                            <TableRow key={item.TEMP_ID}>
                                {(columnKey) => (
                                    <TableCell>
                                        <span className="mailtempstend" data-column={filter_key(columnKey)} />
                                        {columnKey === "key" ? (
                                            <>
                                                <span className="mailtempstend" > {index + 1} </span>
                                            </>
                                        ) : columnKey === "IS_ACTIVE" ? (
                                            Activeload ? (
                                                <Spinner size="sm" />
                                            ) : (
                                                <div>
                                                    <span className="mailtempstend" >
                                                        <Switch
                                                            isSelected={item.IS_ACTIVE === 'true' ? true : false}
                                                            aria-label="Active/Deactive"
                                                            onChange={() => handleActive(item.MAIL_TEMP_ID)}
                                                        />
                                                        <p>
                                                            <span className="text-xs/[5px]">
                                                                {item.IS_ACTIVE === 'true' ? 'Active' : 'Deactive'}
                                                            </span>
                                                        </p>
                                                    </span>
                                                </div>
                                            )
                                        ) : columnKey === "TRIGER_AFTER" ? (
                                            getTriggerLabel(item.TRIGER_AFTER)
                                        ) : columnKey === "Action" ? (
                                            <div className="relative flex items-center gap-2 mobtabalign">
                                                <span
                                                    className="text-xl text-primary-400 cursor-pointer active:opacity-50"
                                                    onClick={() => handleViewDetails(item)}
                                                >
                                                    <FaRegEye />
                                                </span>
                                                <span className="text-xl text-blue-400 cursor-pointer active:opacity-50">
                                                    <NavLink to={`/admin/setting/Edit_template/${item.MAIL_TEMP_ID}/${item.TEMP_ID}`}>
                                                        <MdModeEditOutline />
                                                    </NavLink>
                                                </span>
                                                <span
                                                    className="text-xl cursor-pointer active:opacity-50"
                                                    onClick={() => HandleDelete(item.MAIL_TEMP_ID)}
                                                >
                                                    <MdDelete />
                                                </span>
                                            </div>
                                        ) : columnKey === "USER_NAME" ? (
                                            <span className="mailtempstend">
                                                <User

                                                    name={item.USER_NAME}
                                                    description={item.USER_EMAIL}
                                                    avatarProps={{
                                                        showFallback: true,
                                                        src: `${item.USER_Profile}`,
                                                    }}

                                                />
                                            </span>
                                        ) : (
                                            getKeyValue(item, columnKey)
                                        )}
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>


                {/* Modal to show template details */}
                <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={'3xl'} >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Template Details</ModalHeader>
                                <ModalBody>
                                    {selectedTemplate ? (
                                        <>
                                            <div className="p-6 mb-6 animate-fade-in">
                                                <h2 className="text-2xl font-bold mb-4">Preview</h2>
                                                <div className=" p-4">
                                                    <p><strong>Subject:</strong> {selectedTemplate.MAIL_SUBJECT}</p>
                                                    <p><strong>To:</strong> {JSON.parse(selectedTemplate.RECEIVER_MAIL)}</p>
                                                    <p><strong>CC:</strong> {JSON.parse(selectedTemplate.MAIL_CC)}</p>
                                                    <div className="mt-4">
                                                        <strong>Content:</strong>
                                                        <div dangerouslySetInnerHTML={{ __html: selectedTemplate.MAIL_TEMPLATE_CONTENT }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <p>No template selected.</p>
                                    )}
                                </ModalBody>
                                <ModalFooter>
                                    <Button className="btn btn-primary" onPress={onClose}>
                                        Close
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>
        </>
    );
}
