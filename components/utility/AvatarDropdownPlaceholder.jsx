import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Image from 'next/image'
import { app, getUser, getUserInfo } from '../../firebase/main';

const AvatarDropdownPlaceholder = () => {
	const router = useRouter()
	const [userData, setUserData] = useState();
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (app) {
			getUser().then((user) => {
				if (user) {
						getUserInfo(user.uid).then((dadocument) => {
							setUserData(dadocument.data())
							setLoading(false)
						});
				} else {
					router.push('/login', undefined, { shallow: true })
				}

			});
		}

}, [setUserData, router, setLoading]);

return (
	<div className="flex space-x-2">

		{userData && loading === false ? (

			<>
				<Image
					alt="Your beautiful avatar"
					src={userData && userData.avatar ? userData.avatar : '/img/avatar-placeholder.svg'}
					width={52}
					height={52}
					priority
					className={`${loading ? 'animate-pulse' : 'animate-none'} bg-dark-darker rounded-full`}
				/>
				<div className="hidden md:block md:space-y-2 text-left font-medium hidden md:block">
					<div className="w-24 truncate text-lg" title={userData.name}>
						{userData.name}
					</div>
					<div className="w-32 truncate text-sm text-gray-400" title={userData.email}>
						{userData.email}
					</div>
				</div>
			</>
		) : (
			<>
				<Image
					alt="Your avatar is loading"
					src='/img/avatar-placeholder.svg'
					width={52}
					height={52}
					priority
					className='animate-pulse bg-dark-darker rounded-full'
				/>
				<div className="hidden md:block space-y-2 text-left hidden md:block">
					<div className="w-24 truncate rounded-md animate-pulse h-6 bg-dark-lightest">
					</div>
					<div className="w-32 h-4 truncate rounded-md animate-pulse text-sm text-gray-400 bg-dark-lightest">
					</div>
				</div>
			</>
		)}
	</div>
)
}

export default AvatarDropdownPlaceholder