import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import TextFormatIcon from '@mui/icons-material/TextFormat';
import Swal from 'sweetalert2';
import { INSERTDATA } from "../../APIurl/url";
import Token from '../../getLoggedUser/GetUserInfomation';
import { message } from 'antd';
interface Country {
    COUNTRY_NAME: string;
}

export default function App() {
    const token = Token('jwt');
    const [isOpen, setIsOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    // Department form save state
    const handleFormData = (event: any) => {
        setIsLoading(true);
        event.preventDefault();
        const formData = new FormData(event.target);
        formData.append('PAGE_REQUEST', 'INSERTCOUNTRY.ADMIN');

        fetch(INSERTDATA, {
            method: "POST",
            headers: {
                Authenticate: `Bearer ${token}`,
            },
            body: formData
        })
            .then((res) => res.json())
            .then((data) => {
                setIsLoading(false);
                if (data.status) {
                    message.success('Successfully added');
                    const form = document.getElementById("FormId") as HTMLFormElement;
                    if (form) {
                        form.reset();
                    }
                    handleOpenChange();
                } else {
                    message.error('something went wrong');

                }
            })
            .catch((err) => {
                setIsLoading(false);
                Swal.fire({
                    icon: 'error',
                    title: err.message,
                    padding: '2em',
                    customClass: 'sweet-alerts',
                });
            });
    };

    const handleOpenChange = () => {
        setIsOpen(!isOpen);
    };

    const [show, setShow] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(true);
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    // Form elements
    const Form = () => {
        return (
            <>
                <style>
                    {`
                   .country .text-foreground-500 {
                        color: #9ca3af;
                        font-weight: 400;
                    }
                `}
                </style>
                <form onSubmit={handleFormData} id="FormId" className="Department_Form">
                    <div className="departmentform px-4 grid gap-4">
                        <div className="country">
                            <Input variant="bordered" type="Text" label="Country Name" name="Country_Name" endContent={<TextFormatIcon />} isRequired />
                        </div>
                        <div className="flex gap-4 justify-end px-4 py-3">
                            <Button className="danger-btn" onClick={handleOpenChange}>Cancel</Button>
                            <Button type="submit" className="btn btn-primary" variant="solid" isLoading={isLoading}>
                                {isLoading ? 'Processing...' : 'Submit'}
                            </Button>

                        </div>
                    </div>
                </form>
            </>
        );
    };

    return (
        <div className="demos">
            <Modal
                isOpen={isOpen}
                onOpenChange={handleOpenChange}
                placement="top-center"
                className="modalclose"
                isDismissable={false}
                isKeyboardDismissDisabled={true}
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">New Country</ModalHeader>
                    <Form />
                </ModalContent>
            </Modal>
        </div>
    );
}
