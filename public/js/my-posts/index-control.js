const $showModal = $('#show-modal')

const setModal = (html) => {
  const $modalContent = $showModal.find('.modal-content')
  $showModal.modal('show')
  $modalContent.html(html)
}

const setLoadingModal = function() {
  setModal(`
    <div class="modal-header">
      <h5 class="modal-title">Loading</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
    </div>
    <div class="modal-body">
      <div class="text-center">
        <i class="fas fa-spinner fa-spin"></i>
      </div>
    </div>
  `)
}


const errorHandler = function(err, $elem) {
  switch(err.response.status) {
    case 406: {
      $elem.attr('disabled', false)

      const { response: { data: { errors } }} = err

      $('#modal').find('.invalid-feedback').empty()
      $('#modal').find('.is-invalid').removeClass('is-invalid')

      errors.forEach(function(error) {
        const { param: fieldName, msg } = error
        const $input = $('#modal').find(`[data-error-ref="${fieldName}"]`)
        const $invalidFeedback = $input.siblings('.invalid-feedback')

        $input.addClass('is-invalid')
        $invalidFeedback.text(msg)
      })
      break
    }
    case 401: {
      alert(err.response.data.message)
      window.location.href = '/'
      break
    }
    case 404: {
      alert(err.response.data.message)
      break
    }
    default: {
      console.log(err)
    }
  }
}

$('#posts-index, #modal').on('click', '.delete-btn', function(e) {
  e.preventDefault()
  const parent = $(e.target).parent('button')[0]
  const $elem = parent ? $(e.target).parent() : $(e.target)
  const url = $elem.data('url')
  // console.log('1:', parent, '2:', $elem, '3: ', $(e.target).parent(), '4:', $(e.target), '5:', url);   // to check if there is url
  $('#posts-index .delete-btn, #modal .delete-btn').attr('disabled', true)

  axios({ method: 'DELETE', url }).then(function() {
    $('#modal').modal('hide')
    $(`#posts-index .delete-btn[data-url="${url}"][data-method="DELETE"]`).parentsUntil('#posts-container').remove()
  }).catch(errorHandler).then(function() {
    $('#posts-index .delete-btn, #modal .delete-btn').attr('disabled', false)
  })
})

$('#posts-index, #modal').on('click', '.show-btn', (e) => {
  e.preventDefault()
  const parent = $(e.target).parent('button')[0]
  const $elem = parent ? $(e.target).parent() : $(e.target)
  const url = $elem.data('url')
  const method = $elem.data('method')

  setLoadingModal()
  axios({ method, url }).then((res) => {
    setModal(res.data)
  }).catch(errorHandler)
})

// comment btn
// for universal form
$('#show-modal').on('click', '.reply-btn', function(e) {
  e.preventDefault()
  const $elem = $(e.target)
  const url = $elem.data('url')
  const method = $elem.data('method')
  const formData = new FormData($('#modal form')[0])
  console.log('elem:', $elem, 'url:', url, 'method:', method, 'formData: ', formData);

  $elem.attr('disabled', true)

  axios({ method, url, data: formData }).then(function(res) {
    setModal(res.data)
    console.log(res.data);
    if (method === 'POST') {
      const id = $('#modal').find('.modal-title span').text()
      const title = $('#modal').find('.modal-body h1').text()
      if (id) {
        $('#wishlists-list').prepend(`
          <li class="my-1">
            <a class="show-btn font-weight-bold" data-url="/api/my/wishlists/${id}" data-method="GET">${title}</a>
            <button class="edit-btn btn btn-info btn-sm" data-url="/api/my/wishlists/${id}/edit" data-method="GET"><i class="fas fa-edit"></i></button>
            <button class="delete-btn btn btn-danger btn-sm" data-url="/api/my/wishlists/${id}" data-method="DELETE"><i class="fas fa-trash"></i></button>
          </li>
        `)
      }
    }
  }).catch((err) => errorHandler(err, $elem))
})
