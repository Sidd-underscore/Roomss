import { useRouter } from 'next/router'
import Head from "next/head";
import { useState, useEffect, useRef, useCallback } from 'react';
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
	const sidebarRef = useRef(null);
	const [isResizing, setIsResizing] = useState(false);
	const [sidebarWidth, setSidebarWidth] = useState();
	const [hasLocalStoraged, setHasLocalStoraged] = useState(false)

	const startResizing = useCallback((mouseDownEvent) => {
		setIsResizing(true);
	}, []);

	const stopResizing = useCallback(() => {
		setIsResizing(false);
	}, []);

	const resize = useCallback(
		(mouseMoveEvent) => {
			if (isResizing) {
				setSidebarWidth(
					mouseMoveEvent.clientX -
					sidebarRef.current.getBoundingClientRect().left
				);
				if (localStorage) localStorage.setItem('HouseBarSize', mouseMoveEvent.clientX - sidebarRef.current.getBoundingClientRect().left)
			}
		},
		[isResizing]
	);

	useEffect(() => {
		window.addEventListener("mousemove", resize);
		window.addEventListener("mouseup", stopResizing);
		return () => {
			window.removeEventListener("mousemove", resize);
			window.removeEventListener("mouseup", stopResizing);
		};
	}, [resize, stopResizing]);

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

	useEffect(() => {
		if (localStorage.getItem('HouseBarSize') && hasLocalStoraged != true) {
			setHasLocalStoraged(true)
			setSidebarWidth(localStorage.getItem('HouseBarSize'))

		} else {
			setSidebarWidth(300)
		}
	}, [setHasLocalStoraged, hasLocalStoraged, setSidebarWidth])


	return (
		<>
			<Head>
				<title>Room | Roomss</title>
			</Head>
			<div className="text-white">
				{house && house.data.banner ? (
					<div className={`fixed top-0 left-0 w-screen h-screen overflow-hidden -z-30 blur-md bg-cover bg-center`} >
						<ReactImageFadeIn duration={1000} src={house.data.banner} className={`w-full object-cover -z-30 h-full`} />
					</div>
				) : ''}

				<UserDropdown data={userData} uid={userUID} />
				<div className="flex">

					<div
						ref={sidebarRef}
						className="w-3/12 min-w-[300px] max-w-[450px] relative bg-dark-darker bg-opacity-50 h-screen flex-grow-0 flex-shrink-0 flex flex-row z-30"
						style={{ width: sidebarWidth }}
						onMouseDown={(e) => e.preventDefault()}
					>
						<RoomGrid data={userData} uid={userUID} houseID={id} />
						<div
							tabIndex="1"
							className={`user-select-none grow-0 shrink-0 h-4 bg-white relative ${isResizing ? 'top-0 h-full' : 'top-[50%] rounded-full'} transition-all duration-300 bg-opacity-50 justify-self-[flex-end] cursor-col-resize resize-horizontal w-[4px]`}
							onMouseDown={startResizing}
							onMouseUp={stopResizing}
							onMouseMove={resize}
							onTouchStart={startResizing}
							onTouchEnd={stopResizing}
							onTouchMove={resize}
						/>					</div>

					<div className="w-full bg-dark-darker bg-opacity-40 h-screen">
						<RoomViewer isEmpty={false} userData={userData} uid={userUID} roomID={roomId} />
					</div>
				</div>
			</div>

		</>
	)
}

export default RoomPage