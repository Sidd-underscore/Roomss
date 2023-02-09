import { useRouter } from 'next/router'
import Head from "next/head";
import { useState } from 'react';
import UserDropdown from "../../../components/app/UserDropdown";
import { app, getUser, getUserInfo, getHouseInfo } from "../../../firebase/main";
import Illustrations from "../../../components/utility/Illustrations"

const housePage = () => {
	const router = useRouter()
	const { id } = router.query
	const [house, setHouse] = useState()
	const [userUID, setUserUID] = useState('loading');
	const [loading, setLoading] = useState(true)
	const [hasRoomss, setHasRoomss] = useState(false);
	const [showCreateRoomssModal, setShowCreateRoomssModal] = useState(false)

	
	if (app) {
		getUser().then((user) => {
			if (user) {
				setUserUID(user.uid);
				if (userUID != 'loading') {
					getUserInfo(userUID).then(async (dadocument) => {
						if (dadocument.data().housesJoined.includes(id)) {
							getHouseInfo(id, user.uid).then((thehousedata) => {
								setHouse(thehousedata.data())
								if (thehousedata.data().roomss && thehousedata.data().roomss.length != 0) {
									setHasRoomss(true)
								}
								setLoading(false)
							})
						} else {
							router.push('/app', undefined, { shallow: true })
						}
					});
				}

			} else {
				router.push('/login', undefined, { shallow: true })
			}

		});
	}
	return (
		<>
			<Head>
				<title>{house ? house.data.name : 'House'} | Roomss</title>
			</Head>
			<div className="text-white">
				<div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
					<svg
						className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
						viewBox="0 0 1155 678"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
							fillOpacity=".3"
							d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
						/>
						<defs>
							<linearGradient
								id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
								x1="1155.49"
								x2="-78.208"
								y1=".177"
								y2="474.645"
								gradientUnits="userSpaceOnUse"
							>
								<stop stopColor="#2f80ec" />
								<stop offset={1} stopColor="#2f80ec75" />
							</linearGradient>
						</defs>
					</svg>
				</div>
				<UserDropdown uid={userUID} />
				{house ?
					(
						<div className="select-none text-xl mt-10 space-y-2 ml-6 p-2 font-semibold max-w-[83.333333%] w-3/6">
							<div className="text-5xl mt-4 mb-4 font-bold">
								{house.data.name}
							</div>
							{house.data.description}
						</div>
					) :
					(

						<div className="select-none text-2xl mt-10 space-y-2 ml-6 p-2 font-semibold w-3/6">
							<span className="bg-dark rounded-md animate-pulse text-transparent">Loading...</span>
							<div className="bg-dark rounded-lg animate-pulse text-transparent text-7xl mt-4 font-bold max-w-96">
								Loading...
							</div>
						</div>
					)}
			</div>
			<div className="p-8 mt-10">
				{loading ? (
					<div className="card-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8" >
						<div className="card house select-none bg-dark-lighter animate-pulse transition duration-200 ease text-center rounded-md" ><div className="header bg-dark-lightest h-36 w-full rounded-md rounded-br-none rounded-bl-none relative block bg-center bg-cover"></div><div className="logo -mt-8 mb-1 left-4 top-0 relative rounded-full w-20 h-20 bg-dark-darker-low-opacity backdrop-blur-sm p-4"></div><div className="content p-4"><div className="title h-8 rounded-lg w-48 animate-pulse bg-dark-darker-low-opacity"></div></div></div>
						<div className="card house select-none bg-dark-lighter animate-pulse transition duration-200 ease text-center rounded-md" ><div className="header bg-dark-lightest h-36 w-full rounded-md rounded-br-none rounded-bl-none relative block bg-center bg-cover"></div><div className="logo -mt-8 mb-1 left-4 top-0 relative rounded-full w-20 h-20 bg-dark-darker-low-opacity backdrop-blur-sm p-4"></div><div className="content p-4"><div className="title h-8 rounded-lg w-48 animate-pulse bg-dark-darker-low-opacity"></div></div></div>
						<div className="card house select-none bg-dark-lighter animate-pulse transition duration-200 ease text-center rounded-md" ><div className="header bg-dark-lightest h-36 w-full rounded-md rounded-br-none rounded-bl-none relative block bg-center bg-cover"></div><div className="logo -mt-8 mb-1 left-4 top-0 relative rounded-full w-20 h-20 bg-dark-darker-low-opacity backdrop-blur-sm p-4"></div><div className="content p-4"><div className="title h-8 rounded-lg w-48 animate-pulse bg-dark-darker-low-opacity"></div></div></div>
						<div className="card house select-none bg-dark-lighter animate-pulse transition duration-200 ease text-center rounded-md" ><div className="header bg-dark-lightest h-36 w-full rounded-md rounded-br-none rounded-bl-none relative block bg-center bg-cover"></div><div className="logo -mt-8 mb-1 left-4 top-0 relative rounded-full w-20 h-20 bg-dark-darker-low-opacity backdrop-blur-sm p-4"></div><div className="content p-4"><div className="title h-8 rounded-lg w-48 animate-pulse bg-dark-darker-low-opacity"></div></div></div>
						<div className="card house select-none bg-dark-lighter animate-pulse transition duration-200 ease text-center rounded-md" ><div className="header bg-dark-lightest h-36 w-full rounded-md rounded-br-none rounded-bl-none relative block bg-center bg-cover"></div><div className="logo -mt-8 mb-1 left-4 top-0 relative rounded-full w-20 h-20 bg-dark-darker-low-opacity backdrop-blur-sm p-4"></div><div className="content p-4"><div className="title h-8 rounded-lg w-48 animate-pulse bg-dark-darker-low-opacity"></div></div></div>
						<div className="card house select-none bg-dark-lighter animate-pulse transition duration-200 ease text-center rounded-md" ><div className="header bg-dark-lightest h-36 w-full rounded-md rounded-br-none rounded-bl-none relative block bg-center bg-cover"></div><div className="logo -mt-8 mb-1 left-4 top-0 relative rounded-full w-20 h-20 bg-dark-darker-low-opacity backdrop-blur-sm p-4"></div><div className="content p-4"><div className="title h-8 rounded-lg w-48 animate-pulse bg-dark-darker-low-opacity"></div></div></div>
						<div className="card house select-none bg-dark-lighter animate-pulse transition duration-200 ease text-center rounded-md" ><div className="header bg-dark-lightest h-36 w-full rounded-md rounded-br-none rounded-bl-none relative block bg-center bg-cover"></div><div className="logo -mt-8 mb-1 left-4 top-0 relative rounded-full w-20 h-20 bg-dark-darker-low-opacity backdrop-blur-sm p-4"></div><div className="content p-4"><div className="title h-8 rounded-lg w-48 animate-pulse bg-dark-darker-low-opacity"></div></div></div>
						<div className="card house select-none bg-dark-lighter animate-pulse transition duration-200 ease text-center rounded-md" ><div className="header bg-dark-lightest h-36 w-full rounded-md rounded-br-none rounded-bl-none relative block bg-center bg-cover"></div><div className="logo -mt-8 mb-1 left-4 top-0 relative rounded-full w-20 h-20 bg-dark-darker-low-opacity backdrop-blur-sm p-4"></div><div className="content p-4"><div className="title h-8 rounded-lg w-48 animate-pulse bg-dark-darker-low-opacity"></div></div></div>
						<div className="card house select-none bg-dark-lighter animate-pulse transition duration-200 ease text-center rounded-md" ><div className="header bg-dark-lightest h-36 w-full rounded-md rounded-br-none rounded-bl-none relative block bg-center bg-cover"></div><div className="logo -mt-8 mb-1 left-4 top-0 relative rounded-full w-20 h-20 bg-dark-darker-low-opacity backdrop-blur-sm p-4"></div><div className="content p-4"><div className="title h-8 rounded-lg w-48 animate-pulse bg-dark-darker-low-opacity"></div></div></div>
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
								<div onClick={() => setShowCreateRoomssModal(true)} className="text-gray-400 text-md font-medium underline hover:no-underline cursor-pointer">
									Create one?
								</div>
							</div>
						</div>
						)}
					</>
				)}
			</div>
		</>
	)
}

export default housePage