import { Transition } from "@headlessui/react";

const DropDownPopoverTransition = ({ as, show, children }) => {
	return (
		<Transition
			show={show}
			enter="transition ease-out duration-200"
			enterFrom="opacity-0 translate-y-1"
			enterTo="opacity-100 translate-y-0"
			leave="transition ease-in duration-150"
			leaveFrom="opacity-100 translate-y-0"
			leaveTo="opacity-0 translate-y-1"
			as={as}
		>
			{children}
		</Transition>
	)
}

export default DropDownPopoverTransition;