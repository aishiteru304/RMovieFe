import { BsBookmarkStarFill } from "react-icons/bs"
import SubTitle from "../../../components/ui/title/subTitle"
import { IMovieFull } from "../../../interface/movie"
import { useState } from "react"
import { Rate, message } from "antd"
import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"
import { useNavigate } from "react-router-dom"
import { createReviews } from "../api"

const Ratings = [
    {
        title: '1 - Fair',
        value: 1,
    },
    {
        title: '2 - Good',
        value: 2,
    },
    {
        title: '3 - Very Good',
        value: 3,
    },
    {
        title: '4 - Excellent',
        value: 4,
    },
    {
        title: '5 - Masterpiece',
        value: 5,
    },
]
export const MovieRate = ({ movie, onUpdateMovie }: { movie: IMovieFull, onUpdateMovie: (movie: IMovieFull) => void }) => {
    const [selectRating, setSelectRating] = useState(5)
    const [comment, setComment] = useState("Very good")
    const user = useSelector((state: RootState) => state.user)
    const navigate = useNavigate()

    const handleRating = () => {
        if (!user.token) {
            navigate("/login")
            return
        }
        if (!comment) {
            message.error("Please write to comment")
            return
        }

        createReviews(movie._id, selectRating, comment)
            .then(res => {
                onUpdateMovie(res.data.movie);
            })
            .catch(err => {
                message.error(err.response.data.message)
            })
    }

    return (
        <section className='my-12 container px-3 mx-auto 2xl:px-32'>
            <SubTitle title="Reviews" Icon={BsBookmarkStarFill} />

            <div className='mt-10 xl:grid flex-colo grid-cols-5 gap-12 bg-dry xs:p-10 py-10 px-2 sm:p-20 rounded'>
                <div className='xl:col-span-2 w-full flex flex-col gap-8'>
                    <h3 className='text-xl text-text font-semibold'>
                        {`Reviews ${movie.name}`}
                    </h3>
                    <p className='text-sm leading-7 font-medium text-border'>Write a review for this movie. It will be posted on this page. lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

                    <div className='text-sm w-full'>
                        <label className='text-border font-semibold'>Select Rating</label>
                        <select value={selectRating} onChange={e => setSelectRating(Number(e.target.value))} className='w-full mt-2 px-6 py-4 text-text bg-main border border-border rounded'>
                            {
                                Ratings.map((item, index) => (
                                    <option key={index} value={item.value}>{item.title}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className='text-sm w-full'>
                        <label className='text-border font-semibold'>Message</label>
                        <textarea value={comment} onChange={e => setComment(e.target.value)} className='w-full h-40 mt-2 p-6 bg-main border border-border rounded' placeholder='Make it short and sweet....'></textarea>
                    </div>

                    <button className='bg-subMain text-white py-3 w-full flex-colo rounded' onClick={handleRating}>Submit</button>
                </div>

                {/* Reviews */}
                <div className='xl:col-span-3 flex flex-col gap-6 w-full'>
                    <h3 className='text-xl text-text font-semibold'>Reviews ({movie.reviews.length})</h3>
                    <div className='w-full flex flex-col bg-main gap-6 rounded-lg md:p-12 p-6 h-header overflow-y-scroll'>
                        {
                            movie.reviews.map((item, index) => (
                                <div key={index} className='md:grid flex flex-col w-full grid-cols-12 gap-6 bg-dry p-4 border border-gray-800 rounded-lg'>
                                    <div className='col-span-2 bg-main hidden md:block'>
                                        <img alt='' src={item.userId.image} className='w-full h-20 rounded-lg object-cover'></img>
                                    </div>
                                    <div className='col-span-5 flex flex-col gap-2'>
                                        <h2>{item.userId.name}</h2>
                                        <p className='text-xs leading-6 font-medium text-text'>{item.comment}</p>
                                    </div>
                                    <div className="col-span-5 flex items-center"> <Rate value={item.rating} disabled /></div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}