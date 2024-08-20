import { CgUser } from "react-icons/cg"
import { FaHeart } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { RootState } from "../../redux/store"
import { IoPeopleCircleOutline } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa";
import { useEffect } from "react"
import { setLiked } from "../../redux/UserSlice"
import { getLiked } from "../../pages/user/like/api"

const Header = () => {
    const hover = 'hover:text-subMain transitions text-white'
    const Hover = ({ isActive }: { isActive: boolean }) => (isActive ? 'text-subMain' : hover)

    const user = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        if (user.token) {
            getLiked()
                .then((res) => {
                    dispatch(setLiked(res.data.total))
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [])

    return (
        <header className='bg-main shadow-md sticky top-0 z-20'>
            <div className='container mx-auto py-6 px-2 flex justify-between items-center'>
                {/* Logo section */}
                <div>
                    <Link to='/'>
                        <img alt='logo' src='/logo.png' className='w-full h-12 object-contain'></img>
                    </Link>
                </div>

                {/* Menu section */}
                <nav className='font-medium text-sm flex xl:gap-14 2xl:gap-20 md:gap-10 gap-4 justify-between items-center'>
                    <NavLink to='/movies' className={Hover}>
                        <span className="sm:block hidden">Movies</span>
                    </NavLink>

                    <NavLink to='/about-us' className={Hover}>
                        <span className="sm:block hidden"> About Us</span>
                    </NavLink>

                    <NavLink to='/contact-us' className={Hover}>
                        <span className="sm:block hidden"> Contact Us</span>
                    </NavLink>

                    <NavLink to='/movies' className="sm:hidden block">
                        <FaYoutube className='w-8 h-8' />
                    </NavLink>

                    {
                        user.image ?
                            <NavLink to='/profile' className='text-white '>
                                <img alt='avatar' src={user.image} className='w-8 h-8 rounded-full' />
                            </NavLink>
                            : user.name ?
                                <NavLink to='/profile'>
                                    <IoPeopleCircleOutline className='w-8 h-8' />
                                </NavLink>
                                : <NavLink to='/login' className={Hover}>
                                    <CgUser className='w-8 h-8' />
                                </NavLink>

                    }


                    <NavLink to='/favorite' className='relative'>
                        <FaHeart className='w-6 h-6' />
                        {user.name && <div className='w-5 h-5 rounded-full bg-subMain text-white flex-colo absolute text-xs -top-5 -right-1 text-center'>{user.liked}</div>}
                    </NavLink>
                </nav>
            </div>
        </header>
    )
}

export default Header