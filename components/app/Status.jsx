import Button from "../Button"
import EmojiPicker from '../utility/EmojiPickerClicker'
import { Dialog, Transition, Popover, Menu } from '@headlessui/react'
import { useState, Fragment, useRef } from 'react'
import { updateUserInfo, getUserInfo } from '../../firebase/main'
import Loader from '../utility/Loader'
import ModalBackground from '../utility/ModalBackground'
import ModalTransitionAsChild from '../transitions/childs/ModalTransitionAsChild'
import Emoji from '../utility/Emoji'
import QuickStatusEditor from './QuickStatusEditor'
import Icons from "../utility/Icons"

const Status = ({ show, onClose, uid, normalClose }) => {
	const [selectedEmoji, setSelectedEmoji] = useState();
	const [showQuickStatusModal, setShowQuickStatusModal] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [theQuickStatuses, setTheQuickStatuses] = useState([])
	const [statusText, setStatusText] = useState("")
	const statusEmojiClick = useRef(null);
	const [preferredSkinTone, setPreferredSkinTone] = useState("")

	function onClick(emojiData, event) {
		setSelectedEmoji(emojiData.id);
		setPreferredSkinTone(emojiData.skin)
	};

	const fakeTHing = () => {
		console.log('yo')
	}


	var quickStatuses = [];
	if (uid != 'loading') {
		if (getUserInfo) {
			getUserInfo(uid).then((doc) => {
				if (doc.data().quickStatuses) {
					for (var i = 0; i < doc.data().quickStatuses.length; i++) {
						var id = doc.data().quickStatuses[i].id
						var text = doc.data().quickStatuses[i].text

						quickStatuses.push({ id: id, text: text })
					}
				} else {

				}
				if (quickStatuses.length === 0) {
					setTheQuickStatuses(null)
				} else {
					setTheQuickStatuses(quickStatuses)
				}
			})

		}
	}

	const close = (e) => {
		setIsLoading(true)
		var data = {
			statusEmoji: selectedEmoji || null,
			statusText: statusText || null,
			preferredSkinTone: preferredSkinTone || null
		}
		if (updateUserInfo) {
			updateUserInfo(uid, data).then(() => {
				onClose();
				setTimeout(() => {
					setIsLoading(false)
				}, 500);
			})
		}
	}


	const clearStatus = () => {
		setSelectedEmoji();
		setStatusText("");
	}

	return (
		<>
			<Transition appear show={show} as={Fragment}>
				<Dialog as="div" unmount={true} className="relative z-[100]" onClose={onClose}>
					<ModalBackground />

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<ModalTransitionAsChild className="w-full max-w-2xl">
								<Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-lg bg-dark-lightest p-6 text-left align-middle text-white transition-all">
									<Dialog.Title
										as="h3"
										className="text-xl font-medium"
									>
										Set status
									</Dialog.Title>
									<div className="mt-2">
										<div>

											<div className="items-center flex py-6 space-x-1">
												<span className="cursor-pointer text-lg p-3 bg-dark rounded-md group duration-75 ease-out transition-all hover:scale-110" ref={statusEmojiClick}>
													<span className={`${selectedEmoji ? 'grayscale-0' : 'grayscale'} w-full h-full group-hover:grayscale-0 hover:grayscale-0`}>
														<Emoji randomEmoji={selectedEmoji ? false : true} id={selectedEmoji ? selectedEmoji : null} size="22"></Emoji>
													</span>
												</span>
												<EmojiPicker selectedEmoji={selectedEmoji} onTheEmojiClick={onClick} eleHeight={-65} instance={statusEmojiClick} />
												<input type="text" value={statusText} onChange={(event) => { setStatusText(event.target.value) }} className="text-base space-x-none w-full rounded-md block border-none focus:outline-none p-3.5 bg-dark" placeholder="How you doin' ?" />
												<button onClick={clearStatus} className="group bg-dark p-3.5 rounded-md">
													<Icons icon="cross" className="group-hover:opacity-100 opacity-75 hover:opacity-100 w-4 h-4" />
												</button>
											</div>
											<div className="max-h-[40vh] py-4 m-1 overflow-auto">
												{theQuickStatuses ? (
													<>
														{
															theQuickStatuses.map((status, index) => (
																<button key={JSON.stringify(status)} onClick={(e) => { setSelectedEmoji(status.id); setStatusText(status.text) }} type="button" className="h-10 opacity-75 hover:opacity-100 ring-1 ring-white ring-opacity-5 bg-dark rounded-md text-sm px-5 py-2.5 text-center mr-2 mt-1.5 inline-flex items-center">
																	{status.id && <Emoji id={status.id} size="16" />}
																	{status.text && <span className={`truncate ${status.id && "ml-3"} h-5`}>{status.text}</span>}
																	
																</button>
															))
														}
														<button type="button" className="h-10 opacity-75 hover:opacity-100 ring-1 ring-white ring-opacity-5 bg-dark rounded-md text-sm px-5 py-2.5 text-center mr-2 mt-1.5 inline-flex items-center" onClick={() => { normalClose(); setShowQuickStatusModal(true) }}>
															<Emoji id="heavy_plus_sign" size="16" />
														</button>
													</>
												) : (
													<div className="text-sm text-center p-2 text-gray-400">
														No Quick Statuses set. <span className="cursor-pointer font-medium underline hover:no-underline" onClick={() => { normalClose(); setShowQuickStatusModal(true) }}>Add some</span>?
													</div>
												)}

											</div>
										</div>

									</div>

									<div className="text-sm mt-4">
										{isLoading ? (
											<Button istext="true">
												<Loader className="h-5 w-5" />
											</Button>
										) : (
											<Button onClick={close} istext="true">
												Save
											</Button>
										)}
									</div>
								</Dialog.Panel>
							</ModalTransitionAsChild>
						</div>
					</div>
				</Dialog>
			</Transition>
			<QuickStatusEditor show={showQuickStatusModal} uid={uid} onClose={() => setShowQuickStatusModal(false)} />
		</>
	)

}


export default Status