import { useState, useEffect } from 'react'
import ChatRoom from '../chat/Room'

const RoomViewer = ({ isEmpty, roomID, userData, uid }) => {
	
	const [theTextThing, setTheTextThing] = useState({ emoji: '', title: '' })
	const [hasChosenTheFirstTextThing, setHasChosenTheFirstTextThing] = useState(false)
	useEffect(() => {
		const textThings = [
		{ emoji: '🌱', title: 'Tend to your Roomss', description: 'Make sure to keep tabs on all your Roomss to remain up-to-date on everything' },
		{ emoji: '🪄', title: 'What magic will you create today?' },
		{ emoji: '🏠', title: 'Home is where the heart is', description: 'Which house do you call home?' },
		{ emoji: '🦄', title: 'The unicorn...', description: '...is a legendary creature that has been described since antiquity as a beast with a single large, pointed, spiraling horn projecting from its forehead.' },
	]
		if (hasChosenTheFirstTextThing === false) {
			setTheTextThing(textThings[Math.floor(Math.random() * textThings.length)])
			setHasChosenTheFirstTextThing(true)
		}

	}, [hasChosenTheFirstTextThing])
	return (
		<div className="flex flex-col h-screen max-h-full flex-1">
			{isEmpty && isEmpty === true ? (
				<div className="flex justify-center h-screen text-center items-center">
					<div className="w-2/5">
						<div className="text-9xl select-none cursor-default">
							{theTextThing.emoji}
						</div>
						<div className="text-2xl mt-8 font-bold">
							{theTextThing.title}
						</div>
						{theTextThing.description && (
							<p className="text-md mt-4">
								{theTextThing.description}
							</p>
						)}
					</div>
				</div>
			) : (
				<>
					<ChatRoom roomID={roomID} uid={uid} />
				</>
			)}
		</div>
	)
}

export default RoomViewer;