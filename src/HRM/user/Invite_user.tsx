import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, Button, Checkbox, Input, Select, SelectItem, Card } from "@nextui-org/react";
import DefaultLayout from "../../pages/Pages/Offcanva/Default";
import './style.css';
import user_add from "./user_icon/user_add.svg";
import { generateJWT } from "../../pages/JWT";
import { GetUserAPI } from "../../APIurl/url";
import { v1GETDATA } from "../../APIurl/url";
import Swal from 'sweetalert2';
import { APIURL } from "../../APIurl/url";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Token from '../../getLoggedUser/GetUserInfomation';
import debounce from 'lodash.debounce';
import { message } from 'antd';
interface Department {
    ID: number;
    DEPARTMENT_NAME: string;
    SUB_DEPARTMENT: string;
}
interface FormProps {
    departments: Department[];
    selectedRole: boolean;
    onOpen: any;
    handleRoleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const JWT_SCREET = import.meta.env.VITE_API_CALL_SCREET_KEY;

const Form = ({ departments, selectedRole, handleRoleChange, onOpen }: FormProps) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isloading, setisloading] = useState(false);
    const [department, setDepartments]: any = useState([]);
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const debouncedUserFetch = debounce(async () => {
        const token = Token('jwt');
        try {
            const responseData: any = await fetch(v1GETDATA, {
                method: 'POST',
                headers: {
                    Authenticate: `Bearer ${token}`,
                    'x-token-access': 'true',
                },
                body: JSON.stringify({ PAGE_REQUEST: 'Get.Country.data' }),
            });
            const data = await responseData.json();
            setDepartments(data.data);
        } catch (err) {

        }
    }, 300);


    useEffect(() => {
        debouncedUserFetch();
    }, []);



    const Handalinviteuser = (event: any) => {
        setisloading(true);
        event.preventDefault();
        const formData = new FormData(event.target);
        formData.append('PAGE_REQUEST', 'INVITEUSER');
        const payload = { REQUEST: "INVITEUSERFORM", is_Admin: false, isValid: true };
        const secretKey = JWT_SCREET;
        const currentTimestampInSeconds = Math.floor(Date.now() / 1000);
        const expirationTimestampInSeconds = currentTimestampInSeconds + 20;
        const expiresIn = expirationTimestampInSeconds - currentTimestampInSeconds;
        const token = generateJWT(payload, secretKey, expiresIn);
        token
            .then((JwtToken) => {
                fetch(APIURL, {
                    method: "POST",
                    headers: {
                        Authenticate: `Bearer ${JwtToken}`,
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
                            window.location.reload();
                            const form = document.getElementById("FomrId") as HTMLFormElement;
                            if (form) {
                                form.reset();
                            }
                        } else {
                            message.error(data.message);
                        }
                    })
                    .catch((err) => {
                        setisloading(false)
                        Swal.fire({
                            icon: 'error',
                            title: err,
                            padding: '2em',
                            customClass: 'sweet-alerts',
                        });
                    });
            })
            .catch((err) => {
                setisloading(false)
                Swal.fire({
                    icon: 'error',
                    title: err,
                    padding: '2em',
                    customClass: 'sweet-alerts',
                });
            });
    }

    return (

        <div className="mx-5">
            <style>
                {`
                   .role .text-foreground-500 {
                        color: #53585b;
                        font-weight: 400;
                    }
                `}
            </style>
            <form onSubmit={Handalinviteuser} id="FomrId">
                <Card className="p-5 max-h-[80vh] overflow-y-auto" >
                    <div className="flex gap-4 items-center">
                        <div className="invite-title-icon invite-title-icon-link"> <img src={user_add} /></div>
                        <div className="invite-title-text">Add new user</div>
                    </div>
                    <hr className="mt-4" />

                    <div className="mt-4 flex flex-col gap-6">
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                            <Input variant='bordered' type="text" label="First Name" placeholder="First Name" name="firstname" required />
                            <Input variant='bordered' type="text" label="Last Name" placeholder="Last Name" name="lastname" required />
                        </div>
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                            <Input variant='bordered' type="email" label="E-mail" placeholder="Enter E-mail" name="email" required />
                            <Input variant='bordered' type="number" label="User Number" placeholder="Enter User Number" name="number" required />
                        </div>
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                            <Input variant='bordered' type="date" label="DOB" placeholder="Enter Date of birth" name="DOB" required />
                            <Input variant='bordered' type="date" label="Hiring Date" placeholder="Enter Hiring Date" name="hiringdate" required />
                        </div>
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                            <Select className="max-w-xs role" label="Sex" name="sex" variant='bordered'
                                placeholder="Select Gender "
                            >
                                <SelectItem key="1">
                                    Male
                                </SelectItem>
                                <SelectItem key="2">
                                    Female
                                </SelectItem>
                            </Select>

                            <Select
                                variant='bordered'
                                label="Role"
                                className="max-w-xl role"
                                onChange={handleRoleChange}
                                name="role"
                                placeholder="Select Role"
                            >
                                <SelectItem key="1" value="1">Admin</SelectItem>
                                <SelectItem key="3" value="3">STAFF</SelectItem>
                                <SelectItem key="4" value="4">AGENT</SelectItem>
                            </Select>

                            {selectedRole && (
                                <Select
                                    variant='bordered'
                                    items={department}
                                    label="Country"
                                    placeholder="Select Country"
                                    name="department"
                                    required
                                >
                                    {department.map((department: any, index: any) => (
                                        <SelectItem key={department.ID} value={department.ID}>
                                            {department.COUNTRY_NAME}
                                        </SelectItem>
                                    ))}
                                </Select>
                            )}
                        </div>
                        <Input variant='bordered' type="text" label="Address" name="Address" placeholder="Enter Address" />

                        <Input label="Password" variant="bordered" placeholder="Enter your password"
                            endContent={
                                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                    {isVisible ? (
                                        <RemoveRedEyeIcon className="text-2xl text-default-400 pointer-events-none" />
                                    ) : (
                                        <VisibilityOffIcon className="text-2xl text-default-400pointer-events-none" />
                                    )}
                                </button>
                            }
                            type={isVisible ? "text" : "password"}
                            className=""
                            defaultValue="Skyline@123"
                            name="password"
                        />

                        <input type="hidden" name="account_number" />

                        <Checkbox defaultSelected name="acountstatus" value="Y">Active Account</Checkbox>
                    </div>
                </Card>
                <div className=""></div>
                <div className="relative w-full flex justify-end gap-4">
                    <Button className="mt-4 danger-btn" onClick={() => onOpen(false)}> Cancel </Button>
                    <Button type="submit" className="mt-4 gap-4" color="primary" isLoading={isloading}> {isloading ? 'Wait...' : 'Submit'}</Button>

                </div>
            </form>
        </div>
    );
}

