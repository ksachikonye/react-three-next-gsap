'use client'
import React, {useEffect} from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother';
import { SplitText } from 'gsap/dist/SplitText';


const InitialAnimation = () => {


    return (
        <>
  <div className="cursor" />
  <div className="cursor-follower" />
  <div className="loading-screen">
    <div className="loading-section">
      <div id="loader" />
    </div>
  </div>
  <div id-="">
    <div id="myNav" className="overlay hoverlay">
      <span className="closebtn" id="closebtn">
        ×
      </span>
      <div className="overlay-content" id="box1">
        <a href="#" className="box">
          About
        </a>
        <a href="#" className="box">
          Services
        </a>
        <a href="#" className="box">
          Clients
        </a>
        <a href="#" className="box">
          Contact
        </a>
      </div>
    </div>
   
    <div className="transition-container from-left">
      <span className="tile" />
      <span className="tile" />
      <span className="tile" />
    </div>
   
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <div className="welcome-screen">
          <header className="header js-active-header">
    
            <nav className="navbar navbar-dark bg-dark1 pt-3">
              <div className="container">
                <a className="navbar-brand" href="#">
                  Navbar
                </a>
                <span
                  style={{ fontSize: 30, cursor: "pointer", color: "white" }}
                  id="openNav"
                >
                  ☰ open
                </span>
              </div>
            </nav>
            <div className="banner" style={{}}>
              <div className="container">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="heading">
                      <h2>
                        Digital
                        <p>done alright.</p>
                      </h2>
                      <a href="#" className="btn-banner">
                        <b>+</b>our solutions
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <img
                      className="imag"
                      src="https://www.logochemist.com/assets/Layer_1.png"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </header>
        </div>
        <section className="content-section">
          <div className="container">
            <div className="row">
              <div className="col-12 animated">
                <div className="section-titles">
                  <h5>DIGITAL MARKETING &amp; CREATIVE AGENCY</h5>
                  <h2>
                    We create &amp; design digital products for our best
                    clients.
                  </h2>
                </div>
              </div>
              {/* end col-12 */}
              <div className="col-lg-7 animated">
                <p>
                  We are your brand's Wingman. We generate ideas that alter
                  perception. Fueled by the desire to make a lasting impact, we
                  create <strong>experiences</strong> that change the way people
                  <strong>interact</strong> with brands – and with each other.
                </p>
                <br />
              </div>
              {/* end col-7 */}
              <div className="col-lg-5 animated">
                <p>
                  We are <strong>Core Digital Thinkers</strong> &amp;{" "}
                  <strong>Creators</strong>. Whether you are after eye-catching
                  designs or superbly crafted websites, We does it all – but
                  with that all-important creative difference.
                </p>
              </div>
              {/* end col-5 */}
              {/* end col-7 */}
            </div>
            {/* end row */}
          </div>
          {/* end container */}
        </section>
        <section className="content-section">
          <div className="container">
            <div className="section-titles">
              <h5>Our work and products</h5>
              <h2>OUR WORK</h2>
            </div>
          </div>
          <main id="content" className="site-content">
            <div className="row">
              <div className="col-lg-12">
                <section id="panels">
                  <div id="panels-container" style={{ width: "350%" }}>
                    <div className="panel">
                      <img
                        src="https://cdn.dribbble.com/userupload/2956952/file/original-9df59ef697af11c3308bc5921e68ce33.png?compress=1&resize=1024x768"
                        alt=""
                      />
                      <h2>
                        Lorem Ipsom<span>.</span>
                      </h2>
                    </div>
                    <div className="panel">
                      <img
                        src="https://cdn.dribbble.com/users/5170831/screenshots/17035515/media/2d554e4b4030d294dbfc3b31be2ff7fb.png?compress=1&resize=1024x768"
                        alt=""
                      />
                      <h2>
                        Lorem Ipsom<span>.</span>
                      </h2>
                    </div>
                    <div className="panel">
                      <img
                        src="https://cdn.dribbble.com/userupload/2671586/file/original-3e59c82de972f2531b63918d94865a7a.png?compress=1&resize=1024x768"
                        alt=""
                      />
                      <h2>
                        Lorem Ipsom<span>.</span>
                      </h2>
                    </div>
                    <div className="panel">
                      <img
                        src="https://cdn.dribbble.com/users/472201/screenshots/17463865/media/2120a04e2c6c21a08baf34bebf24132e.jpg?compress=1&resize=1024x768"
                        alt=""
                      />
                      <h2>
                        Lorem Ipsom<span>.</span>
                      </h2>
                    </div>
                    <div className="panel">
                      <img
                        src="https://cdn.dribbble.com/userupload/3279736/file/original-685f60033e6d969cd7709be235c019ba.png?compress=1&resize=1024x768"
                        alt=""
                      />
                      <h2>
                        Lorem Ipsom<span>.</span>
                      </h2>
                    </div>
                    <div className="panel">
                      <img
                        src="https://cdn.dribbble.com/userupload/2956952/file/original-9df59ef697af11c3308bc5921e68ce33.png?compress=1&resize=1024x768"
                        alt=""
                      />
                      <h2>
                        Lorem Ipsom<span>.</span>
                      </h2>
                    </div>
                    <div className="panel">
                      <img
                        src="https://cdn.dribbble.com/users/5170831/screenshots/17035515/media/2d554e4b4030d294dbfc3b31be2ff7fb.png?compress=1&resize=1024x768"
                        alt=""
                      />
                      <h2>
                        Lorem Ipsom<span>.</span>
                      </h2>
                    </div>
                    <div className="panel">
                      <img
                        src="https://cdn.dribbble.com/userupload/2671586/file/original-3e59c82de972f2531b63918d94865a7a.png?compress=1&resize=1024x768"
                        alt=""
                      />
                      <h2>
                        Lorem Ipsom<span>.</span>
                      </h2>
                    </div>
                    <div className="panel">
                      <img
                        src="https://cdn.dribbble.com/users/472201/screenshots/17463865/media/2120a04e2c6c21a08baf34bebf24132e.jpg?compress=1&resize=1024x768"
                        alt=""
                      />
                      <h2>
                        Lorem Ipsom<span>.</span>
                      </h2>
                    </div>
                    <div className="panel">
                      <img
                        src="https://cdn.dribbble.com/userupload/3279736/file/original-685f60033e6d969cd7709be235c019ba.png?compress=1&resize=1024x768"
                        alt=""
                      />
                      <h2>
                        Lorem Ipsom<span>.</span>
                      </h2>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </main>
        </section>
        <section className="technology-section">
          <div className="container">
            <div className="heading-technology">
              <h2>Technology</h2>
            </div>
          </div>
          <div className="technology">
            <h2 className=" h2 one">Web Development</h2>
            <h2 className="h2 two">Web Design</h2>
            <h2 className="h2 three">App Development</h2>
            <h2 className="h2 four">Game Development</h2>
            <h2 className="h2 five">NFT Development</h2>
            <h2 className="h2 six">Search Engine </h2>
          </div>
        </section>
        <section className="content-section">
          <div className="container">
            <div className="row">
              <div className="col-12 animated">
                <div className="section-titles">
                  <h5>DIGITAL MARKETING &amp; CREATIVE AGENCY</h5>
                  <h2>
                    We create &amp; design digital products for our best
                    clients.
                  </h2>
                </div>
              </div>
              {/* end col-12 */}
              <div className="col-lg-7 animated">
                <p>
                  We are your brand's Wingman. We generate ideas that alter
                  perception. Fueled by the desire to make a lasting impact, we
                  create <strong>experiences</strong> that change the way people
                  <strong>interact</strong> with brands – and with each other.
                </p>
                <br />
              </div>
              {/* end col-7 */}
              <div className="col-lg-5 animated">
                <p>
                  We are <strong>Core Digital Thinkers</strong> &amp;{" "}
                  <strong>Creators</strong>. Whether you are after eye-catching
                  designs or superbly crafted websites, We does it all – but
                  with that all-important creative difference.
                </p>
              </div>
              {/* end col-5 */}
              {/* end col-7 */}
            </div>
            {/* end row */}
          </div>
          {/* end container */}
        </section>
      </div>
    </div>
  </div>
</>

    )
}