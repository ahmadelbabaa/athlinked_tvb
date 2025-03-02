"""
Cosine Similarity module for calculating match percentage between players and team requirements
"""

import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
import json

def preprocess_player_data(player):
    """
    Convert player attributes to a numerical vector for similarity calculation
    
    Args:
        player (dict): Player data dictionary with attributes
        
    Returns:
        numpy.ndarray: Numerical vector representation of player attributes
    """
    # Extract relevant features (this should be expanded based on your data model)
    features = {
        'passing_accuracy': player.get('passing_accuracy', 0),
        'chances_created': player.get('chances_created', 0),
        'age': player.get('age', 25),  # Default age
        'height_cm': player.get('height_cm', 180),  # Default height
        'aerial_duels_won': player.get('aerial_duels_won', 0),
        'tackles_per_game': player.get('tackles_per_game', 0),
        'conversion_rate': player.get('conversion_rate', 0),
        'expected_goals': player.get('expected_goals', 0),
        # Add more features as needed
    }
    
    # Convert to vector
    return np.array(list(features.values())).reshape(1, -1)

def preprocess_requirement_data(requirement):
    """
    Convert team requirements to a numerical vector for similarity calculation
    
    Args:
        requirement (dict): Requirement data dictionary
        
    Returns:
        numpy.ndarray: Numerical vector representation of requirements
    """
    # Parse requirement values - this would need to be adapted to your actual data format
    # For example, convert "Min. 85% accuracy" to 85
    
    features = {}
    
    # Parse passing accuracy requirement
    passing_req = next((req for req in requirement.get('requirements', []) if req['name'] == 'Passing'), None)
    if passing_req:
        # Extract numerical value from string like "Min. 85% accuracy"
        try:
            features['passing_accuracy'] = float(passing_req['value'].split('%')[0].split('Min. ')[1].strip())
        except (IndexError, ValueError):
            features['passing_accuracy'] = 75  # Default if parsing fails
    else:
        features['passing_accuracy'] = 0  # Not a requirement
    
    # Parse chances created
    chances_req = next((req for req in requirement.get('requirements', []) if req['name'] == 'Chances Created'), None)
    if chances_req:
        try:
            features['chances_created'] = float(chances_req['value'].split('Min. ')[1].split(' per')[0].strip())
        except (IndexError, ValueError):
            features['chances_created'] = 1.0  # Default
    else:
        features['chances_created'] = 0
    
    # Parse age requirement
    age_req = next((req for req in requirement.get('requirements', []) if req['name'] == 'Age'), None)
    if age_req and 'Under' in age_req['value']:
        try:
            # "Under 23" -> 23
            features['age'] = float(age_req['value'].split('Under ')[1].strip())
        except (IndexError, ValueError):
            features['age'] = 25  # Default
    else:
        features['age'] = 30  # Default upper age
    
    # Parse height requirement
    height_req = next((req for req in requirement.get('requirements', []) if req['name'] == 'Height'), None)
    if height_req and 'Above' in height_req['value']:
        try:
            # "Above 185cm" -> 185
            features['height_cm'] = float(height_req['value'].split('Above ')[1].split('cm')[0].strip())
        except (IndexError, ValueError):
            features['height_cm'] = 180  # Default
    else:
        features['height_cm'] = 170  # Default minimum height
    
    # Parse aerial duels requirement
    aerial_req = next((req for req in requirement.get('requirements', []) if req['name'] == 'Aerial duels won'), None)
    if aerial_req and '%' in aerial_req['value']:
        try:
            # "Min. 70%" -> 70
            features['aerial_duels_won'] = float(aerial_req['value'].split('%')[0].split('Min. ')[1].strip())
        except (IndexError, ValueError):
            features['aerial_duels_won'] = 50  # Default
    else:
        features['aerial_duels_won'] = 0
    
    # Parse tackles requirement
    tackles_req = next((req for req in requirement.get('requirements', []) if req['name'] == 'Tackles'), None)
    if tackles_req:
        try:
            # "Min. 2.5 per game" -> 2.5
            features['tackles_per_game'] = float(tackles_req['value'].split('Min. ')[1].split(' per')[0].strip())
        except (IndexError, ValueError):
            features['tackles_per_game'] = 1.0  # Default
    else:
        features['tackles_per_game'] = 0
    
    # Parse conversion rate
    conversion_req = next((req for req in requirement.get('requirements', []) if req['name'] == 'Conversion rate'), None)
    if conversion_req and '%' in conversion_req['value']:
        try:
            # "Min. 20%" -> 20
            features['conversion_rate'] = float(conversion_req['value'].split('%')[0].split('Min. ')[1].strip())
        except (IndexError, ValueError):
            features['conversion_rate'] = 10  # Default
    else:
        features['conversion_rate'] = 0
    
    # Parse expected goals
    xg_req = next((req for req in requirement.get('requirements', []) if req['name'] == 'Expected goals'), None)
    if xg_req:
        try:
            # "0.5+ per 90 mins" -> 0.5
            features['expected_goals'] = float(xg_req['value'].split('+')[0].strip())
        except (IndexError, ValueError):
            features['expected_goals'] = 0.2  # Default
    else:
        features['expected_goals'] = 0
    
    # Add more requirement parsing as needed
    
    # Convert to vector
    return np.array(list(features.values())).reshape(1, -1)

