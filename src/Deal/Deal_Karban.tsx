import { useState } from 'react';
import './css/style.css';
import Deal_category from './Helper/deal_category';
import Table from '../pages/agent/student/student_record';
import { Tabs, Tab } from "@nextui-org/react";
import Create_Button from './Button/Create_Deal';
import DragData from './Helper/Deal_Drag';
import { NavLink } from 'react-router-dom';
import AddStudent from '../pages/agent/Students';
import Myapplication from '../pages/agent/student/My_application/myapplication';
export default function LoadPage() {
    const [isloader, setLoader] = useState(true);
    const [pagerefresh, setpageRefresh] = useState(false);
    const [activeTab, setActiveTab] = useState('My-application')
    const tabs = [
        {
            id: 'My-application',
            label: 'My Application'
        },
        {
            id: 'Student-list',
            label: 'Student List'
        }
    ]

    return (
        <>
            <div>
                <ul className="flex justify-between">
                    <li>
                        <h4 className="bold-font-700 font-32px">Application Record</h4>
                    </li>
                    <li className="flex gap-3">
                        <AddStudent Refresh={setpageRefresh} />
                        <button
                            className="btn modal-btn-custom"
                            onClick={() => {
                                pagerefresh ? setpageRefresh(false) : setpageRefresh(true);
                            }}
                        >
                            Refresh
                        </button>
                    </li>
                </ul>
            </div>

            <div className='Managepeople-Div mt-4 grid gap-3' >

                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`whitespace-nowrap border-b-2 py-2 px-1 text-md font-medium transition-colors ${activeTab === tab.id
                                    ? 'border-[#006ED9] text-[#006ED9]'
                                    : 'border-transparent text-black-500 hover:border-black-500 hover:text-black-700'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>

                </div>


                {activeTab === 'My-application' ?
                    <div className='User-table '>
                        <Myapplication pagerefresh={pagerefresh} />
                    </div>
                    :
                    <div className='Student-list'>
                        <Table pagerefresh={pagerefresh} />
                    </div>
                }


            </div>

        </>
    );
}
const top100Films = [
    { title: 'Pending', year: 1994 },
    { title: 'In-progress', year: 1972 },
];
