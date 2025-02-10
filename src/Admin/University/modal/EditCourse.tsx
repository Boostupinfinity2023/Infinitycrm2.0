import React, { useState, useRef, useEffect } from 'react';
import { Drawer, Input, notification, message } from 'antd';
import { Button } from '@nextui-org/react';
import { InsertAction } from '../../../FormHandler/InsertAction';
import { university_Api } from '../../../APIurl/url';
import token from '../../../getLoggedUser/GetUserInfomation';
import { NavLink, useParams } from 'react-router-dom';
import { Editor } from 'primereact/editor';
import './modal-phone.css';
import { Collapse, Divider } from 'antd';
interface EditUniversityProps {
    children: React.ReactNode;
}
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;
import EditNoteIcon from '@mui/icons-material/EditNote';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);
const App: React.FC<EditUniversityProps> = ({ children }) => {
    const CourseUpdateInfomation: any = children;
    const { universityId } = useParams();
    const [text, setText] = useState(CourseUpdateInfomation.PROGRAM_SUMMARY);
    const [open, setOpen] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const showDrawer = () => {
        setOpen(true);
    };
    const { TextArea } = Input;
    const onClose = () => {
        setOpen(false);
    };
    const jwttoken = token('jwt');
    const formRef: any = useRef<HTMLFormElement>(null);
    const [loader, setloader] = useState(false);





    const [ExamData, setExamData] = useState([{
        "id": 1,
        "value": "IELTS",
        "label": "IELTS"
    },
    {
        "id": 2,
        "value": "PTE",
        "label": "PTE"
    },
    {
        "id": 3,
        "value": "CECPIP",
        "label": "CECPIP"
    },
    {
        "id": 4,
        "value": "CAEL",
        "label": "CAEL"
    },
    {
        "id": "DUOLINGO",
        "value": "DUOLINGO",
        "label": "DUOLINGO"
    },
    {
        "id": 6,
        "value": "UKVI",
        "label": "UKVI"
    },
    {
        "id": 8,
        "value": "TOEFL",
        "label": "TOEFL"
    }
    ]);

    const ProgramAndfees = () => {
        return (
            <div className="font-thin">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 ">
                        <label htmlFor="name">
                            Program Level <span className="text-danger">*</span>
                        </label>
                        <Input id="name" type="text" name="UNIVERSITY_PROGRAMS_FEES[PROGRAM_LEVEL]" placeholder="Enter Program Name " className="design_input" defaultValue={CourseUpdateInfomation.PROGRAM_LEVEL} />
                    </div>
                    <div className="space-y-2 ">
                        <label htmlFor="name">
                            Program Length <span className="text-danger">*</span>
                        </label>
                        <Input id="name" type="text" name="UNIVERSITY_PROGRAMS_FEES[PROGRAM_LENGTH]" placeholder="Enter Campus name" className="design_input" defaultValue={CourseUpdateInfomation.PROGRAM_LENGTH} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
                    <div className="space-y-2 ">
                        <label htmlFor="name">
                            Cost of Living<span className="text-danger">*</span>
                        </label>
                        <Input id="name" type="text" name="UNIVERSITY_PROGRAMS_FEES[COST_OF_LIVING]" placeholder="Enter Program Name " className="design_input" defaultValue={CourseUpdateInfomation.COST_OF_LIVING} />
                    </div>
                    <div className="space-y-2 ">
                        <label htmlFor="name">
                            Gross Tuition <span className="text-danger">*</span>
                        </label>
                        <Input id="name" type="text" name="UNIVERSITY_PROGRAMS_FEES[GROSS_TUITION]" placeholder="Enter Campus name" className="design_input" defaultValue={CourseUpdateInfomation.GROSS_TUITION} />
                    </div>
                    <div className="space-y-2 ">
                        <label htmlFor="name">
                            Application Fee <span className="text-danger">*</span>
                        </label>
                        <Input id="name" type="text" name="UNIVERSITY_PROGRAMS_FEES[APPLICATION_FEE]" placeholder="Enter Campus name" className="design_input" defaultValue={CourseUpdateInfomation.APPLICATION_FEE} />
                    </div>
                </div>
            </div>
        );
    };

    const AddmissionRequrement = () => {
        return (
            <div className="font-thin">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 ">
                        <label htmlFor="name">
                            Minimum Level of Education Completed <span className="text-danger">*</span>
                        </label>
                        <Input id="name" type="text" name="UNIVERSITY_PROGRAM_ADMISSION_REQUIREMENTS[REQUIREMENT_DESCRIPTION]" placeholder="Enter Program Name " className="design_input" defaultValue={CourseUpdateInfomation.REQUIREMENT_DESCRIPTION} />
                    </div>
                    <div className="space-y-2 ">
                        <label htmlFor="name">
                            Minimum GPA <span className="text-danger">*</span>
                        </label>
                        <Input id="name" type="text" name="UNIVERSITY_PROGRAM_ADMISSION_REQUIREMENTS[GPA]" placeholder="Enter Campus name" className="design_input" defaultValue={CourseUpdateInfomation.GPA} />
                    </div>
                </div>
            </div>
        );
    };

    const LanguageTestScore = () => {
        const [LanguageScoreField, setLanguageScoreField]: any = useState(JSON.parse(CourseUpdateInfomation.PROGRAM_MINIMUM_LANGUAGE_TEST_SCORES));

        const selectExamData = (index: any, value: any) => {
            const updatedFields = LanguageScoreField.map((field: any, i: any) => (i === index ? { ...field, TEST_NAME: value } : field));
            setLanguageScoreField(updatedFields);
        };

        const handleScoreChange = (index: any, name: any, value: any) => {
            const updatedFields = LanguageScoreField.map((field: any, i: any) => (i === index ? { ...field, [name]: value } : field));
            setLanguageScoreField(updatedFields);
        };

        const addField = () => {
            setLanguageScoreField([...LanguageScoreField, { exam: '', scores: {} }]);
        };

        const removeField = (index: any, ID: any) => {

            if (ID !== null) {
                MySwal.fire({
                    title: 'Are you sure?',
                    text: "Do you want to delete this Test Score?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#006ed9',
                    cancelButtonColor: '#006ed9',
                    confirmButtonText: 'Yes, delete it!',
                    cancelButtonText: 'Cancel',
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            const Header = {
                                Authenticate: `Bearer ${jwttoken}`,
                            };

                            const Body = JSON.stringify({
                                'PAGE_REQUEST': 'Delete_TEST_SCORES_database',
                                'TEST_SCORES_ID': ID,
                            }
                            );

                            const response = await InsertAction(university_Api, Body, 'POST', Header);

                            if (response.status === false) {
                                message.error(response.message);
                            } else {
                                message.success(response.message);
                                setLanguageScoreField(LanguageScoreField.filter((_: any, i: any) => i !== index));
                            }
                        } catch (error) {

                            MySwal.fire('Error!', 'There was an error deleting the intake.', 'error');
                            console.error('Deletion error:', error);
                        }
                    } else {
                        // If the user cancels, do nothing
                        console.log('Deletion canceled');
                    }
                });
            } else {



                setLanguageScoreField(LanguageScoreField.filter((_: any, i: any) => i !== index));
            }

        };

        return (
            <div className="font-thin">
                {LanguageScoreField.map((field: any, index: any) => (
                    <>
                        <div key={index} className="grid grid-cols-2  gap-6 mb-6">
                            <div className="space-y-2 ">
                                <input type="hidden" value={field.TEST_ID} name='UNIVERSITY_PROGRAM_MINIMUM_LANGUAGE_TEST_SCORES[TEST_SCORE_ID][]' />
                                <label htmlFor={`exams-${index}`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Select an option
                                </label>
                                <select id={`exams-${index}`} name='UNIVERSITY_PROGRAM_MINIMUM_LANGUAGE_TEST_SCORES[TEST_NAME][]' className="design_input p-3" value={field.TEST_NAME} onChange={(e) => selectExamData(index, e.target.value)}>
                                    <option value="">Choose an exam</option>
                                    {ExamData.map((exam: any, idx: any) => (
                                        <option key={idx} value={exam.value}>
                                            {exam.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {(field.TEST_NAME === 'IELTS' || field.TEST_NAME === 'PTE' || field.TEST_NAME === 'CAEL' || field.TEST_NAME === 'CECPIP' || field.TEST_NAME === 'TOEFL') && (
                                <>
                                    <div className="space-y-2">
                                        <label htmlFor={`reading-${index}`}>
                                            Reading <span className="text-danger">*</span>
                                        </label>
                                        <Input
                                            id={`reading-${index}`}
                                            type="text"
                                            name="UNIVERSITY_PROGRAM_MINIMUM_LANGUAGE_TEST_SCORES[MINIMUM_READING_SCORE][]"
                                            placeholder="Enter Reading score"
                                            className="design_input"
                                            value={field.MINIMUM_READING_SCORE || ''}
                                            onChange={(e) => handleScoreChange(index, 'MINIMUM_READING_SCORE', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor={`writing-${index}`}>
                                            Writing <span className="text-danger">*</span>
                                        </label>
                                        <Input
                                            id={`writing-${index}`}
                                            type="text"
                                            name="UNIVERSITY_PROGRAM_MINIMUM_LANGUAGE_TEST_SCORES[MINIMUM_WRITING_SCORE][]"
                                            placeholder="Enter Writing score"
                                            className="design_input"
                                            value={field.MINIMUM_WRITING_SCORE || ''}
                                            onChange={(e) => handleScoreChange(index, 'MINIMUM_WRITING_SCORE', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor={`listening-${index}`}>
                                            Listening <span className="text-danger">*</span>
                                        </label>
                                        <Input
                                            id={`listening-${index}`}
                                            type="text"
                                            name="UNIVERSITY_PROGRAM_MINIMUM_LANGUAGE_TEST_SCORES[MINIMUM_LISTENING_SCORE][]"
                                            placeholder="Enter Listening score"
                                            className="design_input"
                                            value={field.MINIMUM_LISTENING_SCORE || ''}
                                            onChange={(e) => handleScoreChange(index, 'MINIMUM_LISTENING_SCORE', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor={`speaking-${index}`}>
                                            Speaking <span className="text-danger">*</span>
                                        </label>
                                        <Input
                                            id={`speaking-${index}`}
                                            type="text"
                                            name="UNIVERSITY_PROGRAM_MINIMUM_LANGUAGE_TEST_SCORES[MINIMUM_SPEAKING_SCORE][]"
                                            placeholder="Enter Speaking score"
                                            className="design_input"
                                            value={field.MINIMUM_SPEAKING_SCORE || ''}
                                            onChange={(e) => handleScoreChange(index, 'MINIMUM_SPEAKING_SCORE', e.target.value)}
                                        />
                                    </div>
                                </>
                            )}
                            {field.TEST_NAME === 'DUOLINGO' && (
                                <div className="space-y-2">
                                    <label htmlFor={`exactScores-${index}`}>
                                        Enter Exact Scores <span className="text-danger">*</span>
                                    </label>
                                    <Input
                                        id={`exactScores-${index}`}
                                        type="text"
                                        name="UNIVERSITY_PROGRAM_MINIMUM_LANGUAGE_TEST_SCORES[MINIMUM_TOTAL_SCORE][]"
                                        placeholder="Enter Exact Scores"
                                        className="design_input"
                                        value={field.MINIMUM_TOTAL_SCORE || ''}
                                        onChange={(e) => handleScoreChange(index, 'MINIMUM_TOTAL_SCORE', e.target.value)}
                                    />
                                </div>
                            )}

                            <button type="button" onClick={() => removeField(index, field.TEST_ID)} className="self-center md:mt-6 mt-0 btn btn-primary">
                                Remove
                            </button>
                        </div>
                        <hr></hr>
                    </>
                ))}
                <button type="button" onClick={addField} className="mt-4 btn btn-primary">
                    Add more
                </button>
            </div>
        );
    };

    let [intakes, setIntakes] = useState(JSON.parse(CourseUpdateInfomation.UNIVERSITY_PROGRAM_INTAKE));

    const ProgramIntakes = () => {
        [intakes, setIntakes] = useState(
            JSON.parse(CourseUpdateInfomation.UNIVERSITY_PROGRAM_INTAKE)
        );
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const popoverRef = useRef<HTMLDivElement>(null)
        const [selectedMonth, setSelectedMonth] = useState<string>('');
        const [isOpen, setIsOpen] = useState<number | null>(null); // Track which month's popover is open

        const handleMonthSelect = (month: string, index: any) => {
            const monthIndex = `${months.indexOf(month) + 1}`;
            const updatedIntakes = intakes.map((intake: any, i: any) =>
                i === index ? { ...intake, PROGRAM_INTAKE_MONTH: monthIndex } : intake
            );
            setIntakes(updatedIntakes);
            setSelectedMonth(month);
            setIsOpen(null); // Close the popover
        };

        const handlesubmission = (index: number, field: string, value: Dayjs | null) => {

            if (value) {
                const [month, day] = value.format('M-D').split('-');
                const updatedIntakes = intakes.map((intake: any, i: any) => {
                    if (i === index) {
                        return {
                            ...intake,
                            APPLICATION_SUBMISSION_DATE: day,      // Update the day
                            APPLICATION_SUBMISSION_MONTH: month,   // Update the month
                        };
                    }
                    return intake;
                });
                setIntakes(updatedIntakes);
            } else {
                const updatedIntakes = intakes.map((intake: any, i: any) => {
                    if (i === index) {
                        return {
                            ...intake,
                            APPLICATION_SUBMISSION_DATE: 0,      // Update the day
                            APPLICATION_SUBMISSION_MONTH: 0,   // Update the month
                        };
                    }
                    return intake;
                });
                setIntakes(updatedIntakes);
            }
        };

        const handlesubmissionClose = (index: number, field: string, value: Dayjs | null) => {

            if (value) {
                const [month, day] = value.format('M-D').split('-');
                const updatedIntakes = intakes.map((intake: any, i: any) => {
                    if (i === index) {
                        return {
                            ...intake,
                            APPLICATION_CLOSING_DATE: day,
                            APPLICATION_CLOSING_MONTH: month,
                        };
                    }
                    return intake;
                });
                setIntakes(updatedIntakes);
            } else {
                const updatedIntakes = intakes.map((intake: any, i: any) => {
                    if (i === index) {
                        return {
                            ...intake,
                            APPLICATION_CLOSING_DATE: 0,      // Update the day
                            APPLICATION_CLOSING_MONTH: 0,   // Update the month
                        };
                    }
                    return intake;
                });
                setIntakes(updatedIntakes);
            }
        };

        const handleRangeSubmission = (index: number, fieldStart: string, fieldEnd: string, value: any) => {
            if (value) {
                const [startDate, endDate] = value;
                const updatedIntakes = intakes.map((intake: any, i: any) => {
                    if (i === index) {
                        return {
                            ...intake,
                            [fieldStart]: startDate.format('YYYY'),
                            [fieldEnd]: endDate.format('YYYY'),
                        };
                    }
                    return intake;
                });
                setIntakes(updatedIntakes);
            }
        };

        const addField = () => {
            setIntakes([...intakes, { PROGRAM_INTAKE_MONTH: '', APPLICATION_SUBMISSION_DATE: '', APPLICATION_SUBMISSION_MONTH: '', APPLICATION_CLOSING_DATE: '', APPLICATION_CLOSING_MONTH: '', SHOW_RESULT_YEAR: '', CLOSE_RESULT_YEAR: '', ID: '' }]);
        };

        const removeField = (index: number, ID: any) => {

            if (ID !== null) {
                MySwal.fire({
                    title: 'Are you sure?',
                    text: "Do you want to delete this intake?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!',
                    cancelButtonText: 'Cancel',
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            const Header = {
                                Authenticate: `Bearer ${jwttoken}`,
                            };

                            const Body = JSON.stringify({
                                'PAGE_REQUEST': 'Delete_Intake_database',
                                'Intak_ID': ID,
                            }
                            );

                            const response = await InsertAction(university_Api, Body, 'POST', Header);

                            if (response.status === false) {
                                message.error(response.message);

                            } else {
                                message.success(response.message);
                                setIntakes(intakes.filter((_: any, i: any) => i !== index));
                            }
                        } catch (error) {
                            message.error('There was an error deleting the intake.');
                            // MySwal.fire('Error!', 'There was an error deleting the intake.', 'error');
                            // console.error('Deletion error:', error);
                        }
                    } else {
                        // If the user cancels, do nothing
                        console.log('Deletion canceled');
                    }
                });
            } else {
                setIntakes(intakes.filter((_: any, i: any) => i !== index));
            }

        };

        const toggleMonthPopover = (index: number) => {
            setIsOpen(isOpen === index ? null : index);
        };

        return (
            <div className="font-thin">
                {intakes.map((intake: any, index: any) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="space-y-2">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Intake Month <span className="text-danger">*</span>
                            </label>

                            <div className="w-full max-w-sm mx-auto relative">
                                <input
                                    type="text"
                                    placeholder="Select a month..."
                                    value={months[parseInt(intake.PROGRAM_INTAKE_MONTH) - 1] || ''}
                                    readOnly
                                    className="design_input p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                    onClick={() => toggleMonthPopover(index)}
                                />
                                {isOpen === index && (
                                    <div ref={popoverRef} className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                                        <div className="p-2">
                                            <div className="grid grid-cols-3 gap-1">
                                                {months.map((month) => (
                                                    <button
                                                        key={month}
                                                        className="px-2 py-1 text-sm text-black-500 font-semibold hover:bg-blue-100 rounded-md"
                                                        onClick={() => handleMonthSelect(month, index)}
                                                    >
                                                        {month.slice(0, 3)}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>


                        </div>

                        <div className="space-y-2">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Submission Date <span className="text-danger">*</span>
                            </label>
                            <DatePicker
                                className="design_input p-3"
                                defaultValue={intake.APPLICATION_SUBMISSION_DATE ? dayjs(`${intake.APPLICATION_SUBMISSION_MONTH}-${intake.APPLICATION_SUBMISSION_DATE}`, 'M-D') : null}
                                format="MMM-DD"
                                onChange={(date: Dayjs | null) => handlesubmission(index, 'submissionDateDay', date)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Submission Close Date <span className="text-danger">*</span>
                            </label>
                            <DatePicker
                                className="design_input p-3"
                                defaultValue={intake.APPLICATION_CLOSING_DATE ? dayjs(`${intake.APPLICATION_CLOSING_MONTH}-${intake.APPLICATION_CLOSING_DATE}`, 'M-D') : null}
                                format="MMM-DD"
                                onChange={(date: Dayjs | null) => handlesubmissionClose(index, 'submissionCloseDay', date)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                View Intake Year <span className="text-danger">*</span>
                            </label>
                            <RangePicker
                                picker="year"
                                value={[
                                    intake.SHOW_RESULT_YEAR ? dayjs(`${intake.SHOW_RESULT_YEAR}`, 'YYYY') : null,
                                    intake.CLOSE_RESULT_YEAR ? dayjs(`${intake.CLOSE_RESULT_YEAR}`, 'YYYY') : null
                                ]}
                                onChange={(value) => handleRangeSubmission(index, 'SHOW_RESULT_YEAR', 'CLOSE_RESULT_YEAR', value)}
                            />
                        </div>

                        <button type="button" onClick={() => removeField(index, intake.ID ? intake.ID : null)} className="self-center md:mt-6 mt-0 btn btn-primary">
                            Remove Intake
                        </button>
                    </div>
                ))}

                <button type="button" onClick={addField} className="btn btn-primary">
                    Add New Intake
                </button>
            </div>
        );
    };

    const handleFormData = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // setloader(true);
        const formData = new FormData(formRef.current);
        formData.append('PAGE_REQUEST', 'UPDATE_PROGRAM_FORM_DATA');
        formData.append('universityId', universityId ? universityId : '0');
        intakes.forEach((intake: any) => {
            formData.append('UNIVERSITY_PROGRAM_INTAKES_DATA[PROGRAM_INTAKE_ID][]', intake.ID);
            formData.append('UNIVERSITY_PROGRAM_INTAKES_DATA[PROGRAM_INTAKE_MONTH][]', intake.PROGRAM_INTAKE_MONTH);
            formData.append('UNIVERSITY_PROGRAM_INTAKES_DATA[APPLICATION_SUBMISSION_DATE][]', intake.APPLICATION_SUBMISSION_DATE);
            formData.append('UNIVERSITY_PROGRAM_INTAKES_DATA[APPLICATION_SUBMISSION_MONTH][]', intake.APPLICATION_SUBMISSION_MONTH);
            formData.append('UNIVERSITY_PROGRAM_INTAKES_DATA[APPLICATION_CLOSING_DATE][]', intake.APPLICATION_CLOSING_DATE);
            formData.append('UNIVERSITY_PROGRAM_INTAKES_DATA[APPLICATION_CLOSING_MONTH][]', intake.APPLICATION_CLOSING_MONTH);
            formData.append('UNIVERSITY_PROGRAM_INTAKES_DATA[SHOW_RESULT_YEAR][]', intake.SHOW_RESULT_YEAR);
            formData.append('UNIVERSITY_PROGRAM_INTAKES_DATA[CLOSE_RESULT_YEAR][]', intake.CLOSE_RESULT_YEAR);
        });
        const Header = {
            Authenticate: `Bearer ${jwttoken}`,
        };
        const response = await InsertAction(university_Api, formData, 'POST', Header);
        if (response.status === false) {
            message.error(response.message);

        } else {
            localStorage.setItem('refresh', 'univeristyData');
            message.success(response.message);
            ;
        }
        setloader(false);
    };

    return (
        <>
            <NavLink to="#" className="btn btn-primary" onClick={showDrawer}>
                <EditNoteIcon />
            </NavLink>
            {contextHolder}
            <Drawer
                title="Edit Program"
                onClose={onClose}
                open={open}
                placement="left"
                className="university_modal_css"
                footer={
                    <div className="flex justify-end gap-3">
                        <Button onClick={onClose} className="danger-btn">
                            Cancel
                        </Button>
                        <Button
                            isLoading={loader}
                            type="button"
                            className="btn btn-primary"
                            onClick={() => {
                                formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                            }}
                        >
                            {loader ? 'Loading...' : 'Update'}
                        </Button>
                    </div>
                }
            >
                <div className="w-full">
                    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
                        <form className="bg-background rounded-lg  p-2  grid gap-6" onSubmit={handleFormData} ref={formRef}>
                            <input type="hidden" name="ProgramId" value={CourseUpdateInfomation.IDS} />
                            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                                <div className="space-y-2 ">
                                    <label htmlFor="name">
                                        Program Name <span className="text-danger">*</span>{' '}
                                    </label>
                                    <Input id="name" type="text" name="Program_name" placeholder="Enter Program Name " className="design_input" defaultValue={CourseUpdateInfomation.PROGRAM_NAME} />
                                </div>
                                {/* <div className="space-y-2 ">
                                    <label htmlFor="name">
                                        Campus Name <span className="text-danger">*</span>{' '}
                                    </label>
                                    <Input
                                        id="name"
                                        type="text"
                                        name="program_Campusname"
                                        placeholder="Enter Campus name"
                                        className="design_input"
                                        defaultValue={CourseUpdateInfomation.PROGRAM_CAMPUS}
                                    />
                                </div> */}
                            </div>

                            <div className="grid grid-cols-3 md:grid-cols-3 gap-2">
                                <div className="space-y-2">
                                    <label htmlFor="street">
                                        Country Name <span className="text-danger">*</span>{' '}
                                    </label>
                                    <Input
                                        id="street"
                                        type="text"
                                        name="program_country"
                                        placeholder="Enter country address"
                                        className="design_input"
                                        defaultValue={CourseUpdateInfomation.PROGRAM_COUNTRY}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="city">
                                        City <span className="text-danger">*</span>{' '}
                                    </label>
                                    <Input id="city" type="text" name="program_city" placeholder="Enter city" className="design_input" defaultValue={CourseUpdateInfomation.PROGRAM_CITY} />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="zip">
                                        Zip Code <span className="text-danger">*</span>{' '}
                                    </label>
                                    <Input
                                        id="zip"
                                        type="text"
                                        name="program_zip_code"
                                        placeholder="Enter zip code"
                                        className="design_input"
                                        defaultValue={CourseUpdateInfomation.PROGRAM_CITY_PINCODE}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="description">
                                    Full Address <span className="text-danger">*</span>{' '}
                                </label>
                                <Input id="email" type="email" name="programAddress" placeholder="Enter full address" className="design_input" defaultValue={CourseUpdateInfomation.PROGRAM_ADDRESS} />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="description">
                                    Program Description <span className="text-danger">*</span>{' '}
                                </label>
                                <Editor value={text} onTextChange={(e: any) => setText(e.htmlValue)} style={{ height: '220px' }} className="rounded-xl " />
                                <input type="hidden" name="ProgramDescription" defaultValue={CourseUpdateInfomation.PROGRAM_SUMMARY} />
                            </div>


                            {/* program Fee */}
                            <Collapse className="font-semibold" size="large" items={[{ key: '1', label: 'Program & Fees', children: <ProgramAndfees /> }]} />

                            <Collapse className="font-semibold" size="large" items={[{ key: '2', label: 'Admission Requirements', children: <AddmissionRequrement /> }]} />

                            <Collapse className="font-semibold" size="large" items={[{ key: '3', label: 'Minimum Language Test Scores', children: <LanguageTestScore /> }]} />

                            <Collapse className="font-semibold" size="large" items={[{ key: '4', label: 'Program Intakes', children: <ProgramIntakes /> }]} />


                        </form>
                    </div>
                </div>

            </Drawer>
        </>
    );
};

export default App;
