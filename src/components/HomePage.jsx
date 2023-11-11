import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Link } from "react-router-dom";
import "../css/homePage.css";
import CarouselComponent from "./CarouselComponent";

export const HomePage = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App-home">
        <div className="homepage-header">
          <div className="site_title">
            <label>
              <i className="bi bi-music-note-beamed"></i>&emsp;Music Beer
            </label>
          </div>
          <div className="site_options">
            <nav>
              <ul>
                <li>
                  <Link to="/Login">
                    Iniciar sesión &emsp;
                    <i className="bi bi-person-circle"></i>
                  </Link>{" "}
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="App_content_home">
          <div className="d-flex justify-content-center h-100">
            <div className="card_home">
              <h1>
                <span className="text_border">MUSIC BEER</span>
              </h1>
              <div className="img_home">
                {/* <img src={Beer} alt="Beer" /> */}
                <CarouselComponent />
              </div>
              <div className="text_home">
                <p>
                  ¡Realiza la gestión musical de tu gastrobar mucho mejor con
                  Music Beer!
                </p>
                <Link to="/Login">
                  <button className="start_btn">¡Empezar!</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};
