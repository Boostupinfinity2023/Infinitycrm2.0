import React from 'react';
import './client.css';
import type { TabsProps } from 'antd';
import { Card } from 'antd';
import { Button, Modal } from 'antd';
import { Col, Divider, Row, Alert, Popover, Checkbox, Drawer, message } from 'antd';
import { Select, Input } from 'antd';
import MuiPhoneNumber from 'mui-phone-number';
import { useEffect, useState, useCallback } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
const { TextArea } = Input;
import { InboxOutlined } from '@ant-design/icons';
import { Tabs, Tab } from "@nextui-org/tabs";
import { Upload } from 'antd';
const { Dragger } = Upload;
import { useDispatch, useSelector } from 'react-redux';
import { v1GETDATA } from '../../../APIurl/url';
import { INSERTDATA } from '../../../APIurl/url';
import { v1DELETE } from '../../../APIurl/url';
import { v1DOCUMENT } from '../../../APIurl/url';
import Token from '../../../getLoggedUser/GetUserInfomation';
import { Chip } from '@nextui-org/chip';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import EditModal from './Edit_SchoolModal';
import ADDCOMMENT from './CommentSection';
import Totalapplication from './TotalApplication';
import Servicelist from './Application/services_list';
import AddCountry from './helper/Addcountry';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { debounce } from 'lodash';

const SchoolCard = ({ index, countries, onRemove, onRefresh }: any) => {

    const { client_id } = useParams();
    const { encrypt_id } = useParams();
    const token = Token('jwt');
    const [sccountries, setscCountries] = useState([]);
    ;

    const fetchCountryDatasc = debounce(async () => {
        const res = await fetch('/country.json');
        const data = await res.json();
        const countryOptions = data.countries.map((country: any) => ({
            value: country.name,
            label: country.name,
            id: country.id,
        }));
        setscCountries(countryOptions);
    }, 300);

    useEffect(() => {
        fetchCountryDatasc();
        return () => {
            fetchCountryDatasc.cancel();
        };
    }, []);



    const handleRemove = (index: any) => {
        onRemove(index);
    };

    //query to submit form
    const [SchoolformData, setschoolFormData] = useState({});
    const [SchoolformLoad, setSchoolformLoad] = useState(false);
    //handal select
    function Selectschoolcountry(name: any, value: any) {
        setschoolFormData({
            ...SchoolformData,
            [name]: value,
        });

    }

    //handal change of input
    function handalchange(name: any, value: any) {
        setschoolFormData({
            ...SchoolformData,
            [name]: value,
        });

    }


    const handleDateChange = (name: any, value: any) => {
        setschoolFormData({
            ...SchoolformData,
            [name]: value,
        });
    };


    //submit funcation
    const handalschoolform = async (index: any) => {
        if (Object.keys(SchoolformData).length === 0 && SchoolformData.constructor === Object) {
            message.warning('Are you looking for an update schools attended session but can`t update profile?');

        } else {
            setSchoolformLoad(true);
            // Update formData with additional data
            const updatedFormData = {
                ...SchoolformData,
                'PAGE_REQUEST': 'STUDENT_PROFILE_FILE_SCHOOL_DATA',
                'ClientId': client_id,
                'Encrypt_id': encrypt_id,
            };

            try {
                const res = await fetch(`${INSERTDATA}?action=Fileupdateadd&fileTransfer=true&isAgree=true`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authenticate: `Bearer ${token}`,
                        'x-crros-access': 'true',
                    },
                    body: JSON.stringify(updatedFormData),
                });

                const data = await res.json();

                if (data.status === true) {
                    setSchoolformLoad(false);
                    // setschoolFormData({});
                    handleRemove(index);
                    sessionStorage.setItem('studentdataloader', 'true');
                    message.success('Schools Attended data Added');
                    onRefresh();
                } else if (data.status === false) {
                    setSchoolformLoad(false);
                    message.error(data.message);
                } else {
                    setSchoolformLoad(false);
                    message.error('Error Query.Please Refresh Page And Try Again');
                }
            } catch (error) {
                setSchoolformLoad(false);
                message.error('Failed to submit data. Please try again later.');
            }
        }
    }

    return (
        <div className="school-card">
            <Row gutter={12} className='tbmobset'>
                <Col span={8} className="lainset">
                    <div>
                        <label htmlFor={`country-${index}`} className="font-size-12 flex">
                            Country of Institution <span className="text-danger">*</span>
                            <Popover placement="topRight" content={'Type Country Name (First Letter Capital)'}>
                                <span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-[20px] ml-3 text-danger"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                    </svg>
                                </span>
                            </Popover>
                        </label>
                        <Select
                            className="w-[100%]"
                            showSearch
                            style={{ height: 36 }}
                            placeholder="Type Country Name (First Letter Capital)"
                            optionFilterProp="children"
                            filterOption={(input: any, option: any) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={sccountries}
                            onChange={(value) => Selectschoolcountry('SCHOOLSATTENDED[COUNTRY_OF_INSTITUTION]', value)}
                        />
                    </div>
                </Col>
                <Col span={8} className="lainset">
                    <div>
                        <label htmlFor={`institution-${index}`} className="font-size-12">
                            Name of Institution <span className="text-danger">*</span>
                        </label>
                        <input
                            id={`institution-${index}`}
                            type="text"
                            name="Education[nameofinstitution]"
                            placeholder="Institution"
                            className="form-input design_input"
                            onChange={(event) => handalchange('SCHOOLSATTENDED[NAME_OF_INSTITUTION]', event.target.value)}
                        />
                    </div>
                </Col>
                <Col span={8} className="lainset">
                    <div>
                        <label htmlFor={`level-${index}`} className="font-size-12">
                            Level of Education <span className="text-danger">*</span>
                        </label>
                        <input
                            id={`level-${index}`}
                            type="text"
                            placeholder="Level"
                            name="Education[level_education]"
                            className="form-input design_input"
                            onChange={(event) => handalchange('SCHOOLSATTENDED[LEVEL_OF_EDUCATION]', event.target.value)}
                        />
                    </div>
                </Col>
            </Row>
            <Row gutter={12} className="mt-4 tbmobset">
                <Col span={8} className="lainset">
                    <div>
                        <label htmlFor={`language-${index}`} className="font-size-12">
                            Primary Language of Instruction <span className="text-danger">*</span>
                        </label>
                        <input
                            id={`language-${index}`}
                            type="text"
                            placeholder="Language"
                            name="Education[primary_instruction_language]"
                            className="form-input design_input"
                            onChange={(event) => handalchange('SCHOOLSATTENDED[PRIMARY_LANGUAGE_OF_INSTRUCTION]', event.target.value)}
                        />
                    </div>
                </Col>
                <Col span={8} className="lainset">
                    <div>
                        <label htmlFor={`from-${index}`} className="font-size-12">
                            Attended Institution From <span className="text-danger">*</span>
                        </label>
                        <Flatpickr
                            placeholder='Attended From'
                            options={{ dateFormat: 'Y-m-d' }}
                            className="form-input design_input"
                            onChange={(date: any) => {
                                const selectedDate = new Date(date);
                                selectedDate.setMinutes(selectedDate.getMinutes() - selectedDate.getTimezoneOffset());
                                handleDateChange('SCHOOLSATTENDED[ATTENDED_FROM]', selectedDate.toISOString().split('T')[0]);
                            }}


                        />
                    </div>
                </Col>
                <Col span={8} className="lainset">
                    <div>
                        <label htmlFor={`to-${index}`} className="font-size-12">
                            Attended Institution To <span className="text-danger">*</span>
                        </label>
                        <Flatpickr
                            placeholder='Attended To'
                            options={{ dateFormat: 'Y-m-d' }}
                            className="form-input design_input"
                            onChange={(date: any) => {
                                const selectedDate = new Date(date);
                                selectedDate.setMinutes(selectedDate.getMinutes() - selectedDate.getTimezoneOffset());
                                handleDateChange('SCHOOLSATTENDED[ATTENDED_TO]', selectedDate.toISOString().split('T')[0]);
                            }}


                        />

                    </div>
                </Col>
            </Row>
            <Row gutter={12} className="mt-4 tbmobset">
                <Col span={8} className="lainset">
                    <div>
                        <label htmlFor={`degree-${index}`} className="font-size-12">
                            Degree Name
                        </label>
                        <input
                            id={`degree-${index}`}
                            type="text"
                            placeholder="Degree"
                            className="form-input design_input"
                            name="Education[dgree_name]"
                            onChange={(event) => handalchange('SCHOOLSATTENDED[DEGREE_NAME]', event.target.value)}
                        />
                    </div>
                </Col>
            </Row>
            <Row gutter={12} className="mt-4 tbmobset">
                <Col span={8} className="lainset">
                    <div>
                        <label className="font-size-12">
                            I have graduated from this institution <span className="text-danger">*</span>
                        </label>
                        <div>
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    name={`Education[graduated_of_institution]`}
                                    className="form-radio design_modal_check_box"
                                    value='1'
                                    onChange={(event) => handalchange('SCHOOLSATTENDED[DID_NOT_GRADUATE]', event.target.value)}

                                />
                                <span className="text-white-dark">Yes</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    name={`Education[graduated_of_institution]`}
                                    className="form-radio design_modal_check_box"
                                    value='0'
                                    onChange={(event) => handalchange('SCHOOLSATTENDED[DID_NOT_GRADUATE]', event.target.value)}
                                />
                                <span className="text-white-dark">No</span>
                            </label>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row gutter={12} className="mt-4 tbmobset">
                <Col span={8} className="lainset">
                    <div>
                        <label htmlFor={`graduation-date-${index}`} className="font-size-12">
                            Graduation Date
                        </label>

                        <Flatpickr
                            placeholder='Attended From'
                            options={{ dateFormat: 'Y-m-d' }}
                            className="form-input design_input"
                            onChange={(date: any) => {
                                const selectedDate = new Date(date);
                                selectedDate.setMinutes(selectedDate.getMinutes() - selectedDate.getTimezoneOffset());
                                handleDateChange('SCHOOLSATTENDED[GRADUATION_DATE]', selectedDate.toISOString().split('T')[0]);
                            }}


                        />
                    </div>
                </Col>
            </Row>
            <Row gutter={12} className="mt-4 tbmobset">
                <Col span={8} className="lainset">
                    <div>
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="form-checkbox"
                                name="Education[i_have_physical_certificate]"
                                onChange={(event) => handalchange('SCHOOLSATTENDED[PHYSICAL_CERTIFICATE]', event.target.checked)}

                            />I have the physical certificate for this degree
                        </label>
                    </div>
                </Col>
            </Row>
            <Row gutter={12} className="mt-4 tbmobset">
                <Col span={8} className="lainset">
                    <div>
                        <label htmlFor={`address-${index}`} className="font-size-12">
                            Address <span className="text-danger">*</span>
                        </label>
                        <input
                            id={`address-${index}`}
                            type="text"
                            placeholder="Address"
                            className="form-input design_input"
                            name="Education[Address]"
                            onChange={(event) => handalchange('SCHOOLSATTENDED[ADDRESS]', event.target.value)}
                        />
                    </div>
                </Col>
                <Col span={8} className="lainset">
                    <div>
                        <label htmlFor={`city-${index}`} className="font-size-12">
                            City/Town <span className="text-danger">*</span>
                        </label>
                        <input
                            id={`city-${index}`}
                            type="text"
                            placeholder="City/Town"
                            className="form-input design_input"
                            name="Education[city]"
                            onChange={(event) => handalchange('SCHOOLSATTENDED[CITY]', event.target.value)}
                        />
                    </div>
                </Col>
                <Col span={8} className="lainset">
                    <div>
                        <label htmlFor={`state-${index}`} className="font-size-12">
                            Province/State <span className="text-danger">*</span>
                        </label>
                        <input
                            id={`state-${index}`}
                            type="text"
                            placeholder="Province/State"
                            className="form-input design_input"
                            name="Education[sate]"
                            onChange={(event) => handalchange('SCHOOLSATTENDED[PROVINCE]', event.target.value)}
                        />
                    </div>
                </Col>
            </Row>
            <Row gutter={12} className="mt-4 tbmobset">
                <Col span={8} className="lainset">
                    <div>
                        <label htmlFor={`postal-${index}`} className="font-size-12">
                            Postal/Zip Code
                        </label>
                        <input
                            id={`postal-${index}`}
                            type="text"
                            placeholder="Postal/Zip Code"
                            className="form-input design_input"
                            name="Education[ZipCode]"
                            onChange={(event) => handalchange('SCHOOLSATTENDED[POSTAL_CODE]', event.target.value)}
                        />
                    </div>
                </Col>
            </Row>
            <div className="button-save">
                <button
                    className="btn education-btn danger-btn"
                    onClick={() => {
                        handleRemove(index);
                    }}
                >
                    Cancel
                </button>
                <button
                    onClick={() => {
                        handalschoolform(index);
                    }}
                    className="btn education-btn btn-primary"

                    disabled={(SchoolformLoad == true ? true : false)}
                >
                    {SchoolformLoad == true ? '...Wait' : 'Save'}
                </button>
            </div>
            <Divider />
        </div>
    );
};

