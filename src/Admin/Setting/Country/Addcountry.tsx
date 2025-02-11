import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Input } from 'antd';
import { Select, message } from 'antd';
import 'flatpickr/dist/flatpickr.css';
import userInfo from '../../../getLoggedUser/GetUserInfomation';
import { INSERTDATA } from '../../../APIurl/url';
export default function App({ Refresh }: any) {
    const token = userInfo('jwt');
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [loader, setLoader] = useState(false);
    const [Countryname, setCountryname] = useState('');
    const [CountryFlag, setCountryFlag]: any = useState(null);

    const handleChange = (e: any) => {
        setCountryname(e.target.value);
    };

    const handleFlagUpload = (e: any) => {
        setCountryFlag(e.target.files[0]); // Capture the uploaded file
    };



    const handleFormData = (event: any) => {
        setLoader(true);
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
                setLoader(false);
                if (data.status) {
                    message.success('Successfully added');
                    const form = document.getElementById("FormId") as HTMLFormElement;
                    Refresh(true);
                    if (form) {
                        form.reset();
                    }
                    onOpenChange();
                } else {
                    message.error(data.message);

                }
            })
            .catch((err) => {
                setLoader(false);
                message.error('something went wrong');
            });
    };


    return (
        <>
            <Button onPress={onOpen} className="btn-primary">New Country</Button>
            <Modal size={'2xl'} isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Add Country</ModalHeader>
                            <ModalBody>
                                <form className="grid gap-3" onSubmit={handleFormData}>
                                    <div className="flex flex-col gap-3">
                                        <Input
                                            type="text"
                                            placeholder="Country name"
                                            value={Countryname}
                                            name="Country_Name"
                                            onChange={handleChange} // Ensure you have a change handler for managing state
                                        />
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            placeholder="Upload Flag"
                                            name="Country_Flag"
                                        />
                                    </div>
                                    <ModalFooter>
                                        <Button className="danger-btn" onPress={onClose}>
                                            Cancel
                                        </Button>
                                        <Button color="primary" type="submit" disabled={loader}>
                                            {loader ? 'Wait..' : 'Submit'}
                                        </Button>
                                    </ModalFooter>
                                </form>

                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
