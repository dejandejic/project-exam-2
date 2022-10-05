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
import { Modal, Button } from "react-bootstrap";

const PortfolioComponent = () => {
    const router = useRouter();

    const [all_documents, SetAllDocuments] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [zoomImage, setZoomImage] = useState('');

    const GetAllDocuments = async () => {
        await getAllDocuments({
            limit: -1,
            page: 1,
        }).then((data: any) => {
            if (data.success) {
                SetAllDocuments(data.data.data);
            } else {
            }
        });
    };

    const hideShowModal = (url?: any) => {
        if(!isModalOpen == true) {
            setZoomImage(url)
        }
        setIsModalOpen(!isModalOpen);
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
            <Modal
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
          show={isModalOpen}
          onHide={() =>hideShowModal()}
        >
          <Modal.Header closeButton>
            <Modal.Title>Image</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <img src={zoomImage}></img>
          </Modal.Body>
        </Modal>
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
                                
                            </div>
                        </div>
                        <div>
                            <div
                                className={style.item}
                                style={{
                                    backgroundImage: `url('images/bg-service-home-5.jpg')`,
                                }}
                            >
                                
                            </div>
                        </div>
                        {/* <div>
                            <div
                                className={style.item}
                                style={{
                                    backgroundImage: `url('images/project1.jpg')`,
                                }}
                            >
                                
                            </div>
                        </div> */}
                    </Slider>
                </div>
            </section>
            </div>
            <section className={style.ourproduct}>
                <div className="container">
                    <a
                        href={`${BASE_URL}/contact`}
                        className="viewmore dark hoverbott"
                    >
                        KONTAKT OSS
                    </a>
                    <h3>Våre Prosjekter</h3>
                    {all_documents.length > 0 && (
                        <div className="row info-head">
                            {all_documents.map((row: any, index) => {
                                return (
                                    <div className="col-md-3" key={index}>
                                        <div className={style.productitem}
                                        onClick={() => hideShowModal(`${BACKEND_URI_UPLOAD}/${row.filename}`)}>
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
                                                    <h4>#001</h4>
                                                    <p>
                                                       Innredning av stue i Lørenskog, lyst på noe lignende?
                                                       Kontakt oss med ID nummeret over.
                                                    </p>
                                                </div>
                                            </figure>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};
export default PortfolioComponent;
