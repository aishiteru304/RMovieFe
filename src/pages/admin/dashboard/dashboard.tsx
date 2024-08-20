import { FaRegListAlt, FaUser } from "react-icons/fa";
import SideBar from "../../../components/layout/user/sideBar";
import { HiViewGridAdd } from "react-icons/hi";
import { getTotalMovies, getTotalUsers } from "./api";
import { useEffect, useState } from "react";



export default function Dashboard() {

    const [totalUsers, setTotalUser] = useState<number | null>(null)
    const [totalCategories, setTotalCategories] = useState<number | null>(null)
    const [totalMovies, setTotaMovies] = useState<number | null>(null)
    const fetchData = async () => {
        // const totalUsers = await getTotalUsers()
        const [totalUsersResponse, totalMoviesResponse] = await Promise.all([getTotalUsers(), getTotalMovies()])
        setTotalUser(totalUsersResponse.data.total)
        setTotaMovies(totalMoviesResponse.data.totalMovies)
        setTotalCategories(totalMoviesResponse.data.totalCategories)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <SideBar>
            <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4'>
                <div className='p-4 rounded bg-main border-border grid grid-cols-4 gap-2'>
                    <div className='col-span-1 rounded-full h-12 w-12 flex-colo bg-orange-600'>
                        <FaRegListAlt />
                    </div>
                    <div className='col-span-3'>
                        <h2>Total Movies</h2>
                        <p className='mt-2 font-bold'>{totalMovies ? totalMovies : ""}</p>
                    </div>
                </div>
                <div className='p-4 rounded bg-main border-border grid grid-cols-4 gap-2'>
                    <div className='col-span-1 rounded-full h-12 w-12 flex-colo bg-blue-700'>
                        <HiViewGridAdd />
                    </div>
                    <div className='col-span-3'>
                        <h2>Total Categories</h2>
                        <p className='mt-2 font-bold'>{totalCategories ? totalCategories : ""}</p>
                    </div>
                </div>
                <div className='p-4 rounded bg-main border-border grid grid-cols-4 gap-2'>
                    <div className='col-span-1 rounded-full h-12 w-12 flex-colo bg-green-600'>
                        <FaUser />
                    </div>
                    <div className='col-span-3'>
                        <h2>Total Users</h2>
                        <p className='mt-2 font-bold'>{totalUsers ? totalUsers : ""}</p>
                    </div>
                </div>
            </div>
        </SideBar>
    )
}
