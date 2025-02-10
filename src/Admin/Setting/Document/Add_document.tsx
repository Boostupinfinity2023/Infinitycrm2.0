import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Input } from 'antd';
import { Select, message } from 'antd';
import { Editor } from "primereact/editor";
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import userInfo from '../../../getLoggedUser/GetUserInfomation';
import { INSERTDATA } from '../../../APIurl/url';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
export default function App({ Refresh }: any) {
    const token = userInfo('jwt');
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [loader, setLoader] = useState(false);
    const [title, setTitle] = useState('');
    const [Documentname, setDocname] = useState('');
    const [Doctype, setdoctype] = useState('');
    const [Documentinfo, setdocinfo] = useState('');
    const [isMandatory, setIsMandatory] = useState(false);

    const handledocument = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoader(true);
        try {
            const response = await fetch(INSERTDATA + '?action=view.client.record&limit=', {
                method: 'POST',
                headers: {
                    Authenticate: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    PAGE_REQUEST: 'INSERT.DOCUMENT.REQUEST',
                    title: title,
                    Documentname: Documentname,
                    Doctype: Doctype,
                    Documentinfo: Documentinfo,
                    IsMandatory: isMandatory,
                }),
            });

            const data = await response.json();
            if (data.status) {
                setTitle('');
                setDocname('');
                setdoctype('');
                setdocinfo('');
                setIsMandatory(false);
                Refresh(true);
                onOpenChange();
                message.success('Document Added');
            } else {
                message.error('Something went wrong');
            }
        } catch (err) {
            console.error(err);
            message.error('Failed to publish announcement');
        } finally {
            setLoader(false);
        }
    };

    return (
        <>
            <Button onPress={onOpen} className="btn-primary">New Document</Button>
            <Modal size={'2xl'} isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Add Document</ModalHeader>
                            <ModalBody>
                                <form className="grid gap-3" onSubmit={handledocument}>
                                    <Input
                                        type="text"
                                        placeholder="Document Name"
                                        value={Documentname}
                                        onChange={(e) => setDocname(e.target.value)}
                                        name="Document_Name"
                                    />
                                    <Select

                                        showSearch
                                        placeholder="Select Format"
                                        aria-label="Select"
                                        onChange={(value: any) => setdoctype(value)}
                                        options={[
                                            {
                                                value: 'pdf',
                                                label: 'pdf',
                                            },
                                            {
                                                value: 'docx',
                                                label: 'docx',
                                            },
                                            {
                                                value: 'jpeg',
                                                label: 'jpeg',
                                            },
                                            {
                                                value: 'png',
                                                label: 'png',
                                            },
                                            {
                                                value: 'xlsx',
                                                label: 'xlsx',
                                            },
                                            {
                                                value: 'csv',
                                                label: 'csv',
                                            },
                                            {
                                                value: 'pptx',
                                                label: 'pptx',
                                            },
                                            {
                                                value: 'zip',
                                                label: 'zip',
                                            },
                                            {
                                                value: 'other',
                                                label: 'other',
                                            },
                                        ]}
                                    />


                                    <Input
                                        type="text"
                                        placeholder="Title"
                                        name="Title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                    <Input
                                        type="text"
                                        placeholder="Document Information"
                                        name="Doc_info"
                                        value={Documentinfo}
                                        onChange={(e) => setdocinfo(e.target.value)}
                                    />
                                    <div className="flex gap-2 ">
                                        <input type="checkbox" id="document-mandatory" name="document_requied" checked={isMandatory}
                                            onChange={(e) => setIsMandatory(e.target.checked)} />
                                        <label htmlFor="document-mandatory" className="mt-2 ">Document Mandatory</label>
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
