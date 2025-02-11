import { useState, useEffect } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import jwt from '../../../getLoggedUser/GetUserInfomation';
import { Col, Row, Select, message } from 'antd';
import { useParams, NavLink } from 'react-router-dom';
import { Input, Textarea, Checkbox, Pagination } from "@nextui-org/react";
import { INSERTDATA, AjaxApi } from '../../../APIurl/url';
import { GETDATA } from '../../../APIurl/url';
import { v1GETDATA } from '../../../APIurl/url';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Blank from '../../../staff/LeadApplication/tab/blank';
import { Editor } from "primereact/editor";
interface ResponsiveUser {
    RESPONSIVE_PERSON: number;
    CLIENT_NAME: string;
    BRANCH: number;
    COUNTRY_NAME: string;
}
export default function App({ Refresh }: any) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const MySwal = withReactContent(Swal);
    const [CommentText, setCommentText] = useState();
    const [selectedValues, setselectedValues] = useState<string[]>([]);
    const [Responsiveuser, setResponsive] = useState<ResponsiveUser[]>([]);
    const [loaddata, setloaddata] = useState(true);


    const handleEditorChange = (content: any) => {
        // Handle editor content change here

        setCommentText(content.htmlValue);
    };
    const userSelectChange = (value: any) => {
        if (value.includes('All_Memmber')) {
            const filteredValue: any = ['All_Memmber'];

            setselectedValues(filteredValue);
        } else {
            console.log(value);
            setselectedValues(value);
        }
    };
    const Responseveperson = async () => {
        setloaddata(true);
        const res = await fetch(v1GETDATA, {
            method: 'POST',
            headers: {
                Authenticate: `Bearer ${token}`,
                'x-token-access': `true`,
            },
            body: JSON.stringify({
                PAGE_REQUEST: 'Comment.responseve.person.',
                ClientId: client_id,
            }),
        });
        const data = await res.json();
        setResponsive(data.data);
        setloaddata(false);
    };



    useEffect(() => {
        Responseveperson();
    }, []);



    //handalcomment form control 
    const token = jwt('jwt');
    const { client_id } = useParams();
    const [loader, setloader] = useState(false);
    const [refresh, setrefresh] = useState(false);

    const OnHandleCommentForm = async (e: any) => {
        setloader(true);
        setrefresh(true)
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.append('PAGE_REQUEST', 'INSERT.COMMENT.STUDENT.AGENT');
        formData.append('CommentText', CommentText || '');
        formData.append('client_id', client_id || '');
        selectedValues.forEach((value) => {
            formData.append('tagUserMember[]', value);
        });
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
                setselectedValues([]);
                message.success('Comment Added');
                Refresh(true);
                onOpenChange();

            } else {
                message.error(response.message);
            }
        } catch (err) {
            message.error('Error your form and form components please refresh page and try again');
        }
        setloader(false);
        setrefresh(false)
    };


    const options = [
        { value: 'All_Memmber', label: 'All Member' },
        ...Responsiveuser.map(user => ({
            value: user.RESPONSIVE_PERSON,
            label: `${user.CLIENT_NAME} - (${user.COUNTRY_NAME})`
        }))
    ];
    return (
        <>
            <div className='flex justify-end'>
                <Button className="rounded-full btn btn-primary " onPress={onOpen}>Add Comment</Button>
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={'5xl'} isDismissable={false} isKeyboardDismissDisabled={true} >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Comment</ModalHeader>
                            <ModalBody>
                                <form onSubmit={OnHandleCommentForm} >
                                    <div className='grid gap-4 set_border'>
                                        <Select
                                            mode="multiple"
                                            placeholder="Tag user"
                                            value={selectedValues}
                                            options={options}
                                            onChange={(value) => {
                                                userSelectChange(value);
                                            }}

                                        />
                                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                            <Input variant={'bordered'} type="Text" label="Comment Title" placeholder="Enter your Comment title" name="CommentApplicationReletive" isRequired />
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
                                            <div className="submit-button-comment mt-10 flex justify-end gap-3">
                                                <Button className="danger-btn" onPress={onClose}>
                                                    Cancel
                                                </Button>
                                                <Button
                                                    className="rounded-full btn btn-primary"
                                                    type="submit"
                                                    disabled={loader}
                                                >
                                                    {loader ? 'Wait...' : 'Submit'}
                                                </Button>

                                            </div>
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
