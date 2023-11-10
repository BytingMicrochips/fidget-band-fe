import MailchimpSubscribe from "react-mailchimp-subscribe";
import mailChimpLogo from "../assets/MailChimp-logo.png";


const MailChimp = () => {
    const url = "https://live.us8.list-manage.com/subscribe/post?u=a15c86363878d5a1879f5f786&amp;id=9443bea0ad&amp;f_id=007210e0f0";
    const SimpleForm = () => <MailchimpSubscribe url={url} />;
    
    return (
      <MailchimpSubscribe
        url={url}
        render={({ subscribe, status, message }) => (
          <div className="mailChimpWrapper">
            <h2>Join our mailing list</h2>
            <SimpleForm onSubmitted={(formData) => subscribe(formData)} />
            {status === "sending" && (
              <div style={{ color: "blue" }}>sending...</div>
            )}
            {status === "error" && (
              <div
                style={{ color: "red"}}
                dangerouslySetInnerHTML={{ __html: message }}
              />
            )}
            {status === "success" && (
              <div style={{ color: "green" }}>Subscribed !</div>
                )}
                <img src={mailChimpLogo}/>
          </div>
        )}
      />
    );
}



export default MailChimp;