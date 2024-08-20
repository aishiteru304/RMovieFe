import { message } from "antd";
import SideBar from "../../../components/layout/user/sideBar";
import ChangePasswordForm from "../../../components/ui/form/change-passwrod";
import { IChangePassword } from "../../../interface/user";
import { changePassword } from "./api";

export default function Password() {

    const handleChangePassword = (data: IChangePassword) => {
        changePassword(data)
            .then(() => {
                sessionStorage.removeItem('token')
                window.location.href = "/"
            })
            .catch((err) => {
                console.log(err)
                message.error(err.response.data.message)
            })
    }
    return (
        <SideBar>
            <div className='flex flex-col gap-6 max-w-3xl mx-auto mb-10'>
                <h2 className='text-xl font-bold'>Password</h2>

                <ChangePasswordForm onSubmit={handleChangePassword} />
            </div>
        </SideBar>
    )
}
