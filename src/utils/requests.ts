import { Media, TmdbMedia } from "@/entities/Media";

export const TMDB_KEY:string = String(process.env.NEXT_PUBLIC_TMDB_PUBLIC_KEY)
export const TMDB_URL:string = String(process.env.NEXT_PUBLIC_TMDB_PUBLIC_BASE_URL)
export const API_URL:string = String(process.env.NEXT_PUBLIC_API_PUBLIC_BASE_URL)


export async function getMediaFromTmdb(id: number, type: string): Promise<TmdbMedia> {

    const res = await fetch(`${TMDB_URL}/${type}/${id}?api_key=${TMDB_KEY}&language=pt-BR`);
    const data = await res.json()

    return data;
}

export async function getMediaByQueryFromTmdb(query: string): Promise<TmdbMedia[]>{
    const res = await fetch(`${TMDB_URL}/search/multi?api_key=${TMDB_KEY}&language=pt-BR&query=${query}&page=1`);
    const data = await res.json()

    return data.results;
}

export async function getMediaCollectionByQueryFromTmdb(query: string): Promise<TmdbMedia[]>{
    const res = await fetch(`${TMDB_URL}/search/collection?api_key=${TMDB_KEY}&language=pt-BR&query=${query}&page=1`);
    const data = await res.json()

    return data.results;
}

export async function getAllMedia(): Promise<Media[]>{
    const options = {
        method: 'GET',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": 'Bearer '
        }
    }

    const resMovies = await fetch(API_URL + '/movie/', options)
    const dataMovies = await resMovies.json();

    const resCollection = await fetch(API_URL + '/collection/', options)
    const dataCollection = await resCollection.json();
    

    const resSeries = await fetch(API_URL + '/tv/', options)
    const dataSeries = await resSeries.json();

    // sort by title

    const data = [...dataMovies, ...dataCollection, ...dataSeries]
    data.sort((a, b) => {
        if (a.title < b.title) {
            return -1;
        }
        if (a.title > b.title) {
            return 1;
        }
        return 0;
    });

    return data;
}

export async function sendMedia(media: Media): Promise<boolean> {
    const options = {
        method: 'POST',
        body: JSON.stringify({ "title": media.title, "tmdb_id": media.tmdb_id, "tmdb_type": media.tmdb_type, "filter": media.filter, "links": media.links } ),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }

    const result = await fetch(API_URL + '/' + media.tmdb_type, options)

    if (result.status == 400) {
        return false
    } else {
        return true
    }
}

export async function deleteMedia(mediaId: number, mediaType: string): Promise<boolean> {
    const options = {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }

    const result = await fetch(`${API_URL}/${mediaType}/${mediaId}`, options)

    if (result.status == 400) {
        return false
    } else {
        return true
    }
}

