# Athlinked Backend - Player-Team Similarity Score

This directory contains the backend code for calculating similarity scores between players and team requirements using cosine similarity.

## Overview

The backend provides a Flask API that calculates how well a player matches the requirements of a team, based on various attributes such as:
- Passing accuracy
- Chances created
- Age
- Height
- Aerial duels won
- Tackles per game
- Conversion rate
- Expected goals

The similarity calculation uses cosine similarity from scikit-learn to produce a percentage match score that can be displayed on the frontend.

## Getting Started

### Prerequisites

- Python 3.8+
- pip package manager

### Installation

1. Navigate to the backend directory:
   ```
   cd athlinked/backend
   ```

2. Create a virtual environment (optional but recommended):
   ```
   python -m venv venv
   ```

3. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - Mac/Linux: `source venv/bin/activate`

4. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

### Running the API Server

1. Start the Flask server:
   ```
   python app.py
   ```

2. The server will run at `http://localhost:5000`

### API Endpoints

#### Calculate Similarity Scores

- URL: `/api/similarity`
- Method: `POST`
- Request Body:
  ```json
  {
    "players": [
      {
        "id": 1,
        "name": "Player Name",
        "position": "Midfielder",
        "age": 22,
        "passing_accuracy": 87,
        "chances_created": 2.3,
        "height_cm": 182,
        "aerial_duels_won": 65,
        "tackles_per_game": 2.1,
        "conversion_rate": 15,
        "expected_goals": 0.4
      }
    ],
    "requirements": [
      {
        "position": "Central Midfielder",
        "priority": "High",
        "requirements": [
          { "name": "Passing", "value": "Min. 85% accuracy" },
          { "name": "Chances Created", "value": "Min. 2.0 per game" },
          { "name": "Age", "value": "Under 23" },
          { "name": "Preferred foot", "value": "Left-footed" }
        ]
      }
    ]
  }
  ```

- Response:
  ```json
  {
    "players": [
      {
        "id": 1,
        "name": "Player Name",
        "position": "Midfielder",
        "age": 22,
        "passing_accuracy": 87,
        "chances_created": 2.3,
        "height_cm": 182,
        "aerial_duels_won": 65,
        "tackles_per_game": 2.1,
        "conversion_rate": 15,
        "expected_goals": 0.4,
        "similarity_score": 82.5,
        "position_scores": [
          {
            "position": "Central Midfielder",
            "score": 82.5,
            "priority": "High"
          }
        ],
        "best_position_match": {
          "position": "Central Midfielder",
          "score": 82.5,
          "priority": "High"
        }
      }
    ]
  }
  ```

#### Test API
- URL: `/api/test`
- Method: `GET`
- Response:
  ```json
  {
    "status": "success",
    "message": "Similarity API is running"
  }
  ```

## Integration with Frontend

To integrate with the React frontend, make API calls to the similarity endpoint whenever you need to calculate scores. For example:

```javascript
async function getPlayerSimilarityScores(players, teamRequirements) {
  const response = await fetch('http://localhost:5000/api/similarity', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      players: players,
      requirements: teamRequirements
    }),
  });
  
  const data = await response.json();
  return data.players;
}
``` 