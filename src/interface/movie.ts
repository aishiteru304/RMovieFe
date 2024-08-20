export interface IAddMovie {
    name: string,
    category: string,
    year: string,
    language: string,
}

export interface IMovie extends IAddMovie {
    _id: string,
    image: string,
    rate?: number,
}

export interface IMovieFull extends IMovie {
    video: string,
    casts: { image: string }[],
    reviews: any[]
}
