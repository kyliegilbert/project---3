var searchFormEl = document.querySelector(".search-form")



var keyWord = [];

//collects the first search parameter out of the URL
function getParams() {
    // Get the search params out of the URL (i.e. `?q=london&format=photo`) and convert it to an array (i.e. ['?q=london', 'format=photo'])
    var searchParams = document.location.search.split('=').pop();
    console.log(searchParams)
    saveFirstSearch(searchParams)
    
}

//saves the first search into local storage
function saveFirstSearch(searchParams){

    // Get stored list of searches from localStorage
    var oldSearch = []
    console.log(searchParams)
    console.log(JSON.parse(localStorage.getItem("KeyWord")))
    oldSearch = JSON.parse(localStorage.getItem("KeyWord"));
    
    console.log(oldSearch)
  
    // If searches were retrieved from localStorage, update the search list array to it
    if (oldSearch === null) {
        keyWord[0]=searchParams
        localStorage.setItem("KeyWord", JSON.stringify(keyWord))
        // console.log(JSON.stringify(searchParams))

        displaySearch(searchParams)
       
       
    }else {
        oldSearch.push(searchParams)
        localStorage.setItem("KeyWord", JSON.stringify(oldSearch))
        displaySearch()

    }
}

function displaySearch(){
    clearSearchDisplay()
    var storedSearch = JSON.parse(localStorage.getItem("KeyWord"));
    
    console.log(storedSearch)
    console.log(storedSearch.length)
    
    for(i=0;i<storedSearch.length;i++) {
        var list = document.querySelector(".previous-search-words")
        var aEl=document.createElement("a")
        aEl.textContent = storedSearch[i];
        
        aEl.setAttribute("class", "btn")
        aEl.setAttribute("id", "stored-search")
        list.appendChild(aEl);
    }
    

}

//Clears the search buttons
function clearSearchDisplay(){
    var list = document.querySelector(".previous-search-words")
    while(list.firstChild){
        list.removeChild(list.firstChild)
    }

}

getParams()
displaySearch()
