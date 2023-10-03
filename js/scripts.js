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
        button.classList.add('red-button');
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

    let modalContainer = document.querySelector('#modal-container');

    function showModal(name, height, img) {
        // Clear the existing modal content
        modalContainer.innerHTML = '';

        let modal = document.createElement('div');
        modal.classList.add('modal');

        // Add the new modal content
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'X';
        closeButtonElement.addEventListener('click', hideModal);

        let titleElement = document.createElement('h1');
        titleElement.innerText = name;

        let heightElement = document.createElement('p');
        heightElement.innerText = 'Height: ' + height;

        let imageElement = document.createElement('img');
        imageElement.src = img

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(heightElement);
        modal.appendChild(imageElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');
    }

    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });

    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function () {
            showModal(item.name, item.height, item.imageUrl);
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