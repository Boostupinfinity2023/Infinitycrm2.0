import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Input } from 'antd';
import { Select, message } from 'antd';
import { Editor } from "primereact/editor";
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import userInfo from '../../getLoggedUser/GetUserInfomation';
import { Promotional } from '../../APIurl/url';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;
export default function App({ setLoading }: any) {
    const token = userInfo('jwt');
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [loader, setLoader] = useState(false);
    const [title, setTitle] = useState('');
    const [editorData, setEditorData] = useState('');
    const [startdate, setstartdate]: any = useState('');
    const [enddate, setenddate]: any = useState('');
    const [Selectuser, setselectuser] = useState('All');


    const MySwal = withReactContent(Swal);

    const handleEditorChange = (value: any) => {
        setEditorData(value.htmlValue);
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handlestartdate = (date: Date[]) => {
        setstartdate(date[0].toISOString());
    };

    const handleenddate = (date: Date[]) => {
        setenddate(date[0].toISOString());
    };





    const handleAnnouncement = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation checks
        if (!title || !editorData || !startdate || !enddate) {
            alert('All fields are required');
            return;
        }
        setLoader(true);
        try {
            const response = await fetch(Promotional + '?action=view.client.record&limit=', {
                method: 'POST',
                headers: {
                    Authenticate: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    PAGE_REQUEST: 'INSERTPromotional',
                    title,
                    content: editorData,
                    startdate,
                    enddate,
                    Selectuser,
                }),
            });

            const data = await response.json();
            if (data.status) {
                setTitle('');
                setEditorData('');
                setstartdate('');
                setenddate('');
                setLoading(true);
                onOpenChange();
                message.success(data.message);
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
            <Button onPress={onOpen} className="btn-primary">Add Promotional Activities
            </Button>
            <Modal size={'2xl'} isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Publish Promotional Activity</ModalHeader>
                            <ModalBody>
                                <form className="grid gap-3" onSubmit={handleAnnouncement}>
                                    <div className="titledev grid gap-1">
                                        <span className="text-[#666] font-semibold">Title</span>
                                        <Input type="text" placeholder="Title" value={title} onChange={handleTitleChange} size="large" />
                                    </div>
                                    <div className="selcetuser-dev grid gap-1">
                                        <span className="text-[#666] font-semibold">Select User <small>(e.g. Agent/staff)</small></span>
                                        <Select
                                            showSearch
                                            placeholder="Select"
                                            size="large"
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
                                    </div>
                                    <div className="editor_dev grid gap-1">
                                        <span className="text-[#666] font-semibold">Description</span>
                                        <Editor
                                            value={editorData}
                                            onTextChange={handleEditorChange}
                                            style={{ height: '200px' }}
                                        />
                                    </div>
                                    <div className="editor_dev grid gap-1">
                                        <span className="text-[#666] font-semibold">Start / End Date</span>
                                        <RangePicker
                                            size="large"
                                            value={[startdate, enddate]}
                                            onChange={([start, end]: any) => {
                                                setstartdate(start);
                                                setenddate(end);
                                            }}
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
