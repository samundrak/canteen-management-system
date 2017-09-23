require('dotenv').config();
const faker = require('faker');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();

chai.use(chaiHttp);
const HOST = process.env.APP_HOST;

describe('Testing User API', () => {

});
