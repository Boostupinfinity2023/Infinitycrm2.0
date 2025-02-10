import React, { useState, ChangeEvent, FormEvent, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import IconMail from '../../components/Icon/IconMail';
import IconLockDots from '../../components/Icon/IconLockDots';
import { Button, Input, Checkbox } from "@nextui-org/react";
import Google_svg from '../../../public/Image/google.svg';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { generateJWT } from './JWT';
import { message } from 'antd';
import { APIURL } from '../../APIurl/url';
import { Loader2 } from 'lucide-react'
import { auth } from './firebase';
import { GoogleAuthProvider } from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';
import { OAuthCredential } from 'firebase/auth';
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
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        Country: '',
        Branch: '',
    });
    const generateRandomToken = (length: number): string => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let token = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            token += characters[randomIndex];
        }

        return token;
    };

    const [isLoading, setIsLoading] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };
    const handleGoogleSignin = async () => {
        setIsSubmitting(true);
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const username = user.displayName;
            const useremail = user.email;
            const profile = user.photoURL;
            const LocalID = user.uid;
            const credential: OAuthCredential | null = GoogleAuthProvider.credentialFromResult(result);
            const JWTtoken = credential?.idToken;
            if (user.emailVerified == true) {
                fetch(APIURL, {
                    method: 'POST',
                    body: JSON.stringify({
                        IsGoogle: true,
                        Name: username,
                        Email: useremail,
                        Profile: profile,
                        LocalID: LocalID,
                        TOKEN: generateRandomToken(64),
                        PAGE_REQUEST: 'Google_Agent_Singup',
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        Authenticate: `Bearer ${JWTtoken}`,
                    },
                })
                    .then((res) => {
                        return res.json();
                    })
                    .then((data) => {
                        if (data.status == true) {
                            message.success(data.message);

                            setIsSubmitting(false);
                        } else {
                            message.error(data.message);
                            setIsSubmitting(false);
                        }
                    })
                    .catch((error) => {
                        message.error(error);
                        setIsSubmitting(false);
                    });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };


    const submitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const emailInput = document.getElementById('Email') as HTMLInputElement;
        const userEmail = emailInput ? emailInput.value : '';
        const passwordInputvalue = document.getElementById('Password') as HTMLInputElement;
        const passwordInputValues = passwordInputvalue ? passwordInputvalue.value : '';

        const payload = { useremail: userEmail, password: passwordInputValues };
        const secretKey = 'JwtSecret';
        const currentTimestampInSeconds = Math.floor(Date.now() / 1000);
        const expirationTimestampInSeconds = currentTimestampInSeconds + 30;
        const expiresIn = expirationTimestampInSeconds - currentTimestampInSeconds;

        const token = generateJWT(payload, secretKey, expiresIn);
        token
            .then((JwtToken) => {
                setIsSubmitting(true);
                const FORMDATA = Object.fromEntries(Object.entries(formData).filter(([key, value]) => value !== undefined));
                const token = generateRandomToken(64);
                FORMDATA['TOKEN'] = token;
                FORMDATA['PAGE_REQUEST'] = 'Type_Agent_Singup';
                fetch(APIURL, {
                    method: 'POST',
                    body: JSON.stringify(FORMDATA),
                    headers: {
                        'Content-Type': 'application/json',
                        Authenticate: `Bearer ${JwtToken}`,
                    },
                })
                    .then((res) => {
                        return res.json();
                    })
                    .then((data) => {
                        if (data.status == true) {
                            const UserTokenGet = data.access_infomtion;
                            const usertoken = UserTokenGet.usertoken;
                            const useremail = UserTokenGet.useremail;
                            const jwt = UserTokenGet.jwt;
                            navigate(`/user/two-factor/${usertoken}?action=two-factor&jwt=${jwt}&email=${useremail}`);
                            const form = e.target as HTMLFormElement;
                            form.reset();
                        } else {
                            message.error(data.message);
                            setIsSubmitting(false);
                        }
                    })
                    .catch((error) => {
                        message.error(error);
                        setIsSubmitting(false);
                    });
            })
            .catch((err) => {
                console.error(err);
            });
    };
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
                    {/* Main container with smaller width */}
                    <div className="relative w-full max-w-[360px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[480px] xl:max-w-[500px] h-auto mx-2 sm:mx-4 rounded-xl bg-gradient-to-br from-[#ffffff] via-[#f1f1f1] to-[#e4e4e4] dark:bg-gradient-to-br from-[#0E1726] to-[#1A2436]  overflow-hidden shadow-lg">
                        {/* Card content */}
                        <div className="relative flex flex-col justify-center rounded-xl bg-white/90 backdrop-blur-xl dark:bg-black/90 px-6 py-8 sm:w-full h-full mx-auto shadow-2xl">
                            <div className="mx-auto w-full max-w-[380px] sm:max-w-[420px]">
                                <div className="mb-8 text-center">
                                    <h1 className="text-2xl font-extrabold uppercase !leading-snug text-[#0975de] md:text-3xl">Sign up</h1>
                                    <p className="text-sm font-bold leading-normal text-gray-700 dark:text-gray-300">Enter your email and password to Sign up</p>
                                </div>
                                <form className="space-y-5 dark:text-white" onSubmit={submitForm}>
                                    <div className='grid gap-3'>
                                        <div className="set_padding_form_fild_singup">
                                            <label className="design_label">
                                                Name <span className="text-danger">*</span>
                                            </label>
                                            <Input onChange={handleChange} id="Name" type="text" placeholder="Harry Polim" className=" bg-white input-login-form" isRequired />
                                        </div>
                                        <div className="set_padding_form_fild_singup">
                                            <label className="design_label">
                                                Email <span className="text-danger">*</span>
                                            </label>
                                            <Input type="email" id="Email" placeholder="junior@nextui.org" className=" bg-white input-login-form" onChange={handleChange} isRequired />
                                        </div>
                                        <div className="set_padding_form_fild_singup">
                                            <label className="design_label">
                                                Password <span className="text-danger">*</span>
                                            </label>
                                            <Input
                                                id="Password"
                                                onChange={handleChange}
                                                isRequired
                                                placeholder="Enter your password"
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
                                    </div>
                                    <div className="grid grid-cols-6 gap-4">
                                        <div className=" col-span-3">
                                            <Checkbox defaultSelected color="primary">
                                                Remember me
                                            </Checkbox>
                                        </div>
                                    </div>
                                    <Button
                                        disabled={isSubmitting}
                                        type="submit"
                                        className="!mt-6 w-full border-0 uppercase shadow-xl btn-primary text-white hover:bg-primary-dark active:bg-primary-dark transition">
                                        {isSubmitting ? 'Wait...' : 'Sign up with Email'}
                                    </Button>
                                </form>
                                <div className="relative my-7 text-center md:mb-9">
                                    <span className="absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2 bg-gray-300 dark:bg-gray-600"></span>
                                    <span className="relative bg-white px-2 font-bold uppercase text-gray-700 dark:bg-dark dark:text-white">or</span>
                                </div>
                                <div className="mb-10">
                                    <div className="grid gap-4">
                                        {/* Google Login Button */}
                                        <Button
                                            disabled={isSubmitting}
                                            type="button"
                                            onClick={handleGoogleSignin}
                                            className="flex items-center justify-center w-full text-white  transition py-3 rounded-md">
                                            <img src={Google_svg} alt="google-auth-svg" width={20} className="mr-2" />
                                            Continue with Google
                                        </Button>
                                    </div>
                                </div>
                                <div className="text-center dark:text-white">
                                    Already have an account?&nbsp;
                                    <Link to="/" className="uppercase text-primary underline transition hover:text-black dark:hover:text-white">
                                        Log In
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};


export default LoginBoxed;


