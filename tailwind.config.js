/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
		colors: {
				'dark': '#131a27',
				'dark-low-opacity': 'rgba(19 26 39 / 70%)',
				'dark-lighter': '#1a2332',
				'dark-darker': '#0b1018',
				'dark-darker-low-opacity': '#0b1018a3',        
				'dark-darkest': '#121212',
				'dark-lightest': '#1d2635',
		},
		backgroundImage: {
				'splash-1': "url('/img/splash_1.png')",
		},
	},
  },
  plugins: [],
}
