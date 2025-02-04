import { BsFillGridFill } from 'react-icons/bs'
import { FaHeart, FaListAlt, FaUser } from 'react-icons/fa'
import { FiSettings } from 'react-icons/fi'
import { RiLockPasswordLine, RiMovie2Fill } from 'react-icons/ri'
import { NavLink } from 'react-router-dom'
import { CgLogOut } from 'react-icons/cg'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import UserLayout from './userLayout'

const SideLinks = [
    {
        name: 'Dashboard',
        link: '/dashboard',
        icon: BsFillGridFill,
        isShow: false,
    },
    {
        name: 'Moives List',
        link: '/movieslist',
        icon: FaListAlt,
        isShow: false,
    },
    {
        name: 'Add Movie',
        link: '/addmovie',
        icon: RiMovie2Fill,
        isShow: false,
    },
    {
        name: 'Users',
        link: '/users',
        icon: FaUser,
        isShow: false,
    },
    {
        name: 'Upload Profile',
        link: '/profile',
        icon: FiSettings,
        isShow: true,
    },
    {
        name: 'Favorite Movies',
        link: '/favorite',
        icon: FaHeart,
        isShow: true,
    },
    {
        name: 'Change Password',
        link: '/password',
        icon: RiLockPasswordLine,
        isShow: true,
    },
]

export default function SideBar({ children }: { children: JSX.Element }) {
    const active = 'bg-dryGray text-subMain'
    const hover = 'hover:text-white hover:bg-main'
    const inActive = 'rounded font-medium text-sm transitions flex gap-3 items-center p-4'
    const Hover = ({ isActive }: { isActive: boolean }) => isActive ? `${active} ${inActive}` : `${hover} ${inActive}`

    const user = useSelector((state: RootState) => state.user)

    const handleLogout = () => {
        sessionStorage.removeItem('token')
        window.location.href = "/"
    }
    return (
        <UserLayout>
            <div className='min-h-screen container mx-auto px-2'>
                <div className='xl:grid grid-cols-8 gap-10 items-start md:py-12 py-6'>
                    <div className='col-span-2 sticky bg-dry border border-gray-800 p-6 rounded-md xl:mb-0 mb-5'>
                        {
                            SideLinks.map((side, index) => (
                                (side.isShow || user.isAdmin) &&
                                <NavLink to={side.link} key={index} className={Hover}>
                                    <side.icon /> <p>{side.name}</p>
                                </NavLink>
                            ))
                        }
                        <div onClick={handleLogout} className="cursor-pointer hover:text-white hover:bg-main rounded font-medium text-sm transitions flex gap-3 items-center p-4">
                            <CgLogOut /> <p>Log Out</p>
                        </div>
                    </div>
                    <div
                        className='col-span-6 rounded-md bg-dry border border-gray-800 p-6'>
                        {children}
                    </div>
                </div>
            </div>
        </UserLayout>
    )
}