export default function App() {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [isOpen, onOpen] = useState(true);
    const [selectedRole, setSelected] = useState(false);

    const handleRoleChange = (event: any) => {
        const selected = event.target.value;
        if (selected == 3) {
            setSelected(true);
        } else {
            setSelected(false);
        }
    };

    function onOpenChange() {
        onOpen(!isOpen);
    }
    const [show, setshow] = useState(false);
    setTimeout(() => {
        setshow(true);
    }, 300);

    // get department data
    useEffect(() => {
        // alert('data');
        const payload = { REQUEST: "Department", is_Admin: false, isValid: true };
        const secretKey = JWT_SCREET;
        const currentTimestampInSeconds = Math.floor(Date.now() / 1000);
        const expirationTimestampInSeconds = currentTimestampInSeconds + 20;
        const expiresIn = expirationTimestampInSeconds - currentTimestampInSeconds;
        const token = generateJWT(payload, secretKey, expiresIn);
        console.log(token);
        token.then((tokens) => {
            const response = fetch(GetUserAPI + '?get=Getdepartmentname&isview=true&edit=false', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authenticate': `Bearer ${tokens}`,
                },
                body: JSON.stringify({
                    'PAGE_REQUEST': 'GET_DEPARTMENTDATA',
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === true) {
                        setDepartments(data.data);
                    } else {
                        console.error('Failed to fetch departments:', data.message);
                    }
                })
                .catch(error => console.error('Error fetching departments:', error));
        });

    }, [])

    return (
        <div className="demos">
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="full" placement="top-center" className="modalclose inviteuser" >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                    {show ? <Form departments={departments} selectedRole={selectedRole} handleRoleChange={handleRoleChange} onOpen={onOpen} /> : <DefaultLayout />}
                </ModalContent>
            </Modal>
        </div >
    );
}