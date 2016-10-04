# javascriptChess
Translating ruby_chess to javascript/html/css

PIECES
- [ ] pawn 
  - [x] moves
  - [x] attacks
  - [ ] enpassant 
  - [ ] promotion
    
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
 - [ ] checkmate 
 - [ ] stalemate

BUGS
 - [x]  selecting the same piece.
 - [x]  reset colors gets wonky sometimes. bishops? white rooks? white knight? maybe back row pieces? 
 
REFACTOR
 - [ ] movePiece() Castling code to use a function to move rook. reduce repetition
