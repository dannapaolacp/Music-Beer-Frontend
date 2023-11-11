import React, { useState, useEffect } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import axios from "axios";
import YouTube from "react-youtube";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "../css/sideMenusStyles.css";
import "../css/listManagementStyles.css";
import "bootstrap/dist/css/bootstrap.css";

const ItemType = "MUSIC";

const DraggableItem = ({ music, index, moveItem }) => {
  const [{ isDragging }, ref] = useDrag({
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

  const [videoName, setVideoName] = useState("");

  useEffect(() => {
    const extractVideoName = async () => {
      try {
        const videoId = extractVideoId(music.link);
        const apiKey = "AIzaSyDGlwFZ-INUDovUHWOJ6MK9Uc19zOm6mMk"; // Reemplaza con tu clave de API
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`,
        );
        const title = response.data.items[0].snippet.title;
        setVideoName(title);
      } catch (error) {
        console.error("Error fetching video name", error);
        setVideoName("Nombre de la canción desconocido");
      }
    };

    extractVideoName();
  }, [music.link]);

  const extractVideoId = (url) => {
    const match = url.match(/[?&]v=([^?&]+)/);
    return match ? match[1] : null;
  };

  return (
    <div
      ref={(node) => ref(drop(node))}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="App_music_playlist">
        <div className="first">
          <a href={music.link}></a>
          &emsp; &emsp;
          <div className="table_name">{music.table_name}</div>
          &emsp;
          <div className="music_name">{videoName}</div>
        </div>
      </div>
    </div>
  );
};

export const AdministratorMenu = () => {
  const [playlist, setPlaylist] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [menuVisible, setMenuVisible] = useState(false);
  const [subMenuVisible, setSubMenuVisible] = useState(false);
  const { user } = useParams();

  //Nav to createTbles
  const createTables = `/AdministratorMenu/${user}/CreateTables`;

  //Nav to consultTables
  const consultTables = `/AdministratorMenu/${user}/ConsultTables`;

  //Nav to profile
  const administratorProfile = `/AdministratorMenu/${user}/Profile`;

  const extractVideoId = (url) => {
    const match = url.match(/[?&]v=([^?&]+)/);
    return match ? match[1] : null;
  };

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await axios.get("http://localhost:3001/music");

        setPlaylist(response.data);
      } catch (error) {
        console.error("Error fetching playlist", error);
      }
    };

    fetchPlaylist();
  }, []);

  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  const moveItem = (fromIndex, toIndex) => {
    const updatedPlaylist = [...playlist];
    const [movedItem] = updatedPlaylist.splice(fromIndex, 1);
    updatedPlaylist.splice(toIndex, 0, movedItem);
    setPlaylist(updatedPlaylist);
  };

  if (playlist.length === 0) {
    return <div>Loading...</div>;
  }

  const currentVideo = playlist[currentVideoIndex];
  const currentVideoId = extractVideoId(currentVideo.link);

  const handleToggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleToggleSubMenu = () => {
    setSubMenuVisible(!subMenuVisible);
  };

  const handleLogout = () => {
    // Agrega lógica para cerrar sesión aquí, si es necesario
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
            <label>¡SUPERVISIÓN MUSICAL!</label>
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
        <div>
          <div className={`menu-dropdown ${menuVisible ? "visible" : ""}`}>
            <NavLink style={Styles.navItem} type="label" className="menu-item">
              <div className={`menu-card-header ${Styles.menu_side}`}>
                <i className="bi bi-person-circle fa-3x user_icon"></i> <br />{" "}
                <strong>{user}</strong>
              </div>
            </NavLink>
            <NavLink
              style={Styles.navItem}
              to={administratorProfile}
              className="menu-item"
              onClick={handleToggleMenu}
            >
              <i className="bi bi-person-fill"></i>&emsp;Perfil
            </NavLink>
            <NavLink
              style={Styles.navItem}
              className={`submenu ${
                subMenuVisible ? "menu-visible" : ""
              } menu-item`}
              onClick={handleToggleSubMenu}
            >
              <i className="bi bi-people-fill"></i>&emsp;Mesas
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
          <div
            className={`submenu-dropdown ${subMenuVisible ? "visible" : ""}`}
          >
            <Link
              style={Styles.navItem}
              to={createTables}
              onClick={handleToggleSubMenu}
              className="submenu-item"
            >
              <i className="bi bi-person-fill-add"></i>&emsp;Crear mesa
            </Link>
            <NavLink
              style={Styles.navItem}
              to={consultTables}
              onClick={handleToggleSubMenu}
              className="submenu-item"
            >
              <i className="bi bi-person-lines-fill"></i>&emsp;Consultar mesas
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
              <h2>{currentVideo.title}</h2>
              <div className="playlist_buttons"></div>
              <div className="App_playlist">
                <div className="App_playlist_index">
                  {playlist.map((music, index) => (
                    <DraggableItem
                      key={index}
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
      </div>
    </DndProvider>
  );
};
