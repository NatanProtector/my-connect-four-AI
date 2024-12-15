from Graph import Node
from math import sqrt, log
import random
import copy

INF_POSITIVE = float("inf")
INF_NEGATIVE = float("-inf")
    

def calc_uct(wins, visits, parant_visits, c, maximizer):
    
    if visits == 0:
        # return inf if not visited for maximizer and -1 if not visited for minimizer
        return INF_POSITIVE
    
    estimated_value = wins / visits
    
    if not maximizer:
        estimated_value = -estimated_value
    
    # If you are the minimizer, negetive wins should result in high uct
    return estimated_value + c * sqrt(log(parant_visits) / visits)
    
    
# Searching for leaf node (leaf node: node with moves that have not been tried yet)
def selection(root, c, game):
    maximizer = game.turn == 1
    current_parent_node = root
    children_nodes = current_parent_node.get_children()
    current_moves = game.get_possible_moves()
    layer = 1

    while len(children_nodes) == len(current_moves):
        # If we reached the end of the game
        if len(current_moves) == 0:
            return current_parent_node,game,layer
        
        parent_vists = current_parent_node.get_state()["visit_count"]
        best_uct = INF_NEGATIVE
        best_node = None
        for child_node in children_nodes:

            child_uct = calc_uct(
                child_node.get_state()["total_value"],
                child_node.get_state()["visit_count"],
                parent_vists, c, maximizer)
            
            if  child_uct > best_uct:
                best_uct = child_uct
                best_node = child_node
                
        if (best_node == None):
            raise Exception("Node cannot be selected")
        
        current_parent_node = best_node
        game.make_move(current_parent_node.get_state()["move"])
        current_moves = game.get_possible_moves()
        children_nodes = current_parent_node.get_children()
        maximizer = not maximizer
        layer += 1
                
    return current_parent_node,game,layer
            

# Add a new node for each move, and return a node 
def expansion(node, game, layer):
    
    possible_moves = game.get_possible_moves()
    child_nodes = node.get_children()

    # If we reached the end of the game
    if len(possible_moves) == 0:
        return node,game

    if len(possible_moves) < len(child_nodes):
        raise Exception(f"Node cannot have more children thank moves, Possible moves: {possible_moves}, child_nodes: {child_nodes}")
    
    # Remove all moves that have nodes already
    # Create a dictionary for child moves
    child_moves = {child_node.get_state()["move"] for child_node in child_nodes}

    # Filter out moves from possible_moves that are in child_moves
    possible_moves = [move for move in possible_moves if move not in child_moves]

    # Select a move and add a node
    selected_move = random.choice(possible_moves)
    
    new_child_node = Node({
            "total_value": 0,
            "visit_count": 0,
            "move": selected_move,
            "layer": layer
        })
    
    node.add_child(new_child_node)

    game.make_move(selected_move)
    
    node_of_selected_move = new_child_node
        
    # Return a random move from the list, and the game with the move played
    return node_of_selected_move,game
        
    

def simulation(node_to_simulate, game):
    while not game.game_over:
        game.make_move(random.choice(game.get_possible_moves()))
    
    result = game.get_result()

    node_to_simulate.get_state()["total_value"] += result
    node_to_simulate.get_state()["visit_count"] += 1
    
    return node_to_simulate
    

def backpropagation(node):
    while node.get_parent() is not None:
        parent = node.get_parent()
        # Update parent
        parent.get_state()["total_value"] += node.get_state()["total_value"]
        parent.get_state()["visit_count"] += node.get_state()["visit_count"]
        
        node = parent
    
def get_final_move(root, game):
    
    # Get the move with the best wins/visits ratio
    children = root.get_children()
    moves_data = []
    for child in children:
        state = child.get_state()
        move = state["move"]
        move_ratio = state["total_value"] / state["visit_count"]
    
        moves_data.append({
            "move": move,
            "total_value": state["total_value"],
            "visit_count": state["visit_count"],
            "ratio": move_ratio
        })
        
    
    sorted_moves = sorted(moves_data, key=lambda x: x["ratio"], reverse=True)
    
    # if game over return None
    if game.game_over:
        return None
    
    best_move_index = 0
    
    if (game.turn == -1):
        best_move_index = -1
    
    best_move = sorted_moves[best_move_index]["move"]
    
    return best_move
    

def monte_carlo_tree_search(root,game, epochs, c):
            
    iter = 0
    
    while iter < epochs:
        
        game_copy = copy.deepcopy(game)
    
        node_to_expand,game_new,layer = selection(root, c, game_copy)
        
        nod_to_simulate,game_new = expansion(node_to_expand, game_new,layer)
        
        node_that_has_been_simulated = simulation(nod_to_simulate, game_new)
        
        backpropagation(node_that_has_been_simulated)
        
        iter += 1
        
    return get_final_move(root, game)



def get_best_move(game, epochs = 10, c=2):
        
    root = Node({
        "total_value": 0,
        "visit_count": 0,
        "move": None,
        "layer": 0
    })
    
    return monte_carlo_tree_search(root, game, epochs, c)
    