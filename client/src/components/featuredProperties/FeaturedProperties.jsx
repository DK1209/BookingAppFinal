import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  let { data, loading, error } = useFetch("/hotels");
  const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUc6jmFYFGYfzKyod14Ar_5gVCtfRKIGDOvUTJjSRRWw&s",
    "https://www.savills.co.uk/_images/adobestock-539646437.jpg",
    "https://static.dezeen.com/uploads/2021/07/hotel-valley-hotel-interiors-arizona_dezeen_2364_col_0.jpg",
    "https://hips.hearstapps.com/townandcountry/assets/16/48/1480373892-screen-shot-2016-11-28-at-55748-pm.png"
  ]

  data=data.slice(0,4);
  return (
    <div className="fp">
      {loading ? (
        "Loading"
      ) : (
        <>
          { data.length>=2 &&
            data.map((item, index) => (
            <div className="fpItem" key={item._id}>
              <img
                src={images[index]}
                alt=""
                className="fpImg"
              />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
              {item.rating && <div className="fpRating">
                <button>{item.rating}</button>
                <span>Excellent</span>
              </div>}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
