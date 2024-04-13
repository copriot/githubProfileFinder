const API_URL = "https://api.github.com/users/";
const form = document.getElementById ("form");
const search = document.getElementById ("search");
const main = document.getElementById ("main");

async function getUser(username) {
 try {
    const { data } = await axios (API_URL + username);
   // console.log(data);
    createUserCard(data);
    getRepos(username);
 }catch(err){
    //console.log(err);
    createErrorCard("Üzgünüm aradığın kullanıcıyı bulamadım :(");
 }
}
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const user = search.value
    if (user) {
        getUser(user)
        search.value= ''
    }
})

function createUserCard (user) {
const userName= user.name || user.login;
const userBio= user.bio ? `<p>${user.bio}</p>` : '';



    const cardHTML = `
    <div class="card">
    <img
      src=${user.avatar_url}
      alt=${user.name}/>
    <h1>${userName}</h1>
    <small>@${user.login}</small>
    <p>${userBio}</p>
    <ul class="user-info">
      <li class="followers info">
        <i class="fa-solid fa-users"> ${user.followers}</i>
        <p>Followers</p>
      </li>
      <li class="following info">
        <i class="fa-solid fa-user-plus"> ${user.following}</i>
        <p>Following</p>
      </li>
      <li class="repositories info">
        <i class="fa-solid fa-book"> ${user.public_repos}</i>
        <p>Repositories</p>
      </li>
    </ul>
    <div class="repos" id="repos">
      
    </div>
  </div>
    `
    main.innerHTML = cardHTML;
}

function createErrorCard(msg){
    const cardErrorHTML = `
    <div class="card">
    <h2> ${msg}</h2></div>
    `

    main.innerHTML = cardErrorHTML
};

async function getRepos(username) {
    try{
        const {data} = await axios(API_URL + username + "/repos")
        //console.log(data)
        addReposToCard(data)
    }
    catch(err){
    //console.log(err)
    createErrorCard("Üzgünüm repoları çekerken hata oldu kral :(")
    }
}

function addReposToCard(repos){
    const reposElement = document.getElementById("repos")
    repos.slice(7,10).forEach((repo)=>{
        const reposLink = document.createElement("a")
        reposLink.href=repo.html_url
        reposLink.target="_blank"
        reposLink.innerHTML=`
        <i class="fa-solid fa-receipt"></i>${repo.name}
        `
        reposElement.appendChild(reposLink)
    })
}