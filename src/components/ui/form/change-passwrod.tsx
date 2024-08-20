import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import CustomFormItem from '../input/customInput'
import { Form } from 'antd'
import CustomButton from '../button/customBtn'
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

type FormChangePasswordProps = {
    onSubmit: any,
}

const ChangePasswordForm: React.FC<FormChangePasswordProps> = ({ onSubmit }) => {
    const [password, setPassword] = useState<boolean>(true)

    const changePasswordSchema = yup.object().shape({
        oldPassword: yup.string()
            .required('Password is required.')
            .min(8, 'Password must have length of at least 8.')
            .matches(/[A-Za-z]/, 'Password must contain at least 1 letter.')
            .matches(/[0-9]/, 'Password must contain at least 1 number.'),
        newPassword: yup.string()
            .required('Password is required.')
            .min(8, 'Password must have length of at least 8.')
            .matches(/[A-Za-z]/, 'Password must contain at least 1 letter.')
            .matches(/[0-9]/, 'Password must contain at least 1 number.'),
        confirmPassword: yup.string().oneOf([yup.ref('newPassword')], 'Passwords must match')

    })


    const method = useForm({
        resolver: yupResolver(changePasswordSchema)
    })

    const { handleSubmit } = method

    return (
        <FormProvider {...method}>
            <Form layout='vertical' onFinish={handleSubmit(onSubmit)} className='w-full'>

                <div className='relative'>
                    <CustomFormItem
                        label='Old Password'
                        name='oldPassword'
                        className='customInput'
                        required={true}
                        placeholder='*********'
                        type={password ? "password" : "text"}
                    />
                    {!password && <span className=' absolute text-border right-2 text-2xl top-10 cursor-pointer'><HiOutlineEye onClick={() => setPassword(!password)} /></span>}
                    {password && <span className=' absolute text-border right-2 text-2xl top-10 cursor-pointer'><HiOutlineEyeOff onClick={() => setPassword(!password)} /></span>}
                </div>

                <div className='relative'>
                    <CustomFormItem
                        label='New Password'
                        name='newPassword'
                        className='customInput'
                        required={true}
                        placeholder='*********'
                        type={password ? "password" : "text"}
                    />
                    {!password && <span className=' absolute text-border right-2 text-2xl top-10 cursor-pointer'><HiOutlineEye onClick={() => setPassword(!password)} /></span>}
                    {password && <span className=' absolute text-border right-2 text-2xl top-10 cursor-pointer'><HiOutlineEyeOff onClick={() => setPassword(!password)} /></span>}
                </div>

                <div className='relative'>
                    <CustomFormItem
                        label='Confirm Password'
                        name='confirmPassword'
                        className='customInput'
                        required={true}
                        placeholder='*********'
                        type={password ? "password" : "text"}
                    />
                    {!password && <span className=' absolute text-border right-2 text-2xl top-10 cursor-pointer'><HiOutlineEye onClick={() => setPassword(!password)} /></span>}
                    {password && <span className=' absolute text-border right-2 text-2xl top-10 cursor-pointer'><HiOutlineEyeOff onClick={() => setPassword(!password)} /></span>}
                </div>

                <CustomButton
                    colorPrimary='#F20000'
                    colorPrimaryHover='#080A1A'
                    colorPrimaryActive='#080A1A'
                    htmlType='submit'
                    name={"Change Password"}
                    className='transitions text-white py-6 rounded-lg w-full font-bold mt-4'
                />
            </Form>

        </FormProvider>
    )
}

export default ChangePasswordForm