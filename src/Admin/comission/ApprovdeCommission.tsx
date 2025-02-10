import React, { useState } from 'react';
import { Button, Modal, Input, Select, message } from 'antd';
import { InsertAction } from '../../FormHandler/InsertAction';
import { GETDATA } from '../../APIurl/url';
import userInfo from '../../getLoggedUser/GetUserInfomation';
import { Tooltip } from 'antd';
interface DataType {
    data: any;
    setpageRefresh: any;
}
const ApproveCommission = ({ data, setpageRefresh }: DataType) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    console.table(data);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const token = userInfo('jwt');
    const { TextArea } = Input;
    const [PaymentStatus, setPaymentStatus] = useState('');
    const [PaymentComment, StePaymentComment] = useState('');
    const [loading, setLoading] = useState(false);
    const HandleChnages = async () => {
        setLoading(true);
        const body = JSON.stringify({
            PAGE_REQUEST: 'INSERT_PAYMENT_STATUS',
            PaymentStatus: PaymentStatus,
            PaymentComment: PaymentComment,
            CommissionId: data.UUID,
            Client_ID: data.CLIENT_UUID,
        });

        const Heades = {
            Authenticate: `Bearer ${token}`,
        };
        const response = await InsertAction(GETDATA, body, 'POST', Heades);
        if (response.status === true) {
            message.success('The commission amount has been updated successfully.');
            setpageRefresh(true);
        } else {
            message.error(response.message);
        }
        setIsModalOpen(false);
        setLoading(false);
    };

    const HandleChnagesStatus = (value: string) => {
        setPaymentStatus(value);
    };
    return (
        <>
            {/* Dailog Modal  */}
            <button className="btn mr-1 btn-primary btn-sm" onClick={showModal}>
                Pay
            </button>
            <Modal

                onCancel={() => {
                    setIsModalOpen(false);
                }}
                title="Approve Agent Commissions"
                open={isModalOpen}
                className="ModalDailog"
                style={{ top: 20 }}
                footer={
                    <>
                        <Button
                            className='danger-btn'
                            onClick={() => {
                                setIsModalOpen(false);
                            }}
                        >
                            Close
                        </Button>
                        <Button className="btn-primary" onClick={HandleChnages} loading={loading}>
                            Apply Changes
                        </Button>
                    </>
                }
            >
                <p>Review and approve the following commission details.</p>
                <div className="grid gap-4 py-4">


                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <table className="w-full">
                            <tbody>

                                <tr className="border-b border-gray-200 last:border-b-0">
                                    <td className="font-medium text-gray-700 py-2"> Name :</td>
                                    <td className="text-gray-800 py-2">{data.AGNET_NAME}</td>
                                </tr>
                                <tr className="border-b border-gray-200 last:border-b-0">
                                    <td className="font-medium text-gray-700 py-2">Commission Amount :</td>
                                    <td className="text-gray-800 py-2">{data.COMMISSION_PRICE}</td>
                                </tr>
                                <tr className="border-b border-gray-200 last:border-b-0">
                                    <td className="font-medium text-gray-700 py-2">Payment Status :</td>
                                    <td className="text-gray-800 py-2">{data.PAID_COMMSSION_STATUS}</td>
                                </tr>
                                <tr className="border-b border-gray-200 last:border-b-0">
                                    <td className="font-medium text-gray-700 py-2">Application Id :</td>
                                    <td className="text-gray-800 py-2">{data.SUBMMISSION_FILE_ID}</td>
                                </tr>
                                <tr className="border-b border-gray-200 last:border-b-0">
                                    <td className="font-medium text-gray-700 py-2">Client Name :</td>
                                    <td className="text-gray-800 py-2">{data.FIRST_NAME} {data.LAST_NAME}</td>
                                </tr>

                                <tr className="border-b border-gray-200 last:border-b-0">
                                    <td className="font-medium text-gray-700 py-2">Account Number :</td>
                                    <td className="text-gray-800 py-2">{data.AGENT_BANK_ACCOUNT_NUMBER ? data.AGENT_BANK_ACCOUNT_NUMBER : 'Empty'}</td>
                                </tr>
                                <tr className="border-b border-gray-200 last:border-b-0">
                                    <td className="font-medium text-gray-700 py-2">Holder Name :</td>
                                    <td className="text-gray-800 py-2">{data.AGENT_BANK_HOLDER_NAME ? data.AGENT_BANK_HOLDER_NAME : 'Empty'}</td>
                                </tr>
                                <tr className="border-b border-gray-200 last:border-b-0">
                                    <td className="font-medium text-gray-700 py-2">Bank Name :</td>
                                    <td className="text-gray-800 py-2">{data.AGENT_BANK_NAME ? data.AGENT_BANK_NAME : 'Empty'}</td>
                                </tr>
                                <tr className="border-b border-gray-200 last:border-b-0">
                                    <td className="font-medium text-gray-700 py-2">Bank branch :</td>
                                    <td className="text-gray-800 py-2">{data.AGENT_BANK_BRANCH ? data.AGENT_BANK_BRANCH : 'Empty'}</td>
                                </tr>
                                <tr className="border-b border-gray-200 last:border-b-0">
                                    <td className="font-medium text-gray-700 py-2">IFSC Code :</td>
                                    <td className="text-gray-800 py-2">{data.AGENT_BANK_IFSC_CODE ? data.AGENT_BANK_IFSC_CODE : 'Empty'}</td>
                                </tr>
                                <tr className="border-b border-gray-200 last:border-b-0">
                                    <td className="font-medium text-gray-700 py-2">Mobile Number :</td>
                                    <td className="text-gray-800 py-2">{data.AGENT_BANK_MOBILE_NUMBER ? data.AGENT_BANK_MOBILE_NUMBER : 'Empty'}</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>


                    {/* <div className="grid grid-cols-2 items-center gap-4">
                        <div className="col-span-1 space-y-1">
                            <Tooltip placement="leftBottom" color={'#0975de'} title={
                                <>
                                    <p>Account Number : {data.AGENT_BANK_ACCOUNT_NUMBER ? data.AGENT_BANK_ACCOUNT_NUMBER : 'Empty'} </p>
                                    <p>Holder Name :  {data.AGENT_BANK_HOLDER_NAME ? data.AGENT_BANK_HOLDER_NAME : 'Empty'} </p>
                                    <p>Bank Name :  {data.AGENT_BANK_NAME ? data.AGENT_BANK_NAME : 'Empty'} </p>
                                    <p>Bank branch : {data.AGENT_BANK_BRANCH ? data.AGENT_BANK_BRANCH : 'Empty'} </p>
                                    <p>IFSC Code : {data.AGENT_BANK_IFSC_CODE ? data.AGENT_BANK_IFSC_CODE : 'Empty'} </p>
                                    <p>Mobile Number : {data.AGENT_BANK_MOBILE_NUMBER ? data.AGENT_BANK_MOBILE_NUMBER : 'Empty'} </p>
                                </>
                            }>
                                <p className="text-sm font-medium">Agent Name : </p>
                                <p className="text-sm text-muted-foreground">{data.AGNET_NAME}</p>
                            </Tooltip>

                        </div>
                        <div className="col-span-1 space-y-1">
                            <p className="text-sm font-medium">Commission Amount :</p>
                            <p className="text-sm text-muted-foreground">{data.COMMISSION_PRICE}</p>
                        </div>

                    </div> */}
                    {/* <div className="grid grid-cols-2 items-center gap-4">

                        <div className="col-span-1 space-y-1">
                            <p className="text-sm font-medium">Payment Status :</p>
                            <p className="text-sm text-muted-foreground">{data.PAID_COMMSSION_STATUS}</p>
                        </div>
                        <div className="col-span-1 space-y-1">
                            <p className="text-sm font-medium">Application Id & Client Name</p>

                            <p className="text-sm text-muted-foreground">
                                <p className="flex">
                                    <p className="font-medium flex">StudentId : </p>
                                    {data.SUBMMISSION_FILE_ID}
                                </p>{' '}
                                <span className="flex">
                                    {' '}
                                    <p className="font-medium">Client Name : </p> {data.FIRST_NAME} {data.LAST_NAME}
                                </span>
                            </p>
                        </div>


                    </div> */}
                    <div>
                        <label htmlFor="paymentstatus">Payment Status</label>
                        <Select
                            onChange={HandleChnagesStatus}
                            id="paymentstatus"
                            style={{ width: '100%' }}
                            options={[
                                { value: 'Unpaid', label: 'Unpaid' },
                                { value: 'Paid', label: 'Paid' },
                                { value: 'Waiting', label: 'Waiting' },
                                { value: 'pending', label: 'Pending' },
                            ]}
                        />
                    </div>
                    <TextArea
                        rows={4}
                        placeholder="Enter Any Comment And Message"
                        className="rounded-xl"
                        onChange={(e: any) => {
                            StePaymentComment(e.target.value);
                        }}
                    />
                </div>
            </Modal>
        </>
    );
};

export default ApproveCommission;
