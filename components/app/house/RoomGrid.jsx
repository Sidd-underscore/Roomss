import Loader from '../../utility/Loader'
import ModalBackground from '../../utility/ModalBackground'
import ModalTransitionAsChild from '../../transitions/childs/ModalTransitionAsChild'
import { useState, Fragment, useEffect } from 'react'
import { createRoom, uploadFile, getHouseInfo } from "../../../firebase/main"
import Illustrations from "../../utility/Illustrations"
import { Dialog, Transition, Combobox } from '@headlessui/react'
import Button from "../../Button"
import Icons from '../../utility/Icons'
import SolidIcons from '../../utility/SolidIcons'
import FileInput from '../../utility/FileInput'
import MainButton from '../../MainButton'
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image'
import Link from 'next/link'

const RoomGrid = ({ uid, houseID }) => {
	const [loading, setLoading] = useState(true)
	const [isRoomCreationLoading, setIsRoomCreationLoading] = useState(false)
	const [hasRoomss, setHasRoomss] = useState(false)
	const [showCreateRoomModal, setShowCreateRoomModal] = useState(false)
	const [roomName, setRoomName] = useState("")
	const [roomDescription, setRoomDescription] = useState("")
	const [completedSteps, setCompletedSteps] = useState(0)
	const [roomAvatar, setRoomAvatar] = useState()
	const [roomss, setRoomss] = useState([])
	const roomTypes = [
		{ id: 'RoomType/TextChat', name: 'Text Chat', description: 'Chat by typing', comingSoon: true, icon: 'chat-bubble-left-right' },
		{ id: 'RoomType/VideoChat', name: 'Video Chat', description: 'See some other people\'s faces while talking', comingSoon: true, icon: 'camera' },
		{ id: 'RoomType/Canvas', name: 'Canvas', description: 'Draw in an unlimited canvas using shapes, arrows, text boxes, freepen and more', comingSoon: true, icon: 'paint-brush' },
		{ id: 'RoomType/DocumentEditor', name: 'Document Editor', description: 'Edit documents using top of the line features', comingSoon: true, icon: 'document-text' },
		{ id: 'RoomType/FileStorage', name: 'File Storage', description: 'Store files, share files, admire files', comingSoon: true, icon: 'circle-stack' },
	]
	const [selectedType, setSelectedType] = useState(roomTypes[0])
	const [query, setQuery] = useState('')

	const filteredRoomTypes =
		query === ''
			? roomTypes
			: roomTypes.filter((type) =>
				type.name
					.toLowerCase()
					.replace(/\s+/g, '')
					.includes(query.toLowerCase().replace(/\s+/g, ''))
			)

	useEffect(() => {
		var theyRoomss = [];
		if (uid && uid != '' && houseID) {
			getHouseInfo(houseID, uid).then((doc) => {
				if (doc.data()) {
					if (doc.data().roomss && doc.data().roomss.length != 0) {
						doc.data().roomss.forEach((room) => {
							theyRoomss.push({ room })
							setRoomss(theyRoomss)
						})
						setHasRoomss(true)
						setLoading(false)
					} else {
						setHasRoomss(false)
						setLoading(false)
					}
				}
			});
		}
	}, [uid, houseID]);

	const makeTheRoom = () => {
		setIsRoomCreationLoading(true)
		uploadFile(roomAvatar.blob, 'houses/avatars/' + uuidv4(), roomAvatar.blob.type).then((d) => {
			createRoom({ avatar: d, name: roomName, description: roomDescription, id: uuidv4(), type: selectedType.id }, houseID).then((e) => {
				setShowCreateRoomModal(false)
				setIsRoomCreationLoading(false)
			})
		})



	}

	return (
		<>
			<div className="p-8 mt-10">
				{loading ? (
					<div className="animate-pulse card-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8" >
						<div className="transition mt-8 duration-200 ease cursor-default select-none bg-dark-lighter transition duration-200 ease text-left rounded-md" ><div alt="The room avatar" priority className="logo -mt-8 mb-1 left-4 top-0 h-36 w-36 relative aspect-square rounded-[50%] bg-dark-darker-low-opacity backdrop-blur-sm" ></div><div className="content p-4"><div className="text-xl mb-2 bg-dark-darker-low-opacity h-7 w-36 font-bold rounded-lg w-auto truncate"></div><div className="mt-2 text-xl mb-2 bg-dark-darker-low-opacity h-6 w-92 font-bold rounded-lg w-auto truncate"></div><div className="text-xl mb-2 bg-dark-darker-low-opacity h-6 w-92 font-bold rounded-lg w-auto truncate"></div><div className="text-xl mb-2 bg-dark-darker-low-opacity h-6 w-72 font-bold rounded-lg w-auto truncate"></div></div></div>
						<div className="transition mt-8 duration-200 ease cursor-default select-none bg-dark-lighter transition duration-200 ease text-left rounded-md" ><div alt="The room avatar" priority className="logo -mt-8 mb-1 left-4 top-0 h-36 w-36 relative aspect-square rounded-[50%] bg-dark-darker-low-opacity backdrop-blur-sm" ></div><div className="content p-4"><div className="text-xl mb-2 bg-dark-darker-low-opacity h-7 w-36 font-bold rounded-lg w-auto truncate"></div><div className="mt-2 text-xl mb-2 bg-dark-darker-low-opacity h-6 w-92 font-bold rounded-lg w-auto truncate"></div><div className="text-xl mb-2 bg-dark-darker-low-opacity h-6 w-92 font-bold rounded-lg w-auto truncate"></div><div className="text-xl mb-2 bg-dark-darker-low-opacity h-6 w-72 font-bold rounded-lg w-auto truncate"></div></div></div>
						<div className="transition mt-8 duration-200 ease cursor-default select-none bg-dark-lighter transition duration-200 ease text-left rounded-md" ><div alt="The room avatar" priority className="logo -mt-8 mb-1 left-4 top-0 h-36 w-36 relative aspect-square rounded-[50%] bg-dark-darker-low-opacity backdrop-blur-sm" ></div><div className="content p-4"><div className="text-xl mb-2 bg-dark-darker-low-opacity h-7 w-36 font-bold rounded-lg w-auto truncate"></div><div className="mt-2 text-xl mb-2 bg-dark-darker-low-opacity h-6 w-92 font-bold rounded-lg w-auto truncate"></div><div className="text-xl mb-2 bg-dark-darker-low-opacity h-6 w-92 font-bold rounded-lg w-auto truncate"></div><div className="text-xl mb-2 bg-dark-darker-low-opacity h-6 w-72 font-bold rounded-lg w-auto truncate"></div></div></div>
						<div className="transition mt-8 duration-200 ease cursor-default select-none bg-dark-lighter transition duration-200 ease text-left rounded-md" ><div alt="The room avatar" priority className="logo -mt-8 mb-1 left-4 top-0 h-36 w-36 relative aspect-square rounded-[50%] bg-dark-darker-low-opacity backdrop-blur-sm" ></div><div className="content p-4"><div className="text-xl mb-2 bg-dark-darker-low-opacity h-7 w-36 font-bold rounded-lg w-auto truncate"></div><div className="mt-2 text-xl mb-2 bg-dark-darker-low-opacity h-6 w-92 font-bold rounded-lg w-auto truncate"></div><div className="text-xl mb-2 bg-dark-darker-low-opacity h-6 w-92 font-bold rounded-lg w-auto truncate"></div><div className="text-xl mb-2 bg-dark-darker-low-opacity h-6 w-72 font-bold rounded-lg w-auto truncate"></div></div></div>
						<div className="transition mt-8 duration-200 ease cursor-default select-none bg-dark-lighter transition duration-200 ease text-left rounded-md" ><div alt="The room avatar" priority className="logo -mt-8 mb-1 left-4 top-0 h-36 w-36 relative aspect-square rounded-[50%] bg-dark-darker-low-opacity backdrop-blur-sm" ></div><div className="content p-4"><div className="text-xl mb-2 bg-dark-darker-low-opacity h-7 w-36 font-bold rounded-lg w-auto truncate"></div><div className="mt-2 text-xl mb-2 bg-dark-darker-low-opacity h-6 w-92 font-bold rounded-lg w-auto truncate"></div><div className="text-xl mb-2 bg-dark-darker-low-opacity h-6 w-92 font-bold rounded-lg w-auto truncate"></div><div className="text-xl mb-2 bg-dark-darker-low-opacity h-6 w-72 font-bold rounded-lg w-auto truncate"></div></div></div>
						<div className="transition mt-8 duration-200 ease cursor-default select-none bg-dark-lighter transition duration-200 ease text-left rounded-md" ><div alt="The room avatar" priority className="logo -mt-8 mb-1 left-4 top-0 h-36 w-36 relative aspect-square rounded-[50%] bg-dark-darker-low-opacity backdrop-blur-sm" ></div><div className="content p-4"><div className="text-xl mb-2 bg-dark-darker-low-opacity h-7 w-36 font-bold rounded-lg w-auto truncate"></div><div className="mt-2 text-xl mb-2 bg-dark-darker-low-opacity h-6 w-92 font-bold rounded-lg w-auto truncate"></div><div className="text-xl mb-2 bg-dark-darker-low-opacity h-6 w-92 font-bold rounded-lg w-auto truncate"></div><div className="text-xl mb-2 bg-dark-darker-low-opacity h-6 w-72 font-bold rounded-lg w-auto truncate"></div></div></div>
						<div className="transition mt-8 duration-200 ease cursor-default select-none bg-dark-lighter transition duration-200 ease text-left rounded-md" ><div alt="The room avatar" priority className="logo -mt-8 mb-1 left-4 top-0 h-36 w-36 relative aspect-square rounded-[50%] bg-dark-darker-low-opacity backdrop-blur-sm" ></div><div className="content p-4"><div className="text-xl mb-2 bg-dark-darker-low-opacity h-7 w-36 font-bold rounded-lg w-auto truncate"></div><div className="mt-2 text-xl mb-2 bg-dark-darker-low-opacity h-6 w-92 font-bold rounded-lg w-auto truncate"></div><div className="text-xl mb-2 bg-dark-darker-low-opacity h-6 w-92 font-bold rounded-lg w-auto truncate"></div><div className="text-xl mb-2 bg-dark-darker-low-opacity h-6 w-72 font-bold rounded-lg w-auto truncate"></div></div></div>
						<div className="transition mt-8 duration-200 ease cursor-default select-none bg-dark-lighter transition duration-200 ease text-left rounded-md" ><div alt="The room avatar" priority className="logo -mt-8 mb-1 left-4 top-0 h-36 w-36 relative aspect-square rounded-[50%] bg-dark-darker-low-opacity backdrop-blur-sm" ></div><div className="content p-4"><div className="text-xl mb-2 bg-dark-darker-low-opacity h-7 w-36 font-bold rounded-lg w-auto truncate"></div><div className="mt-2 text-xl mb-2 bg-dark-darker-low-opacity h-6 w-92 font-bold rounded-lg w-auto truncate"></div><div className="text-xl mb-2 bg-dark-darker-low-opacity h-6 w-92 font-bold rounded-lg w-auto truncate"></div><div className="text-xl mb-2 bg-dark-darker-low-opacity h-6 w-72 font-bold rounded-lg w-auto truncate"></div></div></div>
						<div className="transition mt-8 duration-200 ease cursor-default select-none bg-dark-lighter transition duration-200 ease text-left rounded-md" ><div alt="The room avatar" priority className="logo -mt-8 mb-1 left-4 top-0 h-36 w-36 relative aspect-square rounded-[50%] bg-dark-darker-low-opacity backdrop-blur-sm" ></div><div className="content p-4"><div className="text-xl mb-2 bg-dark-darker-low-opacity h-7 w-36 font-bold rounded-lg w-auto truncate"></div><div className="mt-2 text-xl mb-2 bg-dark-darker-low-opacity h-6 w-92 font-bold rounded-lg w-auto truncate"></div><div className="text-xl mb-2 bg-dark-darker-low-opacity h-6 w-92 font-bold rounded-lg w-auto truncate"></div><div className="text-xl mb-2 bg-dark-darker-low-opacity h-6 w-72 font-bold rounded-lg w-auto truncate"></div></div></div>
						<div className="transition mt-8 duration-200 ease cursor-default select-none bg-dark-lighter transition duration-200 ease text-left rounded-md" ><div alt="The room avatar" priority className="logo -mt-8 mb-1 left-4 top-0 h-36 w-36 relative aspect-square rounded-[50%] bg-dark-darker-low-opacity backdrop-blur-sm" ></div><div className="content p-4"><div className="text-xl mb-2 bg-dark-darker-low-opacity h-7 w-36 font-bold rounded-lg w-auto truncate"></div><div className="mt-2 text-xl mb-2 bg-dark-darker-low-opacity h-6 w-92 font-bold rounded-lg w-auto truncate"></div><div className="text-xl mb-2 bg-dark-darker-low-opacity h-6 w-92 font-bold rounded-lg w-auto truncate"></div><div className="text-xl mb-2 bg-dark-darker-low-opacity h-6 w-72 font-bold rounded-lg w-auto truncate"></div></div></div>
						<div className="transition mt-8 duration-200 ease cursor-default select-none bg-dark-lighter transition duration-200 ease text-left rounded-md" ><div alt="The room avatar" priority className="logo -mt-8 mb-1 left-4 top-0 h-36 w-36 relative aspect-square rounded-[50%] bg-dark-darker-low-opacity backdrop-blur-sm" ></div><div className="content p-4"><div className="text-xl mb-2 bg-dark-darker-low-opacity h-7 w-36 font-bold rounded-lg w-auto truncate"></div><div className="mt-2 text-xl mb-2 bg-dark-darker-low-opacity h-6 w-92 font-bold rounded-lg w-auto truncate"></div><div className="text-xl mb-2 bg-dark-darker-low-opacity h-6 w-92 font-bold rounded-lg w-auto truncate"></div><div className="text-xl mb-2 bg-dark-darker-low-opacity h-6 w-72 font-bold rounded-lg w-auto truncate"></div></div></div>
						<div className="transition mt-8 duration-200 ease cursor-default select-none bg-dark-lighter transition duration-200 ease text-left rounded-md" ><div alt="The room avatar" priority className="logo -mt-8 mb-1 left-4 top-0 h-36 w-36 relative aspect-square rounded-[50%] bg-dark-darker-low-opacity backdrop-blur-sm" ></div><div className="content p-4"><div className="text-xl mb-2 bg-dark-darker-low-opacity h-7 w-36 font-bold rounded-lg w-auto truncate"></div><div className="mt-2 text-xl mb-2 bg-dark-darker-low-opacity h-6 w-92 font-bold rounded-lg w-auto truncate"></div><div className="text-xl mb-2 bg-dark-darker-low-opacity h-6 w-92 font-bold rounded-lg w-auto truncate"></div><div className="text-xl mb-2 bg-dark-darker-low-opacity h-6 w-72 font-bold rounded-lg w-auto truncate"></div></div></div>
						<div className="transition mt-8 duration-200 ease cursor-default select-none bg-dark-lighter transition duration-200 ease text-left rounded-md" ><div alt="The room avatar" priority className="logo -mt-8 mb-1 left-4 top-0 h-36 w-36 relative aspect-square rounded-[50%] bg-dark-darker-low-opacity backdrop-blur-sm" ></div><div className="content p-4"><div className="text-xl mb-2 bg-dark-darker-low-opacity h-7 w-36 font-bold rounded-lg w-auto truncate"></div><div className="mt-2 text-xl mb-2 bg-dark-darker-low-opacity h-6 w-92 font-bold rounded-lg w-auto truncate"></div><div className="text-xl mb-2 bg-dark-darker-low-opacity h-6 w-92 font-bold rounded-lg w-auto truncate"></div><div className="text-xl mb-2 bg-dark-darker-low-opacity h-6 w-72 font-bold rounded-lg w-auto truncate"></div></div></div>
					</div >
				) : (
					<>
						{hasRoomss ? (
							<div className="card-grid grid grid-cols-1 grid-flow-row md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8" >
								{
									roomss.map((room, index) => (
										<div className="transition mt-8 duration-200 ease cursor-pointer hover:-translate-y-1 hover:scale-105 hover:drop-shadow-lg select-none bg-dark-lighter transition duration-200 ease text-left rounded-md" key={room.room.id} >
											<Link href={`/app/houses/${houseID}/roomss/${room.room.id}`}>
												<div>
												<Image alt="The room avatar" src={room.room.avatar} width={114} height={114} className="logo -mt-8 mb-1 left-4 top-0 relative aspect-square rounded-[50%] bg-dark-darker-low-opacity backdrop-blur-sm" priority />
												<div className="content p-4">
													<div className="text-xl mb-2 font-bold rounded-lg w-auto truncate">
														{room.room.name}
													</div>
													{room.room.description}
												</div>
													</div>
											</Link>
										</div>
									))
								}
								<div onClick={() => setShowCreateRoomModal(true)} className="cursor-pointer select-none bg-dark-darker transition duration-200 ease hover:-translate-y-1 hover:scale-105 hover:drop-shadow-lg text-center bg-center bg-splash-1 bg-no-repeat bg-cover rounded-md h-72 flex items-center justify-center">
									<div className="h-full w-full rounded-md text-center bg-black bg-opacity-50 items-center content-center backdrop-blur-sm">
										<div className="flex items-center justify-center mt-[10%]">
											<Icons icon="plus" className="h-24 w-24" />
										</div>
										<br />
										<div className="content p-8">
											<div className="title text-xl">Create a room?</div>
										</div>
									</div>
								</div>
							</div>
						) : (
							<div className="flex text-center content-center justify-center">
								<div>

									<Illustrations className="w-96 h-96 drop-shadow-md" illustration="empty-bookshelf" />

									<div className="mt-8 text-lg font-medium text-shadow-md ">
										No Roomss :(
									</div>
									<div onClick={() => setShowCreateRoomModal(true)} className="text-shadow-md text-gray-200 text-md font-medium underline hover:no-underline cursor-pointer">
										Create one?
									</div>
								</div>
							</div>
						)}
					</>
				)}
			</div>
			<Transition appear show={showCreateRoomModal} as={Fragment}>

				<Dialog as="div" unmount={true} className="relative z-[100]" onClose={() => setShowCreateRoomModal(false)}>

					<ModalBackground />

					<div className="fixed inset-0 overflow-y-auto">

						<div className="flex min-h-full items-center justify-center p-4 text-center">

							<ModalTransitionAsChild className="w-full max-w-2xl">
								<div className="p-4 top-0 2xl:top-8 hidden xl:block [position:unset] rounded-md mt-4 w-full">
									<ul className="overflow-hidden text-center [counter-reset:step] ">
										<li className={`list-none text-white uppercase text-sm w-4/12 float-left relative before:w-5 before:leading-5 before:block before:text-md before:text-white before:bg-primary before:rounded-md before:[margin:0_auto_5px_auto] after:[content:_''] after:w-full after:h-1 after:rounded-full after:absolute after:[left:-50%] after:[top:9px] after:-z-[1] before:content-[counter(step)] before:[counter-increment:_step]`}>Basic Info</li>
										<li className={`list-none text-white uppercase text-sm w-4/12 float-left relative before:w-5 before:leading-5 before:block before:text-md before:text-white before:bg-primary before:rounded-md before:[margin:0_auto_5px_auto] after:[content:_''] after:w-full after:h-1 after:rounded-full after:absolute after:[left:-50%] after:[top:9px] ${completedSteps > 0 ? "after:bg-primary" : ""} after:-z-[1] before:content-[counter(step)] before:[counter-increment:_step]`}>Images</li>
										<li className={`list-none text-white uppercase text-sm w-4/12 float-left relative before:w-5 before:leading-5 before:block before:text-md before:text-white before:bg-primary before:rounded-md before:[margin:0_auto_5px_auto] after:[content:_''] after:w-full after:h-1 after:rounded-full after:absolute after:[left:-50%] after:[top:9px] ${completedSteps > 1 ? "after:bg-primary" : ""} after:-z-[1] before:content-[counter(step)] before:[counter-increment:_step]`}>Preview</li>
									</ul>
								</div>
								<Dialog.Panel className="w-full max-w-2xl transform rounded-lg p-6 text-left align-middle text-white transition-all">

									<Dialog.Title
										as="h3"
										className="text-xl text-center font-medium"
									>
										{hasRoomss ? "Create new room" : "Create the first room in this house!"}
									</Dialog.Title>

									<div className="bg-dark-lightest p-4 rounded-md mt-4">
										<div className="mt-4">
											{completedSteps === 0 ? (
												<>
													<div className="text-sm">Name</div>
													<div>
														<input type="text" value={roomName} onChange={(event) => { setRoomName(event.target.value) }} className="mt-2 text-base w-full rounded-md block border-none focus:outline-none p-3.5 bg-dark" placeholder="A very super awesome room" />
													</div>
													<div className="text-sm mt-4">Description</div>
													<input type="text" value={roomDescription} onChange={(event) => { setRoomDescription(event.target.value) }} className="mt-2 text-base w-full rounded-md block border-none focus:outline-none p-3.5 bg-dark" placeholder="This room is a pretty cool room :)" />
													<div className="text-sm mt-4">Type</div>
													<Combobox value={selectedType} onChange={setSelectedType}>
														<div className="relative mt-1">
															<div className="relative w-full cursor-default z-50 mt-2 text-base w-full rounded-md block border-none focus:outline-none p-0 bg-dark">
																<Combobox.Input
																	className="text-base w-full rounded-md block border-none focus:outline-none p-3.5 bg-dark"
																	displayValue={(type) => type.name}
																	onChange={(event) => setQuery(event.target.value)}
																/>
																<Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
																	<Icons icon="updown-chevron" />
																</Combobox.Button>
															</div>
															<Transition
																as={Fragment}
																leave="transition ease-in duration-100"
																leaveFrom="opacity-100"
																leaveTo="opacity-0"
																afterLeave={() => setQuery('')}
															>
																<Combobox.Options className="absolute mt-1 max-h-[20vh] w-full rounded-md overflow-auto bg-dark z-50  shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none text-white sm:text-sm">
																	{filteredRoomTypes.length === 0 && query !== '' ? (
																		<div className="relative cursor-default select-none py-2 px-4 text-center">
																			No Room type found. Suggest it <a rel="noreferrer" href="https://github.com/Sidd-underscore/Roomss/issues/new?assignees=&labels=&template=new-room-type.md&title=%5BNewRoom%5D" className="font-medium underline hover:no-underline" target="_blank">here</a>, or email <a rel="noreferrer" href="mailto:hello@roomss.tk?subject=New%20Room%20Type%20Suggestion!&body=Room%20Idea%0D%0AWhat%20would%20this%20room%20do%3F%0D%0A%0D%0AWhy%20is%20it%20useful%3F%0D%0A%0D%0AWhat's%20it's%20name%3F%0D%0A%0D%0A%0D%0AConcept%20art%2Fgood%20description%20of%20what%20it%20would%20look%20like%0D%0A%0D%0AAnything%20else%3F%20(libraries%2C%20examples%2C%20etc)%0D%0A" className="font-medium underline hover:no-underline" target="_blank">hello@roomss.tk</a>.
																		</div>
																	) : (
																		filteredRoomTypes.map((type) => (
																			<Combobox.Option
																				key={type.id}
																				className={({ active }) =>
																					`relative cursor-pointer select-none transition py-2 pl-10 pr-4 ${type.comingSoon && 'opacity-50 pointer-events-none'} ${active ? 'bg-dark-lighter text-white' : 'text-white'
																					}`
																				}
																				value={type}
																				
																			>
																				{({ selected, active }) => (
																					<>
																						<p
																							className={`block truncate font-medium`}
																						>
																							{type.name}
																						</p>
																						<p>
																							{type.description}
																						</p>
																							<span
																								className={`absolute inset-y-0 left-0 flex items-center pl-2`}
																							>
																								<SolidIcons icon={type.icon} className="h-7 w-7" aria-hidden="true" />
																								
																							</span>
																					</>
																				)}
																			</Combobox.Option>
																		))
																	)}
																</Combobox.Options>
															</Transition>
														</div>
													</Combobox>
												</>
											) : (
												<>
													{completedSteps === 1 ? (
														<>
															<div className="text-center w-full">
																<div className="text-base mb-4 font-bold">Upload Avatar</div>
																{roomAvatar ? (
																	<div className="flex group relative items-center justify-center w-full">
																		<div className={`flex flex-col items-center justify-center w-full  text-center cursor-pointer `}>
																			<div className="flex flex-col items-center justify-center border-2 rounded-full hover:bg-dark border-gray-600 hover:border-gray-500">
																				<Image src={roomAvatar.link} width={128} height={128} alt="The preview for your room avatar" className={`aspect-square rounded-full text-gray-400`} />
																			</div>
																			<div onClick={() => setRoomAvatar()} className="absolute bottom-0 shadow-xl sm:right-[40%] right-[30%] bg-primary p-2 rounded-full"><Icons icon="x-mark" /></div>
																		</div>
																	</div>
																) : (
																	<FileInput maxFiles={1} setFile={setRoomAvatar} accepts={{ 'image/*': ['.jpeg', '.png', '.wepb', '.gif'] }} showText={false} className="rounded-full w-32 h-32" />
																)}
																<p className="text-sm mt-4 text-gray-400">For best results, upload a <code>80x80</code> pixel image and make sure that image is square</p>


															</div>
														</>
													) : (
														<>
															<div className="text-base mt-6 md:mt-0 mb-10 text-center font-bold">Preview</div>
															<div className="select-none bg-dark-lighter transition duration-200 p-2 ease text-left rounded-md">
																<Image alt="Your room avatar" src={roomAvatar.link} width={20} height={20} className="logo -mt-8 mb-1 left-4 top-0 relative rounded-full w-20 h-20 bg-dark-darker-low-opacity backdrop-blur-sm" />
																<div className="content p-4">
																	<div className="text-xl mb-2 font-bold rounded-lg w-auto truncate">
																		{roomName}
																	</div>
																	{roomDescription}
																</div>
															</div>
														</>
													)}
												</>
											)}
										</div>

										<div className="text-sm mt-4 flex space-x-4">
											<>
												{completedSteps > 1 ? (
													<>
														{isRoomCreationLoading ? (
															<Loader className="h-6 w-6" />
														) : (
															<>
																<Button onClick={() => setCompletedSteps(completedSteps - 1)} isfull="true" className="m-2" istext="true">
																	<Icons icon="arrow-left" className="w-4 h-4 mr-2 transition group-hover:mr-3" /> Back
																</Button>
																<MainButton onClick={() => { makeTheRoom() }} istext="true" isfull="true" >
																	Create!!
																</MainButton>

															</>
														)}
													</>
												) : (
													<>
														{completedSteps > 0 ? (

															<>
																<Button onClick={() => setCompletedSteps(completedSteps - 1)} isfull="true" className="m-2" istext="true">
																	<Icons icon="arrow-left" className="w-4 h-4 mr-2 transition group-hover:mr-3" /> Back
																</Button>
																<Button disabled={roomName && roomDescription && roomAvatar ? false : true} onClick={() => setCompletedSteps(completedSteps + 1)} isfull="true" istext="true">
																	Next <Icons icon="arrow-right" className="w-4 h-4 ml-2 transition group-hover:ml-3" />
																</Button>
															</>
														) : (
															<Button disabled={roomName && roomDescription && selectedType ? false : true} onClick={() => { setCompletedSteps(completedSteps + 1) }} isfull="true" istext="true">
																Next <Icons icon="arrow-right" className="w-4 h-4 ml-2 transition group-hover:ml-3" />
															</Button>
														)}
													</>
												)}
											</>
										</div>
									</div>
								</Dialog.Panel>
							</ModalTransitionAsChild>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	)
}

export default RoomGrid