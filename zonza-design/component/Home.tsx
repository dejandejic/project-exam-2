import style from "../styles/Home.module.scss";
import "bootstrap/dist/css/bootstrap.css";
import React, { useEffect, useState } from "react";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useRouter } from "next/router";
import { getAllDocuments } from "../services/indexServices";
import { BACKEND_URI_UPLOAD, BASE_URL } from "../constants/constants";

const HomeComponent = () => {
    const router = useRouter();

    const [all_documents, SetAllDocuments] = useState([]);

    const GetAllDocuments = async () => {
        await getAllDocuments({
            limit: 20,
            page: 1,
        }).then((data: any) => {
            if (data.success) {
                SetAllDocuments(data.data.data);
            } else {
            }
        });
    };

    useEffect(() => {
        GetAllDocuments();
    }, []);
    const settings = {
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
    };
    return (
        <div style={{paddingTop: "45px"}}>
            <div className="container">
            <section className={style.banner}>
                <div className={style.bannerslider}>
                    <Slider {...settings}>
                        <div>
                            <div
                                className={style.item}
                                style={{
                                    backgroundImage: `url('images/banner.jpg')`,
                                }}
                            >
                                <div className="container">
                                    <h1>Interior Design</h1>
                                    <p>
                                        {" "}
                                        Our Experience Ensures That Your
                                        Projects Will Be Done Right And With The
                                        Upmost Professionalism.
                                    </p>
                                    <a
                                        href={`${BASE_URL}/portfolio`}
                                        className="viewmore hoverbott"
                                    >
                                        Portfolio
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div
                                className={style.item}
                                style={{
                                    backgroundImage: `url('images/bg-service-home-5.jpg')`,
                                }}
                            >
                                <div className="container">
                                    <h1>Interiør Design</h1>
                                    <p>
                                        {" "}
                                        Vår erfaring sikrer at dine prosjekter blir utført 
                                        riktig med yppereste klasse.     
                                    </p>
                                    <a
                        href={`${BASE_URL}/portfolio`}
                        className="viewmore hoverbott"
                    >
                        Portfolio
                    </a>
                                  
                                </div>
                            </div>
                        </div>
                        {/* <div>
                            <div
                                className={style.item}
                                style={{
                                    backgroundImage: `url('images/project1.jpg')`,
                                }}
                            >
                                <div className="container">
                                    <h1>Interior Design For House</h1>
                                    <p>
                                        {" "}
                                        Our Experience Ensures That Your
                                        Projects Will Be Done Right And With The
                                        Upmost Professionalism.
                                    </p>
                                    <a href="#" className="viewmore hoverbott">
                                        View all Products
                                    </a>
                                </div>
                            </div>
                        </div> */}
                    </Slider>
                </div>
            </section>
            </div>
            <section className={style.aboutsection}>
                <div className="container">
                    <div className="row">
                        {/* <div className="col-md-6">
                            <figure>
                                <img src="images/about.jpg" />
                            </figure>
                        </div> */}
                        <div className="col-md-12">
                            <div className={style.sectionTitle}>
                                <h3>Zonza Design</h3>
                                <h2>BOLIGSTYLING OG INTERIØRVEILEDNING</h2>
                            </div>
                            <p>

<b>Skal du selge bolig og ønsker å tiltrekke flest mulige kjøpere til visning?</b> 
Vi hjelper deg å gjøre boligen lekker og delikat slik at den kan vises fra sin beste side. Boligstyling gir både raskere salg og høyere pris da det appellerer til en større gruppe av mulige kjøpere. 
                            </p>
                            <p>
                                {" "}
                                <b>Skal du pusse opp eller trenger rådgivning og hjelp til innredning?</b>
Vi hjelper deg gjerne med valg av farger og materialer, møbler og interiør for å gjøre din bolig begivenhetsrik, personlig og delikat.
                            </p>
                            <a
                        href={`${BASE_URL}/contact`}
                        className="viewmore dark hoverbott"
                    >
                        KONTAKT OSS
                    </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className={style.servicessection}>
                <div className="container">
                    <div className={style.sectionTitle}>
                        <h2>Tjenester</h2>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <figure>
                                <img src="images/service1.jpg" />
                            </figure>
                            <h2>Housing development</h2>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Laborum odio id voluptatibus
                                incidunt cum? Atque quasi eum debitis optio ab.{" "}
                            </p>
                            <a href="#" className={style.readmore}>
                                Read More
                            </a>
                        </div>
                        <div className="col-md-4">
                            <figure>
                                <img src="images/service2.jpg" />
                            </figure>
                            <h2> Konow Lund housing will be like new</h2>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Laborum odio id voluptatibus
                                incidunt cum? Atque quasi eum debitis optio ab.{" "}
                            </p>
                            <a href="#" className={style.readmore}>
                                Read More
                            </a>
                        </div>
                        <div className="col-md-4">
                            <figure>
                                <img src="images/service3.jpg" />
                            </figure>
                            <h2>Signal project ins yearbook</h2>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Laborum odio id voluptatibus
                                incidunt cum? Atque quasi eum debitis optio ab.{" "}
                            </p>
                            <a href="#" className={style.readmore}>
                                Read More
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* <section className="info-help h18" style={{ backgroundImage: `url('images/bg-service-home-5.jpg')` }}>
            <div className="container">
                <div className="row info-head">
                    <div className="col-lg-12 col-md-8 col-xs-8">
                        <div className="info-text aos-init aos-animate">
                            <h3 className="text-center mb-0">Our products</h3>
                            <p className="text-center mb-4 p-0">We offer perfect interior services</p>
                        </div>
                    </div>
                </div>
            </div>
        </section> */}
            <section className={style.ourproduct}>
                <div className="container">
               
                            <div className={style.sectionTitle}> 
                                <h3>Vi vil gjerne høre hva vi kan gjøre bedre</h3>
                            </div>
                        
                    <a
                        href={`${BASE_URL}/feedback`}
                        className="viewmore dark hoverbott"
                    >
                       Tilbakemelding
                    </a>
                    {/* <h3>Vare Prosjekter</h3>
                    {all_documents.length > 0 && (
                        <div className="row info-head">
                            {all_documents.map((row: any, index) => {
                                return (
                                    <div className="col-md-3" key={index}>
                                        <div className={style.productitem}>
                                            <figure
                                                style={{
                                                    backgroundImage: `url('${BACKEND_URI_UPLOAD}/${row.filename}')`,
                                                }}
                                            >
                                                <div
                                                    className={
                                                        style.imghovertex
                                                    }
                                                >
                                                    <h4>Lorem Ipsum</h4>
                                                    <p>
                                                        orem Ipsum is simply
                                                        dummy text of the
                                                        printing and typesetting
                                                        industry. Lorem Ipsum
                                                        has been the industry...
                                                    </p>
                                                </div>
                                            </figure>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )} */}
                </div>
            </section>
        </div>
    );
};
export default HomeComponent;
