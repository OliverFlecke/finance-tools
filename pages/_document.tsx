/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx)
		return { ...initialProps }
	}

	render() {
		return (
			<Html lang="en">
				<Head />
				<body className="min-h-screen">
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument
