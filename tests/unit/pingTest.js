var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../config');
var should = chai.should();

chai.use(chaiHttp);

describe('test the ping url', function() {
	it('should return ok', function(done) {
		//console.log('server',server);
		chai.request(server.base_url).get('/api/ping').end(function(err, res){
			//console.log('res',res);
			res.should.have.status(200);
            
			done();
		});
	});
	
})