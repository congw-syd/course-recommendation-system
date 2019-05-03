const request = require('supertest');
const app = require('./app');

describe('Test the root path', ()=>{
	test('it should response the GET method',(done)=>{
		request(app).get('/').then((response)=>{
			expect(response.statusCode).toBe(200);
			done();
		});
		
	});
});

describe('Test the gethistory path', ()=>{
	test('it should response the GET method',(done)=>{
		request(app).get('/gethistory').then((response)=>{
			expect(response.statusCode).toBe(200);
			done();
		});
		
	});
});

describe('Test the recommendation path', ()=>{
	test('it should response the GET method',(done)=>{
		request(app).get('/getrecombystu').then((response)=>{
			expect(response.statusCode).toBe(200);
			done();
		});
		
	});
});

