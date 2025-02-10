import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Select, SelectItem, Textarea, Tabs, Tab, Card, CardBody, } from "@nextui-org/react";
import DefaultLayout from "../pages/Pages/Offcanva/Default";
// import './style.css';
// import user_add from "./user_icon/user_add.svg";
import { generateJWT } from "../pages/JWT";
import { INSERTDATA } from "../APIurl/url";
import Swal from 'sweetalert2';
import Token from '../getLoggedUser/GetUserInfomation';
import withReactContent from 'sweetalert2-react-content';
import { message } from 'antd';
const MySwal = withReactContent(Swal);
interface Department {
    ID: number;
    DEPARTMENT_NAME: string;
    SUB_DEPARTMENT: string;
}
const authTokenLocalStorage = localStorage.getItem('auth_token');
const JWT_SCREET = import.meta.env.VITE_API_CALL_SCREET_KEY;
export default function App({ Refresh }: any) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const token = Token('jwt');
    const [departments, setDepartments] = useState<Department[]>([]);

    const [isloading, setisloading] = useState(false);

    const [show, setshow] = useState(false);
    setTimeout(() => {
        setshow(true);
    }, 300);

    //get department data
    const handallevae = (event: any) => {
        setisloading(true);
        event.preventDefault();
        const formData = new FormData(event.target);
        formData.append('PAGE_REQUEST', 'Leavesrequest');
        formData.append('AUTH_ID', authTokenLocalStorage || '');
        fetch(INSERTDATA, {
            method: "POST",
            headers: {
                Authenticate: `Bearer ${token}`,
            },
            body: formData
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setisloading(false)

                if (data.status == true) {
                    message.success(data.message);
                    onOpenChange();
                    Refresh(true);
                } else {
                    message.error(data.message);
                }
            })
            .catch((err) => {
                setisloading(false)
                message.error(err);
            });

    }

    const Form = () => {
        const [isVisible, setIsVisible] = useState(true);

        const toggleVisibility = () => {
            setIsVisible(!isVisible);
        };


        return (
            <>
                <div className="m-5">
                    <form onSubmit={handallevae}>
                        <Card className=" p-5 shadow-none ">

                            <div className="mt-4 flex flex-col gap-4">
                                <Input variant="bordered" type="date" label="Starting date" name="startdate" isRequired />
                                <Input variant="bordered" type="date" label="Ending date" name="enddate" isRequired />
                                <Input variant="bordered" type="Text" label="Leave type" name="leavetype" isRequired />
                                <Textarea variant="bordered" label="Leave Reason" name="leavereason"></Textarea>

                            </div>
                            <div className=" bg-white w-full flex justify-center mt-2">
                                <Button type="submit" className="btn-primary" isLoading={isloading}> {isloading ? 'Processing...' : 'Send Request'}</Button>

                            </div>
                        </Card>


                    </form>
                </div>
            </>
        );
    }

    return (
        <div className="demos">
            <Button onPress={onOpen} color="primary" className="font-bold">Leave Request</Button>
            <Modal size="xl" isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center" className="inviteuser" isDismissable={false} isKeyboardDismissDisabled={true} >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Leave Request</ModalHeader>
                    {show ? <Form /> : <DefaultLayout />}

                </ModalContent>

            </Modal>
        </div >
    );
}