import DrawerNav from "./draw-nav";
import Button from "@mui/material/Button";

const Contact = () => { 
    return (
      <>
        <DrawerNav />

        <div className="pageGradientWrapper">
          <div className="pageGigsHeadings">
            <h2> Contact & EPK</h2>
          </div>
        </div>

        <div className="contactInfo">
          <h2>
            If you are looking to get in touch with us for bookings, interviews
            or reviews you can do so via the email button below.
            <br />
            <br />
            If you are interested in collaborations or remixes we would love to
            hear from you too.
          </h2>
          {/* <a href="mailto:fidgetandthetwitchers@gmail.com">
            fidgetandthetwitchers@gmail.com
          </a> */}
          <div className="contactButtons">
            <Button
              href="mailto:fidgetandthetwitchers@gmail.com"
              target="_blank"
              variant="contained"
              sx={{
                color: "##FAEBD7",
                backgroundColor: "#0d0d0d",
                fontFamily: "AveriaSansLibre-Bold",
                marginLeft: "20px",
                marginBottom: "15px",
                "&:hover": { backgroundColor: "#d15c2a" },
              }}
            >
              Email us
            </Button>
          </div>
        </div>
        <div className="contactInfo" id="epkTech">
          <h2>
            Our current Electronic Press Kit (EPK) and Tech Rider can
            always be found at the following links:
          </h2>
          <div className="contactButtons">
            <Button
              href="https://drive.google.com/drive/folders/1KKsqiFR2ATbJ98_VxraBrcsPE3TLfOmj?usp=drive_link"
              target="_blank"
              variant="contained"
              sx={{
                color: "##FAEBD7",
                backgroundColor: "#0d0d0d",
                fontFamily: "AveriaSansLibre-Bold",
                marginLeft: "20px",
                marginBottom: "15px",
                "&:hover": { backgroundColor: "#d15c2a" },
              }}
            >
              EPK
            </Button>
          </div>
          <Button
            href="https://drive.google.com/file/d/1WURaM7FeJ4YMKLAF9J-0MdCWPWzAq5E1/view?usp=sharing"
            target="_blank"
            variant="contained"
            sx={{
              color: "##FAEBD7",
              backgroundColor: "#0d0d0d",
              fontFamily: "AveriaSansLibre-Bold",
              marginLeft: "20px",
              "&:hover": { backgroundColor: "#d15c2a" },
            }}
          >
            Tech Rider
          </Button>
        </div>
      </>
    );
};

export default Contact;