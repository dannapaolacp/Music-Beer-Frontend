import React, { useState,useEffect } from "react";
import "../css/loginStyles.css";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);


  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");
    const storedRememberMe = localStorage.getItem("rememberMe");

    if (storedRememberMe && storedRememberMe === "true") {
      setName(storedUsername || "");
      setPassword(storedPassword || "");
      setRememberMe(true);
      document.getElementById("txtuser").value = storedUsername || "";
      document.getElementById("txtpassword").value = storedPassword || "";
    }
  }, []);

  function logIn(e) {
    e.preventDefault();
    let txtuser = document.getElementById("txtuser").value;
    let txtpassword = document.getElementById("txtpassword").value;

    if (txtuser.length === 0 || txtpassword.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Campos vacios",
        text: "Complete los datos faltantes.",
      });
    } else {
      const data = {
        name: name,
        password: password,
      };

      axios
        .post("http://localhost:3001/login", data)
        .then((response) => {
          if (rememberMe) {
            localStorage.setItem("username", name);
            localStorage.setItem("password", password);
            localStorage.setItem("rememberMe", "true");
          } else {
            localStorage.removeItem("username");
            localStorage.removeItem("password");
            localStorage.removeItem("rememberMe");
          }

          if (response.data.rol === 1) {
            document.getElementById("container").style.display = "none";
            navigate(`/AdministratorMenu/${name}`);
          } else if (response.data.rol === 2) {
            document.getElementById("container").style.display = "none";
            navigate(`/EmployeeMenu/${name}`);
          } else if (response.data.rol === 3) {
            document.getElementById("container").style.display = "none";
            navigate(`/CustomerMenu/${name}`);
          }

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Inicio de sesión exitoso",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((error) => {

          if (error.response) {
            if (error.response.status === 404) {
              document.getElementById("txtuser").value = "";
              document.getElementById("txtpassword").value = "";
              document.getElementById("txtuser").focus();
              Swal.fire({
                icon: "error",
                title: "Datos erroneos",
                text: "Usuario o contraseña incorrectos",
              });
            }
          }
        });
    }
  }

  return (
    <div id="container" className="container">
      <div id="card" className="d-flex justify-content-center h-100">
        <div className="card">
          <div className="card_header">
            <h3 className="title">Iniciar sesión</h3>
          </div>
          <div className="card-body">
            <form id="form_login">
              <div className="data_input_content">
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text input_group_prepend">
                      <i className="fas fa-user"></i>
                    </span>
                  </div>
                  <input
                    id="txtuser"
                    type="text"
                    className="form-control input"
                    placeholder="usuario"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text input_group_prepend">
                      <i className="fas fa-key"></i>
                    </span>
                  </div>
                  <input
                    id="txtpassword"
                    type={passwordVisible ? "text" : "password"}
                    className="form-control"
                    placeholder="contraseña"
                    onChange={(e) => setPassword(e.target.value)}
                    required
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
                <div className="form-check remember">
                  <input
                    className="form-check-input remember_input"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  Recordarme
                </div>
                <div className="form-group button">
                  <input
                    type="submit"
                    value="Ingresar"
                    className="login_btn"
                    onClick={logIn}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-center">
              <a className="link" href="#">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
