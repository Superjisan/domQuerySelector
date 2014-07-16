//TO DO: Refactor to be 50 or less lines
var $ = function (selector) {
  var elements = [];

  this.querySelector = selector;

   var elementsToGet = querySelectorParser(selector);

   if(elementsToGet.second && elementsToGet.third){
      switch(elementsToGet.second.element){
        case "class" :  returnTagClassOrID(selector, elements, elementsToGet);break;
        default: returnTagClassOrID(selector,elements, elementsToGet); break;
      }
   } else if (elementsToGet.second){
      switch(elementsToGet.first.element){
        case "class": return ;
        case "id": return;
        default:
          switch(elementsToGet.second.element){
            case "class": returnTagClasses(selector, elements); break;
            default: returnTagIDs(selector, elements); break;
          }
          break;
      }
   } else {
     switch(elementsToGet.first.element){
       case "class": returnClass(selector, elements); break ;
       case "id": returnID(selector, elements); break;
       default: returnTags(selector.toUpperCase(), elements); break;
     }
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

//function that retuns the dom element with the specific id
function returnID(query, arrayToPush){
  var result, idName = query.split("#").join(""), selectedID = document.getElementById(idName);
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

function querySelectorParser(selector){
  var first, second, third;
  //check to see what the first element in the string is
  switch(selector[0]){
    case "." : //if class, check if it has an id element # in the string
      if(selector.indexOf("#") !== -1){
        //parse string based on #
        var selectorArr = selector.split("#");
        first = { name : selectorArr[0] , element: "class"};
        second = { name : "#" + selectorArr[1], element: "id"}
      } else {
        first = { name : selector, element : "class"}
      };
      break;
    case "#" :
      if(selector.indexOf(".") !== -1){
        //parse string based on .
        var selectorArr = selector.split(".");
        first = { name : selectorArr[0] , element: "id"};
        second = { name : "." + selectorArr[1], element: "class"}
      } else {
        first = { name : selector, element : "id"}
      };
      break;
    default: //assumption: you know that it starts with a tag
      //check to see if string has both class and id
      if(selector.indexOf("#") !== -1 && selector.indexOf(".") !== -1){
        //determine which comes first
        var firstElemToSplit, secondElemToSplit, thirdElemName, secondElemName;
        var classIndex = selector.indexOf(".");
        var idIndex = selector.indexOf("#");
        if(classIndex < idIndex){
          firstElemToSplit= "#", thirdElemName = "id", secondElemToSplit = ".", secondElemName = "class";
        }else{
          firstElemToSplit = "."; thirdElemName = "class"; secondElemToSplit = "#"; secondElemName = "id"
        }
        // to-do: set the right first, second, third object
        var firstSplitArr = selector.split(firstElemToSplit)
        third = { name: firstElemToSplit + firstSplitArr[1], element: thirdElemName };
        var secondSplitArr = firstSplitArr[0].split(secondElemToSplit);
        second = {name: secondElemToSplit + secondSplitArr[1], element: secondElemName}
        first = {name : secondSplitArr[0], element: "tag"}
      }else if(selector.indexOf(".") !== -1){
          //parse string based on .
          var selectorArr = selector.split(".");
          first = { name : selectorArr[0] , element: "tag"};
          second = { name : "." + selectorArr[1], element: "class"}
      } else if (selector.indexOf("#") !== -1){
        var selectorArr = selector.split("#");
        first = { name : selectorArr[0] , element: "tag"};
        second = { name : "#" + selectorArr[1], element: "id"}
      } else {
        first = {name : selector, element: "tag"}
      }; break;
  }

  var resultObj = {
    first: first, second: second, third: third
  };
  //console.log("Selector parser for "+ selector +":", resultObj);
  return resultObj
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


function returnTagClassOrID(query, arrayToPush, elements){
  if(elements.third){
   if(elements.third.element === "id"){
     console.log("id elements", elements)
     var selectedID = returnID(elements.third.name);
     var selectedIDClasses = selectedID.className;
     console.log("selectedIDClasses", selectedIDClasses);
      if(selectedID.tagName = elements.first.name.toUpperCase() && selectedIDClasses.indexOf(elements.second.name.substring(1) !== -1)){
        arrayToPush.push(selectedID);
      }
    }else{
       var selectedClasses = returnClass(elements.third.name);
       //check if tag and id matches
        for (var i = 0; i < selectedClasses.length; i++){
          var currentClass =  selectedClasses[i];
          if (currentClass.tagName === elements.first.name.toUpperCase() && currentClass.id === elements.second.name.substring(1)){
            arrayToPush.push(currentClass);
          }
        }
      }
    }
   else if(elements.second){
      if(elements.second.element === "id"){

      } else {

      }
   }
 }

