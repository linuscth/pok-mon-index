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
var creatNewTeamDivBtn = $('#creatNewTeam')
var creatNewTeamDiv = $('.creatNewTeamDiv')
var savedPokemon = [];
var previousTeam = $('.previousTeam')

//fetching to get each pokemon's name and the associatedd pic 
fetch(pokeAPIcards)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {

    for (let i = 0; i < 1008; i++) {
      var pokemonName = data.results[i].name;
      pokemonList.push(pokemonName);
      var pokeCard = $('<div class="pokeCard block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 w-40 h-100">');
      var pokeImageNumber = (i + 1).toString().padStart(3, '0');
      var pokeImages = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/' + pokeImageNumber + '.png';
      var pokeImg = $('<img class="pokeImg rounded-t-lg">');
      $(pokeImg).attr('src', pokeImages);
      var pEl = $('<p class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50 text-center font-sans">');
      var clickModalBtn = $('<button class="clickModalBtn bg-sky-300">Click</button>');
      $(pEl).text(pokemonName);
      $(pokeCard).append(pEl);
      $(pokeCard).append(pokeImg);
      $(pokeCard).append(clickModalBtn);
      var addTeamBtn = $('<button class="addTeamBtn">+Add</button>');
      $(pokeCard).append(addTeamBtn);
      $(pokeCard).attr('id', pokemonName);
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
  var pokedexUrl = 'https://pokeapi.co/api/v2/pokemon/' + parentDataName + '/'
  fetch(pokedexUrl).then(
    function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          var chosenPokemonHeight = data.height
          var chosenPokemonWeight = data.weight
          var chosenPokemonType = []
          for (let j = 0; j < data.types.length; j++) {
            chosenPokemonType.push(data.types[j].type.name)
            chosenPokemonType.toString()
          }

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

// scrolls down to searched pokemon and handles invalid searches
$('#search-btn').on('click', function () {
  var name = $('#PokeName').val();
  if (pokemonList.includes(name)) {
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
  } else {
    $("#PokeName").attr("style", "border: 2px solid red");
    $("#searchform").addClass('invalid');
  }
});

// event listener to create a new team of pokemon
$(document).on('click', '.addTeamBtn', function () {
  var teamParentEl = $(this).parent()
  var teamDataName = teamParentEl.data('name')
  var teamDataNum = teamParentEl.data('num')
  //var teamImg = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/' + teamDataNum + '.png'
  // var generatedTeamDiv = $('<div class= "generatedTeam ">');

  console.log($('.generatedTeam').children().length);

  if ($('.generatedTeam').children().length < 6) {
    var teamSlotDiv = $('<div class="slot w-40 h-100">');
    var removePokeCardBtn = $('<button id="removeBtn" class="rounded-full bg-red-300 " type="button">Remove</button>')
    //var teamImgEl = $('<img>');
    //$(teamImgEl).attr('src', teamImg);
    var pokeCardsClone = $(teamParentEl).clone(true).removeAttr('id');
    pokeCardsClone.find('.addTeamBtn').remove()

    $(pokeCardsClone).append(removePokeCardBtn)
    console.log(pokeCardsClone);

    $(pokeCardsClone).appendTo(teamSlotDiv);
    $('.generatedTeam').append(teamSlotDiv);

  }
});
//click event listener to create a team
$(document).on('click', '#creatNewTeam', function () {
  var generatedTeamDiv = $('<div class= "generatedTeam flex ">');
  $(creatNewTeamDiv).append(generatedTeamDiv)
  $(this).css('display', 'none')
})

//click event listner to save team
$(document).on('click', '#saveToTeam', function () {
  console.log('hi');
  savedPokemon = []
  var slots = $(".generatedTeam").children();
  for (let i = 0; i < slots.length; i++) {
    var savedName = slots[i].childNodes[0].getElementsByTagName("p")[0].textContent
    savedPokemon.push(savedName)
  }
  console.log(savedPokemon);
  setLocalStorage(savedPokemon)
  // for (let i = 0; i < slots.length; i++) {
  //   console.log(slots[i])
  //   $(savedPokemon).push($(slots[i]));
  // }
  // localStorage.setItem("team", savedPokemon.innerHTML);
}

)
//init function
function init() {
  var team = localStorage.getItem("team");
  if (team === null) {
    savedPokemon = [];
  }
  else {
    savedPokemon = JSON.parse(team);
    console.log(savedPokemon);
    displayPreviousTeam(savedPokemon)
  }
}


init();


//click event listner for removeBtn 
$(document).on('click', '#removeBtn', function () {
  $(this).parent().parent().remove()

})

//function for set localstorage
function setLocalStorage(savedPokemon) {
  console.log(savedPokemon);
  localStorage.setItem('team', JSON.stringify(savedPokemon))
}

function displayPreviousTeam(arr) {
  for (let i = 0; i < arr.length; i++) {
    var previousSavedName = arr[i]
    var fetchPreviousUrl = 'https://pokeapi.co/api/v2/pokemon-species/' + previousSavedName + '/'
    fetch(fetchPreviousUrl).then(function (response) {
      if (response.ok) {
        response.json().then(
          function (data) {
            console.log(data);
            var fetchPokeName = data.name
            var fetchPokeId = data.id.toString().padStart(3, '0');
            var previousTeamPicUrl = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/' + fetchPokeId + '.png';


            var previousLocalTeamDiv = $('<div class= "previousLocalTeamDiv pokeCard block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 w-40 h-100">')
            var previousLocalPEl = $('<p>')
            var previousLocalImgEl = $('<img>')
            var previousLocalClickMoalBtn = $('<button class="clickModalBtn bg-sky-300">Click</button>')
            $(previousLocalImgEl).attr('src', previousTeamPicUrl);
            $(previousLocalPEl).text(fetchPokeName);

            $(previousLocalTeamDiv).append(previousLocalPEl)
            $(previousLocalTeamDiv).append(previousLocalImgEl)
            $(previousLocalTeamDiv).append(previousLocalClickMoalBtn)
            $(previousTeam).append(previousLocalTeamDiv)


            $(previousLocalTeamDiv).data('name', fetchPokeName);
            $(previousLocalTeamDiv).data('num', fetchPokeId);


          }
        )
      }
    })
  }

}
//will need later
// https://pokeapi.co/api/v2/pokemon-species/{id or name}/