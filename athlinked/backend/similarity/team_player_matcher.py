"""
Team-Player Matcher module - Uses cosine similarity to match players with team requirements
"""

import os
import pandas as pd
import numpy as np
import re
from scipy.spatial.distance import cosine
import json

# Adapting the cosine similarity function from cosine2.py
def cosine_similarity(v1, v2):
    """Calculate cosine similarity between two vectors (1 = identical, 0 = completely different)"""
    return 1 - cosine(v1, v2)

# Load team requirements dataset
def load_team_requirements():
    """Load the teams dataset containing recruitment requirements"""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    teams_path = os.path.join(script_dir, 'teamsdataset.csv')
    
    teams_df = pd.read_csv(teams_path)
    return teams_df

# Load player dataset
def load_player_dataset():
    """Load the players dataset containing player stats and attributes"""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    players_path = os.path.join(script_dir, 'footballdataset.csv')
    
    players_df = pd.read_csv(players_path)
    return players_df

# Convert dataframe row to player dictionary
def player_row_to_dict(row):
    """Convert a pandas Series (dataframe row) to a player dictionary"""
    # Extract percentage values and convert to float
    pass_accuracy = float(row.get('Pass Accuracy', '0%').replace('%', '')) if pd.notna(row.get('Pass Accuracy')) else 0
    aerial_duel_win = float(row.get('Aerial Duel Win %', '0%').replace('%', '')) if pd.notna(row.get('Aerial Duel Win %')) else 0
    save_percentage = float(row.get('Save Percentage', '0%').replace('%', '')) if pd.notna(row.get('Save Percentage')) else 0
    distribution_accuracy = float(row.get('Distribution Accuracy', '0%').replace('%', '')) if pd.notna(row.get('Distribution Accuracy')) else 0
    one_v_one_success = float(row.get('1v1 Success Rate', '0%').replace('%', '')) if pd.notna(row.get('1v1 Success Rate')) else 0
    
    # Extract pace value (e.g., "24 km/h" -> 24)
    pace_str = row.get('Pace', '0 km/h') if pd.notna(row.get('Pace')) else '0 km/h'
    pace_kmh = float(pace_str.split(' ')[0])
    
    # Create player dictionary with all relevant fields
    player = {
        'id': row.get('Unique User ID'),
        'name': row.get('Name'),
        'nationality': row.get('Nationality'),
        'team': row.get('Current Team'),
        'league': row.get('Current League'),
        'city': row.get('Current City'),
        'age': row.get('Age'),
        'position': row.get('Position'),
        'goals': row.get('Goals', 0),
        'assists': row.get('Assists', 0),
        'games_played': row.get('Games Played', 0),
        'pass_accuracy': pass_accuracy,
        'dribbles_completed': row.get('Dribbles Completed', 0),
        'key_passes_per_game': row.get('Key Passes per Game', 0),
        'box_to_box_coverage': row.get('Box to Box Coverage', 0),
        'tackles_per_game': row.get('Tackles per Game', 0),
        'aerial_duel_win_pct': aerial_duel_win,
        'pace_kmh': pace_kmh,
        'passing_build_up': row.get('Passing Range & Build-Up Play', 0),
        'save_percentage': save_percentage,
        'distribution_accuracy': distribution_accuracy,
        'one_v_one_success_rate': one_v_one_success
    }
    
    return player

# Get players from dataset
def get_players_from_dataset(limit=None, position_filter=None, team_filter=None):
    """
    Get players from the dataset with optional filtering
    
    Args:
        limit (int, optional): Maximum number of players to return
        position_filter (str, optional): Filter by position
        team_filter (str, optional): Filter by team name
        
    Returns:
        list: List of player dictionaries
    """
    players_df = load_player_dataset()
    filtered_df = players_df
    
    # Apply filters
    if position_filter:
        filtered_df = filtered_df[filtered_df['Position'].str.contains(position_filter, case=False)]
    
    if team_filter:
        filtered_df = filtered_df[filtered_df['Current Team'].str.contains(team_filter, case=False)]
    
    # Convert to dictionaries
    players = []
    
    for _, row in filtered_df.iterrows():
        player = player_row_to_dict(row)
        players.append(player)
        
        if limit and len(players) >= limit:
            break
    
    return players

