import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa6"
import { GiSpikedDragonHead } from "react-icons/gi"

function Footer({backgroundColor = "bg-gray-100"}) {
    return (
        <footer className={backgroundColor}>
            <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="flex justify-center items-center text-teal-600">
                    <GiSpikedDragonHead className="w-16 h-16" />
                    <span className="ml-2 text-3xl">Transponder Medium</span>
                </div>

                <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500">
                    Stay updated with the latest posts and insights on our blog. Subscribe now!
                </p>


                <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">

                    <li>
                        <a className="text-gray-900 transition hover:text-gray-900/75" href="/"> Blogs </a>
                    </li>

                    <li>
                        <a className="text-gray-900 transition hover:text-gray-900/75" href="/topics"> Topics </a>
                    </li>

                    <li>
                        <a className="text-gray-900 transition hover:text-gray-900/75" href="https://blog-cms-six-omega.vercel.app/" target="_blank"> CMS Website </a>
                    </li>


                </ul>

                <ul className="mt-12 flex justify-center gap-6 md:gap-8">
                    <li>
                        <a
                            href="https://www.linkedin.com/in/avinash-h/"
                            rel="noreferrer"
                            target="_blank"
                            className="text-gray-700 transition hover:text-gray-700/75"
                        >
                            <span className="sr-only">LinkedIn</span>
                            <FaLinkedin className="h-6 w-6" />
                        </a>
                    </li>
                    <li>
                        <a
                            href="mailto:avinash@mail.com"
                            rel="noreferrer"
                            target="_blank"
                            className="text-gray-700 transition hover:text-gray-700/75"
                        >
                            <span className="sr-only">Email</span>
                            <FaEnvelope className="h-6 w-6" />
                        </a>
                    </li>


                    <li>
                        <a
                            href="https://github.com/avin4930c"
                            rel="noreferrer"
                            target="_blank"
                            className="text-gray-700 transition hover:text-gray-700/75"
                        >
                            <span className="sr-only">GitHub</span>
                            <FaGithub className="h-6 w-6" />
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer