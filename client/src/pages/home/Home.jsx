import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import useFetch from "../../hooks/useFetch";
import { useMediaQuery } from '@react-hook/media-query';
import "./home.css";

const Home = () => {
  let { data, loading, error } = useFetch("/hotels");
  const isSmall=useMediaQuery("(max-width:769px)");
  data=data.slice(0,4);
  return (
    <div>
      <Navbar />
      <Header/>
      <div className="homeContainer">
        {!isSmall && <Featured/>}
        <h2 className="homeTitle">Browse by property type</h2>
        <PropertyList/>
        {
          data.length>=2 &&
        <h2 className="homeTitle">Homes guests love</h2>
        }
        {!isSmall && <FeaturedProperties />} 
        <MailList/>
        <Footer/>
      </div>
    </div>
  );
};

export default Home;
