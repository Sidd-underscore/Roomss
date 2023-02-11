import { Menu } from '@headlessui/react'
import { Fragment, useState } from 'react'
import MainTransition from '../transitions/MainTransition'
import AvatarDropdownPlaceholder from '../utility/AvatarDropdownPlaceholder'
import Status from './Status'

const UserDropdown = ({ uid }) => {
	const [showStatusModal, setShowStatusModal] = useState(false);

	return (
		<div className="fixed top-0 right-0 z-50 mr-6 mt-10">
			<Menu as="div" className="md:ring-1 md:ring-white md:ring-opacity-5 relative cursor-pointer md:p-2 mx-4/6 rounded-lg fixed md:bg-dark-darker md:backdrop-blur-xl inline-block md:focus-visible:ring-2 md:focus-visible:ring-white md:focus-visible:ring-opacity-75">
				<div>
					<Menu.Button className="inline-block w-full justify-center px-4 py-2 text-sm font-medium text-white vertical-middle focus:outline-none">
						<AvatarDropdownPlaceholder />
					</Menu.Button>
				</div>
				<MainTransition
					as={Fragment}
				>
					<Menu.Items className="absolute text-white right-0 mt-4 w-auto md:w-4/6 origin-top-right p-2 rounded-md bg-dark-darker backdrop-blur-xl shadow-lg ring-1 ring-white ring-opacity-5 focus:outline-none">
						<Menu.Item>
							<button
								onClick={() => setShowStatusModal(true)}
								className={`transition ease-in-out duration-150 hover:bg-dark-lighter group flex w-full items-center rounded-md px-2 py-2 text-sm`}
							>
								Status

							</button>
						</Menu.Item>
						<Menu.Item>
							<button
								className={`transition ease-in-out duration-150 hover:bg-red group flex w-full items-center rounded-md px-2 py-2 text-sm`}
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