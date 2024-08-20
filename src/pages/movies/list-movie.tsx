import { useEffect, useRef, useState } from "react"
import UserLayout from "../../components/layout/user/userLayout"
import { IMovie } from "../../interface/movie"
import Movie from "../../components/card/movie"
import { Empty, Pagination, Spin } from "antd"
import { FaSearch } from "react-icons/fa"
import { getMovies } from "./api"

const ListMoviesPage = () => {
    const [movies, setMovies] = useState<IMovie[]>([])
    const [timeoutId, setTimeoutId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const currentPageRef = useRef<number>(1)
    const [totalMovies, setTotalMovies] = useState<number>(0)
    const [moviesName, setMoviesName] = useState<string | null>(null)

    const fetchData = async () => {
        const moviesResponse = await getMovies(moviesName, currentPageRef.current)
        setMovies(moviesResponse.data.movies)
        setTotalMovies(moviesResponse.data.totalMovies)
    }
    useEffect(() => {
        setIsLoading(true)
        fetchData()
        setIsLoading(false)
    }, [])


    const handleSearch = (value: string) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        // Thiết lập timeout mới
        const newTimeoutId = setTimeout(async () => {
            const data = await getMovies(value, 1)
            setMovies(data.data.movies)
            currentPageRef.current = 1
            setTotalMovies(data.data.totalMovies)
            setMoviesName(value)
        }, 1000);

        // Lưu id của timeout mới vào state
        setTimeoutId(newTimeoutId);

    }

    const handlePageChange = (page: number) => {
        if (page > currentPageRef.current) {
            currentPageRef.current = page
            fetchData()
        } else if (page < currentPageRef.current) {
            currentPageRef.current = page
            fetchData()
        }
    }

    return (
        <UserLayout>
            <div className='min-height-screen container mx-auto px-2 my-6'>
                <div className='w-full text-sm bg-dryGray rounded flex-btn gap-4 max-w-2xl'>
                    <button className='bg-subMain w-12 flex-colo h-12 rounded text-white'>
                        <FaSearch />
                    </button>
                    <input type='text' onChange={(e) => handleSearch(e.target.value)} placeholder='Search Moive Name from here' className='font-medium placeholder:text-border text-sm w-11/12 h-12 bg-transparent border-none px-2 text-black'></input>
                </div>

                {
                    movies.length != 0 ? (
                        <div>
                            <div className='grid sm:mt-10 mt-6 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-10'>
                                {
                                    movies.map((movie, index) => (
                                        <Movie movie={movie} key={index} />
                                    ))

                                }
                            </div>
                            <div className="my-10">
                                <Pagination
                                    current={currentPageRef.current}
                                    total={totalMovies}
                                    pageSize={8}
                                    onChange={handlePageChange}
                                    align="end"
                                />
                            </div>
                        </div>
                    )
                        : isLoading ? (
                            <div className="flex justify-center py-40"><Spin size="large" /></div>
                        )
                            : (
                                <div className="flex justify-center py-40"><Empty /></div>
                            )
                }



            </div>
        </UserLayout>
    )
}

export default ListMoviesPage