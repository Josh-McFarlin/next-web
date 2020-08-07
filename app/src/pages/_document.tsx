import * as React from "react";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import client from "../utils/sanity/client";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    const lang = await client.fetch('*[_id == "global-config"] {lang}.lang[0]');

    return {
      ...initialProps,
      lang,
    };
  }

  render() {
    const { lang } = this.props as any;

    return (
      <Html lang={lang ?? "en"}>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&family=Raleway:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
