'use client';

import axios from "axios";
import { useState } from "react";
import { Stack, TextField, Button,  typography } from "@mui/material";

import UserTable from "./UserTable/page";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({});

  const getData = async () => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users");
      console.log("Datos obtenidos exitosamente:", response.data);
      setUsers(response.data); // Actualizar el estado con los datos obtenidos
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  const postData = async () => {
    try {
      const response = await axios.post("https://jsonplaceholder.typicode.com/post/1", newUser);
      console.log("Nuevo usuario creado:", response.data);
      getData(); // Actualizar la lista de usuarios después de crear uno nuevo
    } catch (error) {
      console.error("Error al crear el usuario:", error);
    }
  };

  

  
  // const postData = async () => {
  //   try {
  //       body: 'Peticiones HTTP con Axios',
  //       userId: 1
  //     }
  //     console.log("Dato creado:", response, body);
  //   } catch (error) {
  //     console.error("Error al crear el dato:", error);
  //   }const response = await axios.post("https://jsonplaceholder.typicode.com/posts", newUser);
  //     const body = {
  //       id: 1,
  //       title: 'Tecnologias de la Informacion',
      
  // };

  const updateUser = async (userId, updatedUserData) => {
    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${userId}`, updatedUserData);
      console.log("Usuario actualizado:", response.data);
      getData(); // Actualizar la lista de usuarios después de actualizar uno
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    }
  };

  // Función para eliminar un usuario
  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${userId}`);
      console.log("Usuario eliminado:", response.data);
      getData(); // Actualizar la lista de usuarios después de eliminar uno
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <Button variant="contained" onClick={getData}>Obtener Usuarios</Button>
      <Stack direction="row" spacing={2} alignItems="center">
        <TextField label="ID" onChange={(e) => setNewUser({ ...newUser, id: e.target.value })} />
        <TextField label="Nombre" onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
        <TextField label="Email" onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
        <Button variant="contained" onClick={postData}>Crear Usuario</Button>
      </Stack>
      <UserTable users={users} updateUser={updateUser} deleteUser={deleteUser} />
    </div>
  );
}