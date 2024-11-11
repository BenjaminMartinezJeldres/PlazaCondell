// src/app/models/user.model.ts
export interface UserData {
    id: string;       // ID del usuario en la base de datos
    role: string;     // Rol del usuario (admin o cliente)
    email?: string;   // Correo electrónico del usuario
    name:string;       //Nombre del usuario
  }
  