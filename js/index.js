const input = document.querySelector(".search__input");
const api_key = "3zo1-ZQTJviZQ_qXaXBL69Z_9TOMMTRaV7R1PYBRK5s";
const random_url = `https://api.unsplash.com/photos/?client_id=${api_key}`;
const searchBtn = document.querySelector("#search__button");
const cards = document.querySelector(".main__cards");
const notResults = document.querySelector(".not-results")



searchBtn.addEventListener('click', render)
input.addEventListener("keypress", (e) => {
    if (e.code == "Enter") {
        render()
    }
})

function render() {
    const search_url = `https://api.unsplash.com/search/photos/?query=${input.value}&client_id=${api_key}`;
    fetch(search_url)
        .then(data => data.json())
        .then(res => {
            console.log(res);
            cards.innerHTML = ""
            if (!res.results.length) {
                notResults.classList.replace("hidden", "visible");
            } else {
                notResults.classList.replace("visible", "hidden")
            }
            res.results.forEach((item,index) => {
                let image = item.urls.regular;
                let userImage = item.user.profile_image.small;
                let link = item.links.download;
                let title = item.user.first_name;
                const card = `
                    <div class="main__card" style="background-image: url('${image}');">
                        <div class="main__card-content">
                            <div class="main__card-top">
                                <div class="heart__icon gray">
                                    <i class="fas fa-heart"></i>
                                </div>
                                <div class="plus__icon">
                                    <i class="fas fa-plus"></i>
                                </div>
                            </div>
                            <div class="main__card-bottom">
                                <div class="main__card-info">
                                    <div class="main__card-imgbox">
                                        <img src="${userImage}" alt="image...">
                                    </div>
                                    <a href="${link}" class="main__card-user">
                                        <span>${title.length > 15 ? title.slice(0,16):title}</span>
                                    </a>
                                </div>
                                <a href="${link}"  download="Muslim Coders" class="download__icon">
                                    <i class="fas fa-arrow-down"></i>
                                </a>
                            </div>
                        </div>
                    </div> `;
                cards.innerHTML += card;
                const heartIcons = document.querySelectorAll(".heart__icon");
              
                heartIcons.forEach(heartIcon =>{
                    heartIcon.addEventListener('click', () => {
                        if(heartIcon.classList.contains("gray")){
                            heartIcon.classList.replace("gray","fill");
                        }else{
                            heartIcon.classList.replace("fill","gray");
                        }
                    });
                })
            });
        })
}