import { useEffect, useState } from "react";
import UserLayout from "../../../components/layout/user/userLayout";
import { IMovie, IMovieFull } from "../../../interface/movie";
import { message, Spin } from "antd";
import { useParams } from "react-router-dom";
import { getMovieByCategory, getMovieById } from "../api";

import { MovieInfor } from "./movie-info";
import { MovieCast } from "./movie-casts";
import { MovieRate } from "./movie-rate";
import SubTitle from "../../../components/ui/title/subTitle";
import { BsCollectionFill } from "react-icons/bs";
import Movie from "../../../components/card/movie";

export default function SingleMovie() {
    const { id } = useParams()
    const [movie, setMovie] = useState<IMovieFull | null>(null)
    const [relatedMovies, setRelatedMovies] = useState<IMovie[]>([])

    const fetchData = async () => {
        if (!id) return
        getMovieById(id)
            .then((res) => {
                getMovieByCategory(res.data.movie.category)
                    .then(result => {
                        setRelatedMovies(result.data.movies)
                        setMovie(res.data.movie)
                    })
                    .catch(err => console.log(err))
            })
            .catch(() => {
                message.error("Movie not found")
            })

    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        fetchData()
    }, [id])

    const handleUpdateMovie = (updatedMovie: IMovieFull) => {
        setMovie(updatedMovie);
    };

    return (
        <UserLayout>
            {
                movie ?
                    (
                        <div>
                            {/* Movie Information */}
                            <MovieInfor movie={movie} />

                            {/* Movie Cast */}
                            <MovieCast movie={movie} />

                            {/* Movie rate */}
                            <MovieRate movie={movie} onUpdateMovie={handleUpdateMovie} />

                            {/* Related movies */}
                            <div className='my-16 container px-3 mx-auto 2xl:px-32'>
                                <SubTitle title="Relative Movies" Icon={BsCollectionFill} />
                                <div className='grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6'>
                                    {
                                        relatedMovies.map((item, index) => (
                                            <Movie movie={item} key={index} />
                                        ))
                                    }
                                </div>
                            </div>

                        </div>
                    )
                    : (
                        <div className="flex justify-center py-40"><Spin size="large" /></div>
                    )
            }
        </UserLayout>
    )
}
