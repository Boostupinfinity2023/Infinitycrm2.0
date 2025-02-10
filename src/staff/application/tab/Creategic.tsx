import React, { useState, useEffect } from "react";
import { useParams, NavLink } from 'react-router-dom';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Select, SelectItem, Input } from "@nextui-org/react";
import { INSERTDATA } from '../../../APIurl/url';
import { v1GETDATA } from '../../../APIurl/url';
import 'flatpickr/dist/flatpickr.css';
import debounce from 'lodash.debounce';
import jwt from '../../../getLoggedUser/GetUserInfomation';
import { message } from 'antd';
export default function App({ Refresh }: any) {
    const token = jwt('jwt');
    const { client_id } = useParams();
    const { file_id } = useParams();

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [Buttonload, Setbtnload] = useState(false);





    const Handalsubmittask = async (event: any) => {
        event.preventDefault();
        Setbtnload(true);
        const formData = new FormData(event.target);
        formData.append('PAGE_REQUEST', 'CREATE.TASKS.DEAL.LEAD.STAFF');
        formData.append('client_id', client_id || '');
        formData.append('Deal_id', file_id || '');
        try {
            const res = await fetch(INSERTDATA + '?action=insertComment', {
                method: 'POST',
                headers: {
                    Authenticate: `Bearer ${token}`,
                    'x-token-access': `true`,
                },
                body: formData,
            });

            const response = await res.json();
            if (response.status == true) {
                Refresh(true);
                onOpenChange();
                message.success(response.message);
                event.target.reset();
            } else {
                message.error(response.message);
            }
        } catch (err) {
            message.info('Error your form and form components please refresh page and try again');
        }
        Setbtnload(false);

    }

    return (
        <>
            <style>
                {`
                   .marital_status_select .text-foreground-500 {
                        color: #9ca3af;
                        font-weight: 400;
                    }
                   
                    .offer_letter_select .text-foreground-500 {
                        color: #9ca3af;
                        font-weight: 400;
                    }
                `}
            </style>

            <Button onPress={onOpen} className="btn-primary"> GIC +</Button>
            <Modal size={'xl'} isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Create GIC</ModalHeader>
                            <ModalBody>
                                <form onSubmit={Handalsubmittask}>
                                    <div className="grid gap-4"


                                    >
                                        <Input
                                            variant="bordered"
                                            label="Passport "
                                            placeholder="Enter Student Passport Number"
                                            className=""
                                            name="Passport_number"
                                            isRequired
                                        />
                                        <Input
                                            variant="bordered"
                                            label="Mobile"
                                            placeholder="Enter Student Mobile Number"
                                            className=""
                                            name="Mobile_number"
                                            isRequired
                                        />
                                        <Input
                                            variant="bordered"
                                            label="Email"
                                            placeholder="Enter Student Email Id"
                                            className=""
                                            name="Mobile_number"
                                            isRequired
                                        />
                                        <div className="marital_status_select">
                                            <Select
                                                variant="bordered"
                                                label="Select student marital status"
                                                name="Marital_status"
                                                isRequired
                                            >
                                                <SelectItem key="Single"> Single</SelectItem>
                                                <SelectItem key="Married"> Married</SelectItem>
                                            </Select>
                                        </div>
                                        <div className="offer_letter_select">
                                            <Select
                                                variant="bordered"
                                                label="Select student offer letter"
                                                name="Marital_status"
                                                isRequired
                                            >
                                                <SelectItem key="Single"> Single</SelectItem>
                                                <SelectItem key="Married"> Married</SelectItem>
                                            </Select>
                                        </div>
                                        <div>
                                            <ModalFooter>

                                                <Button className="danger-btn" onPress={onClose}>
                                                    Close
                                                </Button>
                                                <Button type="submit" color="primary" disabled={Buttonload ? true : false}>
                                                    {Buttonload ? 'Wait...' : 'Submit'}
                                                </Button>
                                            </ModalFooter>
                                        </div>
                                    </div>
                                </form>
                            </ModalBody>

                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
