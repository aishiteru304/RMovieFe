import { Link, useNavigate } from 'react-router-dom'
import UserLayout from '../../../components/layout/user/userLayout'
import LoginForm from '../../../components/ui/form/login'
import { IUserRegister } from '../../../interface/user'
import { useRef, useState } from 'react'
import { register } from './api'
import { message } from 'antd'

const RegisterPage = () => {
    const isSignUp = useRef<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    const handleRegister = (data: IUserRegister) => {
        if (isSignUp.current == true) return;
        isSignUp.current = true
        setIsLoading(true)
        register(data)
            .then(res => {
                message.success(res.data.message)
                setTimeout(() => {
                    navigate("/login")
                }, 500)
            })
            .catch(err => {
                message.error(err.response.data.message)
            })
            .finally(() => {
                isSignUp.current = false
                setIsLoading(false)
            })
    }
    return (
        <UserLayout>
            <div className='container mx-auto px-2 my-24 flex-colo'>
                <div className='w-full 2xl:w-2/5 gap-8 flex-colo p-8 sm:p-14 md:w-3/5 bg-dry  rounded-lg border border-border'>
                    <img alt='logo' src='/logo.png' className='w-full h-12 object-contain'></img>

                    <LoginForm onSubmit={handleRegister} loading={isLoading} />

                    <p className='text-center text-border'>
                        {"Already have an account?"}
                        <Link to='/login' className='text-dryGray font-semibold ml-2'>Sign in</Link>
                    </p>
                </div>
            </div>
        </UserLayout>
    )
}

export default RegisterPage