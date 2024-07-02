export class Media {
    public title: string
    public tmdb_id: number
    public tmdb_type: string
    public filter: Array<string>
    public links: Array<string>
    public id?: number

    constructor(title: string, tmdb_id: number, tmdb_type: string, filter: Array<string>, id?: number) {
        this.title = title
        this.tmdb_id = tmdb_id
        this.tmdb_type = tmdb_type
        this.filter = filter
        this.links = []
        this.id = id
    }

    public setId(id: number): void {
        this.id = id
    }

    public addLink(link: string): void {
        this.links.push(link)
    }
}

export type TmdbMedia = {
    // Common
    id: number
    overview: string
    poster_path: string
    backdrop_path: string
    media_type: string
    genre_ids: Array<number>

    // Movie
    title?: string
    release_date?: string
    runtime?: number

    // TV
    name?: string
    first_air_date?: string
    release_date_type?: Date
}
