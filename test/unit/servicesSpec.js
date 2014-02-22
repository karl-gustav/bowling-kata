'use strict';

/* jasmine specs for services go here */

describe('service', function() {
	beforeEach(module('myApp.services'));


	describe('version', function() {
		it('should return current version', inject(function(version) {
			expect(version).toEqual('0.1');
		}));
	});

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
			}).toThrow(new Error())
		}));
	})
});
