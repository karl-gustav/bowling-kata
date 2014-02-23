'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var mod = angular.module('myApp.services', [])
	
mod.value('version', '0.1');

mod.service('bowling', function(){
	var frames = []
	this.roll = function(frameArray){
		validateframe(frameArray)

		frames.push(frameArray)

		return frames.sum(function(aframe, index, array){
			var sum = aframe.sum(),
				nextframe = array[index+1],
				nextNextframe = array[index+2]
			
			if (isSpare(aframe)){
				if (nextframe) sum += nextframe[0]
			} else if (isStrike(aframe)){
				if (nextframe){
					if (nextframe.length > 1){
						sum += nextframe[0] + nextframe[1]
					} else if (nextNextframe){
						sum += nextframe[0] + nextNextframe[0]
					}
				}
			}

			return sum
		})
	}

	function validateframe(frameArray){
		if( ! angular.isArray(frameArray) ) throw new Error("Illegal argument, the frame can only be an array!")

		if(frames.length == 9){
			if( ! (frameArray.length == 2 || frameArray.length == 3)){
				throw new Error("You are only alowed to have 3 balls in a frame if it's the 10. frame!")
			}
		} else {
			if(frameArray.length != 2){
				if(frameArray.length == 1 && frameArray[0] == 10){
					return
				} else {
					throw new Error("Only thow balls is allowed in a frame, unless it's the 10. frame!")
				}
			}
		}
	}

	function isSpare(aframe){
		return aframe.sum() == 10 && aframe.length > 1
	}
	
	function isStrike(aframe){
		return aframe.sum() == 10 && aframe.length == 1
	}
})
