const axios = require("axios");

const SWAPI_BASE_URL = process.env.SWAPI_BASE_URL;

// Get all characters with pagination
const getAllCharacters = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const peopleResponse = await axios.get(
      `${SWAPI_BASE_URL}/people?page=${page}&limit=${limit}`
    );
    const filmsResponse = await axios.get(`${SWAPI_BASE_URL}/films`);

    // Create a map of film details by character ID
    const filmsByCharacter = new Map();

    // Process all films and collect details for each character
    filmsResponse.data.result.forEach((film) => {
      film.properties.characters.forEach((charUrl) => {
        const charId = charUrl.split("/").pop();
        if (!filmsByCharacter.has(charId)) {
          filmsByCharacter.set(charId, []);
        }
        // Store all relevant film details
        filmsByCharacter.get(charId).push({
          title: film.properties.title,
          producer: film.properties.producer,
          episode_id: film.properties.episode_id,
          director: film.properties.director,
          release_date: film.properties.release_date,
          opening_crawl: film.properties.opening_crawl,
        });
      });
    });

    // Get the list of characters from the current page
    const characters = peopleResponse.data.results || [];

    // Fetch detailed information for each character
    const charactersWithDetails = await Promise.all(
      characters.map(async (char) => {
        try {
          const charId = char.uid;
          const detailResponse = await axios.get(
            `${SWAPI_BASE_URL}/people/${charId}`
          );

          return {
            ...detailResponse.data.result,
            films: filmsByCharacter.get(charId) || [],
          };
        } catch (error) {
          console.error(
            `Error fetching details for character ${char.uid}:`,
            error
          );
          return {
            ...char,
            films: filmsByCharacter.get(char.uid) || [],
          };
        }
      })
    );

    // Send the response with the modified data
    res.json({
      message: "ok",
      result: charactersWithDetails,
      total_records: peopleResponse.data.total_records,
      total_pages: peopleResponse.data.total_pages,
      previous: peopleResponse.data.previous,
      next: peopleResponse.data.next,
    });
  } catch (error) {
    console.error("Error fetching characters:", error);
    res.status(500).json({ message: "Error fetching characters" });
  }
};

// Get a specific character by ID
const getCharacterById = async (req, res) => {
  try {
    const { id } = req.params;
    const characterResponse = await axios.get(`${SWAPI_BASE_URL}/people/${id}`);

    // Get the character's homeworld
    const homeworldUrl = characterResponse.data.result.properties.homeworld;
    const homeworldResponse = await axios.get(homeworldUrl);

    // Initialize empty arrays and null values
    let filmTitles = [];
    let homeworld = null;

    // Get the character's homeworld if available
    if (homeworldResponse && homeworldResponse.data) {
      homeworld = homeworldResponse.data.result;
    }

    // Get all films and filter for this character
    const allFilmsResponse = await axios.get(`${SWAPI_BASE_URL}/films`);
    const characterId = characterResponse.data.result.uid;

    // Filter films where the character appears and extract film details
    filmTitles = allFilmsResponse.data.result
      .filter((film) =>
        film.properties.characters.some((charUrl) =>
          charUrl.includes(`/people/${characterId}`)
        )
      )
      .map((film) => ({
        title: film.properties.title,
        producer: film.properties.producer,
        episode_id: film.properties.episode_id,
        director: film.properties.director,
        release_date: film.properties.release_date,
        opening_crawl: film.properties.opening_crawl,
      }));

    // Combine all the data
    const character = {
      ...characterResponse.data.result,
      homeworld,
      films: filmTitles,
    };

    res.json(character);
  } catch (error) {
    console.error("Error fetching character details:", error);
    res.status(500).json({ message: "Error fetching character details" });
  }
};

// Search characters by name
const searchCharacters = async (req, res) => {
  try {
    const { name } = req.params;
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const peopleResponse = await axios.get(
      `${SWAPI_BASE_URL}/people?name=${name}&page=${page}&limit=${limit}`
    );
    const filmsResponse = await axios.get(`${SWAPI_BASE_URL}/films`);

    // Create a map of film details by character ID
    const filmsByCharacter = new Map();

    // Process all films and collect details for each character
    filmsResponse.data.result.forEach((film) => {
      film.properties.characters.forEach((charUrl) => {
        const charId = charUrl.split("/").pop();
        if (!filmsByCharacter.has(charId)) {
          filmsByCharacter.set(charId, []);
        }
        // Store all relevant film details
        filmsByCharacter.get(charId).push({
          title: film.properties.title,
          producer: film.properties.producer,
          episode_id: film.properties.episode_id,
          director: film.properties.director,
          release_date: film.properties.release_date,
          opening_crawl: film.properties.opening_crawl,
        });
      });
    });

    // Get the list of characters from the search results
    const characters = peopleResponse.data.result || [];

    // Fetch detailed information for each character
    const charactersWithDetails = await Promise.all(
      characters.map(async (char) => {
        try {
          const charId = char.uid;
          const detailResponse = await axios.get(
            `${SWAPI_BASE_URL}/people/${charId}`
          );

          // Get the character's homeworld
          const homeworldUrl = detailResponse.data.result.properties.homeworld;
          const homeworldResponse = await axios.get(homeworldUrl);

          return {
            ...detailResponse.data.result,
            homeworld: homeworldResponse.data.result,
            films: filmsByCharacter.get(charId) || [],
          };
        } catch (error) {
          console.error(
            `Error fetching details for character ${char.uid}:`,
            error
          );
          return {
            ...char,
            homeworld: null,
            films: filmsByCharacter.get(char.uid) || [],
          };
        }
      })
    );

    // Send the response with the modified data
    res.json({
      message: "ok",
      result: charactersWithDetails,
      total_records: peopleResponse.data.total_records,
      total_pages: peopleResponse.data.total_pages,
      previous: peopleResponse.data.previous,
      next: peopleResponse.data.next,
    });
  } catch (error) {
    console.error("Error searching characters:", error);
    res.status(500).json({ message: "Error searching characters" });
  }
};

module.exports = {
  getAllCharacters,
  getCharacterById,
  searchCharacters,
};
