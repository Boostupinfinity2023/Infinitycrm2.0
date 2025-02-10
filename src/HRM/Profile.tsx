import React, { useState, useEffect } from "react";
import { Input, Select, SelectItem, Card, Button } from "@nextui-org/react";
import DefaultLayout from "../staff/application/helper_modal/Blank_skeleton";
import './user/style.css';
import { generateJWT } from "../pages/JWT";
import { v1GETDATA } from "../APIurl/url";
import { GetsUserAPI } from "../APIurl/url";
import Swal from 'sweetalert2';
import { APIURL } from "../APIurl/url";
import Token from '../getLoggedUser/GetUserInfomation';
import debounce from 'lodash.debounce';
import { message } from 'antd';
const JWT_SCREET = import.meta.env.VITE_API_CALL_SCREET_KEY;
interface Department {
    ID: number;
    COUNTRY_NAME: string;
    SUB_DEPARTMENT: string;
}

interface Profiledata {
    ID: any;
    CLIENT_NAME: any;
    CONTACT_NUMBER: any;
    CLIENT_EMAIL: any;
    DOB: any;
    HIRING_DATE: any;
    SEX: any;
    ADDRESS: any;
    ACCOUNT_NUMBER: any;
    PROFILE_URL: any;
    IS_ADMIN: any;
    CLIENT_ID: any;
    BRANCH: any;
}

interface userIdProps {
    selectedUserId: any; // Define the type of subtaskData
}

