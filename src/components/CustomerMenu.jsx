import React, { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import axios from "axios";
import "../css/sideMenusStyles.css";
import "../css/loginStyles.css";
import "../css/customerStyles.css";
import "bootstrap/dist/css/bootstrap.css";
import Swal from "sweetalert2";

export const CustomerMenu = () => {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState([]);
  const [videoLink, setVideoLink] = useState("");
  const [selectedSong, setSelectedSong] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [showSendButton, setShowSendButton] = useState(false);

  const { user } = useParams();

  const handleSearch = async () => {
    try {
      const apiKey = "AIzaSyBw4jgs23bXQuANGJ24aGvoOfAUxrkWrMY";
      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            q: query,
            part: "snippet",
            type: "video",
            key: apiKey,
            maxResults: 10,
          },
        },
      );

      const decodedVideos = response.data.items.map((video) => ({
        ...video,
        snippet: {
          ...video.snippet,
          title: decodeURIComponent(video.snippet.title),
        },
      }));

      setVideos(decodedVideos);
      setShowSendButton(true);
    } catch (error) {
      console.error("Error al realizar la búsqueda:", error);
    }
  };

  const handleSend = async () => {
    try {
      if (videoLink && user && selectedSong) {
        const requestData = {
          link: videoLink,
          name_music: videos.find((video) => video.id.videoId === selectedSong)
            .snippet.title,
          table_name: user,
        };

        const response = await axios.post(
          "http://localhost:3001/music",
          requestData,
        );

        if (response.status === 201) {
          Swal.fire({
            title: "¡La música se envió correctamente!",
            width: 500,
            height: 200,
            padding: "3em",
            color: "aqua",
            background: "#fff url(/images/beer.gif)",
            confirmButtonColor: "aqua",
            confirmButtonTextColor: "white",
          });
        } else {
          console.log(
            "Error al enviar la música. Código de respuesta:",
            response.status,
          );
        }

        // Limpiar la selección después de enviar
        setVideoLink("");
        setSelectedSong(null);
      } else {
        Swal.fire({
          icon: "info",
          title: "Seleccione una canción ",
          text: "Seleccione una canción para enviar su solicitud",
        });
      }
    } catch (error) {
      console.error("Error al enviar la solicitud al backend:", error);
    }
  };

  const handleCheckboxSelect = (video) => {
    if (selectedSong === video.id.videoId) {
      // Deseleccionar si ya estaba seleccionado
      setVideoLink("");
      setSelectedSong(null);
    } else {
      // Seleccionar la canción
      setVideoLink(`https://www.youtube.com/watch?v=${video.id.videoId}`);
      setSelectedSong(video.id.videoId);
    }
  };

  const handleToggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleLogout = () => {
    console.log("Cerrar sesión...");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const Styles = {
    navItem: {
      textDecoration: "none",
      textAlign: "center",
    },
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App-header">
        <div className="header-icons">
          <div className="list-icon">
            <button
              className={`menu-button ${menuVisible ? "menu-visible" : ""}`}
              onClick={handleToggleMenu}
            >
              <i className="bi bi-list"></i>
            </button>
          </div>
          <div className="user-function">
            <label>¡PIDE TU MÚSICA!</label>
          </div>
          <div className="music-icon">
            <label>
              <br />
              MUSIC
              <br />
              BEER
            </label>
          </div>
        </div>
        <div className={`menu-dropdown ${menuVisible ? "visible" : ""}`}>
          <NavLink style={Styles.navItem} type="label" className="menu-item">
            <div className={`menu-card-header ${Styles.menu_side}`}>
              <i className="bi bi-person-circle fa-3x user_icon"></i> <br />{" "}
              <strong>{user}</strong>
            </div>
          </NavLink>
          <NavLink
            style={Styles.navItem}
            type="button"
            to="/"
            className="menu-item"
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right"></i>&emsp;Cerrar sesión
          </NavLink>
        </div>
      </div>
      <div className="App_body">
        <div className="Customer_app_content_body">
          <div className="input-group form-group">
            <div className="search_container">
              <div className="input_search">
                <div className="input-group-prepend"></div>
                <input
                  className="form-control input"
                  type="text"
                  placeholder="Busca tu música"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
              <div className="search_btn">
                <button className="btn_magnifying" onClick={handleSearch}>
                  <i className="bi bi-search magnifying"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="Results">
            <div className="Video_list">
              {videos.map((video) => (
                <div
                  key={video.id.videoId}
                  className={`Video_item ${
                    selectedSong === video.id.videoId ? "selected" : ""
                  }`}
                  onClick={() => handleCheckboxSelect(video)}
                >
                  <div className="video_img">
                    <img
                      src={video.snippet.thumbnails.default.url}
                      alt={video.snippet.title}
                    />
                  </div>
                  <div className="video_name">
                    <p>{video.snippet.title}</p>
                  </div>
                  <div className="video_select">
                    <input
                      type="checkbox"
                      id={`checkbox-${video.id.videoId}`}
                      name={`checkbox-${video.id.videoId}`}
                      value={`opcion-${video.id.videoId}`}
                      checked={selectedSong === video.id.videoId}
                      onChange={() => handleCheckboxSelect(video)}
                    />
                  </div>
                </div>
              ))}
            </div>
            {showSendButton && (
              <div className="Send_button">
                <input
                  type="button"
                  value="Enviar"
                  className="btn btn-primary btn_send"
                  onClick={handleSend}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </DndProvider>
  );
};
