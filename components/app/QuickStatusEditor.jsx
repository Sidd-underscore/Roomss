import Button from "../Button"
import EmojiPicker from '../utility/EmojiPickerClicker'
import { Dialog, Transition, Popover, Menu } from '@headlessui/react'
import { useState, Fragment, useRef } from 'react'
import Loader from '../utility/Loader'
import ModalBackground from '../utility/ModalBackground'
import ModalTransitionAsChild from '../transitions/childs/ModalTransitionAsChild'
import Emoji from '../utility/Emoji'
import { getUserInfo, updateUserInfo } from "../../firebase/main"
import Icons from "../utility/Icons"
import { arrayUnion } from "@firebase/firestore"

const QuickStatusEditor = ({ show, onClose, uid }) => {
	const [quickStatusSelectedEmoji, setQuickStatusSelectedEmoji] = useState();
	const [quickStatusTextError, setQuickStatusTextError] = useState()
	const [isLoading, setIsLoading] = useState(false);
	const [quickStatusText, setQuickStatusText] = useState("")
	const [theQuickStatuses, setTheQuickStatuses] = useState([])
	const quickStatusEmojiClick = useRef(null);
	const [quickStatusIsLoading, setQuickStatusIsLoading] = useState(false)
	const [preferredSkinTone, setPreferredSkinTone] = useState("")
	const quickStatusInput = useRef(null)
	const [sampleQuickStatuses, setSampleQuickStatuses] = useState([]);
	const [hideSuggestedIcon, setHideSuggestedIcon] = useState(<Icons className="cursor-pointer opacity-75 hover:opacity-100 absolute right-0 top-0" icon="cross" />)
	const [removeQuickStatuses, setRemoveQuickStatuses] = useState(false)

	const hideSuggested = (e) => {

		updateUserInfo(uid, { hideSuggestedQuickStatuses: true }).then(() => {
			setHideSuggestedIcon(<Loader className="w-5 h-5 absolute right-0 top-0" />);
			setRemoveQuickStatuses(true)
		})
	}

	function quickStatusOnClick(emojiData, event) {
		setQuickStatusSelectedEmoji(emojiData.id);
		setPreferredSkinTone(emojiData.skin)
		setQuickStatusTextError(null)
	};

	const fakeTHing = () => {
		console.log('yo')
	}

	var quickStatuses = [];
	if (uid != 'loading') {
		if (getUserInfo) {
			getUserInfo(uid).then((doc) => {

				var theSampleQuickStatuses = [
					{ id: 'nauseated_face', text: 'Sick' },
					{ id: 'palm_tree', text: 'Vacationing' },
					{ id: 'video_game', text: 'Gaming' },
					{ id: 'window', text: 'Upgrading to Windows Vista...' },
				]

				setSampleQuickStatuses(theSampleQuickStatuses)
				if (doc.data().quickStatuses) {
					for (var i = 0; i < doc.data().quickStatuses.length; i++) {
						var id = doc.data().quickStatuses[i].id
						var text = doc.data().quickStatuses[i].text

						quickStatuses.push({ id: id, text: text })

						// feelin' lazy while making this, sorry for 🍝 code
						if (id === 'nauseated_face' && text === 'Sick') {
							theSampleQuickStatuses = theSampleQuickStatuses.filter(x => x.id != 'nauseated_face');
						} else if (id === 'palm_tree' && text === 'Vacationing') {
							theSampleQuickStatuses = theSampleQuickStatuses.filter(x => x.id != 'palm_tree');
						} else if (id === 'video_game' && text === 'Gaming') {
							theSampleQuickStatuses = theSampleQuickStatuses.filter(x => x.id != 'video_game');
						} else if (id === 'window' && text === 'Upgrading to Windows Vista...') {
							theSampleQuickStatuses = theSampleQuickStatuses.filter(x => x.id != 'window');
						}
						setSampleQuickStatuses(theSampleQuickStatuses)
						if (theSampleQuickStatuses.length === 0) {
							setSampleQuickStatuses(null)
						}
					}
				} else {

				}
				setTheQuickStatuses(quickStatuses)
				if (doc.data().hideSuggestedQuickStatuses && doc.data().hideSuggestedQuickStatuses === true) {
					setSampleQuickStatuses(null)
				}
			})

		}
	}

	function addStatus() {
		if (!quickStatusText && !quickStatusSelectedEmoji) {
			setQuickStatusTextError('A status emoji or text is required')

		} else {
			setQuickStatusIsLoading(true)

			var data = {
				quickStatuses: [...theQuickStatuses, { id: quickStatusSelectedEmoji || null, text: quickStatusText || null }],
			}
			updateUserInfo(uid, data).then((docRef) => {
				setQuickStatusIsLoading(false)
			});
			setQuickStatusText("")
			setQuickStatusSelectedEmoji()
			setTheQuickStatuses(quickStatuses)
		}
	}

	function removeStatus(index, e) {
		e.stopPropagation()
		setQuickStatusIsLoading(true)
		var data = {
			quickStatuses: theQuickStatuses
		}
		updateUserInfo(uid, data).then(() => {
			setQuickStatusIsLoading(false)
		});
	}

	function addQuickStatus(text, id) {
		setQuickStatusIsLoading(true)

		var data = {
			quickStatuses: [...theQuickStatuses, { id: id, text: text }],
		}
		updateUserInfo(uid, data).then((docRef) => {
			setQuickStatusIsLoading(false)
		});
		setQuickStatusText("")
		setQuickStatusSelectedEmoji()
		setTheQuickStatuses(quickStatuses)
	}

	const close = (e) => {
		setIsLoading(true)
		setTimeout(() => setIsLoading(false), 750)
		onClose();
	}

	const clearStatus = () => {
		setQuickStatusSelectedEmoji();
		setQuickStatusText("");
	}

	return (
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
									Manage Quick Statuses
								</Dialog.Title>
								<div className="mt-2">
									<div>
										<div className="items-center flex py-6 space-x-1">
											<span className={`${quickStatusTextError ? "border-red border-2 p-2" : "p-3"} cursor-pointer text-lg bg-dark rounded-md group duration-75 ease-out transition-all hover:scale-110`} ref={quickStatusEmojiClick}>
												<span className={`${quickStatusSelectedEmoji ? 'grayscale-0' : 'grayscale'} w-full h-full group-hover:grayscale-0 hover:grayscale-0`}>
													<Emoji randomEmoji={quickStatusSelectedEmoji ? false : true} id={quickStatusSelectedEmoji ? quickStatusSelectedEmoji : null} size="22"></Emoji>
												</span>
											</span>
											<EmojiPicker selectedEmoji={quickStatusSelectedEmoji} onTheEmojiClick={quickStatusOnClick} eleHeight={-65} instance={quickStatusEmojiClick} />
											<input ref={quickStatusInput} type="text" value={quickStatusText} onChange={(event) => { setQuickStatusText(event.target.value); setQuickStatusTextError() }} className={`text-base space-x-none w-full rounded-md block bg-dark ${quickStatusTextError ? "border-2 border-red placeholder:text-red focus:outline-none p-2.5" : " border-none focus:outline-none p-3.5"}`} placeholder={quickStatusTextError ? quickStatusTextError : "How you doin' ?"} />
											<button onClick={clearStatus} className="group bg-dark p-3.5 rounded-md">
												<Icons icon="cross" className="group-hover:opacity-100 opacity-75 hover:opacity-100 w-4 h-4" />
											</button>
											<button onClick={addStatus} className="bg-dark p-3.5 rounded-md">
												<Icons icon="check" className="w-5 h-5" />
											</button>
										</div>
										{quickStatusIsLoading ? (
											<>
												<button type="button" className="h-10 opacity-75 ring-1 animate-pulse ring-white ring-opacity-5 bg-dark cursor-default rounded-md text-sm px-5 py-2.5 text-center mr-2 mt-1.5 inline-flex items-center">
													<Emoji randomEmoji={true} className="opacity-75 mr-3 grayscale animate-pulse" size="16" />
													<span className="rounded-md text-transparent w-16 bg-dark-lighter">Loading...</span>
													<span>
														<Icons icon="cross" className="opacity-75 animate-pulse ml-4 w-3.5 h-3.5" />
													</span>
												</button>
												<button type="button" className="h-10 opacity-75 ring-1 animate-pulse ring-white ring-opacity-5 bg-dark cursor-default rounded-md text-sm px-5 py-2.5 text-center mr-2 mt-1.5 inline-flex items-center">
													<Emoji randomEmoji={true} className="opacity-75 mr-3 grayscale animate-pulse" size="16" />
													<span className="rounded-md text-transparent w-48 bg-dark-lighter">Loading...</span>
													<span>
														<Icons icon="cross" className="opacity-75 animate-pulse ml-4 w-3.5 h-3.5" />
													</span>
												</button>
												<button type="button" className="h-10 opacity-75 ring-1 animate-pulse ring-white ring-opacity-5 bg-dark cursor-default rounded-md text-sm px-5 py-2.5 text-center mr-2 mt-1.5 inline-flex items-center">
													<Emoji randomEmoji={true} className="opacity-75 mr-3 grayscale animate-pulse" size="16" />
													<span className="rounded-md text-transparent w-32 bg-dark-lighter">Loading...</span>
													<span>
														<Icons icon="cross" className="opacity-75 animate-pulse ml-4 w-3.5 h-3.5" />
													</span>
												</button>
											</>
										) : (
											<>
												<div className="max-h-[40vh] h-auto m-1 py-4 overflow-auto">
													<>
														{
															theQuickStatuses.map((status, index) => (
																<button key={JSON.stringify(status)} onClick={(e) => { setQuickStatusSelectedEmoji(status.id); setQuickStatusText(status.text); setQuickStatusTextError() }} type="button" className="h-10 opacity-75 hover:opacity-100 ring-1 ring-white ring-opacity-5 bg-dark rounded-md text-sm px-5 py-2.5 text-center mr-2 mt-1.5 inline-flex items-center">
																	{status.id && <Emoji id={status.id} size="16" />}
																	{status.text && <span className={`truncate ${status.id && "ml-3"} h-5`}>{status.text}</span>}
																	<span onClick={(e) => removeStatus(index, e)}>
																		<Icons icon="cross" className="opacity-75 hover:opacity-100 ml-4 w-3.5 h-3.5" />
																	</span>
																</button>
															))
														}
													</>
												</div>
												{removeQuickStatuses ? null : (
													<div>
														{sampleQuickStatuses ? (

															<div className="bg-primary-low-opacity/25 p-4 mt-2 border-2 border-primary rounded-md">
																<div onClick={hideSuggested} className="relative">
																	{hideSuggestedIcon}
																</div>
																<div className="text-md font-medium mb-2">Suggested</div>

																<div>
																	{
																		sampleQuickStatuses.map((status, index) => (
																			<button key={JSON.stringify(status)} onClick={(e) => { addQuickStatus(status.text, status.id) }} type="button" className="group h-10 opacity-75 hover:opacity-100 ring-1 ring-white ring-opacity-5 bg-dark rounded-md text-sm px-5 py-2.5 text-center mr-2 mt-1.5 inline-flex items-center">
																				<Emoji id={status.id} className="mr-3" size="16" />
																				{status.text}

																				<Icons className="opacity-75 group-hover:opacity-100 ml-4 w-4 h-4" icon="plus" />
																			</button>
																		))
																	}
																</div>

															</div>
														) : null}
													</div>
												)}
											</>
										)}

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
	)

}


export default QuickStatusEditor