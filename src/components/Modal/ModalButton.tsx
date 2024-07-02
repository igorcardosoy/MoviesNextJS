import Crunchyroll from "../icons/Crunchyroll"
import DisneyPlus from "../icons/DisneyPlus"
import Max from "../icons/Max"
import NetflixIcon from "../icons/NetflixIcon"
import PrimeVideo from "../icons/PrimeVideo"

const ModalButton = ({ link = {} as string }) => {
    let svg = getSVG(link)

    return (
        <div className="d-flex justify-content-center">
            <a target="_blank" className="btn btn-outline btn-success page-button flex flex-wrap" href={link} role="button">
                {svg}
                Assistir
            </a>
        </div>
    )
}

export function getSVG(link: string): JSX.Element {
    let svg: JSX.Element = <></>

    if (link.includes('netflix')) {
        svg = <NetflixIcon/>
    } else if (link.includes('primevideo')) {
        svg = <PrimeVideo/>
    } else if (link.includes('max')) {
        svg = <Max/>
    } else if (link.includes('crunchyroll')) {
        svg = <Crunchyroll/>
    } else if (link.includes('disney')) {
        svg = <DisneyPlus/>
    }

    return svg
}

export default ModalButton