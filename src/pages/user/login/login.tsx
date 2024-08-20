import { Link } from 'react-router-dom'
import UserLayout from '../../../components/layout/user/userLayout'
import LoginForm from '../../../components/ui/form/login'
import { IUserLogin } from '../../../interface/user'
import { login } from './api'
import { useRef, useState } from 'react'
import { message } from 'antd'

const LoginPage = () => {
    const isSignIn = useRef<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleLogin = (data: IUserLogin) => {
        if (isSignIn.current == true) return;
        isSignIn.current = true
        setIsLoading(true)
        login(data)
            .then(res => {
                sessionStorage.setItem('token', JSON.stringify(res.data))
                window.location.href = '/'
            })
            .catch(err => {
                message.error(err.response.data.message)
            })
            .finally(() => {
                isSignIn.current = false
                setIsLoading(false)
            })
    }
    return (
        <UserLayout>
            <div className='container mx-auto px-2 my-24 flex-colo'>
                <div className='w-full 2xl:w-2/5 gap-8 flex-colo p-8 sm:p-14 md:w-3/5 bg-dry  rounded-lg border border-border'>
                    <img alt='logo' src='/logo.png' className='w-full h-12 object-contain'></img>

                    <LoginForm onSubmit={handleLogin} loading={isLoading} />
                    <p className='text-center text-border'>
                        {"Do not have an account?"}
                        <Link to='/register' className='text-dryGray font-semibold ml-2'>Sign Up</Link>
                    </p>
                </div>
            </div>
        </UserLayout>
    )
}

export default LoginPage