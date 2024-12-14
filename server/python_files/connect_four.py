import os

def clear_screen():
    # For Windows
    if os.name == 'nt':
        os.system('cls')
    # For MacOS and Linux
    else:
        os.system('clear')

class ConnectFour:
    ROWS = 6
    COLS = 7

    def __init__(self, state_string=None):
        """Initialize the game board and state."""
        self.board = self.create_board()
        self.turn = 1
        self.winner = None
        self.game_over = False
        self.move_history = []
        
        if state_string:
            self.load_from_string(state_string)

    def create_board(self):
        """Create an empty game board."""
        return [[" " for _ in range(self.COLS)] for _ in range(self.ROWS)]

    def print_board(self):
        """Print the game board."""
        for row in self.board:
            print("|" + "|".join(row) + "|")
        print("-0-1-2-3-4-5-6-")

    def is_valid_move(self, col):
        """Check if a move is valid (column is not full)."""
        return self.board[0][col] == " "

    def get_possible_moves(self):
        """Return a list of all possible current moves (valid columns)."""
        return [col for col in range(self.COLS) if self.is_valid_move(col)]
    
    def get_next_open_row(self, col):
        """Find the next open row in a column."""
        for r in range(self.ROWS - 1, -1, -1):
            if self.board[r][col] == " ":
                return r
        return -1

    def drop_piece(self, row, col, piece):
        """Drop a piece in the selected column."""
        self.board[row][col] = piece

    def winning_move(self, board, piece):
        """Check if the current player has won."""
        # Check horizontal locations
        for r in range(self.ROWS):
            for c in range(self.COLS - 3):
                if all(board[r][c + i] == piece for i in range(4)):
                    return True

        # Check vertical locations
        for r in range(self.ROWS - 3):
            for c in range(self.COLS):
                if all(board[r + i][c] == piece for i in range(4)):
                    return True

        # Check positively sloped diagonals
        for r in range(self.ROWS - 3):
            for c in range(self.COLS - 3):
                if all(board[r + i][c + i] == piece for i in range(4)):
                    return True

        # Check negatively sloped diagonals
        for r in range(3, self.ROWS):
            for c in range(self.COLS - 3):
                if all(board[r - i][c + i] == piece for i in range(4)):
                    return True

        return False

    def is_full(self):
        """Check if the board is full."""
        return all(self.board[0][c] != " " for c in range(self.COLS))

    def next_turn(self):
        """Alternate turn between 1 and -1."""
        self.turn *= -1

    def make_move(self, col):
        """Make a move for the current player."""
        symbol = self.get_piece_based_on_turn(self.turn)
        
        if not self.is_valid_move(col):
            print("Invalid move. Try again.")
            return False
        
        row = self.get_next_open_row(col)
        self.drop_piece(row, col, symbol)
        
        # Save the current state of the board for undo
        self.move_history.append((row, col, symbol))  # Store the move made
        
        # Check for a win
        self.check_for_win()
        
        self.next_turn()
        return True

    def get_piece_based_on_turn(self, turn):
        """Return the piece symbol for the current turn."""
        return "X" if turn == 1 else "O"
        
    def get_input_from_user(self):
        """Prompt the user for a column input."""
        piece = self.get_piece_based_on_turn(self.turn)
        if self.turn == -1:
            turn = 2
        else:
            turn = 1
            
        while True:
            try:
                col = int(input(f"Player {turn} ({piece}), choose a column (0-{self.COLS - 1}): "))
                if col < 0 or col >= self.COLS or not self.is_valid_move(col):
                    print("Invalid move. Try again.")
                    continue
                break
            except ValueError:
                print("Please enter a valid column number.")
        return col

    def check_for_win(self):
        """Check for a win or a draw."""
        piece_x = self.get_piece_based_on_turn(1)
        piece_o = self.get_piece_based_on_turn(-1)
        self.game_over = True
        if self.winning_move(self.board,piece_x) :
            self.winner = 1
        elif self.winning_move(self.board,piece_o):
            self.winner = -1
        elif self.is_full():
            self.winner = 0
        else:
            self.game_over = False
            self.winner = None

    def undo_move(self):
        """Undo the last move made."""
        if not self.move_history:
            print("No moves to undo.")
            return False

        # Get the last move and remove it from history
        last_move = self.move_history.pop()
        row, col, symbol = last_move

        # Reset the board cell
        self.board[row][col] = " "

        # Switch the turn back
        self.turn *= -1
        self.game_over = False
        self.winner = None
        return True
    
    def is_legal_board(self, board, turn):
        """Check if the current board state is legal."""
        # Count pieces on the board
        x_count = sum(row.count("X") for row in board)
        o_count = sum(row.count("O") for row in board)

        # Check piece count balance
        if abs(x_count - o_count) > 1:
            print("Invalid board state: Piece count imbalance.")
            return False

        # Check that the first player (turn = 1) cannot play when pieces are not balanced
        if turn == 1 and x_count != o_count:
            print("Invalid board state: First player cannot play when pieces are not balanced.")
            return False
        
        if turn == -1 and x_count - o_count != 1:
            print("Invalid board state: Second player cannot play when there arent more x pieces then o.")
            return False

        # Check for floating pieces (no gaps allowed below filled cells)
        for c in range(self.COLS):
            piece_found = False
            for r in range(self.ROWS):
                if board[r][c] != " ":
                    piece_found = True
                elif piece_found and board[r][c] == " ":
                    print("Invalid board state: Floating pieces are not allowed.")
                    return False

        return True


    def get_board_state_as_string(self):
        """Return a string representation of the board and current turn."""
        board_state = "".join(["".join(row) for row in self.board])
        return f"{board_state},{self.turn}"

    def load_from_string(self, state_string):
        """Load the board and current turn from a string."""
        board_state, turn = state_string.split(",")
        board = [list(board_state[i:i + self.COLS]) for i in range(0, len(board_state), self.COLS)] 
        turn = int(turn)
        
        if not self.is_legal_board(board, turn):
            raise Exception("Invalid board state")
        
        self.board = board
        self.turn = turn
        
        self.move_history = []  # Clear move history
        
        self.check_for_win()
        
    def play_turn(self, col=None):
        """Play a single turn of the game."""
        
        # Clear the screen
        clear_screen()
        
        # Check if the game is over
        if self.game_over:
            self.display_end_game_message(self.get_result())
            return
                
        # Print the board
        self.print_board()
        
        # Get the player's input
        if col is None:
            col = self.get_input_from_user()
        
        # Drop the piece
        self.make_move(col)

        # Check for a win
        self.check_for_win()

        result = self.get_result()
        
        self.display_end_game_message(result)
            
    def display_end_game_message(self, result):
        if result is not None:
            # Display results
            clear_screen()
            self.print_board()
            if result in [1, -1]:
                print(f"Player {self.get_piece_based_on_turn(result)} wins!")
            elif result == 0:
                print("Draw!")

    def get_result(self):
        """Check for a win, 0 for draw, 1 for player 1 win, -1 for player 2 win."""
        if self.game_over:
            if self.winner == 1:
                return 1
            elif self.winner == -1:
                return -1
            else:
                return 0
        else:
            return None
        
    def play_game(self):
        """Main function to play the game."""
        self.print_board()
        while not self.game_over:
            self.play_turn()
            


# Run the game
if __name__ == "__main__":
    game = ConnectFour()
    game.play_game()
