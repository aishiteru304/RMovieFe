import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import CustomFormItem from '../input/customInput'
import { Form } from 'antd'
import CustomButton from '../button/customBtn'

type FormAddMovieProps = {
    onSubmit: any,
}

const AddMovieForm: React.FC<FormAddMovieProps> = ({ onSubmit }) => {

    const addMovieSchema = yup.object().shape({
        name: yup.string()
            .required('Name is required.'),
        category: yup.string()
            .required('Category is required.'),
        language: yup.string()
            .required('Language is required.'),
        year: yup.string()
            .required('Year is required.'),
    })


    const method = useForm({
        resolver: yupResolver(addMovieSchema)
    })

    const { handleSubmit } = method

    return (
        <FormProvider {...method}>
            <Form layout='vertical' onFinish={handleSubmit(onSubmit)} className='w-full'>

                <div className='grid md:grid-cols-2 gap-10'>
                    <CustomFormItem
                        label='Name'
                        name='name'
                        className='customInput'
                        required={true}
                        placeholder='Game of Thones'
                    />
                    <CustomFormItem
                        label='Category'
                        name='category'
                        className='customInput'
                        required={true}
                        placeholder='Romantic'
                    />
                </div>
                <div className='grid md:grid-cols-2 gap-10'>
                    <CustomFormItem
                        label='Language'
                        name='language'
                        className='customInput'
                        required={true}
                        placeholder='English'
                    />
                    <CustomFormItem
                        label='Year'
                        name='year'
                        className='customInput'
                        required={true}
                        placeholder='2024'
                    />
                </div>

                <CustomButton
                    colorPrimary='#F20000'
                    colorPrimaryHover='#080A1A'
                    colorPrimaryActive='#080A1A'
                    htmlType='submit'
                    name={"Add Movie"}
                    className='transitions text-white py-6 rounded-lg w-full font-bold mt-4'
                />
            </Form>

        </FormProvider>
    )
}

export default AddMovieForm