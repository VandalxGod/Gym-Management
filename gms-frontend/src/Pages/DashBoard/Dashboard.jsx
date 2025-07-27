import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
//Link for going to another page
import { Link } from "react-router-dom";

//Material.ui
import MenuIcon from '@mui/icons-material/Menu';
import PeopleIcon from '@mui/icons-material/People';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import ErrorIcon from '@mui/icons-material/Error';
import PersonOffIcon from '@mui/icons-material/PersonOff';

export default function Dashboard() {
    const [accordianDashboard, SetAccordianDashoard] = useState(false);
    const ref = useRef();

    useEffect(() => {
        const checkIfClickedOutside = (e) => {
            if (accordianDashboard && ref.current && !ref.current.contains(e.target)) {
                SetAccordianDashoard(false);
            }
        };
    
        document.addEventListener("mousedown", checkIfClickedOutside);
        
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside);
        };
    }, [accordianDashboard]);

    const handleOnClickMenu = (vlaue) => {
        sessionStorage.setItem('func',vlaue);
    }
    
    return (
        <div className="w-3/4 text-black p-5 relative">
            <div className="w-full bg-black text-white rounded-lg flex p-3 justify-between items-center">
                <MenuIcon sx={{ cursor: "pointer" }} onClick={() => {SetAccordianDashoard(prev => !prev)}} />

                <img className="w-8 h-8 rounded-3xl border-2" src="../../../src/assets/drago.png" alt="Image" />
            </div>

            {
                accordianDashboard && <div ref={ref} className="absolute p-3 bg-zinc-300 text-black rounded-xl text-lg font-extralight">
                    <div><b>Hi</b> welcome to our Gym Management System</div>
                    <p>feel free to ask any querries</p>
                </div>
            }

            <div className="mt-5 pt-3 bg-zinc-100/50 grid gap-5 grid-cols-3 w-full pb-5 overflow-x-auto h-[80%]">


                {/*This is the Card Block */}
                {/*Joined Members*/}
                <Link to={'/Member'} className="w-full h-fit bg-white rounded-lg cursor-pointer">
                    <div className="h-3 rounded-t-lg bg-gradient-to-r from-green-600 via-green-400 to-green-600" ></div>
                    <div className="py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-zinc-900 hover:text-white">
                        <PeopleIcon sx={{ color: "green", fontSize: "50px" }} />
                        <p className="text-xl my-3 font-semibold font-mono">Joined Members</p>
                    </div>
                </Link>

                {/*Monthly Joined*/}
                <Link to={'/specific/monthly'} onClick={()=>handleOnClickMenu("monthlyJoined")} className="w-full h-fit bg-white rounded-lg cursor-pointer">
                    <div className="h-3 rounded-t-lg bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600" ></div>
                    <div className="py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-zinc-900 hover:text-white">
                        <CalendarMonthIcon sx={{ color: "blue", fontSize: "50px" }} />
                        <p className="text-xl my-3 font-semibold font-mono">Monthly Joined</p>
                    </div>
                </Link>

                {/*Expiring within 3 days*/}
                <Link to={'/specific/expire-with-in-3-days'} onClick={()=>handleOnClickMenu("threeDayExpire")}className="w-full h-fit bg-white rounded-lg cursor-pointer">
                    <div className="h-3 rounded-t-lg bg-gradient-to-r from-orange-600 via-orange-400 to-orange-600" ></div>
                    <div className="py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-zinc-900 hover:text-white">
                        <AccessAlarmIcon sx={{ color: "orange", fontSize: "50px" }} />
                        <p className="text-xl my-3 font-semibold font-mono">Expiring within 3 days</p>
                    </div>
                </Link>

                {/*Expiring within 4-7 days*/}
                <Link to={'/specific/expire-within-4-7-days'} onClick={()=>handleOnClickMenu("fourtoSevendayExpire")}className="w-full h-fit bg-white rounded-lg cursor-pointer">
                    <div className="h-3 rounded-t-lg bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600" ></div>
                    <div className="py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-zinc-900 hover:text-white">
                        <MoreTimeIcon sx={{ color: "Yellow", fontSize: "50px" }} />
                        <p className="text-xl my-3 font-semibold font-mono">Expiring within 4-7 days</p>
                    </div>
                </Link>

                {/*Expired*/}
                <Link to={'/specific/expired'} onClick={()=>handleOnClickMenu("Expired")} className="w-full h-fit bg-white rounded-lg cursor-pointer">
                    <div className="h-3 rounded-t-lg bg-gradient-to-r from-red-600 via-red-400 to-red-600" ></div>
                    <div className="py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-zinc-900 hover:text-white">
                        <ErrorIcon sx={{ color: "red", fontSize: "50px" }} />
                        <p className="text-xl my-3 font-semibold font-mono">Expired</p>
                    </div>
                </Link>

                {/*InActive Members*/}
                <Link to={'/specific/inactive-members'} onClick={()=>handleOnClickMenu("InActiveMembers")} className="w-full h-fit bg-white rounded-lg cursor-pointer">
                    <div className="h-3 rounded-t-lg bg-gradient-to-r from-pink-600 via-pink-400 to-pink-600" ></div>
                    <div className="py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-zinc-900 hover:text-white">
                        <PersonOffIcon sx={{ color: "purple", fontSize: "50px" }} />
                        <p className="text-xl my-3 font-semibold font-mono">InActive Members</p>
                    </div>
                </Link>
            </div>

            <div className="absolute bottom-4 left-0 right-0 p-4 w-3/4 mx-auto bg-black text-white rounded-xl text-xl text-center">
                Contact Developer for any Technical Error at +91 7007445861
            </div>
        </div>
    )
}