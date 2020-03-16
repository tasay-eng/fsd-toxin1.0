_room = document.querySelector(card_id)
const cards = document.querySelectorAll('.room-card')
console.log(cards)
for (var card of cards){
  var card_id = '#'+card.id
  slideShow(card_id,'.slider', {
    isAutoplay: false,
  });
}