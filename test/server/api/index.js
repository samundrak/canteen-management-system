require('dotenv').config();
const faker = require('faker');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();

chai.use(chaiHttp);
const HOST = process.env.APP_HOST;

const userPayload = {
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  email: faker.internet.email().toLowerCase(),
  password: '12345678',
};

describe('Testing Register API', () => {

  describe('POST /api/register', () => {
    it('it should create new user', (done) => {
      chai.request(HOST).post('/api/register')
        .send(userPayload)
        .end((req, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          res.body.should.have.property('email').eql(userPayload.email);
          done();
        });
    });

    it('it should not create user with bad email', (done) => {
      const payload = Object.assign({}, userPayload);
      payload.email = 'ssml';
      chai.request(HOST)
        .post('/api/register')
        .send(payload)
        .end((req, res) => {
          res.should.have.status('422');
          res.body.should.be.a('object');
          res.body.should.have.a.property('error', 'Unprocessable Entity');
          done();
        });
    });
  });

  describe('POST /api/login', () => {
    it('it should log in user', (done) => {
      const payload = {
        email: userPayload.email,
        password: userPayload.password,
      };

      chai.request(HOST)
        .post('/api/login')
        .send(payload)
        .end((req, res) => {
          res.should.have.status('200');
          res.body.should.be.a('object');
          res.body.should.have.a.property('token');
          done();
        });
    });
  });
});
