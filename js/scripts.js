let pokemonRepository = (function () {
    const pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        if (
            typeof pokemon === "object" &&
            "name" in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log("pokemon is not correct");
        }
    };

    function getAll() {
        return pokemonList
    };


    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list')
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('purple-button');
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
        // Event Listener that showDetails with a click
        button.addEventListener('click', function (event) {
            showDetails(pokemon);
        });
    };

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    };

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // Now we add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    };

    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function () {
            console.log(item);
        });
    };

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})();



// for loop listing pokemon names and heights
// for (let i = 0; i < pokemonList.length; i++) {

//     document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')');
//     // condition adding a comment on the pokemon with height 0.7
//     if (pokemonList[i].height === 0.7) {
//         document.write(' - Wow, that\'s big!' + '<br>');
//     } else {
//         document.write('<br>');
//     };
// };


// forEach loop instead of the for loop
// pokemonRepository.getAll().forEach(function (pokemon) {
//     pokemonRepository.addListItem(pokemon);
// });

pokemonRepository.loadList().then(function () {
    // Now the data is loaded
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});

function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
        console.log(pokemon);
    });
};