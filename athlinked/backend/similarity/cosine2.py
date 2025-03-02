import numpy as np
from scipy.spatial.distance import cosine
import pandas as pd
import matplotlib.pyplot as plt

# This script demonstrates how cosine similarity works for player matching

def cosine_similarity(v1, v2):
    """Calculate cosine similarity between two vectors (1 = identical, 0 = completely different)"""
    return 1 - cosine(v1, v2)

def main():
    # Create a simple example dataset with two features
    print("Cosine Similarity Demo for Football Player Matching")
    print("---------------------------------------------------")
    
    # Create example player data with two features: passing and shooting
    players = pd.DataFrame({
        'name': ['Player A', 'Player B', 'Player C', 'Player D', 'Player E'],
        'passing': [85, 45, 75, 90, 65],
        'shooting': [40, 80, 60, 50, 70]
    })
    
    # Normalize the features (scale to 0-1)
    scaler = lambda x: (x - x.min()) / (x.max() - x.min())
    players['passing_scaled'] = scaler(players['passing'])
    players['shooting_scaled'] = scaler(players['shooting'])
    
    print("Player data (with scaled features):")
    print(players)
    print()
    
    # Create an ideal player vector (team requirements)
    ideal_player = np.array([0.9, 0.7])  # High passing (0.9) and good shooting (0.7)
    print(f"Ideal player requirements: [passing={ideal_player[0]:.1f}, shooting={ideal_player[1]:.1f}]")
    print()
    
    # Calculate similarity for each player
    similarities = []
    for _, player in players.iterrows():
        player_vector = np.array([player['passing_scaled'], player['shooting_scaled']])
        similarity = cosine_similarity(ideal_player, player_vector)
        similarities.append((player['name'], similarity))
    
    # Sort by similarity (highest first)
    similarities.sort(key=lambda x: x[1], reverse=True)
    
    # Print results
    print("Player rankings by cosine similarity:")
    for i, (name, similarity) in enumerate(similarities, 1):
        print(f"{i}. {name}: similarity = {similarity:.4f}")

    # Text-based visualization of similarity
    print("\nText-based visualization of similarity to ideal player:")
    print("(The closer the bar is to 10 stars, the more similar the player is to the ideal)")
    print("-" * 60)
    
    max_similarity = max(s[1] for s in similarities)
    for name, similarity in similarities:
        # Scale to 0-10 stars
        stars = int((similarity / max_similarity) * 10)
        print(f"{name:10}: {'★' * stars}{' ' * (10-stars)} ({similarity:.4f})")
    
    print("-" * 60)
    print("\nNote: Since matplotlib is not available, we've provided a text visualization.")
    print("Cosine similarity measures the angle between two vectors, not their distance.")
    print("A value of 1.0 means vectors point in the same direction (perfect match).")
    print("A value of 0.0 means vectors are perpendicular (completely different profiles).")

if __name__ == "_main_":
    main()