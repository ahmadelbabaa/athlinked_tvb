# Athlinked Player Similarity System

This system allows teams to find players that match their specific requirements using cosine similarity algorithms. The implementation uses a real dataset of players and team requirements to provide accurate matching.

## Features

- **Real Player Dataset**: Uses a database of real football players from `footballdataset.csv`
- **Team Requirements Dataset**: Uses requirements from `teamsdataset.csv` for matching players
- **Position-Specific Matching**: Different metrics for different positions (GK, defenders, midfielders, forwards)
- **Explainable Scores**: Provides detailed information about player strengths and weaknesses
- **Flexible API**: Use players from frontend or directly from the dataset

## Project Structure

```
athlinked/
├── backend/
│   ├── app.py                  # Flask API server
│   ├── similarity/             # Similarity calculation modules
│   │   ├── __init__.py
│   │   ├── cosine2.py          # Original cosine similarity function
│   │   ├── cosine_similarity.py # Enhanced similarity calculation
│   │   ├── footballdataset.csv # Player dataset
│   │   ├── team_player_matcher.py # Main module for player-team matching
│   │   └── teamsdataset.csv    # Team requirements dataset
│   └── requirements.txt        # Python dependencies
├── src/
    ├── components/
    │   ├── TeamProfile.js      # Team profile component with requirements
    │   └── ...
    ├── hooks/
    │   ├── useSimilarityScores.js # React hook for similarity scoring
    │   └── ...
    ├── services/
    │   ├── apiClient.js        # API client for backend communication
    │   └── ...
    └── App.css                 # Styles
```

## Setup Instructions

### Backend Setup

1. Make sure you have Python installed (3.8+ recommended)
2. Navigate to the backend directory:
   ```
   cd athlinked/backend
   ```
3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
4. Start the Flask server:
   ```
   python app.py
   ```
   The API will be available at `http://localhost:5000/api`

### Frontend Integration

Import the `useSimilarityScores` hook in your component:

```javascript
import useSimilarityScores from '../hooks/useSimilarityScores';

function Athletes() {
  // Get requirements from team profile (optional)
  const { recruitmentNeeds } = useTeamProfile();
  const isTeam = userRole === 'team';
  
  // Option 1: Using frontend-provided players
  const { players: playersWithScores, isLoading } = useSimilarityScores(
    players,           // Array of player objects
    recruitmentNeeds,  // Array of requirements from team profile
    isTeam             // Whether the user is a team
  );
  
  // Option 2: Using players from the dataset
  const { players: datasetPlayersWithScores, isLoading: isDatasetLoading } = useSimilarityScores(
    [],                // Empty array (not used when using dataset)
    recruitmentNeeds,  // Array of requirements from team profile
    isTeam,            // Whether the user is a team
    {
      useDataset: true,           // Use players from dataset
      positionFilter: 'Midfielder', // Optional position filter
      teamFilter: 'Barcelona',      // Optional team filter
      limit: 50                     // Optional limit (default: 50)
    }
  );
  
  // Each player in playersWithScores will have:
  // - similarityScore: Overall match percentage
  // - bestPositionMatch: Best matching position with score
  // - strengths: What attributes meet requirements
  // - weaknesses: What attributes fall short
}
```

## API Endpoints

### Player Similarity

- **POST /api/similarity** - Calculate similarity scores
  - Request body:
    ```json
    {
      "players": [...],        // Optional if useDataset=true
      "requirements": [...],   // Optional, uses database if not provided
      "useDataset": true,      // Optional, whether to use players from dataset
      "position": "Midfielder", // Optional position filter
      "team": "Barcelona",      // Optional team filter
      "limit": 50               // Optional limit
    }
    ```

### Player Data

- **GET /api/players** - Get players from dataset
  - Query parameters:
    - `position`: Filter by position
    - `team`: Filter by team name
    - `limit`: Maximum number of players to return

- **GET /api/players/:playerId/team-matches** - Get team matches for a player

### Team Data

- **GET /api/teams** - Get all teams and their requirements
- **GET /api/teams/:teamId/requirements** - Get requirements for a specific team

## How It Works

1. Team requirements are parsed from text like "Midfielder with pass accuracy >= 85%, key passes per game >= 2.0"
2. Players are matched based on position-specific metrics (different features for GK, defenders, etc.)
3. Cosine similarity is calculated between player features and requirements
4. Players are ranked by similarity score and explanations are provided

## Example Team Requirement

```
Midfielder with pass accuracy >= 85%, key passes per game >= 2.0, dribbles completed >= 20, tackles per game >= 1.9
```

## Example Player Match Result

```json
{
  "player": {
    "id": 1007,
    "name": "Lucas Smith",
    "position": "Midfielder",
    "age": 17,
    "pass_accuracy": 87,
    "key_passes_per_game": 1.6,
    "dribbles_completed": 24,
    "tackles_per_game": 1.3
  },
  "similarityScore": 78.5,
  "bestPositionMatch": {
    "position": "Midfielder",
    "score": 78.5,
    "strengths": [
      "Pass Accuracy: 87 (Meets requirement of 85)",
      "Dribbles Completed: 24 (Meets requirement of 20)"
    ],
    "weaknesses": [
      "Key Passes Per Game: 1.6 (Below requirement of 2.0)",
      "Tackles Per Game: 1.3 (Below requirement of 1.9)"
    ]
  }
}
```