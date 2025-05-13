import React from "react";

const CharacterCard = ({ character, onClick }) => {
  const { properties, uid, films } = character;

  return (
    <div
      onClick={() => onClick(uid)}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer
                transform transition-all duration-200 hover:scale-105 hover:shadow-xl"
    >
      <div className="relative aspect-[3/4] bg-gray-200">
        <img
          src={`./src/assets/static/assets/img/people/${uid}.jpg`}
          alt={properties.name}
          className="object-cover w-full h-full"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400x400?text=No+Image";
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
          {properties.name}
        </h3>
        <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
          <p>Birth Year: {properties.birth_year}</p>
          <p>Gender: {properties.gender}</p>
          <p>Height: {properties.height}cm</p>
        </div>
        {films && films.length > 0 && (
          <div className="mt-3 space-y-2">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Appears in:
            </h4>
            <div className="space-y-1">
              {films.slice(0, 2).map((film) => (
                <div
                  key={film.episode_id}
                  className="text-xs bg-gray-100 dark:bg-gray-700 p-1.5 rounded"
                >
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {film.title}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    Episode {film.episode_id} •{" "}
                    {new Date(film.release_date).getFullYear()}
                  </p>
                </div>
              ))}
              {films.length > 2 && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  +{films.length - 2} more films
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterCard;