const Userprofile = ({ selectedUserId, Refreshdata, IsOpendata }: any) => {
    const token = Token('jwt');
    const [departments, setDepartments] = useState<Department[]>([]);
    const [Profile, setprofile] = useState<Profiledata[]>([]);
    const [isOpen, onOpen] = useState(true);
    const [selectedRole, setSelected]: any = useState();
    const [isloading, Setloder]: any = useState(false);


    const [show, setshow] = useState(false);
    setTimeout(() => {
        setshow(true);
    }, 300);

    //get department data
    const debouncedUserFetch = debounce(async () => {
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

    useEffect(() => {
        const payload = { REQUEST: "PROFILEDATA", is_Admin: false, isValid: true };
        const secretKey = JWT_SCREET;
        const currentTimestampInSeconds = Math.floor(Date.now() / 1000);
        const expirationTimestampInSeconds = currentTimestampInSeconds + 20;
        const expiresIn = expirationTimestampInSeconds - currentTimestampInSeconds;
        const token = generateJWT(payload, secretKey, expiresIn);

        token.then((tokens) => {
            const response = fetch(GetsUserAPI + '?get=GETUSERPROFILE&isview=true&edit=false', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authenticate': `Bearer ${tokens}`,
                },
                body: JSON.stringify({
                    'PAGE_REQUEST': 'GETUSERPROFILEDATA',
                    'USER_ID': selectedUserId,
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === true) {
                        // console.log(data.data);
                        setprofile(data.data);
                        setSelected(data.data[0].IS_ADMIN);
                    } else {
                        console.error('Failed to fetch departments:', data.message);
                    }
                })
                .catch(error => console.error('Error fetching departments:', error));
        });

    }, [])

    const updateprofile = (event: any) => {
        Setloder(true);
        event.preventDefault();
        const formData = new FormData(event.target);
        formData.append('PAGE_REQUEST', 'UPDATEprofile');
        const payload = { REQUEST: "UPDATEprofile", is_Admin: false, isValid: true };
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
                        Setloder(false);
                        if (data.status == true) {
                            Refreshdata(true);
                            IsOpendata(false);
                            message.success('Profile updated successfully');
                        } else {
                            message.error('something went wrong');
                        }
                    })
                    .catch((err) => {
                        Setloder(false);
                        message.error(err);
                    });
            })
            .catch((err) => {
                message.error(err);
            });
    }

    return (
        <>
            {show ?

                <>
                    {Profile.map((profile: any) => (
                        <div className="mx-5">
                            <form onSubmit={updateprofile}>
                                <Card className="p-5 max-h-[85vh] overflow-y-auto" >
                                    <div className="flex gap-4 items-center">
                                        {/* <div className="invite-title-icon invite-title-icon-link"> <img src={profile.PROFILE_URL} width={'30px'} /></div> */}
                                        <div className="invite-title-text"><b>Update User</b></div>
                                    </div>
                                    <hr className="mt-4" />

                                    <div className="mt-4 flex flex-col gap-6">
                                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                            <Input variant="bordered" type="text" label="Full Name" defaultValue={profile.CLIENT_NAME} placeholder="Full Name" name="fullname" required />
                                            <input type="hidden" name="Client_ID" value={profile.CLIENT_ID} />
                                            <input type="hidden" name="ID" value={profile.ID} />
                                        </div>
                                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                            <Input variant="bordered" type="email" label="E-mail" placeholder="Enter E-mail" defaultValue={profile.CLIENT_EMAIL} name="email" required />
                                            <Input variant="bordered" type="number" label="User Number" placeholder="Enter User Number" defaultValue={profile.CONTACT_NUMBER} name="number" required />
                                        </div>
                                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                            <Input variant="bordered" type="date" label="DOB" placeholder="Enter Date of birth" name="DOB" defaultValue={profile.DOB} required />
                                            <Input variant="bordered" type="date" label="Hiring Date" placeholder="Enter Hiring Date" name="hiringdate" defaultValue={profile.HIRING_DATE} required />
                                        </div>
                                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                            <Select className="max-w-xs" label="Sex" name="sex" defaultSelectedKeys={`${profile.SEX}`} variant="bordered">
                                                <SelectItem key="1">
                                                    Male
                                                </SelectItem>
                                                <SelectItem key="2">
                                                    Female
                                                </SelectItem>
                                            </Select>

                                            <Select
                                                variant="bordered"
                                                label="Role"
                                                defaultSelectedKeys={[`${selectedRole}`]}
                                                className="max-w-xl"
                                                name="role"
                                                onChange={(e) => setSelected(e.target.value)}
                                            >
                                                <SelectItem key="1">Admin</SelectItem>
                                                {/* <SelectItem key="2" value="2">Super Admin</SelectItem> */}
                                                <SelectItem key="3" >STAFF</SelectItem>
                                                <SelectItem key="4" >AGENT</SelectItem>
                                            </Select>

                                            {selectedRole == 3 ? (
                                                <Select
                                                    variant="bordered"
                                                    items={departments}
                                                    label="Department"
                                                    placeholder="Select Department"
                                                    name="department"
                                                    defaultSelectedKeys={`${profile.BRANCH}`}
                                                    required
                                                >
                                                    {departments.map((department) => (
                                                        <SelectItem key={department.ID} value={department.ID}>
                                                            {department.COUNTRY_NAME}
                                                        </SelectItem>
                                                    ))}
                                                </Select>

                                            ) : ''}


                                        </div>

                                        <Input variant="bordered" type="text" label="Address" placeholder="Enter Address" defaultValue={profile.ADDRESS} name="Address" />
                                        <div>
                                            <label>Account Details</label>
                                        </div>

                                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                            <Input variant="bordered" type="text" label="Account Number" placeholder="Account Number" name="account_number" defaultValue={profile.bank_ACCOUNT_NUMBER} />
                                            <Input variant="bordered" type="text" label="Mobile Number" placeholder="Mobile Number" name="Bank_mobile_no" defaultValue={profile.MOBILE_NUMBER} />
                                        </div>
                                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                            <Input variant="bordered" type="text" label="Holder Name" placeholder="Holder Name" name="Holder_name" defaultValue={profile.HOLDER_NAME} />
                                            <Input variant="bordered" type="text" label="Bank Name" placeholder="Bank Name" name="bank_name" defaultValue={profile.BANK_NAME} />
                                        </div>
                                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                            <Input variant="bordered" type="text" label="Bank Branch" placeholder="Bank Branch" name="Bank_branch" defaultValue={profile.BANK_BRANCH} />
                                            <Input variant="bordered" type="text" label="IFSC Code" placeholder="IFSC Code" name="IFSC_code" defaultValue={profile.IFSC_CODE} />
                                        </div>
                                    </div>
                                </Card>
                                <div className=""></div>
                                <div className="relative bottom-0 bg-white w-full flex justify-center gap-4">
                                    <Button type="submit" className="mt-4 btn btn-primary" isLoading={isloading}> {isloading ? 'Processing...' : 'UPDATE'}</Button>
                                    {/* <Button className="mt-4" color="danger" onClick={() => onOpenChange(false)}> cancel </Button> */}
                                </div>
                            </form>
                        </div>
                    ))}
                </>
                : <DefaultLayout />}
        </>

    );
}

export default Userprofile;