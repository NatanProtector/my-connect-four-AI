from MonteCarloTreeSearch import get_best_move
from connect_four import ConnectFour
import time
import sys

arguments = sys.argv[1:]

epochs = int(arguments[0])

c = int(arguments[1])

try:
    board = arguments[2]  
except:
    board = "------------------------------------------,-1"

# Replace '-' with ' '
board = board.replace("-", " ")

game = ConnectFour(board)

best_estimated_move = get_best_move(game, epochs, c)

game.make_move(best_estimated_move)

result = game.get_board_state_as_string()

game.print_board()