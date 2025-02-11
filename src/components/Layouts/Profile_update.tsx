import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhoneAlt, FaTransgender, FaMapMarkerAlt, FaCreditCard, FaUniversity, FaCodeBranch, FaQrcode } from 'react-icons/fa';
import { BsCalendarDateFill } from "react-icons/bs";
import debounce from 'lodash.debounce';
import jwt from '../../getLoggedUser/GetUserInfomation';
import { GETDATA, UPDATE } from '../../APIurl/url';
import toast, { Toaster } from 'react-hot-toast';

const UserProfile = () => {
    const token = jwt('jwt');
    const [Btnload, setbtnload] = useState(false);
    const [Userimage, Getuserimage] = useState<any>();
    const [profileData, setProfileData] = useState<any>({});

    const handleAvatarChange = (e: any) => {
        const file = e.target.files[0];
        uploadProfileImage(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileData((prevData: any) => ({
                    ...prevData,
                    PROFILE_URL: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setProfileData((prevData: any) => ({
            ...prevData,
            [name]: value
        }));
    };

    const GetprofileData = async () => {
        try {
            const responseData = await fetch(
                GETDATA,
                {
                    method: 'POST',
                    headers: {
                        Authenticate: `Bearer ${token}`,
                        'x-token-access': 'true',
                    },
                    body: JSON.stringify({
                        PAGE_REQUEST: 'PROFILE_DATA_GET',
                    }),
                }
            );
            const data = await responseData.json();
            setProfileData(data.data[0]);
        } catch (err) {
            console.error(err);
        }
    };

    const debouncedGetStudentData = debounce(GetprofileData, 300);

    useEffect(() => {
        debouncedGetStudentData();
    }, []);


    const handleProfileUpdate = async () => {
        setbtnload(true);
        try {
            const response = await fetch(
                UPDATE,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authenticate: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        PAGE_REQUEST: 'PROFILE_DATA_UPDATE',
                        profileData
                    }),
                }
            );
            const result = await response.json();
            if (result.status) {
                toast.success('Profile updated successfully')
            } else {
                alert('Failed to update profile');
            }
        } catch (err) {
            console.error(err);
        }
        setbtnload(false);
    };


    const uploadProfileImage = async (file: any) => {
        setbtnload(true);
        const formData = new FormData();
        formData.append('avatar', file);
        formData.append('PAGE_REQUEST', 'PROFILE_DATA_USER_IMAGE');
        formData.append('ID', profileData?.ID);
        try {
            const response = await fetch(
                UPDATE,
                {
                    method: 'POST',
                    headers: {
                        Authenticate: `Bearer ${token}`,
                    },
                    body: formData,
                }
            );
            const result = await response.json();
            if (result.success) {
                toast.success('Profile updated successfully')
            } else {
                toast.error('Profile updated successfully')

            }
        } catch (err) {
            console.error(err);
        }
        setbtnload(false);
    };


    return (
        <div className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold mb-8 text-center text-primary-600">User Profile</h1>
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3">
                        <div className="mb-6">
                            <img
                                src={profileData.PROFILE_URL != null ? profileData.PROFILE_URL : '/dummy_profile.png'}
                                alt="Profile Avatar"
                                className="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-400 hover:file:bg-primary-100"
                            />
                        </div>
                    </div>

                    <div className="md:w-2/3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="mb-4">
                                <label htmlFor="CLIENT_NAME" className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaUser className="inline mr-2" />
                                    User Name
                                </label>
                                <input
                                    type="text"
                                    id="CLIENT_NAME"
                                    name="CLIENT_NAME"

                                    value={profileData.CLIENT_NAME || ''}
                                    onChange={handleInputChange}
                                    placeholder="Enter your name"
                                    className="p-2 mt-1 block w-full border-b border-black-100 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="CLIENT_EMAIL" className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaEnvelope className="inline mr-2" />
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="CLIENT_EMAIL"
                                    name="CLIENT_EMAIL"
                                    placeholder='Enter your email address'
                                    value={profileData.CLIENT_EMAIL || ''}
                                    onChange={handleInputChange}
                                    className="p-2 mt-1 block w-full border-b border-black-100 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="CONTACT_NUMBER" className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaPhoneAlt className="inline mr-2" />
                                    Mobile Number
                                </label>
                                <input
                                    type="tel"
                                    id="CONTACT_NUMBER"
                                    name="CONTACT_NUMBER"
                                    placeholder='Enter a phone number'
                                    value={profileData.CONTACT_NUMBER || ''}
                                    onChange={handleInputChange}
                                    className="p-2 mt-1 block w-full border-b border-black-100 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="SEX" className="block text-sm font-medium text-gray-700 mb-1">
                                    <FaTransgender className="inline mr-2" />
                                    Gender
                                </label>
                                <select
                                    id="SEX"
                                    name="SEX"
                                    value={profileData.SEX || ''}
                                    onChange={handleInputChange}
                                    className="p-2 mt-1 block w-full border-b border-black-100 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="CONTACT_NUMBER" className="block text-sm font-medium text-gray-700 mb-1">
                                    <BsCalendarDateFill className="inline mr-2" />
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    id="DOB"
                                    name="DOB"
                                    placeholder='Enter Your D.O.B'
                                    value={profileData.DOB || ''}
                                    onChange={handleInputChange}
                                    className="p-2 mt-1 block w-full border-b border-black-100 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="CONTACT_NUMBER" className="block text-sm font-medium text-gray-700 mb-1">
                                    <BsCalendarDateFill className="inline mr-2" />
                                    HIRING_DATE
                                </label>
                                <input
                                    type="date"
                                    id="HIRING_DATE"
                                    name="HIRING_DATE"
                                    placeholder='Enter Your Hire Date'
                                    value={profileData.HIRING_DATE || ''}
                                    onChange={handleInputChange}
                                    className="p-2 mt-1 block w-full border-b border-black-100 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>

                        </div>
                        <div className="mb-4">
                            <label htmlFor="ADDRESS" className="block text-sm font-medium text-gray-700 mb-1">
                                <FaMapMarkerAlt className="inline mr-2" />
                                Address
                            </label>
                            <input

                                type="text"
                                name="ADDRESS"
                                placeholder="Enter address"
                                value={profileData.ADDRESS || ''}
                                onChange={handleInputChange}
                                className="p-2 mt-1 block w-full border-b border-black-100 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </div>
                        <div className="mt-8">
                            <h2 className="text-2xl font-bold mb-4 text-primary-600">Account Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="mb-4">
                                    <label htmlFor="ACCOUNT_NUMBER" className="block text-sm font-medium text-gray-700 mb-1">
                                        <FaCreditCard className="inline mr-2" />
                                        Account Number
                                    </label>
                                    <input
                                        type="text"
                                        id="ACCOUNT_NUMBER"
                                        name="ACCOUNT_NUMBER"
                                        value={profileData.ACCOUNT_NUMBER || ''}
                                        onChange={handleInputChange}
                                        placeholder='Enter Account Number'
                                        className="p-2 mt-1 block w-full border-b border-black-100 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="MOBILE_NUMBER" className="block text-sm font-medium text-gray-700 mb-1">
                                        <FaPhoneAlt className="inline mr-2" />
                                        Account Mobile Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="MOBILE_NUMBER"
                                        name="MOBILE_NUMBER"
                                        value={profileData.MOBILE_NUMBER || ''}
                                        onChange={handleInputChange}
                                        placeholder='Enter Bank  Mobile Number'
                                        className="p-2 mt-1 block w-full border-b border-black-100 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="HOLDER_NAME" className="block text-sm font-medium text-gray-700 mb-1">
                                        <FaUser className="inline mr-2" />
                                        Account Holder Name
                                    </label>
                                    <input
                                        type="text"
                                        id="HOLDER_NAME"
                                        name="HOLDER_NAME"
                                        defaultValue={profileData?.HOLDER_NAME}
                                        onChange={handleInputChange}
                                        placeholder='Enter your account holder name'
                                        className="p-2 mt-1 block w-full border-b border-black-100 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="BANK_NAME" className="block text-sm font-medium text-gray-700 mb-1">
                                        <FaUniversity className="inline mr-2" />
                                        Bank Name
                                    </label>
                                    <input
                                        type="text"
                                        id="BANK_NAME"
                                        name="BANK_NAME"
                                        defaultValue={profileData?.BANK_NAME}
                                        onChange={handleInputChange}
                                        placeholder='Enter Bank Name'
                                        className="p-2 mt-1 block w-full border-b border-black-100 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="BANK_BRANCH" className="block text-sm font-medium text-gray-700 mb-1">
                                        <FaCodeBranch className="inline mr-2" />
                                        Bank Branch
                                    </label>
                                    <input
                                        type="text"
                                        id="BANK_BRANCH"
                                        name="BANK_BRANCH"
                                        defaultValue={profileData?.BANK_BRANCH}
                                        onChange={handleInputChange}
                                        placeholder='Enter Bank Branch'
                                        className="p-2 mt-1 block w-full border-b border-black-100 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="IFSC_CODE" className="block text-sm font-medium text-gray-700 mb-1">
                                        <FaQrcode className="inline mr-2" />
                                        IFSC Code
                                    </label>
                                    <input
                                        type="text"
                                        id="IFSC_CODE"
                                        name="IFSC_CODE"
                                        defaultValue={profileData?.IFSC_CODE}
                                        onChange={handleInputChange}
                                        placeholder='Enter IFSC Code'
                                        className="p-2 mt-1 block w-full border-b border-black-100 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>


                            </div>
                        </div>

                        <div className="mt-8">
                            <button
                                onClick={handleProfileUpdate}
                                className="px-6 py-2 bg-primary-600 text-white font-semibold rounded-md hover:bg-primary-700 focus:outline-none focus:bg-primary-700"
                            >
                                {Btnload == false ? 'Save Profile' : 'Wait..'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