# Parse team requirements text into structured data
def parse_team_requirements(requirements_text):
    """Parse the 'Looking For' text into structured requirements data"""
    position_pattern = r'^([\w\s]+)\swith'
    position_match = re.search(position_pattern, requirements_text)
    position = position_match.group(1) if position_match else "Unknown"
    
    # Extract numerical requirements
    requirements = {}
    
    # Different patterns for different positions
    if "Goalkeeper" in position:
        save_pct_pattern = r'save percentage >= ([\d.]+)%'
        dist_acc_pattern = r'distribution accuracy >= ([\d.]+)%'
        
        save_pct_match = re.search(save_pct_pattern, requirements_text)
        dist_acc_match = re.search(dist_acc_pattern, requirements_text)
        
        if save_pct_match:
            requirements['save_percentage'] = float(save_pct_match.group(1))
        if dist_acc_match:
            requirements['distribution_accuracy'] = float(dist_acc_match.group(1))
    
    elif "Defender" in position:
        tackles_pattern = r'tackles per game >= ([\d.]+)'
        aerial_pattern = r'aerial duel win % >= ([\d.]+)%'
        pass_acc_pattern = r'pass accuracy >= ([\d.]+)%'
        pace_pattern = r'pace >= ([\d.]+) km/h'
        
        tackles_match = re.search(tackles_pattern, requirements_text)
        aerial_match = re.search(aerial_pattern, requirements_text)
        pass_acc_match = re.search(pass_acc_pattern, requirements_text)
        pace_match = re.search(pace_pattern, requirements_text)
        
        if tackles_match:
            requirements['tackles_per_game'] = float(tackles_match.group(1))
        if aerial_match:
            requirements['aerial_duel_win_pct'] = float(aerial_match.group(1))
        if pass_acc_match:
            requirements['pass_accuracy'] = float(pass_acc_match.group(1))
        if pace_match:
            requirements['pace_kmh'] = float(pace_match.group(1))
    
    elif "Midfielder" in position:
        pass_acc_pattern = r'pass accuracy >= ([\d.]+)%'
        key_passes_pattern = r'key passes per game >= ([\d.]+)'
        dribbles_pattern = r'dribbles completed >= ([\d.]+)'
        tackles_pattern = r'tackles per game >= ([\d.]+)'
        
        pass_acc_match = re.search(pass_acc_pattern, requirements_text)
        key_passes_match = re.search(key_passes_pattern, requirements_text)
        dribbles_match = re.search(dribbles_pattern, requirements_text)
        tackles_match = re.search(tackles_pattern, requirements_text)
        
        if pass_acc_match:
            requirements['pass_accuracy'] = float(pass_acc_match.group(1))
        if key_passes_match:
            requirements['key_passes_per_game'] = float(key_passes_match.group(1))
        if dribbles_match:
            requirements['dribbles_completed'] = float(dribbles_match.group(1))
        if tackles_match:
            requirements['tackles_per_game'] = float(tackles_match.group(1))
    
    elif "Forward" in position:
        goals_pattern = r'goals >= ([\d.]+)'
        assists_pattern = r'assists >= ([\d.]+)'
        pace_pattern = r'pace >= ([\d.]+) km/h'
        one_v_one_pattern = r'1v1 success rate >= ([\d.]+)%'
        
        goals_match = re.search(goals_pattern, requirements_text)
        assists_match = re.search(assists_pattern, requirements_text)
        pace_match = re.search(pace_pattern, requirements_text)
        one_v_one_match = re.search(one_v_one_pattern, requirements_text)
        
        if goals_match:
            requirements['goals'] = float(goals_match.group(1))
        if assists_match:
            requirements['assists'] = float(assists_match.group(1))
        if pace_match:
            requirements['pace_kmh'] = float(pace_match.group(1))
        if one_v_one_match:
            requirements['one_v_one_success_rate'] = float(one_v_one_match.group(1))
    
    return {
        'position': position,
        'requirements': requirements
    }

