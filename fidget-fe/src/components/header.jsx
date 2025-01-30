import banner from '../assets/banner-skinny.png'
import "../App.css";

const Header = () => {
    return (
      <>
        <div className="logoRedWrapper">
          <img src={banner} />
          <h1>
            <em>7 piece Ska-Punk fusion, Bristol UK </em>
          </h1>
        </div>
      </>
    );
}

export default Header;