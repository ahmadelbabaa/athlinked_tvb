from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
import sys

# Add the parent directory to the path so we can import our modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Import our similarity module
from similarity.team_player_matcher import (
    calculate_batch_similarity_scores, 
    load_team_requirements, 
    get_players_from_dataset, 
    calculate_player_all_teams_match
)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/similarity', methods=['POST'])
def get_similarity():
    """
    API endpoint to calculate similarity scores between players and team requirements
    
    Expected POST JSON format:
    {
        "players": [...],  # Array of player objects (optional, will use database if not provided)
        "requirements": [...] # Array of team requirements (optional, will use database if not provided)
        "useDataset": true/false, # Whether to use the footballdataset.csv file for players
        "position": "...", # Optional position filter when using dataset
        "team": "..." # Optional team filter when using dataset
    }
    """
    try:
        data = request.get_json()
        
        # Determine if we should use the dataset for players
        use_dataset = data.get('useDataset', False)
        
        # Get players (either from request or dataset)
        if use_dataset:
            # Use the dataset with optional filters
            position_filter = data.get('position')
            team_filter = data.get('team')
            limit = data.get('limit', 50)  # Default to 50 players max for performance
            
            players = get_players_from_dataset(
                limit=limit,
                position_filter=position_filter,
                team_filter=team_filter
            )
            
            if not players:
                return jsonify({'error': 'No players found with specified filters.'}), 404
        elif 'players' in data and data['players']:
            # Use players from request
            players = data['players']
        else:
            return jsonify({'error': 'No players provided. Either include players in request or set useDataset=true.'}), 400
        
        # Get requirements from request or use default from database
        if 'requirements' in data and data['requirements']:
            requirements = data['requirements']
        else:
            # Create formatted requirements from the database
            teams_df = load_team_requirements()
            requirements = []
            
            for _, row in teams_df.head(10).iterrows():  # Limit to first 10 teams for now
                requirements.append({
                    'position': row['Looking For'].split(' with')[0],
                    'description': row['Looking For'],
                    'priority': 'Medium'  # Default priority
                })
        
        # Calculate similarity scores
        players_with_scores = calculate_batch_similarity_scores(players, requirements)
        
        return jsonify({
            'players': players_with_scores
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/players', methods=['GET'])
def get_players():
    """
    API endpoint to get players from the dataset with optional filtering
    
    Query parameters:
    - position: Filter by position (optional)
    - team: Filter by team name (optional)
    - limit: Maximum number of players to return (optional, default 50)
    """
    try:
        position = request.args.get('position')
        team = request.args.get('team')
        limit = request.args.get('limit', 50, type=int)
        
        players = get_players_from_dataset(
            limit=limit,
            position_filter=position,
            team_filter=team
        )
        
        if not players:
            return jsonify({'message': 'No players found with the specified filters.', 'players': []}), 200
        
        return jsonify({
            'players': players
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/players/<int:player_id>/team-matches', methods=['GET'])
def get_player_team_matches(player_id):
    """
    API endpoint to get all team matches for a specific player
    
    Returns all teams ranked by match score for the specified player
    """
    try:
        # Get player from dataset
        players = get_players_from_dataset()
        player = next((p for p in players if p['id'] == player_id), None)
        
        if not player:
            return jsonify({'error': f'Player with ID {player_id} not found'}), 404
        
        # Calculate matches with all teams
        match_results = calculate_player_all_teams_match(player)
        
        return jsonify({
            'player': player,
            'team_matches': match_results
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/teams', methods=['GET'])
def get_teams():
    """
    API endpoint to get the list of teams and their requirements
    """
    try:
        teams_df = load_team_requirements()
        teams = []
        
        for _, row in teams_df.iterrows():
            teams.append({
                'id': int(row['Team ID']),
                'name': row['Team Name'],
                'country': row['Country'],
                'league': row['Current League'],
                'city': row['Current City'],
                'requirements': {
                    'position': row['Looking For'].split(' with')[0],
                    'description': row['Looking For']
                }
            })
        
        return jsonify({
            'teams': teams
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/teams/<int:team_id>/requirements', methods=['GET'])
def get_team_requirements(team_id):
    """
    API endpoint to get requirements for a specific team
    """
    try:
        teams_df = load_team_requirements()
        team_row = teams_df[teams_df['Team ID'] == team_id]
        
        if team_row.empty:
            return jsonify({'error': f'Team with ID {team_id} not found'}), 404
        
        team_data = {
            'id': int(team_row['Team ID'].iloc[0]),
            'name': team_row['Team Name'].iloc[0],
            'country': team_row['Country'].iloc[0],
            'league': team_row['Current League'].iloc[0],
            'city': team_row['Current City'].iloc[0],
            'requirements': {
                'position': team_row['Looking For'].iloc[0].split(' with')[0],
                'description': team_row['Looking For'].iloc[0]
            }
        }
        
        return jsonify(team_data)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Test endpoint to verify the API is working
@app.route('/api/test', methods=['GET'])
def test_api():
    return jsonify({
        'status': 'success',
        'message': 'Similarity API is running'
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000) 