import logo from "../assets/logo.jpg";
import "../App.css";

const Splash = () => {
      return (
        <>
          <div className="splashWrapper">
            <div className="splashLogo">
              <img src={logo} />
            </div>
            <div className="splashButtons">
              <button>Enter site</button>
              <button>Join mailing list</button>
            </div>
          </div>
        </>
      );
}

export default Splash;