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
var teamDiv = $('.team')
var creatNewTeamDivBtn = $('#creatNewTeamDiv')
var savedPokemon;
var pokeWeak = $('.pokeWeak')
var pokeEffectiveness = $('.pokeEffectiveness')

//fetching to get each pokemon's name and the associatedd pic 
fetch(pokeAPIcards)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    for (let i = 0; i < 1008; i++) {
      var pokemonName = data.results[i].name;
      pokemonList.push(pokemonName);
      var pokeCard = $('<div class="pokeCard block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">');
      var pokeImageNumber = (i + 1).toString().padStart(3, '0');
      var pokeImages = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/' + pokeImageNumber + '.png';
      var pokeImg = $('<img class="pokeImg rounded-t-lg">');
      $(pokeImg).attr('src', pokeImages);
      var pEl = $('<p class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50 text-center font-sans">');
      var clickModalBtn = $('<button class="clickModalBtn">Click</button>');
      $(pEl).text(pokemonName);
      $(pokeCard).append(pEl);
      $(pokeCard).append(pokeImg);
      $(pokeCard).append(clickModalBtn);
      var addTeamBtn = $('<button class="addTeamBtn">+Add</button>');
      $(pokeCard).append(addTeamBtn);
      $(pokeCard).attr('id', pokemonName);
      $(pokeCards).append(pokeCard);
    }
  });

// searchbar autocomplete with limited results (max 10 at a time)
$("#PokeName").autocomplete({
  source: function (request, response) {
    var results = $.ui.autocomplete.filter(pokemonList, request.term);
    response(results.slice(0, 10));
  }
});

//event Listener when the click button on the poke card is clicked 
$(document).on('click', '.clickModalBtn', function () {
  // grabs name of pokemon we're looking at so we can use it to fetch pokemon info
  var parentEl = $(this).siblings('p').text();
  var pokedexUrl = 'https://pokeapi.co/api/v2/pokemon/' + parentEl + '/';
  // var pokeEffectivenessUrl = 'https://pokeapi.co/api/v2/type/' + parentEl + '/';
  fetch(pokedexUrl).then(
    function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          var chosenPokemonHeight = data.height
          var chosenPokemonWeight = data.weight
          var chosenPokemonType = []
          var arrWeak = [];
          var arrEff = [];

          for (let j = 0; j < data.types.length; j++) {
            chosenPokemonType.push(data.types[j].type.name)

          }
          for (let k = 0; k < chosenPokemonType.length; k++) {
            var type = chosenPokemonType[k];
            var typeEffectivenessUrl = 'https://pokeapi.co/api/v2/type/' + type + '/';
            fetch(typeEffectivenessUrl).then(function (response) {
              if (response.ok) {
                response.json().then(function (data) {
                  var arrayOfWeakness = data.damage_relations.double_damage_from

                  var arrayOfEffectiveness = data.damage_relations.double_damage_to

                  for (let a = 0; a < arrayOfWeakness.length; a++) {
                    arrWeak.push(arrayOfWeakness[a].name)
                    console.log(arrayOfWeakness[a].name);
                  }
                  for (let b = 0; b < arrayOfEffectiveness.length; b++) {
                    arrEff.push(arrayOfEffectiveness[b].name)
                    console.log(arrayOfEffectiveness[b].name);
                  }
                  $(pokeEffectiveness).text('effectiveness: ' + arrEff.toString())
                  $(pokeWeak).text('weakness: ' + arrWeak.toString())

                })
              }
            })


          }

          // retrieves pokemon number and formats it to work with img url
          var pokemonNum = data.id.toString().padStart(3, '0');
          $(modalPokemonName).text(parentEl)
          $(modalImg).attr('src', 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/' + pokemonNum + '.png')
          $(pokeHeight).text('Height: ' + chosenPokemonHeight)
          $(pokeWeight).text('Weight: ' + chosenPokemonWeight)
          $(pokeType).text('Type(s): ' + chosenPokemonType.toString())
          // $(pokeWeak).text('weakness: ' + text)
          // $(pokeEffectiveness).text('effectiveness: ' + arrEff.toString())

        })
      }
    }
  )
  $(modal).css("display", "block");
});


