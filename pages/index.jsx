import Head from 'next/head'
import MainButton from '../components/MainButton'
import Button from '../components/Button'
import Icons from '../components/utility/Icons'
import Image from 'next/image'
import { useState, Fragment } from 'react'
import MainTransition from '../components/transitions/MainTransition'
import { Disclosure, Listbox, Transition } from '@headlessui/react'
import Footer from '../components/Footer'

const features = [
	{
		name: 'State-of-the-art security',
		description:
			'All your data on Roomss is stored on some of the most secure databases in the world, secured by Google themselves.',
		icon: 'shield-check'
	},
	{
		name: 'Free',
		description:
			'It\'s free. Like totally free. Like totally completely free, for anyone, with no hidden fees or premium plans.',
		icon: 'currency-dollar'
	},
	{
		name: 'Technology you can trust',
		description:
			'Roomss is built with the best frameworks possible, ensuring a great user experience.',
		icon: 'code-braket'
	},
	{
		name: 'An interconnected ecosystem',
		description:
			'Roomss apps are not issolated by themselves. They intergrate with each other, so the file you uploaded to a File Share can also be accessed in a text chat of the same house.',
		icon: 'bolt'
	},
	{
		name: 'Zero restrictions',
		description:
			'Whatever Roomss offers, you can do, as many times as you want, without paying anything. Go ahead. Break free from 15 GB limits and send all the cat GIFs your heart desires.',
		icon: 'lock-open'
	},
	{
		name: 'Collaboration',
		description:
			'Whether you\'re writing a novel with a friend, designing the next big Fortune 500 company with an investor, whether you\'re having an online sleepover or chatting with Elon Musk, Roomss has got you covered.',
		icon: 'user-group'
	}
]

const otherWeirdServices = [
	{ id: 1, name: 'Google Worspace', icon: 'https://roomss.cool-sidd.repl.co/img/google-colored.png', link: "https://workspace.google.com/pricing.html", plan: 'Business Standard', unavailable: false },
	{ id: 2, name: 'Microsoft 365', icon: 'https://roomss.cool-sidd.repl.co/img/office.png', unavailable: false },
	{ id: 3, name: 'Zoom', icon: 'https://roomss.cool-sidd.repl.co/img/zoom.png', unavailable: false },
	{ id: 4, name: 'Skype', icon: 'https://roomss.cool-sidd.repl.co/img/skype.png', unavailable: true },
	{ id: 5, name: 'Discord', icon: 'https://roomss.cool-sidd.repl.co/img/discord.png', unavailable: false },
]


