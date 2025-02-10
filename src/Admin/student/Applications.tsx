import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import ApplicationList from "./Application";
import Leadtable from "../StaffDeal/Dealtable";

export default function App() {
    const [activeTab, setActiveTab] = useState("Applications");

    useEffect(() => {
        // Check URL hash on component mount
        const hash = window.location.hash;
        if (hash === "#lead") {
            setActiveTab("Lead");
        } else {
            setActiveTab("Applications");
        }
    }, []);

    const handleTabChange = (key: any) => {
        setActiveTab(key);
        window.location.hash = key === "Lead" ? "#lead" : "";
    };

    return (
        <div className="flex w-full flex-col zindex">
            <Tabs aria-label="Options" selectedKey={activeTab} onSelectionChange={handleTabChange}>
                <Tab key="Applications" title="Applications Request">
                    <ApplicationList />
                </Tab>
                <Tab key="Lead" title="Lead">
                    <Leadtable />
                </Tab>
            </Tabs>
        </div>
    );
}
