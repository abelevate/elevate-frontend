import Image from "next/image";

const Index = () => {
  return (
    <section
      className="banner-section-three -type-17"
      style={{ backgroundImage: "url(/images/index-17/header/bg.png)" }}
    >
      <div className="auto-container">
        <div className="row align-items-center">
          {/* Text Content */}
          <div className="content-column col-lg-7 col-md-12 col-sm-12">
            <div className="inner-column d-flex flex-column align-items-center align-items-md-start text-start">
              <div
                className="title-box"
                data-wow-delay="500"
                data-aos="fade-up"
              >
                <h3 className="text-center text-md-start">
                  Automate Job Applications
                  <br /> Elevate Your Career
                </h3>
                <div className="text col-12 col-md-6 text-center text-md-start">
                  The ultimate tool that helps you skip the tedious forms, apply faster by autofilling applications, attach resumes instantly, and build great CVs.
                </div>
              </div>
            </div>
          </div>
          {/* End Text Content */}

          {/* Image Content */}
          <div className="image-column col-lg-5 col-md-12">
            <div className="image-box">
              <figure
                className="main-image"
                data-aos="fade-left"
                data-aos-delay="1500"
              >
                <Image
                  width={572}
                  height={560}
                  src="/images/index-17/header/1.png"
                  alt="hero image"
                />
              </figure>
            </div>
          </div>
          {/* End Image Content */}
        </div>
      </div>
    </section>
  );
};

export default Index;
