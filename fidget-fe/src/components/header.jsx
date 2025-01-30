import logoRed from '../assets/logoRed.png'
import "../App.css";

const Header = () => {
    return (
      <>
        <div className="logoRedWrapper">
          <img src={logoRed} />
          <h1>7 piece Ska-Punk, Bristol UK </h1>
        </div>
      </>
    );
}

export default Header;