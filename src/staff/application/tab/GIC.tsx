import React, { useState, useEffect } from "react";
import { Button, Select, SelectItem, Input } from "@nextui-org/react";
import jwt from '../../../getLoggedUser/GetUserInfomation';
import { v1GETDATA } from '../../../APIurl/url';
import { useParams, NavLink } from 'react-router-dom';
import Blank from '../../../staff/LeadApplication/tab/blank';
import debounce from 'lodash.debounce';
import Emptyimage from '../../../../public/TableEmpty/Empty.jpg';
export default function App() {
    const token = jwt('jwt');
    const { client_id } = useParams();
    const { file_id } = useParams();
    const [Refresh, SetRefresh] = useState(false);
    const [Buttonload, Setbtnload] = useState(false);


    const [gicdetails, Setgicdetails]: any = useState([]);


    const debouncedTotalapplication = debounce(async () => {
        try {
            const res = await fetch(v1GETDATA, {
                method: 'POST',
                headers: {
                    Authenticate: `Bearer ${token}`,
                    'x-token-access': `true`,
                },
                body: JSON.stringify({
                    PAGE_REQUEST: 'GET_USERDATA_GIC',
                    ClientId: client_id,
                    Deal_ID: file_id,
                }),
            });
            const data = await res.json();
            Setgicdetails(data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {

        }
    }, 300);


    useEffect(() => {
        debouncedTotalapplication();
    }, [Refresh]);



    return (
        <div className="grid gap-3">
            <style>
                {`
                   .marital_status_select .text-foreground-500 {
                        color: #9ca3af;
                        font-weight: 400;
                    }
                   
                    .offer_letter_select .text-foreground-500 {
                        color: #9ca3af;
                        font-weight: 400;
                    }
                `}
            </style>
            <form >
                <div className="grid gap-4"
                >
                    <Input
                        variant="bordered"
                        label="Passport "
                        placeholder="Enter Student Passport Number"
                        className=""
                        name="Passport_number"
                        value={gicdetails.personal_details?.PASSPORT_NUMBER || ""}
                        isRequired
                    />
                    <Input
                        variant="bordered"
                        label="Mobile"
                        placeholder="Enter Student Mobile Number"
                        className=""
                        name="Mobile_number"
                        value={gicdetails.personal_details?.PHONE_NUMBER || ""}
                        isRequired
                    />
                    <Input
                        variant="bordered"
                        label="Email"
                        placeholder="Enter Student Email Id"
                        className=""
                        name="Mobile_number"
                        value={gicdetails.personal_details?.EMAIL || ""}
                        isRequired
                    />
                    <div className="marital_status_select">
                        <Select
                            variant="bordered"
                            label="Select student marital status"
                            name="Marital_status"
                            defaultSelectedKeys={[`${gicdetails.personal_details?.MARITAL_STATUS || ""}`]}
                            isRequired
                        >
                            <SelectItem key="Single"> Single</SelectItem>
                            <SelectItem key="Married"> Married</SelectItem>
                        </Select>
                    </div>
                    <div className="offer_letter_select">
                        <Select
                            variant="bordered"
                            label="Select student offer letter"
                            name="Marital_status"
                            isRequired
                        >
                            {gicdetails.personal_details?.courses?.map((course: any, index: any) => (
                                <SelectItem key={index} value={course.Offer_letter_ID}>
                                    {course.PROGRAM_NAME}
                                </SelectItem>
                            ))}

                        </Select>
                    </div>
                    <div>
                        <footer className="flex justify-end gap-3">

                            <Button className="danger-btn" >
                                Close
                            </Button>
                            <Button type="submit" color="primary" disabled={Buttonload ? true : false}>
                                {Buttonload ? 'Wait...' : 'Submit'}
                            </Button>
                        </footer>
                    </div>
                </div>
            </form>
        </div>
    );
}
