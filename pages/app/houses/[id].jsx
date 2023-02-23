import { useRouter } from 'next/router'
import Head from "next/head";
import { useState, useEffect, useRef } from 'react';
import UserDropdown from "../../../components/app/UserDropdown";
import { app, getUser, getUserInfo, getHouseInfo } from "../../../firebase/main";
import RoomGrid from '../../../components/app/house/RoomGrid'
import RoomViewer from '../../../components/app/house/RoomViewer';
import ReactImageFadeIn from 'react-image-fade-in';

const RoomPage = () => {
	const router = useRouter()
	const { id } = router.query
	const [house, setHouse] = useState()
	const [userUID, setUserUID] = useState();
	const [userData, setUserData] = useState()
	const [size, setSize] = useState({ x: 300 });
	const [isImageLoaded, setIsImageLoaded] = useState(false)

	const handleImageLoad = () => {
		setIsImageLoaded(true)
	}

	const handler = (mouseDownEvent) => {
		const startSize = size;
		const startPosition = { x: mouseDownEvent.pageX };

		function onMouseMove(mouseMoveEvent) {
			let newSize;
			if (startSize.x - startPosition.x + mouseMoveEvent.pageX < 300) {
				newSize = 300
			} else {
				newSize = startSize.x - startPosition.x + mouseMoveEvent.pageX
			}
			setSize(currentSize => ({
				x: newSize,
			}));


			localStorage.setItem("HouseBarSize", JSON.stringify({ x: newSize }));


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

					<div style={{ width: size.x }} className="w-3/12 min-w-[300px] relative bg-dark-darker bg-opacity-50 h-screen">
						<div onMouseDown={handler} className="z-10 bg-white rounded-full h-8 w-1 cursor-col-resize absolute left-[97%] top-[50%]" />
						<RoomGrid data={userData} uid={userUID} houseID={id} />
					</div>

					<div className="w-full bg-dark-darker bg-opacity-40 h-screen">
						<RoomViewer isEmpty={true} />
					</div>
				</div>
			</div>

		</>
	)
}

export default RoomPage