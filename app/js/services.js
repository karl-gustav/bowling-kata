'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var mod = angular.module('myApp.services', [])
	
mod.value('version', '0.1');

mod.service('bowling', function(){
	var sets = []
	this.roll = function(setArray){
		sets.push(setArray)
		return sets.sum(function(aSet){
			return aSet.sum()
		})
	}
})
