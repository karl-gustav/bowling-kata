'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var mod = angular.module('myApp.services', [])
	
mod.value('version', '0.1');

mod.service('bowling', function(){
	var sets = []
	this.roll = function(setArray){
		validateSet(setArray)

		sets.push(setArray)

		return sets.sum(function(aSet){
			return aSet.sum()
		})
	}

	function validateSet(setArray){
		if( ! angular.isArray(setArray) ) throw new Error("Illegal argument, the set can only be an array!")
		if(sets.length == 9){
			if( ! (setArray.length == 2 || setArray.length == 3)){
				throw new Error("You are only alowed to have 3 balls in a set if it's the 10. set!")
			}
		} else {
			if(setArray.length != 2) throw new Error("Only thow balls is allowed in a set, unless it's the 10. set!")
		}
	}
})
