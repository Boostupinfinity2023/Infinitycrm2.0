import { PenLine, Inbox, Star, Clock, Send, File, MoreVertical, Trash2 } from 'lucide-react';
import Compose from './Compose_modal';
import React, { useState } from 'react';

export default function MailSidebar({ setActiveComponent }: any) {
    const menuItems = [
        { icon: Inbox, label: "Inbox", count: "" },
        { icon: Star, label: "Starred" },
        { icon: Send, label: "Sent" },
        { icon: Trash2, label: "Trash", count: "" },
    ];
    const [DisplayCompose, setdisplaycompose] = useState(false);
    const [Ativecomponent, setactivecomponents] = useState('Inbox');

    const handleMenuClick = (componentName: any) => {
        setactivecomponents(componentName);
        setActiveComponent(componentName); // Set the active component when a menu item is clicked
    };

    return (
        <div className="w-64 p-4 Mail-sidebar">
            <button className="Mail-compose" onClick={() => setdisplaycompose(true)}>
                <PenLine className="w-5 h-5" />
                Compose
            </button>

            <div className="space-y-1 mt-4">
                {menuItems.map((item) => (
                    <button
                        key={item.label}
                        onClick={() => handleMenuClick(item.label)} // Set the active component on click
                        className={`w-full flex items-center gap-4 px-4 py-2 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 ${item.label === Ativecomponent ? "bg-[#d3e3fd] dark:bg-gray-800" : ""}`}
                    >
                        <item.icon className="w-5 h-5" />
                        <span className="flex-1 text-left">{item.label}</span>
                        {item.count && (
                            <span className="text-sm text-gray-500">{item.count}</span>
                        )}
                    </button>
                ))}

            </div>

            {DisplayCompose && <Compose onClose={setdisplaycompose} />}
        </div>
    );
}
