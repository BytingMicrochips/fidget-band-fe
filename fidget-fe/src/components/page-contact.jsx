import DrawerNav from "./draw-nav";

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
            or reviews you can do so via the email address below.
            <br />
            <br />
            If you are interested in collaborations or remixes we would love to
            hear from you too - either through email or in person at a show.
          </h2>
          <a href="mailto:fidgetandthetwitchers@gmail.com">
            fidgetandthetwitchers@gmail.com
          </a>
        </div>
      </>
    );
};

export default Contact;