import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "../css/consultTablesStyles.css";
import Swal from "sweetalert2";

const UserTable = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userList, setUserList] = useState([]);

  //return tables

  useEffect(() => {
    fetch("http://localhost:3001/user/table")
      .then((response) => response.json())
      .then((data) => setUserList(data))
      .catch((error) => console.error("Error al cargar usuarios", error));
  }, []);

  //password visibility

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleDelete = async (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success ml-4",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    const result = await swalWithBootstrapButtons.fire({
      title: "¿Estas seguro de eliminar?",
      text: "No podrás revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "¡Si, eliminar!",
      cancelButtonText: "¡No, cancelar!",
      reverseButtons: true,
    });
    if (result.isConfirmed) {
      try {
        const response = await axios.delete(`http://localhost:3001/user/${id}`);
        if (response.status === 200) {
          setUserList(userList.filter((user) => user.id !== id));
          console.log("Eliminación exitosa ", response.status);
          swalWithBootstrapButtons.fire({
            title: "¡Eliminado!",
            text: "La mesa fue eliminada exitosamente.",
            icon: "success",
          });
        }
      } catch (error) {
        console.error("Error al eliminar mesa: ", error);
        Swal.fire({
          title: "Error",
          text: "Ocurrió un error al eliminar la mesa.",
          icon: "error",
        });
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      swalWithBootstrapButtons.fire({
        title: "¡Cancelado!",
        text: "Eliminación cancelada.",
        icon: "error",
      });
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Contraseña</th>
          <th>Eliminar</th>
          <th>
            <button className="eye" onClick={togglePasswordVisibility}>
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </th>
          {/* Agrega más encabezados de columnas según tus datos */}
        </tr>
      </thead>
      <tbody>
        {userList.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{showPassword ? user.password : "••••••••"}</td>
            <td>
              <button
                className="trash_can"
                onClick={() => handleDelete(user.id)}
              >
                <i className="bi bi-trash-fill"></i>
              </button>
            </td>
            <td></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
