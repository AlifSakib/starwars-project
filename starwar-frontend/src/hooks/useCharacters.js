import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchCharacters,
  fetchCharacterDetails,
  searchCharacters,
} from "../services/api";

export const useCharacters = (searchQuery = "") => {
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  // Update debounced value after 300ms of no changes
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const charactersQuery = useQuery({
    queryKey: ["characters", currentPage, debouncedSearchQuery],
    queryFn: () =>
      debouncedSearchQuery
        ? searchCharacters(debouncedSearchQuery, currentPage)
        : fetchCharacters(currentPage),
    keepPreviousData: true,
  });

  return {
    characters: charactersQuery.data?.results || [],
    isLoading: charactersQuery.isLoading,
    error: charactersQuery.error,
    currentPage,
    setCurrentPage,
    totalPages: charactersQuery.data?.total_pages || 1,
  };
};

export const useCharacterDetails = (characterId) => {
  return useQuery({
    queryKey: ["character", characterId],
    queryFn: () => fetchCharacterDetails(characterId),
    enabled: !!characterId,
  });
};