def preprocess_player_data(player):
    """
    Extract relevant features from player data and convert to a vector
    
    Args:
        player (dict): Player data with statistics
        
    Returns:
        dict: Player vector data and feature names
    """
    # Initialize empty features dictionary
    features = {}
    feature_names = []
    
    position = player.get('position', '').lower()
    
    # Extract position-specific features
    if 'goalkeeper' in position:
        features['save_percentage'] = player.get('save_percentage', 0)
        features['distribution_accuracy'] = player.get('distribution_accuracy', 0)
        feature_names = ['save_percentage', 'distribution_accuracy']
    
    elif 'defender' in position:
        features['tackles_per_game'] = player.get('tackles_per_game', 0)
        features['aerial_duel_win_pct'] = player.get('aerial_duel_win_pct', 0)
        features['pass_accuracy'] = player.get('pass_accuracy', 0)
        features['pace_kmh'] = player.get('pace_kmh', 0)
        feature_names = ['tackles_per_game', 'aerial_duel_win_pct', 'pass_accuracy', 'pace_kmh']
    
    elif 'midfielder' in position:
        features['pass_accuracy'] = player.get('pass_accuracy', 0)
        features['key_passes_per_game'] = player.get('key_passes_per_game', 0)
        features['dribbles_completed'] = player.get('dribbles_completed', 0)
        features['tackles_per_game'] = player.get('tackles_per_game', 0)
        feature_names = ['pass_accuracy', 'key_passes_per_game', 'dribbles_completed', 'tackles_per_game']
    
    elif any(pos in position for pos in ['forward', 'striker', 'winger']):
        features['goals'] = player.get('goals', 0)
        features['assists'] = player.get('assists', 0)
        features['pace_kmh'] = player.get('pace_kmh', 0)
        features['one_v_one_success_rate'] = player.get('one_v_one_success_rate', 0)
        feature_names = ['goals', 'assists', 'pace_kmh', 'one_v_one_success_rate']
    
    # Create feature vector
    feature_vector = np.array([features.get(name, 0) for name in feature_names])
    
    return {
        'vector': feature_vector,
        'features': features,
        'feature_names': feature_names
    }

def preprocess_requirement_data(requirement_data):
    """
    Convert team requirements to a feature vector
    
    Args:
        requirement_data (dict): Parsed requirement data
        
    Returns:
        dict: Requirement vector data and feature names
    """
    position = requirement_data['position'].lower()
    requirements = requirement_data['requirements']
    
    # Initialize empty features dictionary
    features = {}
    feature_names = []
    
    # Extract position-specific features
    if 'goalkeeper' in position:
        features['save_percentage'] = requirements.get('save_percentage', 0)
        features['distribution_accuracy'] = requirements.get('distribution_accuracy', 0)
        feature_names = ['save_percentage', 'distribution_accuracy']
    
    elif 'defender' in position:
        features['tackles_per_game'] = requirements.get('tackles_per_game', 0)
        features['aerial_duel_win_pct'] = requirements.get('aerial_duel_win_pct', 0)
        features['pass_accuracy'] = requirements.get('pass_accuracy', 0)
        features['pace_kmh'] = requirements.get('pace_kmh', 0)
        feature_names = ['tackles_per_game', 'aerial_duel_win_pct', 'pass_accuracy', 'pace_kmh']
    
    elif 'midfielder' in position:
        features['pass_accuracy'] = requirements.get('pass_accuracy', 0)
        features['key_passes_per_game'] = requirements.get('key_passes_per_game', 0)
        features['dribbles_completed'] = requirements.get('dribbles_completed', 0)
        features['tackles_per_game'] = requirements.get('tackles_per_game', 0)
        feature_names = ['pass_accuracy', 'key_passes_per_game', 'dribbles_completed', 'tackles_per_game']
    
    elif 'forward' in position:
        features['goals'] = requirements.get('goals', 0)
        features['assists'] = requirements.get('assists', 0)
        features['pace_kmh'] = requirements.get('pace_kmh', 0)
        features['one_v_one_success_rate'] = requirements.get('one_v_one_success_rate', 0)
        feature_names = ['goals', 'assists', 'pace_kmh', 'one_v_one_success_rate']
    
    # Create feature vector
    feature_vector = np.array([features.get(name, 0) for name in feature_names])
    
    return {
        'vector': feature_vector,
        'features': features,
        'feature_names': feature_names
    }

