import { useEffect, useState } from 'react'
import SideBar from '../../../components/layout/user/sideBar'
import { getAllUsers } from './api'
import { IUserAccount } from '../../../interface/user'
import { RiDeleteBin7Fill } from 'react-icons/ri'

const ths = ['image', 'id', 'name', 'email', 'actions']
export default function User() {
    const [allUsers, setAllUsers] = useState<IUserAccount[] | null>(null)

    useEffect(() => {
        getAllUsers()
            .then(res => setAllUsers(res.data.users))
            .catch(err => console.log(err))
    }, [])

    const handleDeleteUser = (id: string) => {
        console.log(id)
    }

    return (
        <SideBar>

            <div className='flex flex-col gap-6'>
                <div className='flex-btn gap-2'>
                    <h2 className='text-xl font-bold'>Users</h2>
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
                            {allUsers &&
                                allUsers.map((user, index) => (
                                    <tr key={index}>
                                        <td className='text-sm text-left leading-6 whitespace-nowrap px-5 py-3'>
                                            <div className='w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden'>
                                                <img alt='' src={user.image} className='w-full h-full object-cover'></img>
                                            </div>
                                        </td>
                                        <td className='text-sm text-left leading-6 whitespace-nowrap px-5 py-3 '>{user._id}</td>
                                        <td className='text-sm text-left leading-6 whitespace-nowrap px-5 py-3 '>{user.name}</td>
                                        <td className='text-sm text-left leading-6 whitespace-nowrap px-5 py-3 '>{user.email}</td>
                                        <td className='text-sm text-left leading-6 whitespace-nowrap px-5 py-3'>
                                            <button onClick={() => handleDeleteUser(user._id)} className='bg-subMain text-white rounded flex-colo w-6 h-6 mx-auto'>
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
