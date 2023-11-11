import React, { useState } from "react";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import UserTable from "./userTable";
import "../css/sideMenusStyles.css";
import "../css/listManagementStyles.css";
import "../css/consultTablesStyles.css";
import "bootstrap/dist/css/bootstrap.css";

export const ConsultTables = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [subMenuVisible, setSubMenuVisible] = useState(false);
  const { user } = useParams();

  //Nav to createTbles
  const createTables = `/AdministratorMenu/${user}/CreateTables`;

  //Nav to consultTables
  const consultTables = `/AdministratorMenu/${user}/ConsultTables`;

  //nav to administrator menu
  const navigate = useNavigate();
  const administratorMenu = `/AdministratorMenu/${user}`;

  const handleNavigation = () => {
    navigate(administratorMenu);
  };

  //Nav to profile
  const administratorProfile = `/AdministratorMenu/${user}/Profile`;

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
            <label>¡TUS MESAS!</label>
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
            <NavLink
              style={Styles.navItem}
              to={administratorMenu}
              type="label"
              className="menu-item"
            >
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
            <NavLink
              style={Styles.navItem}
              to={createTables}
              onClick={handleToggleSubMenu}
              className="submenu-item"
            >
              <i className="bi bi-person-fill-add"></i>&emsp;Crear mesa
            </NavLink>
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
        <div className="App_content_profile">
          <div className="d-flex justify-content-center h-100">
            <div className="card_consult_tables">
              <div className="card_profile_header">
                <h5 className="title">Mesas existentes</h5>
              </div>
              <div className="data_output_tables_content">
                <UserTable />
              </div>
              <div className="form-group button">
                <button onClick={handleNavigation} className="back_btn">
                  Regresar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};
