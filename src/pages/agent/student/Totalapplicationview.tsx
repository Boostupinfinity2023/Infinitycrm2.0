import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

import Commenthistory from "./Application/Commenthistory";
import Applicationthistory from "./Application/Applicationhistory";
import Applicationttask from "./Application/Applicationtask";
import Addcommite from "./Application/Addcomment";
import Offerletter from './Application/Offerletter';
import './TotalApplication.css'

const ViewApplication = ({ isOpen, onClose, application, client_id, RESPONSIVE_PERSON }: any) => {

    const [pagerefresh, setpageRefresh] = useState(false);

    return (
        <Modal isOpen={true} onClose={onClose} size="full" className="!h-screen" scrollBehavior='inside'>
            <ModalContent className='h-screen max-h-screen flex flex-col'>
                <ModalHeader className="flex flex-col gap-1 border-b shadow-md">Application Details</ModalHeader>
                <ModalBody>
                    <div className="grid gap-4">

                        <Tabs size={'lg'} aria-label="Tabs sizes" className='modal_tabs'>
                            <Tab key="Comment" title="Comment" >
                                <div className='grid gap-3'>
                                    <div className='flex justify-end set_spacing'>
                                        <Addcommite FileID={application} client_id={client_id} RESPONSIVE_PERSON={RESPONSIVE_PERSON} Refresh={setpageRefresh} />
                                    </div>
                                    <Commenthistory FileID={application} client_id={client_id} Refresh={pagerefresh} />
                                </div>

                            </Tab>
                            <Tab key="Application" title="Application History">
                                <Applicationthistory FileID={application} client_id={client_id} />
                            </Tab>

                            <Tab key="Offer Letter" title="Offer Letter" >
                                <Offerletter FileID={application} client_id={client_id} />
                            </Tab>
                        </Tabs>

                    </div>

                    {/* Render application details here */}
                    {/* <div>
                        <p><strong>Application ID:</strong> {application?.ID}</p>
                        <p><strong>Transfer Date:</strong> {application?.SENDING_DATE_TIME}</p>
                        <p><strong>Client Name:</strong> {application?.CLIENT_NAME}</p>
                        <p><strong>Country Name:</strong> {application?.COUNTRY_NAME}</p>
                        <p><strong>Status:</strong> {application?.CURRENT_STATUTS}</p>
                    </div> */}
                </ModalBody>

            </ModalContent>
        </Modal>
    );
};

export default ViewApplication;
