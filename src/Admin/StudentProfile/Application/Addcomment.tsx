import React, { useState } from "react";
import jwt from '../../../getLoggedUser/GetUserInfomation';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Col, Row, Select, DatePicker } from 'antd';
import { Input, Textarea, Checkbox } from "@nextui-org/react";
import { useParams, NavLink } from 'react-router-dom';
import { INSERTDATA } from '../../../APIurl/url';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Editor } from "primereact/editor";
export default function App({ FileID,Refresh }: any) {
    const token = jwt('jwt');
    const [CommentText, setCommentText] = useState();
    const { client_id } = useParams();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [loader, setloader] = useState(false);
    const [refresh, setrefresh] = useState(false);

    const MySwal = withReactContent(Swal);
    const [selectedValues, setselectedValues] = useState('');
    const handleEditorChange = (content: any) => {
        // Handle editor content change here

        setCommentText(content.htmlValue);
    };
    const userSelectChange = (value: any) => {

        if (value == 'All_Memmber') {


            setselectedValues(value);
        }
        // else {
        //     console.log(value);
        //     setselectedValues(value);
        // }
    };


    // SUbmit comment
    const OnHandleCommentForm = async (e: any) => {
        setloader(true);
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.append('PAGE_REQUEST', 'INSERT.COMMENT.USERPROFILE.INSERT');
        formData.append('CommentText', CommentText || '');
        formData.append('client_id', client_id || '');
        formData.append('Taguser', selectedValues || '');
        formData.append('FileID', FileID || '');

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
                e.target.reset();
                setselectedValues('');
                MySwal.fire({
                    title: response.message,
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    showCloseButton: true,
                    customClass: {
                        popup: `color-default`,
                    },
                }).then(() => {
                    e.target.reset();
                });
                setrefresh(true);
                Refresh(true);
                onOpenChange();
            } else {
                MySwal.fire({
                    title: response.message,
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    showCloseButton: true,
                    customClass: {
                        popup: `color-danger`,
                    },
                });
            }
        } catch (err) {
            MySwal.fire({
                title: 'Error your form and form components please refresh page and try again',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                showCloseButton: true,
                customClass: {
                    popup: `color-success`,
                },
            });
        }
        setloader(false);
    };

    const options = [
        { value: 'All_Memmber', label: 'All Member' }
    ];

    return (
        <>
            <Button color="primary" className="text-white" onPress={onOpen}>
                Add Comment
            </Button>
            <Modal size={'4xl'} isOpen={isOpen} onOpenChange={onOpenChange} >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Comment</ModalHeader>
                            <ModalBody>
                                <div>
                                    <form onSubmit={OnHandleCommentForm}>
                                        <div className='grid gap-4 set_border' style={{
                                            border: '1px solid',
                                            padding: '25px',
                                            borderRadius: '12px',
                                            borderColor: '#808080ba'
                                        }}>

                                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                                <Input type="Text" label="Comment Title" placeholder="Enter your Comment title" name="CommentApplicationReletive" isRequired />
                                            </div>

                                            <div>
                                                <Editor
                                                    onTextChange={handleEditorChange} // Assuming onTextChange is the correct prop for handling changes in the Editor
                                                    style={{ height: '320px' }} // You can adjust the style as needed
                                                    placeholder="Enter your description" // Add other props as needed
                                                    name="CommentText"
                                                />
                                            </div>

                                            <div>
                                                {/* <div className="mt-2">
                                                    <Checkbox className="font-meduim font-Nunito" name="public_Comment">
                                                        Public Comment
                                                    </Checkbox>
                                                </div> */}
                                                <div className="submit-button-comment mt-10 flex justify-end">
                                                    <Button
                                                        color="primary"
                                                        className="rounded-full"
                                                        type="submit"
                                                        disabled={loader}
                                                    >
                                                        {loader ? 'Wait...' : 'Submit Comment'}
                                                    </Button>
                                                    <Button color="primary" className="rounded-full ms-2" onPress={onClose}>
                                                        Close
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </ModalBody>

                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
