import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html>
			<Head />
			<body className='min-h-screen bg-main-background bg-cover bg-center bg-fixed bg-no-repeat'>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
