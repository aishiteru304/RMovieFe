import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import CustomFormItem from '../input/customInput'
import { Form } from 'antd'
import CustomButton from '../button/customBtn'
import { useLocation } from 'react-router-dom'
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

type FormLoginProps = {
    onSubmit: any,
    loading?: boolean
}

const LoginForm: React.FC<FormLoginProps> = ({ onSubmit, loading }) => {
    const [password, setPassword] = useState<boolean>(true)
    const type = useLocation().pathname.split('/')[1]

    const loginSchema = yup.object().shape({
        email: yup.string()
            .email('Email invalid.')
            .required('Email is required.'),

        password: yup.string()
            .required('Password is required.')
            .min(8, 'Password must have length of at least 8.')
            .matches(/[A-Za-z]/, 'Password must contain at least 1 letter.')
            .matches(/[0-9]/, 'Password must contain at least 1 number.'),

    })

    const registerSchema = loginSchema.shape({
        name: yup.string()
            .required('Name is required.'),
        confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match')
    })

    const schema = type == 'login' ? loginSchema : registerSchema

    const method = useForm({
        resolver: yupResolver(schema)
    })

    const { handleSubmit } = method

    return (
        <FormProvider {...method}>
            <Form layout='vertical' onFinish={handleSubmit(onSubmit)} className='w-full'>
                <CustomFormItem
                    label='Email'
                    name='email'
                    className='customInput'
                    required={true}
                    placeholder='netflixo@gmail.com'
                />
                {
                    type == 'register' &&
                    <>
                        <CustomFormItem
                            label='Name'
                            name='name'
                            className='customInput'
                            required={true}
                            placeholder='Alex'
                        />
                    </>
                }
                <div className='relative'>
                    <CustomFormItem
                        label='Password'
                        name='password'
                        className='customInput'
                        required={true}
                        placeholder='*********'
                        type={password ? "password" : "text"}
                    />
                    {!password && <span className=' absolute text-border right-2 text-2xl top-10 cursor-pointer'><HiOutlineEye onClick={() => setPassword(!password)} /></span>}
                    {password && <span className=' absolute text-border right-2 text-2xl top-10 cursor-pointer'><HiOutlineEyeOff onClick={() => setPassword(!password)} /></span>}
                </div>
                {
                    type == 'register' &&
                    <div className='relative'>
                        <CustomFormItem
                            label='Confirm Password'
                            name='confirmPassword'
                            className='customInput'
                            required={true}
                            type={password ? "password" : "text"}
                            placeholder='*********'
                        />
                        {!password && <span className=' absolute text-border right-2 text-2xl top-10 cursor-pointer'><HiOutlineEye onClick={() => setPassword(!password)} /></span>}
                        {password && <span className=' absolute text-border right-2 text-2xl top-10 cursor-pointer'><HiOutlineEyeOff onClick={() => setPassword(!password)} /></span>}
                    </div>
                }
                {/* <Button htmlType='submit' className='btnLogin'>Login</Button> */}
                <CustomButton
                    colorPrimary='#F20000'
                    colorPrimaryHover='#080A1A'
                    colorPrimaryActive='#080A1A'
                    htmlType='submit'
                    name={type == 'login' ? 'Sign In' : 'Sign Up'}
                    className='transitions text-white py-6 rounded-lg w-full font-bold mt-4'
                    loading={loading}
                />
            </Form>

        </FormProvider>
    )
}

export default LoginForm