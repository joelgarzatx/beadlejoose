$(document).foundation();

const imgPlaceholder = 'http://placehold.it/50x50';

class Necklace {
  constructor(necklaceID) {
    this.id = necklaceID;
    this.beadPattern = [];
    console.log('New necklace created.');
  }

  addBead(beadID, position) {
    this.beadPattern[position] = beadID;
  }

  removeBead(position) {
    this.beadPattern[position] = '';
  }

  printNecklace() {
    console.log(this.beadPattern);
  }
}

let necklace = new Necklace('12345');

function placeBeads(beadID) {
  $('.bead.selected').attr("src","./images/" + beadID + ".png");
  $('.bead.selected').toggleClass('selected');
}

$('.alert.button').click(
  function() {
  $('.bead').attr('src', imgPlaceholder)
  }
)

$('.bead').click(
  function() {
    $(this).toggleClass('selected');
  }
)

$('.bead-inventory img').click(
  function(){
    placeBeads($(this).prop('id'));
  }
)
