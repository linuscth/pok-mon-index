var pokeAPIcards = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
var pokeCards = $('.pokeCards');
var pokemonList = [];

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
            var pokeImageNumber = (i+1).toString().padStart(3, '0');
            var pokeGoogleImages = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/' + pokeImageNumber + '.png';
            var pokeImg = $('<img class="pokeImg rounded-t-lg">');
            $(pokeImg).attr('src', pokeGoogleImages);
            var pEl = $('<p class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">');
            $(pEl).text(pokemonName);
            $(pokeCard).append(pEl);
            $(pokeCard).append(pokeImg);
            $(pokeCards).append(pokeCard);
            $(pokeCard).data('name', pokemonName);
            
        }
    });

      $( "#PokeName" ).autocomplete({
        source: function(request, response) {
          var results = $.ui.autocomplete.filter(pokemonList, request.term);
          response(results.slice(0, 10));
        }
      });