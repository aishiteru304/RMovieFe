import { useEffect, useState } from "react"
import SideBar from "../../../components/layout/user/sideBar"
import { IMovie } from "../../../interface/movie"
import { getAllMovies } from "./api"
import { Link } from "react-router-dom"
import { FaEdit } from "react-icons/fa"
import { RiDeleteBin7Fill } from "react-icons/ri"


const ths = ['image', 'name', 'category', 'language', 'year', 'actions']
export default function MoviesList() {

    const [listMovie, setListMovie] = useState<IMovie[] | null>(null)

    const fetchData = async () => {
        const res = await getAllMovies()
        setListMovie(res.data.movies)
        // console.log(res.data.movies)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <SideBar>

            <div className='flex flex-col gap-6'>
                <div className='flex-btn gap-2'>
                    <h2 className='text-xl font-bold'>Movies List</h2>
                    <button className='bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded'>Delete All</button>
                </div>

                <div className='overflow-x-scroll overflow-hidden relative w-full'>
                    <table className='w-full table-auto border border-border divide-y divide-border'>
                        <thead>
                            <tr className='bg-dryGray'>
                                {
                                    ths.map((item, index) => (
                                        <th key={index} className='text-xs text-left text-main font-semibold px-6 py-2 uppercase'>{item}</th>
                                    ))
                                }
                            </tr>
                        </thead>

                        <tbody className='bg-main divide-y divide-gray-800'>
                            {listMovie &&
                                listMovie.map((movie, index) => (
                                    <tr key={index}>
                                        <td className='text-sm text-left leading-6 whitespace-nowrap px-5 py-3'>
                                            <div className='w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden'>
                                                <img alt='' src={movie.image} className='w-full h-full object-cover'></img>
                                            </div>
                                        </td>
                                        <td className='text-sm text-left leading-6 whitespace-nowrap px-5 py-3 truncate'><Link to={`/movie/${movie._id}`}>{movie.name}</Link></td>
                                        <td className='text-sm text-left leading-6 whitespace-nowrap px-5 py-3 '>{movie.category}</td>
                                        <td className='text-sm text-left leading-6 whitespace-nowrap px-5 py-3 '>{movie.language}</td>
                                        <td className='text-sm text-left leading-6 whitespace-nowrap px-5 py-3 '>{movie.year}</td>
                                        <td className='text-sm text-left leading-6 whitespace-nowrap px-5 py-3 flex mt-2 items-center gap-2'>
                                            <Link to={`/upload/${movie._id}`} className='border border-border bg-dry flex-rows gap-2 text-border rounded py-1 px-2'>
                                                {"Edit "}
                                                <FaEdit className='text-green-500' />
                                            </Link>
                                            <button className='bg-subMain text-white rounded flex-colo w-6 h-6'>
                                                <RiDeleteBin7Fill />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>

        </SideBar>
    )
}
