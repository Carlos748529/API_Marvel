import axios from "axios";

const API_KEY = "90fa5dc16251e7266d0f7281d475da99fd645c329fbc8d"; // Sustituye con tu clave de API
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
