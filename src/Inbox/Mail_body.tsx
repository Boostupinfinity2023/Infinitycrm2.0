import React, { useState, useEffect, useCallback } from 'react';
import { ApiCall } from "../APIurl/API_call";
import { AjaxIntegration } from "../APIurl/url";
import jwt from '../getLoggedUser/GetUserInfomation';
import { debounce } from 'lodash';
import './inbox.css';
import './Upload.css';
import EmailList from "./Components/Mail_list";
import Sidebar from "./Components/Sidebar";
import TopNav from "./Components/Header";
import NotIntegrated from './Components/not-integrated';
import getCookie from '../getLoggedUser/GetUserInfomation';


export default function Page() {
    const token = jwt('jwt');
    const [isIntegrated, setIsIntegrated] = useState(false);
    const [loader, setloader] = useState(false);
    const [activeComponent, setActiveComponent] = useState("Inbox"); // To store active component

    useEffect(() => {
        const Connectcheck = async () => {
            setIsIntegrated(false);
            setloader(true);
            try {
                const apiRoutes = await ApiCall(
                    `${AjaxIntegration}?action=Validate.Connections.integration&access=private`,
                    'POST',
                    {
                        Authenticate: `${token}`,
                        'x-token-access': 'true',
                    },
                    null
                );
                if (apiRoutes.status) {
                    setIsIntegrated(true);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            setloader(false);
        };
        const debouncedConnect = debounce(Connectcheck, 300);
        debouncedConnect();
        return () => {
            debouncedConnect.cancel();
        };
    }, []);


    const [userdata, setuserdata]: any = useState({});
    const TokenData = getCookie('jwt');
    const UserValition = useCallback(
        debounce(async () => {
            fetch(`https://jwt-brown.vercel.app/validate-token?token=${TokenData}`, {
                method: 'GET',
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    if (data.isValid !== true) {
                        window.location.href = '/auth/agent/signin';
                    } else {
                        setuserdata(data.data);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }, 300), // Adjust the debounce delay as needed (300ms in this case)
        [TokenData]
    );

    useEffect(() => {
        UserValition();
    }, []);


    return (
        <div>
            {loader ? (
                <div className="logo-loader">
                    <div className="loaderlogo-wrapper">
                        {/* <img src="/loader_fav.png" alt="Logo" className="loader-logo" /> */}
                    </div>
                </div>
            ) :
                isIntegrated ? <>
                    <div className="h-screen dark:bg-gray-900">
                        <TopNav userinfo={userdata} />
                        <div className="flex h-[calc(100vh-64px)]">
                            {/* <Sidebar setActiveComponent={setActiveComponent} /> */}
                            <section className='flex-1 Mail-body overflow-auto'>
                                <EmailList userinfo={userdata} activeComponent={activeComponent} />
                            </section>
                        </div>
                    </div>
                </>
                    :

                    <NotIntegrated />

            }
        </div>
    );
}
