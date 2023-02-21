import { useState } from 'react';
import Image from 'next/image'

const AvatarDropdownPlaceholder = ({data}) => {

return (
	<div className="flex space-x-2">

		{data ? (

			<>
				<Image
					alt="Your beautiful avatar"
					src={data.avatar}
					width={52}
					height={52}
					priority
					className={`rounded-full`}
				/>
				<div className="hidden lg:block lg:space-y-2 text-left font-medium">
					<div className="w-24 truncate text-lg" title={data.name}>
						{data.name}
					</div>
					<div className="w-32 truncate text-sm text-gray-400" title={data.email}>
						{data.email}
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
					className='animate-pulse rounded-full'
				/>
				<div className="hidden lg:block lg:space-y-2 text-left">
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