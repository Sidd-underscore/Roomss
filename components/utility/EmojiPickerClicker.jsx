import React, { useState, useEffect, Fragment, FC } from 'react'
import { Dialog, Transition } from '@headlessui/react';
import data from '@emoji-mart/data/sets/14/twitter.json'
import Picker from '@emoji-mart/react'
import MainTransition from '../transitions/MainTransition'
import { init } from 'emoji-mart'

init({ data })

const EmojiPicker = ({ eleHeight, onTheEmojiClick, selectedEmoji, instance }) => {
	const [showPicker, setShowPicker] = useState(false)
	const [dialogStyles, setDialogStyles] = useState({});

	let mousePos;
	useEffect(() => {
		const handleMouseClick = () => {
			var rect = instance.current.getBoundingClientRect();
			var height = rect.y - eleHeight
			var windowHeight = window.innerHeight || 0;

			mousePos = { x: rect.x, y: height, maxY: windowHeight };

			if (mousePos.maxY - mousePos.y - 10 < 450) {
				var height = mousePos.maxY - mousePos.y - 10
				setDialogStyles({ left: `${mousePos.x}px`, top: `${mousePos.y}px`, height: `${height}px` })

			} else {
				setDialogStyles({ left: `${mousePos.x}px`, top: `${mousePos.y}px`, height: 450 })
			}

			setShowPicker(true)
		};

		instance.current.addEventListener('click', handleMouseClick);

	}, []);

	const customCategoryIcons = {
		frequent: {
			svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13.5,8H12V13L16.28,15.54L17,14.33L13.5,12.25V8M13,3A9,9 0 0,0 4,12H1L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3" /></svg>'
		},
		nature: {
			svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4.5,11A1.5,1.5 0 0,0 6,9.5A1.5,1.5 0 0,0 4.5,8A1.5,1.5 0 0,0 3,9.5A1.5,1.5 0 0,0 4.5,11M22.17,9.17C22.17,5.3 19.04,2.17 15.17,2.17A7,7 0 0,0 8.17,9.17C8.17,12.64 10.69,15.5 14,16.06V20H6V17H7V13A1,1 0 0,0 6,12H3A1,1 0 0,0 2,13V17H3V22H19V20H16V16.12C19.47,15.71 22.17,12.76 22.17,9.17Z" /></svg>'
		},
		foods: {
			svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4,19H20V21H4V19M20,8V5H18V8H20M20,3C20.6,3 21,3.2 21.4,3.6C21.8,4 22,4.5 22,5V8C22,8.6 21.8,9 21.4,9.4C21,9.8 20.6,10 20,10H18V13C18,14.1 17.6,15 16.8,15.8C16,16.6 15.1,17 14,17H8C6.9,17 6,16.6 5.2,15.8C4.4,15 4,14.1 4,13V3H9V5.4L7.2,6.8C7.1,6.9 7,7.1 7,7.2V11.5C7,11.8 7.2,12 7.5,12H11.5C11.8,12 12,11.8 12,11.5V7.2C12,7 11.9,6.9 11.8,6.8L10,5.4V3H20Z" /></svg>'	
		},
		activity: {
			svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2.34,14.63C2.94,14.41 3.56,14.3 4.22,14.3C5.56,14.3 6.73,14.72 7.73,15.56L4.59,18.7C3.53,17.5 2.78,16.13 2.34,14.63M15.56,9.8C17.53,11.27 19.66,11.63 21.94,10.88C21.97,11.09 22,11.47 22,12C22,13.03 21.75,14.18 21.28,15.45C20.81,16.71 20.23,17.73 19.55,18.5L13.22,12.19L15.56,9.8M8.77,16.64C9.83,18.17 10.05,19.84 9.42,21.66C8,21.25 6.73,20.61 5.67,19.73L8.77,16.64M12.19,13.22L18.5,19.55C16.33,21.45 13.78,22.25 10.88,21.94C11.09,21.28 11.2,20.56 11.2,19.78C11.2,19.16 11.06,18.43 10.78,17.6C10.5,16.77 10.17,16.09 9.8,15.56L12.19,13.22M8.81,14.5C7.88,13.67 6.8,13.15 5.58,12.91C4.36,12.68 3.19,12.75 2.06,13.13C2.03,12.91 2,12.53 2,12C2,10.97 2.25,9.82 2.72,8.55C3.19,7.29 3.77,6.27 4.45,5.5L11.11,12.19L8.81,14.5M15.56,7.73C14.22,6.08 13.91,4.28 14.63,2.34C15.25,2.5 15.96,2.8 16.76,3.26C17.55,3.71 18.2,4.16 18.7,4.59L15.56,7.73M21.66,9.38C21.06,9.59 20.44,9.7 19.78,9.7C18.69,9.7 17.64,9.38 16.64,8.72L19.73,5.67C20.61,6.77 21.25,8 21.66,9.38M12.19,11.11L5.5,4.45C7.67,2.55 10.22,1.75 13.13,2.06C12.91,2.72 12.8,3.44 12.8,4.22C12.8,4.94 12.96,5.75 13.29,6.66C13.62,7.56 14,8.28 14.5,8.81L12.19,11.11Z" /></svg>'
		},
		people: {
			svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2M8.88,7.82L11,9.94L9.94,11L8.88,9.94L7.82,11L6.76,9.94L8.88,7.82M12,17.5C9.67,17.5 7.69,16.04 6.89,14H17.11C16.31,16.04 14.33,17.5 12,17.5M16.18,11L15.12,9.94L14.06,11L13,9.94L15.12,7.82L17.24,9.94L16.18,11Z" /></svg>'
		},
		flags: {
			svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14.4,6L14,4H5V21H7V14H12.6L13,16H20V6H14.4Z" /></svg>'
		},
		objects: {
			svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4,6H20V16H4M20,18A2,2 0 0,0 22,16V6C22,4.89 21.1,4 20,4H4C2.89,4 2,4.89 2,6V16A2,2 0 0,0 4,18H0V20H24V18H20Z" /></svg>'
		},
		places: {
			svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19,15H17V13H19M19,19H17V17H19M13,7H11V5H13M13,11H11V9H13M13,15H11V13H13M13,19H11V17H13M7,11H5V9H7M7,15H5V13H7M7,19H5V17H7M15,11V5L12,2L9,5V7H3V21H21V11H15Z" /></svg>'
		},
		symbols: {
			svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2 7V14H4V7H2M6 7V9H10V11H8V14H10V13C11.11 13 12 12.11 12 11V9C12 7.89 11.11 7 10 7H6M15.8 7L15.6 9H14V11H15.4L15.2 13H14V15H15L14.8 17H16.8L17 15H18.4L18.2 17H20.2L20.4 15H22V13H20.6L20.8 11H22V9H21L21.2 7H19.2L19 9H17.6L17.8 7H15.8M17.4 11H18.8L18.6 13H17.2L17.4 11M2 15V17H4V15H2M8 15V17H10V15H8Z" /></svg>'
		}

	}

	return (
		<div>

			<MainTransition
				show={showPicker}
				as={Fragment}
			>
				<Dialog style={dialogStyles} className="rounded-lg fixed z-[500] overflow-auto" onClose={() => setShowPicker(false)} unmount={true}>
					<Picker categoryIcons={customCategoryIcons} data={data} icons="solid" emojiButtonColors={['rgb(29, 38, 53)']} emojiSize={20} autoFocus={true} skinTonePosition="search" previewEmoji=":grinning:" set="twitter" onEmojiSelect={onTheEmojiClick} />
				</Dialog>

			</MainTransition>

		</div>
	)
}

export default EmojiPicker