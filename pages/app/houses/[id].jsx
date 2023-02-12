import { useRouter } from 'next/router'
import Head from "next/head";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import UserDropdown from "../../../components/app/UserDropdown";
import { app, getUser, getUserInfo, getHouseInfo } from "../../../firebase/main";
import RoomGrid from '../../../components/app/house/RoomGrid'
import Link from 'next/link';
import Icons from '../../../components/utility/Icons';

const RoomPage = () => {
	const router = useRouter()
	const { id } = router.query
	const [house, setHouse] = useState()
	const [userUID, setUserUID] = useState();
	
	useEffect(() => {
		getUser().then((user) => {
			if (user && user.uid) {
				setUserUID(user.uid);
				getUserInfo(user.uid).then((dadocument) => {
					if (id) {
						if (dadocument.data().housesJoined && dadocument.data().housesJoined.includes(id)) {
							getHouseInfo(id, user.uid).then((thehousedata) => {
								setHouse(thehousedata.data())
							})
						} else {
							router.push('/app', undefined, { shallow: true })
						}
					}
				});

			} else {
				router.push('/login', undefined, { shallow: true })
			}

		});
	}, [getUser, setUserUID, getUserInfo, getHouseInfo, setHouse, router, id])



	return (
		<>
			<Head>
				<title>House | Roomss</title>
			</Head>
			<div className="text-white">
				<div className="fixed top-0 left-0 w-screen h-screen overflow-hidden -z-50 blur-md bg-cover bg-center" style={{ backgroundImage: `url("${house && house.data.banner ? house.data.banner : "/img/roomss.png"}")` }}>
				</div>
				<div className="fixed top-0 left-0 w-screen h-screen overflow-hidden -z-30 bg-opacity-30 bg-black">
				</div>
				<UserDropdown uid={userUID} />
				<div className="absolute top-6 opacity-75 transition hover:opacity-100 left-8">
					<Link href="/app">
						<div className="w-fit flex items-center">
							<Icons icon="arrow-left" className="mr-2" /> Home
						</div>
					</Link>
				</div>
				{house ?
					(
						<div className="select-none text-xl mt-10 space-y-2 ml-6 p-2 font-semibold max-w-[83.333333%] w-4/6">
							<div className="text-5xl mt-4 mb-4 font-bold" title={house.data.name}>
								{house.data.name}
							</div>
							<p className="max-h-48 line-clamp-4" title={house.data.description}>{house.data.description}</p>
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
				<RoomGrid uid={userUID} houseID={id} />
			</div>

		</>
	)
}

export default RoomPage