(function () {
  var name = 'ok'
  var successClasses = 'green lighten-2 white-text'

  /*
    If an argument is passed in to the randomPokemonURL function when invoked, the `all` variable will be set to use that value; however, if no value is entered it will default to true. This is a feature of ES6 called default parameters:
    https://mzl.la/2nqdxUs
  */

  function randomPokemonURL (all=true) {
    var bounds = all ? 720 : 151
    var id = Math.ceil(Math.random() * bounds)
    return `http://pokeapi.co/api/v2/pokemon/${id}/`
  }

  $('button.get-pokemon').on('click', function () {
    var url = randomPokemonURL(false)

    $.get(url).then(function (result) {
      name = result.name[0].toUpperCase() + result.name.slice(1)
      var sprite = result.sprites.front_default
      var $img = $(`<img class="hidden" src="${sprite}"/>`)
      $('.pokemon').empty().append($img)
      $('.pokemon-name').removeClass(successClasses).val('').attr('disabled', false)
    }).catch(function (error) {
      console.error(error)
    })
  })

  $('.pokemon-name').on('keyup', function (event) {
    var $name = $(event.target)
    var correctName = $name.val().trim().toLowerCase() === name.toLowerCase()

    if (correctName) {
      $('.pokemon img').removeClass('hidden')
      $name.addClass(successClasses)
      $name.attr('disabled', true)
    } else {
      $name.removeClass(successClasses)
    }
  })

  $('.give-up').on('click', function () {
    $('.pokemon img').removeClass('hidden')

    var $name = $('.pokemon-name')
    $name.val(name)
    $name.attr('disabled', true)
  })
})()
