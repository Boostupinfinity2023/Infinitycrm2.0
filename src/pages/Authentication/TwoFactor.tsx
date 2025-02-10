import React, { useState, useEffect, FormEvent, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input } from "@nextui-org/react";
import Google_svg from '../../../public/Image/google.svg';
import { generateJWT } from './JWT';
import { message } from 'antd';
import { APIURL } from '../../APIurl/url';
import { useNavigate, NavLink, useParams, useLocation } from 'react-router-dom';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
    type Container,
    type ISourceOptions,
    MoveDirection,
    OutMode,
} from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
const LoginBoxed = () => {

    const [init, setInit] = useState(false);
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = async (container?: Container): Promise<void> => {
        console.log(container);
    };

    const options: ISourceOptions = useMemo(
        () => ({
            background: {
                color: {
                    value: "#0d47a1",
                },
            },
            fpsLimit: 120,
            interactivity: {
                events: {
                    onClick: {
                        enable: true,
                        mode: "push",
                    },
                    onHover: {
                        enable: true,
                        mode: "repulse",
                    },
                },
                modes: {
                    push: {
                        quantity: 4,
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4,
                    },
                },
            },
            particles: {
                color: {
                    value: "#ffffff",
                },
                links: {
                    color: "#ffffff",
                    distance: 150,
                    enable: false,
                    opacity: 0.5,
                    width: 1,
                },
                move: {
                    direction: MoveDirection.none,
                    enable: true,
                    outModes: {
                        default: OutMode.out,
                    },
                    random: false,
                    speed: 3,
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                    },
                    value: 100,
                },
                opacity: {
                    value: 0.5,
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: { min: 1, max: 5 },
                },
            },
            detectRetina: true,
        }),
        [],
    );



    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const [otpValue, setOtpValue] = useState<number | ''>('');
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const action = searchParams.get('action');
    const jwt = searchParams.get('jwt');
    const email = searchParams.get('email');
    let { ClientToken } = useParams();
    const handleOTPChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setOtpValue(newValue === '' ? '' : parseInt(newValue));
    };

    function VerifyOTP(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const payload = { useremail: email, ClientToken: ClientToken };
        const secretKey = 'JwtSecret';
        const currentTimestampInSeconds = Math.floor(Date.now() / 1000);
        const expirationTimestampInSeconds = currentTimestampInSeconds + 30;
        const expiresIn = expirationTimestampInSeconds - currentTimestampInSeconds;

        const token = generateJWT(payload, secretKey, expiresIn);
        token.then((JwtToken) => {
            setIsSubmitting(true);
            fetch(APIURL, {
                method: 'POST',
                body: JSON.stringify({
                    Action: 'VerifyOTP',
                    OTP: otpValue,
                    jwtSecret: jwt,
                    email: email,
                    ClientToken: ClientToken,
                    PAGE_REQUEST: 'OTPVerify'
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authenticate': `Bearer ${JwtToken}`
                }
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    if (data.status == true) {
                        message.success(data.message);
                        setTimeout(() => {
                            navigate('/thanks');
                        }, 3000)
                    } else {
                        message.error(data.message);
                        setIsSubmitting(false);
                    }
                })
                .catch((error) => {
                    message.error(error);
                    setIsSubmitting(false);
                });

        }).catch((err) => {
            console.error(err);
        })
    }

    function resendOTP() {
        setIsSubmitting(true);
        const payload = { useremail: email, ClientToken: ClientToken };
        const secretKey = 'JwtSecret';
        const currentTimestampInSeconds = Math.floor(Date.now() / 1000);
        const expirationTimestampInSeconds = currentTimestampInSeconds + 30;
        const expiresIn = expirationTimestampInSeconds - currentTimestampInSeconds;

        const token = generateJWT(payload, secretKey, expiresIn);
        token.then((JwtToken) => {
            fetch(APIURL + '?action=resendotp', {
                method: 'POST',
                body: JSON.stringify({
                    jwtSecret: jwt,
                    email: email,
                    ClientToken: ClientToken,
                    PAGE_REQUEST: 'resendOtpRequest'
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authenticate': `Bearer ${JwtToken}`
                }
            })
                .then((res) => {
                    return res.json();
                }).then((data) => {
                    setIsSubmitting(false);
                    if (data.status == true) {
                        message.success('OTP resend request sent successfully');

                    } else {
                        message.error(data.message);
                    }
                })

        }).catch((err) => {
            setIsSubmitting(false);
            console.error(err);
        })
    }

    return (
        <>
            <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500">
                {init ?
                    <Particles
                        id="tsparticles"
                        particlesLoaded={particlesLoaded}
                        options={options}
                    /> : ''
                }
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05')] bg-cover bg-center opacity-20">  </div>

                <div className="absolute inset-0 h-full w-full flex items-center justify-center">
                    <div className="relative w-full max-w-[360px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[480px] xl:max-w-[500px] h-auto mx-2 sm:mx-4 rounded-xl bg-gradient-to-br from-[#ffffff] via-[#f1f1f1] to-[#e4e4e4] dark:bg-gradient-to-br from-[#0E1726] to-[#1A2436] overflow-hidden shadow-lg">
                        {/* Card content */}
                        <div className="relative flex flex-col justify-center rounded-xl bg-white/90 backdrop-blur-xl dark:bg-black/90 px-6 py-8 sm:w-full h-full mx-auto shadow-2xl">
                            <div className="mx-auto w-full max-w-[380px] sm:max-w-[420px]">
                                <div className="mb-8 text-center">
                                    <h1 className="text-2xl font-extrabold uppercase !leading-snug text-[#0975de] md:text-3xl">Authentication Code</h1>
                                    <p className="text-sm font-bold leading-normal text-gray-700 dark:text-gray-300">Enter your OTP for complete Sign up</p>
                                </div>
                                <form className="space-y-5 dark:text-white" onSubmit={VerifyOTP}>
                                    <div>
                                        <div className="relative text-gray-700 dark:text-gray-300">
                                            <div className="set_padding_form_fild pb-0">
                                                <div className="relative text-white-dark mb-2">
                                                    <Input
                                                        type="number"
                                                        label="ENTER OTP"
                                                        variant="bordered"
                                                        className="max-w-full text-black font-bold"
                                                        onChange={handleOTPChange}
                                                        pattern="[0-9]{6}"
                                                        defaultValue={otpValue.toString()}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <p className='font-bold'>Request for a new OTP : <a href="#!" className='' style={{ color: 'blue', textDecoration: 'underline' }} onClick={resendOTP}>resend</a></p>
                                    <button
                                        color="primary" className="btn btn-primary set_width_btn"
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Please wait...' : 'VERIFY OTP'}
                                    </button>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


export default LoginBoxed;


