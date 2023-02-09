import { Transition } from "@headlessui/react";

const ModalBackgroundTransitionAsChild = ({ as, show, children }) => {
	return (
		<Transition.Child
			show={show}
			enter="ease-out duration-300"
			enterFrom="opacity-0"
			enterTo="opacity-100"
			leave="ease-in duration-200"
			leaveFrom="opacity-100"
			leaveTo="opacity-0"
			as={as}
		>
			{children}
		</Transition.Child>
	)
}

export default ModalBackgroundTransitionAsChild;