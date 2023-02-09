import { Fragment } from "react"
import ModalBackgroundTransitionAsChild from '../transitions/childs/ModalBackgroundTransitionAsChild'

const BlurredModalBackground = () => {
	return (
		<ModalBackgroundTransitionAsChild
			as={Fragment}
		>
			<div className="fixed inset-0 backdrop-blur-xl" />
		</ModalBackgroundTransitionAsChild>
	)
}

export default BlurredModalBackground