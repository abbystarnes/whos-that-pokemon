(function () {
  /*
    If an argument is passed in to the randomPokemonURL function when invoked, the `all` variable will be set to use that value; however, if no value is entered it will default to true. This is a feature of ES6 called default parameters:
    https://mzl.la/2nqdxUs
  */

  function randomPokemonURL (all=true) {
    var bounds = all ? 720 : 151
    var id = Math.ceil(Math.random() * bounds)
    return `http://pokeapi.co/api/v2/pokemon/${id}/`
  }
})()


// $('.get-pokemon')
//
// $('.give-up')
//
// $('.pokemon-name')

// click get pokemon to run function
//
