import { Transition } from "@headlessui/react";

const ModalTransitionAsChild = ({ as, show, children, unmount, className }) => {
	return (
		<Transition.Child
			show={show}
			as={as}
			unmount={unmount}
			enter="ease-out duration-300"
			enterFrom="opacity-0 scale-95"
			enterTo="opacity-100 scale-100"
			leave="ease-in duration-200"
			leaveFrom="opacity-100 scale-100"
			leaveTo="opacity-0 scale-95"
			className={className}
		>
			{children}
		</Transition.Child>
	)
}

export default ModalTransitionAsChild;