import { FaPlay, FaRegCalendarAlt, FaShareAlt } from "react-icons/fa";
import { IMovieFull } from "../../../interface/movie";
import { Link, useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import CustomButton from "../../../components/ui/button/customBtn";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

export const MovieInfor = ({ movie }: { movie: IMovieFull }) => {
    const navigate = useNavigate()
    const user = useSelector((state: RootState) => state.user)
    return (
        <section className='w-full xl:h-screen relative text-white'>
            <CustomButton
                colorPrimary='#F20000'
                colorPrimaryHover='#080A1A'
                colorPrimaryActive='#080A1A'
                htmlType='submit'
                name={"Back"}
                className=' text-white py-6 rounded-lg min-w-32 font-bold mt-4 absolute z-10 2xl:left-32 left-3'
                onClick={() => navigate(-1)}
            />
            <img alt='movie' src={movie.image} className='w-full hidden xl:inline-block h-full object-cover'></img>
            <div className='xl:bg-main bg-dry flex-colo xl:bg-opacity-90 xl:absolute top-0 left-0 right-0 bottom-0'>
                <div className='container px-3 mx-auto 2xl:px-32 xl:grid grid-cols-3 flex-colo py-10 lg:py-20 gap-8'>
                    <div className='xl:col-span-1 w-full max-h-[500px] xl:order-none order-last h-header bg-dry border border-gray-800 rounded-lg overflow-hidden'>
                        <img alt='' src={movie.image} className='w-full h-full object-cover'></img>
                    </div>
                    <div className='col-span-2 md:grid grid-cols-5 gap-4 items-center'>
                        <div className='col-span-3 flex flex-col gap-10'>
                            <h1 className='xl:text-4xl capitalize font-sans text-2xl font-bold'>{movie.name}</h1>

                            <div className='flex items-center gap-4 font-medium text-dryGray'>
                                <div className='flex-colo bg-subMain text-xs px-2 py-1'>HD 4K</div>
                                <div className='flex gap-5 items-center text-dryGray'>
                                    <div className='flex items-center gap-2'>
                                        <span className='text-sm font-medium'>{movie.category}</span>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <FaRegCalendarAlt className='text-subMain w-3 h-3' />
                                        <span className='text-sm font-medium'>{movie.year}</span>
                                    </div>
                                </div>
                            </div>


                            <div className='grid sm:grid-cols-5 grid-cols-3 gap-4 p-6 bg-main border border-gray-800 rounded-lg'>
                                <div className='col-span-1 flex-colo border-r border-border'>
                                    <button className='w-10 h-10 flex-colo rounded-lg bg-white bg-opacity-20'><FaShareAlt /></button>
                                </div>
                                <div className='col-span-2 flex-colo font-medium text-sm'>
                                    <p>
                                        {'Language : '}
                                        <span className='ml-2 truncate'>{movie.language}</span>
                                    </p>
                                </div>
                                <div className='sm:col-span-2 col-span-3 flex justify-end font-medium text-sm'>
                                    <Link to={`/watch/${movie._id}`} className='bg-dry py-4 hover:bg-subMain transitions border-2 border-subMain rounded-full flex-rows gap-4 w-full sm:py-3'>
                                        <FaPlay className='w-3 h-3' />
                                        {" Watch"}
                                    </Link>
                                </div>
                            </div>

                        </div>

                        <div className='col-span-2 md:mt-0 mt-2 flex justify-end'>
                            <button className='md:w-1/4 w-full relative flex-colo bg-subMain hover:bg-transparent border-2 border-subMain transitions md:h-64 h-20 rounded font-medium'>
                                <a href={movie.video} download={user.name} className='flex-rows gap-6 text-md uppercase tracking-widest absolute md:rotate-90'>
                                    {'Download'}
                                    <FiLogIn className='w-6 h-6' />
                                </a>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}