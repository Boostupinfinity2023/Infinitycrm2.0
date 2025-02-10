import { Menu, Search, Settings, HelpCircle, AppWindowIcon as Apps, User, MailSearch, Mail, Tangent } from 'lucide-react'
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { setGooglesearch } from '../../store/themeConfigSlice';
import { PenLine } from 'lucide-react';
import Compose from './Compose_modal';
export default function Mailnavbar(props: any) {

    const { userinfo } = props;
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    useEffect(() => {
        const timeout = setTimeout(() => {
            dispatch(setGooglesearch(search));
        }, 1000);

        return () => clearTimeout(timeout);
    }, [search]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };
    const [DisplayCompose, setdisplaycompose] = useState(false);
    return (
        <header className="flex items-center justify-between h-16 px-4 Mail-header">

            <div className="flex-1 max-w-xl ">
                <div className="flex items-center bg-[#eaf1fb] dark:bg-gray-800 rounded-[100px] p-[20px] px-4 py-2">
                    <Search className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    <input
                        onChange={handleSearchChange}
                        type="text"
                        placeholder="Search by From/Subject/Body"
                        className="w-full bg-[transparent] border-none outline-none p-[5px] px-4 text-gray-900 dark:text-gray-100 placeholder-gray-500"
                    />
                </div>
            </div>
            <div className="flex items-center gap-2">
                <button className="Mail-compose" onClick={() => setdisplaycompose(true)}>
                    <PenLine className="w-5 h-5" />
                    Compose
                </button>
                {DisplayCompose && <Compose onClose={setdisplaycompose} />}
            </div>

        </header>
    )
}

