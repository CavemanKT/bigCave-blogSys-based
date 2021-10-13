const $postsContainer = $('#posts-container')
const $loader = $('#loader')
// $loader.attr('hidden', false)    //use it later



const displayPosts = () => {
  // big problem!!!
}

const getPosts = async () => {
  let $offsetCounter = $('#offset-counter')  // assume it gives 0
  let num = $offsetCounter.text()
  num =+ 5
  console.log(num);

  $('#offset-counter').text(num)


  setTimeout(() => {
    axios({
      method: 'POST',
      url: `/offset/${num}`
    }).then( (res) => {
      let html = res.data
      let postsArr = $(html).find('.individual-post')
      console.log($('#offset-counter').text());
      // console.log(postArr[0]);
      console.log(html);

      // postsArr.forEach( (i, post) => {
        // reverse the order and then prepend to the post container
      // });

    })

  }, 1000);

  // try {
  //   const response = await fetch(`http://localhost:3000/api/my-posts?limit=${limit}`)
  //   console.log(response);
  //   data = await response.text()
  //   // console.log(data);
  //   displayPosts()
  // } catch(error) {
  //   console.log(error);
  // }
}


// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
  console.log('window.innerHeight=', window.innerHeight, 'window.scrollY= ', window.scrollY, 'document.body.offsetHeight= ', document.body.offsetHeight - 10);
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
    getPosts();
    console.log('load more');
  }
});
