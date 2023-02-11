import Loader from '../../utility/Loader'
import BlurredModalBackground from '../../utility/BlurredModalBackground'
import ModalTransitionAsChild from '../../transitions/childs/ModalTransitionAsChild'
import { useState, Fragment, useRef, useEffect } from 'react'
import { app, getUserInfo, updateUserInfo, createHouse, uploadFile, getHouseInfo } from "../../../firebase/main"
import Illustrations from "../../utility/Illustrations"
import { Dialog, Transition, Popover, Menu } from '@headlessui/react'
import Button from "../../Button"
import Icons from '../../utility/Icons'
import FileInput from '../../utility/FileInput'
import MainButton from '../../MainButton'
import { arrayUnion } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link'
import Image from 'next/image'

const RoomGrid = ({ uid, houseID }) => {
	const [loading, setLoading] = useState(true)
	const [isRoomCreationLoading, setIsRoomCreationLoading] = useState(false)
	const [hasJoinedRoomss, setHasJoinedRoomss] = useState(false)
	const [showCreateRoomModal, setShowCreateRoomModal] = useState(false)
	const [roomName, setRoomName] = useState("")
	const [roomDescription, setRoomDescription] = useState("")
	const [completedSteps, setCompletedSteps] = useState(0)
	const [roomAvatar, setRoomssAvatar] = useState()
	const [roomss, setRoomss] = useState([])

	useEffect(() => {
		var theyRoomss = [];
		if (uid && uid.uid != '') {
			getHouseInfo(houseID, uid.uid).then((doc) => {
				if (doc.data()) {
					if (doc.data().roomss && doc.data().roomss.length != 0) {
						doc.data().roomss.forEach((room) => {
							getHouseInfo(room, houseID, uid.uid).then((theroomdata) => {
								theyRoomss.push({ data: theroomdata.data().data })
								setRoomss(theyHouses)
							})
						})
						setHasJoinedRoomss(true)
						setLoading(false)
					} else {
						setHasJoinedRoomss(false)
						setLoading(false)
					}
				}
			});
		}
	}, [uid]);

	const makeTheHouse = () => {
		setIsHouseCreationLoading(true)
		uploadFile(houseAvatar.blob, 'houses/avatars/' + uuidv4(), houseAvatar.blob.type).then((d) => {
			uploadFile(houseBanner.blob, 'houses/banners/' + uuidv4(), houseBanner.blob.type).then((i) => {
				createHouse({ avatar: d, banner: i, name: houseName, description: houseDescription, users: arrayUnion(uid.uid), keyForReact: uuidv4() }).then((e) => {
					updateUserInfo(uid.uid, { housesJoined: arrayUnion(e.id) }).then(() => {
						setShowCreateHouseModal(false)
						setIsHouseCreationLoading(false)
					})

				})
			})
		})



	}

	return (
		<>
			<div className="p-8 mt-10">
				{loading ? (
					<div className="card-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8" >
						<div className="card room select-none bg-dark-lighter animate-pulse transition duration-200 ease text-center rounded-md" ><div className="header bg-dark-lightest h-36 w-full rounded-md rounded-br-none rounded-bl-none relative block bg-center bg-cover"></div><div className="logo -mt-8 mb-1 left-4 top-0 relative rounded-full w-20 h-20 bg-dark-darker-low-opacity backdrop-blur-sm p-4"></div><div className="content p-4"><div className="title h-8 rounded-lg w-48 animate-pulse bg-dark-darker-low-opacity"></div></div></div>
						<div className="card room select-none bg-dark-lighter animate-pulse transition duration-200 ease text-center rounded-md" ><div className="header bg-dark-lightest h-36 w-full rounded-md rounded-br-none rounded-bl-none relative block bg-center bg-cover"></div><div className="logo -mt-8 mb-1 left-4 top-0 relative rounded-full w-20 h-20 bg-dark-darker-low-opacity backdrop-blur-sm p-4"></div><div className="content p-4"><div className="title h-8 rounded-lg w-48 animate-pulse bg-dark-darker-low-opacity"></div></div></div>
						<div className="card room select-none bg-dark-lighter animate-pulse transition duration-200 ease text-center rounded-md" ><div className="header bg-dark-lightest h-36 w-full rounded-md rounded-br-none rounded-bl-none relative block bg-center bg-cover"></div><div className="logo -mt-8 mb-1 left-4 top-0 relative rounded-full w-20 h-20 bg-dark-darker-low-opacity backdrop-blur-sm p-4"></div><div className="content p-4"><div className="title h-8 rounded-lg w-48 animate-pulse bg-dark-darker-low-opacity"></div></div></div>
						<div className="card room select-none bg-dark-lighter animate-pulse transition duration-200 ease text-center rounded-md" ><div className="header bg-dark-lightest h-36 w-full rounded-md rounded-br-none rounded-bl-none relative block bg-center bg-cover"></div><div className="logo -mt-8 mb-1 left-4 top-0 relative rounded-full w-20 h-20 bg-dark-darker-low-opacity backdrop-blur-sm p-4"></div><div className="content p-4"><div className="title h-8 rounded-lg w-48 animate-pulse bg-dark-darker-low-opacity"></div></div></div>
						<div className="card room select-none bg-dark-lighter animate-pulse transition duration-200 ease text-center rounded-md" ><div className="header bg-dark-lightest h-36 w-full rounded-md rounded-br-none rounded-bl-none relative block bg-center bg-cover"></div><div className="logo -mt-8 mb-1 left-4 top-0 relative rounded-full w-20 h-20 bg-dark-darker-low-opacity backdrop-blur-sm p-4"></div><div className="content p-4"><div className="title h-8 rounded-lg w-48 animate-pulse bg-dark-darker-low-opacity"></div></div></div>
						<div className="card room select-none bg-dark-lighter animate-pulse transition duration-200 ease text-center rounded-md" ><div className="header bg-dark-lightest h-36 w-full rounded-md rounded-br-none rounded-bl-none relative block bg-center bg-cover"></div><div className="logo -mt-8 mb-1 left-4 top-0 relative rounded-full w-20 h-20 bg-dark-darker-low-opacity backdrop-blur-sm p-4"></div><div className="content p-4"><div className="title h-8 rounded-lg w-48 animate-pulse bg-dark-darker-low-opacity"></div></div></div>
						<div className="card room select-none bg-dark-lighter animate-pulse transition duration-200 ease text-center rounded-md" ><div className="header bg-dark-lightest h-36 w-full rounded-md rounded-br-none rounded-bl-none relative block bg-center bg-cover"></div><div className="logo -mt-8 mb-1 left-4 top-0 relative rounded-full w-20 h-20 bg-dark-darker-low-opacity backdrop-blur-sm p-4"></div><div className="content p-4"><div className="title h-8 rounded-lg w-48 animate-pulse bg-dark-darker-low-opacity"></div></div></div>
						<div className="card room select-none bg-dark-lighter animate-pulse transition duration-200 ease text-center rounded-md" ><div className="header bg-dark-lightest h-36 w-full rounded-md rounded-br-none rounded-bl-none relative block bg-center bg-cover"></div><div className="logo -mt-8 mb-1 left-4 top-0 relative rounded-full w-20 h-20 bg-dark-darker-low-opacity backdrop-blur-sm p-4"></div><div className="content p-4"><div className="title h-8 rounded-lg w-48 animate-pulse bg-dark-darker-low-opacity"></div></div></div>
						<div className="card room select-none bg-dark-lighter animate-pulse transition duration-200 ease text-center rounded-md" ><div className="header bg-dark-lightest h-36 w-full rounded-md rounded-br-none rounded-bl-none relative block bg-center bg-cover"></div><div className="logo -mt-8 mb-1 left-4 top-0 relative rounded-full w-20 h-20 bg-dark-darker-low-opacity backdrop-blur-sm p-4"></div><div className="content p-4"><div className="title h-8 rounded-lg w-48 animate-pulse bg-dark-darker-low-opacity"></div></div></div>
					</div >
				) : (
					<>
						{hasRoomss ? (
							null
						) : (
							<div className="flex text-center content-center justify-center">
								<div>

									<Illustrations className="w-96 h-96" illustration="empty-bookshelf" />

									<div className="mt-8 text-lg font-medium">
										No Roomss :(
									</div>
									<div onClick={() => setShowCreateRoomModal(true)} className="text-gray-400 text-md font-medium underline hover:no-underline cursor-pointer">
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

					<BlurredModalBackground />

					<div className="fixed inset-0 overflow-y-auto">
						<ModalTransitionAsChild className="p-4 top-0 2xl:top-8 hidden xl:block fixed rounded-md mt-4 w-full">
							<ul className="overflow-hidden text-center [counter-reset:step] ">
								<li className={`list-none text-white uppercase text-sm w-4/12 float-left relative before:w-5 before:leading-5 before:block before:text-md before:text-white before:bg-primary before:rounded-md before:[margin:0_auto_5px_auto] after:[content:_''] after:w-full after:h-1 after:rounded-full after:absolute after:[left:-50%] after:[top:9px] after:-z-[1] before:content-[counter(step)] before:[counter-increment:_step]`}>Basic Info</li>
								<li className={`list-none text-white uppercase text-sm w-4/12 float-left relative before:w-5 before:leading-5 before:block before:text-md before:text-white before:bg-primary before:rounded-md before:[margin:0_auto_5px_auto] after:[content:_''] after:w-full after:h-1 after:rounded-full after:absolute after:[left:-50%] after:[top:9px] ${completedSteps > 0 ? "after:bg-primary" : ""} after:-z-[1] before:content-[counter(step)] before:[counter-increment:_step]`}>Images</li>
								<li className={`list-none text-white uppercase text-sm w-4/12 float-left relative before:w-5 before:leading-5 before:block before:text-md before:text-white before:bg-primary before:rounded-md before:[margin:0_auto_5px_auto] after:[content:_''] after:w-full after:h-1 after:rounded-full after:absolute after:[left:-50%] after:[top:9px] ${completedSteps > 1 ? "after:bg-primary" : ""} after:-z-[1] before:content-[counter(step)] before:[counter-increment:_step]`}>Preview</li>
							</ul>
						</ModalTransitionAsChild>
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<ModalTransitionAsChild className="w-full max-w-2xl">
								<Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-lg p-6 text-left align-middle text-white transition-all">

									<Dialog.Title
										as="h3"
										className="text-xl text-center font-medium"
									>
										{hasJoinedRoomss ? "Create new room" : "Create the first room in this house!"}
									</Dialog.Title>

									<div className="bg-dark-lightest p-4 rounded-md mt-4">
										<div className="mt-4">
											{completedSteps === 0 ? (
												<>
													<div className="text-sm">Name</div>
													<div>
														<input type="text" value={roomName} onChange={(event) => { setroomName(event.target.value) }} className="mt-2 text-base w-full rounded-md block border-none focus:outline-none p-3.5 bg-dark" placeholder="A very super awesome room" />
													</div>
													<div className="text-sm mt-4">Description</div>
													<input type="text" value={roomDescription} onChange={(event) => { setroomDescription(event.target.value) }} className="mt-2 text-base w-full rounded-md block border-none focus:outline-none p-3.5 bg-dark" placeholder="This room is a pretty cool room :)" />
												</>
											) : (
												<>
													{completedSteps === 1 ? (
														<>
															<div className="text-center md:flex w-full">
																<div className="md:w-1/2">
																	<div className="text-base mb-4 font-bold">Upload Avatar</div>
																	{roomAvatar ? (
																		<div className="flex group relative items-center justify-center w-full">
																			<div className={`flex flex-col items-center justify-center w-full  text-center cursor-pointer `}>
																				<div className="flex flex-col items-center justify-center border-2 rounded-full hover:bg-dark border-gray-600 hover:border-gray-500">
																					<Image src={roomAvatar.link} alt="The preview for your room avatar" className={`w-32 h-32 aspect-square rounded-full text-gray-400`} />
																				</div>
																				<div onClick={() => setroomAvatar()} className="absolute bottom-0 shadow-xl md:right-[25%] sm:right-[40%] right-12 bg-primary p-2 rounded-full"><Icons icon="x-mark" /></div>
																			</div>
																		</div>
																	) : (
																		<FileInput maxFiles={1} setFile={setroomAvatar} accepts={{ 'image/*': ['.jpeg', '.png', '.wepb', '.gif'] }} showText={false} className="rounded-full w-32 h-32" />
																	)}
																	<p className="text-sm mt-4 text-gray-400">For best results, upload a <code>80x80</code> pixel image and make sure that image is square</p>

																</div>
																<div className="md:w-1/2">
																	<div className="text-base mt-6 md:mt-0 mb-4 font-bold">Upload Banner</div>

																	{roomBanner ? (
																		<div className="flex group items-center justify-center w-full">
																			<div className={`flex relative flex-col items-center justify-center w-full  text-center cursor-pointer `}>
																				<div className="flex flex-col items-center justify-center rounded-md border-2 hover:bg-dark border-gray-600 hover:border-gray-500">
																					<Image alt="The preview for your room banner" src={roomBanner.link} className={`w-64 h-32 rounded-md object-cover text-gray-400`} />
																				</div>
																				<div onClick={() => setroomBanner()} className="absolute -bottom-2 shadow-xl md:right-0 -right-2 sm:right-36 bg-primary p-2 rounded-full"><Icons icon="x-mark" /></div>
																			</div>
																		</div>
																	) : (
																		<FileInput maxFiles={1} setFile={setroomBanner} accepts={{ 'image/*': ['.jpeg', '.png', '.wepb', '.gif'] }} showText={false} className="rounded-full w-32 h-32" />
																	)}
																	<p className="text-sm mt-4 text-gray-400">Banner image will crop automatically to maintain aspect ratio and will be blurred as a ackground of hour room. We reccomend gradients or images with repeating patterns.</p>

																</div>
															</div>
														</>
													) : (
														<>
															<div className="text-base mt-6 md:mt-0 mb-4 text-center font-bold">Preview</div>
															<div className="card room select-none bg-dark-lighter transition duration-200 ease text-left rounded-md">
																<Image alt="Your room banner" src={roomBanner.link} className="object-cover bg-dark-darker h-36 w-full rounded-md rounded-br-none rounded-bl-none relative block bg-center bg-cover" />
																<Image alt="Your room avatar" src={roomAvatar.link} className="logo -mt-8 mb-1 left-4 top-0 relative rounded-full w-20 h-20 bg-dark-darker-low-opacity backdrop-blur-sm" />
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
														{isroomCreationLoading ? (
															<Loader className="h-6 w-6" />
														) : (
															<>
																<Button onClick={() => setCompletedSteps(completedSteps - 1)} isfull="true" className="m-2" istext="true">
																	<Icons icon="arrow-left" className="w-4 h-4 mr-2 transition group-hover:mr-3" /> Back
																</Button>
																<MainButton onClick={() => { makeTheroom() }} istext="true" isfull="true" >
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
																<Button disabled={roomName && roomDescription && roomAvatar && roomBanner ? false : true} onClick={() => setCompletedSteps(completedSteps + 1)} isfull="true" istext="true">
																	Next <Icons icon="arrow-right" className="w-4 h-4 ml-2 transition group-hover:ml-3" />
																</Button>
															</>
														) : (
															<Button disabled={roomName && roomDescription ? false : true} onClick={() => { setCompletedSteps(completedSteps + 1) }} isfull="true" istext="true">
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