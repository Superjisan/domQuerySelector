var $ = function (selector) {
  var elements = [];

  ////////////////////
  // Your code here //
  ////////////////////
  if(selector === 'div'){
    returnTags(selector.toUpperCase(), elements)
    var divs = document.getElementsByTagName("DIV");
  }
  else if(selector === 'img.some_class'){
    //to do: create function for splitting dom query;
    var selectorArr = selector.split(".")
    var selectedTag = selectorArr[0]
    var selectedClass = document.getElementsByClassName(selector);
    var selectedTagArr = [];
    returnTags(selectedTag.toUpperCase(), selectedTagArr)
  }




  return elements;
}

//function that return the
function returnTags(divName, arrayToPush){
  var divs = document.getElementsByTagName(divName);
  for(key in divs){
    if(key === "length") break;
    arrayToPush.push(divs[key])
    // console.log("div "+ key+ ": "+ divs[key])
    }
}
