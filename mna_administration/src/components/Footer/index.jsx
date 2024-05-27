import React from 'react';
import './awesonicon.css';

function Footer() {
    return (
        <>
            <footer className="text-center text-lg-start bg-body-tertiary text-muted">

                <section className="mt-5" id="footer-bg-section-1">
                    <br></br>
                    <div className="container text-center text-md-start mt-10">
                        <div className="row mt-3">
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    <i className="fas fa-gem me-3"></i>MNAD0D
                                </h6>
                                <p>
                                    Le rat est un animal qui a une très mauvaise réputation. Il est souvent associé à la saleté, à la maladie et à la mort. Pourtant, le rat est un animal fascinant qui mérite d'être mieux connu. C'est pourquoi nous avons créé cette application pour vous permettre de découvrir le rat sous un nouveau jour.
                                </p>
                            </div>


                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                                <p>
                                    <a href="https://github.com/NAywvi" className="me-4 text-reset">
                                        <i className="fab fa-github"></i>
                                    </a> Github
                                </p>
                                <p>
                                    <a href="https://nlkakhdari.fr" className="me-4 text-reset">
                                        <i className="fas fa-globe"></i>
                                    </a>
                                    N'hésite pas à me contacter.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="text-center p-4" id="footer-bg-section-2">
                    © 2024 Copyright :
                    <a className="text-reset fw-bold" href="http://nlakhdari.fr/"> nlakhdari.fr</a>
                </div>
            </footer>
        </>
    );
}

export default Footer;
