var chai = require('chai');
var faker = require('faker');
var chaiHttp = require('chai-http');
var userRoute = require('../../routes/user/user.routes.v1');
var server = require('../../config');
var should = chai.should();

chai.use(chaiHttp);

describe('test the api calls of the user module', function() {

    var token = null;
    var user = null;
    var email = "test@activityright.com";
    var password = "qwerty123";
    var userId = "5ace4cdcecbc6b0e4cd7c955";

    before(function(done) {

        chai.request(server.base_url).post('/api/auth/token').send({ email: email, password: password }).end(function(err, res) {
            token = res.body.token; 
            done();
        });

    });


	it('should return all the users', function(done) {
		//console.log('token',token);
		chai.request(server.base_url).get('/api/users').set('Authorization', 'Bearer ' + token).end(function(err, res){
            res.should.have.status(200);
            res.body.should.have.length.greaterThan(0);
			done();
		});
    });
    
    it('should return the user by id', function(done) {
		chai.request(server.base_url).get('/api/users/' + userId).set('Authorization', 'Bearer ' + token).end(function(err, res){
            res.should.have.status(200);
            res.body.email.should.equal(email);
			done();
		});
    });
    
    it('should create a new user', function(done) {
        var newUser = {"firstName" : faker.name.firstName(), "lastName": faker.name.lastName(), "email": faker.internet.email(), "password": faker.internet.password()};
        
        chai.request(server.base_url).post('/api/users/').set('Authorization', 'Bearer ' + token).send(newUser).end(function(err, res){
            res.should.have.status(200);
            res.body.email.should.equal(newUser.email);
            res.body.firstName.should.equal(newUser.firstName);
            //ser user to update later
            user = res.body;
			done();
		});
    });
    
    it('should update an existing user', function(done) {
        var updateObj = {"firstName" : faker.name.firstName(), "lastName": faker.name.lastName()};
        
		chai.request(server.base_url).put('/api/users/' + user._id).set('Authorization', 'Bearer ' + token).send(updateObj).end(function(err, res){
            res.should.have.status(200);
    
            res.body.email.should.equal(user.email);
            res.body.firstName.should.equal(updateObj.firstName);
            res.body.lastName.should.equal(updateObj.lastName);
			done();
		});
    });
    
    it('should delete an existing user', function(done) {
        
		chai.request(server.base_url).delete('/api/users/' + user._id).set('Authorization', 'Bearer ' + token).end(function(err, res){
            res.should.have.status(200);
            //console.log('res.body',res.body);
            res.body.email.should.equal(user.email);
            // res.body.firstName.should.equal(updateObj.firstName);
            // res.body.lastName.should.equal(updateObj.lastName);
			done();
		});
	});
	
})