import { useState } from "react";
import SideBar from "../../../components/layout/user/sideBar";
import { FiUploadCloud } from 'react-icons/fi'
import { message } from "antd";
import { uploadMovie } from "./api";
import { useNavigate, useParams } from "react-router-dom";

export default function Profile() {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
    const [selectedCasts, setSelectedCasts] = useState<File[] | null>(null);
    const [selectedImageName, setSelectedImageName] = useState<string | null>(null);
    const [selectedVideoName, setSelectedVideoName] = useState<string | null>(null);
    const [selectedCastNames, setSelectedCastNames] = useState<string[] | null>(null);
    const navigate = useNavigate()

    const { id } = useParams()

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        if (e.target.files) {
            const file = e.target.files[0];
            if (!file) return
            if (!index) {
                setSelectedImage(file);
                setSelectedImageName(file.name);
            }
            else {
                setSelectedVideo(file);
                setSelectedVideoName(file.name);
            }
        }
    };

    const hanldeCastsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);

            const fileNames = files.map((file) => file.name);

            setSelectedCastNames((prevNames) => {
                return prevNames ? [...prevNames, ...fileNames] : fileNames;
            });

            setSelectedCasts((prevFile) => {
                return prevFile ? [...prevFile, ...files] : files;
            });
        }
    }

    const handleUpload = () => {
        if (!selectedCasts || !selectedImage || !selectedVideo) {
            message.error("Please upload image video and cast image.")
            return;
        }
        const formData = new FormData();
        formData.append('image', selectedImage);
        formData.append('video', selectedVideo);

        for (let i = 0; i < selectedCasts.length; i++) {
            formData.append('images', selectedCasts[i]);
        }
        if (id)
            uploadMovie(formData, id)
                .then(() => navigate('/movieslist'))
                .catch(err => console.log(err))

    }

    return (
        <SideBar>
            <div className='flex flex-col gap-6'>
                <h2 className='text-xl font-bold'>Profile</h2>
                <div className="grid md:grid-cols-2 gap-10">
                    <div>
                        <h4 className="text-subMain my-2">Image</h4>
                        <div className="relative overflow-hidden w-full bg-main py-10 flex justify-center text-subMain text-5xl rounded-lg">
                            {!selectedImage && <FiUploadCloud />}
                            {selectedImage && <span className="text-2xl">{selectedImageName}</span>}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e as React.ChangeEvent<HTMLInputElement>, 0)}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer "
                            />
                        </div>
                    </div>
                    <div>
                        <h4 className="text-subMain my-2">Video</h4>
                        <div className="relative overflow-hidden w-full bg-main py-10 flex justify-center text-subMain text-5xl  rounded-lg">
                            {!selectedVideo && <FiUploadCloud />}
                            {selectedVideo && <span className="text-2xl">{selectedVideoName}</span>}
                            <input
                                type="file"
                                accept="video/*"
                                onChange={(e) => handleFileChange(e as React.ChangeEvent<HTMLInputElement>, 1)}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <h4 className="text-subMain my-2">Cast</h4>
                    <div className="relative overflow-hidden w-full bg-main py-10 flex justify-center text-subMain text-5xl rounded-lg">
                        {!selectedCasts && <FiUploadCloud />}
                        {selectedCasts && <span className="text-lg flex gap-2">
                            {selectedCastNames?.map((name, index) => (
                                <span key={index}>{name}</span>
                            ))}
                        </span>}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={hanldeCastsChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer "
                            multiple
                        />
                    </div>
                </div>

                <div className='flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4'>
                    <button onClick={handleUpload} className='bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto'>Upload Movie</button>
                </div>
            </div>
        </SideBar>
    )
}
