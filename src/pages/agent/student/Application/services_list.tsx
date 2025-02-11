import React, { useState, useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spinner } from "@nextui-org/react";
import { v1GETDATA } from '../../../../APIurl/url';
import { INSERTDATA } from '../../../../APIurl/url';
import jwt from '../../../../getLoggedUser/GetUserInfomation';
import { useParams, NavLink } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { Editor } from "primereact/editor";
import { Select, SelectItem } from "@nextui-org/react";
import "./services.css";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { message } from 'antd';
import {
    EyeOutlined
} from '@ant-design/icons';
import Emptyimage from '../../../../../public/TableEmpty/Empty.jpg';
export default function      App({ FileID }: any) {
    const globalVar = window.globalVariable;
    const MySwal = withReactContent(Swal);
    const [text, setText]: any = useState('');

    const [loader, setloader] = useState(false);
    const [Refresh, SetRefresh] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const token = jwt('jwt');
    const { client_id } = useParams();
    const [loaddata, setloaddata] = useState(true);
    const [ApplicationTotal, setApplicaton] = useState([]);
    const [page, setpage] = useState(1);
    const [Totalpage, Settotalpage] = useState(1);


    const debouncedTotalapplication = debounce(async () => {
        setloaddata(true);
        SetRefresh(false);
        try {
            const res = await fetch(v1GETDATA, {
                method: 'POST',
                headers: {
                    Authenticate: `Bearer ${token}`,
                    'x-token-access': `true`,
                },
                body: JSON.stringify({
                    PAGE_REQUEST: 'Total.Services.Addition.History',
                    ClientId: client_id,
                    FileID: FileID,
                    page: page,
                }),
            });
            const data = await res.json();
            setApplicaton(data.data);
            Settotalpage(data.total_pages);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setloaddata(false);
        }
    }, 300);

    useEffect(() => {
        debouncedTotalapplication();
    }, [page, Refresh]);




    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    // HANDAL ADDITION SERVICES ONLY

    const [activeTab, setActiveTab]: any = useState('Loan');
    const [editorData, setEditorData]: any = useState({
        Loan: '',
        Accomodation: '',
        Insurance: '',
        Ticket: ''
    });

    const handleTabChange = (key: any) => {
        setActiveTab(key);
    };

    const handleEditorChange = (value: any) => {
        setEditorData({
            ...editorData,
            [activeTab]: value.htmlValue
        });
    };

    const handleAddServices = async () => {

        if (editorData[activeTab] == null || editorData[activeTab].trim() == '') {
            message.warning('Addition services details section is required');
        } else {
            setloader(true);
            try {
                const res = await fetch(`${v1GETDATA}?action=Fileupdateadd&fileTransfer=true&isAgree=true`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authenticate: `Bearer ${token}`,
                        'x-crros-access': 'true',
                    },

                    body: JSON.stringify({
                        PAGE_REQUEST: 'ADD.ADDITIONS.FILE.ADD',
                        Tab: activeTab,
                        Details: editorData[activeTab],
                        client_id: client_id,
                    }),
                });

                const data = await res.json();

                if (data.status === true) {
                    SetRefresh(true);
                    onOpenChange();
                    message.success('Additional services Added');
                    setEditorData('');

                } else if (data.status === false) {
                    message.error(data.message);
                } else {
                    message.error('Error Query. Please Refresh Page And Try Again');
                }
            } catch (error) {
                message.error('Failed to submit data. Please try again later.');
            }
            setloader(false);
        }
        // Your logic to store data
    };

    const [ID, SetID]: any = useState('');
    const [Upadteservice, Setsevicesup]: any = useState('');
    const [Updateservicedetails, Setservicedetails]: any = useState('');
    const [Editmodal, SetEditmodal] = useState(false);
    const editmodal = (service_name: any, servicedetails: any, ID: any) => {
        SetID(ID);
        Setsevicesup(service_name);
        Setservicedetails(servicedetails);
        SetEditmodal(true);
    }

    //updateservicedetails
    const UpdateEditorChange = (value: any) => {
        Setservicedetails(value.htmlValue);
    };
    const Updateservices = async () => {
        if (Updateservicedetails == null) {
            message.warning('Additional services details section is required');
        }
        else {
            setloader(true);
            try {
                const res = await fetch(`${v1GETDATA}?action=Fileupdateadd&fileTransfer=true&isAgree=true`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authenticate: `Bearer ${token}`,
                        'x-crros-access': 'true',
                    },

                    body: JSON.stringify({
                        PAGE_REQUEST: 'UPDATE.ADDITIONS.FILE.SERVICES',
                        Tab: Upadteservice,
                        Details: Updateservicedetails,
                        client_id: client_id,
                        ID: ID,
                    }),
                });

                const data = await res.json();

                if (data.status === true) {
                    message.success('Additional Service Updated');
                    SetEditmodal(false)
                    SetRefresh(true);
                    setEditorData('');

                } else if (data.status === false) {
                    message.error(data.message);

                } else {
                    message.error(data.message);

                }
            } catch (error) {
                message.error('Failed to submit data. Please try again later.');
            }
            setloader(false);
        }

    }

    return (
        <div className="grid gap-3 addservice">
            <div className="flex justify-end set_services" >

                <div className="flex gap-3">
                    <Button onPress={onOpen} className="btn btn-primary" >Add Services</Button>
                    <Button className="btn btn-primary" onClick={() => SetRefresh(true)}>Refresh</Button>
                </div>
            </div>
            <Modal size={'2xl'} isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Additional Services</ModalHeader>
                            <ModalBody>
                                <div className="flex w-full flex-col">
                                    <Tabs aria-label="Options" selectedKey={activeTab} onSelectionChange={(key) => setActiveTab(key)}>
                                        {['Loan', 'Accommodation', 'Insurance', 'Ticket'].map((tab) => (
                                            <Tab key={tab} title={tab}>
                                                <Card>
                                                    <CardBody>
                                                        <div className="card">
                                                            <Editor
                                                                value={editorData[tab]}
                                                                onTextChange={handleEditorChange}
                                                                style={{ height: '320px' }}
                                                            />
                                                        </div>
                                                    </CardBody>
                                                </Card>
                                            </Tab>
                                        ))}
                                    </Tabs>
                                    <ModalFooter>
                                        <Button className="danger-btn" onPress={onClose}>
                                            Cancel
                                        </Button>

                                        <Button color="primary" onClick={handleAddServices} disabled={loader ? true : false}>
                                            {loader ? 'Wait..' : 'Submit'}
                                        </Button>


                                    </ModalFooter>
                                </div>
                            </ModalBody>

                        </>
                    )}
                </ModalContent>
            </Modal>

            <Table isStriped aria-label="Example static collection table " className="tableLong_data"
                bottomContent={
                    <div className="flex w-full justify-center ">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="primary"
                            page={page}
                            total={Totalpage}
                            onChange={(page) => setpage(page)}
                        />
                    </div>
                }
            >
                <TableHeader>
                    <TableColumn>#</TableColumn>
                    <TableColumn>Services Name</TableColumn>
                    <TableColumn style={{ width: '50%' }}>Services Details</TableColumn>
                    <TableColumn>Action</TableColumn>
                </TableHeader>
                <TableBody emptyContent={<div className='flex justify-center'><img src={Emptyimage} alt="" width={'20%'} /></div>}
                    loadingContent={<Spinner size="lg" />}
                    loadingState={loaddata ? 'loading' : 'idle'}
                >
                    {ApplicationTotal.map((Applicat: any, index: any) => (
                        <TableRow key={index}>
                            <TableCell data-column="#">{index + 1}</TableCell>
                            <TableCell data-column="Services Name">{Applicat.SERVICES_NAME}</TableCell>
                            <TableCell data-column="Services Details">
                                <div dangerouslySetInnerHTML={{ __html: Applicat.SERVICES_DETAILS }} />
                            </TableCell>
                            <TableCell data-column="Action" onClick={() => editmodal(Applicat.SERVICES_NAME, Applicat.SERVICES_DETAILS, Applicat.ID)}><EyeOutlined /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Modal size={'2xl'} isOpen={Editmodal ? true : false} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true}>
                <ModalContent>
                    <>
                        <ModalHeader className="flex flex-col gap-1">Update Services</ModalHeader>
                        <ModalBody>
                            <div className="grid gap-4">
                                <Select
                                    variant="bordered"
                                    label="Select Services"
                                    defaultSelectedKeys={[Upadteservice]}
                                    onChange={(event) => Setsevicesup(event.target.value)}
                                // isDisabled={globalVar.ROLE == 'agent' ? false : true}
                                >
                                    <SelectItem key="Loan">
                                        Loan
                                    </SelectItem>
                                    <SelectItem key="Accommodation">
                                        Accommodation
                                    </SelectItem>
                                    <SelectItem key="Insurance">
                                        Insurance
                                    </SelectItem>
                                    <SelectItem key="Ticket">
                                        Ticket
                                    </SelectItem>
                                </Select>

                                <div className="">
                                    <Editor
                                        // readOnly={globalVar.ROLE == 'agent' ? false : true}
                                        value={Updateservicedetails}
                                        onTextChange={UpdateEditorChange}
                                        style={{ height: '320px' }}
                                    />
                                </div>

                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button className="danger-btn" onClick={() => SetEditmodal(false)}>
                                Close
                            </Button>
                            <Button color="primary" onClick={() => Updateservices()} disabled={loader ? true : false}>
                                {loader ? 'Wait...' : 'Update'}
                            </Button>


                        </ModalFooter>
                    </>
                </ModalContent>
            </Modal>


        </div >
    );
}
