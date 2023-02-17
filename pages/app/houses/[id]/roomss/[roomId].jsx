import { useRouter } from 'next/router'
import Head from "next/head";
import { useState, useEffect } from 'react';
import UserDropdown from "../../../../../components/app/UserDropdown";
import { app, getUser, getUserInfo, getHouseInfo } from "../../../../../firebase/main";
import RoomGrid from '../../../../../components/app/house/RoomGrid'
import RoomViewer from '../../../../../components/app/house/RoomViewer';

const RoomPage = () => {
	const router = useRouter()
	const { id } = router.query
	const [house, setHouse] = useState()
	const [userUID, setUserUID] = useState();
	const [userData, setUserData] = useState()

	useEffect(() => {
		getUser().then((user) => {
			if (user && user.uid) {
				setUserUID(user.uid);
				getUserInfo(user.uid).then((dadocument) => {
					setUserData(dadocument.data())
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
	}, [setUserUID, setHouse, router, id])



	return (
			<>
			<Head>
				<title>House | Roomss</title>
			</Head>
			<div className="text-white">
				{house && house.data.banner ? (
					<div className={`fixed top-0 left-0 w-screen h-screen overflow-hidden animate-fadein -z-30 blur-md bg-cover bg-center`} >
					<img src={house.data.banner} className="w-full"/>
					</div>
				) : ''}

				<UserDropdown data={userData} uid={userUID} />
				<div className="flex">
					<div className="w-3/12 space-y-2 bg-dark-darker bg-opacity-25 h-screen overflow-auto" >
						<RoomGrid data={userData} uid={userUID} houseID={id} />
					</div>
					<div className="w-9/12 bg-dark-darker bg-opacity-50 h-screen">
						<RoomViewer isEmpty={true} />
					</div>
				</div>
			</div>

		</>
	)
}

export default RoomPage