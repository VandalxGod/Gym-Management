import React, { useEffect, useState } from "react";
//link
import { Link } from "react-router-dom";
//material.ui
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
//file
import MemberCard from "../../components/MemberCard/MemberCard";


import { getMonthlyJoined, threeDayExpire, fourToSevenDaysExpire, expired, InActiveMembers } from "./Data";

export default function GeneralUser() {
    const [header, setHeader] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        const func = sessionStorage.getItem('func');
        functionCall(func);
    }, []);

    const functionCall = async (func) => {
        switch (func) {
            case "monthlyJoined":

                setHeader("Monthly Joined Member")
                var datas = await getMonthlyJoined();
                setData(datas.members);

                break;
            case "threeDayExpire":

                setHeader("Expring In 3 Days Members")
                var datas = await threeDayExpire();
                setData(datas.members);
                break;

            case "fourtoSevendayExpire":

                setHeader("Expring In 4-7 Days Members")
                var datas = await fourToSevenDaysExpire();
                setData(datas.members);
                break;

            case "Expired":

                setHeader("Expired Members")
                var datas = await expired();
                setData(datas.members);
                break;

            case "InActiveMembers":

                setHeader("In Active Members")
                var datas = await InActiveMembers();
                setData(datas.members);
                break;

        }
    }

    return (
        <div className="text-black p-5 w-3/4 flex-col">
            <div className="border-2 bg-black flex justify-between w-full text-white rounded-lg p-3">
                <Link to={'/dashboard'} className="border-2 pl-1 pt-1 pb-1 pr-3 rounded-2xl cursor-pointer hover:bg-gradient-to-r from-white via-zinc-200 to-zinc-500  hover:text-black">
                    <ChevronLeftIcon />Back
                </Link>
            </div>

            <div className="mt-5 text-xl text-black">
                {header}

            </div>

            <div className="bg-zinc-100 p-5 mt-5 rounded-lg grid gap-2 grid-cols-3 overflow-x-auto h-[80%]">
                {
                    data.map((item, index) => {
                        return (
                            <MemberCard item={item} />
                        );
                    })
                }



            </div>

        </div>
    )
}