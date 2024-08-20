import { useState } from "react";
import SideBar from "../../../components/layout/user/sideBar";
import { FiUploadCloud } from 'react-icons/fi'
import { changeAvatar, deleteAccount } from "./api";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { setAvatar } from "../../../redux/UserSlice";

export default function Profile() {
    const dispatch = useDispatch()
    const [selectedAvatar, setselectedAvatar] = useState<File | null>(null);
    const [selectedName, setSelectedName] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            if (file) {
                setselectedAvatar(file);
                setSelectedName(file.name);
            }
        }
    };

    const uploadAvatar = () => {
        if (!selectedAvatar) return;
        const formData = new FormData();
        formData.append('avatar', selectedAvatar);

        changeAvatar(formData)
            .then(res => {
                dispatch(setAvatar(res.data))
            })
            .catch((err) => {
                console.log(err)
                message.error(err.response.data.message)
            })
    }

    const deleteUser = () => {
        deleteAccount()
            .then(() => {
                sessionStorage.removeItem('token')
                window.location.href = '/'
            })
            .catch(err => {
                console.log(err)
                message.error(err.response.data.message)
            })
    }

    return (
        <SideBar>
            <div className='flex flex-col gap-6'>
                <h2 className='text-xl font-bold'>Profile</h2>
                <div className="relative overflow-hidden w-full bg-main py-10 flex justify-center text-subMain text-5xl">
                    {!selectedAvatar && <FiUploadCloud />}
                    {selectedAvatar && <span className="text-2xl">{selectedName}</span>}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                </div>

                <div className='flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4'>
                    <button onClick={uploadAvatar} className='bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto'>Upload Avatar</button>
                    <button onClick={deleteUser} className='bg-subMain font-medium transitions hover:bg-main border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto'>Delete Account</button>
                </div>
            </div>
        </SideBar>
    )
}
