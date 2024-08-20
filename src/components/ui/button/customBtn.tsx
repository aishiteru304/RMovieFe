import { Button, ConfigProvider } from 'antd'
import React from 'react'
import { ButtonProps as AntdButtonProps } from 'antd/lib/button';

interface CustomButtonProps extends AntdButtonProps {
    colorPrimary: string,
    colorPrimaryHover: string,
    colorPrimaryActive: string,
}

const CustomButton: React.FC<CustomButtonProps> = ({ colorPrimary, colorPrimaryActive, colorPrimaryHover, name, htmlType, onClick, disabled, icon, className, loading }) => {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Button: {
                        colorPrimary: colorPrimary,
                        colorPrimaryHover: colorPrimaryActive,
                        colorPrimaryActive: colorPrimaryHover,
                        lineWidth: 0,
                    },
                },
            }}
        >
            <Button type="primary" htmlType={htmlType} onClick={onClick} disabled={disabled} icon={icon} className={className} loading={loading}>
                {name}
            </Button>
        </ConfigProvider>

    )
}

export default CustomButton