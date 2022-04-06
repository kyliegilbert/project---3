
var searchFormEl = document.querySelector(".search-form")
const searchInput = document.querySelector(".input-search");
var tableBody = document.getElementById("repo-table");
var fetchButton = document.getElementById("fetch-button");
var video1 = document.getElementById("youtube");

// A key word is entered and when the search button is clicked the function
// will add the new key work into the list of previous searches

const title_elem = document.querySelector(".article-title");
const description_elem = document.querySelector(".article-description");
const readWrapper = document.querySelector('.read-wrapper');

var search = window.location.search;
console.log (search)

//searching for wikipedia information

function createReadInner(title, desc){

  const parent = document.createElement('div');

  const titleDiv = document.createElement('div');
  titleDiv.classList.add('title')

  const titleH3 = document.createElement('h3');
  titleH3.classList.add('article-title')
  titleH3.textContent = title;
  titleDiv.appendChild(titleH3)

  const descriptionDiv = document.createElement('div');
  descriptionDiv.classList.add('description')

  const descriptionP = document.createElement('p');
  descriptionP.classList.add('article-description');
  descriptionP.innerHTML = desc;
  descriptionDiv.appendChild(descriptionP)

  parent.appendChild(titleDiv)
  parent.appendChild(descriptionDiv);
  //don't think we need to return anything here? 
  return parent;

}


function getWikipeadiaApi (search) {
    
    var api =  `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=5&srsearch=${search}`;
  
   fetch(api)
   .then(response => response.json())
   .then(response => {
    console.log(response)
     var searchResults = response.query.search;
     console.log(searchResults) // array

     for (let index = 0; index < searchResults.length; index++) {
       const result = searchResults[index];
       const wikiResult = createReadInner(result.title, result.snippet);
       readWrapper.appendChild(wikiResult);
     }
    })
}



searchFormEl.addEventListener('submit', function(event){
  event.preventDefault();
  console.log(event)
  var formInputVal = document.querySelector(".input-search").value;
  
  console.log(formInputVal)
  
  // Get stored list of searches from localStorage
  
  var searchWords = JSON.parse(localStorage.getItem("KeyWord"));
  
  console.log(searchWords)

  // If there were no words in Local Storage the first word is stored
  if (searchWords === null) {
    console.log(formInputVal);
    var inputWord = [];
    inputWord.push(formInputVal);
    localStorage.setItem("KeyWord", JSON.stringify(inputWord));
    displaySearch();
    getYouTubeApi(formInputVal);
    getWikipeadiaApi(formInputVal);
    


  }else {
    searchWords.unshift(formInputVal);
    localStorage.setItem("KeyWord", JSON.stringify(searchWords));
    clearSearchDisplay();
    displaySearch();
    getYouTubeApi(formInputVal)
    getWikipeadiaApi(formInputVal)

  }

});
    
//This displays the new Search key word in the search word list
function displaySearch(){
    
    var storedSearch = JSON.parse(localStorage.getItem("KeyWord"));
    
    for(i=0;i<storedSearch.length;i++) {
      var list = document.querySelector(".previous-search-words")
      var aEl=document.createElement("a")
      aEl.textContent = storedSearch[i];      
      aEl.setAttribute("class", "btn")
      aEl.setAttribute("id", "stored-search")
      list.appendChild(aEl);
    }
    

}

//Clears the search words
function clearSearchDisplay(){
    var list = document.querySelector(".previous-search-words")
    while(list.firstChild){
        list.removeChild(list.firstChild)
    }

}

displaySearch()


function getYouTubeApi(search) {
    
     var requestUrl = "https://www.googleapis.com/youtube/v3/search?q="+ search + "&part=snippet&key=AIzaSyBBtryWRyikhDXMhrOJxfKLlaqTIu7MGGU";

   

    fetch(requestUrl)
        .then(function (response){
            return response.json();
        })
        .then(function (data){
            console.log(data)
          

         //this is for the youtube API
            for (var i = 0; i <data.items.length; i++){
                if( i === 0 ){
                    var createIframe = document.createElement("iframe");
                    createIframe.setAttribute("src" , "https://www.youtube.com/embed/" + data.items[i].id.videoId);
                    var createTableRow1 = document.createElement("tr");
                    var tableData2 = document.createElement("td");
                    tableData2.appendChild(createIframe);
                    createTableRow1.appendChild(tableData2);
                    tableBody.appendChild(createTableRow1);
                } else {

                    var createTableRow = document.createElement("tr");
                    var tableData = document.createElement("td");
                    var link = document.createElement("a");
                    var title = document.createElement("h4");
    
                    link.textContent = ("https://www.youtube.com/watch?v=" + data.items[i].id.videoId);
                    link.href= "https://www.youtube.com/watch?v=" + data.items[i].id.videoId;
                    title.textContent = data.items[i].snippet.title;
                     console.log(title);

                     tableData.appendChild(title);
                    
    
                    tableData.appendChild(link);
                    createTableRow.appendChild(tableData);
                    tableBody.appendChild(createTableRow);
                    //console.log(data.items[i].id.videoId);
                }

               
           }

               
        });
}