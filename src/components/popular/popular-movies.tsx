import { BsCollectionFill } from "react-icons/bs"
import SubTitle from "../ui/title/subTitle"
import { IMovie } from "../../interface/movie"
import { Spin } from "antd"
import Movie from "../card/movie"

const PopularMovies: React.FC<{ popularMovies: IMovie[] }> = ({ popularMovies }) => {
    return (
        <section className='my-16'>
            <SubTitle title="Popular Movies" Icon={BsCollectionFill} />
            {
                popularMovies.length != 0 ?
                    (
                        <div className='grid sm:mt-12 mt-6 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
                            {
                                popularMovies.map((movie, index) => (
                                    <Movie key={index} movie={movie} />
                                ))
                            }
                        </div>
                    ) :
                    (
                        <div className="flex justify-center py-20"><Spin size="large" /></div>
                    )

            }
        </section>
    )
}

export default PopularMovies