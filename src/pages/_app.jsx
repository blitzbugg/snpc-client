// import Navbar from "@/components/Navbar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Navbar />
      {/* <testNavbar /> */}
      <main className="min-h-screen">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}