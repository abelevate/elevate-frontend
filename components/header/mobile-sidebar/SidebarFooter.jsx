import { FaChrome } from "react-icons/fa";

const SidebarFooter = () => {
  // const socialContent = [
  //   { id: 1, icon: "fa-facebook-f", link: "https://www.facebook.com/" },
  //   { id: 2, icon: "fa-twitter", link: "https://www.twitter.com/" },
  //   { id: 3, icon: "fa-instagram", link: "https://www.instagram.com/" },
  //   { id: 4, icon: "fa-linkedin-in", link: "https://www.linkedin.com/" },
  // ];

  return (
    <div className="mm-add-listing mm-listitem pro-footer">
      <a href="/myprofile" className="theme-btn btn-style-one mm-listitem__text">
        My Profile
      </a>
      <a
        href="https://chromewebstore.google.com/detail/fmmjbioialkffjgcdkdonhniomdfpapo?utm_source=item-share-cb"
        className="theme-btn btn rounded-pill mt-3"
        target="_blank"
        rel="noopener noreferrer"
        style={{ backgroundColor: "#21286a", color: "white" }}

      >
        <FaChrome style={{ paddingRight: "8px", fontSize: "1.5rem" }} />
        Download Extension
      </a>
      {/* job post btn */}

      <div className="mm-listitem__text">
        <div className="contact-info">
          {/* <span className="phone-num">
            <span>Call us</span>
            <a href="tel:1234567890">123 456 7890</a>
          </span> */}
          <span className="address">
            Nashik, India.
          </span>
          <a href="mailto:workatelevate@gmail.com" className="email">
            workatelevate@gmail.com
          </a>
        </div>
        {/* End .contact-info */}

        {/* <div className="social-links">
          {socialContent.map((item) => (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              key={item.id}
            >
              <i className={`fab ${item.icon}`}></i>
            </a>
          ))}
        </div> */}
        {/* End social-links */}
      </div>
      {/* End .mm-listitem__text */}
    </div>
  );
};

export default SidebarFooter;
