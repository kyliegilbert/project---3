
var searchFormEl = document.querySelector(".search-form")

// A key word is entered and when the search button is clicked the function
// will add the new key work into the list of previous searches

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

  }else {
    searchWords.unshift(formInputVal);
    localStorage.setItem("KeyWord", JSON.stringify(searchWords));
    clearSearchDisplay();
    displaySearch();

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

