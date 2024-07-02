"use client"

import FormDefault from "@/components/Forms/FormDefault"
import {  useAuthenticated } from "@/utils/authentication"
import { useState } from "react"
import FormAddMedia from "@/components/Forms/FormAddMedia"

const AddMovie = () => {

    let isAuth:boolean = useAuthenticated()
    const [mediaType, setMediaType] = useState('' as string)

    if (!isAuth) {
        return (<div className="flex justify-center items-center mt-5 flex-col">
            <h1 className="text-2xl">Você não tem permissão para acessar essa página</h1>

            <a href="/home" className="btn btn-primary mt-10">Voltar</a>
        </div>)
    }

    return (
        <div className="mt-10 flex flex-col gap-4 items-center">
            <FormDefault setMediaType={setMediaType} />
            <FormAddMedia mediaType={mediaType} />
        </div>
    )
}

export default AddMovie