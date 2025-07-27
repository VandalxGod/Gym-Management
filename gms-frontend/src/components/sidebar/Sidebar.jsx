import React,{useState,useEffect} from "react";

//route
import { Link,useLocation,useNavigate } from "react-router-dom";

//Material ui
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';





export default function Sidebar(){
    
    const [loaderImage, setLoaderimage] = useState(false);
    const navigate = useNavigate();
    const [greating, setGreating] =useState("");

    const location = useLocation(); //useLocation help to get the current location of the Page

    const greatingMessage = () =>{
        const currentHour = new Date().getHours();
        if(currentHour < 12){
            setGreating("Good Morning");
        }
        else if(currentHour < 18){
            setGreating("Good Afternoon");
        }
        else if(currentHour < 21){
            setGreating("Good Evening");
        }
        else {
            setGreating("Good Night");
        }
    }
    useEffect(()=>{
        greatingMessage()
    },[])

    const handleLogout = async()=>{
        localStorage.clear();
        navigate('/')
    }

    
    const uploadImage = async (event) => {
        setLoaderimage(true);
        console.log("Image uploading");
        const files = event.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'gym-management');

        try {
            const response = await axios.post("https://api.cloudinary.com/v1_1/dgsfifvhy/image/upload", data);
            const imageUrl = response.data.url;

            // Save to localStorage
            localStorage.setItem('gymPic', imageUrl);

            // Toast for success
            toast.success("Profile picture updated!");
            setLoaderimage(false);
            
            // Reload page or trigger a re-render
            window.location.reload();  // If you want to reload the page. For dynamic updates, remove this line.

        } catch (err) {
            console.log(err);
            toast.error("Image upload failed");
            setLoaderimage(false);
        }
    };

    
    return(
        <div className="w-1/4 h-[100vh] border-2 bg-black rounded-lg text-white p-5 font-extralight ">
            <div className="text-center text-3xl font-extralight">
                {localStorage.getItem('gymName')}
            </div>
            <div className="flex gap-5 my-5">
                <div className="w-[100px] h-[100px] rounded-lg my-3">
                    <img alt="gym pic" className="w-full h-full rounded-full border-2 border-whtie" src={localStorage.getItem('gymPic')} />
                    
                    
                    
                </div>
                <div>
                    <div className="text-2xl mt-5">{greating}</div>
                    <div className="text-xl mt-1 font-semibold ">admin</div>
                    
                </div>
            </div>
          
        
            
            <div className=" mt-10 py-10 border-t-2 border-zinc-800">


                <Link to='/dashboard' className={` flex items-center gap-8 font-semibold text-xl bg-zinc-800 p-3 rounded-xl cursor-pointer hover:bg-gradient-to-r from-white via-zinc-200 to-zinc-500  hover:text-black ${location.pathname==="/dashboard"?" boarder-2 border-white bg-gradient-to-r from-white via-zinc-200 to-zinc-500 text-black":null}`}>
                    <div><HomeIcon /></div>
                    <div className="overflow-hidden text-ellipsis whitespace-nowrap">Dashboard</div>
                </Link>


                <Link to='/Member' className={`flex iterms-center mt-5 gap-8 font-semibold text-xl bg-zinc-800 p-3 rounded-xl cursor-pointer hover:bg-gradient-to-r from-white via-zinc-200 to-zinc-500  hover:text-black ${location.pathname==="/Member"?" boarder-2 border-white bg-gradient-to-r from-white via-zinc-200 to-zinc-500 text-black":null}`}>
                    <div><GroupIcon /></div>
                    <div className="overflow-hidden text-ellipsis whitespace-nowrap">Members</div>
                </Link>

                <div  onClick={()=>{handleLogout()}} className="flex iterms-center mt-5 gap-8 font-semibold text-xl bg-zinc-800 p-3 rounded-xl cursor-pointer hover:bg-gradient-to-r from-white via-zinc-200 to-zinc-500  hover:text-black">
                    <div><LogoutIcon /></div>
                    <div className="overflow-hidden text-ellipsis whitespace-nowrap">Logout</div>
                </div>

            </div>
            
        </div>
    )
}