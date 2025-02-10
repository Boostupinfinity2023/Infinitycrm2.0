import React, { useState } from "react";
import jwt from '../../../../getLoggedUser/GetUserInfomation';
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure } from "@nextui-org/react";
import { message } from 'antd';
import { Input } from "@nextui-org/react";
import { AjaxApi } from '../../../../APIurl/url';
import { Editor } from "primereact/editor";
export default function App({ FileID, client_id, RESPONSIVE_PERSON, Refresh }: any) {
    const token = jwt('jwt');
    const [CommentText, setCommentText] = useState();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [loader, setloader] = useState(false);
    const [refresh, setrefresh] = useState(false);
    const [selectedValues, setselectedValues] = useState('');
    const handleEditorChange = (content: any) => {
        setCommentText(content.htmlValue);
    };



    // SUbmit comment
    const OnHandleCommentForm = async (e: any) => {
        setloader(true);
        e.preventDefault();
        const formData = new FormData(e.target);

        formData.append('PAGE_REQUEST', 'INSERT.COMMENT.STUDENT.AGENT');
        formData.append('CommentText', CommentText || '');
        formData.append('client_id', client_id || '');
        formData.append('tagUserMember[]', RESPONSIVE_PERSON);



        try {
            const res = await fetch(AjaxApi + '?action=INSERT.COMMENT.STUDENT.AGENT', {
                method: 'POST',
                headers: {
                    Authenticate: `${token}`,
                    'x-token-access': `true`,
                },
                body: formData,
            });

            const response = await res.json();
            if (response.status == true) {
                e.target.reset();
                setselectedValues('');
                message.success(response.message);
                setrefresh(true);
                Refresh(true);
                onOpenChange();
            } else {
                message.error(response.message);
            }
        } catch (err) {
            message.error('Error your form and form components please refresh page and try again');
        }
        setloader(false);
    };

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
                                        <div className='grid gap-4 set_border'>

                                            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                                <Input variant={'bordered'} type="Text" placeholder="Enter your Comment title" name="CommentApplicationReletive" isRequired />
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
                                                <div className="submit-button-comment flex justify-end gap-3">
                                                    <Button className="danger-btn" onPress={onClose}>
                                                        Cancel
                                                    </Button>

                                                    <Button
                                                        color="primary"

                                                        type="submit"
                                                        disabled={loader}
                                                    >
                                                        {loader ? 'Wait...' : 'Submit'}
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
