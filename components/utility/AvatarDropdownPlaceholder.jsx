import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Image from 'next/image'
import { app, db, getUserInfo } from '../../firebase/main';

const AvatarDropdownPlaceholder = ({ uid }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [avatar, setAvatar] = useState('/img/avatar-placeholder.svg');
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (uid != 'loading') {
			getUserInfo(uid).then((dadocument) => {
				setLoading(false)
				setName(dadocument.data()?.name)
				setEmail(dadocument.data()?.email)
				setAvatar(dadocument.data()?.avatar)
			});
		}
	});
	return (
		<div className="flex space-x-2">
			<Image
				alt="Your avatar is loading"
				src={avatar}
				width={52}
				height={52}
				priority
				className="bg-dark-darker rounded-full"
			/>
			{loading ? (
				<div className="hidden md:block space-y-2 text-left hidden md:block">
					<div className="w-24 truncate rounded-md animate-pulse h-6 bg-dark-lightest">
					</div>
					<div className="w-32 h-4 truncate rounded-md animate-pulse text-sm text-gray-400 bg-dark-lightest">
					</div>
				</div>
			) : (
				<div className="hidden md:block md:space-y-2 text-left font-medium hidden md:block">
					<div className="w-24 truncate text-lg" title={name}>
						{name}
					</div>
					<div className="w-32 truncate text-sm text-gray-400" title={email}>
						{email}
					</div>
				</div>
			)}
		</div>
	)
}

export default AvatarDropdownPlaceholder