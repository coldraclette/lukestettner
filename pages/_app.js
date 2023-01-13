import "../styles/globals.css";
import localFont from "@next/font/local";
import { Layout } from "../components/layout";

const customfont = localFont({ src: "./font/univers.ttf" });

// const customfont = Roboto({ subsets: ["latin"], weight: ["400"] });

function MyApp({ Component, pageProps }) {
  return (
    <div className={customfont.className}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}

export default MyApp;
