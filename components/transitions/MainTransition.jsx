import { Transition } from "@headlessui/react";

const MainTransition = ({ as, show, children }) => {
	return (
		<Transition
			show={show}
			enter="transition duration-100 ease-out"
			enterFrom="transform scale-95 opacity-0"
			enterTo="transform scale-100 opacity-100"
			leave="transition duration-75 ease-out"
			leaveFrom="transform scale-100 opacity-100"
			leaveTo="transform scale-95 opacity-0"
			as={as}
		>
			{children}
		</Transition>
	)
}

export default MainTransition;