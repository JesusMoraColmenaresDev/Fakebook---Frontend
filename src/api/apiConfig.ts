/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { isAxiosError } from "axios";

export const api = axios.create({
	baseURL: "http://localhost:3000",
});

// Interceptor para incluir el token en todas las solicitudes
api.interceptors.request.use(config => {
    // 1. Obtener el token del localStorage
    const token = localStorage.getItem('token');
    
    // 2. Si el token existe, añadirlo a la cabecera de Authorization
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    // 3. Devolver la configuración modificada para que la petición continúe
    return config;
}, error => {
    // Manejar errores de la petición
    return Promise.reject(error);
});