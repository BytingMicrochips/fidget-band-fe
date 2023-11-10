import logo from "../assets/logo.jpg";
import "../App.css";
import MailChimp from "../components/mailChimp"

const Splash = () => {


      return (
        <>
          <div className="splashWrapper">
            <div className="splashLogo">
              <img src={logo} />
            </div>
            <div className="splashButtons">
              <button>Enter site</button>
            </div>
            <MailChimp/>
          </div>
        </>
      );
}

export default Splash;
