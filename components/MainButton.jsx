import Link from 'next/link';
import React from 'react'

const Button = ({ link, showicon, isfull, isrelativelink, istext, children, id, onClick }) => {
	let icon;
	let full;
	if (showicon === 'true') {
		icon = <svg aria-hidden="true" className="-rotate-45 ml-3 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
			<path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
		</svg>;
	}

	if (isfull === 'true') {
		full = 'select-none w-full text-white bg-primary antialiased ease-in-out duration-150 transition hover:bg-primary hover:scale-105 p-4 font-medium text-white bg-dark-lighter rounded-lg px-5 py-2.5 text-center flex align-center justify-center'
	} else {
		full = 'text-white select-none bg-primary antialiased ease-in-out duration-150 transition hover:bg-primary hover:scale-105 p-4 font-medium text-white bg-dark-lighter rounded-lg px-5 py-2.5 text-center flex align-center justify-center'
	}

	

	if (istext === 'true') {
		return (
			<>
				<button id={id} onClick={onClick} className={full}>
					{children}
					{icon}
				</button>
			</>
		)
	}
	if (isrelativelink === 'true' && link) {
		return (
			<Link id={id} href={link} className={full}>
				{children}
				{icon}
			</Link>
		)
	}

	if (link && !isrelativelink) {
		return (

			<a href={link} id={id} className={full}>
				{children}
				{icon}
			</a>
		)
	}
	return null;

}

export default Button;