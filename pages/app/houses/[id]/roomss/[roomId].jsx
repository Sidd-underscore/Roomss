import { useRouter } from 'next/router'
import Head from "next/head";
import { useState, useEffect } from 'react';
import UserDropdown from "../../../../../components/app/UserDropdown";
import { app, getUser, getUserInfo, getHouseInfo } from "../../../../../firebase/main";
import RoomGrid from '../../../../../components/app/house/RoomGrid'
import RoomViewer from '../../../../../components/app/house/RoomViewer';
import ReactImageFadeIn from 'react-image-fade-in';

const RoomPage = () => {
	const router = useRouter()
	const { id, roomId } = router.query
	const [house, setHouse] = useState()
	const [userUID, setUserUID] = useState();
	const [userData, setUserData] = useState()
	const [size, setSize] = useState({ x: 10, contentsHidden: true });

	const handler = (mouseDownEvent) => {
		const startSize = size;
		const startPosition = { x: mouseDownEvent.pageX };

		function onMouseMove(mouseMoveEvent) {
			let newSize;

			newSize = startSize.x - startPosition.x + mouseMoveEvent.pageX

			if (newSize > 30) {
				setSize(currentSize => ({
					x: newSize,
					contentsHidden: false
				}));
				localStorage.setItem("HouseBarSize", JSON.stringify({ x: newSize, contentsHidden: false }));

			} else {
				setSize(currentSize => ({
					x: newSize,
					contentsHidden: true
				}));
				localStorage.setItem("HouseBarSize", JSON.stringify({ x: newSize, contentsHidden: true }));

			}



		}
		function onMouseUp() {
			document.body.removeEventListener("mousemove", onMouseMove);
			// uncomment the following line if not using `{ once: true }`
			// document.body.removeEventListener("mouseup", onMouseUp);
		}

		document.body.addEventListener("mousemove", onMouseMove);
		document.body.addEventListener("mouseup", onMouseUp, { once: true });
	};


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
		if (localStorage.getItem("HouseBarSize")) {
			setSize(JSON.parse(localStorage.getItem("HouseBarSize")))
		}
	}, [setUserUID, setHouse, router, id, setSize])




	return (
		<>
			<Head>
				<title>House | Roomss</title>
			</Head>
			<div className="text-white">
				{house && house.data.banner ? (
					<div className={`fixed top-0 left-0 w-screen h-screen overflow-hidden -z-30 blur-md bg-cover bg-center`} >


							<ReactImageFadeIn duration={1000} src={house.data.banner} className={`w-full object-cover -z-30 h-full`} />


																</div>
				) : ''}

				<UserDropdown data={userData} uid={userUID} />
				<div className="flex">

					<div style={{ width: size.x }} className="w-[10px] relative bg-dark-darker bg-opacity-50 h-screen">
						<div onMouseDown={handler} className="bg-white rounded-full h-8 w-1 cursor-col-resize absolute left-[97%] top-[50%]" />
						<RoomGrid contentsHidden={size.contentsHidden} data={userData} uid={userUID} houseID={id} />
					</div>

					<div className="w-full bg-dark-darker bg-opacity-40 h-screen">
						<RoomViewer isEmpty={false} userData={userData} uid={userUID} roomID={roomId} />
					</div>
				</div>
			</div>

		</>
	)
}

export default RoomPage