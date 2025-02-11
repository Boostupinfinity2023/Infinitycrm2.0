import { useState, useEffect } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import jwt from '../../getLoggedUser/GetUserInfomation';
import { Col, Row, Select, DatePicker } from 'antd';
import { useParams, NavLink } from 'react-router-dom';
import { Input, Textarea, Checkbox, Pagination } from "@nextui-org/react";
import { Accordion, AccordionItem, Avatar } from "@nextui-org/react";
import { INSERTDATA } from '../../APIurl/url';
import { GETDATA } from '../../APIurl/url';
import { v1GETDATA } from '../../APIurl/url';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Blank from '../../staff/LeadApplication/tab/blank';
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
        formData.append('PAGE_REQUEST', 'INSERT.COMMENT.Student.Agent');
        formData.append('CommentText', CommentText || '');
        formData.append('client_id', client_id || '');
        selectedValues.forEach((value) => {
            formData.append('tagUserMember[]', value);
        });
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
                setselectedValues([]);
                Refresh(true);
                onOpenChange();
                MySwal.fire({
                    title: 'Comment added',
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
            <div className='flex justify-end mb-3'>
                <Button className="rounded-full btn btn-primary " onPress={onOpen}>Add Comment</Button>
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={'5xl'} isDismissable={false} isKeyboardDismissDisabled={true}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Comment</ModalHeader>
                            <ModalBody>
                                <form onSubmit={OnHandleCommentForm} >
                                    <div className='grid gap-4 set_border' style={{
                                        border: '1px solid',
                                        padding: '25px',
                                        borderRadius: '12px',
                                        borderColor: '#808080ba'
                                    }}>
                                        <Select
                                            mode="multiple"
                                            placeholder="Tag user Commnet User"
                                            value={selectedValues}
                                            options={options}
                                            onChange={(value) => {
                                                userSelectChange(value);
                                            }}

                                        />
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
                                                    className="rounded-full btn btn-primary"
                                                    type="submit"
                                                    disabled={loader}
                                                >
                                                    {loader ? 'Wait...' : 'Submit Comment'}
                                                </Button>
                                                <Button className="rounded-full btn btn-primary ms-2" onPress={onClose}>
                                                    Close
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
