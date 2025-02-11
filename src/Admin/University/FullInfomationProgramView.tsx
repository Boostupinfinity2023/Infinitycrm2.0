import { Button, Tabs, Tab, Card, CardBody, Accordion, AccordionItem, User } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import ProgramRecord from '../../__PrivateApi/ViewProgramApi';
import style from './style.css';
import debounce from 'lodash.debounce';
import Upload from './components/upload';
import { useParams } from 'react-router-dom';
import { Empty } from 'antd';
import { BookOutlined, CalendarOutlined, DollarOutlined, HomeOutlined, EnvironmentOutlined } from '@ant-design/icons';
export default function Component() {
    const [ProgramData, setProgramData]: any = useState([]);
    const [ProgramIntake, setProgramintake]: any = useState([]);
    const [intakeInfo, setIntakeInfo] = useState([]);
    const { programId } = useParams();
    const [loading, setloading] = useState(true);
    const [Refresh, setrefresh] = useState(true);
    const debouncedFetchData = debounce(async () => {
        if (Refresh === true) {
            try {
                let programIdNumber: number;
                if (programId !== undefined) {
                    programIdNumber = parseInt(programId, 10);
                } else {
                    programIdNumber = 0;
                }
                const response = await ProgramRecord(programIdNumber);
                setProgramData(response?.data[0] || []);

                setProgramintake(JSON.parse(response?.data[0]['INTAKES']) || []);
                setloading(false);
                setrefresh(false);
            } catch (error) {
                console.error(error);
            }
            setLoader(false);
        }
    }, 500);
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        if (loader === true || Refresh === true) {
            debouncedFetchData();
        }
    }, [loader, Refresh]);
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    useEffect(() => {
        if (ProgramIntake != null) {
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth() + 1;

            const processedIntakes = ProgramIntake.map((intake: any) => {
                let intakeYear = currentYear;
                if (intake.PROGRAM_INTAKE_MONTH < currentMonth) {
                    intakeYear = currentYear + 1;
                }
                let submissionYear = intakeYear;
                if (intake.APPLICATION_SUBMISSION_MONTH > intake.PROGRAM_INTAKE_MONTH) {
                    submissionYear = intakeYear - 1;
                }
                let closingYear = submissionYear;
                if (intake.APPLICATION_CLOSING_MONTH > intake.APPLICATION_SUBMISSION_MONTH &&
                    intake.APPLICATION_CLOSING_MONTH <= intake.PROGRAM_INTAKE_MONTH) {
                    closingYear = intakeYear;
                }

                return {
                    ID: intake.ID,
                    intakeMonth: intake.PROGRAM_INTAKE_MONTH,
                    intakeYear,
                    submissionDate: intake.APPLICATION_SUBMISSION_DATE,
                    submissionMonth: intake.APPLICATION_SUBMISSION_MONTH,
                    submissionYear,
                    closingDate: intake.APPLICATION_CLOSING_DATE,
                    closingMonth: intake.APPLICATION_CLOSING_MONTH,
                    closingYear,
                };
            }).filter((intake: any) => {
                if (intake.intakeYear > currentYear) return true;
                if (intake.intakeYear === currentYear && intake.intakeMonth >= currentMonth) return true;
                return false;
            }).sort((a: any, b: any) => {
                if (a.intakeYear !== b.intakeYear) {
                    return a.intakeYear - b.intakeYear;
                }
                return a.intakeMonth - b.intakeMonth;
            });

            setIntakeInfo(processedIntakes);
        }
    }, [ProgramIntake]);





    if (loading) return <div>loading page....</div>;

    const parseOrEmptyArray = (data: any) => {
        try {
            return data ? JSON.parse(data) : [];
        } catch (error) {
            return [];
        }
    };
    const ProgramArrayData = parseOrEmptyArray(ProgramData.FEES)[0] || [];
    const ADMISSION_REQUIREMENTS = parseOrEmptyArray(ProgramData.ADMISSION_REQUIREMENTS)[0] || [];
    const PROGRAM_MINIMUM_LANGUAGE_TEST_SCORES = parseOrEmptyArray(ProgramData.PROGRAM_MINIMUM_LANGUAGE_TEST_SCORES);
    const PROGRAM_INTAKE = parseOrEmptyArray(ProgramData.INTAKES);

    const calculateOverallBand = (value: any) => {
        const writingScore = parseFloat(value.MINIMUM_WRITING_SCORE);
        const listeningScore = parseFloat(value.MINIMUM_LISTENING_SCORE);
        const readingScore = parseFloat(value.MINIMUM_READING_SCORE);
        const speakingScore = parseFloat(value.MINIMUM_SPEAKING_SCORE);
        const ExamType = value.TEST_NAME;


        const isValidToeflScore = (score: any) => score >= 0 && score <= 30;
        const isValidPteScore = (score: any) => score >= 0 && score <= 90;
        const isValidIeltsScore = (score: any) => score >= 0 && score <= 9;

        let totalScore;
        if (ExamType === "TOEFL") {
            if (
                isValidToeflScore(readingScore) &&
                isValidToeflScore(listeningScore) &&
                isValidToeflScore(speakingScore) &&
                isValidToeflScore(writingScore)
            ) {
                totalScore = readingScore + listeningScore + speakingScore + writingScore;
                return totalScore;
            }
        } else if (ExamType === "PTE") {
            if (
                isValidPteScore(readingScore) &&
                isValidPteScore(listeningScore) &&
                isValidPteScore(speakingScore) &&
                isValidPteScore(writingScore)
            ) {
                totalScore = (readingScore + listeningScore + speakingScore + writingScore) / 4;
                return totalScore;
            }
        }
        else if (ExamType === "IELTS") {
            if (
                isValidIeltsScore(readingScore) &&
                isValidIeltsScore(listeningScore) &&
                isValidIeltsScore(speakingScore) &&
                isValidIeltsScore(writingScore)
            ) {
                totalScore = listeningScore + readingScore + writingScore + speakingScore;
                const averageScore = totalScore / 4;
                const roundedScore = Math.round(averageScore * 2) / 2;

                return roundedScore.toFixed(1);
            }
        }
    };

    return (
        <div className={`w-full p-10 rounded-2xl ${style}`}>
            <div className="inner_header">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{ProgramData?.PROGRAM_NAME}</h1>
                        <p className="mt-2 text-lg text-muted-foreground">{ProgramData?.UNIVERSITY_NAME}</p>
                    </div>
                </div>
                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center ">
                    <div className="flex items-center gap-1 set_text_bg_header">
                        <BookOutlined className="h-5 w-5 text-muted-foreground" />
                        <p className="text_header">{ProgramArrayData['PROGRAM_LEVEL']}</p>
                    </div>
                    <div className="flex items-center gap-1 set_text_bg_header">
                        <CalendarOutlined className="h-5 w-5 text-muted-foreground" />
                        <p className="text_header">{ProgramArrayData?.PROGRAM_LENGTH}</p>
                    </div>
                    <div className="flex items-center gap-1 set_text_bg_header">
                        <EnvironmentOutlined className="h-5 w-5 text-muted-foreground" />
                        <p className="text_header">{ProgramData?.ADDRESS}</p>
                    </div>
                    <div className="flex items-center gap-1 set_text_bg_header">
                        <DollarOutlined className="h-5 w-5 text-muted-foreground" />
                        <p className="text_header">{ProgramArrayData?.GROSS_TUITION} Tuition</p>
                    </div>
                    <div className="flex items-center gap-1 set_text_bg_header">
                        <HomeOutlined className="h-5 w-5 text-muted-foreground" />
                        <p className="text_header">{ProgramArrayData?.COST_OF_LIVING} Cost of Living</p>
                    </div>
                </div>
            </div>
            <section className="img_section">
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <Upload imageData={ProgramData.IMAGES} setrefresh={setrefresh} />
                    </div>
                </div>
            </section>
            <section className="first_section">
                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 col_left_tabs">
                        <div className="flex w-full flex-col">
                            <Tabs aria-label="Options" color="primary">
                                <Tab key="Overview" title="Overview">
                                    <Card>
                                        <CardBody>
                                            <h3 className="tag_h3_tab">
                                                <svg
                                                    aria-hidden="true"
                                                    className="tab_svg"
                                                    data-icon-color="primary"
                                                    data-icon-contrast="mid"
                                                    role="img"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M12.9713 3.39561C12.3672 3.06003 11.6327 3.06003 11.0287 3.39561L2.51434 8.1258L3.48563 9.87412L12 5.14392L20.5143 9.87412L21.4856 8.1258L12.9713 3.39561Z"></path>
                                                    <path d="M11 17V11H13V17H11Z"></path>
                                                    <path d="M20 21H4V19H20V21Z"></path>
                                                    <path d="M6 11V17H8V11H6Z"></path>
                                                    <path d="M16 17V11H18V17H16Z"></path>
                                                </svg>
                                                Program Summary
                                            </h3>
                                            <p className="tag_p_tab" dangerouslySetInnerHTML={{ __html: ProgramData?.PROGRAM_SUMMARY }} />
                                            <br />
                                            <h3 className="tag_h3_tab">
                                                <svg
                                                    aria-hidden="true"
                                                    className="tab_svg"
                                                    data-icon-color="primary"
                                                    data-icon-contrast="mid"
                                                    role="img"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M10 5C10 4.44772 10.4477 4 11 4H13C13.5523 4 14 4.44772 14 5V19C14 19.5523 13.5523 20 13 20H11C10.4477 20 10 19.5523 10 19V5Z"></path>
                                                    <path d="M4 13C4 12.4477 4.44772 12 5 12H7C7.55228 12 8 12.4477 8 13V19C8 19.5523 7.55228 20 7 20H5C4.44772 20 4 19.5523 4 19V13Z"></path>
                                                    <path d="M17 9C16.4477 9 16 9.44771 16 10V19C16 19.5523 16.4477 20 17 20H19C19.5523 20 20 19.5523 20 19V10C20 9.44772 19.5523 9 19 9H17Z"></path>
                                                </svg>
                                                Admission Requirements
                                            </h3>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="col-span-2">
                                                    <h4 className="tag_h4_tab">Academic Background</h4>
                                                </div>
                                                <div className="tab_box1">
                                                    <p className="tag_p_tab">Minimum Level of Education Completed</p>
                                                    <h3 className="tag_h3_tab">{ADMISSION_REQUIREMENTS?.REQUIREMENT_DESCRIPTION}</h3>
                                                </div>
                                                <div className="tab_box1">
                                                    <p className="tag_p_tab">Minimum GPA</p>
                                                    <h3 className="tag_h3_tab">{ADMISSION_REQUIREMENTS?.GPA ? ADMISSION_REQUIREMENTS?.GPA : '-'}</h3>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 pt-5">
                                                <div className="col-span-2">
                                                    <h4 className="tag_h4_tab">Minimum Language Test Scores</h4>
                                                </div>
                                                {PROGRAM_MINIMUM_LANGUAGE_TEST_SCORES.length > 0 ? (
                                                    PROGRAM_MINIMUM_LANGUAGE_TEST_SCORES.map((value: any, index: any) => (

                                                        <div className="tab_box2" key={index}>
                                                            <Accordion key={index}>
                                                                <AccordionItem
                                                                    key={index}
                                                                    aria-label="Accordion 1"
                                                                    title={value.TEST_NAME}
                                                                    subtitle={
                                                                        <span>
                                                                            {value.TEST_NAME === 'DUOLINGO' ? (
                                                                                <strong className="tag_h3_tab pt-5">{value?.MINIMUM_TOTAL_SCORE}</strong>
                                                                            ) : (
                                                                                <strong className="tag_h3_tab pt-5">{calculateOverallBand(value)}</strong>
                                                                            )}
                                                                        </span>
                                                                    }
                                                                >
                                                                    {value.TEST_NAME === 'DUOLINGO' ? null : (
                                                                        <div className="grid grid-cols-4 gap-4">
                                                                            <div>
                                                                                <p className="tag_p_tab">Writing</p>
                                                                                <h3 className="tag_h3_tab">{value?.MINIMUM_WRITING_SCORE}</h3>
                                                                            </div>
                                                                            <div>
                                                                                <p className="tag_p_tab">Listening</p>
                                                                                <h3 className="tag_h3_tab">{value?.MINIMUM_LISTENING_SCORE}</h3>
                                                                            </div>
                                                                            <div>
                                                                                <p className="tag_p_tab">Reading</p>
                                                                                <h3 className="tag_h3_tab">{value?.MINIMUM_READING_SCORE}</h3>
                                                                            </div>
                                                                            <div>
                                                                                <p className="tag_p_tab">Speaking</p>
                                                                                <h3 className="tag_h3_tab">{value?.MINIMUM_SPEAKING_SCORE}</h3>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </AccordionItem>
                                                            </Accordion>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <Empty />
                                                )}
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                    <div className="col_right_tabs">
                        <Tabs aria-label="Options" color="primary">
                            <Tab key="Fees" title="Fees">
                                <Card>
                                    <CardBody>
                                        <User
                                            className="set_user_tag items-left justify-start item-start"
                                            name={ProgramArrayData?.PROGRAM_LEVEL}
                                            description="Program Level"
                                            avatarProps={{
                                                src: '/document.svg',
                                            }}
                                        />
                                        <User
                                            className="set_user_tag items-left justify-start item-start"
                                            name={ProgramArrayData?.PROGRAM_LENGTH}
                                            description="Program Length"
                                            avatarProps={{
                                                src: '/calendar.svg',
                                            }}
                                        />
                                        <User
                                            className="set_user_tag items-left justify-start item-start"
                                            name={ProgramArrayData?.COST_OF_LIVING}
                                            description="Cost of Living"
                                            avatarProps={{
                                                src: '/house-value.svg',
                                            }}
                                        />
                                        <User
                                            className="set_user_tag items-left justify-start item-start"
                                            name={ProgramArrayData?.GROSS_TUITION}
                                            description="Gross Tuition"
                                            avatarProps={{
                                                src: '/money-bag.svg',
                                            }}
                                        />
                                        <User
                                            className="set_user_tag items-left justify-start item-start"
                                            name={ProgramArrayData?.APPLICATION_FEE}
                                            description="Application Fee"
                                            avatarProps={{
                                                src: '/save-money.svg',
                                            }}
                                        />
                                    </CardBody>
                                </Card>
                            </Tab>
                            <Tab key="Intakes" title="Intakes">
                                <Card>
                                    <CardBody>
                                        {intakeInfo.length > 0 ? (
                                            <div>
                                                {intakeInfo.map((intake: any, index: number) => (
                                                    <Accordion key={index}>
                                                        <AccordionItem
                                                            aria-label={`Accordion ${index + 1}`}
                                                            // title="Will open"
                                                            subtitle={
                                                                <span>
                                                                    <strong className="tag_h5_tab pt-5">
                                                                        {monthNames[intake.intakeMonth - 1]} {intake.intakeYear}
                                                                    </strong>
                                                                </span>
                                                            }
                                                        >
                                                            <div className="grid grid-cols-4 gap-4">
                                                                <div className="col-span-2">
                                                                    <p>Open date</p>
                                                                    <br />
                                                                    <p>Submission deadline</p>
                                                                </div>
                                                                <div className="grid grid-cols-subgrid gap-4 col-span-2">
                                                                    <div className="col-start-2">
                                                                        <b>{intake.submissionDate} {monthNames[intake.submissionMonth - 1]} {intake.submissionYear}</b>
                                                                        <br />
                                                                        <br />
                                                                        <b>{intake.closingDate} {monthNames[intake.closingMonth - 1]} {intake.closingYear}</b>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </AccordionItem>
                                                    </Accordion>
                                                ))}
                                            </div>
                                        ) : (
                                            <p>No intake information available.</p>
                                        )}
                                    </CardBody>
                                </Card>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </section>
        </div>
    );
}
