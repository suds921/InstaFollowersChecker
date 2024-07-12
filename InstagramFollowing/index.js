let foList = [];
let foList2 = [];
let link2 = [];
let nonFo = [];
let nonFoLink = [];
let nums = 0;
let count = 0;

async function fetchData() {
  try {
    const response1 = await fetch('/followers.json');
    const followers = await response1.json();
    
  

    for (let i = 0; i < followers.length; i++) {
      foList.push(followers[i].string_list_data[0].value);
    }

    console.log(foList);

    const response2 = await fetch('/following.json');
    const following = await response2.json();
    


    for (let i = 0; i < following.length; i++) {
      link2.push(following[i].string_list_data[0].href);
      foList2.push(following[i].string_list_data[0].value);
    }
    console.log(foList2);



    for (let i = 0; i < foList2.length; i++) {
      if (!foList.includes(foList2[i])) {
        nonFo.push(foList2[i]);
        nonFoLink.push(link2[i]);
      }
    }


    renderNonFollowers();
  } catch (error) {
    console.error('Error fetching the JSON file: ', error);
  }
}

function renderNonFollowers() {
  for (let i = 0; i < nonFo.length; i++) {
    const li = document.createElement("ol");
    const button = document.createElement("button");
    button.classList.add("button");
    button.innerText = "Unfollow";
    button.onclick = () => { handleClick(nonFoLink[i]) };
    li.innerText = `${count + 1}. ${nonFo[i]}`;
    li.classList.add("notFollowing");
    li.style.fontWeight = "bold";
    document.body.appendChild(li);
    document.body.appendChild(button);
    count++;
  }

  nums = count;
  let title = document.getElementById("title");
  title.textContent = `${nums} people don't follow you back👀👀`;
}

function handleClick(element) {
  window.open(element);

}

fetchData();
