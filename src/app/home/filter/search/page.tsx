'use server'

import MediaContent from "@/components/MediaContent"

const Search = ({ searchParams = {} as { query: string } }) => {

    return (
        <MediaContent midiaType='search' searchText={searchParams.query} />
    )
}

export default Search