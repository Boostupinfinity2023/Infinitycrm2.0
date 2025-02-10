import React, { useState, useEffect, lazy } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import "./user/style.css";


const Leaveslist = lazy(() => import("./Leaves/leaveslist"));
// const approval = lazy(() => import("./Leaves/ApproviedLeaves"));
const Addleave = lazy(() => import("./Leaves/ApproviedLeaves"));
export default function User() {
    const { TABNAME } = useParams();
    const [showAddDepartment, setShowAddDepartment] = useState(false);

    function handleinviteuser() {
        if (showAddDepartment == false) {
            setShowAddDepartment(true);
        } else {
            setShowAddDepartment(false);
            setTimeout(() => {
                setShowAddDepartment(true);
            }, 10);
        }
    }


    // console.log(location.pathname);
    return (
        <>

            <Addleave />

        </>
    );
}
