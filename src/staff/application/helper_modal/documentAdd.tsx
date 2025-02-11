import React, { useState, useEffect } from 'react';
import { Checkbox, Drawer, Space, message } from 'antd';
import type { DrawerProps } from 'antd';
import { GETDATA } from '../../../APIurl/url';
import jwt from '../../../getLoggedUser/GetUserInfomation';
import { INSERTDATA } from '../../../APIurl/url';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Button, ButtonGroup } from '@nextui-org/button';
import { debounce } from 'lodash';

/**
 * DocumentRequire component
 *
 * This component displays a button to open a large drawer containing a list of documents.
 * The list of documents is fetched from the API using the `GETDATA` URL and the `jwt` token.
 *
 * @example
 * ```jsx
 * import DocumentRequire from './DocumentRequire';
 *
 * const App = () => {
 *   return <DocumentRequire />;
 * };
 * ```
 */
const DocumentRequire = ({ RefreshDATA }: any) => {
    /**
     * State to track whether the drawer is open or not
     */
    const [open, setOpen] = useState(false);
    const [Load, SetLoad] = useState(false);

    /**
     * State to track the size of the drawer
     */
    const [size, setSize] = useState<DrawerProps['size']>();

    /**
     * Function to show the large drawer
     */
    const showLargeDrawer = () => {
        setSize('large');
        setOpen(true);
    };

    /**
     * Function to close the drawer
     */
    const onClose = () => {
        setOpen(false);
    };

    /**
     * Get the JWT token from the `jwt` module
     */
    const Token = jwt('jwt');

    /**
     * State to store the list of documents
     */
    const [DocumentList, setDocumentList] = useState([]);

    /**
     * Function to fetch the list of documents from the API
     *
     * @returns {Promise<void>}
     */
    const { client_id } = useParams();
    const [loader, setLoader] = useState(false);
    const GetDocuList = async () => {
        const requester = await fetch(GETDATA + '?action=getDocList', {
            method: 'POST',
            headers: {
                Authenticate: `Bearer ${Token}`,
                'x-token-access': `true`,
            },
            body: JSON.stringify({
                PAGE_REQUEST: 'GET_DOCUMENT_LIST_DATA',
                client_id: client_id
            }),
        });
        const res = await requester.json();
        if (res.status === true && res.data.length > 0) {

            setDocumentList(res.data);
        } else {
            setDocumentList([]);
        }
    };

    const debouncedGetDocuList = debounce(GetDocuList, 300);
    useEffect(() => {
        debouncedGetDocuList();
        return () => {
            debouncedGetDocuList.cancel();
        };
    }, [loader]);



    const handleDocumentRequirement = async (e: any) => {
        e.preventDefault();
        setLoader(true);
        const target = e.target;
        const fornData = new FormData(target);
        fornData.append('PAGE_REQUEST', 'INSERT_DOCUMENT_REQUEST_DATA');
        fornData.append('ClientId', client_id || '');
        const insertdata = await fetch('https://harmanjeetsinghvirdi.com/InfinityCRM/API/V1/ajax.insert.php?action=insertDoc' + '?action=insertDoc', {
            method: 'POST',
            headers: {
                Authenticate: `Bearer ${Token}`,
            },
            body: fornData,
        });
        const res = await insertdata.json();
        if (res.status === true) {
            e.target.reset();
            setLoader(false);
            RefreshDATA(true);
            message.success('Document Request successfully');
            sessionStorage.setItem('documentStore', 'true');
            setOpen(false);
        } else {
            setLoader(false);
            message.error(res.message);
        }
    };
    return (
        <>
            <Space>
                <button className="btn btn-primary " onClick={showLargeDrawer}>
                    Add Document
                </button>
            </Space>
            <Drawer title="Document Requirement" className="font-Nunito" placement="left" size={size} onClose={onClose} open={open}>
                <form onSubmit={handleDocumentRequirement}>
                    <div className="table-responsive table-height-scroll">
                        <table className="table-res table-fixed ">
                            <thead className="">
                                <tr>
                                    <th className="namewidth">Document Name</th>
                                    <th className="font-Nunito checkwidth">Select</th>
                                    <th className="font-Nunito checkwidth">Mandatory</th>
                                </tr>
                            </thead>
                            <tbody>
                                <input type="hidden" name="STUDENT_ID" value={32} />
                                {DocumentList.map((item: any, index) => (
                                    <tr key={index}>
                                        <input type="hidden" name="DOCUMENTID[]" value={item.ID} />
                                        <input type="hidden" name="DOCUMENTUUID[]" value={item.DOC_ID} />

                                        <td className="namewidth">
                                            <span className="font-Nunito font-bold">{item.DOCUMENT_NAME}</span>
                                            <br></br>
                                            <span className='font-description'>{item.DOCUMENT_INFOMATION}</span>
                                        </td>
                                        <td className="checkwidth">
                                            <input type="checkbox" name="IS_selectedDoc[]" value={item.ID} />
                                        </td>
                                        <td className="checkwidth">
                                            <input type="checkbox" name="IS_requireDoc[]" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Space className="bottom-fix">
                        <Button className="danger-btn" type="button" onClick={onClose}>
                            Cancel
                        </Button>
                        {loader ? (
                            <Button className="btn btn-primary" type="button" isLoading>
                                Please wait...
                            </Button>
                        ) : (
                            <Button className="btn btn-primary" type="submit">
                                Submit
                            </Button>
                        )}
                    </Space>
                </form>
            </Drawer>
        </>
    );
};

export default DocumentRequire;
