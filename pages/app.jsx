import Head from "next/head";
import HouseGrid from "../components/app/HouseGrid";
import UserDropdown from "../components/app/UserDropdown";
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react';
import { app, getUser, getUserInfo } from "../firebase/main";

const App = () => {
	const [userUID, setUserUID] = useState();
	const router = useRouter()
	const [name, setName] = useState('')
	const [userData, setUserData] = useState({})
	const [timeOfDay, setTimeOfDay] = useState("a mysterious time");
	
	useEffect(() => {
		var date = new Date();
		var hours = date.getHours();

		if (hours < 12) {
			setTimeOfDay("morning");
		} else if (hours < 18) {
			setTimeOfDay("afternoon");
		} else {
			setTimeOfDay("evening");
		}

	}, [setTimeOfDay])

	if (app) {
		getUser().then((user) => {
			if (user) {
				setUserUID(user.uid);
					getUserInfo(user.uid).then(async (dadocument) => {
						setUserData(dadocument.data())
						setName(dadocument.data().name)
					});
				

			} else {
				router.push('/login', undefined, { shallow: true })
			}

		});
	}



	return (
		<>
			<Head>
				<title>Roomss</title>
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
				{name ?
					(
						<div className="select-none text-2xl mt-10 space-y-2 ml-6 p-2 font-semibold max-w-[83.333333%] w-3/6">Good {timeOfDay},
							<div className="text-7xl mt-4 font-bold">
								{name}
							</div>
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
				<HouseGrid uid={userUID} />
			</div>
		</>
	)
}

export default App