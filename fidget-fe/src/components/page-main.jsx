import "../App.css";
import Header from "./header.jsx";
import { FacebookProvider, EmbeddedPost } from "react-facebook";

const Main = () => {

    return (
      <>
        <div className="page-main">
          <Header />
          <h2>
            Brass-fuelled skapunkery spurting punchy beats & social absurdities!
            Dealing out generous helpings of itchy rhythyms, funk infused
            basslines and jazz drenched horn lines we have been active in the
            diy seen since 2019.
          </h2>
          <h3>Next playing in /location/ on /date/ !</h3>
        </div>
        <iframe
          src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ftwitchyfidgets&tabs=timeline&width=340&height=500&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
          width="340"
          height="500"
          allowFullScreen={true}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          data-skin="dark"
          className="socialFeed"
        />
        <iframe
          src="https://www.instagram.com/fidgetandthetwitchers/embed"
          width="340"
          height="340"
          scrolling="no"
          allowtransparency="true"
          data-skin="dark"
          className="socialFeed"
        />
      </>
    );
}

export default Main;
