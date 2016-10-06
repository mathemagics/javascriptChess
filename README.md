# javascriptChess
Translating ruby_chess to javascript/html/css

PIECES
- [x] pawn 
  - [x] moves
  - [x] attacks
  - [x] enpassant 
  - [x] promotion
    
- [x] knight
  - [x] moves
    
- [x] bishop 
  - [x] moves
  
- [x] rook 
  - [x] moves
  
- [x] queen 
  - [x] moves
  
- [ ] king
  - [x] moves    
  - [ ] castling  
    - needs to check attacked squares

GAME LOGIC
 - [x] switch turns
 - [x] check 
 - [x] checkmate 
 - [ ] stalemate
  - [ ] fifty moves rule
  - [ ] threefold repetition

BUGS
 - [x] selecting the same piece.
 - [x] reset colors gets wonky sometimes. bishops? white rooks? white knight? maybe back row pieces? 
 - [x] king can castle if he goes back to initial. not setting initial=false
 - [x] enpassant giving extra moves to pawns.
 - [ ] some null error is thrown when checkmate
 - [ ] king can move next to enemy king
 
REFACTOR
 - [ ] chang movePiece() Castling code to use a function to move rook. reduce repetition
 - [x] black is at the bottom
 - [ ] promotion waiting is ugly. chang it!
 
ADDITIONS
 - [ ] History
