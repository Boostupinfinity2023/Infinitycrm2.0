import React, { useState, useRef } from 'react';
import { Drawer, Button } from 'antd';
import Draercss from '../../style/drawer.css';
import { ColorPicker } from 'antd';
import { Input, notification } from 'antd';
import { InsertAction } from '../../FormHandler/InsertAction';
import { INSERTDATA } from '../../APIurl/url';
import getCookie from '../../getLoggedUser/GetUserInfomation';

const App: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    const jwttoken = getCookie('jwt');
    const [backgroundColor, setbackgroundColor] = useState('#faad28');
    const [TextColor, setTextColor] = useState('#ffffff');
    const formRef: any = useRef<HTMLFormElement>(null);
    const [loading, setLoading] = useState(false);
    const HanldeFormSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const Formdata = new FormData(e.currentTarget);
        Formdata.append('PAGE_REQUEST', 'DEAL_STATUS_MANAGE_INSERT');
        Formdata.append('BACKGROUNDCOLOR', backgroundColor);
        Formdata.append('TEXTCOLOR', TextColor);
        const Headers = {
            Authenticate: `Bearer ${jwttoken}`,
        };
        const response = await InsertAction(INSERTDATA, Formdata, 'POST', Headers);
        if (response.status === true) {
            api['success']({
                message: response.message,
            });
            setLoading(false);
            window.location.reload();
        } else {
            api['error']({
                message: response.message,
            });
        }
        setLoading(false);
    };
    const ColorHandler = (color: any) => {
        const hexColor = color.hex ? color.hex : color.toHexString();
        setbackgroundColor(hexColor);
    };

    const TextColorHandler = (color: any) => {
        const hexColor = color.hex ? color.hex : color.toHexString();
        setTextColor(hexColor);
    };
    return (
        <div className={`${Draercss}`}>
            {contextHolder}
            <a type="primary" className='btn btn-primary' onClick={showDrawer}>
                Add New Status
            </a>
            <Drawer
                title="Lead Status"
                onClose={onClose}
                open={open}
                placement={'left'}
                className="rounded-xl set_modal_width"
                footer={
                    <div className="flex justify-end gap-3">
                        <Button onClick={onClose} className="danger-btn" disabled={loading}>
                            Cancel
                        </Button>
                        <Button
                            className="btn btn-primary"
                            disabled={loading}
                            onClick={() => {
                                formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                            }}
                        >
                            {loading ? 'Wait...' : 'Submit'}
                        </Button>
                    </div>
                }
            >
                <form onSubmit={HanldeFormSubmission} ref={formRef}>
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                        <div className="space-y-2 ">
                            <label htmlFor="name">
                                Status Name <span className="text-danger">*</span>{' '}
                            </label>
                            <Input id="name" type="text" name="StatusName" placeholder="Enter Status Name " className="design_input inouthight" />
                        </div>

                        {/* <div className="space-y-2 ">
                            <label htmlFor="name" className="">
                                Background Color <span className="text-danger">*</span>{' '}
                            </label>
                            <ColorPicker defaultValue={backgroundColor} className="" onChange={ColorHandler} />
                        </div>

                        <div className="space-y-2 ">
                            <label htmlFor="name" className="">
                                Text Color <span className="text-danger">*</span>{' '}
                            </label>
                            <ColorPicker defaultValue={TextColor} className="" onChange={TextColorHandler} />
                        </div> */}

                        <div className="space-y-2 ">
                            <label htmlFor="name">
                                Sort By<span className="text-danger">*</span>{' '}
                            </label>
                            <Input id="name" type="text" name="SortName" placeholder="Sort By A - Z " className="design_input inouthight" />
                        </div>
                    </div>
                </form>
            </Drawer>
        </div>
    );
};

export default App;
