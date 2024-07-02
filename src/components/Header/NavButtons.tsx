import Link from "next/link"

const NavButtons = ({isAuth = false as boolean, isDropdown = false as boolean}) => {

    return (
        <ul className={isDropdown ? "menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52" : "menu menu-horizontal px-1 gap-1"}>
            <li><Link id="all" href="/home">Tudo</Link></li>
            <li><Link id="movie" href="/home/filter/movie">Filmes</Link></li>
            <li><Link id="tv" href="/home/filter/tv">Series</Link></li>
            <li><Link id="cartoon" href="/home/filter/cartoon">Desenhos</Link></li>
            <li><Link id="anime" href="/home/filter/anime">Animes</Link></li>
            {isAuth ? <li><Link href="/home/add">Adicionar</Link></li> : ''}
            {isAuth ? <li><Link href="/home/newUser">Novo Usuário</Link></li> : ''}
        </ul>
    )
}

export default NavButtons