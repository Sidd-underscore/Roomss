import { Menu } from '@headlessui/react'
import { Fragment, useState } from 'react'
import MainTransition from '../transitions/MainTransition'
import AvatarDropdownPlaceholder from '../utility/AvatarDropdownPlaceholder'
import Status from './Status'

const UserDropdown = ({ data, uid }) => {
	const [showStatusModal, setShowStatusModal] = useState(false);

	return (
		<div className="fixed top-0 right-0 z-50 mr-6 mt-10">
			<Menu as="div" className="lg:ring-1 lg:ring-white transition lg:ring-opacity-5 hover:bg-opacity-50 relative cursor-pointer lg:p-2 mx-4/6 rounded-lg fixed lg:bg-black lg:bg-opacity-25 lg:backdrop-blur-lg inline-block lg:focus-visible:ring-2 lg:focus-visible:ring-white lg:focus-visible:ring-opacity-75">
				<div>
					<Menu.Button className="inline-block w-full justify-center px-4 py-2 text-sm font-medium text-white vertical-middle focus:outline-none">
						<AvatarDropdownPlaceholder data={data} />
					</Menu.Button>
				</div>
				<MainTransition
					as={Fragment}
				>
					<Menu.Items className="absolute text-white right-0 mt-4 w-fit-content lg:w-4/6 origin-top-right rounded-md bg-black bg-opacity-25 shadow-lg ring-1 backdrop-blur-lg ring-white ring-opacity-5 focus:outline-none">
						<Menu.Item>
							<button
								onClick={() => setShowStatusModal(true)}
								className={`transition ease-in-out duration-300 hover:bg-black hover:bg-opacity-100 flex w-full items-center rounded-md rounded-b-none p-3 text-sm`}
							>
								Status

							</button>
						</Menu.Item>
						<Menu.Item>
							<button
								className={`transition ease-in-out duration-300 hover:bg-red  flex w-full items-center rounded-md rounded-t-none p-3 text-sm`}
							>
								Logout
							</button>
						</Menu.Item>
					</Menu.Items>
				</MainTransition>
			</Menu>
			<Status uid={uid} normalClose={() => setShowStatusModal(false)} onClose={() => setShowStatusModal(false)} show={showStatusModal} />
		</div>
	)
}

export default UserDropdown