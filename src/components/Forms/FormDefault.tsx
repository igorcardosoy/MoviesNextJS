"use client"

import { TmdbMedia } from "@/entities/Media"
import { getTypeInPtBR, searchMediaInTMDB } from "@/utils/movieSearch"
import { useState } from "react"

const FormDefault = ({ setMediaType = {} as any }) => {

    const [mediaList, setMediaList] = useState([] as TmdbMedia[])
    const [movieId, setMovieId] = useState('')

    const TMDB_IMG_BASE_URL = process.env.NEXT_PUBLIC_TMDB_PUBLIC_IMAGE_BASE_URL

    const movieSearch = (e: any) => {
        searchMediaInTMDB(setMediaList, e.target.value)
    }

    const handleClickInCard = (e: any) => {
        if (document.querySelector('.bg-primary')) {
            document.querySelector('.bg-primary')?.classList.remove('bg-primary')
        }

        const mediaId = e.currentTarget.id
        document.getElementById(mediaId)?.classList.add('bg-primary')

        let mediaType: string = String(mediaList.find(media => media.id == Number(mediaId))?.media_type)
        if (mediaType === 'undefined') mediaType = 'movie'

        setMediaType(mediaType)
        changeIdInputValue({ target: { value: mediaId } })
    }

    const changeIdInputValue = (e: any) => {
        setMovieId(e.target.value)
    }

    mediaList.map((media) => {
        if (media.title === undefined) {
            media.title = media.name
        }
    })

    return (
        <section className="flex flex-col gap-4 items-center">
            <section className="flex flex-wrap flex-col gap-3 justify-center content-center w-96  bg-neutral shadow-lg alert">
                <label className="input input-bordered flex items-center gap-2 shadow-lg w-80">
                    <input onChange={movieSearch} type="text" className="grow" placeholder="Pesquisar no TMDB" />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                </label>

                <section id="media-list" className="flex flex-wrap gap-2">
                    {
                        mediaList.map((media) => {

                            let type = getTypeInPtBR(media.media_type)

                            return (
                                <div onClick={handleClickInCard} id={String(media.id)} key={media.id} className="card w-20 bg-base-100 shadow-xl btn-outline btn-primary cursor-pointer shadow-lg">
                                    <p className="text-[10px] text-slate-300 text-center mt-2">{type}</p>
                                    <figure className="px-3 pt-3">
                                        {media.poster_path ?
                                            <img src={TMDB_IMG_BASE_URL + media.poster_path} alt={"Poster de " + media.title} className="rounded-xl" style={{ height: '84px', width: '56px' }} />
                                            :
                                            <div className="skeleton w-32 h-32" style={{ height: '84px', width: '56px' }}></div>}
                                    </figure>
                                    <div className="items-center text-center h-16">
                                        <p className="truncate text-wrap align-text-top	items-start p-1 text-[10px]	mt-2 text-slate-300 media_title" style={{ height: '70px' }}>{media.title}</p>
                                        <p className="hidden media_type">{media.media_type}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </section>

                <label className="input input-bordered flex items-center gap-2 shadow-lg w-80">
                    <input id="movie-id-input" type="number" className="grow" placeholder="ID" value={movieId} onChange={changeIdInputValue} />
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-film" viewBox="0 0 16 16">
                        <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm4 0v6h8V1zm8 8H4v6h8zM1 1v2h2V1zm2 3H1v2h2zM1 7v2h2V7zm2 3H1v2h2zm-2 3v2h2v-2zM15 1h-2v2h2zm-2 3v2h2V4zm2 3h-2v2h2zm-2 3v2h2v-2zm2 3h-2v2h2z" />
                    </svg>
                </label>
            </section>

            <div className="w-96 alert bg-neutral shadow-lg">
                <section id="filters" className="w-80 flex flex-wrap gap-5 justify-center">
                    <label className="label cursor-pointer w-24">
                        <span className="label-text">Filme</span>
                        <input value={'film'} type="checkbox" className="checkbox" />
                    </label>
                    <label className="label cursor-pointer w-24">
                        <span className="label-text">Série</span>
                        <input value={'serie'} type="checkbox" className="checkbox" />
                    </label>
                    <label className="label cursor-pointer w-24">
                        <span className="label-text">Anime</span>
                        <input value={'anime'} type="checkbox" className="checkbox" />
                    </label>
                    <label className="label cursor-pointer w-24">
                        <span className="label-text">Desenho</span>
                        <input value={'cartoon'} type="checkbox" className="checkbox" />
                    </label>
                </section>
            </div>


        </section>
    )
}

export default FormDefault