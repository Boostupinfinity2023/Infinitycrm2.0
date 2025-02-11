import React, { useState } from "react";
import { useParams, NavLink } from 'react-router-dom';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Select, SelectItem, Input } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { INSERTDATA } from '../../../APIurl/url';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import jwt from '../../../getLoggedUser/GetUserInfomation';
import { message } from 'antd';
export default function App({ Refresh }: any) {
    const token = jwt('jwt');
    const { client_id } = useParams();
    const { file_id } = useParams();

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [Buttonload, Setbtnload] = useState(false);

    const MySwal = withReactContent(Swal);

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
                   .task-select .text-foreground-500 {
                        color: #9ca3af;
                        font-weight: 400;
                    }
                `}
            </style>

            <Button onPress={onOpen} className="btn-primary">Create Task</Button>
            <Modal size={'xl'} isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Create Task</ModalHeader>
                            <ModalBody>
                                <form onSubmit={Handalsubmittask}>
                                    <div className="grid gap-4"


                                    >
                                        <Input
                                            variant="bordered"
                                            label="Task Title"
                                            placeholder="Enter your Task Title"
                                            className=""
                                            name="task_title"
                                            isRequired
                                        />
                                        <Textarea
                                            label="Description"
                                            variant="bordered"
                                            placeholder="Enter your description"
                                            disableAnimation
                                            disableAutosize
                                            classNames={{
                                                input: "resize-y min-h-[80px]",
                                            }}
                                            name="task_Description"
                                            isRequired
                                        />

                                        <Flatpickr
                                            name="Deadline"
                                            className="design_input"
                                            placeholder="Select Deadline"
                                        />
                                        <div className="task-select">
                                            <Select
                                                variant="bordered"
                                                label="Select Task Priority"
                                                name="task_priority"
                                                isRequired
                                            >
                                                <SelectItem key="Low"> Low</SelectItem>
                                                <SelectItem key="Medium"> Medium</SelectItem>
                                                <SelectItem key="High"> High</SelectItem>
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
