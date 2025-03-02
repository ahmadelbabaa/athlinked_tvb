/**
 * API client for communicating with the Athlinked backend services
 */

const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Calculate similarity scores for players based on team requirements
 * 
 * @param {Array} players - Array of player objects with their attributes (optional if useDataset=true)
 * @param {Array} requirements - Array of team requirement objects (optional)
 * @param {Object} options - Additional options for the API call
 * @param {boolean} options.useDataset - Whether to use the players from the backend dataset
 * @param {string} options.position - Position filter when using the dataset
 * @param {string} options.team - Team filter when using the dataset 
 * @returns {Promise<Array>} - Players array with similarity scores
 */
export const calculateSimilarityScores = async (players = null, requirements = null, options = {}) => {
  try {
    // Build request payload
    const payload = {};
    
    // Add players if provided and not using dataset
    if (players && !options.useDataset) {
      payload.players = players;
    }
    
    // Add dataset options if using dataset
    if (options.useDataset) {
      payload.useDataset = true;
      
      if (options.position) {
        payload.position = options.position;
      }
      
      if (options.team) {
        payload.team = options.team;
      }
      
      if (options.limit) {
        payload.limit = options.limit;
      }
    }
    
    // Add requirements if provided
    if (requirements) {
      payload.requirements = requirements;
    }
    
    const response = await fetch(`${API_BASE_URL}/similarity`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to calculate similarity scores');
    }

    const data = await response.json();
    return data.players;
  } catch (error) {
    console.error('Error calculating similarity scores:', error);
    throw error;
  }
};

/**
 * Get players from the database with optional filtering
 * 
 * @param {Object} options - Filter options
 * @param {string} options.position - Filter by position
 * @param {string} options.team - Filter by team name
 * @param {number} options.limit - Maximum number of players to return
 * @returns {Promise<Array>} - Array of player objects
 */
export const getPlayersFromDataset = async (options = {}) => {
  try {
    // Build query parameters
    const queryParams = new URLSearchParams();
    
    if (options.position) {
      queryParams.append('position', options.position);
    }
    
    if (options.team) {
      queryParams.append('team', options.team);
    }
    
    if (options.limit) {
      queryParams.append('limit', options.limit);
    }
    
    const url = `${API_BASE_URL}/players${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch players from dataset');
    }

    const data = await response.json();
    return data.players;
  } catch (error) {
    console.error('Error fetching players from dataset:', error);
    throw error;
  }
};

/**
 * Get team matches for a specific player from the dataset
 * 
 * @param {number} playerId - Player ID in the dataset
 * @returns {Promise<Object>} - Player data and team matches
 */
export const getPlayerTeamMatches = async (playerId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/players/${playerId}/team-matches`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch team matches for player ${playerId}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching team matches for player ${playerId}:`, error);
    throw error;
  }
};

/**
 * Get the list of teams and their requirements from the database
 * 
 * @returns {Promise<Array>} - Array of team objects with requirements
 */
export const getTeams = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/teams`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch teams');
    }

    const data = await response.json();
    return data.teams;
  } catch (error) {
    console.error('Error fetching teams:', error);
    throw error;
  }
};

/**
 * Get requirements for a specific team
 * 
 * @param {number} teamId - Team ID
 * @returns {Promise<Object>} - Team data with requirements
 */
export const getTeamRequirements = async (teamId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/teams/${teamId}/requirements`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch requirements for team ${teamId}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching requirements for team ${teamId}:`, error);
    throw error;
  }
};

/**
 * Test the connection to the similarity API
 * 
 * @returns {Promise<Object>} - Status response
 */
export const testApiConnection = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/test`);
    
    if (!response.ok) {
      throw new Error('Failed to connect to similarity API');
    }

    return await response.json();
  } catch (error) {
    console.error('Error testing API connection:', error);
    throw error;
  }
};

/**
 * Prepare player data for similarity calculation by extracting
 * relevant statistics and attributes
 * 
 * @param {Array} players - Raw player data 
 * @returns {Array} - Processed player data with stats needed for similarity calculation
 */
export const preparePlayerDataForSimilarity = (players) => {
  return players.map(player => {
    // Extract required statistics and normalize them
    // This function should be customized based on your data model
    const prepared = {
      id: player.id,
      name: player.name,
      position: player.position,
      age: player.age || 25,
    };
    
    // Map stats based on position
    const position = player.position?.toLowerCase() || '';
    
    // Add goalkeeper-specific stats
    if (position.includes('goalkeeper')) {
      prepared.save_percentage = player.stats?.goalkeeping?.savePercentage || 0;
      prepared.distribution_accuracy = player.stats?.goalkeeping?.distributionAccuracy || 0;
    }
    
    // Add defender-specific stats
    if (position.includes('defender')) {
      prepared.tackles_per_game = player.stats?.defending?.tacklesPerGame || 0;
      prepared.aerial_duel_win_pct = player.stats?.defending?.aerialDuelWinPct || 0;
      prepared.pass_accuracy = player.stats?.passing?.accuracy || 0;
      prepared.pace_kmh = player.physicalAttributes?.pace || 0;
    }
    
    // Add midfielder-specific stats
    if (position.includes('midfielder')) {
      prepared.pass_accuracy = player.stats?.passing?.accuracy || 0;
      prepared.key_passes_per_game = player.stats?.passing?.keyPassesPerGame || 0;
      prepared.dribbles_completed = player.stats?.attacking?.dribblesCompleted || 0;
      prepared.tackles_per_game = player.stats?.defending?.tacklesPerGame || 0;
    }
    
    // Add forward-specific stats
    if (position.includes('forward') || position.includes('striker') || position.includes('winger')) {
      prepared.goals = player.stats?.attacking?.goals || 0;
      prepared.assists = player.stats?.attacking?.assists || 0;
      prepared.pace_kmh = player.physicalAttributes?.pace || 0;
      prepared.one_v_one_success_rate = player.stats?.attacking?.oneVOneSuccessRate || 0;
    }
    
    return prepared;
  });
};

/**
 * Prepares team requirements data from team profile for similarity calculation
 * 
 * @param {Array} recruitmentNeeds - Recruitment needs array from team profile
 * @returns {Array} - Formatted requirements for similarity API
 */
export const prepareRequirementsFromTeamProfile = (recruitmentNeeds) => {
  if (!recruitmentNeeds || !recruitmentNeeds.length) {
    return [];
  }
  
  return recruitmentNeeds.map(need => {
    const { position, description, requirements, priority } = need;
    
    // Convert requirements to a text format similar to the database format
    let requirementText = `${position} with `;
    
    // Add requirements text in the correct format
    const reqTexts = [];
    requirements.forEach(req => {
      reqTexts.push(`${req.name.toLowerCase()} >= ${req.value}`);
    });
    
    // Join requirements with commas
    requirementText += reqTexts.join(', ');
    
    return {
      position,
      description: requirementText,
      priority
    };
  });
};

export default {
  calculateSimilarityScores,
  getPlayersFromDataset,
  getPlayerTeamMatches,
  getTeams,
  getTeamRequirements,
  testApiConnection,
  preparePlayerDataForSimilarity,
  prepareRequirementsFromTeamProfile
}; 