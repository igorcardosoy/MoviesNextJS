import { getMediaByQueryFromTmdb, getMediaCollectionByQueryFromTmdb } from "./requests";
import { TmdbMedia } from "@/entities/Media";

export async function searchMediaInTMDB(setMidiaList: any, query: string) {
    getMediaByQueryFromTmdb(query).then((midiaList) => {

        const shortMidiaList = [] as TmdbMedia[]
        for (let index = 0; index < 3; index++) {
            if (midiaList[index] !== undefined) {
                shortMidiaList.push(midiaList[index])
            }
        }

        getMediaCollectionByQueryFromTmdb(query).then((midiaList) => {
            if (midiaList[1] !== undefined) {
                shortMidiaList.push(midiaList[1])
            }

            setMidiaList(shortMidiaList)
        })
    })
}

export function getTypeInPtBR(type: string) {
    switch (type) {
        case 'movie':
            return 'Filme'
        case 'tv':
            return 'Série'
        default:
            return 'Coleção'
    }
}