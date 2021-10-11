const $postsContainer = $('#posts-container')
const $loader = $('#loader')

let limit = 5  // big problem!!!
let data = null
console.log('infinite scroll');

let triggered = false

const displayPosts = () => {
  // big problem!!!
}

const getPosts = async () => {
  limit += 5
  console.log(limit);
  axios.get(`/api/my-posts?limit=${limit}`)
    .then( (res) => {
      console.log(res.data);
      // let html = res.data
      // console.log(html);
      window.location.href = `/api/my-posts?limit=${limit}`
      // window.location.reload(true)
    })

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
