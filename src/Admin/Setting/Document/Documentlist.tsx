import React, { useState, useEffect } from "react";
import Emptyimage from '../../../../public/TableEmpty/Empty.jpg';
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
import { GetUserAPI } from "../../../APIurl/url";
import jwt from "../../../getLoggedUser/GetUserInfomation";
import { message, Tooltip } from "antd";
import Swal from "sweetalert2";
import { useDisclosure } from "@nextui-org/react";
import { Pagination } from "@nextui-org/react";
import AddDocument from "./Add_document";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
const columns = [
    {
        key: "key",
        label: "#",
    },
    {
        key: "DOCUMENT_NAME",
        label: "DOCUMENT NAME",
    },
    {
        key: "DOCUMENT_TYPE",
        label: "DOCUMENT TYPE",
    },
    {
        key: "TITLE",
        label: "TITLE",
    },
    {
        key: "DOCUMENT_INFOMATION",
        label: "DOCUMENT INFOMATION",
    },
    {
        key: "CREATE_AT",
        label: "Create at",
    },
    {
        key: "Action",
        label: "Action",
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
                const response = await fetch(GetUserAPI, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authenticate: `Bearer ${jwttoken}`,
                    },
                    body: JSON.stringify({
                        Page: Page,
                        Totalpage: Totalpage,
                        Limit: Limit,
                        PAGE_REQUEST: "Get_documents_data",
                    }),
                });

                const result = await response.json();
                settemplatedata(result['data']);
                settotalpage(result['data']['totalPages']);
                setloading(false);
            } catch (error) {
                setloading(false);
                console.error("Error fetching mail templates:", error);
            }
        };

        fetchData();
    }, [Limit, Page, loading, jwttoken]);


    // Function to handle viewing details
    const handleViewDetails = (template: any) => {
        setSelectedTemplate(template);
        onOpen();  // Open the modal
    };

    //Active and deactivated mail templates
    const handleActive = async (MAIL_TEMP_ID: any) => {
        setActiveload(true);
        try {
            const response = await fetch(GetUserAPI, {
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
            text: "Do you want to delete this Document ?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(GetUserAPI, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authenticate: `Bearer ${jwttoken}`,
                        },
                        body: JSON.stringify({
                            Document_ID: MAIL_TEMP_ID,
                            PAGE_REQUEST: "DeleteDocument",
                        }),
                    });

                    const res = await response.json();
                    if (res.status === true) {
                        setloading(true);
                        message.success("Document deleted successfully");
                    } else {
                        message.error("Something went wrong");
                    }
                } catch (error) {
                    console.error("Error fetching document:", error);
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
                    <AddDocument Refresh={setloading} />
                </div>
                <Table aria-label="Mail Templates"  className="docmenttable"
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
                                        {columnKey === "key" ? (
                                            <>
                                                {index + 1}
                                            </>
                                        ) : columnKey === "Action" ? (
                                            <div className="relative flex items-center gap-2 mobtabalign">

                                                <div className="flex text-2xl gap-3">
                                                    {/* <Tooltip showArrow={true} title="Edit status"> */}
                                                    {/* <span className="cursor-pointer" onClick={() => EditStatusSection(event)} ><CiEdit style={{ color: '#006ed9' }} /></span>
                                                        </Tooltip> */}
                                                    <Tooltip showArrow={true} title="Delete Document">
                                                        <span className="cursor-pointer" onClick={() => HandleDelete(item.ID)}><MdDeleteOutline style={{ color: '#ff0000' }} /></span>
                                                    </Tooltip>
                                                </div>

                                                {/* <span
                                                    className="text-xl text-primary-400 cursor-pointer active:opacity-50"
                                                    onClick={() => handleViewDetails(item)}
                                                >
                                                    <FaRegEye />
                                                </span>
                                                <span className="text-xl  text-blue-400 cursor-pointer active:opacity-50">
                                                    <NavLink to={`/admin/setting/Edit_template/${item.MAIL_TEMP_ID}/${item.TEMP_ID}`}>
                                                        <MdModeEditOutline />
                                                    </NavLink>
                                                </span> */}
                                                {/* <span
                                                    className="text-xl text-red cursor-pointer active:opacity-50"
                                                    onClick={() => HandleDelete(item.MAIL_TEMP_ID)}
                                                >
                                                    <MdDelete />
                                                </span> */}
                                            </div>
                                        ) : columnKey === "USER_NAME" ? (
                                            <User
                                                name={item.USER_NAME}
                                                description={item.USER_EMAIL}
                                                avatarProps={{
                                                    showFallback: true,
                                                    src: `${item.USER_Profile}`,
                                                }}
                                            />
                                        ) : (
                                            getKeyValue(item, columnKey)
                                        )}
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>



            </div>
        </>
    );
}
