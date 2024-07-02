'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"

const SearchBar = () => {

    const [searchText, setSearchText] = useState("")
    const router = useRouter()

    const handleChange = (e: any) => {
        setSearchText(e.target.value)
        if (e.target.value === "") {
            router.push(`/home/`)
        } else {
            router.push(`/home/filter/search?query=${e.target.value}`)
        }
    }

    return (
        <div className="form-control lg-hidden">
            <input onChange={handleChange} value={searchText} className="input input-bordered  w-24 md:w-auto" type="search" placeholder="Pesquisar" aria-label="Search" />
        </div>
    )
}

export default SearchBar