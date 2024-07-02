"use client"

import { Media } from "@/entities/Media"
import ModalCard from "./Modal/ModalCard"
import { useAuthenticated } from "@/utils/authentication"
import { getFilteredMedia } from "@/utils/filterMidia"
import { SWRMediaRes, useGetAllMediaWithSWR } from "@/utils/swrRequests"
import { useEffect, useState } from "react"

const MidiaContent = ({ midiaType = 'all' as string, searchText = '' as string, }) => {

    let isAuth = useAuthenticated()

    const [midiaFiltered, setMidiaFiltered] = useState<Media[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const midiaFinded: SWRMediaRes = useGetAllMediaWithSWR()

    useEffect(() => {
        const organizeList = async () => {

            const filtered = await getFilteredMedia(midiaFinded, midiaType, searchText);

            setMidiaFiltered(filtered);
            setIsLoading(false);
        };

        organizeList();
    }, [searchText, midiaType, midiaFinded.isLoading]);

    if (midiaFinded.isLoading) {
        return (
            <div className="flex justify-center items-center mt-5 flex-col">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        )
    }

    return (

        <div className="flex justify-center items-center mt-5 flex-col">

            {isLoading && <span className="loading loading-spinner loading-lg"></span>}

            <div className="flex justify-center flex-wrap gap-5 ml-40 mr-40 mt-5 mx-5 mb-5">
                {midiaFiltered.map((midia, index) => {
                    return (
                        <ModalCard isAuthenticated={isAuth} key={index} modalId={index} media={midia} />
                    )
                })}
            </div>

        </div>
    )
}

export default MidiaContent