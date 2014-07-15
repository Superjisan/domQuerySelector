//TO DO: Refactor to be 50 or less lines
var $ = function (selector) {
  var elements = [];

  this.querySelector = selector;

  if(selector === 'div'){
    returnTags(selector.toUpperCase(), elements)
  }else if(selector === 'img.some_class'){
    returnTagClasses(selector, elements)
  }else if(selector === "#some_id"){
    returnID(selector, elements)
  }else if(selector === ".some_class"){
    returnClass(selector, elements)
  }else if(selector === "input#some_id"){
    returnTagIDs(selector, elements)
  }else if(selector === "div#some_id.some_class"){
    returnTagIDClasses(selector, elements)
  }else if( selector === "div.some_class#some_id"){
    returnTagClassesID(selector, elements)
  }
  return elements;
} // end of $ function

//function that return the dom tag elements
function returnTags(tagName, arrayToPush){
  var divs = document.getElementsByTagName(tagName), result = [];
  for(key in divs){
    if(key === "length") break; //usually the divs object will have extraneous functions and properties than what we need
    if(arrayToPush){
        arrayToPush.push(divs[key]);
      };
    result.push(divs[key])
    }
  return result;
};

$.prototype.querySelectorParser(selector){
  var first, second, third;
  //check to see what the first element in the string is
  if(selector[0] === "."){
    //if class, check if it has an id element # in the string
    if(selector.contains("#")){
      //parse string based on #
      var selectorArr = selector.split("#");
      first = { name : selectorArr[0] , element: "class"};
      second = { name : "#" + selectorArr[1], element: "id"}
    } else {
      first = { name : selector, elemen : "class"}
    }
  } else if (selector[0] === "#"){
    //make this a function
    if(selector.contains(".")){
      //parse string based on .
      var selectorArr = selector.split(".");
      first = { name : selectorArr[0] , element: "id"};
      second = { name : "." + selectorArr[1], element: "class"}
    } else {
      first = { name : selector, element : "id"}
    }
  } else { //assumption: you know that it starts with a tag
    //check to see if string has both class and id
    if(selector.contains("#") && selector.contains(".")){
      //determine which comes first
      var firstElemToSplit, secondElemToSplit;
      var classIndex = selector.indexOf(".");
      var idIndex = selector.indexOf("#");
      if(classIndex < idIndex){
        firstElemToParse = ".";
        secondElemToSplit = "#";
      }else{
        firstElemToParse = "#";
        secondElemToSplit = ".";
      }
      // to-do: set the right first, second, third object


    }else if(selector.contains(".")){
        //parse string based on .
        var selectorArr = selector.split(".");
        first = { name : selectorArr[0] , element: "tag"};
        second = { name : "." + selectorArr[1], element: "class"}
    } else if (selector.contains("#")){
      var selectorArr = selector.split("#");
      first = { name : selectorArr[0] , element: "tag"};
      second = { name : "." + selectorArr[1], element: "id"}
    } else {
      first = {name : selector, element: "tag"}
    }
  }

  return {
    first: first, second: second, third: third
  }
}

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
};

function returnTagIDClasses(query, arrayToPush){
  //parse div, id, class from query
  var queryArrbyClass = query.split(".");
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
};

function returnTagClassesID(query, arrayToPush){
  var queryArrByID = query.split("#");
  var querytagClass =  queryArrByID[0];
  var queryID = queryArrByID[1];
  var queryArrbyClass = querytagClass.split(".")
  var queryTag = queryArrbyClass[0];
  var queryClass = queryArrbyClass[1];

  var selectedID = returnID("#"+queryID);
  console.log("selectedID:", selectedID);
  var selectedIDclasses = selectedID.className;

  if(selectedID.tagName === queryTag.toUpperCase() && selectedIDclasses.indexOf(queryClass) !== -1){
    arrayToPush.push(selectedID);}
}

//function that retuns the dom element with the specific id
function returnID(query, arrayToPush){
  var result;
  var idName = query.split("#").join("");
  var selectedID = document.getElementById(idName);
  if(arrayToPush){ arrayToPush.push(selectedID);}
  result = selectedID;
  return result
};

//functiont that returns the dom element with the speicified class
function returnClass(query, arrayToPush){
  var result = []
  var className = query.split(".").join("");
  var selectedClasses = document.getElementsByClassName(className);
  //console.log("selectedClasses: ", selectedClasses)
  for(key in selectedClasses){
    if(key === "length") break;
      if(arrayToPush) arrayToPush.push(selectedClasses[key]);
      result.push(selectedClasses[key])
    }
  return result
}

