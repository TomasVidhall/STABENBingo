var maxNumber = 99;
var minNumber = 1;
var numberOfCards = 2;
var numberOfRows = 3;
var numberOfCols = 3;
var numberOfCardsPerPage = 1;


var usedNumber = {};
resetUsedNumber();

function resetUsedNumber(){
  for (var i = minNumber; i <= maxNumber; i++) {
    usedNumber[i] = false;
  }
}

function generateCards(){
  numberOfCards = document.getElementById('numberOfCards').value;
  numberOfCardsPerPage = document.getElementById('numberOfCardsPerPage').value;
  numberOfRows = document.getElementById('numberOfRows').value;
  numberOfCols = document.getElementById('numberOfCols').value;
  minNumber = document.getElementById('minNumber').value;
  //+1 to include the max number
  maxNumber = parseInt(document.getElementById('maxNumber').value)+1;
  if(maxNumber-minNumber < numberOfRows*numberOfCols){
    alert('You need at least ' + numberOfRows*numberOfCols + ' free numbers to fill each card');
    return;
  }
  document.body.innerHTML = "";

  var numberOfPages = Math.ceil(numberOfCards/numberOfCardsPerPage);
  for(var i = 0; i < numberOfPages; i++){
    var page = document.createElement("page");
    page.setAttribute("size", "A4");
    for(var p = 0; p < numberOfCardsPerPage; p++){
      var card = createCard(usedNumber);
      resetUsedNumber();
      page.appendChild(card);
    }

    document.body.appendChild(page);
  }
}

function createCard(usedNumber){
  var card = document.createElement("div");
  card.setAttribute("class", "card");
  for(var j = 0; j < numberOfRows; j++){
    var row = document.createElement("div");
    row.setAttribute("class", "row");
    for(var k= 0; k < numberOfCols; k++){
      var square = document.createElement("div");
      square.setAttribute("class", "square");
      do{
        var number = randomIntFromInterval(minNumber, maxNumber);
      }
      while(usedNumber[number] || number < minNumber || number > maxNumber);
      usedNumber[number] = true;
      square.innerHTML = number;
      row.appendChild(square);
    }
    card.appendChild(row);
  }
  return card;
}

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}
