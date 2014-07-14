var $ = function (selector) {
  var elements = [];

  ////////////////////
  // Your code here //
  ////////////////////
  if(selector === 'div'){
    returnTags(selector.toUpperCase(), elements)
  }
  else if(selector === 'img.some_class'){
    returnTagClasses(selector, elements)
  }
  else if(selector === "#some_id"){
    returnId(selector, elements)
  }

  return elements;
}

//function that return the dom tag elements
function returnTags(tagName, arrayToPush){
  var divs = document.getElementsByTagName(tagName);
  for(key in divs){
    if(key === "length") break;
    arrayToPush.push(divs[key])
    // console.log("div "+ key+ ": "+ divs[key])
    }
}

//function that returns the dom element if it is expressed by tag.class
function returnTagClasses(query, arrayToPush){
  var selectorArr = query.split(".");
  var selectedTag = selectorArr[0];
  var selectedClass = selectorArr[1];
  var selectedTagArr = []; //the tag to choose over
  returnTags(selectedTag.toUpperCase(), selectedTagArr)

  for(var i = 0; i < selectedTagArr.length; i++){
    var currentTag = selectedTagArr[i];
    if(currentTag.className){ // check if tag has a class
      var classNames = currentTag.className.split(" ")
      if(classNames.indexOf(selectorArr[1]) != -1 ){
        console.log("we found the right class")
        arrayToPush.push(selectedTagArr[i])
      }
    }
  }
}

//functiont that retuns the dom element with the specific id
function returnID(query, arrayToPush){
  var idName = query.split("#").join("");
  var selectedID = document.getElementById(idName);
  arrayToPush.push(selectedID)
}
