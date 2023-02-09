import data from '@emoji-mart/data/sets/14/twitter.json'
import { init, getEmojiDataFromNative } from 'emoji-mart'
import { useState } from 'react';
import emojis from "../../public/json/emojis.json"

init({ data })

const Emoji = ({ id, size, className, onClick, randomEmoji }) => {

	const [theRandomEmoji, setTheRandomEmoji] = useState(emojis.emojis[Math.floor(Math.random() * emojis.emojis.length)])
	return (
		<span onClick={onClick} className={className}>
			{randomEmoji === true ? (
				<em-emoji fallback=":shrug:" id={theRandomEmoji} title={':'+theRandomEmoji+':'} set="twitter" size={size}></em-emoji>
			) : (
				<em-emoji fallback=":shrug:" id={id} title={':'+id+':'} set="twitter" size={size}></em-emoji>
			)}
		</span>
	)



}

export default Emoji;