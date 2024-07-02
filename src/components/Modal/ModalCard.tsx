"use client"

import { useGetMediaFromTMDBWithSRW, SWRTmdbRes } from "@/utils/swrRequests"
import ModalRemoveButton from "./ModalRemoveButton"
import Image from "next/image"
import { Media, TmdbMedia } from "@/entities/Media"
import ModalButton from "./ModalButton"
import NetflixIcon from "../icons/NetflixIcon"

interface ModalCardProps {
    modalId: number;
    media: Media;
    isAuthenticated: boolean;
}

const ModalCard = ({ modalId, media, isAuthenticated }: ModalCardProps) => {
    const res: SWRTmdbRes = useGetMediaFromTMDBWithSRW(media.tmdb_id, media.tmdb_type)
    if (res.isLoading) {
        return (
            <div className="flex justify-center items-center mt-5 flex-col">
                <div className="flex flex-col gap-4 w-52">
                    <div className="skeleton h-32 w-full"></div>
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                </div>
            </div>
        )
    } else if (res.error) {
        return <div>Erro ao carregar os dados</div>
    }

    const handleKeyDownModal = (e: any) => {
        if (e.key === 'Escape') {
            e.target.checked = false
        }
    }

    const tmdbMidia: TmdbMedia = res.data
    const TMDB_IMG_URL = process.env.NEXT_PUBLIC_TMDB_PUBLIC_IMAGE_BASE_URL

    tmdbMidia.backdrop_path = TMDB_IMG_URL + tmdbMidia.backdrop_path

    if (tmdbMidia.title === undefined) {
        tmdbMidia.title = tmdbMidia.name
        tmdbMidia.release_date = tmdbMidia.first_air_date
    }

    tmdbMidia.release_date_type = new Date(String(tmdbMidia.release_date))

    return (

        <div>
            <label htmlFor={"my_modal_" + modalId} className="cursor-pointer shadow-lg">
                <div className="card w-52 bg-base-100 shadow-xl">
                    <figure className="px-5 pt-5">
                        <Image
                            src={TMDB_IMG_URL + tmdbMidia.poster_path}
                            width={300}
                            height={450}
                            alt={"Poster de " + tmdbMidia.title}
                            className="rounded-xl"
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII="
                        />
                    </figure>
                    <div className="card-body items-center text-center ">
                        <h5 className="text-clip text-wrap align-text-top items-start" style={{ height: '60px' }}> {tmdbMidia.title}</h5>
                    </div>
                </div>
            </label>
            <input onKeyDown={handleKeyDownModal} type="checkbox" id={"my_modal_" + modalId} className="modal-toggle" />

            <div className="modal" role="dialog">
                <div className="modal-box flex gap-5 flex-col ">
                    <label htmlFor={"my_modal_" + modalId} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                    <section>
                        <h3 className="text-lg font-bold">{tmdbMidia.title}</h3>
                    </section>
                    <section className="alert alert-dark flex flex-col">
                        <h4 className="fs-5 fw-bold">Sinopse</h4>
                        <p className="modal-text">{tmdbMidia.overview}</p>
                    </section>
                    {tmdbMidia.release_date !== undefined ?
                        <section className="alert alert-dark">
                            <h4 className="fs-5 fw-bold">Data de Lançamento:</h4>
                            <p className="modal-text">{tmdbMidia.release_date_type.toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</p>
                        </section>
                        : ''}
                    {tmdbMidia.runtime !== undefined ?
                        <section className="alert alert-dark">
                            <h4 className="fs-5 fw-bold">Duração:</h4>
                            <p className="modal-text">{Math.floor(tmdbMidia.runtime / 60)}h e {tmdbMidia.runtime % 60}min</p>
                        </section>
                        : ''}

                    <div className="modal-action">
                        <div className="flex justify-center gap-3 flex-wrap" style={{ width: "100%", height: "100%" }}>
                            {
                                media.links?.map((link: string, index: number) => {
                                    return (
                                        <ModalButton key={media.tmdb_id + '-' + media.tmdb_type + '-' + index} link={link} />
                                    )
                                })
                            }
                            {
                                isAuthenticated ? <ModalRemoveButton type={media.tmdb_type} id={media.id} /> : ''
                            }
                        </div>
                    </div>
                </div>
                <label className="modal-backdrop" htmlFor={"my_modal_" + modalId}></label>
            </div>
        </div >
    )
}



export default ModalCard