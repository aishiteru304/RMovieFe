import React, { useState } from 'react'
import { BsBookmarkStarFill, BsCaretLeftFill, BsCaretRightFill } from 'react-icons/bs'
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Link } from 'react-router-dom'
import 'swiper/swiper-bundle.css';
import { Rate, Spin } from 'antd'
import SubTitle from '../ui/title/subTitle'
import { IMovie } from '../../interface/movie'
import { checkValueStar } from '../../utils/checkValueStar'

const TopRated: React.FC<{ topRateMovies: IMovie[] }> = ({ topRateMovies }) => {

    const breakpoints = {
        640: {
            slidesPerView: 1
        },
        768: {
            slidesPerView: 2
        },
        1024: {
            slidesPerView: 3
        },
        1280: {
            slidesPerView: 4
        }
    };

    const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null)
    const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null)
    return (
        <section className='my-16'>
            <SubTitle title="Top Rated" Icon={BsBookmarkStarFill} />
            {
                topRateMovies.length != 0 ?
                    (
                        <div className='mt-10'>
                            <Swiper
                                breakpoints={breakpoints}
                                navigation={{ nextEl, prevEl }}
                                spaceBetween={40}
                                loop={true}
                                speed={1000}
                                modules={[Navigation, Autoplay]}
                                autoplay={true}
                            >
                                {
                                    topRateMovies.map((movie, index) => (
                                        <SwiperSlide key={index} className='h-[500px]'>
                                            <div className='p-4 h-full hovered border border-border bg-dry rounded-lg overflow-hidden'>
                                                <img alt='' src={movie.image} className='w-full h-full object-cover rounded-lg select-none'></img>
                                                <div className='px-4 hoveres gap-6 text-center absolute bg-black bg-opacity-70 top-0 left-0 right-0 bottom-0'>

                                                    <Link to={`/movie/${movie._id}`} className='font-semibold text-xl trancuted line-clamp-2'>{movie.name}</Link>

                                                    <Rate allowHalf defaultValue={checkValueStar(movie.rate)} disabled />
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>

                            <div className='w-full px-1 flex-rows gap-6 pt-12'>
                                <button className='hover:bg-dry transitions text-sm rounded w-8 h-8 flex-colo bg-subMain text-white' ref={(node) => setPrevEl(node)}>
                                    <BsCaretLeftFill />
                                </button>

                                <button className='hover:bg-dry transitions text-sm rounded w-8 h-8 flex-colo bg-subMain text-white' ref={(node) => setNextEl(node)}>
                                    <BsCaretRightFill />
                                </button>
                            </div>
                        </div>
                    ) :
                    (
                        <div className="flex justify-center py-20"><Spin size="large" /></div>
                    )
            }
        </section>
    )
}

export default TopRated
