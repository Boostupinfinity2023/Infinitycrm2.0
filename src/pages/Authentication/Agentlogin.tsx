import React, { useState, useMemo, useEffect, useCallback } from "react";
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { Button, Input } from "@nextui-org/react";
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
// import { loadAll } from "@tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
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
        // console.log(container);
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


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
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
        e.preventDefault();
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setPassword(e.target.value);
    };
    const handleGoogleSignin = async () => {
        setIsLoading(true);
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const GoogleUser = result.user;
            const useremail = GoogleUser.email;
            const LocalID = GoogleUser.uid;
            const credential: OAuthCredential | null = GoogleAuthProvider.credentialFromResult(result);
            const JWTtoken = credential?.idToken;

            if (GoogleUser.emailVerified == true) {
                fetch(APIURL, {
                    method: 'POST',
                    body: JSON.stringify({
                        IsGoogle: true,
                        email: useremail,
                        Is_Google: true,
                        PAGE_REQUEST: 'Google_Agent_Login_',
                        oauth: LocalID,
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
                        if (data.status == true && data.data[0].LoggedId) {
                            const userdata = data.data[0];

                            function setCookie(name: string, value: string, days: number, path: string = '/', secure: boolean = false) {
                                let expires = '';
                                if (days) {
                                    const date = new Date();
                                    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
                                    expires = '; expires=' + date.toUTCString();
                                }
                                let cookieString = name + '=' + (value || '') + expires + '; path=' + path;

                                if (secure) {
                                    cookieString += '; Secure';
                                }

                                document.cookie = cookieString;
                            }

                            // Set cookies
                            setCookie('USERID', userdata.accessToken, 7, '/');
                            setCookie('SID', userdata.UID, 7, '/');
                            setCookie('PHPSESSION', userdata.LoggedId, 7, '/');
                            setCookie('UserEmail', userdata.Email, 7, '/');
                            setCookie('jwt', userdata.jwt, 7, '/');

                            localStorage.setItem('profileurl', userdata.ProfileUrl);
                            localStorage.setItem('USERID', userdata.LoggedId);
                            localStorage.setItem('SID', userdata.UID);
                            localStorage.setItem('is_admin', userdata.IsAdmin);
                            localStorage.setItem('UserEmail', userdata.Email);
                            localStorage.setItem('auth_token', userdata.accessToken);
                            message.success('Logged In. please wait few seconds...');
                            setTimeout(() => {

                                window.location.href = '/' + userdata.ROLE;
                            }, 1500);
                        } else {
                            setIsLoading(false);
                            message.error(data.data);
                        }
                    })
                    .catch((error) => {
                        setIsLoading(false);
                        message.error(error);
                    });
            }
        } catch (error) {
            setIsLoading(false);
            alert(error);
        }
    };

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true);
        e.preventDefault();

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
                        email: email,
                        password: password,
                        TOKEN: generateRandomToken(64),
                        PAGE_REQUEST: 'Agent_login',
                    }),
                })
                    .then((res) => {
                        return res.json();
                    })
                    .then((data) => {
                        if (data.status == true && data.data[0].LoggedId) {
                            const userdata = data.data[0];
                            function setCookie(name: string, value: string, days: number, path: string = '/', secure: boolean = false) {
                                let expires = '';
                                if (days) {
                                    const date = new Date();
                                    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
                                    expires = '; expires=' + date.toUTCString();
                                }
                                let cookieString = name + '=' + (value || '') + expires + '; path=' + path;

                                if (secure) {
                                    cookieString += '; Secure';
                                }

                                document.cookie = cookieString;
                            }

                            // Set cookies
                            setCookie('USERID', userdata.LoggedId, 7, '/');
                            setCookie('SID', userdata.UID, 7, '/');
                            setCookie('PHPSESSION', userdata.LoggedId, 7, '/');
                            setCookie('UserEmail', userdata.Email, 7, '/');
                            setCookie('jwt', userdata.jwt, 7, '/');

                            localStorage.setItem('profileurl', userdata.ProfileUrl);
                            localStorage.setItem('USERID', userdata.LoggedId);
                            localStorage.setItem('SID', userdata.UID);
                            localStorage.setItem('is_admin', userdata.IsAdmin);
                            localStorage.setItem('UserEmail', userdata.Email);
                            localStorage.setItem('auth_token', userdata.LoggedId);

                            setIsLoading(false);
                            message.success('Logged In. please wait few seconds...');

                            setTimeout(() => {
                                window.location.href = '/' + userdata.ROLE;
                            }, 1500);
                        } else {
                            setIsLoading(false);
                            message.error(data.data);

                        }
                    })
                    .catch((err) => {
                        setIsLoading(false);
                        message.error(err);
                        alert(err);
                    });
            })
            .catch((err) => {
                setIsLoading(false);
                message.error(err);
            });
    };


    const [Tokentrue, Settokentrue] = useState(false);

    const getCookie = (name: any) => {
        const cookieString = document.cookie;
        const cookies = cookieString.split('; ');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].split('=');
            if (cookie[0] === name) {
                return cookie[1];
            }
        }
        return null;
    };

    const TokenData = getCookie('jwt');

    const UserValition = async () => {
        fetch(`https://jwt-brown.vercel.app/validate-token?token=${TokenData}`, {
            method: 'GET'
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.isValid !== true) {
                    Settokentrue(true);
                    // window.location.href = '/auth/agent/signin';
                } else {
                    Settokentrue(false);
                    window.location.href = '/' + data.data.ROLE;
                }
                // setuserdata(data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        UserValition();
    }, []);


    return (
        <>
            {Tokentrue === false ? (
                <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
                    <div className="bg-card text-card-foreground rounded-lg shadow-lg p-6 max-w-sm w-full mx-4">
                        <div className="flex flex-col items-center space-y-4">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            <p className="text-lg font-medium">Checking authentication...</p>
                            <p className="text-sm text-muted-foreground text-center">
                                Please wait while we verify your credentials.
                            </p>
                        </div>
                    </div>
                </div>
            ) :
                <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500">
                    {init ?
                        <Particles
                            id="tsparticles"
                            particlesLoaded={particlesLoaded}
                            options={options}
                        /> : ''
                    }
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05')] bg-cover bg-center opacity-20">  </div>
                    {/* Main container with smaller width */}
                    <div className="absolute inset-0 h-full w-full flex items-center justify-center">
                        <div className="relative w-full max-w-[360px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[480px] xl:max-w-[500px] h-auto mx-2 sm:mx-4 rounded-xl bg-gradient-to-br from-[#ffffff] via-[#f1f1f1] to-[#e4e4e4] dark:bg-gradient-to-br from-[#0E1726] to-[#1A2436]  overflow-hidden shadow-lg">
                            {/* Card content */}
                            <div className="relative flex flex-col justify-center rounded-xl bg-white/90 backdrop-blur-xl dark:bg-black/90 px-6 py-8 sm:w-full h-full mx-auto shadow-2xl">
                                <div className="mx-auto w-full max-w-[380px] sm:max-w-[420px]">
                                    <div className="mb-8 text-center">
                                        <h1 className="text-2xl font-extrabold uppercase !leading-snug text-[#0975de] md:text-3xl">Sign in</h1>
                                        <p className="text-sm font-bold leading-normal text-gray-700 dark:text-gray-300">Enter your email and password to login</p>
                                    </div>
                                    <form className="space-y-5 dark:text-white" onSubmit={submitForm}>
                                        <div>
                                            <div className="relative text-gray-700 dark:text-gray-300">
                                                <div className="set_padding_form_fild pb-0">
                                                    <label className="design_label">
                                                        Email <span className="text-danger">*</span>
                                                    </label>
                                                    <Input type="email" placeholder="junior@nextui.org" className=" bg-white input-login-form" onChange={handleEmailChange} />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="relative text-gray-700 dark:text-gray-300">
                                                <div className="set_padding_form_fild">
                                                    <label className="design_label">
                                                        Password <span className="text-danger">*</span>
                                                    </label>
                                                    <Input
                                                        onChange={handlePasswordChange}
                                                        required
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


                                        </div>
                                        <Button
                                            disabled={isLoading}
                                            type="submit"
                                            className="!mt-6 w-full border-0 uppercase shadow-xl btn-primary text-white hover:bg-primary-dark active:bg-primary-dark transition">
                                            {isLoading ? 'Authenticating...' : 'Sign In with Email'}
                                        </Button>

                                        <div className="col-span-3">
                                            <NavLink to="/forgotpassword" className="text-blue-500 textSize">
                                                Forgot password?
                                            </NavLink>
                                        </div>
                                    </form>
                                    <div className="relative my-7 text-center md:mb-9">
                                        <span className="absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2 bg-gray-300 dark:bg-gray-600"></span>
                                        <span className="relative bg-white px-2 font-bold uppercase text-gray-700 dark:bg-dark dark:text-white">or</span>
                                    </div>
                                    <div className="mb-10 md:mb-[60px]">
                                        <div className="grid gap-4">
                                            {/* Google Login Button */}
                                            <Button
                                                disabled={isLoading}
                                                type="button"
                                                onClick={handleGoogleSignin}
                                                className="flex items-center justify-center w-full text-white  transition py-3 rounded-md">
                                                <img src={Google_svg} alt="google-auth-svg" width={20} className="mr-2" />
                                                Continue with Google
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="text-center dark:text-white">
                                        Don't have an account?&nbsp;
                                        <Link to="/signup" className="uppercase text-primary underline transition hover:text-black dark:hover:text-white">
                                            SIGN UP
                                        </Link>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            }
        </>
    );
};


export default LoginBoxed;


