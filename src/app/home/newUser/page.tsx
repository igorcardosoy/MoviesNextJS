'use client'

import { alert } from "@/app/page"
import Email from "@/components/icons/Email"
import Lock from "@/components/icons/Lock"
import Person from "@/components/icons/Person"
import User from "@/components/icons/User"
import { API_URL } from "@/utils/requests"

const NewUser = () => {

    

    const registerUser = async (e: React.FormEvent) => {
        e.preventDefault()

        const username = (document.querySelector('input[type="text"]') as HTMLInputElement)?.value
        const email = (document.querySelector('input[type="email"]') as HTMLInputElement)?.value
        const password = (document.querySelector('input[type="password"]') as HTMLInputElement)?.value
        const photo = (document.querySelectorAll('input[type="text"]')[1] as HTMLInputElement)?.value

        if (!username || !email || !password || !photo) {
            alert('Preencha todos os campos!')
            return
        }

        if (!email.includes('@') || !email.includes('.')) {
            alert('Email inválido!')
            return
        }

        if (password.length < 8) {
            alert('Senha deve ter no mínimo 8 caracteres!')
            return
        }

        const res = await fetch(API_URL + '/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                email,
                password,
                photo
            })
        })

        if (res.status === 201) {
            window.location.href = '/home'
            return
        }

        alert('Email já cadastrado!')
    }

    return (
        <div className="flex flex-col gap-4 items-center mt-10">
            <form onSubmit={registerUser} className="flex gap-5 flex-col">
                    <div>
                        Username
                        <label className="input input-bordered flex items-center gap-2 mt-2">
                            <User />
                            <input type="text" className="grow" placeholder="Username" />
                        </label>
                    </div>
                    <div>
                        Email
                        <label className="input input-bordered flex items-center gap-2 mt-2">
                            <Email />
                            <input type="email" className="grow" placeholder="Email" />
                        </label>
                    </div>

                    <div>
                        Senha
                        <label className="input input-bordered flex items-center gap-2 mt-2">
                            <Lock />
                            <input id="password-input" type="password" className="grow" placeholder="Senha" />
                        </label>
                    </div>

                    <div>
                        Foto de Perfil
                        <label className="input input-bordered flex items-center gap-2 mt-2">
                            <Person />
                            <input type="text" className="grow" placeholder="Foto de Perfil (URL)" />
                        </label>
                    </div>

                    <button type="submit" className="btn btn-primary mt-4">Cadastrar</button>
            </form>
        </div >
    )
}

export default NewUser