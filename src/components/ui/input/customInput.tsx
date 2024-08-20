import { Form, FormItemProps, Input } from 'antd'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'


interface CustomFormInputProps extends FormItemProps {
    type?: "text" | "password"
    className?: string,
    placeholder?: string,
}

const CustomFormItem: React.FC<CustomFormInputProps> = ({ label, name, className, required, placeholder, type }) => {
    const { control } = useFormContext()
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) =>
                <Form.Item
                    // label={label}
                    label={<span style={{ color: '#4B5563', fontWeight: 'bold' }}>{label}</span>}
                    validateStatus={fieldState.error ? "error" : ""}
                    help={fieldState.error?.message}
                    required={required}
                >
                    <Input {...field} className={className} placeholder={placeholder} type={type} />
                </Form.Item>
            }
        />
    )
}

export default CustomFormItem


