import React, { useState, useEffect } from 'react';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import { ClockAPI } from '../../APIurl/url';
import userInfo from '../../getLoggedUser/GetUserInfomation';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);
const JWT_SCREET = import.meta.env.VITE_API_CALL_SCREET_KEY;
import debounce from 'lodash.debounce';
import { message } from 'antd';
// Function to format the time string to display hours, minutes, and AM/PM in uppercase
const formatTime = (date: Date) => {
    const timeString = date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
    const [time, period] = timeString.split(' ');
    return { time, period };
};

//AUTH TOKEN

const authTokenLocalStorage = localStorage.getItem('auth_token');


const Clocked = () => {



    const [isStaff, setIsStaff] = useState('');
    const [ctime, setTime] = useState(formatTime(new Date()));

    const [ClockIN_ID, setClockIN_ID]: any = useState(false);
    const [clockedIn, setClockedIn]: any = useState();
    const token = userInfo('jwt');
    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(formatTime(new Date()));
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    //handal clock in time
    const GetStudentData = async () => {
        const parametter = `?onlyview=GETCLOCKTIME`;
        const UserAuthID = await userInfo('auth_token');
        try {
            const responseData: any = await fetch(
                ClockAPI + parametter,
                {
                    method: 'POST',
                    headers: {
                        Authenticate: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ PAGE_REQUEST: 'GETCLOCKTIMES' }),
                }
            );
            const data = await responseData.json();
            console.log(data.status)
            if (data.status == true) {
                setClockIN_ID(data.data[0]['is_clocked_in']);
            } else {
                setClockIN_ID(false);
            }
        } catch (err) {

        }
    };
    const storedUserId = sessionStorage.getItem('studentdataloader');
    const debouncedGetStudentData = debounce(GetStudentData, 300);
    const globalVar = window.globalVariable;
    useEffect(() => {
        if (globalVar && globalVar.ROLE) {
            setIsStaff(globalVar.ROLE);
        }
    }, [globalVar]);
    useEffect(() => {
        debouncedGetStudentData();
        if (storedUserId) {
            sessionStorage.clear();
        }
    }, []);


    const handleClockIn = async () => {
        const parametter = `?onlyview=GETCLOCKTIME`;
        const UserAuthID = await userInfo('auth_token');
        try {
            const responseData: any = await fetch(
                ClockAPI + parametter,
                {
                    method: 'POST',
                    headers: {
                        Authenticate: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ PAGE_REQUEST: 'INSERT.CLOCK.IN.DATA' }),
                }
            );
            const data = await responseData.json();
            if (data.status == true) {
                setClockIN_ID(true);
                message.success('Clock In');
            } else {
                message.error('Something went wrong');
            }
        } catch (err) {

        }
    };

    const handleClockOut = async () => {
        const parametter = `?onlyview=GETCLOCKTIME`;
        const UserAuthID = await userInfo('auth_token');
        try {
            const responseData: any = await fetch(
                ClockAPI + parametter,
                {
                    method: 'POST',
                    headers: {
                        Authenticate: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ PAGE_REQUEST: 'UPDATE.CLOCK.OUT.DATA' }),
                }
            );
            const data = await responseData.json();
            if (data.status == true) {
                setClockIN_ID('false');
                message.success('Clock OUT');
            } else {
                message.error('Something went wrong');
            }
        } catch (err) {

        }
    };
    return (
        <div className='text-lg flex gap-1 py-0 cursor-pointer'>
            <h1 className='Nav-time'>{ctime.time}<sup className='text-sm'>{ctime.period}</sup></h1>

            {isStaff == 'staff' ? (
                ClockIN_ID == 'false' ? (
                    <span className='text-sm' onClick={handleClockIn}>
                        <PlayCircleOutlineIcon /> Clock In
                    </span>

                ) : (
                    <span className='text-sm' onClick={handleClockOut}>
                        <PauseCircleOutlineIcon /> Clock Out
                    </span>
                )
            ) : (
                ''
            )}

            {/* {clockedIn ? (
                <span className='text-sm' onClick={handleClockOut} ><PlayCircleOutlineIcon />Clock Out</span>
            ) : (
                <span className='text-sm' onClick={handleClockIn}><PlayCircleOutlineIcon />Clock In</span>
            )} */}
        </div>
    );
};

export default Clocked;
