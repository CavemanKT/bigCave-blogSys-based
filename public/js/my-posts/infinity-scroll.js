
let num = 0


const displayPosts = () => {
  // big problem!!!
}

const getPosts = async () => {
  num =+ 5
  // show the loader before appending to the posts-container
  $('#loader').attr('hidden', false)
  setTimeout(() => {
    axios({
      method: 'POST',
      url: `/api/offset/${num}`
    }).then( (res) => {
      let html = res.data
      let postsArr = $(html).find('.individual-post')

      // append the posts to the posts that we have
      postsArr.each( ( i, post) => {
        $('#posts-container').append(post)
      });
    })

    // hide the loader after 1s
    $('#loader').attr('hidden', true)

  }, 1000);

}

window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {   // document.body.offsetHeight - 100 is fine
    getPosts();
  }
});
