import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import Hero from "@/app/sections/Hero";
import Differentiators from "@/app/sections/Differentiators";
import Proof from "@/app/sections/Proof";
import Work from "@/app/sections/Work";
import Service from "@/app/sections/Service";
import Studio from "@/app/sections/Studio";
import Contact from "@/app/sections/Contact";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <a href="#contact" className={styles.skip}>
        Skip to contact
      </a>
      <Nav />
      <main className={styles.main}>
        <Hero />
        <Differentiators />
        <Proof />
        <Work />
        <Service />
        <Studio />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
