require('dotenv').config();

const assert = require('chai').assert;
const helpers = require('../../../../server/core/utils/helper');
const rule = require('../../../../server/core/rules/request/RegisterSchema');

const plain = 'samundra';
const encrypted = 'dyojEAcdt/a0WTKj30y5Ew==';

describe('Helpers', () => {
  it('should pass the object validation', () => {
    const payload = {
      first_name: 'samundra',
      last_name: 'khatri',
      email: 'samundrak@yahoo.com',
      password: '1234566',
    };

    assert.equal(helpers.joi(payload, rule).status, true);
  });

  it('should encrypt value', () => {
    assert.equal(helpers.encrypt(plain), encrypted);
  });

  it('should decrypt value', () => {
    assert.equal(helpers.decrypt(encrypted), plain);
  });
});
