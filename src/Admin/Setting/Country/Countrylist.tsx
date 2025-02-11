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
import { v1Dashboard, UPDATE } from "../../../APIurl/url";
import jwt from "../../../getLoggedUser/GetUserInfomation";
import { message, Tooltip } from "antd";
import Swal from "sweetalert2";
import { useDisclosure } from "@nextui-org/react";
import { Pagination } from "@nextui-org/react";
import AddDocument from "./Addcountry";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
const columns = [
    {
        key: "key",
        label: "#",
    },
    {
        key: "COUNTRY_NAME",
        label: "Country NAME",
    },
    {
        key: "Flag_name",
        label: "Flag",
    },
    {
        key: "Status",
        label: "Status",
    }
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
                const response = await fetch(v1Dashboard, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authenticate: `Bearer ${jwttoken}`,
                    },
                    body: JSON.stringify({
                        PAGE_REQUEST: "ADMIN.ALLCOUNTRY",
                    }),
                });

                const result = await response.json();
                settemplatedata(result['data']);
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
    const handleActive = async (ID: any) => {
        setActiveload(true);
        try {
            const response = await fetch(UPDATE, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authenticate: `Bearer ${jwttoken}`,
                },
                body: JSON.stringify({
                    ID: ID,
                    PAGE_REQUEST: "Country_active_deactive",
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

    // const HandleDelete = async (MAIL_TEMP_ID: any) => {
    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: "Do you want to delete this Document ?",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, delete it!',
    //         cancelButtonText: 'No, cancel',
    //     }).then(async (result) => {
    //         if (result.isConfirmed) {
    //             try {
    //                 const response = await fetch(GetUserAPI, {
    //                     method: "POST",
    //                     headers: {
    //                         "Content-Type": "application/json",
    //                         Authenticate: `Bearer ${jwttoken}`,
    //                     },
    //                     body: JSON.stringify({
    //                         Document_ID: MAIL_TEMP_ID,
    //                         PAGE_REQUEST: "DeleteDocument",
    //                     }),
    //                 });

    //                 const res = await response.json();
    //                 if (res.status === true) {
    //                     setloading(true);
    //                     message.success("Document deleted successfully");
    //                 } else {
    //                     message.error("Something went wrong");
    //                 }
    //             } catch (error) {
    //                 console.error("Error fetching document:", error);
    //             }
    //         }
    //     });
    // };
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
                                        {columnKey === "key" ? (
                                            <>
                                                {index + 1}
                                            </>
                                        ) : columnKey === "Status" ? (
                                            <div className="relative flex items-center gap-2 mobtabalign">

                                                <Switch defaultSelected={item.Status} aria-label="Automatic updates" onClick={() => handleActive(item.ID)} />
                                            </div>
                                        ) : columnKey === "Flag_name" ? (
                                            <img
                                                src={`https://harmanjeetsinghvirdi.com/CRM/API/V1/Flags/${item.Flag_name}`}
                                                alt="Selected Flag"
                                                style={{ width: '50px', height: 'auto' }}
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
