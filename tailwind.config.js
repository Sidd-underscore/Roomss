/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./public/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				'dark': '#131a27',
				'dark-low-opacity': 'rgba(19 26 39 / 70%)',
				'dark-lighter': '#1a2332',
				'dark-darker': '#0b1018',
				'dark-darker-low-opacity': '#0b10186b',
				'dark-darkest': '#121212',
				'dark-lightest': '#1d2635',
				'primary': '#2f80ec',
				'primary-low-opacity': '#2f80ec80',
				'red': '#dc2626',
			},
			backgroundImage: {
				'splash-1': "url('/img/splash_1.png')",
			},
			keyframes: {

				fadeIn: {
					'0%': { opacity: 0 },
					'50%': {opacity: 0},
					'100%': { opacity: 1 },
				}
			},
			animation: {
				'fadein': '750ms linear 0s fadeIn',
			},
		},
	},
	plugins: [
		require('@tailwindcss/line-clamp'),
	],
}
