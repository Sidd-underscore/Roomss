import { Fragment } from "react"
import ModalBackgroundTransitionAsChild from '../transitions/childs/ModalBackgroundTransitionAsChild'

const ModalBackground = () => {
	return (
		<ModalBackgroundTransitionAsChild
			as={Fragment}
		>
			<div className="fixed inset-0 bg-dark-darker-low-opacity backdrop-blur-md" />
		</ModalBackgroundTransitionAsChild>
	)
}

export default ModalBackground