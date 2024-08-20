import { useEffect, useState } from "react"
import UserLayout from "../../components/layout/user/userLayout"
import { IMovieFull } from "../../interface/movie"
import { useNavigate, useParams } from "react-router-dom"
import { BiArrowBack } from "react-icons/bi"
import { FaCloudDownloadAlt, FaPlay } from "react-icons/fa"
import { message, Spin } from "antd"
import { getMovieById } from "./api"


export default function WatchPage() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [play, setPlay] = useState<boolean>(false)
    const [movie, setMovie] = useState<IMovieFull | null>(null)

    const fetchData = async () => {
        if (!id) return
        getMovieById(id)
            .then((res) => {
                setMovie(res.data.movie)
            })
            .catch(() => {
                message.error("Movie not found")
            })
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        fetchData()
    }, [id])

    return (
        <UserLayout>

            {
                movie ?
                    (

                        <div className='container mx-auto bg-dry p-6 mb-12'>
                            <div className='flex-btn flex-wrap mb-6 gap-2 bg-main rounded border border-gray-800 p-6'>
                                <span onClick={() => navigate(-1)} className='md:text-xl text-sm flex cursor-pointer gap-3 items-center font-bold text-dryGray'>
                                    <BiArrowBack /> {movie.name}
                                </span>
                                <div className='flex-btn sm:w-auto w-full gap-5'>
                                    <a href='/img/movie.mp4' download={true} className='bg-subMain flex-rows gap-2 hover:text-main transitions text-white rounded px-8 font-medium py-3 text-sm'>
                                        <FaCloudDownloadAlt /> {" Download"}
                                    </a>
                                </div>
                            </div>

                            {
                                play ? (
                                    <video controls autoPlay className='w-full h-full rounded'>
                                        <source src={movie.video} type='video/mp4' />
                                    </video>
                                )
                                    : (
                                        <div className='w-full h-screen rounded-lg overflow-hidden relative'>
                                            <div className='absolute top-0 left-0 bottom-0 right-0 bg-main bg-opacity-30 flex-colo'>
                                                <button onClick={() => setPlay(true)} className='bg-white text-subMain flex-colo border border-subMain rounded-full w-20 h-20 font-medium text-xl'>
                                                    <FaPlay />
                                                </button>
                                            </div>
                                            <img alt='' src={movie.image} className='w-full h-full object-cover rounded-lg'></img>
                                        </div>
                                    )
                            }
                        </div>

                    )
                    : (
                        <div className="flex justify-center py-40"><Spin size="large" /></div>
                    )
            }
        </UserLayout>
    )
}
