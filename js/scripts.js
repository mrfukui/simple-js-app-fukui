let pokemonRepository = (function () {
    const pokemonList = [
        {
            name: 'Bulbasaur',
            type: ['Grass', 'Poison'],
            height: 0.7
        },
        {
            name: 'Charmander',
            type: ['Fire'],
            height: 0.6
        },
        {
            name: 'Squirtle',
            type: ['Water'],
            height: 0.5
        },
        {
            name: 'Pikachu',
            type: ['Electric'],
            height: 0.4
        }
    ];

    function add(pokemon) {
        if (
            typeof pokemon === "object" &&
            "name" in pokemon &&
            "height" in pokemon &&
            "types" in pokemon
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
        button.addEventListener('click', function(event) {
            showDetails(pokemon);
        });
    };

    function showDetails(pokemon) {
        console.log(pokemon);
    };


    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
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
pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});