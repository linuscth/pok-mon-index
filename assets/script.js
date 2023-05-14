// create variables to reference and grab the elements from html 
var pokeAPIcards = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
var pokeCards = $('.pokeCards');
var pokemonList = [];
var modal = $('.modal')
var modalInfoDiv = $('#modalInfoDiv')
var spanClose = $('.close')
var modalPokemonName = $('.modalPokemonName')
var modalImg = $('.modalImg')
var pokeHeight = $('.pokeHeight')
var pokeWeight = $('.pokeWeight')
var pokeType = $('.pokeType')



//fetching to get each pokemon's name and the associatedd pic 
fetch(pokeAPIcards)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);

    for (let i = 0; i < 1008; i++) {
      var pokemonName = data.results[i].name;
      pokemonList.push(pokemonName);
      var pokeCard = $('<div class="pokeCard block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">');
      var pokeImageNumber = (i + 1).toString().padStart(3, '0');
      var pokeImages = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/' + pokeImageNumber + '.png';
      var pokeImg = $('<img class="pokeImg rounded-t-lg">');
      $(pokeImg).attr('src', pokeImages);
      var pEl = $('<p class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50 text-center font-sans">');
      var clickModalBtn = $('<button class="clickModalBtn">Click</button>')
      $(pEl).text(pokemonName);
      $(pokeCard).append(pEl);
      $(pokeCard).append(pokeImg);
      $(pokeCard).append(clickModalBtn);
      $(pokeCards).append(pokeCard);
      // assigning datasets onto the pokeCard div tag. 
      $(pokeCard).data('name', pokemonName);
      $(pokeCard).data('num', pokeImageNumber);

    }

  }
  );
$("#PokeName").autocomplete({
  source: function (request, response) {
    var results = $.ui.autocomplete.filter(pokemonList, request.term);
    response(results.slice(0, 10));
  }
});

//event Listener when the click button on the poke card is clicked 
$(document).on('click', '.clickModalBtn', function () {

  // the url to get pokemon stat https://pokeapi.co/api/v2/pokemon/{id or name}/
  var parentEl = $(this).parent()
  var parentDataName = parentEl.data('name')
  var parentDataNum = parentEl.data('num')
  console.log(parentDataName);
  var pokedexUrl = 'https://pokeapi.co/api/v2/pokemon/' + parentDataName + '/'
  fetch(pokedexUrl).then(
    function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          var chosenPokemonHeight = data.height
          var chosenPokemonWeight = data.weight
          var chosenPokemonType = []
          for (let j = 0; j < data.types.length; j++) {
            chosenPokemonType.push(data.types[j].type.name)
            chosenPokemonType.toString()
            console.log(chosenPokemonType);
          }

          console.log(chosenPokemonHeight);
          console.log(chosenPokemonWeight);
          console.log(chosenPokemonType);

          $(modalPokemonName).text(parentDataName)
          $(modalImg).attr('src', 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/' + parentDataNum + '.png')
          $(pokeHeight).text('Height: ' + chosenPokemonHeight)
          $(pokeWeight).text('Weight: ' + chosenPokemonWeight)
          $(pokeType).text('Type(s): ' + chosenPokemonType.toString())




        })
      }
    }
  )
  $(modal).css("display", "block");

})


// clear all info in the modalInfoDiv tag
function clearPreviousModalInfoDiv() {
  $(modalPokemonName).empty()
  $(modalImg).attr('src', '')
  $(pokeHeight).empty()
  $(pokeWeight).empty()
  $(pokeType).empty()


}


// an even listener with the modal x is clicked
$(spanClose).click(function () {
  $(modal).css("display", "none");
  clearPreviousModalInfoDiv()
});
