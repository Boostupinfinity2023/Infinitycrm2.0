import React, { useState, useEffect, useMemo } from "react";
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { Button, Input } from "@nextui-org/react";
import { useParams } from 'react-router-dom';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { generateJWT } from './JWT';
import { message } from 'antd';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
    type Container,
    type ISourceOptions,
    MoveDirection,
    OutMode,
} from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { APIURL } from '../../APIurl/url';
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



    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState<{ username: string; password: string }>({
        username: '',
        password: '',
    });
    const { forgotpassword } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const [error, setError] = useState('');
    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true);
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
        } else {
            const payload = { useremail: email, password: password };
            const secretKey = 'JwtSecret';
            const currentTimestampInSeconds = Math.floor(Date.now() / 1000);
            const expirationTimestampInSeconds = currentTimestampInSeconds + 20;
            const expiresIn = expirationTimestampInSeconds - currentTimestampInSeconds;

            const token = generateJWT(payload, secretKey, expiresIn);
            token
                .then((JwtToken) => {
                    fetch(APIURL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authenticate: `Bearer ${JwtToken}`,
                        },
                        body: JSON.stringify({
                            newPassword: newPassword,
                            confirmPassword: confirmPassword,
                            forgotpasswordtoken: forgotpassword,
                            PAGE_REQUEST: 'Newpassword.confirmpasswords',
                        }),
                    })
                        .then((res) => {
                            return res.json();
                        })
                        .then((data) => {
                            if (data.status == true) {
                                setIsLoading(false);
                                message.success('Password Changed Successfully');
                                window.location.href = '/';
                            } else {
                                setIsLoading(false);
                                message.error(data.message);
                            }
                        })
                        .catch((err) => {
                            setIsLoading(false);
                            alert(err);
                        });
                })
                .catch((err) => {
                    setIsLoading(false);
                    console.error(err);
                });
        }
    };

    return (
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
                <div className="relative w-full max-w-[360px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[480px] xl:max-w-[500px] h-auto mx-2 sm:mx-4 rounded-xl bg-gradient-to-br from-[#ffffff] via-[#f1f1f1] to-[#e4e4e4] dark:bg-gradient-to-br from-[#0E1726] to-[#1A2436]  overflow-hidden shadow-lg">
                    {/* Card content */}
                    <div className="relative flex flex-col justify-center rounded-xl bg-white/90 backdrop-blur-xl dark:bg-black/90 px-6 py-8 sm:w-full h-full mx-auto shadow-2xl">
                        <div className="mx-auto w-full max-w-[380px] sm:max-w-[420px]">
                            <div className="mb-8 text-center">
                                <h1 className="text-2xl font-extrabold uppercase !leading-snug text-[#0975de] md:text-3xl">Forgot Password</h1>
                                {/* <p className="text-sm font-bold leading-normal text-gray-700 dark:text-gray-300">Enter your email and password to login</p> */}
                            </div>
                            <form className="space-y-5 dark:text-white" onSubmit={submitForm}>
                                <div className="set_padding_form_fild">
                                    <label className="design_label">
                                        New  Password <span className="text-danger">*</span>
                                    </label>
                                    <Input
                                        isRequired
                                        placeholder="Enter your New password"
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        endContent={
                                            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                                {isVisible ? (
                                                    <EyeOutlined className="text-2xl text-default-400 pointer-events-none" />
                                                ) : (
                                                    <EyeInvisibleOutlined className="text-2xl text-default-400 pointer-events-none" />
                                                )}
                                            </button>
                                        }
                                        type={isVisible ? 'text' : 'password'}
                                        className=" bg-white input-login-form"
                                    />
                                </div>
                                <div className="set_padding_form_fild">
                                    <label className="design_label">
                                        Confirm Password <span className="text-danger">*</span>
                                    </label>
                                    <Input
                                        isRequired
                                        placeholder="Enter your Confirm password"
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        endContent={
                                            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                                {isVisible ? (
                                                    <EyeOutlined className="text-2xl text-default-400 pointer-events-none" />
                                                ) : (
                                                    <EyeInvisibleOutlined className="text-2xl text-default-400 pointer-events-none" />
                                                )}
                                            </button>
                                        }
                                        type={isVisible ? 'text' : 'password'}
                                        className=" bg-white input-login-form"
                                    />
                                </div>

                                {error && <p className="text-danger">{error}</p>}
                                <Button
                                    disabled={isLoading}
                                    type="submit"
                                    className="!mt-6 w-full border-0 uppercase shadow-xl btn-primary text-white hover:bg-primary-dark active:bg-primary-dark transition">
                                    {isLoading ? 'Wait...' : 'FORGOT'}
                                </Button>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default LoginBoxed;


