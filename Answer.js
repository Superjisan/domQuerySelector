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
            case "class": returnTagClassOrID(selector, elements, elementsToGet); break;
            default: returnTagClassOrID(selector, elements,elementsToGet); break;
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

//parse the query given and present first, second and third dom elements to get
function querySelectorParser(selector){
  var first, second, third;
  //check to see what the first element in the string is
  switch(selector[0]){
    case "." : //if class, check if it has an id element # in the string
     var result = setClassAndIDObject(selector, "#", first, second)
     first = result.first;
     second = result.second;
      break;
    case "#" :
      var result = setClassAndIDObject(selector, ".", first, second)
       first = result.first;
       second = result.second;
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
  console.log("Selector parser for "+ selector +":", resultObj);
  return resultObj
}

//function to set id and object to first and second values
function setClassAndIDObject(selector, str){
  if (str === "#"){
    var firstElem = "class", secondElem = "id";
  } else {
    var firstElem = "id", secondElem = "class";
  }

  //if id or class exists
  if(selector.indexOf(str) !== -1){
      var selectorArr = selector.split(str);
      var arg1toChange = { name : selectorArr[0] , element: firstElem};
      var arg2toChange = { name : "#" + selectorArr[1], element: secondElem}
    } else { //otherwise just define the value for first
      var arg1toChange = { name : selector, element : firstElem}
    };

    return { first: arg1toChange, second: arg2toChange}
}

function returnTagClassOrID(query, arrayToPush, elements){
  if(elements === undefined){
    throw "elements must be defined"
  }
  else if(elements.third){
   if(elements.third.element === "id"){
     var selectedID = returnID(elements.third.name);
     var selectedIDClasses = selectedID.className;
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
        var selectedID = returnID(elements.second.name);
         if(selectedID.tagName === elements.first.name.toUpperCase()){
            arrayToPush.push(selectedID)
          }
      } else {
        var selectedClasses = returnClass(elements.second.name)
         //check if the class has the right tag
        for (var i = 0; i < selectedClasses.length; i++){
          var currentClass = selectedClasses[i];
          if (currentClass.tagName == elements.first.name.toUpperCase()){
            arrayToPush.push(currentClass)
          }
        }
      }
   }
 }