def calculate_player_team_match(player, team_id=None, team_requirement_text=None):
    """
    Calculate the match score between a player and a team's requirements
    
    Args:
        player (dict): Player data
        team_id (int, optional): Team ID to lookup requirements
        team_requirement_text (str, optional): Direct requirement text to use
        
    Returns:
        dict: Match score and details
    """
    # Get requirement text either from team ID or directly
    if team_requirement_text is None and team_id is not None:
        teams_df = load_team_requirements()
        team_row = teams_df[teams_df['Team ID'] == team_id]
        
        if team_row.empty:
            raise ValueError(f"No team found with ID {team_id}")
        
        team_name = team_row['Team Name'].iloc[0]
        requirement_text = team_row['Looking For'].iloc[0]
    elif team_requirement_text is not None:
        requirement_text = team_requirement_text
        team_name = "Custom Team"
    else:
        raise ValueError("Either team_id or team_requirement_text must be provided")
    
    # Parse the requirement text
    requirement_data = parse_team_requirements(requirement_text)
    
    # Check position compatibility
    player_position = player.get('position', '').lower()
    requirement_position = requirement_data['position'].lower()
    
    # Check if positions match on a general level
    position_match = False
    
    # Direct position match
    if requirement_position in player_position or player_position in requirement_position:
        position_match = True
    
    # Position group matching
    elif ('midfielder' in requirement_position and 'midfielder' in player_position) or \
         ('defender' in requirement_position and 'defender' in player_position) or \
         ('goalkeeper' in requirement_position and 'goalkeeper' in player_position) or \
         ('forward' in requirement_position and any(pos in player_position for pos in ['forward', 'striker', 'winger'])):
        position_match = True
    
    # If positions don't match, return a low score
    if not position_match:
        return {
            'overall_score': 30.0,  # Base score for position mismatch
            'position_match': False,
            'team_name': team_name,
            'requirement_position': requirement_data['position'],
            'requirement_details': requirement_data['requirements'],
            'explanation': f"Player position ({player.get('position', 'Unknown')}) does not match required position ({requirement_data['position']})"
        }
    
    # Process player data
    player_data = preprocess_player_data(player)
    
    # Process requirement data
    requirement_processed = preprocess_requirement_data(requirement_data)
    
    # Check if we have compatible feature sets
    if not player_data['feature_names'] or not requirement_processed['feature_names']:
        return {
            'overall_score': 40.0,  # Base score for incomplete data
            'position_match': True,
            'team_name': team_name,
            'requirement_position': requirement_data['position'],
            'requirement_details': requirement_data['requirements'],
            'explanation': "Incomplete data for proper similarity calculation"
        }
    
    # Calculate cosine similarity
    if len(player_data['vector']) > 0 and len(requirement_processed['vector']) > 0:
        similarity = cosine_similarity(player_data['vector'], requirement_processed['vector'])
        
        # Convert to percentage (0-100)
        similarity_percentage = max(40, min(100, similarity * 100))
    else:
        similarity_percentage = 40.0  # Default minimum score
    
    # Generate explanation
    strengths = []
    weaknesses = []
    
    # Compare features
    for feature in player_data['feature_names']:
        player_value = player_data['features'].get(feature, 0)
        requirement_value = requirement_processed['features'].get(feature, 0)
        
        if player_value >= requirement_value:
            strengths.append(f"{feature.replace('_', ' ').title()}: {player_value} (Meets requirement of {requirement_value})")
        else:
            weaknesses.append(f"{feature.replace('_', ' ').title()}: {player_value} (Below requirement of {requirement_value})")
    
    return {
        'overall_score': similarity_percentage,
        'position_match': True,
        'team_name': team_name,
        'requirement_position': requirement_data['position'],
        'requirement_details': requirement_data['requirements'],
        'strengths': strengths,
        'weaknesses': weaknesses,
        'explanation': f"Player has a {similarity_percentage:.1f}% match with {team_name}'s {requirement_data['position']} requirements"
    }

