import { Media } from "@/entities/Media";
import { SWRMediaRes } from "./swrRequests";

export async function getFilteredMedia(mediaFinded: SWRMediaRes, mediaType: string, searchText = '' as string): Promise<Media[]> {
    switch (mediaType) {
        case 'movie':
            return mediaFinded.data.filter(media => media.filter.includes('film'))
        case 'tv':
            return mediaFinded.data.filter(media => media.filter.includes('serie'))
        case 'anime':
            return mediaFinded.data.filter(media => media.filter.includes('anime'))
        case 'cartoon':
            return mediaFinded.data.filter(media => media.filter.includes('cartoon'))
        case 'search':
            return mediaFinded.data.filter(media => media.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchText.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")))
        case 'all':
            return mediaFinded.data
        default:
            return []
    }
}