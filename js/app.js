
const loadBreakingNews = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url)
    const data = await res.json()
    displayBreakingNews(data.data.news_category)
}
const displayBreakingNews = (posts) => {
    const postContainer = document.getElementById('postContainer')
    posts.forEach(post => {

        const categoryDiv = document.createElement('div')
        categoryDiv.classList.add('col')
        categoryDiv.innerHTML = `
            <nav class="nav mt-3 mb-3">
                <a class="nav-link" href="#" onclick="newsClicked(${post.category_id})">${post.category_name}</a>
            </nav>
        `
        postContainer.appendChild(categoryDiv)
    })
}

const newsClicked = async (category) => {
    // console.log(category)
    const url = `https://openapi.programming-hero.com/api/news/category/0${category}`
    const res = await fetch(url)
    const data = await res.json()
    loadClickedNews(data.data)
}
const loadClickedNews = posts => {
    // console.log(posts.length)
    const totalNewsFound = document.getElementById('totalNewsFound')
    totalNewsFound.innerText = `Total post found : ${posts.length}`


    const noPostFound = document.getElementById('noPostFound')
    if (posts.length === 0) {
        noPostFound.classList.remove('d-none');
    } else {
        noPostFound.classList.add('d-none');
    }

    const loadPosts = document.getElementById('loadPosts')
    loadPosts.innerHTML = ``
    posts.forEach(post => {
        const specificPostDiv = document.createElement('div')
        specificPostDiv.classList.add('card')
        specificPostDiv.innerHTML = `

        <div class="row g-4">
            <div class="col">
                <img src="${post.thumbnail_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body mb-5">
                    <h4 class="card-title">${post.title}</h4><br>
                    <p class="card-text">${post.details.slice(1, 300)}...</p>
                </div>
                <div class="d-flex flex-row mt-5">
                    <div class="p-2"><img src="${post.author.img}" class="img-fluid author_img"></div>
                    <div class="p-2">Author - <strong>${post.author.name}</strong></div>
                    <div class="p-2">Total view - <strong>${post.total_view}</strong></div>
                    <div class="p-2">Published - <strong>${post.author.published_date}</strong></div>
                </div>
            </div>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">View details</button>
       
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">${post.title}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                    ${post.details}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
       
       
       
       
            </div>
        `
        loadPosts.appendChild(specificPostDiv)
    })
}

const loadSpecificPost = postId => {
    // console.log(postId)

}

loadBreakingNews()




