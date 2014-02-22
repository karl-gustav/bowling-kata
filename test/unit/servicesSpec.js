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
	})
});
