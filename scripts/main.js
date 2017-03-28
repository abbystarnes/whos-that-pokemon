(function () {
  var name = 'ok'
  var successClasses = 'green lighten-2 white-text'

  $('button.get-pokemon').on('click', requestNewPokemon)
  $('.pokemon-name').on('keyup', validateUserInput)
  $('.give-up').on('click', giveUp)

  /*
    If an argument is passed in to the randomPokemonURL function when invoked, the `all` variable will be set to use that value; however, if no value is entered it will default to true. This is a feature of ES6 called default parameters:
    https://mzl.la/2nqdxUs
  */

  function randomPokemonURL (all=true) {
    var bounds = all ? 720 : 151
    var id = Math.ceil(Math.random() * bounds)
    return `http://pokeapi.co/api/v2/pokemon/${id}/`
  }

  function requestNewPokemon () {
    var url = randomPokemonURL(false)

    $.get(url).then(appendPokemon).catch(handleError)
  }

  function appendPokemon (result) {
    name = result.name[0].toUpperCase() + result.name.slice(1)

    var sprite = result.sprites.front_default
    var $img = $(`<img class="hidden" src="${sprite}"/>`)

    $('.pokemon').empty().append($img)
    $('.pokemon-name').removeClass(successClasses)
      .val('').attr('disabled', false)
  }

  function validateUserInput (keyupEvent) {
    var $name = $(keyupEvent.target)
    var correctName = $name.val().trim().toLowerCase() === name.toLowerCase()

    if (correctName) {
      $('.pokemon img').removeClass('hidden')
      $name.addClass(successClasses).attr('disabled', true)
    }
  }

  function giveUp () {
    $('.pokemon img').removeClass('hidden')

    var $name = $('.pokemon-name')
    $name.val(name)
    $name.attr('disabled', true)
  }

  function handleError (error) {
    console.error(error)
    alert('Oops! Something went wrong trying to get a new Pokemon. Please try again.')
  }
})()
