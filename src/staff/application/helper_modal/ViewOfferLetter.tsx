import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, User } from '@nextui-org/react';
import { Tabs, Tab, Textarea } from '@nextui-org/react';
import jwt from '../../../getLoggedUser/GetUserInfomation';
import { GETDATA } from '../../../APIurl/url';
import { NavLink, useParams } from 'react-router-dom';
import { notification, message } from 'antd';
import { INSERTDATA } from '../../../APIurl/url';
import { Chip } from '@nextui-org/chip';
import { debounce } from 'lodash';
import Emptyimage from '../../../../public/TableEmpty/Empty.jpg';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

export default function App({ application_data, Refreshda }: any) {
    const globalVar = window.globalVariable;
    const [isCommentAdded, setCommentadd] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleOpen = (blur: any) => {
        onOpen();
    };
    const formRef = useRef<HTMLFormElement>(null);
    const [api, contextHolder] = notification.useNotification();
    const token = jwt('jwt');
    const { client_id } = useParams();
    const { file_id } = useParams();
    const [loader, setloader] = useState(false);
    const handleComment = async (e: any) => {
        e.preventDefault();
        setloader(true);
        const formData = new FormData(e.target);
        formData.append('PAGE_REQUEST', 'INSERT_OFFER_LETTER_COMMENT');
        formData.append('ClientId', client_id || '');
        formData.append('Deal_ID', file_id || '');
        formData.append('FileId', application_data.OFFER_ID || '');
        formData.append('CurrentStage', application_data.CURRENT_STATUS_STAGE || '');
        const res = await fetch(INSERTDATA + '?action=insert-comment-data', {
            method: 'POST',
            headers: {
                Authenticate: `Bearer ${token}`,
                'x-token-access': 'true',
            },
            body: formData,
        });

        const data = await res.json();
        if (data.status === true) {
            Refreshda(true);
            message.success('Comment added successfully');
            if (formRef.current) {
                formRef.current.reset();
                setCommentadd(false);
                // onClose();
            }


        } else {
            message.error(data.message);
        }
        setloader(false);
    };

    const [CommentDataRecord, setCommentData] = useState([]);
    const CommentData = async () => {
        const res = await fetch(GETDATA + '?action=get-comment-data', {
            method: 'POST',
            headers: {
                Authenticate: `Bearer ${token}`,
                'x-token-access': 'true',
            },
            body: JSON.stringify({
                PAGE_REQUEST: 'GET_COMMENT_DATA_OFFER_LETTER',
                FiledID: application_data.OFFER_ID,
            }),
        });
        const data = await res.json();
        if (data.data.length > 0) {
            setCommentData(data.data);
        } else {
            setCommentData([]);
        }
    };

    const debouncedCommentData = useCallback(debounce(() => {
        CommentData();
    }, 500), [application_data.OFFER_ID, token]);

    useEffect(() => {
        debouncedCommentData();
        return () => {
            debouncedCommentData.cancel(); // Cleanup to cancel any pending debounce calls if component unmounts
        };
    }, [debouncedCommentData, loader]);


    function formatDateTime(inputDateTime: any) {
        const date = new Date(inputDateTime);

        // Extracting parts of the date
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = String(date.getFullYear()).slice(-2); // Last two digits of the year

        // Extracting parts of the time
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12; // The hour '0' should be '12'

        // Formatting the date and time
        return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
    }


    return (
        <>
            {contextHolder}
            <div className="flex flex-wrap gap-3">
                <p onClick={() => handleOpen('blur')} className="capitalize" style={{ color: '#006ed9' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[20px]">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </p>
            </div>
            <Modal
                backdrop="blur"
                isOpen={isOpen}
                onClose={onClose}
                isDismissable={false}
                isKeyboardDismissDisabled={true}
                className="w-[150vh] max-w-full h-[90vh]"
                placement="center"
                hideCloseButton
                scrollBehavior='inside'
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex justify-between gap-1">View Offer Letter
                                <div>
                                    <Button className='btn-primary' onClick={() => setCommentadd(prev => !prev)}>
                                        Comment +
                                    </Button>
                                </div>
                            </ModalHeader>
                            <ModalBody>
                                <div className="flex w-full flex-col">
                                    <div className="w-full">
                                        <div className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="bg-card p-4 rounded-lg shadow border">
                                                    <h2 className="text-xl font-bold">Student Details</h2>
                                                    <div className="space-y-2 mt-4">
                                                        <div>
                                                            <div className="font-medium">Name :  <span>
                                                                {application_data.FIRST_NAME} {application_data.MIDDLE_NAME} {application_data.LAST_NAME}
                                                            </span></div>

                                                        </div>
                                                        <div>
                                                            <div className="font-medium">Email : <span>{application_data.EMAIL}</span></div>

                                                        </div>
                                                        <div>
                                                            <div className="font-medium">Phone : <span>{application_data.PHONE_NUMBER}</span></div>

                                                        </div>
                                                        <div>
                                                            <div className="font-medium">Gender : <span>{application_data.GENDER}</span></div>

                                                        </div>
                                                        <div>
                                                            <div className="font-medium">Address : <span>{application_data.ADDRESS ? application_data.ADDRESS : 'empty'}</span></div>
                                                        </div>
                                                        <div>
                                                            <div className="font-medium">Application Comment : <span>{application_data.COMMENT_APPLICATION ? application_data.COMMENT_APPLICATION : 'empty'}</span></div>
                                                        </div>
                                                        <div>
                                                            <div className="font-medium">Current Status : <Chip size="sm" color="primary">
                                                                {application_data.CURRENT_STATUS_STAGE ? application_data.CURRENT_STATUS_STAGE : 'empty'}
                                                            </Chip></div>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={`bg-card p-4 rounded-lg shadow border ${isCommentAdded ? 'hidden' : ''}`}>
                                                    <h2 className="text-xl font-bold">Offer Details</h2>
                                                    <div className="space-y-2 mt-4">
                                                        <div>
                                                            <div className="font-medium">University Name : <span>{application_data.UNIVERSITY_NAME}</span></div>

                                                        </div>
                                                        <div>
                                                            <div className="font-medium">Program : <span>{application_data.COURSE_NAME}</span></div>

                                                        </div>
                                                        <div>
                                                            <div className="font-medium">Intake :   <span>
                                                                {application_data.INTAKE}
                                                            </span></div>

                                                        </div>
                                                        <div>
                                                            <div className="font-medium">Program Length : <span>{application_data.PROGRAM_LENGTH}</span></div>

                                                        </div>
                                                        <div>
                                                            <div className="font-medium">Cost Of Living :  <span>{application_data.COST_OF_LIVING}</span></div>

                                                        </div>
                                                        <div>
                                                            <div className="font-medium">Gross Tuition Fees : <span>{application_data.GROSS_TUITION}</span></div>

                                                        </div>
                                                        <div>
                                                            <div className="font-medium">Application Fees : <span>{application_data.APPLICATION_FEE}</span></div>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={`bg-card p-4 rounded-lg shadow border ${isCommentAdded ? '' : 'hidden'}`}>
                                                    <form className="mt-6 space-y-4" onSubmit={handleComment} ref={formRef}>
                                                        <input type="hidden" value={client_id} name="ClientID" />

                                                        <div className="inline-block relative w-full ">
                                                            <label htmlFor="status">
                                                                Current Status <span className="text-danger">*</span>
                                                            </label>
                                                            <select name='FileStatus' id='status' className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-300 px-4 py-2 pr-8      ">
                                                                <option disabled >select current status</option>
                                                                <option value={1}>Pending</option>
                                                                <option value={2}>On-hold</option>
                                                                <option value={3}>In-progress</option>
                                                                <option value={4}>Received</option>
                                                                <option value={5}>Declined</option>
                                                            </select>
                                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 pt-7 text-gray-700">
                                                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label htmlFor="comments">
                                                                Comments <span className="text-danger">*</span>
                                                            </label>
                                                            <Textarea variant='bordered' id="comments" placeholder="Enter your comments" className="min-h-[120px] rounded-2xl" name="CommentText" />
                                                        </div>
                                                        <Button type="submit" className="w-full rounded-full btn-primary"  >
                                                            Comment
                                                        </Button>
                                                    </form>
                                                </div>
                                            </div>

                                        </div>


                                        <div className="space-y-6">
                                            <div className='flex justify-end gap-3'>

                                            </div>
                                            <div className="grid ">

                                                <div className="comment">
                                                    <Table aria-label="Example static collection table">
                                                        <TableHeader>
                                                            <TableColumn>#</TableColumn>
                                                            <TableColumn>Comment by</TableColumn>
                                                            <TableColumn>Current status</TableColumn>
                                                            <TableColumn>Comment</TableColumn>
                                                        </TableHeader>
                                                        <TableBody>

                                                            {CommentDataRecord.length > 0 ? (
                                                                CommentDataRecord.map((value: any, index: number) => (
                                                                    <TableRow key={index}>
                                                                        <TableCell>{index + 1}</TableCell>
                                                                        <TableCell>
                                                                            <User
                                                                                name={value.RESPONSIVE_PERSON_NAME}
                                                                                avatarProps={{
                                                                                    src: `${value.PROFILE_URL}`,
                                                                                    showFallback: true
                                                                                }}
                                                                            />
                                                                        </TableCell>
                                                                        <TableCell>{value.COMMENT_STATUS}</TableCell>
                                                                        <TableCell>{value.COMMENT_TEXT}</TableCell>
                                                                    </TableRow>
                                                                ))
                                                            ) : (
                                                                []
                                                            )}
                                                        </TableBody>
                                                    </Table>

                                                </div>



                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </ModalBody>
                            <ModalFooter className='border-t'>
                                <Button className="danger-btn" variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                {/* <Button color="primary" onPress={onClose}>
                                    Action
                                </Button> */}
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>



        </>
    );
}
