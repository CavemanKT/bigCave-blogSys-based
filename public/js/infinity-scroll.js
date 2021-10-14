const $postsContainer = $('#posts-container')
const $loader = $('#loader')
// $loader.attr('hidden', false)    //use it later
let $offsetCounter = $('#offset-counter')  // assume it gives 0
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
      url: `/offset/${num}`
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


// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
  console.log('window.innerHeight=', window.innerHeight, 'window.scrollY= ', window.scrollY, 'document.body.offsetHeight= ', document.body.offsetHeight - 1);
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    getPosts();
    console.log('load more');
  }
});
