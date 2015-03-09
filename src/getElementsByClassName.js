// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
  // your code here
  
  //initialize empty array (add matching nodes here)
  var result = [];

  //function that goes through each node and performs 
  //recursion to see if it or outlying nodes matche 
  //className
  var checkNode = function(node){
  	
  	//action
	if (node.classList !== undefined) {
	  	for (var i = 0; i < node.classList.length; i++){
	  		if (node.classList[i] === className){
	  			result.push(node);
	  		}
	  	}
	}
  	
  	//recursive case
  	if (node.childNodes !== undefined){	
  		for (var i = 0; i < node.childNodes.length; i++){
  			checkNode(node.childNodes[i]);
  		}
  	}
  }

  //for loop that checks every node of the 
  //entire document
  for (var i = 0; i < document.childNodes.length; i++){
  	checkNode(document.childNodes[i]);
  }


  return result;
};
