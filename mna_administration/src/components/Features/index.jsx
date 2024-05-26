import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Shell from '../Shell';

function Features() {
    return (
        <>
            <link href="/assets/css/features.css" rel="stylesheet" />

            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">


                <div className="container px-4 py-5" id="hanging-icons">
                    <Shell />
                </div>



                <div className="container px-4 py-5" id="hanging-icons">
                    <h2 className="pb-2 border-bottom">Informations principales</h2>
                    <div className="row g-4 py-5 row-cols-1 row-cols-lg-4">
                        <div className="d-flex flex-column h-100 p-1 pb-1 features-box width-box">
                            <div className="icon-square bg-light text-dark flex-shrink-0 me-3 ">
                                <i class="bi bi-book" width="1em" height="1em"></i>
                            </div>
                            <div class="features-box-white">
                                <h2>Informations</h2>
                                <p>Ip : xxx.xxx.xxx.xxx</p>
                                <p>Status: Active/Disable</p>
                            </div>
                            <div className="mt-auto btn-div">
                                <a href="#" className="btn btn-primary btn-end">
                                    Tout afficher
                                </a>
                            </div>
                        </div>
                        <div className="d-flex flex-column h-100 p-1 pb-1 features-box width-box">
                            <div className="icon-square bg-light text-dark flex-shrink-0 me-3">
                                <i class="bi bi-clipboard" width="1em" height="1em"></i>
                            </div>
                            <div class="features-box-white">
                                <h2>Presse papier</h2>
                                <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
                            </div>
                            <div className="mt-auto btn-div">
                                <a href="#" className="btn btn-primary btn-end">
                                    Tout afficher
                                </a>
                            </div>
                        </div>
                        <div className="d-flex flex-column h-100 p-1 pb-1 features-box width-box">
                            <div className="icon-square bg-light text-dark flex-shrink-0 me-3">
                                <i class="bi bi-keyboard" width="1em" height="1em"></i>
                            </div>
                            <div class="features-box-white">
                                <h2>Clavier</h2>
                                <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
                            </div>
                            <div className="mt-auto btn-div">
                                <a href="#" className="btn btn-primary btn-end">
                                    Tout afficher
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container px-4 py-5" id="custom-cards">
                    <h2 className="pb-2 border-bottom">Visualisation</h2>

                    <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">

                        <div className="col visiualisation">
                            <div className="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg" style={{ backgroundImage: 'url("/assets/image/unsplash-photo-1.jpg")' }}>
                                <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                                    <h2 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Webcam</h2>
                                    <a href="#" className="no-line visiualisation-a">
                                        <ul className="d-flex list-unstyled mt-auto">
                                            <li className="me-auto">
                                                <i class="bi bi-camera" width="1em" height="1em"></i>
                                            </li>
                                            <li className="d-flex align-items-center me-3">
                                                <svg className="bi me-2" width="1em" height="1em"><use xlinkHref="#geo-fill" /></svg>
                                                <small>Earth</small>
                                            </li>
                                            <li className="d-flex align-items-center">
                                                <svg className="bi me-2" width="1em" height="1em"><use xlinkHref="#calendar3" /></svg>
                                                <small>3d</small>
                                            </li>
                                        </ul>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="col visiualisation">
                            <div className="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg" style={{ backgroundImage: 'url("/assets/image/unsplash-photo-2.jpg")' }}>
                                <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                                    <a href="#" className="no-line visiualisation-a">
                                        <h2 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Ecran</h2>
                                        <ul className="d-flex list-unstyled mt-auto">
                                            <li className="me-auto">
                                                <i class="bi bi-camera-reels" width="1em" height="1em"></i>
                                            </li>
                                            <li className="d-flex align-items-center me-3">
                                                <svg className="bi me-2" width="1em" height="1em"><use xlinkHref="#geo-fill" /></svg>
                                                <small>Pakistan</small>
                                            </li>
                                            <li className="d-flex align-items-center">
                                                <svg className="bi me-2" width="1em" height="1em"><use xlinkHref="#calendar3" /></svg>
                                                <small>4d</small>
                                            </li>
                                        </ul>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="col visiualisation">
                            <div className="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg" style={{ backgroundImage: 'url("/assets/image/unsplash-photo-3.jpg")' }}>
                                <div className="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
                                    <a href="#" className="no-line visiualisation-a">
                                        <h2 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Captures d'écran</h2>
                                        <ul className="d-flex list-unstyled mt-auto">
                                            <li className="me-auto">
                                                <i class="bi bi-easel" width="1em" height="1em"></i>
                                            </li>
                                            <li className="d-flex align-items-center me-3">
                                                <svg className="bi me-2" width="1em" height="1em"><use xlinkHref="#geo-fill" /></svg>
                                                <small>California</small>
                                            </li>
                                            <li className="d-flex align-items-center">
                                                <svg className="bi me-2" width="1em" height="1em"><use xlinkHref="#calendar3" /></svg>
                                                <small>5d</small>
                                            </li>
                                        </ul>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container px-4 py-5 " id="icon-grid">
                    <h2 className="pb-2 border-bottom">Commandes</h2>


                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 py-5 features-center">
                        <div className="col d-flex align-items-start features-box">
                            <i class="bi text-muted flex-shrink-0 me-3 bi-emoji-angry" ></i>
                            <a href="#" className="no-line">
                                <div id="features1">
                                    <h4 className="fw-bold mb-0">Commande 1</h4>
                                    <p className="">Paragraph of text beneath the heading to explain the heading.</p>
                                </div>
                            </a>
                        </div>
                        <div className="col d-flex align-items-start features-box">
                            <i class="bi text-muted flex-shrink-0 me-3 bi-emoji-dizzy" ></i>
                            <a href="#" className="no-line">
                                <div id="features2">
                                    <h4 className="fw-bold mb-0">Commannde 2</h4>
                                    <p>Paragraph of text beneath the heading to explain the heading.</p>
                                </div>
                            </a>
                        </div>
                        <div className="col d-flex align-items-start features-box">
                            <i class="bi text-muted flex-shrink-0 me-3 bi-emoji-astonished" ></i>
                            <a href="#" className="no-line">
                                <div id="features3">
                                    <h4 className="fw-bold mb-0">Commannde 3</h4>
                                    <p>Paragraph of text beneath the heading to explain the heading.</p>
                                </div>
                            </a>
                        </div>
                        <div className="col d-flex align-items-start features-box">
                            <i class="bi text-muted flex-shrink-0 me-3 bi-emoji-astonished" ></i>
                            <a href="#" className="no-line">
                                <div id="features4">
                                    <h4 className="fw-bold mb-0">Commannde 4</h4>
                                    <p>Paragraph of text beneath the heading to explain the heading.</p>
                                </div>
                            </a>
                        </div>
                        <div className="col d-flex align-items-start features-box">
                            <i class="bi text-muted flex-shrink-0 me-3 bi-emoji-expressionless" ></i>
                            <a href="#" className="no-line">
                                <div id="features5">
                                    <h4 className="fw-bold mb-0">Commannde 5</h4>
                                    <p>Paragraph of text beneath the heading to explain the heading.</p>
                                </div>
                            </a>
                        </div>
                        <div className="col d-flex align-items-start features-box">
                            <i class="bi text-muted flex-shrink-0 me-3 bi-emoji-frown" ></i>
                            <a href="#" className="no-line">
                                <div id="features6">
                                    <h4 className="fw-bold mb-0">Commannde 6</h4>
                                    <p>Paragraph of text beneath the heading to explain the heading.</p>
                                </div>
                            </a>
                        </div>
                        <div className="col d-flex align-items-start features-box">
                            <i class="bi text-muted flex-shrink-0 me-3 bi-emoji-wink" ></i>
                            <a href="#" className="no-line">
                                <div id="features7">
                                    <h4 className="fw-bold mb-0">Commannde 7</h4>
                                    <p>Paragraph of text beneath the heading to explain the heading.</p>
                                </div>
                            </a>
                        </div>
                        <div className="col d-flex align-items-start features-box">
                            <i class="bi text-muted flex-shrink-0 me-3 bi-emoji-smile" ></i>
                            <a href="#" className="no-line">
                                <div id="features8">
                                    <h4 className="fw-bold mb-0">Commannde 8</h4>
                                    <p>Paragraph of text beneath the heading to explain the heading.</p>
                                </div>
                            </a>
                        </div>
                        <div className="col d-flex align-items-start features-box">
                            <i class="bi text-muted flex-shrink-0 me-3 bi-emoji-smile-upside-down" ></i>
                            <a href="#" className="no-line">
                                <div id="features9">
                                    <h4 className="fw-bold mb-0">Commannde 9</h4>
                                    <p>Paragraph of text beneath the heading to explain the heading.</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

            </main>
        </>
    );
}

export default Features;