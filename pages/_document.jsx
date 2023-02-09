import Document, { Html, Head, Main, NextScript } from 'next/document';

class Home extends Document {
	render() {
		return (
			<Html>
				<Head>
					<link rel="icon" href="/img/icons/favicon.ico" />
					<link rel="icon" href="/img/icons/favicon-16x16.png" type="image/png" sizes="16x16" />
					<link rel="icon" href="/img/icons/favicon-32x32.png" type="image/png" sizes="32x32" />
					<link rel="icon" href="/img/icons/favicon-48x48.png" type="image/png" sizes="32x32" />
					<link rel="icon" href="/img/icons/favicon-96x96.png" type="image/png" sizes="32x32" />
					<link rel="icon" href="/img/icons/favicon-144x144.png" type="image/png" sizes="32x32" />
					<link rel="icon" href="/img/icons/favicon-192x192.png" type="image/png" sizes="32x32" />
					<link rel="icon" href="/img/icons/favicon-256x256.png" type="image/png" sizes="32x32" />
					<link rel="apple-touch-icon-precomposed" href="/img/icons/apple-touch-icon.png" />
				</Head>
				<body className="bg-dark text-white">
					<Main />
					<NextScript />
				</body>

			</Html>
		)
	}
}

export default Home;
