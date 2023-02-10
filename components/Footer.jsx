import Image from "next/image"
import Link from "next/link"

const Footer = () => {
	return (
		<>

		<footer className="p-4 py-12 lg:py-16 px-6 max-w-7xl mx-auto rounded-lg shadow md:px-6 md:py-8">

			<div className="sm:flex sm:items-center sm:justify-between">
				<Link href="/" className="flex items-center mb-4 sm:mb-0">
					<Image height={32} width={64} src="/img/roomss.png" className="h-8 mr-3" alt="Roomss Logo" />
					<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Roomss</span>
				</Link>
				<ul className="flex flex-wrap items-center mb-6 text-sm sm:mb-0 text-gray-400">
					<li>
						<span className="mr-4">In memory of Fluffy, Sunny, Simba & Dasho. They will never be forgotten ❤️</span>
					</li>
				</ul>
			</div>
			<hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
			<span className="block text-sm sm:text-center text-gray-400">Made with 💖 by <a rel="noreferrer" href="https://sidd.is-a.dev" target="_blank" className="font-medium underline hover:no-underline">Sidd_</a> in Portland, OR.
			</span>
		</footer>
		</>

	)
}

export default Footer