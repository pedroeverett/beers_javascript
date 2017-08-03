var beers

var makeRequest = function(url, callback) {

  var request = new XMLHttpRequest();

  request.addEventListener('load', callback);

  request.open('GET', url);
  request.send();
}

var requestComplete = function() {
  //console.log(this)
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  beers = JSON.parse(jsonString);
  populateList(beers);
}

var populateList = function(beers) {
  //console.log(beers)
  var select = document.querySelector('select');
  beers.forEach(function(beer) {
    //console.log(beer)
    var option = document.createElement('option');
    option.innerText = beer.name;

    //get localStorage
    var jsonString = localStorage.getItem("savedBeer");
    var saveDBeer = JSON.parse(jsonString);
    //console.log(saveDBeer)
    if (saveDBeer && beer.name === saveDBeer.name) {
      option.selected = true;
      populateBeerDetails(beer)
    }
    select.appendChild(option);
  })
}

var handleSelectChange = function() {
   
    var beer = beers.find(function(newBeer) {
      return this.value === newBeer.name;
    }.bind(this));
    populateBeerDetails(beer);  
}

var beerIngridients = function(beer) {
  var bing = [];
  // var bing2 = [];
  // var bing3 = [];
  // var bing4 = [];
  for (ingredients in beer.ingredients) {
  bing.push(beer.ingredients[ingredients])
  //   for ( ingredients2 of bing) {
  //     bing2.push(ingredients2)
  //   }
  //   bing3.push(bing2[0])
  // }
  //   bing4.push(bing3[0])
}
  var body = JSON.parse(bing[0])
    console.log(body)
    }


var populateBeerDetails = function(beer) {

  var ul = document.querySelector("#beer-details");
  var image = document.querySelector('#beer_image');
    image.style.height = "300px";
    image.src = beer.image_url;
  ul.innerHTML = "";

  beerIngridients(beer)

  var liName = document.createElement("li");
  var liIngredients = document.createElement("li");
 


  liName.innerText = "Name: " + beer.name;
  liIngredients.innerText = "Ingridients: " + beer.ingredients;
  //console.log(beer.ingredients)
  // liCapital.innerText = "Capital City: " + country.capital;



  ul.appendChild(liName);
  ul.appendChild(liIngredients);
  // ul.appendChild(liCapital);
  // ul.appendChild(liBorders);
  //ul.appendChild(map)
  

  //Save to localStorage  
  var savedBeer = beer;
  var jsonString = JSON.stringify(savedBeer);
  localStorage.setItem('savedBeer', jsonString);  
  
} 


var app = function () {
  var url = "https://api.punkapi.com/v2/beers";
  makeRequest(url, requestComplete)

  var selectList = document.querySelector('select')
  selectList.addEventListener('change', handleSelectChange);
}

window.addEventListener('load', app);
