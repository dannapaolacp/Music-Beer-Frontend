import React, { useState, useEffect } from "react";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "../css/sideMenusStyles.css";
import "../css/listManagementStyles.css";
import "../css/profileStyles.css";
import "bootstrap/dist/css/bootstrap.css";

export const EmployeeProfile = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const { user } = useParams();
  const [userData, setUserData] = useState({ name: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);

  //Nav to profile
  const EmployeeProfile = `/EmployeeMenu/${user}/Profile`;

  //Nav to employee menu
  const navigate = useNavigate();
  const employeeMenu = `/EmployeeMenu/${user}`;

  const handleNavigation = () => {
    navigate(employeeMenu);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/user/employee")
      .then((response) => {
        if (response.data && response.data.length > 0) {
          const user = response.data[0];
          setUserData({ name: user.name, password: user.password });
        }
      })
      .catch((error) => {
        console.error("Error al mostrar datos de admin:", error);
        if (error.response) {
          console.log("Código de estado HTTP:", error.response.status);
          console.log("Respuesta del servidor:", error.response.data);
        }
      });
  }, []);

  const handleToggleMenu = () => {
    setMenuVisible(!menuVisible);
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
            <label>¡TUS DATOS!</label>
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
              to={employeeMenu}
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
              to={EmployeeProfile}
              className="menu-item"
              onClick={handleToggleMenu}
            >
              <i className="bi bi-person-fill"></i>&emsp;Perfil
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
        <div className="App_content_profile">
          <div className="d-flex justify-content-center h-100">
            <div className="card_profile">
              <div className="card_profile_header">
                <h4 className="title">Datos de usuario</h4>
              </div>
              <div className="data_output_content">
                <div className="input-group form-group user_name_profile">
                  <div className="input-group-prepend">
                    <span className="input-group-text input_group_prepend">
                      <i className="fas fa-user"></i>
                    </span>
                  </div>
                  <input
                    id="txtuser"
                    type="text"
                    className="form-control input"
                    required
                    value={userData.name}
                    disabled
                  />
                </div>
                <div className="input-group form-group user_password_profile">
                  <div className="input-group-prepend">
                    <span className="input-group-text input_group_prepend">
                      <i className="fas fa-key"></i>
                    </span>
                  </div>
                  <input
                    id="txtpassword"
                    type={passwordVisible ? "text" : "password"}
                    className="form-control"
                    required
                    value={userData.password}
                    disabled
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => setPasswordVisible(!passwordVisible)}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};
