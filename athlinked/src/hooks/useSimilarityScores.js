import { useState, useEffect } from 'react';
import {
  calculateSimilarityScores,
  preparePlayerDataForSimilarity,
  prepareRequirementsFromTeamProfile,
  getPlayersFromDataset
} from '../services/apiClient';

/**
 * Custom hook to fetch and manage similarity scores for players
 * 
 * @param {Array} players - The list of players to calculate scores for (optional if useDataset=true)
 * @param {Array} teamRequirements - The team's requirements from the profile (optional)
 * @param {boolean} isTeam - Whether the current user is logged in as a team
 * @param {Object} options - Additional options for the hook
 * @param {boolean} options.useDataset - Whether to use players from the backend dataset
 * @param {string} options.positionFilter - Position filter for dataset players 
 * @param {string} options.teamFilter - Team filter for dataset players
 * @returns {Object} - An object containing players with scores and loading/error states
 */
const useSimilarityScores = (players = [], teamRequirements = [], isTeam, options = {}) => {
  const [playersWithScores, setPlayersWithScores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [backendAvailable, setBackendAvailable] = useState(true);

  // Check if we should use players from the dataset
  const useDataset = options.useDataset || false;

  // Function to fetch scores from backend
  const fetchSimilarityScores = async () => {
    // Only fetch if user is a team and we have players (or we're using the dataset)
    if (!isTeam || (!players?.length && !useDataset)) {
      // If not a team user, just pass the players through without calculating scores
      setPlayersWithScores(players);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      let requirements = null;
      
      // If user has team requirements, prepare them, otherwise use the database
      if (teamRequirements?.length) {
        requirements = prepareRequirementsFromTeamProfile(teamRequirements);
      }
      
      let calculatedScores;
      
      if (useDataset) {
        // Use dataset approach - let the backend handle player data
        calculatedScores = await calculateSimilarityScores(
          null, 
          requirements,
          {
            useDataset: true,
            position: options.positionFilter,
            team: options.teamFilter,
            limit: options.limit || 50
          }
        );
        
        // Set players directly from the result
        setPlayersWithScores(calculatedScores.map(player => ({
          ...player,
          similarityScore: player.similarity_score,
          positionScores: player.position_scores,
          bestPositionMatch: player.best_position_match,
          strengths: player.best_position_match?.strengths || [],
          weaknesses: player.best_position_match?.weaknesses || []
        })));
      } else {
        // Use frontend approach - send prepared players to the backend
        const preparedPlayers = preparePlayerDataForSimilarity(players);
        
        // Call the API with prepared players
        calculatedScores = await calculateSimilarityScores(
          preparedPlayers, 
          requirements
        );
        
        // Merge the calculated scores with original player data
        const mergedPlayers = players.map(player => {
          const playerWithScore = calculatedScores.find(p => p.id === player.id);
          if (playerWithScore) {
            return {
              ...player,
              similarityScore: playerWithScore.similarity_score,
              positionScores: playerWithScore.position_scores,
              bestPositionMatch: playerWithScore.best_position_match,
              strengths: playerWithScore.best_position_match?.strengths || [],
              weaknesses: playerWithScore.best_position_match?.weaknesses || []
            };
          }
          return player;
        });
        
        setPlayersWithScores(mergedPlayers);
      }
      
      setBackendAvailable(true);
    } catch (error) {
      console.error('Error fetching similarity scores:', error);
      setError(error.message);
      setBackendAvailable(false);
      
      if (useDataset) {
        // Try to fetch players from dataset without similarity calculation
        try {
          const datasetPlayers = await getPlayersFromDataset({
            position: options.positionFilter,
            team: options.teamFilter, 
            limit: options.limit || 50
          });
          
          // Add random scores
          const playersWithRandomScores = datasetPlayers.map(player => ({
            ...player,
            similarityScore: Math.floor(Math.random() * (95 - 40 + 1)) + 40, // Random score between 40-95
            positionScores: [],
            bestPositionMatch: null,
            strengths: [],
            weaknesses: []
          }));
          
          setPlayersWithScores(playersWithRandomScores);
        } catch (datasetError) {
          // If everything fails, set an empty array
          setPlayersWithScores([]);
        }
      } else {
        // Fallback to random scores for frontend-provided players
        const playersWithRandomScores = players.map(player => ({
          ...player,
          similarityScore: Math.floor(Math.random() * (95 - 40 + 1)) + 40, // Random score between 40-95
          positionScores: [],
          bestPositionMatch: null,
          strengths: [],
          weaknesses: []
        }));
        
        setPlayersWithScores(playersWithRandomScores);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch scores whenever players, requirements or user role changes
  useEffect(() => {
    fetchSimilarityScores();
  }, [isTeam, players, teamRequirements, useDataset, options.positionFilter, options.teamFilter, options.limit]);

  // Force re-fetch (can be used after requirements change)
  const refreshScores = () => {
    fetchSimilarityScores();
  };

  return {
    players: playersWithScores,
    isLoading,
    error,
    backendAvailable,
    refreshScores
  };
};

export default useSimilarityScores; 