// clear all info in the modalInfoDiv tag
function clearPreviousModalInfoDiv() {
  $(modalPokemonName).empty();
  $(modalImg).attr('src', '');
  $(pokeHeight).empty();
  $(pokeWeight).empty();
  $(pokeType).empty();
  $(pokeWeak).empty();
  $(pokeEffectiveness).empty();
}


// an even listener with the modal x is clicked
$(spanClose).click(function () {
  $(modal).css("display", "none");
  clearPreviousModalInfoDiv()
});

// scrolls down to searched pokemon and handles invalid searches
$('#search-btn').on('click', function () {
  var name = $('#PokeName').val();
  if (pokemonList.includes(name)) { // checks search validity
    $("#PokeName").attr("style", "border:");
    $("#searchform").removeClass('invalid');
    var pokeId = "#" + $('#PokeName').val();
    $('html, body').animate({
      scrollTop: $(pokeId).offset().top
    },
      'slow');
    $(pokeId).attr("style", "background-color: #ff9f30; transition: 0.5s");
    setTimeout(function () {
      $(pokeId).attr("style", "background-color:; transition: 0.5s");
    }, 2000);
  } else { // if invalid search we style searchbar and tell user it's invalid
    $("#PokeName").attr("style", "border: 2px solid red");
    $("#searchform").addClass('invalid');
  }
});

// event listener to create a new team of pokemon
$(document).on('click', '.addTeamBtn', function () {
  var teamParentEl = $(this).parent();

  // handles team length being more than 6
  if ($('.generatedTeam').children().length < 6) {
    var teamSlotDiv = $('<div class="slot">');
    var removePokeCardBtn = $('<button id="removeBtn" class="rounded-full bg-red-300 " type="button">Remove</button>')

    // creates clone of pokemon card we want to add to team
    var pokeCardsClone = $(teamParentEl).clone(true).removeAttr('id');
    pokeCardsClone.find('.addTeamBtn').remove();

    $(pokeCardsClone).append(removePokeCardBtn);

    $(pokeCardsClone).appendTo(teamSlotDiv);
    $('.generatedTeam').append(teamSlotDiv);

  }
});

// create team button
$(document).on('click', '#creatNewTeamDiv', function () {
  var generatedTeamDiv = $('<div class= "generatedTeam flex ">');
  $(teamDiv).append(generatedTeamDiv);
  $(this).css('display', 'none');
})

// save team button
$(document).on('click', '#saveToTeam', function () {
  var slots = $(".generatedTeam").children();
  savedPokemon = []; // empties savedPokemon array to clear data for each save
  for (let i = 0; i < slots.length; i++) {
    savedPokemon.push(slots[i].outerHTML); // saves html content of each child (slot/card) so we can store and display later
  }
  localStorage.setItem("team", JSON.stringify(savedPokemon));
});

// initialize, retrieve local storage
function init() {
  var team = localStorage.getItem("team");
  // handles if local storage is empty or team is empty
  if (team === null || team === "[]") {
    savedPokemon = [];
  } else {
    // if we have an existing team we grab it, make a container for it
    // then display each card one by one
    savedPokemon = JSON.parse(team);
    var generatedTeamDiv = $('<div class= "generatedTeam flex ">');
    $(teamDiv).append(generatedTeamDiv);
    for (let i = 0; i < savedPokemon.length; i++) {
      generatedTeamDiv.append($(savedPokemon[i]));
    }
    // hides create team button since we already have one
    $('#creatNewTeamDiv ').css('display', 'none');
  }
}
//event listner for the remove button
$(document).on('click', '#removeBtn', function () {
  $(this).parent().parent().remove();
});






// initialize
init();