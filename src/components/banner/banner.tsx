import { FaRegCalendarAlt } from "react-icons/fa";
import { IMovie } from "../../interface/movie"
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react"
import { Link } from "react-router-dom";
import { Spin } from "antd";

const Banner: React.FC<{ banners: IMovie[] }> = ({ banners }) => {

    return (
        <section className='relative w-full'>
            {
                banners.length != 0 ?
                    (
                        <Swiper
                            direction='vertical'
                            // direction='horizontal'
                            slidesPerView={1}
                            loop={true}
                            speed={1000}
                            modules={[Autoplay]}
                            autoplay={{ delay: 4000, disableOnInteraction: false }}
                            className='w-full xl:h-96 bg-dry lg:h-64 h-48'
                        >
                            {
                                banners.map((movie, index) => (
                                    <SwiperSlide key={index} className='relative rounded overflow-hidden'>
                                        <img alt='' src={movie.image} className='w-full h-full object-cover'></img>
                                        <div className='absolute linear-bg xl:pl-52 sm:pl-32 pl-8 top-0 bottom-0 right-0 left-0 flex flex-col justify-center lg:gap-8 md:gap-5 gap-4'>
                                            <h1 className='xl:text-4xl truncate capitalize font-sans sm:text-2xl text-xl font-bold'>{movie.name}</h1>
                                            <div className='flex gap-5 items-center text-dryGray'>
                                                <div className='flex items-center gap-2'>
                                                    <span className='text-sm font-medium'>{movie.category}</span>
                                                </div>
                                                <div className='flex items-center gap-2'>
                                                    <FaRegCalendarAlt className='text-subMain w-3 h-3' />
                                                    <span className='text-sm font-medium'>{movie.year}</span>
                                                </div>
                                            </div>
                                            <div className='flex gap-5 items-center'>
                                                <Link to={`/watch/${movie._id}`} className='bg-subMain hover:text-main transitions text-white px-8 py-3 rounded font-medium sm:text-sm text-xs'>Watch</Link>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    ) :
                    (
                        <div className="flex justify-center py-20"><Spin size="large" /></div>
                    )
            }

        </section>
    )
}


export default Banner