def calculate_position_match(player, requirement):
    """
    Calculate the position match between a player and a specific position requirement
    
    Args:
        player (dict): Player data 
        requirement (dict): Position requirement data
        
    Returns:
        float: Similarity score as a percentage (0-100)
    """
    # Check if player position matches required position
    player_position = player.get('position', '').lower()
    required_position = requirement.get('position', '').lower()
    
    # If positions don't align at all, return a very low base score
    position_match = False
    
    # Direct position match
    if required_position in player_position or player_position in required_position:
        position_match = True
    
    # Position group matching (midfielders, defenders, etc.)
    elif ('midfielder' in required_position and 'midfielder' in player_position) or \
         ('defender' in required_position and 'defender' in player_position) or \
         ('forward' in required_position and any(pos in player_position for pos in ['forward', 'striker', 'winger'])):
        position_match = True
    
    # If positions don't match at all, return a lower base score
    if not position_match:
        return 30.0  # Base score for non-matching positions
    
    # Convert player and requirement to vectors
    player_vector = preprocess_player_data(player)
    requirement_vector = preprocess_requirement_data(requirement)
    
    # Calculate cosine similarity
    similarity = cosine_similarity(player_vector, requirement_vector)[0][0]
    
    # Convert to percentage (0-100)
    similarity_percentage = max(30, min(100, similarity * 100))
    
    return similarity_percentage

def calculate_team_player_match(player, team_requirements):
    """
    Calculate the overall match between a player and a team's requirements
    
    Args:
        player (dict): Player data
        team_requirements (list): List of position requirements for the team
        
    Returns:
        dict: Dictionary containing overall match score and match scores for each position
    """
    position_scores = []
    
    # Calculate score for each position requirement
    for requirement in team_requirements:
        score = calculate_position_match(player, requirement)
        position_scores.append({
            'position': requirement.get('position', 'Unknown'),
            'score': score,
            'priority': requirement.get('priority', 'Medium')
        })
    
    # Sort by score (highest first)
    position_scores.sort(key=lambda x: x['score'], reverse=True)
    
    # Calculate weighted average based on priority
    priority_weights = {'High': 1.5, 'Medium': 1.0, 'Low': 0.5}
    
    weighted_sum = sum(score['score'] * priority_weights.get(score['priority'], 1.0) for score in position_scores)
    weight_sum = sum(priority_weights.get(score['priority'], 1.0) for score in position_scores)
    
    # Overall match percentage
    overall_match = weighted_sum / weight_sum if weight_sum > 0 else 0
    
    return {
        'overall_match': overall_match,
        'position_matches': position_scores,
        'best_match': position_scores[0] if position_scores else None
    }

def calculate_similarity_scores(players, team_requirements):
    """
    Calculate similarity scores for a list of players against team requirements
    
    Args:
        players (list): List of player dictionaries
        team_requirements (list): List of position requirements for the team
        
    Returns:
        list: List of players with their similarity scores
    """
    players_with_scores = []
    
    for player in players:
        match_results = calculate_team_player_match(player, team_requirements)
        
        # Add scores to player data
        player_with_score = player.copy()
        player_with_score.update({
            'similarity_score': match_results['overall_match'],
            'position_scores': match_results['position_matches'],
            'best_position_match': match_results['best_match']
        })
        
        players_with_scores.append(player_with_score)
    
    # Sort by overall similarity score (highest first)
    players_with_scores.sort(key=lambda x: x['similarity_score'], reverse=True)
    
    return players_with_scores

# API function to get similarity scores (to be called from the frontend)
def get_similarity_scores(player_data_json, team_requirements_json):
    """
    API function to calculate similarity scores
    
    Args:
        player_data_json (str): JSON string of player data
        team_requirements_json (str): JSON string of team requirements
        
    Returns:
        str: JSON string of players with similarity scores
    """
    try:
        players = json.loads(player_data_json)
        team_requirements = json.loads(team_requirements_json)
        
        players_with_scores = calculate_similarity_scores(players, team_requirements)
        
        return json.dumps(players_with_scores)
    
    except Exception as e:
        return json.dumps({"error": str(e)}) 