
import { useEffect, useState, useRef, useMemo } from 'react';
import jwt from '../../../getLoggedUser/GetUserInfomation';
import { INSERTDATA, AjaxApi } from '../../../APIurl/url';
import { GETDATA } from '../../../APIurl/url';
import { useParams, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Blank from '../tab/blank';
import { Button, Pagination, Input } from '@nextui-org/react';
import { Dropdown, message, Space, Tooltip, MenuProps, DatePicker, Checkbox, Select, Col, Row, Empty, Tag, Avatar } from 'antd';
import { DownOutlined, UserOutlined, AudioOutlined } from '@ant-design/icons';
import type { SearchProps } from 'antd/es/input/Search';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { Editor } from "primereact/editor";
import Emptyimage from '../../../../public/TableEmpty/Empty.jpg';
/**
 * App component that renders a comment form with a select input, text input, and text area.
 *
 * @param {object} props - Component props
 * @param {string} props.className - CSS class name for the component
 */
const App = ({ className }: any) => {


    const [CommentText, setCommentText] = useState();

    const handleEditorChange = (content: any) => {
        // Handle editor content change here

        setCommentText(content.htmlValue);
    };

    const MySwal = withReactContent(Swal);
    /**
     * State to store the selected values in the select input.
     */
    const [selectedValues, setselectedValues] = useState<string[]>([]);

    /**
     * Handles changes to the select input.
     *
     * @param {any} value - Selected value(s) in the select input
     */
    const userSelectChange = (value: any) => {
        if (value.includes('All_Memmber')) {
            const filteredValue: any = ['All_Memmber'];
            setselectedValues(filteredValue);
        } else {
            console.log(value);
            setselectedValues(value);
        }
    };

    /**
     * Handles the comment form submission.
     *
     * @param {Event} e - Form submission event
     */
    interface CommentData {
        ID: number;
        COMMENT_ID: number;
        COMMENT_RELETED: string;
        COMMENT_TEXT: string;
        IS_PUBLIC: boolean;
        COMMENT_DATE: string;
        COMMENT_LAST_UPDATE: string;
        RESPONSIVE_PERSON_NAME: string;
        RESPONSIVE_PERSON_PROFILE_URL: string;
        RESPONSIVE_PERSON_ID: number;
        RESPONSIVE_PERSON_EMAIL: string;
    }
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const token = jwt('jwt');
    const { client_id } = useParams();
    const { file_id } = useParams();
    const [loader, setloader] = useState(false);
    const [refresh, setrefresh] = useState(false);
    const OnHandleCommentForm = async (e: any) => {
        setloader(true);

        e.preventDefault();
        const formData = new FormData(e.target);
        formData.append('PAGE_REQUEST', 'INSERT.COMMENT.STUDENT.STAFF');
        formData.append('client_id', client_id || '');
        formData.append('CommentText', CommentText || '');
        formData.append('Deal_id', file_id || '');
        selectedValues.forEach((value) => {
            formData.append('tagUserMember[]', value);
        });
        try {
            const res = await fetch(AjaxApi + '?action=INSERT.COMMENT.STUDENT.STAFF', {
                method: 'POST',
                headers: {
                    Authenticate: `${token}`,
                    'x-token-access': `true`,
                },
                body: formData,
            });

            const response = await res.json();
            if (response.status == true) {
                message.success(response.message);
                e.target.reset();
                setrefresh(true);
                onOpenChange();
            } else {
                message.error(response.message);
            }
        } catch (err) {
            message.info('Error your form and form components please refresh page and try again');
        }
        setloader(false);
    };
    // console.log(loader)
    const { RangePicker } = DatePicker;
    const [loaddata, setloaddata] = useState(true);

    const [limit, setlimit] = useState(10);
    const [page, setpage] = useState(1);
    const [Totalpage, settotalpage] = useState(1);
    const [daterange, setdaterange] = useState('');
    const [userby, setuserBy] = useState('');
    const [totalData, settotalData] = useState(0);
    const [CommentData, setCommentdata] = useState<CommentData[]>([]);

    const Commentfetch = async () => {
        setloaddata(true);
        setrefresh(false);
        const res = await fetch(GETDATA + `?limit=${limit}&page=${page}&daterange=${daterange}&userby=${userby}`, {
            method: 'POST',
            headers: {
                Authenticate: `Bearer ${token}`,
                'x-token-access': `true`,
            },
            body: JSON.stringify({
                PAGE_REQUEST: 'CLIENT_FILE_COMMENT_DATA_LIST',
                ClientId: client_id,
            }),
        });
        const data = await res.json();
        settotalData(data.total_count);
        settotalpage(data.total_pages);
        setCommentdata(data.data);
        setloaddata(false);
    };
    useEffect(() => {
        Commentfetch();
    }, [page, refresh]);

    function date_formatchange(date: any) {
        const dateFormat = new Date(date);

        const dateGet = dateFormat.getDate();
        const MonthGet = dateFormat.toLocaleString('default', { month: 'short' });
        const YearGet = dateFormat.getFullYear();
        return `${MonthGet} ${dateGet}, ${YearGet}`;
    }

    const scrollRef = useRef<HTMLDivElement>(null);

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        message.info('Click on left button.');
        console.log('click left button', e);
    };

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        message.info('Click on menu item.');
        console.log('click', e);
    };
    const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);


    const suffix = (
        <AudioOutlined
            style={{
                fontSize: 16,
                color: '#1677ff',
            }}
        />
    );
    const items: MenuProps['items'] = [
        {
            label: '1st User',
            key: '1',
            icon: <UserOutlined />,
        },
        {
            label: '2nd User',
            key: '2',
            icon: <UserOutlined />,
        },
        {
            label: '3rd User',
            key: '3',
            icon: <UserOutlined />,
            danger: true,
        },
        {
            label: '4rd User',
            key: '4',
            icon: <UserOutlined />,
            danger: true,
            disabled: true,
        },
    ];
    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

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
            <div className='flex justify-end gap-3 mb-4 tabup'>
                <Button className="btn-primary" onClick={() => setrefresh(true)}>
                    Refresh
                </Button>
                <Button className="btn-primary " onPress={onOpen}>Add Comment</Button>
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={'5xl'} isDismissable={false} isKeyboardDismissDisabled={true}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Comment</ModalHeader>
                            <ModalBody>
                                <form onSubmit={OnHandleCommentForm}>
                                    <Input variant='bordered' placeholder="Provide Application Related Comment " name="CommentApplicationReletive" isRequired />
                                    <div className='mt-2'>
                                        <Editor
                                            onTextChange={handleEditorChange} // Assuming onTextChange is the correct prop for handling changes in the Editor
                                            style={{ height: '320px' }} // You can adjust the style as needed
                                            placeholder="Enter Your Comment..." // Add other props as needed
                                            name="CommentText"
                                        />
                                    </div>
                                    <div className="submit-button-comment mt-10 justify-end gap-2">
                                        <Button className="danger-btn" onPress={onClose}>
                                            Cancel
                                        </Button>
                                        <Button className="btn btn-primary" isLoading={loader} type='submit'> {loader ? 'Wait...' : 'Submit'}</Button>

                                    </div>
                                </form>

                            </ModalBody>

                        </>
                    )}
                </ModalContent>
            </Modal>


            <div>

                <Table aria-label="Example static collection table" className="tableLong_data marupdoctable">
                    <TableHeader>
                        <TableColumn>#</TableColumn>
                        <TableColumn>Comment</TableColumn>
                        <TableColumn>Comment By</TableColumn>
                        <TableColumn>Date</TableColumn>
                    </TableHeader>
                    <TableBody emptyContent={<div className='flex justify-center'><img src={Emptyimage} alt="" width={'20%'} /></div>}>
                        {CommentData.length > 0 ? (
                            CommentData.map((value: any, index: number) => (
                                <TableRow key={index + 1}>
                                    <TableCell data-column="#">{index + 1}</TableCell>
                                    <TableCell data-column="Comment">
                                        <b>Subject :</b> {value.COMMENT_RELETED}
                                        <br />
                                        <br />
                                        <div
                                            dangerouslySetInnerHTML={{ __html: value.COMMENT_TEXT }}
                                        />
                                    </TableCell>
                                    <TableCell data-column="Comment By">
                                        <User
                                            name={value.RESPONSIVE_PERSON_NAME}
                                            description={value.RESPONSIVE_PERSON_EMAIL}
                                            avatarProps={{
                                                src: `${value.RESPONSIVE_PERSON_PROFILE_URL}`,
                                                showFallback: true,
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell data-column="Date">{formatDateTime(value.COMMENT_DATE)}</TableCell>
                                </TableRow>
                            ))
                        ) : []}

                    </TableBody>
                </Table>
                {CommentData.length > 0 ?
                    <div className='flex justify-center mt-4'>
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="primary"
                            page={page}
                            total={Totalpage}
                            onChange={(page) => setpage(page)}
                        />
                    </div>
                    : ''}
            </div>

        </>
        // <Row className='set_width_document'>
        //     <Col span={9}>
        //         <div className="set_border">
        //             <form onSubmit={OnHandleCommentForm}>

        //                 <Input placeholder="Provide Application Related Comment " className="mt-5 design_input" name="CommentApplicationReletive" />

        //                 <TextArea rows={6} className="mt-5 design_input font-Nunito" placeholder="Enter Your Comment..." name="CommentText" />

        //                 <div className="submit-button-comment mt-10 justify-end">
        //                     <Button className="btn btn-primary" isLoading={loader} type='submit'>Submit Comment</Button>
        //                 </div>
        //             </form>
        //         </div>
        //     </Col>
        //     {/* <Col span={2}></Col> */}
        //     <Col offset={1} span={14} ref={scrollRef} >
        //         <Row className='sticky_tab_header'>
        //             <Col span={8}>
        //                 {/* <div className="filter-class">
        //                     <ul className="flex">
        //                         <li>
        //                             <RangePicker className="design_input" />
        //                         </li>
        //                     </ul>
        //                 </div> */}
        //             </Col>

        //             <Col span={12}>
        //                 {/* <Space direction="vertical">
        //             <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
        //         </Space> */}
        //             </Col>
        //             <Col span={4}>

        //                 <Button className="btn btn-primary" onClick={() => setrefresh(true)}>
        //                     Refresh
        //                 </Button>

        //             </Col>
        //         </Row>

        //         <table id="filehistory" className="table table-borderless">
        //             <tbody className="scroller-class-table">
        //                 {loaddata ? (
        //                     <Blank />
        //                 ) : (
        //                     <>
        //                         {CommentData.map((value: any, index: number) => (
        //                             <tr key={index}>
        //                                 <td width="10%" valign="top">
        //                                     {/* <img src={value.RESPONSIVE_PERSON_PROFILE_URL} /> */}
        //                                 </td>
        //                                 <td width="75%">
        //                                     <p>
        //                                         <span className="Comment_heading ">Comment By : {value.RESPONSIVE_PERSON_NAME}</span>
        //                                         <br />

        //                                         <span className="small_text mt-0 pt-0">{date_formatchange(value.COMMENT_DATE)}</span>
        //                                         <br />
        //                                         <br />
        //                                         <span className="table_font_app">{value.COMMENT_TEXT}</span>
        //                                     </p>

        //                                 </td>
        //                             </tr>
        //                         ))}
        //                     </>
        //                 )}
        //             </tbody>
        //         </table>


        //     </Col>
        //     <div className="fix-bottom grid grid-cols-4 gap-4">

        //         <div className='mt-4 col-span-3'>
        //             <Pagination
        //                 isCompact
        //                 showControls
        //                 showShadow
        //                 color="primary"
        //                 page={page}
        //                 total={Totalpage}
        //                 onChange={(page) => setpage(page)}
        //             />
        //         </div>
        //         <span className="background-rounded font-Nunito">Total Record: {totalData}</span>
        //     </div>
        // </Row>
    );
};
export default App;
