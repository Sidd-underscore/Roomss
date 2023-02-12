import { Fragment } from "react"
import ModalBackgroundTransitionAsChild from '../transitions/childs/ModalBackgroundTransitionAsChild'

const BlurredModalBackground = ({ show }) => {
	return (
		<ModalBackgroundTransitionAsChild
			as={Fragment}
			show={show}
		>
			<div className="fixed inset-0 backdrop-blur-xl" />
		</ModalBackgroundTransitionAsChild>
	)
}

export default BlurredModalBackground