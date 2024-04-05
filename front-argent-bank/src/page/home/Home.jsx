import "../home/home.scss";
import Header from "../../components/header/Header";
import Hero from "../../components/hero/Hero";
import Features from "../../components/features/Features";
import Footer from "../../components/footer/Footer";

const Home = () => {
    return (
        <div className="homeWrapper">
            <Header/>
            <Hero/>
            <Features/>
            <Footer/>
        </div>
    );
};

export default Home;