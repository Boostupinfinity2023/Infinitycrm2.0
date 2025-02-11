import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Input } from 'antd';
import { Select, message } from 'antd';
import { Editor } from "primereact/editor";
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import userInfo from '../../getLoggedUser/GetUserInfomation';
import { ClockAPI } from '../../APIurl/url';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
export default function App({ Refresh }: any) {
    const token = userInfo('jwt');
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [loader, setLoader] = useState(false);
    const [title, setTitle] = useState('');
    const [editorData, setEditorData] = useState('');
    const [deadline, setDeadline] = useState('');
    const [Selectuser, setselectuser] = useState('All');


    const MySwal = withReactContent(Swal);

    const handleEditorChange = (value: any) => {
        setEditorData(value.htmlValue);
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleDeadlineChange = (date: Date[]) => {
        setDeadline(date[0].toISOString());
    };





    const handleAnnouncement = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation checks
        if (!title || !editorData || !deadline) {
            alert('All fields are required');
            return;
        }

        setLoader(true);
        try {
            const response = await fetch(ClockAPI + '?action=view.client.record&limit=', {
                method: 'POST',
                headers: {
                    Authenticate: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    PAGE_REQUEST: 'INSERT.Announcement.DATA',
                    title,
                    content: editorData,
                    deadline,
                    Selectuser,
                }),
            });

            const data = await response.json();
            if (data.status) {
                setTitle('');
                setEditorData('');
                setDeadline('');
                Refresh(true);
                onOpenChange();
                message.success('Announcement Successfully Posted');
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
            <Button onPress={onOpen} className="btn-primary">New Announcement</Button>
            <Modal size={'2xl'} isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Publish Announcement</ModalHeader>
                            <ModalBody>
                                <form className="grid gap-3" onSubmit={handleAnnouncement}>
                                    <Input
                                        type="text"
                                        placeholder="Announcement Title"
                                        // className="design_input"
                                        value={title}
                                        onChange={handleTitleChange}
                                    />
                                    {/* <Input placeholder="Basic usage" onChange={handleTitleChange} value={title} /> */}

                                    <Select
                                        showSearch
                                        placeholder="Select"

                                        aria-label="Select"
                                        defaultValue={['All']}
                                        onChange={(value: any) => setselectuser(value)}
                                        options={[
                                            {
                                                value: 'All',
                                                label: 'All',
                                            },
                                            {
                                                value: 'Agent',
                                                label: 'Agent',
                                            },
                                            {
                                                value: 'Staff',
                                                label: 'Staff',
                                            },
                                        ]}
                                    />


                                    <Editor
                                        value={editorData}
                                        onTextChange={handleEditorChange}
                                        style={{ height: '200px' }}
                                    />

                                    <Flatpickr
                                        name="Deadline"
                                        className="design_input p-3"
                                        placeholder="valid till"
                                        value={deadline}
                                        onChange={handleDeadlineChange}
                                        options={{
                                            onClose: () => '',
                                        }}
                                    />

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
