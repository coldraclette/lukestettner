import "../styles/globals.css";
import localFont from "@next/font/local";
import { Layout } from "../components/layout";

const customfont = localFont({ src: "./font/UniversLTStd.otf" });

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
