import React from "react";
import { Col, Row } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { Button } from "@nextui-org/react";
import type { UploadProps } from 'antd';
import { message, Upload, Popover, Tag } from 'antd';
import { Empty } from 'antd';
import { NavLink } from 'react-router-dom';
import { GETDATA } from '../../../APIurl/url';
import { v1DOCUMENT } from '../../../APIurl/url';
import DocumentAdd from '../helper_modal/documentAdd';
import { useParams } from 'react-router-dom';
import jwt from '../../../getLoggedUser/GetUserInfomation';
import Blank from '../tab/blank';
import { useEffect, useState } from 'react';
import RestoreIcon from '@mui/icons-material/Restore';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import { debounce } from 'lodash';
import Emptyimage from '../../../../public/TableEmpty/Empty.jpg';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue, Spinner } from "@nextui-org/react";
import Tokens from '../../../getLoggedUser/GetUserInfomation';
const props: UploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};



const { Dragger } = Upload;
const Document = () => {

    const [page, setPage] = useState(1);
    const [Totalpage, Settotalpage] = useState(1);
    const [loaddata, setloaddata] = useState(true);
    const [Refresh, setRefresh] = useState(false);
    const Token = jwt('jwt');
    const { client_id } = useParams();
    const [DocumentData, setDocumentData] = useState([]);
    const JwtToken = Tokens('jwt');
    const documentlist = async () => {
        const get = await fetch(GETDATA + '?action=fetchdocument&dataget=true', {
            method: 'POST',
            headers: {
                Authenticate: `Bearer ${Token}`,
                'x-token-access': `true`,
            },
            body: JSON.stringify({
                PAGE_REQUEST: 'GET_DOCUMENT_LIST_DATA_REQUEST_WITH_STATUS',
                ClientId: client_id,
                page: page,
            }),
        });

        const res = await get.json();
        if (res.status === true && res.data.length > 0) {
            setRefresh(false);
            setDocumentData(res.data);
            Settotalpage(res.total);
            setloaddata(false);
        } else {
            setDocumentData([]);
            setloaddata(false);
        }
    };
    const debouncedDocumentList = debounce(documentlist, 300);  // Debounce with a 300ms delay
    useEffect(() => {
        debouncedDocumentList();
        return () => {
            debouncedDocumentList.cancel();
        };
    }, [Refresh, page]);

    const HandalReupload = async (ID: any, DOC_ID: any) => {

        Swal.fire({

            // icon: 'warning',
            input: 'textarea',
            inputPlaceholder: 'Enter your reason for Reupload...',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            reverseButtons: true,
            preConfirm: (comment) => {
                if (!comment) {
                    message.info('You need to provide a reason');
                }
                return comment;
            }
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                const comment = result.value; // Get the rejection comment from Swal

                const RejectFile = async () => {
                    try {
                        const responseData: any = await fetch(GETDATA + '?action=Update.client.record', {
                            method: 'POST',
                            headers: {
                                Authenticate: `Bearer ${Token}`,
                                'x-token-access': 'true',
                            },
                            body: JSON.stringify({
                                PAGE_REQUEST: 'DocumentReupload.Staff.side',
                                RequesterUser: 'Staff',
                                ID: ID,
                                DOC_ID: DOC_ID,
                                Comment: comment,
                            }),
                        });
                        const data = await responseData.json();

                        if (data.status == true) {
                            message.success('Reupload Request sent successfully');
                            setRefresh(true);
                        } else {
                            message.error('Error! Unable to Reupload Request Send');
                        }

                    } catch (err) {
                        console.error(err);
                        message.error('There was an error processing your request')
                    }
                };

                RejectFile();
            }
        });

    };


    // const HandalDelete = async (ID: any, DOC_ID: any) => {

    //     Swal.fire({

    //         // icon: 'warning',
    //         input: 'textarea',
    //         inputPlaceholder: 'Enter your reason for Unsend...',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes',
    //         preConfirm: (comment) => {
    //             if (!comment) {
    //                 Swal.showValidationMessage('You need to provide a reason');
    //             }
    //             return comment;
    //         }
    //     }).then((result) => {
    //         if (result.isConfirmed && result.value) {
    //             const comment = result.value; // Get the rejection comment from Swal

    //             const RejectFile = async () => {
    //                 try {
    //                     const responseData: any = await fetch(GETDATA + '?action=Update.client.record', {
    //                         method: 'POST',
    //                         headers: {
    //                             Authenticate: `Bearer ${Token}`,
    //                             'x-token-access': 'true',
    //                         },
    //                         body: JSON.stringify({
    //                             PAGE_REQUEST: 'DocumentDelete.Staff.side',
    //                             RequesterUser: 'Staff',
    //                             ID: ID,
    //                             DOC_ID: DOC_ID,
    //                             Comment: comment,
    //                         }),
    //                     });
    //                     const data = await responseData.json();

    //                     if (data.status == true) {
    //                         Swal.fire(

    //                             'success'
    //                         );
    //                         setRefresh(true);
    //                     } else {
    //                         Swal.fire(
    //                             'Something went wrong!',
    //                             'Error! Unable to Reupload Request Send.',
    //                             'error'
    //                         );
    //                     }

    //                 } catch (err) {
    //                     console.error(err);
    //                     Swal.fire(
    //                         'Error!',
    //                         'There was an error processing your request.',
    //                         'error'
    //                     );
    //                 }
    //             };

    //             RejectFile();
    //         }
    //     });

    // };

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

    const handalfileupload = async (options: any, ID: any, DOC_ID: any) => {
        console.log(`uploading`);
        // const { onSuccess, onError, file } = options;

        // const formData = new FormData();
        // formData.append('file', file);
        // formData.append('PAGE_REQUEST', 'STUDENT_PROFILE_FILE_UPLOADED');
        // formData.append('ClientId', client_id || '');
        // formData.append('ID', ID || '');
        // formData.append('DOC_ID', DOC_ID || '');
        // try {
        //     const res = await fetch(`${v1DOCUMENT}?action=Fileupdateadd&fileTransfer=true&isAgree=true`, {
        //         method: 'POST',
        //         headers: {
        //             // 'Content-Type': 'application/json',
        //             Authenticate: `Bearer ${JwtToken}`,
        //             'x-crros-access': 'true',
        //         },
        //         body: formData,
        //     });

        //     const data = await res.json();
        //     if (data.status == true) {
        //         onSuccess("Ok");
        //         setRefresh(true);
        //         message.success('Document updated successfully');
        //     } else {
        //         onError("Error");
        //         message.error(data.message);
        //     }
        // } catch (error) {
        //     onError(error);

        // }
    };

    return (
        <>
            <div className="flex gap-2 tabup mobbtnsstart">
                <Button className='btn-primary' onClick={() => setRefresh(true)}>Refresh</Button>
                <DocumentAdd RefreshDATA={setRefresh} />
            </div>
            <Row className="mt-3 set_width_document">
                <Table isStriped aria-label="Example static collection table"
                    className="tableLong_data marupdoctable"
                    bottomContent={
                        <div className="flex w-full justify-center">
                            <Pagination
                                isCompact
                                showControls
                                showShadow
                                color="primary"
                                page={page}
                                total={Math.ceil(Totalpage / 10)}
                                onChange={(page) => setPage(page)}
                            />
                        </div>
                    }
                >
                    <TableHeader>
                        <TableColumn key="ID">#</TableColumn>
                        <TableColumn key="Document_details">Document Details</TableColumn>
                        <TableColumn key="upload_status">Upload Status</TableColumn>
                        <TableColumn key="Action">Action</TableColumn>
                    </TableHeader>
                    <TableBody emptyContent={<div className='flex justify-center'><img src={Emptyimage} alt="" width={'20%'} /></div>}
                        loadingContent={<Spinner size="lg" />}
                        loadingState={loaddata ? 'loading' : 'idle'}
                    >

                        {DocumentData.map((value: any, index: any) => (
                            <TableRow key={index}>
                                <TableCell data-column="#">{index + 1}</TableCell>
                                <TableCell data-column="Document Deatils">
                                    <>
                                        <div className="flex gap-3 mobtabalign">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[30px] font-thin">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                                                />
                                            </svg>
                                            <p>
                                                <span className="document-name">{value.DOCUMENT_NAME}</span>
                                                <br />
                                                <span className="document-size font-Nunito">
                                                    {formatDateTime(value.REQUEST_UPDATE_AT)} | <b>Type: </b> <span className="font-Nunito">{value.DOCUMENT_TYPE}</span>
                                                </span>
                                            </p>
                                        </div>
                                    </>
                                </TableCell>
                                <TableCell data-column="Upload status">

                                    {/* <Dragger
                                        disabled={value.IS_UPLOAD_STATUS === 'TRUE'}
                                        accept={'.' + value.DOCUMENT_TYPE}
                                        beforeUpload={value}
                                        customRequest={(options) => handalfileupload(options, value.ID, value.DOC_ID)}
                                    > */}
                                    {(value.IS_UPLOAD_STATUS !== "FALSE") ? <Tag color="green">Uploaded</Tag> : <Tag color="blue">Pending</Tag>}

                                    {/* </Dragger> */}

                                </TableCell>
                                <TableCell data-column="Create Time">
                                    <div className='flex gap-3'>
                                        {value.DOC_URL == null ? '' :
                                            <>

                                                <Popover placement="top" content={'View Document'}>
                                                    <NavLink to={value.DOC_URL == null ? '#' : `https://harmanjeetsinghvirdi.com/CRM/API/${value.DOC_URL}`} target='_blank'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[20px] ">
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                                            />
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                        </svg>
                                                    </NavLink>
                                                </Popover>
                                                <Popover placement="top" content={'Reupload Document'}>
                                                    <RestoreIcon onClick={() => HandalReupload(value.MAIN_ID, value.DOCUMENT_SEARCH_ID)} />
                                                </Popover>

                                            </>
                                        }
                                        {/* <Popover placement="top" content={'Unsend'}>
                                            <DeleteIcon onClick={() => HandalDelete(value.MAIN_ID, value.DOCUMENT_SEARCH_ID)} />
                                        </Popover> */}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </Row>
        </>
    );
};
export default Document;
