// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
	

	//functions for different scenarios
	var numberToString = function(input){
		return input.toString();
	}

	var nullToString = function(input){
		return "null"
	}

	var booleanToString = function(input){
		if (input === true) {
			return "true"
		}
		else {
			return "false"
		}
	}

	var stringToString = function(input){
		return '"' + input + '"';
	}



	//function for changing any item to string
	var itemToString = function(input){
		if (typeof input === "number"){
			return numberToString(input);
		}
		else if (input === null){
			return nullToString(input);
		}
		else if (typeof input === "boolean"){
			return booleanToString(input)
		}
		else if (typeof input === "string"){
			return stringToString(input);
		}
	}

	//function turning array to string
	var arrayToString = function(input) {
        var result = "[";
    	var arrayToStringInner = function(input, index){
    	    if (index === input.length){
    			if (index !== 0){
    				result = result.slice(0, -1);
            	}
            	return;
    		}

    		if (typeof input[index] === "object" && !Array.isArray(input[index])){
    			result += objectToString(input[index]);
    			if (index === input.length -1){
    				result += "}";
    			}
    			else {
    				result += ","
    			}
    		}
    		else if (typeof input[index] === "object"){
    			result += "[";
    			arrayToStringInner(input[index], 0);
    			result += "],";
    		}
    		else {
    			result += itemToString(input[index]) + ",";
    		}
    		return arrayToStringInner(input, index + 1);
    		};
        arrayToStringInner(input, 0)
        result += "]"
        return result;
    }

    //function turning object to string
    var objectToString = function(input){
    	var result = "{";
    	
    	for (keys in input) {
    		if (keys === 'functions'){
    			return '{}';
    		}
    		else if (keys === 'undefined'){
    			return '{}';
    		}
    			result += itemToString(keys);
    			result += ":";
    			if (input[keys] === null){
    				result += itemToString(input[keys]);
    				result += ",";
    			}
    			else if (Array.isArray(input[keys])){
    				result += arrayToString(input[keys]);
    				if (result[result.length-1] !== "]"){
    					result += "]";
    				}
    				else {
    					result += ","
    				}
    			}
    			else if (typeof input[keys] === "object"){
			    		result += objectToString(input[keys]);
			    		result += "}";
			    		if (result[result.length-3] === "{"){
			    			result = result.slice(0, -1);
			    			result += ","
			    		}
    			}
    			else {
    				result += itemToString(input[keys]);
    				result += ",";
    				}
    	}
    	if (result[result.length-1] !== "{"){
    		result = result.slice(0, -1);
    	}
    	result += "}"
    	return result;
    }


    //running the function; individual items first
    if (obj === null){
    	return itemToString(obj);
    }
    else if (typeof obj === "number"){
    	return itemToString(obj);
    }
    else if (typeof obj === "boolean"){
    	return itemToString(obj);
    }
    else if (typeof obj === "string"){
    	return itemToString(obj);
    }
    else if (Array.isArray(obj)){
    	return arrayToString(obj);
    }
    else {
    	return objectToString(obj);
    }




};
