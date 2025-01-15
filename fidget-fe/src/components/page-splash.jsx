import logo from "../assets/logo-trans.png";
import tapt from "../assets/fidget tapt.jpg";
import "../App.css";
import MailChimp from "../components/mailChimp"
import { useNavigate } from "react-router-dom";

const Splash = () => {
  const navigate = useNavigate();

      return (
        <>
          <div className="splashWrapper">
            <div className="splashLogo">
              <img id="logo" src={logo} />
              <img id="tapt" src={tapt} />
            </div>
            <div className="splashButtons">
              <button onClick={()=>{navigate("/home")}}>Enter site</button>
            </div>
            {/* <MailChimp/> */}
          </div>
        </>
      );
}

export default Splash;
