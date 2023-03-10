import Loader from '../utility/Loader'
import ModalBackground from '../utility/ModalBackground'
import ModalTransitionAsChild from '../transitions/childs/ModalTransitionAsChild'
import { useState, Fragment, useRef, useEffect } from 'react'
import { app, getUserInfo, updateUserInfo, createHouse, uploadFile, getHouseInfo } from "../../firebase/main"
import Illustrations from "../utility/Illustrations"
import { Dialog, Transition, Popover, Menu } from '@headlessui/react'
import Button from "../Button"
import Icons from '../utility/Icons'
import FileInput from '../utility/FileInput'
import MainButton from '../MainButton'
import { arrayUnion } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link'
import Image from 'next/image'

const HouseGrid = (uid) => {
	const [loading, setLoading] = useState(true)
	const [isHouseCreationLoading, setIsHouseCreationLoading] = useState(false)
	const [hasJoinedHouses, setHasJoinedHouses] = useState(false)
	const [showCreateHouseModal, setShowCreateHouseModal] = useState(false)
	const [houseName, setHouseName] = useState("")
	const [houseDescription, setHouseDescription] = useState("")
	const [completedSteps, setCompletedSteps] = useState(0)
	const [houseAvatar, setHouseAvatar] = useState()
	const [houseBanner, setHouseBanner] = useState()
	const [houses, setHouses] = useState([])

	useEffect(() => {
		var theyHouses = [];
		if (uid && uid.uid != '') {
			getUserInfo(uid.uid).then((doc) => {
				if (doc.data()) {
					if (doc.data().housesJoined && doc.data().housesJoined.length != 0) {
						doc.data().housesJoined.forEach((house) => {
							getHouseInfo(house, uid.uid).then((thehousedata) => {
								theyHouses.push({ data: thehousedata.data().data, id: house })
								setHouses(theyHouses)
							})
						})
						setHasJoinedHouses(true)
						setLoading(false)
					} else {
						setHasJoinedHouses(false)
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
				createHouse({ avatar: d, banner: i, name: houseName, description: houseDescription, users: arrayUnion(uid.uid) }).then((e) => {
					updateUserInfo(uid.uid, { housesJoined: arrayUnion(e.id) }).then(() => {
						setShowCreateHouseModal(false)
						setIsHouseCreationLoading(false)
					})

				})
			})
		})



	}

	return (
		<div className="p-8 mt-10">
			{loading ? (
				<div className="card-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8" >
					<div className="card house select-none bg-dark-lighter animate-pulse transition duration-200 ease text-center rounded-md" ><div className="header bg-dark-lightest h-36 w-full rounded-md rounded-br-none rounded-bl-none relative block bg-center bg-cover"></div><div className="logo -mt-8 mb-1 left-4 top-0 relative rounded-full w-20 h-20 bg-dark-darker-low-opacity backdrop-blur-sm p-4"></div><div className="content p-4"><div className="title h-8 rounded-lg w-48 animate-pulse bg-dark-darker-low-opacity"></div><div className="mt-2 text-xl mb-2 bg-dark-darker-low-opacity h-6 w-92 font-bold rounded-lg w-auto truncate"></div><div className="text-xl mb-2 bg-dark-darker-low-opacity h-6 w-92 font-bold rounded-lg w-auto truncate"></div><div className="text-xl mb-2 bg-dark-darker-low-opacity h-6 w-72 font-bold rounded-lg w-auto truncate"></div></div></div>		
					<div className="card house select-none bg-dark-lighter animate-pulse transition duration-200 ease text-center rounded-md" ><div className="header bg-dark-lightest h-36 w-full rounded-md rounded-br-none rounded-bl-none relative block bg-center bg-cover"></div><div className="logo -mt-8 mb-1 left-4 top-0 relative rounded-full w-20 h-20 bg-dark-darker-low-opacity backdrop-blur-sm p-4"></div><div className="content p-4"><div className="title h-8 rounded-lg w-48 animate-pulse bg-dark-darker-low-opacity"></div><div className="mt-2 text-xl mb-2 bg-dark-darker-low-opacity h-6 w-92 font-bold rounded-lg w-auto truncate"></div><div className="text-xl mb-2 bg-dark-darker-low-opacity h-6 w-92 font-bold rounded-lg w-auto truncate"></div><div className="text-xl mb-2 bg-dark-darker-low-opacity h-6 w-72 font-bold rounded-lg w-auto truncate"></div></div></div>		
					<div className="card house select-none bg-dark-lighter animate-pulse transition duration-200 ease text-center rounded-md" ><div className="header bg-dark-lightest h-36 w-full rounded-md rounded-br-none rounded-bl-none relative block bg-center bg-cover"></div><div className="logo -mt-8 mb-1 left-4 top-0 relative rounded-full w-20 h-20 bg-dark-darker-low-opacity backdrop-blur-sm p-4"></div><div className="content p-4"><div className="title h-8 rounded-lg w-48 animate-pulse bg-dark-darker-low-opacity"></div><div className="mt-2 text-xl mb-2 bg-dark-darker-low-opacity h-6 w-92 font-bold rounded-lg w-auto truncate"></div><div className="text-xl mb-2 bg-dark-darker-low-opacity h-6 w-92 font-bold rounded-lg w-auto truncate"></div><div className="text-xl mb-2 bg-dark-darker-low-opacity h-6 w-72 font-bold rounded-lg w-auto truncate"></div></div></div>		
					<div className="card house select-none bg-dark-lighter animate-pulse transition duration-200 ease text-center rounded-md" ><div className="header bg-dark-lightest h-36 w-full rounded-md rounded-br-none rounded-bl-none relative block bg-center bg-cover"></div><div className="logo -mt-8 mb-1 left-4 top-0 relative rounded-full w-20 h-20 bg-dark-darker-low-opacity backdrop-blur-sm p-4"></div><div className="content p-4"><div className="title h-8 rounded-lg w-48 animate-pulse bg-dark-darker-low-opacity"></div><div className="mt-2 text-xl mb-2 bg-dark-darker-low-opacity h-6 w-92 font-bold rounded-lg w-auto truncate"></div><div className="text-xl mb-2 bg-dark-darker-low-opacity h-6 w-92 font-bold rounded-lg w-auto truncate"></div><div className="text-xl mb-2 bg-dark-darker-low-opacity h-6 w-72 font-bold rounded-lg w-auto truncate"></div></div></div>		
					<div className="card house select-none bg-dark-lighter animate-pulse transition duration-200 ease text-center rounded-md" ><div className="header bg-dark-lightest h-36 w-full rounded-md rounded-br-none rounded-bl-none relative block bg-center bg-cover"></div><div className="logo -mt-8 mb-1 left-4 top-0 relative rounded-full w-20 h-20 bg-dark-darker-low-opacity backdrop-blur-sm p-4"></div><div className="content p-4"><div className="title h-8 rounded-lg w-48 animate-pulse bg-dark-darker-low-opacity"></div><div className="mt-2 text-xl mb-2 bg-dark-darker-low-opacity h-6 w-92 font-bold rounded-lg w-auto truncate"></div><div className="text-xl mb-2 bg-dark-darker-low-opacity h-6 w-92 font-bold rounded-lg w-auto truncate"></div><div className="text-xl mb-2 bg-dark-darker-low-opacity h-6 w-72 font-bold rounded-lg w-auto truncate"></div></div></div>		
					<div className="card house select-none bg-dark-lighter animate-pulse transition duration-200 ease text-center rounded-md" ><div className="header bg-dark-lightest h-36 w-full rounded-md rounded-br-none rounded-bl-none relative block bg-center bg-cover"></div><div className="logo -mt-8 mb-1 left-4 top-0 relative rounded-full w-20 h-20 bg-dark-darker-low-opacity backdrop-blur-sm p-4"></div><div className="content p-4"><div className="title h-8 rounded-lg w-48 animate-pulse bg-dark-darker-low-opacity"></div><div className="mt-2 text-xl mb-2 bg-dark-darker-low-opacity h-6 w-92 font-bold rounded-lg w-auto truncate"></div><div className="text-xl mb-2 bg-dark-darker-low-opacity h-6 w-92 font-bold rounded-lg w-auto truncate"></div><div className="text-xl mb-2 bg-dark-darker-low-opacity h-6 w-72 font-bold rounded-lg w-auto truncate"></div></div></div>		
					<div className="card house select-none bg-dark-lighter animate-pulse transition duration-200 ease text-center rounded-md" ><div className="header bg-dark-lightest h-36 w-full rounded-md rounded-br-none rounded-bl-none relative block bg-center bg-cover"></div><div className="logo -mt-8 mb-1 left-4 top-0 relative rounded-full w-20 h-20 bg-dark-darker-low-opacity backdrop-blur-sm p-4"></div><div className="content p-4"><div className="title h-8 rounded-lg w-48 animate-pulse bg-dark-darker-low-opacity"></div><div className="mt-2 text-xl mb-2 bg-dark-darker-low-opacity h-6 w-92 font-bold rounded-lg w-auto truncate"></div><div className="text-xl mb-2 bg-dark-darker-low-opacity h-6 w-92 font-bold rounded-lg w-auto truncate"></div><div className="text-xl mb-2 bg-dark-darker-low-opacity h-6 w-72 font-bold rounded-lg w-auto truncate"></div></div></div>		
					<div className="card house select-none bg-dark-lighter animate-pulse transition duration-200 ease text-center rounded-md" ><div className="header bg-dark-lightest h-36 w-full rounded-md rounded-br-none rounded-bl-none relative block bg-center bg-cover"></div><div className="logo -mt-8 mb-1 left-4 top-0 relative rounded-full w-20 h-20 bg-dark-darker-low-opacity backdrop-blur-sm p-4"></div><div className="content p-4"><div className="title h-8 rounded-lg w-48 animate-pulse bg-dark-darker-low-opacity"></div><div className="mt-2 text-xl mb-2 bg-dark-darker-low-opacity h-6 w-92 font-bold rounded-lg w-auto truncate"></div><div className="text-xl mb-2 bg-dark-darker-low-opacity h-6 w-92 font-bold rounded-lg w-auto truncate"></div><div className="text-xl mb-2 bg-dark-darker-low-opacity h-6 w-72 font-bold rounded-lg w-auto truncate"></div></div></div>		
					<div className="card house select-none bg-dark-lighter animate-pulse transition duration-200 ease text-center rounded-md" ><div className="header bg-dark-lightest h-36 w-full rounded-md rounded-br-none rounded-bl-none relative block bg-center bg-cover"></div><div className="logo -mt-8 mb-1 left-4 top-0 relative rounded-full w-20 h-20 bg-dark-darker-low-opacity backdrop-blur-sm p-4"></div><div className="content p-4"><div className="title h-8 rounded-lg w-48 animate-pulse bg-dark-darker-low-opacity"></div><div className="mt-2 text-xl mb-2 bg-dark-darker-low-opacity h-6 w-92 font-bold rounded-lg w-auto truncate"></div><div className="text-xl mb-2 bg-dark-darker-low-opacity h-6 w-92 font-bold rounded-lg w-auto truncate"></div><div className="text-xl mb-2 bg-dark-darker-low-opacity h-6 w-72 font-bold rounded-lg w-auto truncate"></div></div></div>		
					<div className="card house select-none bg-dark-lighter animate-pulse transition duration-200 ease text-center rounded-md" ><div className="header bg-dark-lightest h-36 w-full rounded-md rounded-br-none rounded-bl-none relative block bg-center bg-cover"></div><div className="logo -mt-8 mb-1 left-4 top-0 relative rounded-full w-20 h-20 bg-dark-darker-low-opacity backdrop-blur-sm p-4"></div><div className="content p-4"><div className="title h-8 rounded-lg w-48 animate-pulse bg-dark-darker-low-opacity"></div><div className="mt-2 text-xl mb-2 bg-dark-darker-low-opacity h-6 w-92 font-bold rounded-lg w-auto truncate"></div><div className="text-xl mb-2 bg-dark-darker-low-opacity h-6 w-92 font-bold rounded-lg w-auto truncate"></div><div className="text-xl mb-2 bg-dark-darker-low-opacity h-6 w-72 font-bold rounded-lg w-auto truncate"></div></div></div>		
					<div className="card house select-none bg-dark-lighter animate-pulse transition duration-200 ease text-center rounded-md" ><div className="header bg-dark-lightest h-36 w-full rounded-md rounded-br-none rounded-bl-none relative block bg-center bg-cover"></div><div className="logo -mt-8 mb-1 left-4 top-0 relative rounded-full w-20 h-20 bg-dark-darker-low-opacity backdrop-blur-sm p-4"></div><div className="content p-4"><div className="title h-8 rounded-lg w-48 animate-pulse bg-dark-darker-low-opacity"></div><div className="mt-2 text-xl mb-2 bg-dark-darker-low-opacity h-6 w-92 font-bold rounded-lg w-auto truncate"></div><div className="text-xl mb-2 bg-dark-darker-low-opacity h-6 w-92 font-bold rounded-lg w-auto truncate"></div><div className="text-xl mb-2 bg-dark-darker-low-opacity h-6 w-72 font-bold rounded-lg w-auto truncate"></div></div></div>		
					
				</div >
			) : (
				<>
					{hasJoinedHouses ? (
						<div className="card-grid grid grid-cols-1 grid-flow-row md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8" >
							{
								houses.map((house, index) => (
									<div key={house.id} >
										<Link href={`/app/houses/${house.id}`}>
											<div className="transition duration-200 ease cursor-pointer hover:-translate-y-1 hover:scale-105 hover:drop-shadow-lg select-none bg-dark-lighter transition duration-200 ease text-left rounded-md">
												<Image width={288} height={144} alt="House banner" src={house.data.banner} className="object-cover bg-dark-darker h-36 w-full rounded-md rounded-br-none rounded-bl-none relative block bg-center bg-cover" priority/>
												<Image width={80} height={80} alt="House avatar" src={house.data.avatar} className="logo -mt-8 mb-1 left-4 top-0 relative rounded-full w-20 h-20 bg-dark-darker-low-opacity backdrop-blur-sm" priority/>
												<div className="content w-auto p-4">
													<div className="text-xl mb-2 font-bold rounded-lg w-auto break-words" title={house.data.name}>
														{house.data.name}
													</div>
													<p className="break-words" title={house.data.description}>
														{house.data.description}
													</p>
												</div>
											</div>
										</Link>
									</div>
								))
							}
							<div onClick={() => setShowCreateHouseModal(true)} className="cursor-pointer select-none bg-dark-darker transition duration-200 ease hover:-translate-y-1 hover:scale-105 hover:drop-shadow-lg  text-center bg-center bg-splash-1 bg-no-repeat bg-cover rounded-md h-72 flex items-center justify-center">
								<div className="h-full w-full rounded-md text-center bg-black bg-opacity-50 items-center content-center backdrop-blur-sm">
									<div className="flex items-center justify-center mt-[10%]">
										<Icons icon="plus" className="h-24 w-24" />
									</div>
									<br />
									<div className="content p-8">
										<div className="title text-xl">Create a house?</div>
									</div>
								</div>
							</div>

						</div >
					) : (
						<div className="flex text-center content-center justify-center">
							<div>

								<Illustrations className="w-96 h-96" illustration="empty-bookshelf" />

								<div className="mt-8 text-lg font-medium">
									No houses :(
								</div>
								<div onClick={() => setShowCreateHouseModal(true)} className="text-gray-400 text-md font-medium underline hover:no-underline cursor-pointer">
									Create one?
								</div>
							</div>
						</div>
					)}
				</>
			)}
			<Transition appear show={showCreateHouseModal} as={Fragment}>

				<Dialog as="div" unmount={true} className="relative z-[100]" onClose={() => setShowCreateHouseModal(false)}>

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
								<Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-lg p-6 text-left align-middle text-white transition-all">

									<Dialog.Title
										as="h3"
										className="text-xl text-center font-medium"
									>
										{hasJoinedHouses ? "Create new house" : "And so your Roomss adventure commences..."}
									</Dialog.Title>

									<div className="bg-dark-lightest p-4 rounded-md mt-4">
										<div className="mt-4">
											{completedSteps === 0 ? (
												<>
													<div className="text-sm">Name</div>
													<div>
														<input type="text" value={houseName} onChange={(event) => { setHouseName(event.target.value) }} className="mt-2 text-base w-full rounded-md block border-none focus:outline-none p-3.5 bg-dark" placeholder="A very super awesome house" />
													</div>
													<div className="text-sm mt-4">Description</div>
													<input type="text" value={houseDescription} onChange={(event) => { setHouseDescription(event.target.value) }} className="mt-2 text-base w-full rounded-md block border-none focus:outline-none p-3.5 bg-dark" placeholder="This house is a pretty cool house :)" />
												</>
											) : (
												<>
													{completedSteps === 1 ? (
														<>
															<div className="text-center md:flex w-full">
																<div className="md:w-1/2">
																	<div className="text-base mb-4 font-bold">Upload Avatar</div>
																	{houseAvatar ? (
																		<div className="flex group relative items-center justify-center w-full">
																			<div className={`flex flex-col items-center justify-center w-full  text-center cursor-pointer `}>
																				<div className="flex flex-col items-center justify-center border-2 rounded-full hover:bg-dark border-gray-600 hover:border-gray-500">
																					<Image src={houseAvatar.link} width={128} height={128} alt="The preview for your house avatar" className={`aspect-square rounded-full text-gray-400`} />
																				</div>
																				<div onClick={() => setHouseAvatar()} className="absolute bottom-0 shadow-xl md:right-[25%] sm:right-[40%] right-12 bg-primary p-2 rounded-full"><Icons icon="x-mark" /></div>
																			</div>
																		</div>
																	) : (
																		<FileInput maxFiles={1} setFile={setHouseAvatar} accepts={{ 'image/*': ['.jpeg', '.png', '.wepb', '.gif'] }} showText={false} className="rounded-full w-32 h-32" />
																	)}
																	<p className="text-sm mt-4 text-gray-400">For best results, upload a <code>80x80</code> pixel image and make sure that image is square</p>

																</div>
																<div className="md:w-1/2">
																	<div className="text-base mt-6 md:mt-0 mb-4 font-bold">Upload Banner</div>

																	{houseBanner ? (
																		<div className="flex group items-center justify-center w-full">
																			<div className={`flex relative flex-col items-center justify-center w-full  text-center cursor-pointer `}>
																				<div className="flex flex-col items-center justify-center rounded-md border-2 hover:bg-dark border-gray-600 hover:border-gray-500">
																					<Image alt="The preview for your house banner" width={256} height={128} src={houseBanner.link} className={`rounded-md object-cover text-gray-400`} />
																				</div>
																				<div onClick={() => setHouseBanner()} className="absolute -bottom-2 shadow-xl md:right-0 -right-2 sm:right-36 bg-primary p-2 rounded-full"><Icons icon="x-mark" /></div>
																			</div>
																		</div>
																	) : (
																		<FileInput maxFiles={1} setFile={setHouseBanner} accepts={{ 'image/*': ['.jpeg', '.png', '.wepb', '.gif'] }} showText={false} className="rounded-full w-32 h-32" />
																	)}
																	<p className="text-sm mt-4 text-gray-400">Banner image will crop automatically to maintain aspect ratio and will be blurred as a ackground of hour house. We reccomend gradients or images with repeating patterns.</p>

																</div>
															</div>
														</>
													) : (
														<>
															<div className="text-base mt-6 md:mt-0 mb-4 text-center font-bold">Preview</div>
															<div className="card house select-none bg-dark-lighter transition duration-200 ease text-left rounded-md">
																<div className="h-36 w-full relative">
																	<Image alt="Your house banner" fill='contain' src={houseBanner.link} className="object-cover bg-dark-darker h-36 w-full rounded-md rounded-br-none rounded-bl-none relative block bg-center bg-cover" />
																</div>
																<Image alt="Your house avatar" width={20} height={20} src={houseAvatar.link} className="logo -mt-8 mb-1 left-4 top-0 relative rounded-full w-20 h-20 bg-dark-darker-low-opacity backdrop-blur-sm" />
																<div className="content p-4">
																	<div className="text-xl mb-2 font-bold rounded-lg w-auto truncate">
																		{houseName}
																	</div>
																	{houseDescription}
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
														{isHouseCreationLoading ? (
															<Loader className="h-6 w-6" />
														) : (
															<>
																<Button onClick={() => setCompletedSteps(completedSteps - 1)} isfull="true" className="m-2" istext="true">
																	<Icons icon="arrow-left" className="w-4 h-4 mr-2 transition group-hover:mr-3" /> Back
																</Button>
																<MainButton onClick={() => { makeTheHouse() }} istext="true" isfull="true" >
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
																<Button disabled={houseName && houseDescription && houseAvatar && houseBanner ? false : true} onClick={() => setCompletedSteps(completedSteps + 1)} isfull="true" istext="true">
																	Next <Icons icon="arrow-right" className="w-4 h-4 ml-2 transition group-hover:ml-3" />
																</Button>
															</>
														) : (
															<Button disabled={houseName && houseDescription ? false : true} onClick={() => { setCompletedSteps(completedSteps + 1) }} isfull="true" istext="true">
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

		</div>

	)
}

export default HouseGrid