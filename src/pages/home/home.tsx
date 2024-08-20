import { FiUser } from "react-icons/fi"
import UserLayout from "../../components/layout/user/userLayout"
import Banner from "../../components/banner/banner"
import { useEffect, useState } from "react"
import { IMovie } from "../../interface/movie"
import { getAllBanner, getPopularMovies, getTopRateMovies } from "./api"
import PopularMovies from "../../components/popular/popular-movies"
import TopRated from "../../components/top-rate/top-rate"

const HomePage = () => {
    const [banners, setBanners] = useState<IMovie[]>([])
    const [popularMovies, setPopularMovies] = useState<IMovie[]>([])
    const [topRateMovies, setTopRateMovies] = useState<IMovie[]>([])

    const fetchData = async () => {
        const [bannerResponse, popularResponse, topRateResponse] = await Promise.all([getAllBanner(), getPopularMovies(), getTopRateMovies()])
        setBanners(bannerResponse.data.banner)
        setPopularMovies(popularResponse.data.popularMovies)
        setTopRateMovies(topRateResponse.data.topRateMovies)
    }

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <UserLayout>
            <div className='container mx-auto min-h-screen px-2 mb-6'>
                <Banner banners={banners} />
                <PopularMovies popularMovies={popularMovies} />

                {/* Promos section */}
                <section className='my-20 py-10 md:px-20 px-8 bg-dry'>
                    <div className='lg:grid lg:grid-cols-2 lg:gap-10 items-center'>
                        <div className='flex lg:gap-10 gap-6 flex-col'>
                            <h1 className='xl:text-3xl text-xl capitalize font-sans font-medium xl:leading-relaxed'>
                                Download Your Movies Watch Offline.<br />Enjoy on Your Mobile
                            </h1>
                            <p className='text-text text-sm xl:text-base leading-6 xl:leading-8'>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries..
                            </p>
                            <div className='flex gap-4 md:text-lg text-sm'>
                                <div className='flex-colo bg-black text-subMain px-6 py-3 rounded font-bold'>HD 4K</div>
                                <div className='flex-rows gap-4 bg-black text-subMain px-6 py-3 rounded font-bold'>
                                    <FiUser />
                                    {" 2K"}
                                </div>
                            </div>
                        </div>
                        <div>
                            <img alt='' src='/mobile.png' className='w-full object-contain'></img>
                        </div>
                    </div>
                </section>
                <TopRated topRateMovies={topRateMovies} />

            </div>
        </UserLayout>
    )
}

export default HomePage