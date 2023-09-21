let pokemonList = [];

let pokemonRepository = (function () {
    pokemonList = [
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
    return {
        add: function (pokemon) {
            pokemonList.push(pokemon);
        },
        getAll: function () {
            return pokemonList;
        }
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
pokemonList.forEach(function (pokemon) {
    document.write(pokemon.name + ' (height: ' + pokemon.height + ')');
    if (pokemon.height === 0.7) {
        document.write(' - Wow, that\'s big!' + '<br>');
    } else {
        document.write('<br>');
    }
});