'use client'

import { deleteMedia } from "@/utils/requests"


const ModalRemoveButton = ({ id = 0 as number, type = '' as string }) => {


    const handleDelete = async () => {
        await deleteMedia(id, type)
        window.location.reload()
    }

    return (
        <div>
            <button className="btn btn-outline btn-error" onClick={() => (document.getElementById('delete-modal-' + id) as any).showModal()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                </svg>
                Excluir
            </button>
            <dialog id={"delete-modal-" + id} className="modal">
                <div className="modal-box ">
                    <h3 className="font-bold text-lg">Excluir Filme</h3>
                    <p className="py-4">Você realmente deseja deletar o filme?</p>
                    <div className="modal-action">
                        <button onClick={handleDelete} className="btn btn-outline">
                            Sim
                        </button>
                        <form method="dialog">
                            <button className="btn btn-outline">Não</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default ModalRemoveButton