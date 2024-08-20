import { useNavigate } from "react-router-dom";
import SideBar from "../../../components/layout/user/sideBar";
import AddMovieForm from "../../../components/ui/form/add-movie";
import { IAddMovie } from "../../../interface/movie";
import { addMovie } from "./api";

export default function AddMovie() {

    const navigate = useNavigate()
    const handleAddMovie = (data: IAddMovie) => {
        addMovie(data)
            .then(() => navigate("/movieslist"))
            .catch(err => console.log(err))
    }

    return (
        <SideBar>
            <div className='flex flex-col gap-6 max-w-3xl mx-auto mb-10'>
                <h2 className='text-xl font-bold'>Add Movie</h2>

                <AddMovieForm onSubmit={handleAddMovie} />
            </div>
        </SideBar>
    )
}
