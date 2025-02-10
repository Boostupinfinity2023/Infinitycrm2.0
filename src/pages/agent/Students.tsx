import React, { useState, useEffect } from 'react';
import { CustomerService } from './service/CustomerService';
import './student-flags.css';
import './student.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { INSERTDATA } from '../../APIurl/url';
import jwt from '../../getLoggedUser/GetUserInfomation';
import { GETDATA, v1Dashboard } from '../../APIurl/url';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import { useSelector } from 'react-redux';
import Select, { ActionMeta, MultiValue } from 'react-select';
import { message, Space } from 'antd';
import MuiPhoneNumber from 'mui-phone-number';
import { debounce } from 'lodash';
import { Plus } from 'lucide-react';
export default function LazyLoadDemo({ Refresh }: any) {
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);
    const [User, setUser] = useState('');
    const [totalRecords, setTotalRecords] = useState(0);
    const [customers, setCustomers] = useState(null);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedCustomers, setSelectedCustomers] = useState(null);
    const [AllCountrys, Setallcountry]: any = useState([]);
    const [mappedCountries, setMappedCountries] = useState<any[]>([]);

    const [visible, setVisible] = useState(false);
    const [lazyState, setlazyState] = useState({
        first: 0,
        rows: 10,
        page: 1,
        sortField: null,
        sortOrder: null,
        filters: {
            name: { value: '', matchMode: 'contains' },
            'country.name': { value: '', matchMode: 'contains' },
            company: { value: '', matchMode: 'contains' },
            'representative.name': { value: '', matchMode: 'contains' },
        },
    });

    let networkTimeout: string | number | NodeJS.Timeout | null | undefined = null;

    useEffect(() => {
        loadLazyData();
    }, [lazyState]);

    const loadLazyData = () => {
        setLoading(true);

        if (networkTimeout) {
            clearTimeout(networkTimeout);
        }

        //imitate delay of a backend call
        networkTimeout = setTimeout(() => {
            CustomerService.getCustomers({ lazyEvent: JSON.stringify(lazyState) }).then((data) => {
                setTotalRecords(data.totalRecords);
                setCustomers(data.customers);
                setLoading(false);
            });
        }, Math.random() * 1000 + 250);
    };
    const token = jwt('jwt');


    const Allcountry = async () => {
        try {
            const responseData: any = await fetch(v1Dashboard, {
                method: 'POST',
                headers: {
                    Authenticate: `Bearer ${token}`,
                    'x-token-access': 'true',
                },
                body: JSON.stringify({
                    PAGE_REQUEST: 'ADMIN.GETALLCOUNTRY',
                    RequesterUser: 'Admin',
                }),
            });
            const data = await responseData.json();
            Setallcountry(data.data)

            const mappedOptions = data.data.map((country: any) => ({
                value: country.COUNTRY_NAME,
                label: country.COUNTRY_NAME,
                id: country.ID,
                flag: country.Flag_name, // Include flag if needed for display
            }));

            setMappedCountries(mappedOptions);
        } catch (err) {
            console.error(err);

        }
    }

    const DebounceAllcountry = debounce(Allcountry, 300);
    useEffect(() => {
        DebounceAllcountry();
    }, []);

    useEffect(() => {
        let url = `view=comment&edit=true`;
        fetch(GETDATA + '?action=view-user&auth=true&view=true&edit=false', {
            method: 'POST',
            headers: {
                Authenticate: `Bearer ${token}`,
            },
            body: JSON.stringify({
                PAGE_REQUEST: 'GET_USER_DATA_LIST',
            }),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.status == true) {
                    setUser(data.data);
                }
            });
    }, []);

    const [selectedServices, setSelectedServices] = useState<MultiValue<any>[]>([]); // Use the correct type

    const handleSelectChange = (newValue: MultiValue<any>, actionMeta: ActionMeta<any>) => {
        setSelectedServices(newValue as MultiValue<any>[]); // Cast newValue to the correct type
    };

    const [selectedCountryValues, setSelectedCountryValues] = useState<MultiValue<any>[]>([]);
    const handleSelectChangecountryofinterest = (newValue: MultiValue<any>, actionMeta: ActionMeta<any>) => {
        setSelectedCountryValues(newValue as MultiValue<any>[]);
    };

    const [formloader, setformloader] = useState(false);
    const [number, setnumber] = useState('');

    const StoreStudent = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setformloader(true);

        if (!selectedPrimaryCountry) {
            messageApi.open({
                type: 'error',
                content: 'Primary Country of Interest is required.',
                style: {
                    color: 'danger',
                    textAlign: 'end',
                },
            });
            setformloader(false);
            return;
        }


        const formData = new FormData(e.currentTarget);

        const jsonData: { [key: string]: any } = {};
        formData.forEach((value, key) => {
            jsonData[key] = value.toString();
        });
        const selectedServicesValues = selectedServices.map((Option: any) => Option.value);
        jsonData['services[Servicesofinterest]'] = selectedServicesValues;

        const selectedServicesCountry = selectedSecondaryCountries.map((Option: any) => Option.value);
        jsonData['services[countryofinterest]'] = selectedServicesCountry;
        jsonData['PRIMARY_COUNTRY'] = selectedPrimaryCountry.value;
        jsonData['PAGE_REQUEST'] = 'INSERT_USER_ENQUIRE_FORM_DATA';

        let url = `action=insert-data-user&edit=true$delete=true&auth=true`;
        fetch(INSERTDATA + '?' + url, {
            method: 'POST',
            headers: {
                Authenticate: `Bearer ${token}`,
            },
            body: JSON.stringify(jsonData),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.status == true) {
                    setformloader(false);
                    Refresh(true);
                    const Form = document.getElementById('FomrId') as HTMLFormElement;
                    if (Form) {
                        Form.reset();
                    } else {
                        console.error("Form with ID 'FormId' not found.");
                    }
                    message.success("Form Submited Successfully");
                    setVisible(false)
                } else {
                    setformloader(false);
                    message.error(data.message);

                }
            });
    };

    const isRtl = useSelector((state: any) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [date1, setDate1] = useState<any>('');
    const Country_of_Interest: any = [
        { value: 'USA', label: 'USA' },
        { value: 'Ireland', label: 'Ireland' },
        { value: 'Canada', label: 'Canada' },
        { value: 'Australia', label: 'Australia' },
        { value: 'Germany', label: 'Germany' },
        { value: 'United Kingdom', label: 'United Kingdom' }
    ];

    const Services_of_Interest: any = [
        {
            value: 'Programs',
            label: 'Programs',
        },
        {
            value: 'Scholarships',
            label: 'Scholarships',
        },
        {
            value: 'Visa Services',
            label: 'Visa Services',
        },
        {
            value: 'Insurance',
            label: 'Insurance',
        },
        {
            value: 'Accommodation',
            label: 'Accommodation',
        },
        {
            value: 'bank_accounts',
            label: 'Bank Accounts',
        },
        {
            value: 'Tourium',
            label: 'Tourium',
        },
        {
            value: 'Other',
            label: 'Other',
        },
    ];
    function setnumbers() {
        console.log('okay');
    }

    const [selectedPrimaryCountry, setSelectedPrimaryCountry] = useState<any>(null);
    const [selectedSecondaryCountries, setSelectedSecondaryCountries]: any = useState<MultiValue<any>[]>([]);

    const handlePrimaryCountryChange = (newValue: any, actionMeta: ActionMeta<any>) => {
        setSelectedPrimaryCountry(newValue);
        setSelectedSecondaryCountries([]); // Clear secondary selection when primary changes
    };

    // Handle secondary countries selection
    const handleSecondaryCountriesChange = (newValue: MultiValue<any>, actionMeta: ActionMeta<any>) => {
        setSelectedSecondaryCountries(newValue);
    };

    // Filter secondary options based on primary country
    const filteredSecondaryOptions = mappedCountries.filter(
        (country: any) => country.value !== selectedPrimaryCountry?.value
    );



    return (
        <>
            <div className="flex modal-custom">
                {/* Success Message Show  */}
                {contextHolder}

                <Button type="button" label="Register A New Student" icon="pi pi-plus" className="modal-btn-custom" onClick={() => setVisible(true)} />
                <Dialog
                    header="New Application"
                    visible={visible}
                    onHide={() => {
                        if (!visible) return;
                        setVisible(false);
                    }}
                >
                    <form onSubmit={StoreStudent} id="FomrId">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="grid-cols-1">
                                <label className="design_modal_label" htmlFor="firstname">
                                    First Name <span className="text-danger">*</span>
                                </label>
                                <input id="firstname" type="text" placeholder="Enter First Name" className="design_input" name="personalInfomation[FirstName]" required />
                            </div>
                            <div className="grid-cols-1">
                                <label className="design_modal_label" htmlFor="middlename">
                                    Middle Name
                                </label>
                                <input id="middlename" type="text" placeholder="Enter Middle Name" name="personalInfomation[MiddleName]" className="design_input" />
                            </div>
                            <div className="grid-cols-1">
                                <label className="design_modal_label" htmlFor="lastname">
                                    Last Name <span className="text-danger">*</span>
                                </label>
                                <input id="lastname" type="taxt" placeholder="Enter Last Name" className="design_input" name="personalInfomation[LastName]" required />
                            </div>


                            <div>
                                <label className="design_modal_label" htmlFor="DOB">
                                    Date of Birth <span className="text-danger">*</span>
                                </label>
                                <input id="DOB" type="date" className="design_input font-normal" name="personalInfomation[Dob]" required />
                            </div>
                            <div className="">
                                <label className="design_modal_label" htmlF-span-3or="gridState">
                                    Country of Citizenship
                                </label>
                                <input type="text" className="design_input" name="personalInfomation[CountryOfCitizenship]" placeholder="Country of Citizenship" />
                            </div>
                            <div>
                                <label className="design_modal_label" htmlFor="firstname">
                                    Passport number
                                </label>
                                <input id="firstname" type="text" placeholder="Passport number" className="design_input" name="Document[PassportNumber]" />
                            </div>
                            <div className="col-span-3">
                                <label className="design_modal_label" htmlFor="firstname">
                                    Passport expiry date
                                </label>
                                <Flatpickr
                                    name="Document[PassportExpire]"
                                    value={date1}
                                    options={{ dateFormat: 'd-M-Y', position: isRtl ? 'auto right' : 'auto left' }}
                                    className="design_input"
                                    onChange={(date) => setDate1(date)}
                                />
                            </div>
                            <div className="col">
                                <label className="design_modal_label" htmlFor="gender">
                                    Gender
                                </label>
                                <div className="flex items-center mt-1 cursor-pointer">
                                    <input id="male" type="radio" name="personalInfomation[Gender]" className="form-radio" value="male" />
                                    <label className=" design_modal_label_check" htmlFor="male">
                                        Male
                                    </label>

                                    <input id="female" type="radio" name="personalInfomation[Gender]" className="form-radio ml-4" value="female" />
                                    <label className=" design_modal_label_check" htmlFor="female">
                                        Female
                                    </label>
                                </div>
                            </div>
                            <h1 className="col-span-3 contact-information-custom">Contact Information</h1>

                            <div className="col-span-2">
                                <label className="design_modal_label" htmlFor="email">
                                    Email <span className="text-danger">*</span>
                                </label>
                                <input id="email" type="email" placeholder="Enter Email" className="design_input" name="Contact_Infomation[EmailId]" required />
                            </div>
                            <div className="col-span-1">
                                <label className="design_modal_label" htmlFor="phonenumber">
                                    Phone Number <span className="text-danger">*</span>
                                </label>
                                <MuiPhoneNumber id="phonenumber" onChange={setnumbers} className="design_input Country_code_number_student" name="Contact_Infomation[MobileNumber]" defaultCountry="in" />
                            </div>

                            <div className="col-span-1">
                                <label className="design_modal_label" htmlFor="countryofinterest">
                                    Primary Country of Interest
                                </label>
                                <Select
                                    className=""
                                    placeholder="Select an option"
                                    options={mappedCountries}
                                    value={selectedPrimaryCountry}
                                    onChange={handlePrimaryCountryChange}
                                    menuPlacement="top"
                                />
                            </div>
                            <div className="col-span-1">
                                <label className="design_modal_label" htmlFor="countryofinterest">
                                    Additional Country Preferences
                                </label>
                                <Select
                                    className=""
                                    placeholder="Select an option"
                                    options={filteredSecondaryOptions}
                                    isMulti
                                    value={selectedSecondaryCountries}
                                    onChange={handleSecondaryCountriesChange}
                                    menuPlacement="top"
                                    isDisabled={!selectedPrimaryCountry}
                                />
                            </div>
                            <div className="">
                                <label className="design_modal_label" htmlFor="servicesofinterest">
                                    Services of Interest
                                </label>
                                <Select className="" placeholder="Select an option" options={Services_of_Interest} isMulti value={selectedServices} onChange={handleSelectChange} menuPlacement="top" />
                            </div>

                            <div className="col-span-3">
                                <label className="design_modal_check_box flex items-center mt-1 cursor-pointer">
                                    <input type="checkbox" className="form-checkbox" required />
                                    <span className="text-black text-xs">
                                        I confirm that I have received express written consent from the student whom I am creating this profile for and I can provide proof of their consent upon
                                        request.
                                    </span>
                                </label>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3">

                            <Button type="button" className="danger-btn" onClick={() => setVisible(false)}>
                                Cancel
                            </Button>
                            {formloader ? (
                                <Button type="button" className="btn-primary" loading>
                                    wait...
                                </Button>
                            ) : (
                                <Button type="submit" className="btn-primary">
                                    Submit
                                </Button>
                            )}

                        </div>
                    </form>
                </Dialog>
            </div>
        </>
    );
}