def calculate_player_all_teams_match(player):
    """
    Calculate match scores between a player and all teams in the dataset
    
    Args:
        player (dict): Player data
        
    Returns:
        list: Match scores for all teams, sorted by highest match first
    """
    teams_df = load_team_requirements()
    match_scores = []
    
    for _, team_row in teams_df.iterrows():
        team_id = team_row['Team ID']
        team_name = team_row['Team Name']
        requirement_text = team_row['Looking For']
        
        try:
            match_result = calculate_player_team_match(player, team_requirement_text=requirement_text)
            match_result['team_id'] = team_id
            match_scores.append(match_result)
        except Exception as e:
            print(f"Error calculating match for team {team_id}: {e}")
    
    # Sort by match score (highest first)
    match_scores.sort(key=lambda x: x['overall_score'], reverse=True)
    
    return match_scores

def calculate_team_all_players_match(team_id, players):
    """
    Calculate match scores between a team and all players
    
    Args:
        team_id (int): Team ID
        players (list): List of player dictionaries
        
    Returns:
        list: Match scores for all players, sorted by highest match first
    """
    match_scores = []
    
    for player in players:
        try:
            match_result = calculate_player_team_match(player, team_id=team_id)
            match_result['player_id'] = player.get('id')
            match_result['player_name'] = player.get('name')
            match_scores.append(match_result)
        except Exception as e:
            print(f"Error calculating match for player {player.get('id')}: {e}")
    
    # Sort by match score (highest first)
    match_scores.sort(key=lambda x: x['overall_score'], reverse=True)
    
    return match_scores

def calculate_batch_similarity_scores(players, team_requirements):
    """
    API wrapper function to calculate similarity scores for multiple players and team requirements
    
    Args:
        players (list): List of player dictionaries
        team_requirements (list): List of team requirement texts
        
    Returns:
        list: List of players with similarity scores for each team requirement
    """
    players_with_scores = []
    
    # For each player, calculate match scores for each team requirement
    for player in players:
        # Initialize with player data
        player_with_scores = player.copy()
        
        # Calculate match for each requirement
        team_matches = []
        best_match_score = 0
        best_match = None
        
        for req in team_requirements:
            req_text = req.get('description', '')
            
            if not req_text:
                continue
            
            # Calculate match score
            match_result = calculate_player_team_match(
                player, 
                team_requirement_text=req_text
            )
            
            team_matches.append({
                'position': match_result['requirement_position'],
                'score': match_result['overall_score'],
                'strengths': match_result.get('strengths', []),
                'weaknesses': match_result.get('weaknesses', []),
                'explanation': match_result['explanation']
            })
            
            # Track best match
            if match_result['overall_score'] > best_match_score:
                best_match_score = match_result['overall_score']
                best_match = team_matches[-1]
        
        # Add overall similarity score (best match score)
        player_with_scores['similarity_score'] = best_match_score
        player_with_scores['position_scores'] = team_matches
        player_with_scores['best_position_match'] = best_match
        
        players_with_scores.append(player_with_scores)
    
    # Sort by overall similarity score (highest first)
    players_with_scores.sort(key=lambda x: x['similarity_score'], reverse=True)
    
    return players_with_scores

# Example usage
if __name__ == "__main__":
    # Example player data
    example_player = {
        'id': 1,
        'name': 'John Smith',
        'position': 'Midfielder',
        'age': 22,
        'pass_accuracy': 87,
        'key_passes_per_game': 2.3,
        'dribbles_completed': 25,
        'tackles_per_game': 2.1
    }
    
    # Example team requirements
    example_requirements = [
        {
            'position': 'Midfielder',
            'description': 'Midfielder with pass accuracy >= 85%, key passes per game >= 2.0, dribbles completed >= 20, tackles per game >= 1.9'
        }
    ]
    
    # Calculate match score
    result = calculate_batch_similarity_scores([example_player], example_requirements)
    print(json.dumps(result, indent=2)) 