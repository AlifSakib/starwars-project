import { XMarkIcon } from "@heroicons/react/24/outline";
import { useCharacterDetails } from "../hooks/useCharacters";

const CharacterDetails = ({ characterId, onClose }) => {
  const { data: character, isLoading } = useCharacterDetails(characterId);

  if (!characterId) return null;

  return (
    <div className="relative z-10">
      <div className="fixed inset-0 bg-gray-500/75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              {/* Close button - always visible */}
              <button
                onClick={onClose}
                className="absolute top-2 right-2 p-2 rounded-full bg-red-500/80 backdrop-blur-sm hover:bg-red-500/90 transition-colors duration-200 shadow-md z-20"
              >
                <XMarkIcon className="h-5 w-5 text-white/80 hover:text-white/90" />
              </button>

              {isLoading ? (
                <div className="space-y-6 animate-pulse">
                  {/* Skeleton for Image */}
                  <div className="relative w-full h-64">
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-lg" />
                  </div>

                  {/* Skeleton for Character Info */}
                  <div className="px-2">
                    {/* Name skeleton */}
                    <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-4" />

                    {/* Details skeleton */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="space-y-1">
                            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
                            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                          </div>
                        ))}
                      </div>
                      <div className="space-y-2">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="space-y-1">
                            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
                            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Films skeleton */}
                    <div className="mt-6">
                      <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                      <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className="h-16 bg-gray-200 dark:bg-gray-700 rounded"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : character ? (
                <div className="space-y-6">
                  {/* Character Image */}
                  <div className="relative w-full h-64">
                    <img
                      src={`./src/assets/static/assets/img/people/${characterId}.jpg`}
                      alt={character.name}
                      className="w-full h-full object-cover relative rounded-lg shadow-lg"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/400x400?text=No+Image";
                      }}
                    />
                  </div>

                  {/* Character Info */}
                  <div className="px-2">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {character.name}
                    </h3>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <p>
                          <span className="font-semibold text-gray-700">
                            Birth Year:
                          </span>{" "}
                          <span className="text-gray-600">
                            {character.birth_year}
                          </span>
                        </p>
                        <p>
                          <span className="font-semibold text-gray-700">
                            Height:
                          </span>{" "}
                          <span className="text-gray-600">
                            {character.height}cm
                          </span>
                        </p>
                        <p>
                          <span className="font-semibold text-gray-700">
                            Mass:
                          </span>{" "}
                          <span className="text-gray-600">
                            {character.mass}kg
                          </span>
                        </p>
                        <p>
                          <span className="font-semibold text-gray-700">
                            Gender:
                          </span>{" "}
                          <span className="text-gray-600">
                            {character.gender}
                          </span>
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p>
                          <span className="font-semibold text-gray-700">
                            Hair Color:
                          </span>{" "}
                          <span className="text-gray-600">
                            {character.hair_color}
                          </span>
                        </p>
                        <p>
                          <span className="font-semibold text-gray-700">
                            Eye Color:
                          </span>{" "}
                          <span className="text-gray-600">
                            {character.eye_color}
                          </span>
                        </p>
                        <p>
                          <span className="font-semibold text-gray-700">
                            Skin Color:
                          </span>{" "}
                          <span className="text-gray-600">
                            {character.skin_color}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Films Section */}
                    <div className="mt-6">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Appears in:
                      </h4>
                      <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
                        {character.films?.map((film) => (
                          <div
                            key={film.episode}
                            className="bg-gray-50 p-2 rounded"
                          >
                            <p className="font-medium text-gray-900">
                              {film.title}
                            </p>
                            <p className="text-xs text-gray-500">
                              Episode {film.episode} • Released{" "}
                              {new Date(film.release_date).getFullYear()}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-red-500">
                  Error loading character details
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;
