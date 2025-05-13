import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const fetchCharacters = async (page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/characters`, {
      params: {
        page,
        limit: 10,
      },
    });
    return {
      ...response.data,
      results: response.data.result.map((char) => ({
        ...char,
        details: char.properties,
        films: char.films,
      })),
      total_records: response.data.total_records,
      total_pages: response.data.total_pages,
    };
  } catch (error) {
    console.error("Error fetching characters:", error);
    throw error;
  }
};

export const fetchCharacterDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/characters/${id}`);
    return {
      ...response.data.properties,
      films: response.data.films,
      homeworld: response.data.homeworld,
    };
  } catch (error) {
    console.error(`Error fetching character ${id} details:`, error);
    throw error;
  }
};

export const searchCharacters = async (query, page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/characters/search/${query}`, {
      params: {
        page,
        limit: 10,
      },
    });
    return {
      ...response.data,
      results: response.data.result.map((char) => ({
        ...char,
        details: char.properties,
        films: char.films,
      })),
      total_records: response.data.total_records,
      total_pages: response.data.total_pages,
    };
  } catch (error) {
    console.error("Error searching characters:", error);
    return { results: [] };
  }
};
