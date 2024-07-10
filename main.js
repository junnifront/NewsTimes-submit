API_KEY=`ea9e3222412340b794c8f0e70e1677e0`;
let articles = [];
const getLatestNews = async ()=> {
    let url = new URL(
        `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&pageSize=${PAGE_SIZE}`
    );
    let menus = document.querySelectorAll("#menu-list button");
    menus.forEach((menu) =>
    menu.addEventListener("click", (e) => getNewsByTopic(e))
    );


    const response = await fetch(url);
    const data = await response.json();
    articles = data.articles;
    render();
    console.log("dddd", articles);
};


const openSearchBox = () => {
    let inputArea = document.getElementById("input-area");
    if (inputArea.style.display === "inline") {
      inputArea.style.display = "none";
    } else {
      inputArea.style.display = "inline";
    }
  };


  document.getElementById("search-input").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      getNewsByKeyword();
    }
  });






const render =() => {
   const newsHTML = articles.map(
    (news)=>`<div class="row news">
                <div class="col-lg-4">
                    <img class="news-img" 
                        src="${news.urlToImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"}" />
                </div>
                <div class="col-lg-8">
                    <h2>${news.title}</h2>
                    <p>${
                        news.description == null || news.description == ""
                          ? "내용없음"
                          : news.description.length > 200
                          ? news.description.substring(0, 200) + "..."
                          : news.description
                   }</p>
                    <div>
                        ${news.source.name || "no source"}   ${moment(news.publishedAt).startOf('day').fromNow()}
                    </div>
                </div>
            </div>`
        )
        .join("");
   
   document.getElementById("news-board").innerHTML=newsHTML;
}

const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
  };
  
  const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
  };





getLatestNews();
