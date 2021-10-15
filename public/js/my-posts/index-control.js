
const $showModal = $('#show-modal')
const $editModal = $('#edit-modal')
const $showModalContent = $showModal.find('.modal-content')
const $editModalContent = $editModal.find('.modal-content')

const modalHeader = `
    <div class="modal-header">
      <h5 class="modal-title">Loading</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
    </div>
    <div class="modal-body">
      <div class="text-center">
        <i class="fas fa-spinner fa-spin"></i>
      </div>
    </div>
  `

const setShowModal = (html) => {
  $showModal.modal('show')
  $showModalContent.html(html)
}
const setEditModal = (html) => {
  $editModal.modal('show')
  $editModalContent.html(html)
}

const setLoadingShowModal = function() {
  setShowModal(modalHeader)
}

const setLoadingEditModal = () => {
  setEditModal(modalHeader)
}

const errorHandler = function(err, $elem) {
  if(err){
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
      case 404: { // can't find the path or the file
        alert(err.response.data.message)
        break
      }
      default: {
        console.log(err)
      }
    }
  } else {
    console.log(err);
  }
}

$('#posts-index, #modal').on('click', '.delete-btn', function(e) {
  e.preventDefault()
  const parent = $(e.target).parent('button')[0]
  const $elem = parent ? $(e.target).parent() : $(e.target)
  const url = $elem.data('url')

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
  setLoadingShowModal()

  axios({ method, url }).then((res) => {
    setShowModal(res.data)
  }).catch((err) => errorHandler(err, $elem))
})

// comment btn
// for universal form
$('#posts-index, #show-modal').on('click', '.reply-btn', function(e) {
  e.preventDefault()
  const $elem = $(e.target)
  const url = $elem.data('url')
  const method = $elem.data('method')
  const formData = new FormData($('#show-modal #comment-form')[0])

  $elem.attr('disabled', true)

  axios({ method, url, data: formData }).then(function(res) {
    $('#comment-list').prepend(res.data)

  }).catch((err) => errorHandler(err, $elem))
})

$('#posts-index, #edit-modal').on('click', '.edit-btn', (e) => {
  e.preventDefault()
  const $elem = $(e.target)
  const url = $elem.data('url')
  const method = $elem.data('method')
  setLoadingEditModal()

  axios({ method, url }).then((res) => {
    setEditModal(res.data)
  }).catch((err) => errorHandler(err, $elem))
})


$('#posts-index, #edit-modal').on('click', '#edit-form-submit', (e) => {
  e.preventDefault()
  const $elem = $(e.target)
  const url = $elem.data('url')
  const method = $elem.data('method')
  const formData = new FormData($('#edit-modal #edit-form')[0])
  $editModal.modal('hide')
  setLoadingShowModal()
  $elem.attr('disabled', true)


  axios({method, url, data: formData}).then((res) => {
    // setShowModal(res.data)
    window.location.reload(true)

  }).catch((err) => errorHandler(err, $elem))
})
