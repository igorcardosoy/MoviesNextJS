"use client"

import useSWR from "swr";
import { TMDB_KEY, TMDB_URL, API_URL } from "./requests";
import { Media, TmdbMedia } from "@/entities/Media";

const fetcher = (url: string) => fetch(url).then(res => res.json())

export type SWRTmdbRes = {
    data: TmdbMedia,
    error: any,
    isLoading: boolean
}

export type SWRMediaRes = {
    data: Media[],
    error: any,
    isLoading: boolean
}

export function useGetMediaFromTMDBWithSRW(id: number, type: string): SWRTmdbRes {

    const res: SWRTmdbRes = useSWR(`${TMDB_URL}/${type}/${id}?api_key=${TMDB_KEY}&language=pt-BR`, fetcher)

    if (!res.isLoading && !res.error) {
        return { data: res.data, error: null, isLoading: false }
    }

    return { data: {} as TmdbMedia, error: null, isLoading: true }

}

export function useGetAllMediaWithSWR(): SWRMediaRes {
    const movieData: SWRMediaRes = useSWR(API_URL +'/movie', fetcher)
    const tvData: SWRMediaRes = useSWR(API_URL +'/tv', fetcher)
    const collectionData: SWRMediaRes = useSWR(API_URL +'/collection', fetcher)

    if (!movieData.isLoading && !movieData.error && !tvData.isLoading && !tvData.error && !collectionData.isLoading && !collectionData.error) {
        let data: Media[] = []

        if (movieData.data === undefined) {
            movieData.data = []
        }

        if (tvData.data === undefined) {
            tvData.data = []
        }

        if (collectionData.data === undefined) {
            collectionData.data = []
        }

        data = [...movieData.data, ...tvData.data, ...collectionData.data]
        data.sort((a, b) => {
            if (a.title < b.title) {
                return -1;
            }
            if (a.title > b.title) {
                return 1;
            }
            return 0;
        });

        return { data: data, error: null, isLoading: false }
    }

    return { data: [], error: null, isLoading: true }
}