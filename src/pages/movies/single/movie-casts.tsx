import { IMovieFull } from "../../../interface/movie";
import SubTitle from "../../../components/ui/title/subTitle";
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react"
import { FaUserFriends } from "react-icons/fa";

export const MovieCast = ({ movie }: { movie: IMovieFull }) => {
    return (
        <section className='my-12 container px-3 mx-auto 2xl:px-32'>
            <SubTitle title="Casts" Icon={FaUserFriends} />
            <div className='mt-10'>
                <Swiper
                    modules={[Autoplay]}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 10
                        },
                        400: {
                            slidesPerView: 2,
                            spaceBetween: 10
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 10
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 10
                        },
                        1280: {
                            slidesPerView: 5,
                            spaceBetween: 30
                        },
                    }}
                    autoplay={true}
                >
                    {
                        movie.casts.map((cast, index) => (
                            <SwiperSlide key={index}>
                                <div className='w-full p-3 italic text-xs text-text rounded flex-colo bg-dry border border-gray-800'>
                                    <img alt='' src={cast.image} className='w-full h-64 object-cover rounded mb-4'></img>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </section>
    )
}