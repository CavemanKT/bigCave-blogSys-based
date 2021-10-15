
const getPosts = async () => {
  const $loader = $('#loader')

  if ($loader.hasClass('d-none')) {
    $loader.removeClass('d-none').addClass('d-block')
    const offset = $(".offset-count").last().data('offset')

    axios({
      method: 'GET',
      url: `/api/posts?offset=${offset}`
    }).then( (res) => {
      let html = res.data
      $('#posts-container').append(html)
    }).finally(() => {
      $loader.removeClass('d-block').addClass('d-none')
    })
  }
}

window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {   // document.body.offsetHeight - 100 is fine
    getPosts();
  }
});
