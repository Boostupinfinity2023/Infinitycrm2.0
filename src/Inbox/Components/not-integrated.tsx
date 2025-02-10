import { useState } from 'react';
import { Mail } from 'lucide-react'
import { Card, CardHeader, CardBody, CardFooter, Button } from "@nextui-org/react";
import jwt from '../../getLoggedUser/GetUserInfomation';

function encrypt(id: any, key: any) {
    const checksum = btoa(id);
    const dataToEncrypt = `${id}:${checksum}`;
    const cipher = [];
    for (let i = 0; i < dataToEncrypt.length; i++) {
        const charCode = dataToEncrypt.charCodeAt(i);
        const keyCode = key.charCodeAt(i % key.length);
        cipher.push(String.fromCharCode(charCode ^ keyCode));
    }
    return btoa(cipher.join(''));
}

export default function NotIntegrated() {
    const [loader, setloader] = useState(false);
    const token = jwt('jwt');
    const currentUrl = window.location.href;
    const encryt = encrypt(`${currentUrl}`, 'Decode');

    const Createaccesstoken = () => {
        setloader(true);
        const authUrl = `https://harmanjeetsinghvirdi.com/InfinityCRM/API/V3/src/Integration/Google_services_backend/helpers/googleAuthHelper.php?jwt=${token}&fallback=${encryt}`;
        const popupWidth = 600;
        const popupHeight = 700;
        const screenWidth = window.innerWidth || document.documentElement.clientWidth || screen.width;
        const screenHeight = window.innerHeight || document.documentElement.clientHeight || screen.height;
        const left = (screenWidth - popupWidth) / 2;
        const top = (screenHeight - popupHeight) / 2;

        const popup = window.open(
            authUrl,
            'GoogleAuthPopup',
            `width=${popupWidth},height=${popupHeight},top=${top},left=${left},scrollbars=yes,resizable=yes`
        );

        // Poll the popup window for changes
        const checkPopupContent = setInterval(() => {
            try {
                if (popup && !popup.closed) {
                    const popupContent = popup.document.body.innerText;
                    try {
                        const response = JSON.parse(popupContent);
                        if (response.status === true &&
                            response.message === "Google Validation Successfully Complete.") {
                            clearInterval(checkPopupContent);
                            popup.close();
                            setloader(false);
                            window.location.reload();
                        }
                    } catch (e) {
                        // Not valid JSON yet, continue polling
                    }
                } else if (popup?.closed) {
                    clearInterval(checkPopupContent);
                    setloader(false);
                    window.location.reload();
                }
            } catch (e: any) {
                // Handle cross-origin errors
                if (e.name === 'SecurityError') {
                    // Do nothing - this is expected when the popup is on a different domain
                }
            }
        }, 500);

        // Cleanup interval when component unmounts
        return () => {
            clearInterval(checkPopupContent);
        };
    };



    return (
        <div className="h-full flex items-center justify-center">
            <Card className="max-w-lg w-full">
                <CardHeader className="text-center">
                    <div>
                        <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                            <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="text-2xl font-semibold">Connect Your Email</div>
                        <div className="text-gray-500 dark:text-gray-400">
                            To use our CRM features, we need permission to access your email
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="space-y-4">
                    <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
                        <h3 className="font-medium mb-2">Why do we need this?</h3>
                        <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                            <li className="flex items-start gap-2">
                                <span className="rounded-full h-5 w-5 flex items-center justify-center bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 text-xs mt-0.5">✓</span>
                                <span>Automatically track customer communications</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="rounded-full h-5 w-5 flex items-center justify-center bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 text-xs mt-0.5">✓</span>
                                <span>Sync important contacts and conversations</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="rounded-full h-5 w-5 flex items-center justify-center bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 text-xs mt-0.5">✓</span>
                                <span>Never miss important client emails</span>
                            </li>
                        </ul>
                    </div>
                    <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-4 text-sm text-blue-600 dark:text-blue-400">
                        We only access your emails to sync with CRM. We never store or read your personal emails.
                    </div>
                </CardBody>
                <CardFooter className="flex flex-col gap-4">
                    <Button
                        className="w-full Connect-gmail"
                        size="lg"
                        onClick={() => {
                            if (!loader) {
                                Createaccesstoken();
                            }
                        }}
                    >
                        {loader ? 'Wait...' : 'Connect Gmail Account'}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}