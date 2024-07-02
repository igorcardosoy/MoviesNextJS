import Link from "next/link"

const LoginButton = () => {
    return (
        <div className="dropdown dropdown-end">
            <Link href={'/'} tabIndex={0} role="button" className="btn btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-file-lock2-fill" viewBox="0 0 16 16">
                    <path d="M7 6a1 1 0 0 1 2 0v1H7z" />
                    <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2m-2 6v1.076c.54.166 1 .597 1 1.224v2.4c0 .816-.781 1.3-1.5 1.3h-3c-.719 0-1.5-.484-1.5-1.3V8.3c0-.627.46-1.058 1-1.224V6a2 2 0 1 1 4 0" />
                </svg>
            </Link>
        </div>
    )
}

export default LoginButton