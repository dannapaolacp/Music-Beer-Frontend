import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import YouTube from "react-youtube";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "../css/sideMenusStyles.css";
import "../css/listManagementStyles.css";
import "../css/spinnerLoading.css";
import "bootstrap/dist/css/bootstrap.css";
import SpinnerLoading from "./SpinnerLoading";

const ItemType = "MUSIC";

const DraggableItem = ({ music, index, moveItem }) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))} style={{ opacity: 1 }}>
      <div className="App_music_playlist">
        <div className="first">
          <a href={music.link}></a>
          &emsp;
          <div className="music_options">
            <div>
              <button>
                <i className="bi bi-check"></i>
              </button>
            </div>
            <div>
              <button>
                <i className="bi bi-x"></i>
              </button>
            </div>
          </div>
          &emsp;
          <div className="table_name">{music.table_name}</div>
          <div className="music_name">{music.name}</div>
        </div>
        <div className="second">
          <i className="bi bi-list"></i>
          &emsp;
        </div>
      </div>
    </div>
  );
};

export const EmployeeMenu = () => {
  const [playlist, setPlaylist] = useState(() => {
    const storedPlaylist = localStorage.getItem("playlist");
    return storedPlaylist ? JSON.parse(storedPlaylist) : [];
  });
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [menuVisible, setMenuVisible] = useState(false);
  const [hasNewSongs, setHasNewSongs] = useState(false); // Nueva variable de estado
  const { user } = useParams();
  const EmployeeProfile = `/EmployeeMenu/${user}/Profile`;

  useEffect(() => {
    const intervalId = setInterval(() => {
      const fetchUpdatedPlaylist = async () => {
        try {
          const response = await axios.get("http://localhost:3001/music");
          const newSongs = response.data.filter(
            (newSong) => !playlist.some((song) => song.id === newSong.id),
          );
          if (newSongs.length > 0) {
            // Solo actualiza la lista si hay nuevas canciones
            const updatedPlaylist = [...playlist, ...newSongs];
            setPlaylist(updatedPlaylist);
            localStorage.setItem("playlist", JSON.stringify(updatedPlaylist));
            setHasNewSongs(true);
          }
        } catch (error) {
          console.error("Error fetching updated playlist", error);
        }
      };

      fetchUpdatedPlaylist();
    }, 5000); // Actualiza cada 5 segundos, ajusta según tus necesidades

    return () => clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonta
  }, [playlist]);

  useEffect(() => {
    // Si volvemos de la página de perfil y no hay nuevas canciones, evitamos la actualización
    if (!hasNewSongs) {
      return;
    }

    // Lógica adicional para manejar las nuevas canciones según sea necesario
    // ...

    // Limpia el estado de "hasNewSongs" después de manejar las nuevas canciones
    setHasNewSongs(false);
  }, [hasNewSongs]);

  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  const moveItem = (fromIndex, toIndex) => {
    const updatedPlaylist = [...playlist];
    const [movedItem] = updatedPlaylist.splice(fromIndex, 1);
    updatedPlaylist.splice(toIndex, 0, movedItem);
    setPlaylist(updatedPlaylist);
    localStorage.setItem("playlist", JSON.stringify(updatedPlaylist));
  };

  const handlePrevious = () => {
    setCurrentVideoIndex(
      (prevIndex) => (prevIndex - 1 + playlist.length) % playlist.length,
    );
  };

  const handleNext = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  if (playlist.length === 0) {
    return (
      <div className="App_body">
        <SpinnerLoading />
      </div>
    );
  }

  const currentVideo = playlist[currentVideoIndex];
  const currentVideoId = currentVideo.link.split("v=")[1];

  const handleToggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleLogout = () => {
    console.log("Cerrar sesión...");
  };

  const Styles = {
    navItem: {
      textDecoration: "none",
      textAlign: "center",
    },
  };

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
      key: "AIzaSyDGlwFZ-INUDovUHWOJ6MK9Uc19zOm6mMk",
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
            <label>¡GESTIÓN MUSICAL!</label>
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
            to={EmployeeProfile}
            className="menu-item"
            onClick={handleToggleMenu}
          >
            <i className="bi bi-person-fill"></i>&emsp;Perfil
          </NavLink>
          <NavLink
            style={Styles.navItem}
            to="/"
            type="button"
            className="menu-item"
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right"></i>&emsp;Cerrar sesión
          </NavLink>
        </div>
      </div>
      <div className="App_body">
        <div className="App_content_body">
          <div className="App_video">
            <YouTube
              videoId={currentVideoId}
              opts={opts}
              onEnd={handleVideoEnd}
            />
          </div>
          <div className="App_playlist_content">
            <h2>{currentVideo.name}</h2>
            <div className="playlist_buttons">
              <button className="" onClick={handlePrevious}>
                Anterior
              </button>
              <button onClick={handleNext}>Siguiente</button>
            </div>
            <div className="App_playlist">
              <div className="App_playlist_index">
                {playlist.map((music, index) => (
                  <DraggableItem
                    key={music.id}
                    music={music}
                    index={index}
                    moveItem={moveItem}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};
