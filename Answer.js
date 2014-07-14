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
    returnID(selector, elements)
  }
  else if(selector === ".some_class"){
    returnClass(selector, elements)
  }
  else if(selector === "input#some_id"){
    returnTagIDs(selector, elements)
  }
  else if(selector === "div#some_id.some_class"){
    returnTagIDClasses(selector, elements)
  }
  return elements;
} // end of $ function

//function that return the dom tag elements
function returnTags(tagName, arrayToPush){
  var divs = document.getElementsByTagName(tagName);
  var result = [];
  for(key in divs){
    if(key === "length") break; //usually the divs object will have extraneous functions and properties than what we need
    if(arrayToPush){
        arrayToPush.push(divs[key]);
        result.push(divs[key])
      };
    }
  return result;
};

//function that returns the dom element if it is expressed by tag.class
function returnTagClasses(query, arrayToPush){
  //split up the query format to its parts
  var selectorArr = query.split(".");
  var selectedTag = selectorArr[0];
  var selectedClass = selectorArr[1];

  //get the proper class elements
  var resultClasses = returnClass("."+selectedClass);

  //check if the class has the right tag
  for (var i = 0; i < resultClasses.length; i++){
    var currentClass = resultClasses[i];
    if (currentClass.tagName == selectedTag.toUpperCase()){
      arrayToPush.push(currentClass)
    }
  }
};

//function that returns the dom element if it is expressed by tag#id format
function returnTagIDs(query, arrayToPush){

  var selectorArr = query.split("#");
  var selectedTag = selectorArr[0];
  var selectedID = selectorArr[1];

  var resultID = returnID("#"+selectedID);
  if(resultID.tagName === selectedTag.toUpperCase()){
    arrayToPush.push(resultID)
  }
}

function returnTagIDClasses(query, arrayToPush){
  //parse div, id, class from query
  var queryArrbyClass = query.split(".")
  var querytagID = queryArrbyClass[0];
  var queryClass = queryArrbyClass[1];
  var queryArrByID = querytagID.split("#");
  var queryTag =  queryArrByID[0];
  var queryID = queryArrByID[1];

  //return the class specified
  var selectedClasses = returnClass("."+queryClass);

  //check if tag and id matches
  for (var i = 0; i < selectedClasses.length; i++){
    var currentClass =  selectedClasses[i];
    if (currentClass.tagName === queryTag.toUpperCase() && currentClass.id === queryID){
      arrayToPush.push(currentClass);
    }
  }
}

//function that retuns the dom element with the specific id
function returnID(query, arrayToPush){
  var result = [];
  var idName = query.split("#").join("");
  var selectedID = document.getElementById(idName);
  if(arrayToPush){
    arrayToPush.push(selectedID);
  }
  result.push(selectedID);

  return result
}

//functiont that returns the dom element with the speicified class
function returnClass(query, arrayToPush){
  var result = []
  var className = query.split(".").join("");
  var selectedClasses = document.getElementsByClassName(className);
  //console.log("selectedClasses: ", selectedClasses)
  for(key in selectedClasses){
    if(key === "length") break;
      if(arrayToPush){
        arrayToPush.push(selectedClasses[key])
      }

      result.push(selectedClasses[key])
    }
  console.log("classes: ", result);
  return result
}

  // var selectedTagArr = []; //the tag to choose over

  // returnTags(selectedTag.toUpperCase(), selectedTagArr)

  // for(var i = 0; i < selectedTagArr.length; i++){
  //   var currentTag = selectedTagArr[i];
  //   if(currentTag.className){ // check if tag has a class
  //     var classNames = currentTag.className.split(" ")
  //     if(classNames.indexOf(selectorArr[1]) != -1 ){
  //       console.log("we found the right class")
  //       arrayToPush.push(selectedTagArr[i])
  //     }
  //   }
  // }
