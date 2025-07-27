import React, { useEffect, useState } from "react";
//link
import { Link } from "react-router-dom";
//file
import MemberCard from "../../components/MemberCard/MemberCard";
import Modal from "../../components/modal/Modal";
import Addmembership from "../../components/Addmembership/Addmembership";
import AddMembers from "../../components/AddMembers/AddMembers";
//Material.ui
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CircleIcon from '@mui/icons-material/Circle';

import { toast, ToastContainer } from "react-toastify";

import axios from "axios";



export default function Member() {


    const [addMembership, setAddmembership] = useState(false);
    const [addMember, setAddmember] = useState(false);
    {/*1-9 of 52 Members */ }
    const [currentPage, setCurrentpage] = useState(1);

    const [startFrom, setStartFrom] = useState(0);
    const [endTo, setEndto] = useState(9);
    const [totalData, setTotalData] = useState(0);
    const [limit, setLimit] = useState(9);
    const [isSearchModeOn, setIsSearchModeOn] = useState(false);

    const [noOfPage, setNoOfPage] = useState(0);

    const [data, setData] = useState([]);
    const [skip, setSkip] = useState(0);
    const [search, setSearch] = useState("");


    useEffect(() => {
        fetchData(0, 9);
    }, [])

    const fetchData = async (skip, limits) => {

        await axios.get(`http://localhost:4000/members/all-member?skip=${skip}&limit=${limits}`, { withCredentials: true }).then((response) => {
            console.log(response)
            let totalData = response.data.totalMembers;
            setTotalData(totalData);
            setData(response.data.members);

            let extraPage = totalData % limit === 0 ? 0 : 1;
            let totalPage = parseInt(totalData / limit) + extraPage;
            setNoOfPage(totalPage);

            if (totalData === 0) {
                setStartFrom(-1);
                setEndto(0)
            }
            else if (totalData < 10) {
                setStartFrom(0);
                setEndto(totalData);
            }
        }).catch(err => {
            toast.error("Technical Fault")
            console.log(err);
        })


    }


    const handleMembership = () => {
        setAddmembership(prev => !prev);
    }

    const handleMembers = () => {
        setAddmember(prev => !prev);
    }

    const handlePrev = () => {
        if (currentPage !== 1) {
            let currPage = currentPage - 1;
            setCurrentpage(currPage);
            var from = (currPage - 1) * 9;
            var to = (currPage * 9);
            setStartFrom(from);
            setEndto(to);
            let skipValue = skip - 9;
            setSkip(skipValue);
            fetchData(skipValue, 9);

        }
    }

    const handleNext = () => {
        if (currentPage !== noOfPage) {
            let currPage = currentPage + 1;
            setCurrentpage(currPage);
            var from = (currPage - 1) * 9;
            var to = (currPage * 9);
            if (to > totalData) {
                to = totalData;
            }
            setStartFrom(from);
            setEndto(to);
            let skipValue = skip + 9;
            setSkip(skipValue);
            fetchData(skipValue, 9);

        }
    }

    const handleSearchData = async () => {
        if (search !== "") {
            setIsSearchModeOn(true);
            await axios.get(`http://localhost:4000/members/searched-member?searchTerm=${search}`, { withCredentials: true }).then((response) => {
                console.log(response);
                setData(response.data.members);
                setTotalData(response.data.totalMembers);


            }).catch(err => {
                toast.error("Technical Fault")
                console.log(err);
            })
        }else{
            if(isSearchModeOn){
                window.location.reload();
            }
            else{
                toast.error("Please Enter any Value")
            }

        }
    }

    return (
        <div className=" text-black p-5 w-3/4 h-[100vh]">
            {/*block for banner */}
            <div className="border-2 bg-black flex justify-between w-full text-white rounded-lg p-3">
                <div className="border-2 pl-3 pr-3 pt-1 pb-1 rounded-2xl cursor-pointer hover:bg-gradient-to-r from-white via-zinc-200 to-zinc-500  hover:text-black" onClick={() => handleMembers()}>Add Member <FitnessCenterIcon /></div>
                <div className="border-2 pl-3 pr-3 pt-1 pb-1 rounded-2xl cursor-pointer hover:bg-gradient-to-r from-white via-zinc-200 to-zinc-500 hover:text-black" onClick={() => handleMembership()}>Membership <AddIcon /></div>
            </div>

            {/*  block for back to dashboard button */}
            <Link to={'/dashboard'}><ChevronLeftIcon />Back</Link>

            <div className="mt-5 w-1/2 flex gap-2">
                <input type="text" value={search} onChange={(e) => { setSearch(e.target.value) }} className="border-2 w-full p-2 rounded-lg" placeholder="Search by Name or Mobile No" />
                <div onClick={() => { handleSearchData() }} className="bg-black p-3 border-2 text-white rounded-lg cursor-pointer hover:bg-white hover:text-black "><SearchIcon /></div>
            </div>
            <div className="mt-5 text-x1 flex justify-between text-black">
                <div>Total Members {isSearchModeOn ? totalData: null}</div>
                {
                    !isSearchModeOn ? <div className="flex gap-5">
                        <div>{startFrom + 1} - {endTo} of {totalData} Members</div>
                        <div className={`w-8 h-8 cursor-pointer border-2 flex items-center justify-center hover:text-white hover:bg-gradient-to-r from-zinc-500 via-black to-black ${currentPage === 1 ? 'bg-gray-200 text-gray-400' : null}`} onClick={() => { handlePrev() }}><ArrowLeftIcon /></div>
                        <div className={`w-8 h-8 cursor-pointer border-2 flex items-center justify-center hover:text-white hover:bg-gradient-to-r from-black via-black to-zinc-500 ${currentPage === noOfPage ? 'bg-gray-200 text-gray-400' : null}`} onClick={() => { handleNext() }}><ArrowRightIcon /></div>
                    </div> : null
                }
            </div>

            <div className="bg-zinc-100 p-5 mt-5 rounded-lg grid gap-2 grid-cols-3 overflow-x-auto h-[65%]">

                {
                    data.map((item, index) => {
                        return (
                            <MemberCard item={item} />

                        );
                    })
                }

            </div>

            {addMembership && <Modal header="Add Membership" handleClose={handleMembership} content={<Addmembership handleClose={handleMembership} />} />}

            {addMember && <Modal header={"Add New Member"} handleClose={handleMembers} content={<AddMembers />} />}
            <ToastContainer />
        </div>
    )
}