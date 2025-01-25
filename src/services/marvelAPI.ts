import axios from "axios";

const API_KEY = "90fa5d814eb1df6a0a4e82347644b39c"; // Sustituye con tu clave de API
const BASE_URL = "https://gateway.marvel.com/v1/public";

export const getMarvelData = async (endpoint: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`, {
      params: {
        apikey: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener datos de Marvel", error);
    throw error;
  }
};
