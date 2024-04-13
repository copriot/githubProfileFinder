const API_URL = "https://api.github.com/users/";
const form = document.getElementById ("form");
const search = document.getElementById ("search");
const main = document.getElementById ("main");

async function getUser(username) {
 try {
    const { data } = await axios (API_URL + username);
   // console.log(data);
    createUserCard(data);
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
      <a href="#"><i class="fa-solid fa-receipt"></i>githubProfileFinder</a>
      <a href="#"><i class="fa-solid fa-receipt"></i>spendingCalculatorJsProject</a>
      <a href="#"><i class="fa-solid fa-receipt"></i>weatherJsProject</a>
    </div>
  </div>
    `
    main.innerHTML = cardHTML;
}

function createErrorCard(msg){
    const cardErrorHTML = `
    <div class="card">
    <h2>Üzgünüm kral aradığın kullanıcıyı bulamadım :(</h2></div>
    `

    main.innerHTML = cardErrorHTML
}