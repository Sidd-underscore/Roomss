import '../public/css/styles.css'
import Router from 'next/router'
import { useState, useEffect, } from 'react';
import NProgress from 'nprogress'


function MyApp({ Component, pageProps }) {
	const [isLoading, setIsLoading] = useState(false);
	NProgress.configure({ showSpinner: false });
	useEffect(() => {
		Router.events.on("routeChangeStart", (url) => {
			NProgress.start()
		})

		Router.events.on("routeChangeComplete", (url) => {
			NProgress.done(false)
		});

		Router.events.on("routeChangeError", (url) => {
			NProgress.done(false)
		});

		const registerServiceWorker = async () => {
			if ('serviceWorker' in navigator) {
				try {
					const registration = await navigator.serviceWorker.register(
						'sw.js',
						{
							scope: '/',
						}
					);
					if (registration.installing) {
						console.log('Service worker installing');
					} else if (registration.waiting) {
						console.log('Service worker installed');
					} else if (registration.active) {
						console.log('Service worker active');
					}
				} catch (error) {
					console.error(`Registration failed with ${error}`);
				}
			}
		};
		registerServiceWorker();

	}, [])

	return (
		<>
			<Component className="bg-dark" {...pageProps} />
		</>
	)
}

export default MyApp
