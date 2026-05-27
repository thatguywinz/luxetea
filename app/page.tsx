import Nav from "./components/Nav";
import Hero from "./components/Hero";
import TrustStrip from "./components/TrustStrip";
import DrinkMarquee from "./components/DrinkMarquee";
import Categories from "./components/Categories";
import DrinkBuilder from "./components/DrinkBuilder";
import ScrubbedReveal from "./components/ScrubbedReveal";
import MoodRecommender from "./components/MoodRecommender";
import HorizontalGallery from "./components/HorizontalGallery";
import BigTypeBreak from "./components/BigTypeBreak";
import LocationSection from "./components/LocationSection";
import FAQ from "./components/FAQ";
import ContactForm from "./components/ContactForm";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <TrustStrip />
        <DrinkMarquee />
        <Categories />
        <DrinkBuilder />
        <ScrubbedReveal />
        <MoodRecommender />
        <HorizontalGallery />
        <BigTypeBreak />
        <LocationSection />
        <FAQ />
        <ContactForm />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
