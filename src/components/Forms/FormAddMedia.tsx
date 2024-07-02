"use client"

import { Media } from "@/entities/Media"
import { ReactNode, useState } from "react"
import LinkInput from "./LinkInput"
import { sendMedia } from "@/utils/requests"

const FormAddMedia = ({ mediaType }: { mediaType: string }) => {
    const [linksCount, setlinksCount] = useState(1)
    const [links] = useState([] as ReactNode[])


    const addNewLink = (linksCount: number): void => {
        setlinksCount(linksCount + 1)
        links.push(<LinkInput id={linksCount} key={linksCount} />)
    }

    const removeLastMagnetLink = (linksCount: number): void => {
        if (linksCount > 1) {
            setlinksCount(linksCount - 1)
            links.pop()
        }
    }

    const handleSubmitForm = (e: any) => {
        e.preventDefault()

        const selectedMidia = document.querySelector('.bg-primary')

        const tmdbId: number | any = (document.getElementById('movie-id-input') as any)?.value
        const tmdbTitle: string | any = selectedMidia?.querySelector('.media_title')?.textContent
        let tmdbType: string | any = selectedMidia?.querySelector('.media_type')?.textContent

        if (tmdbType == '') {
            tmdbType = 'collection'
        }

        const filters = [] as string[]

        (document.querySelector('#filters')?.querySelectorAll('input') as NodeList).forEach((input: any) => {
            if (input.checked) {
                filters.push(String(input.value))
            }
        })

        const media = new Media(tmdbTitle, tmdbId, tmdbType, filters)

        for (let i = 0; i < linksCount; i++) {
            const link: string = (document.getElementById(`link-${i}`) as any)?.value
            media.addLink(link)
        }

        sendMedia(media)
        window.location.href = '/home'
    }

    return (
        <form id="film-form" onSubmit={handleSubmitForm}>
            <section id="links">
            <section className="magnet-link-with-resolution mb-3 flex flex-col gap-2 alert bg-neutral shadow-lg w-96">
                <LinkInput id={0} key={0} />

                {
                    links.map((magnetLink) => {
                        return magnetLink
                    })
                }
            </section>

                <section className="flex flex-wrap items-center justify-center w-96 items-center gap-5">
                    <section className="flex flex-wrap items-center justify-center w-96 items-center gap-5">
                        <button onClick={() => { addNewLink(linksCount) }} id="add-magnet-link" type="button" className="btn btn-primary w-36	">Adicionar Link</button>
                        <button onClick={() => { removeLastMagnetLink(linksCount) }} id="add-magnet-link" type="button" className="btn btn-error w-36">Remover</button>
                    </section>  

                    <button id="send-movie" type="submit" className="btn btn-success w-1/2">Enviar</button>
                </section>

            </section>
        </form>
    )
}

export default FormAddMedia
