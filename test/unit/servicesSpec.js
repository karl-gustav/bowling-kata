'use strict';

/* jasmine specs for services go here */

describe('service', function() {
	beforeEach(module('myApp.services'));


	describe('version', function() {
		it('should return current version', inject(function(version) {
			expect(version).toEqual('0.1');
		}));
	});

	function rollMultiple(numberOfRolls, setArray, bowling){
		for(var i = 0; i < numberOfRolls; i++){
			bowling.roll(setArray)
		}
	}

	describe('bowling service', function(){
		it('should be defined', inject(function(bowling){
			expect(bowling).toBeDefined()
		}))
		
		it('should have a roll method', inject(function(bowling){
			expect(bowling.roll).toBeDefined()
		}));
		
		it('should return the score 0 on a gutter set', inject(function(bowling){
			expect(bowling.roll([0,0])).toBe(0)
		}));
		
		it('should store the previus set [0,1] and give a total score with the new set [0,1] of 2', inject(function(bowling){
			bowling.roll([0,1])
			expect(bowling.roll([0,1])).toBe(2)
		}));
		
		it('should only allow two balls in a set', inject(function(bowling){
			expect(function(){
				bowling.roll([1,2,3])
			}).toThrow(new Error("Only thow balls is allowed in a set, unless it's the 10. set!"))
		}));

		it('should only allow an array as argument', inject(function(bowling){
			expect(function(){
				bowling.roll({})
			}).toThrow(new Error("Illegal argument, the set can only be an array!"))
		}));
		
		it('should allow 3 balls on the last set(10th set)', inject(function(bowling){
			rollMultiple(9, [0,0], bowling)
			expect(function(){
				bowling.roll([1,2,3])
			}).not.toThrow()
		}));

		it('should add the points from the next throw if a spare is thown', inject(function(bowling){
			bowling.roll([5,5])
			expect(bowling.roll([5,0])).toBe(20)
		}));

		it('should add the points from both throws in the next set if a strike is thrown', inject(function(bowling){
			bowling.roll([10])
			expect(bowling.roll([1,1])).toBe(14)
		}));

		it('should add the points correctly if two strikes is thown', inject(function(bowling){
			bowling.roll([10])
			expect(bowling.roll([10])).toBe(20)
		}));
		
		it('should give a score of 300 on a perfect game', inject(function(bowling){
			rollMultiple(9, [10], bowling)
			expect(bowling.roll([10,10,10])).toBe(300)
		}));

		it('should give a score of 90 on a game with only [9,0] as the throws', inject(function(bowling){
			rollMultiple(9, [9,0], bowling)
			expect(bowling.roll([9,0])).toBe(90)
		}));
		
		it('should give a score of 150 if only spares is thown', inject(function(bowling){
			rollMultiple(9, [5,5], bowling)
			expect(bowling.roll([5,5,5])).toBe(150)
		}));
	})
});