export default function StudentapplicationManager() {
    const [refreshquery, setrefreshquery] = useState(false);
    const { client_id } = useParams();
    const { encrypt_id } = useParams();
    const JwtToken = Token('jwt');
    const MySwal = withReactContent(Swal);
    const [clientData, setClientData]: any = useState([]);

    const [LoadPage, setPagelog] = useState(false);
    const [loaderdata, setLoaderData] = useState(false);

    // Get Data Client In backend server
    const fetchClientData = useCallback(debounce(async () => {
        const payload = { REQUEST: 'STUDENT_DATA', is_Admin: false, isValid: true };
        const secretKey = 'JwtSecret';
        const currentTimestampInSeconds = Math.floor(Date.now() / 1000);
        const expirationTimestampInSeconds = currentTimestampInSeconds + 20;
        const expiresIn = expirationTimestampInSeconds - currentTimestampInSeconds;

        try {
            const responseData = await fetch(v1GETDATA + '?action=view.client.record', {
                method: 'POST',
                headers: {
                    Authenticate: `Bearer ${JwtToken}`,
                    'x-token-access': 'true',
                },
                body: JSON.stringify({
                    PAGE_REQUEST: 'STUDENT_DATA_VIEW_FULL_RECORD',
                    RequesterUser: 'agent',
                    ClientId: client_id,
                    Encrypt_id: encrypt_id,
                }),
            });
            const data = await responseData.json();
            setClientData(data.data);
            setPagelog(true);
            setLoaderData(true);
            setrefreshquery(false);
        } catch (err) {
            console.error(err);
            setPagelog(true);
        }
    }, 500), [client_id, encrypt_id, JwtToken, v1GETDATA]);

    useEffect(() => {
        fetchClientData();
        return () => {
            fetchClientData.cancel();
        };
    }, [refreshquery, fetchClientData]);

    const onChange = (key: string) => {
        (key == 'profile-font-tab-4') ? setOpen(true) : setOpen(false);
    };
    const items: TabsProps['items'] = [
        {
            key: 'profile-font-tab',
            label: 'Profile',
            style: { fontSize: '16px' },
            className: 'f-popping',
        },
        {
            key: 'profile-font-tab-4',
            label: 'Application History',
            className: 'tab-style f-popping',
        },
    ];
    function hanldephonenumber() {
        console.log('okay');
    }

    const [countries, setCountries] = useState([]);
    const [states, setstates] = useState([]);
    const [ExamData, setExamData] = useState([]);

    const fetchCountryData = debounce(async () => {
        const res = await fetch('/country.json');
        const data = await res.json();
        const countryOptions = data.countries.map((country: any) => ({
            value: country.name,
            label: country.name,
            id: country.id,
        }));
        setCountries(countryOptions);
    }, 300);

    const fetchExamData = debounce(async () => {
        const res = await fetch('/Exam.json');
        const data = await res.json();
        const ExamDataOption = data.map((Exams: any, index: number) => ({
            id: index + 1,
            value: Exams.value,
            label: Exams.value,
        }));
        setExamData(ExamDataOption);
    }, 300);

    useEffect(() => {
        fetchCountryData();
        return () => {
            fetchCountryData.cancel();
        };
    }, []);

    useEffect(() => {
        fetchExamData();
        return () => {
            fetchExamData.cancel();
        };
    }, []);



    const dispatch = useDispatch();
    const isRtl = useSelector((state: any) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [date1, setDate1] = useState<any>('');
    const today = new Date();



    const [GRE_EXAM_VIEW, setGRE_EXAM_VIEW] = useState(false);
    const [GMAT_EXAM_VIEW, setGMAT_EXAM_VIEW] = useState(false);


    const options: any = [
        {
            value: "I don't Have This",
            label: "I don't Have This",
        },
        {
            value: 'USA F1 Visa',
            label: 'USA F1 Visa',
        },
        {
            value: 'Canadian Study Permit Or Visitor Visa',
            label: 'Canadian Study Permit Or Visitor Visa',
        },
        {
            value: 'UK Student Visa (Tier 4) or Short Term Study Visa',
            label: 'UK Student Visa (Tier 4) or Short Term Study Visa',
        },
        {
            value: 'Austrialian Student Visa',
            label: 'Austrialian Student Visa',
        },
        {
            value: 'Irish Stamp 2',
            label: 'Irish Stamp 2',
        },
    ];
    const [VisaPermitValue, setVisaPermitValue] = useState<any>([]);
    function VisaAmdPeritCheck(e: any) {
        if (e.target.value === 'dont-show') {
            setVisaPermitValue([
                {
                    value: 'dont-show',
                    label: "I Don't Have This",
                },
            ]);
        }
    }
    const handleRefresh = () => {
        setrefreshquery(true);
    };
    const removeCard = (indexToRemove: any) => {
        setSchoolCards((prevCards) => prevCards.filter((_, index) => index !== indexToRemove));
    };
    const [schoolCards, setSchoolCards] = useState([<SchoolCard key={0} index={0} countries={[]} onRemove={removeCard} onRefresh={handleRefresh} />]);
    const addMoreCards = () => {
        const newIndex = schoolCards.length;
        setSchoolCards([...schoolCards, <SchoolCard key={newIndex} index={newIndex} countries={countries} onRemove={removeCard} onRefresh={handleRefresh} />]);
    };


    const [open, setOpen] = useState(false);
    //fetch State

    const [StateValue, selectStateValue] = useState('');
    const SelectCountry = async (Name: any, e: any) => {
        const value = await e;
        setstates([]);
        selectStateValue('');
        const selectedCountry: any = countries.find((country: any) => country.value === value);
        const CountryId = (selectedCountry && selectedCountry.id) || '';
        const CityData: any = await fetch('/states.json');
        const cityData = await CityData.json();
        const cityRecord = cityData.states;
        const filteredCities = cityRecord.filter((city: any) => city.country_id == CountryId);
        const CitysOptions = filteredCities.map((sates: any) => ({
            value: sates.name,
            label: sates.name,
        }));
        setstates(CitysOptions);
        setFormData({
            ...formData,
            [Name]: value,
        });
    };




    // formdata
    const [ExamView, setExamView] = useState('');
    const [Graduated_data, Set_Graduated] = useState(false);
    const [formData, setFormData] = useState({});
    const [confirmation, setConfirmation] = useState(false);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [openmodal, setOpenmodal] = React.useState<boolean>(false);
    const [fileList, setFileList] = useState({});
    const handleChange = (e: any) => {
        let object = JSON.parse(e);
        let key = Object.keys(object)[0];
        let value = object[key];
        setFormData({
            ...formData,
            [key]: value,
        });
    };
    //test scored select query
    function selectExamData(name: any, e: any) {
        setFormData({
            ...formData,
            [name]: e,
        });
        setExamView(e);
    }

    //GMAT AND GRE funcation
    function Graduated(name: any, e: any) {
        setFormData({
            ...formData,
            [name]: e.target.checked,
        });
        Set_Graduated(e.target.checked);
    }

    function GRE_exam(name: any, e: any) {
        setFormData({
            ...formData,
            [name]: e.target.checked,
        });
        setGRE_EXAM_VIEW(e.target.checked);
    }

    function GMAT_exam(name: any, e: any) {
        setFormData({
            ...formData,
            [name]: e.target.checked,
        });
        setGMAT_EXAM_VIEW(e.target.checked);
    }

    const handleSelectChange = (name: any, value: any) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handlePhoneChange = (colName: any, value: any) => {
        setFormData({
            ...formData,
            [colName]: value,
        });
    };



    const handalfileupload = async (options: any, ID: any, DOC_ID: any) => {
        const { onSuccess, onError, file } = options;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('PAGE_REQUEST', 'STUDENT_PROFILE_FILE_UPLOADED');
        formData.append('ClientId', client_id || '');
        formData.append('ID', ID || '');
        formData.append('DOC_ID', DOC_ID || '');
        try {
            const res = await fetch(`${v1DOCUMENT}?action=Fileupdateadd&fileTransfer=true&isAgree=true`, {
                method: 'POST',
                headers: {
                    // 'Content-Type': 'application/json',
                    Authenticate: `Bearer ${JwtToken}`,
                    'x-crros-access': 'true',
                },
                body: formData,
            });

            const data = await res.json();
            if (data.status == true) {
                onSuccess("Ok");
                setrefreshquery(true);
                message.success('Document updated successfully');
            } else {
                onError("Error");
                message.error(data.message);
            }
        } catch (error) {
            onError(error);

        }
    };



    const validateFile = (file: any) => {
        const isAcceptedFormat = file.type === 'application/pdf' || file.type === 'image/jpeg' || file.type === 'image/png';
        const isWithinSizeLimit = file.size / 1024 / 1024 < 2;

        if (!isAcceptedFormat) {
            alert('Invalid file format. Acceptable formats are PDF, JPEG, or PNG.');
            return Upload.LIST_IGNORE;
        }
        if (!isWithinSizeLimit) {
            alert('File size exceeds the limit of 2MB.');
            return Upload.LIST_IGNORE;
        }
        return true;
    };





    const handleSubmit = () => {
        if (Object.keys(formData).length === 0 && formData.constructor === Object) {

            message.warning("Are you looking for an update but can`t update profile ?");
        } else {
            handleModalSubmit();
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 2000);

        }
    };

    const handleModalSubmit = async () => {

        // Update formData with additional data
        const updatedFormData = {
            ...formData,
            'PAGE_REQUEST': 'STUDENT_PROFILE_FILE',
            'ClientId': client_id,
            'Encrypt_id': encrypt_id,
        };

        try {
            const res = await fetch(`${INSERTDATA}?action=Fileupdateadd&fileTransfer=true&isAgree=true`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authenticate: `Bearer ${JwtToken}`,
                    'x-crros-access': 'true',
                },
                body: JSON.stringify(updatedFormData),
            });

            const data = await res.json();

            if (data.status === true) {
                sessionStorage.setItem('studentdataloader', 'true');
                setOpenmodal(false);
                setrefreshquery(true);
                message.success("Profile updated successfully");
                setFormData({});

            } else if (data.status === false) {
                message.error(data.message);
            } else {
                message.error('Error Query. Please Refresh Page And Try Again');
            }
        } catch (error) {
            message.error('Failed to submit data. Please try again later.');
        }
    };


    // handal delete school data
    const deleteschooldata = (ID: any) => {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            reverseButtons: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await fetch(`${v1DELETE}?action=Fileupdateadd&fileTransfer=true&isAgree=true`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authenticate: `Bearer ${JwtToken}`,
                        'x-crros-access': 'true'
                    },
                    body: JSON.stringify({
                        'PAGE_REQUEST': 'STUDENT_PROFILE_FILE',
                        'ClientId': client_id,
                        'Encrypt_id': encrypt_id,
                        'SCHOOLSATTENDEDID': ID,
                    }),
                });

                const data = await res.json();

                if (data.status === true) {
                    sessionStorage.setItem('studentdataloader', 'true');
                    setrefreshquery(true);
                    message.success('Schools Attended Data Deleted Successfully');
                } else if (data.status === false) {
                    // Show error message
                    message.error(data.message);
                } else {
                    // Show generic error message
                    message.error('Error Query. Please Refresh Page And Try Again');
                }



            }
        });
    }

    //modal show after click save

    const showLoading = () => {
        setOpenmodal(true);
        setLoading(true);

        // Simple loading mock. You should add cleanup logic in real world.
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    //Add defulrt value in usestate
    useEffect(() => {
        if (loaderdata === true && clientData.length > 0 && clientData[0].TESTSCORESSUMMARY) {
            const testScoresSummary = JSON.parse(clientData[0].TESTSCORESSUMMARY);
            if (testScoresSummary.length > 0 && testScoresSummary[0].COUNTRY_OF_INSTITUTION) {
                setExamView(testScoresSummary[0].COUNTRY_OF_INSTITUTION);
            } else {
                setExamView('');
            }
        } else {
            setExamView('');
        }

        (loaderdata == true) ?
            clientData[0].HAS_GRE_SCORES == '1' ?
                setGRE_EXAM_VIEW(true)
                :
                setGRE_EXAM_VIEW(false)
            :
            setGRE_EXAM_VIEW(false);


        (loaderdata == true) ?
            clientData[0].HAS_GMAT_SCORES == '1' ?
                setGMAT_EXAM_VIEW(true)
                :
                setGMAT_EXAM_VIEW(false)
            :
            setGMAT_EXAM_VIEW(false);
    }, [loaderdata])



    //edit modal query to open and close the modal
    const [openModalEdit, setModalOpenEdit] = useState(false);
    const [selectedSchoolID, setSelectedSchoolID] = useState(null);
    const openEditModal = (ID: any) => {
        setSelectedSchoolID(ID);
        setModalOpenEdit(true);
    };

    const closeModal = () => {
        setModalOpenEdit(false);
    };




    //date convert

    const convertDate = (inputDate: any) => {
        const date = new Date(inputDate);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
    };
    const [activeTab, setActiveTab] = useState("");


    const handleTabChange = (key: string) => {
        setActiveTab(key);
        const hashMap: { [key: string]: string } = {
            Profile: "#person",
            Comment: "#Comment",
            Applications: "#Applications",
            Lead: "#lead",
            education: "#education"
        };
        window.location.hash = hashMap[key] || "#person";
        // scrollToSection(hashMap[key] || "#person");
    };

    // const scrollToSection = (id: string) => {
    //     const element = document.querySelector(id);
    //     if (element) {
    //         element.scrollIntoView({ behavior: "smooth" });
    //     }
    // };

    // useEffect(() => {
    //     const handleHashChange = () => {
    //         const hash = window.location.hash;
    //         scrollToSection(hash);
    //     };

    //     // Check the hash on initial load
    //     handleHashChange();

    //     // Add a hash change listener
    //     window.addEventListener("hashchange", handleHashChange);

    //     // Cleanup listener on component unmount
    //     return () => window.removeEventListener("hashchange", handleHashChange);
    // }, []);
    const [currentTab, setcurrentTab] = useState('helo')
    return (
        <>
            {LoadPage === false ? (
                <div className="text-center">
                    <Chip size="sm">data load. please wait...</Chip>
                </div>
            ) : (
                <>

                    <div className="header-section">
                        <div className="header-section-div">
                            <div className="profile-section">
                                <div className="flex">
                                    <div className="avatar">
                                        <div className="user-icon f-popping">{clientData[0].FIRST_NAME.charAt(0)}</div>
                                    </div>

                                    <div className="mt-4 ml-5 f-popping">
                                        <div className="user-name">
                                            <span className="user-name-section f-popping">{clientData[0].FIRST_NAME + ' ' + clientData[0].MIDDLE_NAME + ' ' + clientData[0].LAST_NAME}</span>
                                        </div>
                                        <div className="information-section mt-2">
                                            <span className="text-black-important f-popping">{clientData[0].UUID}</span>
                                            <span className="info-separator">|</span>
                                            <span className="info-item">
                                                <a href="#" className="f-popping">
                                                    {clientData[0].EMAIL}
                                                </a>
                                            </span>
                                            <span className="info-separator">|</span>
                                            <span className="info-item">
                                                <a href="#">{clientData[0].PHONE_NUMBER}</a>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="Tab-Section">
                        <Tabs aria-label="Options" className='set_tabs_info' selectedKey={activeTab} onSelectionChange={(e: any) => handleTabChange(e)}>
                            <Tab key="Profile" title="Profile">

                                <>
                                    {openModalEdit && <EditModal onClose={closeModal} schoolID={selectedSchoolID} client_id={client_id} encrypt_id={encrypt_id} />}
                                    <div className="GeneralInformationPage f-popping" data-submit="SubmitGeneralInformationPage">

                                        <div className="tab-section">

                                        </div>

                                        {/* <div className="step-style">
                                    <Steps
                                        items={[
                                            {
                                                title: 'General Information',
                                                status: 'finish',
                                                icon: <FileDoneOutlined />,
                                                className: 'step-style',
                                            },
                                            {
                                                title: 'Education History',
                                                status: 'finish',
                                                icon: <IdcardOutlined />,
                                                className: 'step-style',
                                            },
                                            {
                                                title: 'Test Scores',
                                                status: 'wait',
                                                icon: <ReadOutlined />,
                                                className: 'step-style',
                                            },
                                            {
                                                title: 'Background Information',
                                                status: 'wait',
                                                icon: <ContainerOutlined />,
                                                className: 'step-style',
                                            },
                                            {
                                                title: 'Upload Document',
                                                status: 'wait',
                                                icon: <FilePdfOutlined />,
                                                className: 'step-style f-popping',
                                            },
                                        ]}
                                    />
                                </div> */}
                                        <div className="registration-infomation">
                                            <span className="heading-regisration f-popping">Registration Date: {convertDate(clientData[0].CREATE_AT)} </span>
                                        </div>

                                        <div className="section-infomation-data-1">
                                            {/* Personal Information */}
                                            <Card title={
                                                <div className='flex justify-between' >
                                                    <span className="tbmobstyle">Personal Information</span>

                                                    <div>
                                                        <AddCountry Clientdata={clientData} setrefreshquery={() => setrefreshquery(prev => !prev)} />
                                                    </div>

                                                </div>
                                            }
                                                id="person"
                                                className="mt-3 card-style f-popping">

                                                <div className="infomation-person">
                                                    <Row gutter={12} className='tbmobset'>
                                                        <Col className="gutter-row lainset" span={8}>
                                                            <div className=''>
                                                                <label className="font-size-12 design_modal_label f-popping">
                                                                    First Name <span className="text-danger">*</span>
                                                                </label>
                                                                <input
                                                                    id=""
                                                                    defaultValue={clientData[0].FIRST_NAME}
                                                                    type="text"
                                                                    placeholder="First Name"
                                                                    className="form-input design_input"
                                                                    name="infomation[]irst_name]"
                                                                    onChange={(event) => { handleChange(JSON.stringify({ 'infomation[FIRST_NAME]': event.target.value })) }}
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col className="gutter-row lainset" span={8}>
                                                            <div>
                                                                <label className="font-size-12 design_modal_label">
                                                                    Middle Name
                                                                </label>
                                                                <input
                                                                    id=""
                                                                    type="text"
                                                                    defaultValue={clientData[0].MIDDLE_NAME}
                                                                    placeholder="Middle  Name"
                                                                    name="infomation[middle_name]"
                                                                    className="form-input design_input"
                                                                    onChange={(event) => { handleChange(JSON.stringify({ 'infomation[MIDDLE_NAME]': event.target.value })) }}
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col className="gutter-row lainset" span={8}>
                                                            <div>
                                                                <label className="font-size-12 design_modal_label">
                                                                    Last Name
                                                                </label>
                                                                <input
                                                                    id=""
                                                                    type="text"
                                                                    defaultValue={clientData[0].LAST_NAME}
                                                                    placeholder="Last Name"
                                                                    name="infomation[last_name]"
                                                                    className="form-input design_input"
                                                                    onChange={(event) => { handleChange(JSON.stringify({ 'infomation[LAST_NAME]': event.target.value })) }}
                                                                />
                                                            </div>
                                                        </Col>
                                                    </Row>

                                                    <div className="mt-5 mb-5" />

                                                    {/* section two  */}

                                                    <Row gutter={12} className='tbmobset'>
                                                        <Col className="gutter-row lainset" span={8}>
                                                            <div>
                                                                <label className="font-size-12 design_modal_label">
                                                                    Date of Birth  <span className="text-danger">*</span>
                                                                </label>
                                                                <input
                                                                    id=""
                                                                    defaultValue={clientData[0].DATE_OF_BIRTH}
                                                                    type="date"
                                                                    placeholder="Date of Birth "
                                                                    className="form-input design_input"
                                                                    name="infomation[date_of_birth]"
                                                                    onChange={(event) => { handleChange(JSON.stringify({ 'infomation[DATE_OF_BIRTH]': event.target.value })) }}
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col className="gutter-row lainset" span={8}>
                                                            <div>
                                                                <label className="font-size-12 design_modal_label">
                                                                    First Language  <span className="text-danger">*</span>
                                                                </label>
                                                                <input
                                                                    id=""
                                                                    type="text"
                                                                    defaultValue={clientData[0].FIRST_LANGUAGE}
                                                                    placeholder="First Language"
                                                                    className="form-input design_input"
                                                                    name="infomation[first_language]"
                                                                    onChange={(event) => { handleChange(JSON.stringify({ 'infomation[FIRST_LANGUAGE]': event.target.value })) }}
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col className="gutter-row lainset" span={8}>
                                                            <div>
                                                                <label className="font-size-12 flex design_modal_label">
                                                                    Country of Citizenship<span className="text-danger">*</span>

                                                                </label>
                                                                <input
                                                                    id=""
                                                                    defaultValue={clientData[0].COUNTRY_OF_CITIZENSHIP}
                                                                    type="text"
                                                                    placeholder="CITIZENSHIP"
                                                                    className="form-input design_input"
                                                                    name="document[CITIZENSHIP]"
                                                                    onChange={(event) => { handleChange(JSON.stringify({ 'infomation[COUNTRY_OF_CITIZENSHIP]': event.target.value })) }}
                                                                />
                                                            </div>
                                                        </Col>
                                                    </Row>

                                                    {/* section three */}

                                                    <div className="mt-5 mb-5" />

                                                    <Row gutter={12} className='tbmobset'>
                                                        <Col className="gutter-row lainset" span={6}>
                                                            <div>
                                                                <label className="font-size-12 design_modal_label">
                                                                    Passport Number<span className="text-danger">*</span>
                                                                </label>
                                                                <input
                                                                    id=""
                                                                    defaultValue={clientData[0].PASSPORT_NUMBER}
                                                                    type="text"
                                                                    placeholder="Passport number"
                                                                    className="form-input design_input"
                                                                    name="document[passport_number]"
                                                                    onChange={(event) => { handleChange(JSON.stringify({ 'infomation[PASSPORT_NUMBER]': event.target.value })) }}
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col className="gutter-row lainset" span={6}>
                                                            <div>
                                                                <label className="font-size-12 design_modal_label">
                                                                    Passport Expiry Date<span className="text-danger">*</span>
                                                                </label>
                                                                <Flatpickr
                                                                    value={clientData[0].PASSPORT_EXPIRY_DATE}
                                                                    options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }}
                                                                    className="form-input design_input"
                                                                    onChange={(date: any) => {
                                                                        const selectedDate = new Date(date);
                                                                        selectedDate.setMinutes(selectedDate.getMinutes() - selectedDate.getTimezoneOffset());
                                                                        handleSelectChange('infomation[PASSPORT_EXPIRY_DATE]', selectedDate.toISOString().split('T')[0]);
                                                                    }}
                                                                    name="Test[date_of_exam]"

                                                                />

                                                            </div>
                                                        </Col>
                                                        <Col className="gutter-row lainset" span={6}>
                                                            <div className="ml-10 tbMarg">
                                                                <label className="font-size-12 design_modal_label_check">
                                                                    Marital Status<span className="text-danger">*</span>
                                                                </label>
                                                                <div className="flex">
                                                                    <div>
                                                                        <label className="flex items-center cursor-pointer">
                                                                            <input
                                                                                type="radio"
                                                                                name="infomation[marital_status]"
                                                                                defaultChecked={clientData[0].MARITAL_STATUS == 'Single' ? true : false}
                                                                                value={'Single'}
                                                                                className="form-radio design_modal_check_box"
                                                                                onChange={(event) => { handleChange(JSON.stringify({ 'infomation[MARITAL_STATUS]': event.target.value })) }}
                                                                            />
                                                                            <span className="text-white-dark">Single</span>
                                                                        </label>
                                                                    </div>
                                                                    <div className="mr-2 ml-3">
                                                                        <label className="flex items-center cursor-pointer">
                                                                            <input
                                                                                type="radio"
                                                                                name="infomation[marital_status]"
                                                                                value={'Married'}
                                                                                defaultChecked={clientData[0].MARITAL_STATUS == 'Married' ? true : false}
                                                                                className="form-radio design_modal_check_box"
                                                                                onChange={(event) => { handleChange(JSON.stringify({ 'infomation[MARITAL_STATUS]': event.target.value })) }}
                                                                            />
                                                                            <span className="text-white-dark">Married</span>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                        <Col className="gutter-row lainset" span={6}>
                                                            <div>
                                                                <label className="font-size-12 design_modal_label_check">
                                                                    Gender <span className="text-danger">*</span>
                                                                </label>
                                                                <div className="flex">
                                                                    <div>
                                                                        <label className="flex items-center cursor-pointer">
                                                                            <input
                                                                                defaultChecked={clientData[0].GENDER == 'Male' ? true : false}
                                                                                type="radio"
                                                                                name="infomation[gander]"
                                                                                value={'Male'}
                                                                                className="form-radio design_modal_check_box"
                                                                                onChange={(event) => { handleChange(JSON.stringify({ 'infomation[GENDER]': event.target.value })) }}
                                                                            />
                                                                            <span className="text-white-dark">Male</span>
                                                                        </label>
                                                                    </div>
                                                                    <div className="mr-2 ml-3">
                                                                        <label className="flex items-center cursor-pointer">
                                                                            <input
                                                                                type="radio"
                                                                                defaultChecked={clientData[0].GENDER == 'Female' ? true : false}
                                                                                name="infomation[gander]"
                                                                                value={'Female'}
                                                                                className="form-radio design_modal_check_box"
                                                                                onChange={(event) => { handleChange(JSON.stringify({ 'infomation[GENDER]': event.target.value })) }}
                                                                            />
                                                                            <span className="text-white-dark">Female</span>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>

                                                {/* Address Section information  */}

                                                <div className="header-heading mt-5 flex">
                                                    <span className="card-heading ">Address Detail</span>
                                                    <div className="ml-2 mr-2" />
                                                    <Alert message="Please make sure to enter the student's residential address. Organization address will not be accepted" type="info" showIcon />
                                                </div>

                                                <div className="infomation-address mt-5">
                                                    <Row gutter={12} className='tbmobset'>
                                                        <Col className="gutter-row lainset" span={16}>
                                                            <div>
                                                                <label className="font-size-12 design_modal_label">
                                                                    Address <span className="text-danger">*</span>
                                                                </label>
                                                                <input
                                                                    id=""
                                                                    type="text"
                                                                    defaultValue={clientData[0].ADDRESS}
                                                                    placeholder="Address"
                                                                    className="form-input design_input"
                                                                    name="address[address]"
                                                                    onChange={(event) => { handleChange(JSON.stringify({ 'infomation[ADDRESS]': event.target.value })) }}
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col className="gutter-row lainset" span={8}>
                                                            <div>
                                                                <label className="font-size-12 design_modal_label">
                                                                    City/Town <span className="text-danger">*</span>
                                                                </label>
                                                                <input
                                                                    id=""
                                                                    type="text"
                                                                    defaultValue={clientData[0].CITY}
                                                                    placeholder="City/Town"
                                                                    className="form-input design_input"
                                                                    name="address[city]"
                                                                    onChange={(event) => { handleChange(JSON.stringify({ 'infomation[CITY]': event.target.value })) }}
                                                                />
                                                            </div>
                                                        </Col>
                                                    </Row>

                                                    <div className="mt-5 mb-5" />

                                                    {/* section two  */}

                                                    <Row gutter={12} className='tbmobset'>
                                                        <Col className="gutter-row lainset" span={8}>
                                                            <div>
                                                                <label className="font-size-12 flex design_modal_label">
                                                                    Country <span className="text-danger">*</span>
                                                                    <Popover placement="topRight" content={'Type Country Name (First Letter Capital)'}>
                                                                        <span>
                                                                            <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                fill="none"
                                                                                viewBox="0 0 24 24"
                                                                                strokeWidth={1.5}
                                                                                stroke="currentColor"
                                                                                className="w-[20px] ml-3 text-danger"
                                                                            >
                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                                                            </svg>
                                                                        </span>
                                                                    </Popover>
                                                                </label>
                                                                <Select
                                                                    className="w-[100%]"
                                                                    showSearch
                                                                    style={{ height: 36 }}
                                                                    placeholder="Search to Select"
                                                                    optionFilterProp="children"
                                                                    filterOption={(input: any, option: any) =>
                                                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                                    }
                                                                    filterSort={(optionA, optionB) =>
                                                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                                                    }
                                                                    options={countries}
                                                                    onChange={(value) => SelectCountry('infomation[CITY]', value)}
                                                                    defaultValue={clientData[0].CITY}
                                                                />

                                                            </div>
                                                        </Col>
                                                        <Col className="gutter-row lainset" span={8}>
                                                            <div>
                                                                <label className="font-size-12 flex design_modal_label">
                                                                    Province/State <span className="text-danger">*</span>
                                                                    <Popover placement="topRight" content={'Type Province Name (First Letter Capital)'}>
                                                                        <span>
                                                                            <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                fill="none"
                                                                                viewBox="0 0 24 24"
                                                                                strokeWidth={1.5}
                                                                                stroke="currentColor"
                                                                                className="w-[20px] ml-3 text-danger"
                                                                            >
                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                                                            </svg>
                                                                        </span>
                                                                    </Popover>
                                                                </label>
                                                                <Select
                                                                    className="w-[100%]"
                                                                    showSearch
                                                                    style={{ height: 36 }}
                                                                    placeholder="Search to Select"
                                                                    optionFilterProp="children"
                                                                    filterOption={(input: any, option: any) =>
                                                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                                    }
                                                                    filterSort={(optionA, optionB) =>
                                                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                                                    }
                                                                    options={states}
                                                                    onChange={(value) => handleSelectChange('infomation[PROVINCE]', value)}
                                                                    defaultValue={clientData[0].PROVINCE}
                                                                />

                                                            </div>
                                                        </Col>
                                                        <Col className="gutter-row lainset" span={8}>
                                                            <div>
                                                                <label className="font-size-12 design_modal_label">
                                                                    Postal/Zip Code
                                                                </label>
                                                                <input
                                                                    id=""
                                                                    type="text"
                                                                    placeholder="Postal/Zip Code"
                                                                    className="form-input design_input"
                                                                    name="address[zip_code]"
                                                                    defaultValue={clientData[0].POSTAL_CODE}
                                                                    onChange={(event) => { handleChange(JSON.stringify({ 'infomation[POSTAL_CODE]': event.target.value })) }}
                                                                />
                                                            </div>
                                                        </Col>
                                                    </Row>

                                                    {/* section three */}

                                                    <div className="mt-5 mb-5" />

                                                    <Row gutter={12} className='tbmobset'>
                                                        <Col className="gutter-row lainset" span={8}>
                                                            <div>
                                                                <label className="font-size-12 design_modal_label">
                                                                    Email
                                                                </label>
                                                                <input
                                                                    id=""
                                                                    type="text"
                                                                    placeholder="Email"
                                                                    defaultValue={clientData[0].EMAIL}
                                                                    className="form-input design_input"
                                                                    name="contact[email]"
                                                                    onChange={(event) => { handleChange(JSON.stringify({ 'infomation[EMAIL]': event.target.value })) }}
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col className="gutter-row lainset" span={6}>
                                                            <div>
                                                                <label className="font-size-12 design_modal_label">
                                                                    Phone Number <span className="text-danger">*</span>
                                                                </label>
                                                                <MuiPhoneNumber onChange={(value: any) => { handlePhoneChange('infomation[PHONE_NUMBER]', value) }}
                                                                    value={clientData[0].PHONE_NUMBER}
                                                                    defaultCountry='in'
                                                                    className="Country_code_number"
                                                                    name="contact[phone_number]"
                                                                />
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Card>

                                            {/* Education section Data */}

                                            <Card title="Education Summary" id="education" className="mt-3 card-style f-popping tbmobstyle">
                                                <div className="infomation-person ">

                                                    <Row gutter={12} className='tbmobset'>
                                                        <Col className="gutter-row lainset" span={8}>
                                                            <div>
                                                                <label className="font-size-12 design_modal_label">
                                                                    Country of Education <span className="text-danger">*</span>
                                                                </label>
                                                                <input
                                                                    id=""
                                                                    type="text"
                                                                    defaultValue={
                                                                        clientData.length > 0 && clientData[0].EDUCATIONSUMMARY
                                                                            ? JSON.parse(clientData[0].EDUCATIONSUMMARY)[0]?.COUNTRY_OF_EDUCATION || ''
                                                                            : ''
                                                                    }
                                                                    placeholder="Country of Education"
                                                                    className="form-input design_input"
                                                                    name="education[countryOfEducation]"
                                                                    onChange={(event) => { handleChange(JSON.stringify({ 'Education[COUNTRY_OF_EDUCATION]': event.target.value })) }}

                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col className="gutter-row lainset" span={8}>
                                                            <div>
                                                                <label className="font-size-12 design_modal_label">
                                                                    Highest Level of Education
                                                                </label>
                                                                <input
                                                                    id=""
                                                                    type="text"
                                                                    defaultValue={
                                                                        clientData.length > 0 && clientData[0].EDUCATIONSUMMARY
                                                                            ? JSON.parse(clientData[0].EDUCATIONSUMMARY)[0]?.HIGHEST_LEVEL_OF_EDUCATION || ''
                                                                            : ''
                                                                    }

                                                                    placeholder="Highest Level of Education"
                                                                    className="form-input design_input"
                                                                    name="education[highestEducation]"
                                                                    onChange={(event) => { handleChange(JSON.stringify({ 'Education[HIGHEST_LEVEL_OF_EDUCATION]': event.target.value })) }}
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col className="gutter-row lainset" span={8}>
                                                            <div>
                                                                <label className="font-size-12 design_modal_label">
                                                                    Grading Scheme
                                                                </label>
                                                                <input
                                                                    id=""
                                                                    type="text"
                                                                    placeholder="Grading Scheme"
                                                                    defaultValue={
                                                                        clientData.length > 0 && clientData[0].EDUCATIONSUMMARY
                                                                            ? JSON.parse(clientData[0].EDUCATIONSUMMARY)[0]?.GRADING_SCHEME || ''
                                                                            : ''
                                                                    }
                                                                    className="form-input design_input"
                                                                    name="education[Grading_Scheme]"
                                                                    onChange={(event) => { handleChange(JSON.stringify({ 'Education[GRADING_SCHEME]': event.target.value })) }}
                                                                />
                                                            </div>
                                                        </Col>
                                                    </Row>

                                                    <Row gutter={12} className="mt-4 tbmobset">
                                                        <Col className="gutter-row lainset" span={8}>
                                                            <div>
                                                                <label className="font-size-12 design_modal_label">
                                                                    Grade Average <span className="text-danger">*</span>
                                                                </label>
                                                                <input
                                                                    id=""
                                                                    type="text"
                                                                    defaultValue={
                                                                        clientData.length > 0 && clientData[0].EDUCATIONSUMMARY
                                                                            ? JSON.parse(clientData[0].EDUCATIONSUMMARY)[0]?.GRADE_AVERAGE || ''
                                                                            : ''
                                                                    }
                                                                    placeholder="Grade Average"
                                                                    className="form-input design_input"
                                                                    name="education[GradeAverage]"
                                                                    onChange={(event) => { handleChange(JSON.stringify({ 'Education[GRADE_AVERAGE]': event.target.value })) }}
                                                                />
                                                            </div>
                                                        </Col>

                                                        <Col className="gutter-row lainset" span={8}>
                                                            <div className="mt-3 ml-5">
                                                                <label htmlFor="demo" className="font-size-15 f-popping">
                                                                    Graduated from most recent school
                                                                </label>
                                                                <label className="flex items-center cursor-pointer">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="form-checkbox"

                                                                        defaultChecked={
                                                                            clientData.length > 0 && clientData[0].EDUCATIONSUMMARY
                                                                                ? JSON.parse(clientData[0].EDUCATIONSUMMARY)[0]?.GRADUATED_FROM_MOST_RECENT_SCHOOL === '1'
                                                                                : false
                                                                        }

                                                                        name="education[GraducatedFromMostRecentSchool]"
                                                                        onChange={(value) => Graduated('Education[GRADUATED_FROM_MOST_RECENT_SCHOOL]', value)}
                                                                    // onChange={(event) => { handleChange(JSON.stringify({ 'Education[GRADUATED_FROM_MOST_RECENT_SCHOOL]': event.target.value })) }}
                                                                    />
                                                                </label>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Card>

                                            {/* school attends */}

                                            <div className="education-form">
                                                <Card title="Schools Attended" id="Attended" className="mt-3 card-style f-popping tbmobstyle">
                                                    <Row gutter={12} className="tbmobset">
                                                        <Col className="gutter-row lainset" span={24}>
                                                            <span className="heading-line f-popping">{clientData[0].GRADE_AVERAGE}</span>
                                                        </Col>
                                                        {JSON.parse(clientData[0].SCHOOLSDATA).map((Infoschool: any, index: any) => (


                                                            <Col className="gutter-row lainset" span={8}>
                                                                <ul>
                                                                    <li>
                                                                        <span className="font-semibold">
                                                                            {' '}
                                                                            <b className="font-color-light-black f-popping">{Infoschool.DID_NOT_GRADUATE == '0' ? 'Did not Graduate from Institution' : 'Graduate from Institution'}</b>{' '}
                                                                        </span>
                                                                    </li>
                                                                    <li>
                                                                        <span className="font-semibold">
                                                                            {' '}
                                                                            <b className="font-color-light-black f-popping">Level:</b> {Infoschool.LEVEL_OF_EDUCATION}
                                                                        </span>
                                                                    </li>
                                                                    <li>
                                                                        <span className="font-semibold">
                                                                            {' '}
                                                                            <b className="font-color-light-black f-popping"> Attended from </b> {Infoschool.ATTENDED_FROM} <b>to</b> {Infoschool.ATTENDED_FROM}
                                                                        </span>
                                                                    </li>
                                                                    <li>
                                                                        <span>
                                                                            <b className="font-color-light-black f-popping">Language of instruction: </b>{Infoschool.PRIMARY_LANGUAGE_OF_INSTRUCTION}{' '}
                                                                        </span>
                                                                    </li>
                                                                    <li>
                                                                        <span className="font-semibold f-popping">
                                                                            {' '}
                                                                            <b className="font-color-light-black f-popping">Address: </b>
                                                                            {Infoschool.ADDRESS}
                                                                        </span>
                                                                    </li>
                                                                    <li className='flex gap-3 mt-3'>
                                                                        <button className='btn btn-danger ' onClick={() => deleteschooldata(Infoschool.ID)}>
                                                                            <DeleteOutlineIcon />
                                                                        </button>
                                                                        <button className='btn btn-primary ' onClick={() => openEditModal(Infoschool.ID)}>
                                                                            <EditNoteIcon />
                                                                        </button>

                                                                    </li>
                                                                </ul>
                                                            </Col>

                                                        ))}
                                                        <Divider />
                                                    </Row>



                                                    <div className="information-person">
                                                        {schoolCards.map((card, index) => (
                                                            <div key={index}>{card}</div>
                                                        ))}
                                                        <div className="add-more-field">
                                                            <button className="flex btn btn-primary" onClick={addMoreCards}>
                                                                Add more
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[20px]">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </Card>
                                            </div>

                                            {/* test Scores  */}

                                            <Card title="Test Scores" id="testscores" className="mt-3 card-style f-popping tbmobstyle">
                                                <div className="infomation-person">
                                                    <Row gutter={18} className='tbmobset'>
                                                        <Col className="gutter-row lainset" span={4}>
                                                            <div>
                                                                <label className="font-size-12 design_modal_label">
                                                                    Select Exam Type: <span className="text-danger">*</span>
                                                                </label>
                                                                <Select
                                                                    className="w-[100%] mb-2"
                                                                    showSearch
                                                                    style={{ height: 36 }}
                                                                    placeholder="Search to Select"
                                                                    optionFilterProp="children"
                                                                    filterOption={(input: any, option: any) => (option?.label ?? '').includes(input)}
                                                                    filterSort={(optionA, optionB) => (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())}
                                                                    options={ExamData}
                                                                    defaultValue={
                                                                        clientData.length > 0 && clientData[0].TESTSCORESSUMMARY
                                                                            ? JSON.parse(clientData[0].TESTSCORESSUMMARY)?.[0]?.COUNTRY_OF_INSTITUTION || ''
                                                                            : ''
                                                                    }

                                                                    // onChange={(value) => handleSelectChange('state', value)}
                                                                    onChange={(e) => {
                                                                        selectExamData('TESTSCORES[COUNTRY_OF_INSTITUTION]', e);
                                                                    }}
                                                                />
                                                            </div>
                                                        </Col>

                                                        {ExamView === 'IELTS' || ExamView === 'PTE' || ExamView === 'CAEL' || ExamView === 'CECPIP' || ExamView === 'TOEFL' ? (
                                                            <>
                                                                <Col className="gutter-row lainset" span={4} data-view="IELTS , CECPIP , PTE , UKVI , TOEFL ">
                                                                    <div>
                                                                        <label className="font-size-12 design_modal_label">
                                                                            Date of Exam
                                                                        </label>
                                                                        <Flatpickr
                                                                            value={
                                                                                clientData.length > 0 && clientData[0].TESTSCORESSUMMARY
                                                                                    ? (JSON.parse(clientData[0].TESTSCORESSUMMARY)?.[0]?.DATE_OF_EXAM || '')
                                                                                    : ''
                                                                            }
                                                                            options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }}
                                                                            className="form-input design_input"
                                                                            onChange={(date: any) => {
                                                                                const selectedDate = new Date(date);
                                                                                selectedDate.setMinutes(selectedDate.getMinutes() - selectedDate.getTimezoneOffset());
                                                                                handleSelectChange('TESTSCORES[DATE_OF_EXAM]', selectedDate.toISOString().split('T')[0]);
                                                                            }}
                                                                            name="Test[date_of_exam]"

                                                                        />
                                                                    </div>
                                                                </Col>
                                                                <Col className="gutter-row lainset" span={4} data-view="IELTS , CECPIP , PTE , UKVI , TOEFL ">
                                                                    <div>
                                                                        <label className="font-size-12 design_modal_label">
                                                                            Listening
                                                                        </label>
                                                                        <input
                                                                            id=""
                                                                            type="number"
                                                                            placeholder="Listening Scores"
                                                                            className="form-input design_input"
                                                                            name="Test[Listing]"
                                                                            defaultValue={
                                                                                clientData.length > 0 && clientData[0].TESTSCORESSUMMARY
                                                                                    ? (JSON.parse(clientData[0].TESTSCORESSUMMARY)?.[0]?.LISTENING_SCORE || '')
                                                                                    : ''
                                                                            }
                                                                            onChange={(event) => { handleChange(JSON.stringify({ 'TESTSCORES[LISTENING_SCORE]': event.target.value })) }}
                                                                        />
                                                                    </div>
                                                                </Col>
                                                                <Col className="gutter-row lainset" span={4} data-view="IELTS , CECPIP , PTE , UKVI , TOEFL ">
                                                                    <div>
                                                                        <label className="font-size-12 design_modal_label">
                                                                            Reading
                                                                        </label>
                                                                        <input
                                                                            id=""
                                                                            type="number"
                                                                            placeholder="Reading Scores"
                                                                            className="form-input design_input"
                                                                            name="Test[Reading]"
                                                                            defaultValue={
                                                                                clientData.length > 0 && clientData[0].TESTSCORESSUMMARY
                                                                                    ? (JSON.parse(clientData[0].TESTSCORESSUMMARY)?.[0]?.READING_SCORE || '')
                                                                                    : ''
                                                                            }
                                                                            onChange={(event) => { handleChange(JSON.stringify({ 'TESTSCORES[READING_SCORE]': event.target.value })) }}
                                                                        />
                                                                    </div>
                                                                </Col>
                                                                <Col className="gutter-row lainset" span={4} data-view="IELTS , CECPIP , PTE , UKVI , TOEFL ">
                                                                    <div>
                                                                        <label className="font-size-12 design_modal_label">
                                                                            Writing
                                                                        </label>
                                                                        <input
                                                                            id=""
                                                                            type="number"
                                                                            placeholder="Writing Scores"
                                                                            className="form-input design_input"
                                                                            name="Test[Writing]"
                                                                            defaultValue={
                                                                                clientData.length > 0 && clientData[0].TESTSCORESSUMMARY
                                                                                    ? (JSON.parse(clientData[0].TESTSCORESSUMMARY)?.[0]?.WRITING_SCORE || '')
                                                                                    : ''
                                                                            }
                                                                            onChange={(event) => { handleChange(JSON.stringify({ 'TESTSCORES[WRITING_SCORE]': event.target.value })) }}
                                                                        />
                                                                    </div>
                                                                </Col>
                                                                <Col className="gutter-row lainset" span={4} data-view="IELTS , CECPIP , PTE , UKVI , TOEFL ">
                                                                    <div>
                                                                        <label className="font-size-12 design_modal_label">
                                                                            Speaking
                                                                        </label>
                                                                        <input
                                                                            id=""
                                                                            type="number"
                                                                            placeholder="Speaking Scores"
                                                                            className="form-input design_input"
                                                                            name="Test[Speaking]"
                                                                            defaultValue={
                                                                                clientData.length > 0 && clientData[0].TESTSCORESSUMMARY
                                                                                    ? (JSON.parse(clientData[0].TESTSCORESSUMMARY)?.[0]?.SPEAKING_SCORE || '')
                                                                                    : ''
                                                                            }

                                                                            onChange={(event) => { handleChange(JSON.stringify({ 'TESTSCORES[SPEAKING_SCORE]': event.target.value })) }}
                                                                        />
                                                                    </div>
                                                                </Col>
                                                            </>
                                                        ) : (
                                                            ExamView === 'DUOLINGO' && (
                                                                <>
                                                                    <Col className="gutter-row lainset" span={4} data-view="IELTS , CECPIP , PTE , UKVI , TOEFL ">
                                                                        <div>
                                                                            <label className="font-size-12 design_modal_label">
                                                                                Date of Exam
                                                                            </label>
                                                                            <Flatpickr
                                                                                value={
                                                                                    clientData.length > 0 && clientData[0].TESTSCORESSUMMARY
                                                                                        ? (JSON.parse(clientData[0].TESTSCORESSUMMARY)?.[0]?.DATE_OF_EXAM || '')
                                                                                        : ''
                                                                                }

                                                                                options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }}
                                                                                className="form-input design_input"
                                                                                onChange={(date: any) => {
                                                                                    const selectedDate = new Date(date);
                                                                                    selectedDate.setMinutes(selectedDate.getMinutes() - selectedDate.getTimezoneOffset());
                                                                                    handleSelectChange('TESTSCORES[DATE_OF_EXAM]', selectedDate.toISOString().split('T')[0]);
                                                                                }}

                                                                                name="Test[date_of_exam]"
                                                                            />
                                                                        </div>
                                                                    </Col>

                                                                    <Col className="gutter-row lainset" span={4} data-view="DUOLINGO">
                                                                        <div>
                                                                            <label className="font-size-12 design_modal_label">
                                                                                Enter Exact Scores
                                                                            </label>
                                                                            <input
                                                                                id=""
                                                                                type="number"
                                                                                placeholder="Enter Exact Scores"
                                                                                className="form-input design_input"
                                                                                name="Test[ExactScores]"
                                                                                defaultValue={
                                                                                    clientData.length > 0 && clientData[0].TESTSCORESSUMMARY
                                                                                        ? (JSON.parse(clientData[0].TESTSCORESSUMMARY)?.[0]?.TOTALEXACT || '')
                                                                                        : ''
                                                                                }
                                                                                onChange={(event) => { handleChange(JSON.stringify({ 'TESTSCORES[TOTALEXACT]': event.target.value })) }}
                                                                            />
                                                                        </div>
                                                                    </Col>
                                                                </>
                                                            )
                                                        )}
                                                    </Row>
                                                </div>
                                            </Card>

                                            {/* Additional Details */}

                                            <Card title="Additional Qualifications" id="Qualifications" className="mt-3 card-style f-popping tbmobstyle">
                                                <div className="infomation-person">
                                                    <Row gutter={18} className='tbmobset'>
                                                        <Col className="gutter-row lainset" span={4}>
                                                            <div>
                                                                <label className="font-size-12 design_modal_label">
                                                                    I have GRE exam scores
                                                                </label>
                                                                <label className="w-12 h-6 relative">
                                                                    <input
                                                                        type="checkbox"
                                                                        name="ad_education[GrE_is_true]"
                                                                        className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                                                                        id="custom_switch_checkbox1"
                                                                        defaultChecked={clientData[0].HAS_GRE_SCORES == '1' ? true : false}
                                                                        onChange={(value) => GRE_exam('ADDITIONALQUALIFICATIONS[HAS_GRE_SCORES]', value)}
                                                                    />
                                                                    <span className="bg-[#ebedf2] dark:bg-dark block h-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300 "></span>
                                                                </label>
                                                            </div>
                                                        </Col>

                                                        <Col className={`gutter-row  lainset ${GRE_EXAM_VIEW ? 'view_GRE' : 'invisible'}`} span={20}>
                                                            <table>
                                                                <thead>
                                                                    <tr>
                                                                        <th className='stuapplabel'>GRE Exam Date</th>
                                                                        <th className='stuapplabel'>Verbal</th>
                                                                        <th className='stuapplabel'>Quantitative</th>
                                                                        <th className='stuapplabel'>Writing</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            <Flatpickr
                                                                                value={clientData[0].GRE_EXAM_DATE}
                                                                                options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }}
                                                                                className="form-input design_input"
                                                                                onChange={(date: any) => {
                                                                                    const selectedDate = new Date(date);
                                                                                    selectedDate.setMinutes(selectedDate.getMinutes() - selectedDate.getTimezoneOffset());
                                                                                    handleSelectChange('ADDITIONALQUALIFICATIONS[GRE_EXAM_DATE]', selectedDate.toISOString().split('T')[0]);
                                                                                }}
                                                                                name="ad_education_GRE[date_of_exam]"
                                                                            />
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                id=""
                                                                                type="number"
                                                                                placeholder="Score"
                                                                                className="form-input design_input"
                                                                                name="ad_education_GRE[verbal_score]"
                                                                                defaultValue={clientData[0].GRE_VERBAL_SCORE}
                                                                                onChange={(event) => { handleChange(JSON.stringify({ 'ADDITIONALQUALIFICATIONS[GRE_VERBAL_SCORE]': event.target.value })) }}

                                                                            />
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                id=""
                                                                                type="number"
                                                                                placeholder="Score"
                                                                                className="form-input design_input"
                                                                                name="ad_education_GRE[Quantitative_score]"
                                                                                defaultValue={clientData[0].GRE_QUANTITATIVE_SCORE}
                                                                                onChange={(event) => { handleChange(JSON.stringify({ 'ADDITIONALQUALIFICATIONS[GRE_QUANTITATIVE_SCORE]': event.target.value })) }}

                                                                            />
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                id=""
                                                                                type="number"
                                                                                placeholder="Score"
                                                                                className="form-input design_input"
                                                                                name="ad_education_GRE[Writting_score]"
                                                                                defaultValue={clientData[0].GRE_WRITING_SCORE}
                                                                                onChange={(event) => { handleChange(JSON.stringify({ 'ADDITIONALQUALIFICATIONS[GRE_WRITING_SCORE]': event.target.value })) }}

                                                                            />
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td></td>
                                                                        <td>
                                                                            <input
                                                                                id=""
                                                                                type="number"
                                                                                placeholder="Rank % "
                                                                                className="form-input design_input"
                                                                                name="ad_education_GRE[verbal_score_persantage]"
                                                                                defaultValue={clientData[0].GRE_VERBAL_RANK}
                                                                                onChange={(event) => { handleChange(JSON.stringify({ 'ADDITIONALQUALIFICATIONS[GRE_VERBAL_RANK]': event.target.value })) }}

                                                                            />
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                id=""
                                                                                type="number"
                                                                                placeholder="Rank % "
                                                                                className="form-input design_input"
                                                                                name="ad_education_GRE[Quantitative_score_persantage]"
                                                                                defaultValue={clientData[0].GRE_QUANTITATIVE_RANK}
                                                                                onChange={(event) => { handleChange(JSON.stringify({ 'ADDITIONALQUALIFICATIONS[GRE_QUANTITATIVE_RANK]': event.target.value })) }}

                                                                            />
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                id=""
                                                                                type="number"
                                                                                placeholder="Rank % "
                                                                                className="form-input design_input"
                                                                                name="ad_education_GRE[Writting_score_Persantage]"
                                                                                defaultValue={clientData[0].GRE_WRITING_RANK}
                                                                                onChange={(event) => { handleChange(JSON.stringify({ 'ADDITIONALQUALIFICATIONS[GRE_WRITING_RANK]': event.target.value })) }}

                                                                            />
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </Col>
                                                    </Row>
                                                    <Row gutter={18} className="mt-2 tbmobset">
                                                        <Col className="gutter-row lainset" span={4}>
                                                            <div>
                                                                <label className="font-size-12 design_modal_label">
                                                                    I have GMAT exam scores
                                                                </label>
                                                                <label className="w-12 h-6 relative">
                                                                    <input
                                                                        type="checkbox"
                                                                        name="ad_education[GMT_Exam_true]"
                                                                        className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                                                                        id="custom_switch_checkbox1"
                                                                        defaultChecked={clientData[0].HAS_GMAT_SCORES == '1' ? true : false}
                                                                        onChange={(value) => GMAT_exam('ADDITIONALQUALIFICATIONS[HAS_GMAT_SCORES]', value)}

                                                                    />
                                                                    <span className="bg-[#ebedf2] dark:bg-dark block h-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300 "></span>
                                                                </label>
                                                            </div>
                                                        </Col>

                                                        <Col className={`gutter-row lainset ${GMAT_EXAM_VIEW ? ' view_GMAT' : 'invisible'}`} span={20}>
                                                            <table>
                                                                <thead>
                                                                    <tr>
                                                                        <th className='stuapplabel'>GMAT Exam Date</th>
                                                                        <th className='stuapplabel'>Verbal</th>
                                                                        <th className='stuapplabel'>Quantitative</th>
                                                                        <th className='stuapplabel'>Writing</th>
                                                                        <th className='stuapplabel'>Total</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            <Flatpickr
                                                                                value={clientData[0].GMAT_EXAM_DATE}
                                                                                options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }}
                                                                                className="form-input design_input"
                                                                                onChange={(date: any) => {
                                                                                    const selectedDate = new Date(date);
                                                                                    selectedDate.setMinutes(selectedDate.getMinutes() - selectedDate.getTimezoneOffset());
                                                                                    handleSelectChange('ADDITIONALQUALIFICATIONS[GMAT_EXAM_DATE]', selectedDate.toISOString().split('T')[0]);
                                                                                }}
                                                                                name="ad_education_gmt[exam_date]"
                                                                            />
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                id=""
                                                                                type="number"
                                                                                placeholder="Score"
                                                                                className="form-input design_input"
                                                                                name="ad_education_gmt[verbal_score]"
                                                                                defaultValue={clientData[0].GMAT_VERBAL_SCORE}
                                                                                onChange={(event) => { handleChange(JSON.stringify({ 'ADDITIONALQUALIFICATIONS[GMAT_VERBAL_SCORE]': event.target.value })) }}

                                                                            />
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                id=""
                                                                                type="number"
                                                                                placeholder="Score"
                                                                                className="form-input design_input"
                                                                                name="ad_education_gmt[quantitative_score]"
                                                                                defaultValue={clientData[0].GMAT_QUANTITATIVE_SCORE}
                                                                                onChange={(event) => { handleChange(JSON.stringify({ 'ADDITIONALQUALIFICATIONS[GMAT_QUANTITATIVE_SCORE]': event.target.value })) }}
                                                                            />
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                id=""
                                                                                type="number"
                                                                                placeholder="Score"
                                                                                className="form-input design_input"
                                                                                name="ad_education_gmt[Wrinting_Score]"
                                                                                defaultValue={clientData[0].GMAT_WRITING_SCORE}
                                                                                onChange={(event) => { handleChange(JSON.stringify({ 'ADDITIONALQUALIFICATIONS[GMAT_WRITING_SCORE]': event.target.value })) }}
                                                                            />
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                id=""
                                                                                type="number"
                                                                                placeholder="Score"
                                                                                className="form-input design_input"
                                                                                defaultValue={
                                                                                    parseInt(clientData[0].GMAT_VERBAL_SCORE) +
                                                                                    parseInt(clientData[0].GMAT_QUANTITATIVE_SCORE) +
                                                                                    parseInt(clientData[0].GMAT_WRITING_SCORE)
                                                                                } />
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td></td>
                                                                        <td>
                                                                            <input
                                                                                id=""
                                                                                type="number"
                                                                                placeholder="Rank % "
                                                                                className="form-input design_input"
                                                                                name="ad_education_gmt[verbal_score_persantage]"
                                                                                defaultValue={clientData[0].GMAT_VERBAL_RANK}
                                                                                onChange={(event) => { handleChange(JSON.stringify({ 'ADDITIONALQUALIFICATIONS[GMAT_VERBAL_RANK]': event.target.value })) }}
                                                                            />
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                id=""
                                                                                type="number"
                                                                                placeholder="Rank % "
                                                                                className="form-input design_input"
                                                                                name="ad_education_gmt[quantitative_score_persantage]"
                                                                                defaultValue={clientData[0].GMAT_QUANTITATIVE_RANK}
                                                                                onChange={(event) => { handleChange(JSON.stringify({ 'ADDITIONALQUALIFICATIONS[GMAT_QUANTITATIVE_RANK]': event.target.value })) }}
                                                                            />
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                id=""
                                                                                type="number"
                                                                                placeholder="Rank % "
                                                                                className="form-input design_input"
                                                                                name="ad_education_gmt[Wrinting_Score_persantage]"
                                                                                defaultValue={clientData[0].GMAT_WRITING_RANK}
                                                                                onChange={(event) => { handleChange(JSON.stringify({ 'ADDITIONALQUALIFICATIONS[GMAT_WRITING_RANK]': event.target.value })) }}
                                                                            />
                                                                        </td>
                                                                        <td>
                                                                            <input
                                                                                id=""
                                                                                type="text"
                                                                                placeholder="Rank % "
                                                                                className="form-input design_input"
                                                                                defaultValue={
                                                                                    (parseInt(clientData[0].GMAT_VERBAL_SCORE || 0) +
                                                                                        parseInt(clientData[0].GMAT_QUANTITATIVE_SCORE || 0) +
                                                                                        parseInt(clientData[0].GMAT_WRITING_SCORE || 0)) > 0
                                                                                        ?
                                                                                        (
                                                                                            parseInt(clientData[0].GMAT_VERBAL_SCORE || 0) +
                                                                                            parseInt(clientData[0].GMAT_QUANTITATIVE_SCORE || 0) +
                                                                                            parseInt(clientData[0].GMAT_WRITING_SCORE || 0)
                                                                                        )
                                                                                        : ''
                                                                                }

                                                                            />
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Card>

                                            {/* Background infomation data  */}

                                            <Card title="Background Information " id="Background" className="mt-3 card-style f-popping tbmobstyle">
                                                <div className="infomation-person">
                                                    <Row gutter={12} className='tbmobset'>
                                                        <Col className="gutter-row lainset" span={12}>
                                                            <div>
                                                                <label className="font-size-12 design_modal_label">
                                                                    Have you been refused a visa from Canada, the USA, the United Kingdom, New Zealand, Australia or Ireland?

                                                                </label>
                                                                <div>
                                                                    <label className="flex items-center cursor-pointer">
                                                                        <input
                                                                            type="radio"
                                                                            name="refused_visa[refused]"
                                                                            value={'1'}
                                                                            className="form-radio design_modal_check_box"
                                                                            defaultChecked={clientData[0].VISA_REFUSAL == 1 ? true : false}
                                                                            onChange={(event) => { handleChange(JSON.stringify({ 'BACKGROUNDINFORMATION[VISA_REFUSAL]': event.target.value })) }}
                                                                        />
                                                                        <span className="text-white-dark">Yes</span>

                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <label className="flex items-center cursor-pointer">
                                                                        <input
                                                                            type="radio"
                                                                            name="refused_visa[refused]"
                                                                            value={'0'}
                                                                            className="form-radio design_modal_check_box"
                                                                            defaultChecked={clientData[0].VISA_REFUSAL == 0 ? true : false}
                                                                            onChange={(event) => { handleChange(JSON.stringify({ 'BACKGROUNDINFORMATION[VISA_REFUSAL]': event.target.value })) }}
                                                                        />
                                                                        <span className="text-white-dark">No</span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <Row gutter={12} className='tbmobset'>
                                                        <Col className="gutter-row lainset" span={12}>
                                                            <div>
                                                                <label className="font-size-12 design_modal_label f-popping">
                                                                    Do you have a valid Study Permit / Visa?
                                                                </label>
                                                                <div>
                                                                    <Select
                                                                        mode="tags"
                                                                        maxTagCount="responsive"
                                                                        className="Study[Permit]"
                                                                        style={{ width: '100%' }}
                                                                        tokenSeparators={[',']}
                                                                        options={options}
                                                                        defaultValue={(() => {
                                                                            try {
                                                                                return JSON.parse(clientData[0]?.VALID_STUDY_PERMIT) || [];
                                                                            } catch (e) {
                                                                                return [];
                                                                            }
                                                                        })()}
                                                                        onChange={(value) => handleSelectChange('BACKGROUNDINFORMATION[VALID_STUDY_PERMIT]', value)}

                                                                    />
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <Row gutter={24} className="mt-4 tbmobset">
                                                        <Col className="gutter-row lainset" span={24}>
                                                            <div>
                                                                <label className="font-size-12 design_modal_label f-popping">
                                                                    If you answered "Yes" to any of the questions above, please provide more details below:
                                                                    <span className="text-danger">*</span>
                                                                </label>
                                                                <div>
                                                                    <TextArea
                                                                        placeholder="Provide details..."
                                                                        autoSize={{ minRows: 2, maxRows: 6 }}
                                                                        name="questions[details]"
                                                                        defaultValue={clientData[0].ADDITIONAL_DETAILS}
                                                                        onChange={(event) => { handleChange(JSON.stringify({ 'BACKGROUNDINFORMATION[ADDITIONAL_DETAILS]': event.target.value })) }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Card>

                                            {/* Document Add */}
                                            <Card title="Documents" id="Documents" className="mt-3 card-style f-popping tbmobstyle">
                                                {JSON.parse(clientData[0].DOCUMENTS).length > 0 ? (
                                                    JSON.parse(clientData[0].DOCUMENTS).map((Documentlist: any, index: any) => (
                                                        <div className="infomation-person" key={index}>
                                                            <Row gutter={24} className="mt-4 tbmobset grid gap-4">
                                                                <Col className="gutter-row lainset" span={24}>
                                                                    <div>
                                                                        <Dragger
                                                                            disabled={Documentlist.IS_UPLOAD_STATUS === 'TRUE'}
                                                                            accept={'.' + Documentlist.DOCUMENT_TYPE}
                                                                            beforeUpload={validateFile}
                                                                            customRequest={(options) => handalfileupload(options, Documentlist.ID, Documentlist.DOC_ID)}
                                                                        >
                                                                            <p className="ant-upload-drag-icon">
                                                                                <InboxOutlined />
                                                                            </p>
                                                                            <p className="ant-upload-text f-popping">{Documentlist.TITLE}</p>
                                                                            <ul className="text-start f-popping">
                                                                                <li className="li-style-dot f-popping">
                                                                                    <span className="text-danger f-popping">Note: </span> ACCEPTABLE FORMATS: {Documentlist.DOCUMENT_TYPE.toUpperCase()}
                                                                                </li>
                                                                                <li className="li-style-dot f-popping">
                                                                                    <span className="text-danger f-popping">Note: </span> {Documentlist.DOCUMENT_INFOMATION.toUpperCase()}
                                                                                </li>
                                                                                <li className="li-style-dot f-popping">
                                                                                    <span className="text-danger f-popping">Note: </span> FILE SIZE LIMIT IS 2MB
                                                                                </li>
                                                                            </ul>
                                                                            {Documentlist.IS_UPLOAD_STATUS === 'TRUE' && (
                                                                                <div>
                                                                                    <span className="border border-dashed p-3">
                                                                                        <a href={`https://harmanhardy.com/InfinityCRM/API/${Documentlist.DOC_URL}`} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                                                                                            <span className="text-danger f-popping">View: </span>{Documentlist.DOCUMENT_NAME}.{Documentlist.DOCUMENT_TYPE}
                                                                                        </a>
                                                                                    </span>
                                                                                </div>
                                                                            )}

                                                                            {Documentlist.REBRAND === 'true' && (
                                                                                <div>
                                                                                    <b>Document Reupload : </b>
                                                                                    {Documentlist.REBRAND_COMMENT}
                                                                                </div>
                                                                            )}
                                                                        </Dragger>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    ))
                                                ) : (
                                                    'Empty Document list'
                                                )}

                                            </Card>
                                        </div>

                                        <footer className="footer-section ">
                                            <div className='flex justify-end'>
                                                <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
                                                    {loading ? 'Wait...' : 'Update'}
                                                </button>
                                            </div>
                                        </footer>
                                    </div>


                                    <Modal
                                        width={700}
                                        title={<p>Changed Data</p>}
                                        footer={
                                            <Button
                                                color="primary"
                                                disabled={!confirmation}
                                                onClick={handleModalSubmit}
                                            >
                                                Submit
                                            </Button>
                                        }
                                        loading={loading}
                                        open={openmodal}
                                        onCancel={() => setOpenmodal(false)}
                                    >
                                        {Object.keys(formData).length > 0 ? (
                                            <ul className='list-decimal list-inside'>
                                                {Object.entries(formData).map(([key, value]) => (
                                                    <li key={key}><b>{`${key}`}:</b> {`${value}`}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p>No changes detected.</p>
                                        )}


                                        <Checkbox
                                            checked={confirmation}
                                            onChange={(e) => setConfirmation(e.target.checked)}
                                        >
                                            Confirm the data is correct
                                        </Checkbox>


                                    </Modal>
                                </>
                            </Tab>
                            <Tab key="Comment" title="Comment" isDisabled={clientData[0].AGENT_FILE_STATUS == 'Transfer' ? false : true}>
                                <ADDCOMMENT />
                            </Tab>

                            <Tab key="Additional_services" title="Additional Services" isDisabled={clientData[0].AGENT_FILE_STATUS == 'Transfer' ? false : true} >
                                <Servicelist />
                            </Tab>

                            <Tab key="Applications" className='' title="Applications" isDisabled={clientData[0].AGENT_FILE_STATUS == 'Transfer' ? false : true} >
                                <Totalapplication />
                            </Tab>
                        </Tabs>
                    </div>
                </>
            )}
        </>
    );
}
