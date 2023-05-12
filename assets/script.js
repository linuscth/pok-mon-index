var pokeAPIcards = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
var pokeCards = $('.pokeCards');


fetch(pokeAPIcards)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);

        for (let i = 0; i < 1008; i++) {
            var pokemonName = data.results[i].name;
            var pokeCard = $('<div class="pokeCard block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">');
            var pokeImageNumber = (i + 1).toString().padStart(3, '0');
            var pokeGoogleImages = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/' + pokeImageNumber + '.png';
            var pokeImg = $('<img class="pokeImg rounded-t-lg">');
            $(pokeImg).attr('src', pokeGoogleImages);
            var pEl = $('<p class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50 text-center font-sans">');
            $(pEl).text(pokemonName);
            $(pokeCard).append(pEl);
            $(pokeCard).append(pokeImg);
            $(pokeCards).append(pokeCard);
            $(pokeCard).data('name', pokemonName);





            // var modalDiv1 = $('<div data-te-modal-init class="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none" tabindex="-1 aria-labelledby="exampleModalXlLabel" aria-modal="true" role="dialog"">')
            // var modalDiv2 = $('<div data-te-modal-dialog-ref class="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px] min-[992px]:max-w-[800px] min-[1200px]:max-w-[1140px]">')
            // var modalDiv3 = $('<div class="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">')
            // var modalDiv4 = $('<div class="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">')
            // var modalh55 = $('<h5 class="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200" id="exampleModalXlLabel">')
            // var modalCloseBtn6 = $('<button type="button" class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none" data-te-modal-dismiss aria-label="Close">')
            // var modalSvg7 = $('<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">')
            // var modalPath8 = $(' <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />')
            // var modalDiv9 = $('<div class="relative p-4">')

            // var buttonCard = $('<button type="button" class= "inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]" data-te-toggle="modal" data-te-toggle="modal" data-te-ripple-init data-te-ripple-color="light"> ')



            // $(buttonCard).attr('data-te-target', pokemonName)
            // $(modalDiv1).attr('id', pokemonName)


            // $(modalh55).text(pokemonName)
            // $(modalDiv9).text('hello')
            // $(buttonCard).text('click')



            // $(modalSvg7).append(modalPath8)
            // $(modalCloseBtn6).append(modalSvg7)
            // $(modalDiv4).append(modalh55)
            // $(modalDiv4).append(modalCloseBtn6)
            // $(modalDiv3).append(modalDiv4)
            // $(modalDiv3).append(modalDiv9)
            // $(modalDiv2).append(modalDiv3)
            // $(modalDiv1).append(modalDiv2)

            // $(pokeCard).append(buttonCard)










        }

    }
    );

// import { Modal, Ripple, initTE } from "tw-elements";

// fetch(pokeAPIcards)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);

//         // ... Rest of your code ...

//         // Initialize the tw-elements library
//         initTE({ Modal, Ripple });

//     });