export default function Home() {
	const [selectedService, setSelectedService] = useState(otherWeirdServices[0])
	return (
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
			<Head>
				<title>Roomss</title>
			</Head>
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32">


				<span className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-white text-sm bg-dark-lighter rounded-full in-out duration-300 transition" role="alert">
					<div className="text-xs bg-primary rounded-full text-white px-4 py-1.5 mr-3">Under Development</div> <div className="text-sm font-medium">Coming soon 🎉</div>
				</span>
				<div className="mx-auto max-w-4xl text-5xl font-medium sm:text-7xl">
					Collaboration
					<span className="relative whitespace-nowrap text-primary">
						<svg aria-hidden="true" viewBox="0 0 418 42" className="absolute top-2/3 left-0 h-[0.58em] w-full fill-primary opacity-50" preserveAspectRatio="none">
							<path
								d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"
							></path>
						</svg>
						<span className="relative"> made free </span>
					</span>
					for everyone
				</div>
				<div className="mx-auto mt-6 max-w-2xl text-lg">
					Most collaboration softwares are free, but set restrictions. With Roomss, however, gone are the days of 15GB storage limits, 40 minute calls or any other restriction. <br />
					<br />
					We offer video chats, text chats, checklists, document editing and much more.
				</div>
				<div className="mt-10 inline-flex justify-center gap-x-6">
					<MainButton link="/login" showicon="true" isrelativelink="true"> Open Roomss </MainButton>
					<Button onClick={() => document.getElementById("roomss-is-better").scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})} isrelativelink="true"> Why Roomss? </Button>
				</div>
			</div>
			<div id="roomss-is-better" className="mx-auto max-w-7xl px-6 mt-24 mb-10 lg:px-8">
				<div className="sm:text-center">
					<h2 className="text-lg font-semibold leading-8 text-primary-low-opacity">it's true</h2>
					<div className="text-4xl font-bold tracking-tight text-primary sm:text-4xl">A better way to collaborate</div>
					<div className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white">
						{features.length} undeniable reasons Roomss is better than the service you use
					</div>
				</div>

				<div className="mt-20 max-w-lg sm:mx-auto md:max-w-none">
					<div className="grid grid-cols-1 gap-y-16 md:grid-cols-2 md:gap-x-12 md:gap-y-16">
						{features.map((feature) => (
							<div key={feature.name} className="relative flex flex-col gap-6 sm:flex-row md:flex-col lg:flex-row">
								<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-low-opacity text-white sm:shrink-0">
									<Icons icon={feature.icon} aria-hidden="true" />
								</div>
								<div className="sm:min-w-0 sm:flex-1">
									<div className="text-lg font-semibold leading-8">{feature.name}</div>
									<div className="mt-2 text-base leading-7">{feature.description}</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<div id="faq" className="mx-auto max-w-7xl px-6 mt-40 mb-10 lg:px-8">
				<div className="sm:text-center">
					<h2 className="text-lg font-semibold leading-8 text-primary-low-opacity">a good ol' Q&A</h2>
					<div className="text-4xl font-bold tracking-tight text-primary sm:text-4xl">Frequently Asked Questions</div>
					<div className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white">
						Quick answers to frequent questions to speed up your day
					</div>
				</div>
				<div className="mt-20 max-w-lg text-base space-y-6 sm:mx-auto md:max-w-none">
					<Disclosure as="div" className="mt-2">
						{({ open }) => (
							<>
								<Disclosure.Button className={`${open ? 'bg-primary' : 'bg-primary-low-opacity'} rounded-lg flex w-full justify-between px-4 py-2 text-left font-medium hover:bg-primary focus:outline-none focus-visible:ring focus-visible:ring-white focus-visible:ring-opacity-75`}>
									<span>Is it really completely free?!</span>
									<Icons
										icon="chevron-up"
										className={`${open ? 'rotate-180 transform' : ''
											} transition-all duration-300 ease-in-out`}
									/>
								</Disclosure.Button>
								<Disclosure.Panel className="bg-primary-low-opacity rounded-lg mt-2 px-4 pt-4 pb-2">
									Yup! None of our products cost even a cent.
								</Disclosure.Panel>
							</>
						)}
					</Disclosure>
					<Disclosure as="div" className="mt-2">
						{({ open }) => (
							<>
								<Disclosure.Button className={`${open ? 'bg-primary' : 'bg-primary-low-opacity'} rounded-lg flex w-full justify-between px-4 py-2 text-left font-medium hover:bg-primary focus:outline-none focus-visible:ring focus-visible:ring-white focus-visible:ring-opacity-75`}>
									<span>Do you offer technical support?</span>
									<Icons
										icon="chevron-up"
										className={`${open ? 'rotate-180 transform' : ''
											} transition-all duration-300 ease-in-out`}
									/>
								</Disclosure.Button>
								<Disclosure.Panel className="bg-primary-low-opacity rounded-lg mt-2 px-4 pt-4 pb-2">
									No.
								</Disclosure.Panel>
							</>
						)}
					</Disclosure>
				</div>
			</div>

			<div id="comparison" className="mx-auto max-w-7xl px-6 mt-40 mb-10 lg:px-8">
				<div className="sm:text-center">
					<h2 className="text-lg font-semibold leading-8 text-primary-low-opacity">proof</h2>
					<div className="text-4xl font-bold tracking-tight text-primary sm:text-4xl">Product Comparison</div>
					<div className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white">
						How does Roomss beat other companies? Below are a couple major differences between us and <em>them</em>
						<div className="mt-6 flex content-center justify-center">
							<span className="rounded-lg bg-dark-lighter p-2 py-2 pl-3 text-left shadow-md focus:outline-none sm:text-sm">
								<Image
									src="https://roomss.cool-sidd.repl.co/img/roomss.png"
									alt="Roomss logo"
									width={5000}
									height={2500}
									className='h-4 inline w-auto'
								/>
								Roomss
							</span>
							<span className="px-4">vs</span>
							<div className="inline-flex justify-end">
								<Listbox value={selectedService} onChange={setSelectedService}>
									<Listbox.Button className="relative rounded-lg bg-dark-lighter p-2 flex cursor-pointer py-2 pl-3 pr-10 text-left shadow-md focus:outline-none sm:text-sm">
										<Image
											src={selectedService.icon}
											alt={selectedService.name + ' logo'}
											width={2500}
											height={2500}
											className='h-4 mx-2 inline w-auto'
										/>
										<span className="block truncate">{selectedService.name}</span>
										<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">

											<Icons icon="updown-chevron"
												className="h-5 w-5 text-gray-400"
											/>

										</span>
									</Listbox.Button>
									<MainTransition
										as={Fragment}

									>
										<Listbox.Options className="absolute mt-10 max-h-60 overflow-auto rounded-md bg-dark-lighter py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
											{otherWeirdServices.map((service, personIdx) => (
												<Listbox.Option
													key={personIdx}
													className={({ active }) =>
														`relative flex cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-primary-low-opacity' : null
														}`
													}
													value={service}
												>
													{({ selected }) => (
														<>
															<span
																className={`block truncate ${selected ? 'font-medium' : 'font-normal'
																	}`}
															>
																{service.name}
															</span>
															{selected ? (
																<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
																	<Icons icon="check-unstyled" className="h-4 w-4" />
																</span>
															) : (
																null
															)}
															<Image
																src={service.icon}
																alt={service.name + ' logo'}
																width={2500}
																height={2500}
																className='h-4 mx-2 inline w-auto'
															/>
														</>

													)}
												</Listbox.Option>
											))}
										</Listbox.Options>
									</MainTransition>
								</Listbox>
							</div>

						</div>
					</div>
				</div>
				<div className="overflow-x-auto mt-20 max-w-lg text-base space-y-6 rounded-lg sm:mx-auto md:max-w-none border-gray-700">
					<div className="grid grid-cols-4 p-4 text-base font-medium gap-x-16 bg-gray-800">
						<div className="flex items-center"></div>
						<div>Roomss</div>
						<div>Google Worskpace (<a className="font-medium underline hover:no-underline" href="https://workspace.google.com/pricing.html" target="_blank">Business Standard</a>)</div>
						<div>Microsoft 365 (<a className="font-medium underline hover:no-underline" href="https://www.microsoft.com/en-us/microsoft-365/buy/compare-all-microsoft-365-products?&activetab=tab:primaryr1" target="_blank">Microsoft 365 Personal</a>)</div>
					</div>
					<div className="grid grid-cols-4 px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
						<div className="text-gray-400">Unlimited Storage</div>
						<div>
							<svg className="w-5 h-5 text-green-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
						</div>
						<div>
							<svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
						</div>
						<div>
							<svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
						</div>
					</div>
					<div className="grid grid-cols-4 px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
						<div className="text-gray-400">Unlimited Devices</div>
						<div>
							<svg className="w-5 h-5 text-green-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
						</div>
						<div>
							<svg className="w-5 h-5 text-green-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
						</div>
						<div>
							<svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
						</div>
					</div>
					<div className="grid grid-cols-4 px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
						<div className="text-gray-400">Unrestricted Video Call Duration and Partcipant Count</div>
						<div>
							<svg className="w-5 h-5 text-green-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
						</div>
						<div>
							<svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
						</div>
						<div>
							<svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
						</div>
					</div>
					<div className="grid grid-cols-4 px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
						<div className="text-gray-500 dark:text-gray-400">Competely Free</div>
						<div>
							<svg className="w-5 h-5 text-green-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
						</div>
						<div>
							<svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
						</div>
						<div>
							<svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
						</div>
					</div>
					<div className="grid grid-cols-4 px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
						<div className="text-gray-500 dark:text-gray-400">Open Source, Online, For Free</div>
						<div>
							<svg className="w-5 h-5 text-green-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
						</div>
						<div>
							<svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
						</div>
						<div>
							<svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
						</div>
					</div>
				</div>
			</div>

			<div className="mx-auto max-w-7xl py-12 mt-36 px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8">
				<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
					<span className="block">Ready to start?</span>
					<span className="block text-primary">Game changing software is waiting.</span>
				</h2>
				<div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
					<div className="inline-flex rounded-md shadow">
						<MainButton link="/login" showicon="true" isrelativelink="true"> Open Roomss </MainButton>
					</div>
				</div>


				<div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
					<svg
						className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
						viewBox="0 0 1155 678"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
							fillOpacity=".3"
							d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
						/>
						<defs>
							<linearGradient
								id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
								x1="1155.49"
								x2="-78.208"
								y1=".177"
								y2="474.645"
								gradientUnits="userSpaceOnUse"
							>
								<stop stopColor="#2f80ec" />
								<stop offset={1} stopColor="#2f80ec85" />
							</linearGradient>
						</defs>
					</svg>
				</div>

			</div>
			<Footer />

		</div>
	)

}