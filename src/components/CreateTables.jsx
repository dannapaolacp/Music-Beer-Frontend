import React, { useState } from "react";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "../css/sideMenusStyles.css";
import "../css/listManagementStyles.css";
import "../css/createTablesStyles.css";
import "bootstrap/dist/css/bootstrap.css";
import Swal from "sweetalert2";

export const CreateTables = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [subMenuVisible, setSubMenuVisible] = useState(false);
  const { user } = useParams();
  const [passwordVisible, setPasswordVisible] = useState(false);

  //Nav to createTbles
  const createTables = `/AdministratorMenu/${user}/CreateTables`;

  //Nav to consultTables
  const consultTables = `/AdministratorMenu/${user}/ConsultTables`;

  //Nav to administrator menu
  const navigate = useNavigate();
  const administratorMenu = `/AdministratorMenu/${user}`;

  const handleNavigation = () => {
    navigate(administratorMenu);
  };

  //Nav to profile
  const administratorProfile = `/AdministratorMenu/${user}/Profile`;

  //create user table
  const [users, setUsers] = useState({
    id: "",
    name: "",
    password: "",
    rol: "3",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUsers({ ...users, [name]: value });
  };

  const handleUserCreate = async () => {
    try {
      const response = await fetch("http://localhost:3001/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(users),
      });

      if (response.ok) {
        let name = document.getElementById("txtName").value;
        document.getElementById("txtId").value = "";
        document.getElementById("txtName").value = "";
        document.getElementById("txtPassword").value = "";
        document.getElementById("txtId").focus();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${name} creada exitosamente`,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        console.error("Error al crear usuario: ", response.statusText);
      }
    } catch (error) {
      console.error("Error al realizar la solicitud: ", error);
    }
  };

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

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
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
            <label>¡CREA TUS MESAS!</label>
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
            <div className="card_profile">
              <div className="card_profile_header">
                <h5 className="title">Creación de mesa</h5>
              </div>
              <div className="data_output_content">
                <div className="input-group form-group user_id">
                  <div className="input-group-prepend">
                    <span className="input-group-text input_group_prepend">
                      <i className="bi bi-person-vcard"></i>
                    </span>
                  </div>
                  <input
                    id="txtId"
                    name="id"
                    type="number"
                    className="form-control input"
                    placeholder="id"
                    value={users.id}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="input-group form-group user_name">
                  <div className="input-group-prepend">
                    <span className="input-group-text input_group_prepend">
                      <i className="fas fa-user"></i>
                    </span>
                  </div>
                  <input
                    id="txtName"
                    name="name"
                    type="text"
                    className="form-control input"
                    placeholder="name"
                    value={users.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="input-group form-group user_password">
                  <div className="input-group-prepend">
                    <span className="input-group-text input_group_prepend">
                      <i className="fas fa-key"></i>
                    </span>
                  </div>
                  <input
                    id="txtPassword"
                    name="password"
                    className="form-control"
                    type={passwordVisible ? "text" : "password"}
                    value={users.password}
                    onChange={handleInputChange}
                    required
                    placeholder="password"
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={togglePasswordVisibility}
                    >
                      <i
                        className={`fas ${
                          passwordVisible ? "fa-eye-slash" : "fa-eye"
                        }`}
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="form-group button">
                <button onClick={handleNavigation} className="back_btn">
                  Regresar
                </button>
                <button className="create_btn" onClick={handleUserCreate}>
                  Crear
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};
