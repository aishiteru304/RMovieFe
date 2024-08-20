import { Link, useNavigate } from "react-router-dom";
import { IMovie } from "../../interface/movie";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { addLike } from "./api";
import { message } from "antd";
import { setLiked } from "../../redux/UserSlice";

export default function Movie({ movie }: { movie: IMovie }) {

    const user = useSelector((state: RootState) => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleAddLike = (movieId: string) => {
        if (!user.token) navigate('/login')
        else {
            addLike(movieId)
                .then(res => {
                    message.success(res.data.message)
                    dispatch(setLiked(user.liked ? + (user.liked + 1) : 1))
                })
                .catch(err => {
                    message.error(err.response.data.message)
                })
        }
    }

    return (
        <div className='border border-border p-1 hover:scale-95 transitions relative rounded overflow-hidden'>
            <Link to={`/movie/${movie._id}`} className='w-full'>
                <img alt='' src={movie.image} className='w-full h-64 object-cover'></img>
            </Link>
            <div className='absolute flex-btn gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-3'>
                <h3 className='font-semibold truncate'>{movie.name}</h3>
                <button onClick={() => handleAddLike(movie._id)} className={`h-9 w-9 text-sm flex-colo transitions bg-transparent border-2 border-subMain rounded-md hover:bg-subMain text-white`}>
                    <FaHeart />
                </button>
            </div>
        </div>
    )
}
