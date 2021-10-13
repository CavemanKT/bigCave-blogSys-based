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

$('#posts-index, #modal').on('click', '.show-btn', (e) => {
  e.preventDefault()
  const parent = $(e.target).parent('button')[0]
  const $elem = parent ? $(e.target).parent() : $(e.target)
  const url = $elem.data('url')
  const method = $elem.data('method')
  setLoadingModal()
  // console.log('elem:', $elem[0], 'url:', url, 'method:', method);


  axios({ method, url }).then((res) => {
    setModal(res.data)
  }).catch((err) => errorHandler(err, $elem))
})

// comment btn
// for universal form                      mission:!!! prepend the comment
$('#posts-index, #show-modal').on('click', '.reply-btn', function(e) {
  e.preventDefault()
  const $elem = $(e.target)
  const url = $elem.data('url')
  const method = $elem.data('method')
  const formData = new FormData($('#show-modal #comment-form')[0])
  console.log('elem:', $elem[0], 'url:', url, 'method:', method, 'formData: ',formData);

  $elem.attr('disabled', true)

  axios({ method, url, data: formData }).then(function(res) {
    setModal(res.data)
  }).catch((err) => errorHandler(err, $elem))
})
