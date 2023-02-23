import { useEffect, useState, useRef } from 'react';
import { getDocsWithQuery } from '../../../firebase/main'
import Icons from '../../utility/Icons';
import Message from './Message';

const ChatRoom = ({ uid, roomID }) => {
	let messages;
	if (getDocsWithQuery) {
		getDocsWithQuery({ query: `roomss/${roomID}/messages`, orderBy: "createdAt", sort: "desc", limit: 100 }).then((msgs) => {
			messages = msgs
		})
	}

	const [newMessage, setNewMessage] = useState('');

	const inputRef = useRef();
	const bottomListRef = useRef();

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, [inputRef]);

	const handleOnChange = e => {
		setNewMessage(e.target.value);
	};

	const handleOnSubmit = e => {
		e.preventDefault();

		const trimmedMessage = newMessage.trim();
		if (trimmedMessage) {
			// Add new message in Firestore
			messagesRef.add({
				text: trimmedMessage,
				createdAt: firebase.firestore.FieldValue.serverTimestamp(),
				uid,
			});
			// Clear input field
			setNewMessage('');
			// Scroll down to the bottom of the list
			bottomListRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<div className="flex flex-col h-full">
			<div className="overflow-auto h-full">
				<div className="py-4 max-w-screen-lg mx-auto">
					<div className="py-8 mb-4">
						<div className="font-bold text-3xl text-center">
							<p className="mb-1">Welcome to</p>
							<p className="mb-3">this room</p>
						</div>
						<p className="text-gray-300 text-center">
							This is the beginning of this chat.
						</p>
					</div>
					<hr className="border-none m-2 h-0.5 bg-gray-300 rounded-full"/>
					<ul>
						{messages ? messages.map(message => (
							<li key={message.id}>
								<Message {...message} />
							</li>
						)) : (
							null
						)}
					</ul>
					<div ref={bottomListRef} />
				</div>
			</div>
			<div className="mb-6 mx-4">
				<form
					onSubmit={handleOnSubmit}
					className="flex flex-row bg-white bg-opacity-10 rounded-md px-4 py-3 z-10 max-w-screen mx-auto shadow-md"
				>
					<input
						ref={inputRef}
						type="text"
						value={newMessage}
						onChange={handleOnChange}
						placeholder="Type your message here..."
						className="flex-1 bg-transparent outline-none"
					/>
					<button
						type="submit"
						disabled={!newMessage}
						className={`uppercase ${!newMessage ? "pointer-events-none hidden": "text-gray-400"} font-semibold text-sm tracking-wider hover:text-gray-900 dark:hover:text-white transition-colors`}
					>
						<Icons icon="paper-airplane" className="w-6 h-6"/>
					</button>
				</form>
			</div>
		</div>
	);
};

export default ChatRoom;