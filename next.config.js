
/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'roomss.tk',
				port: '',
				pathname: '**',
			},
			{
				protocol: 'https',
				hostname: 'roomss.cool-sidd.repl.co',
				port: '',
				pathname: '**',
			},
			{
				protocol: 'https',
				hostname: 'firebasestorage.googleapis.com',
				port: '',
				pathname: '**',
			},
		],

	},
}
