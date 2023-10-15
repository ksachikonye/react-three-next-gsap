'use client'
import React, {  useRef } from 'react'





function Content() {
  const ref = useRef()


  return (
    <div ref={ref} className="content">
      <section className="section-one" id="first">
      <div className="container" id="vertical">
            <div className="vertical__content">
                <div className="col col_left">
                    <h2 className="vertical__heading"><span>About</span><span>Smooth</span><span>Scroll</span></h2>
                </div>
                <div className="col col_right">
                    <div className="vertical__item">
                        <h3>Smooth Scroll Lenis</h3>
                        <p>Lenis is an open-source library built to standardize scroll experiences and sauce up websites with butter-smooth navigation, all while using the platform and keeping it accessible.</p>
                    </div>
                    <div className="vertical__item">
                        <h3>Smooth Scroll Lenis</h3>
                        <p>Lenis is an open-source library built to standardize scroll experiences and sauce up websites with butter-smooth navigation, all while using the platform and keeping it accessible.</p>
                    </div>
                  
                    <div className="vertical__item">
                        <h3>Smooth Scroll Lenis</h3>
                        <p>Lenis is an open-source library built to standardize scroll experiences and sauce up websites with butter-smooth navigation, all while using the platform and keeping it accessible.</p>
                    </div>
                    <div className="vertical__item">
                        <h3>Smooth Scroll Lenis</h3>
                        <p>Lenis is an open-source library built to standardize scroll experiences and sauce up websites with butter-smooth navigation, all while using the platform and keeping it accessible.</p>
                    </div>
                </div>
            </div>
        </div>
      </section>
      
      <section className="section-three">
        <h1>SECTION 3</h1>
      </section>
      <section className="section-four">
        <h1>SECTION 4</h1>
      </section>
    </div>
  )
}

export default Content
