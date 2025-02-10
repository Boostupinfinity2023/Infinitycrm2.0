import React, { useState, useEffect, useCallback } from 'react';
import { Checkbox, Drawer, Space, Row } from 'antd';
import { Search } from "lucide-react"
import { Input } from "@nextui-org/input";
import type { DrawerProps } from 'antd';
import jwt from '../../../getLoggedUser/GetUserInfomation';
import { useParams } from 'react-router-dom';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeicons/primeicons.css';
import './../../../pages/university/university-flag.css';
import './../../../pages/university/university.css';
import { university_Api } from '../../../APIurl/url';
import { NavLink } from 'react-router-dom';
import ApplyCourse from './ApplyCourse';
import Calculateintak from './calculateintak';
import AddProgram from '../../../Admin/University/modal/AddNewProgram';
import BlankSkelenton from './Blank_skeleton';
import { debounce } from 'lodash';
import { Pagination, Spinner } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
interface CourseProps {
    ClientData: any;
    Refreshda: any;
}

const DocumentRequire: React.FC<CourseProps> = ({ ClientData, Refreshda }) => {
    const globalVar = window.globalVariable;
    const [open, setOpen] = useState(false);
    const [size, setSize] = useState<DrawerProps['size']>();
    const [Universitylist, setUniversitylist] = useState([]);
    const [program, setProgram] = useState([]);
    const [filteredProgram, setFilteredProgram] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loader, setLoader] = useState(false);

    const [Limit, setLimit] = useState(12);
    const [currentPage, setPage] = useState(1);
    const [Totalpages, setTotalpages] = useState(1);

    // University
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUniversity, setSelectedUniversity] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedProgramLevel, setSelectedProgramLevel] = useState('');


    const { client_id } = useParams();
    const Token = jwt('jwt');

    const showLargeDrawer = () => {
        setSize('large');
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    const FetchUniverditydata = async () => {
        setLoader(true);
        const response = await fetch(university_Api + `?view=university-data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authenticate: `Bearer ${Token}`,
            },
            body: JSON.stringify({
                PAGE_REQUEST: 'GET_UNIVERSITY_NAME_DATA',
            }),
        });
        const data = await response.json();
        if (data.status) {
            setUniversitylist(data.data);
        }
    };
    const debouncedFetchUniversitryData = useCallback(debounce(FetchUniverditydata, 300), []);
    useEffect(() => {

        debouncedFetchUniversitryData();
        return () => {
            debouncedFetchUniversitryData.cancel();
        };
    }, [debouncedFetchUniversitryData, currentPage]);

    const fetchProgramData = async () => {
        setLoader(true);
        const response = await fetch(university_Api + `?view=university-data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authenticate: `Bearer ${Token}`,
            },
            body: JSON.stringify({
                PAGE_REQUEST: 'GET_UNIVERSITY_DATA',
                Student_id: client_id,
                Limit: Limit,
                page: currentPage,
                Totalpages: Totalpages,
                searchQuery,
                selectedUniversity,
                selectedCountry,
                selectedProgramLevel
            }),
        });
        const data = await response.json();
        if (data.status) {
            setLoader(false);
            setProgram(data.data);
            setTotalpages(data.totalPages);
            setFilteredProgram(data.data); // Initialize filteredProgram
        }
    };
    const debouncedFetchProgramData = useCallback(debounce(fetchProgramData, 300), [currentPage, searchQuery, selectedUniversity, selectedCountry, selectedProgramLevel]);
    useEffect(() => {

        debouncedFetchProgramData();
        return () => {
            debouncedFetchProgramData.cancel();
        };
    }, [debouncedFetchProgramData, currentPage]);

    const handleSearch = async () => {
        const searchParams = {
            programName: searchQuery,
            universities: selectedUniversity,
            country: selectedCountry,
            programLevel: selectedProgramLevel,
        };

        console.log(searchParams);

        debouncedFetchProgramData();
    }

    const text = <span>Title</span>;
    const content = (
        <div>
            <p className="popover-content">Additional incentives,</p>
            <p className="popover-content">discounts, or bonus offers</p>
            <p className="popover-content">may exist for this program.</p>
            <p className="popover-content">Please check your Offers</p>
            <p className="popover-content">Dashboard and emails for</p>
            <p className="popover-content">more details.</p>
        </div>
    );

    const Header = ({ logo, title, UPID }: any) => (
        <div>
            <Space className="flex mt-3 ml-3">
                <img alt={'title'} src={logo} className="card-img-custom" />
                <NavLink to={`/staff/university/program/view/${UPID}`} target='_blank'>
                    <div className="underline text-lg">{title} </div>
                </NavLink>
            </Space>
        </div>
    );

    const Footer = (
        <div className="flex justify-between">
            <div>

            </div>
            <div className='pagenation flex justify-center'>
                <Pagination
                    isCompact
                    showControls
                    total={Totalpages}
                    initialPage={currentPage}
                    onChange={(page) => setPage(page)}  // Directly using page from the event
                />

            </div>
            <div>

            </div>
        </div>
    );

    return (
        <>
            <Space className='w-full mb-6 aglingendtablap'>
                <button className="btn btn-primary" onClick={showLargeDrawer}>
                    Add Program
                </button>
            </Space>
            <Drawer title={
                <div className="flex ">
                    <div className="text-lg">Add Program</div>
                    <div className="custom-flex-item justify-end gap-4">
                        <AddProgram />
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                onClose();
                            }}
                        >
                            X
                        </button>
                    </div>
                </div>
            } className="font-Nunito new-header-class" placement="left" width={'100%'} onClose={onClose} open={open} closable={false} footer={Footer}>

                <header className="w-full mx-auto p-4 space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Input
                            startContent={
                                <Search className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                            }
                            className="max-w-md py-2"
                            placeholder="What would you like to study? (e.g., computer science)"
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)} // Update search query on change
                        />
                        <Select
                            className="max-w-xs py-2"
                            isMultiline={true}
                            placeholder="Institution"
                            aria-label="Institution"
                            onChange={(e) => setSelectedUniversity(e.target.value)} // Update selected universities
                        >
                            {Universitylist.map((university: any) => (
                                <SelectItem key={university.ID} value={university.ID}>
                                    {university.NAME}
                                </SelectItem>
                            ))}
                        </Select>

                    </div>



                </header>
                <div className="design_bg_university ">
                    {loader ? (
                        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
                            <BlankSkelenton />
                        </div>
                    ) : (
                        <div className="grid grid-cols-4 gap-2">
                            {filteredProgram.map((value: any, index: number) => (
                                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
                                    <div className="p-4 border-b border-gray-200">
                                        <div className="flex items-center gap-3">
                                            <img src={value.UNIVERSITY_LOGO} alt={`${value.PROGRAM_NAME} logo`} className="w-10 h-10 rounded-full" />
                                            <h3 className="text-sm font-semibold leading-tight line-clamp-2 font-serif" >{value.UNIVERSITY_NAME}</h3>
                                        </div>
                                    </div>
                                    <div className="p-4 flex-grow flex flex-col justify-between">
                                        <div>
                                            <p className="text-xs text-gray-600 mb-1">{value.PROGRAM_LEVEL}</p>
                                            <h4 className="font-semibold text-sm mb-2 line-clamp-2 font-serif"><NavLink to={`/${globalVar.ROLE}/university/program/view/${value.IDS}`} target={'_blank'} >{value.PROGRAM_NAME}</NavLink></h4>
                                            <div className="space-y-1 text-xs font-serif">
                                                <p><span className="font-semibold">Location :</span> {value.PROGRAM_ADDRESS ?? 'empty'}</p>
                                                <p><span className="font-semibold">Campus city :</span> {value.PROGRAM_CITY ?? 'empty'}</p>
                                                <p><span className="font-semibold">Gross tuition fee :</span> {value.GROSS_TUITION ?? 'empty'}</p>
                                                <p><span className="font-semibold">Application fee :</span> {value.APPLICATION_FEE ?? 'empty'}</p>
                                                <p><span className="font-semibold">Duration:</span> {value.PROGRAM_LENGTH ?? 'empty'}</p>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <h5 className="text-xs font-semibold mb-2">Success prediction</h5>
                                            <div className=" justify-between">
                                                <Calculateintak intakeData={value.UNIVERSITY_PROGRAM_INTAKE} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 border-t border-gray-200">
                                        <ApplyCourse ClientData={ClientData} program_infomation={value} intake={<Calculateintak intakeData={value.UNIVERSITY_PROGRAM_INTAKE} />} onCloseprvies={onClose} Refreshda={Refreshda} />
                                    </div>
                                </div>

                            ))}
                        </div>
                    )}
                </div>

            </Drawer>
        </>
    );
};

export default DocumentRequire;
