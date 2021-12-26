/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html>
				<Head />
				<body className="min-h-screen">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
