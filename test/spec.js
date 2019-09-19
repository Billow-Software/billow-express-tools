//
// Copyright Platformers (C) 2019
//

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;

const { start, app } = require('./app');
let server;

describe('billow-express-tools', () => {
  before(async () => {
    server = await start();
  });

  it('should return a normal response', () => {
    chai
      .request(app)
      .get('/insert-item')
      .end((err, res) => {
        expect(res.body.result.success).to.equal(true);
        expect(typeof res.body.result.mach).to.equal('object');
      });
  });

  it('should handle random errors', () => {
    chai
      .request(app)
      .get('/500')
      .end((err, res) => {
        expect(res.body.success).to.equal(false);
        expect(typeof res.body.error).to.equal('object');
        expect(typeof res.body.error.message).to.equal('string');
        expect(res.body.error.message).to.equal('fuck off');
      });
  });

  it('should handle unauthorised errors', () => {
    chai
      .request(app)
      .get('/401')
      .end((err, res) => {
        expect(res.body.success).to.equal(false);
        expect(typeof res.body.error).to.equal('object');
        expect(typeof res.body.error.message).to.equal('string');
        expect(res.body.error.message).to.equal(
          'You do not have permission to access this resource.'
        );
      });
  });

  it('should handle not found errors', () => {
    chai
      .request(app)
      .get('/404')
      .end((err, res) => {
        expect(res.body.success).to.equal(false);
        expect(typeof res.body.error).to.equal('object');
        expect(typeof res.body.error.message).to.equal('string');
        expect(res.body.error.message).to.equal('Clitoris not found.');
      });
  });

  it('should handle not found errors', () => {
    chai
      .request(app)
      .get('/404')
      .end((err, res) => {
        expect(res.body.success).to.equal(false);
        expect(typeof res.body.error).to.equal('object');
        expect(typeof res.body.error.message).to.equal('string');
        expect(res.body.error.message).to.equal('Clitoris not found.');
      });
  });

  it('should handle validation errors', () => {
    chai
      .request(app)
      .get('/validation-error')
      .end((err, res) => {
        expect(res.body.success).to.equal(false);
        expect(typeof res.body.error).to.equal('object');
        expect(typeof res.body.error.message).to.equal('string');
        expect(res.body.error.message).to.equal(
          '`dick` is not a valid enum value for path `name`.'
        );
      });
  });

  it('should handle validation more errors', () => {
    chai
      .request(app)
      .get('/validation-error2')
      .end((err, res) => {
        expect(res.body.success).to.equal(false);
        expect(typeof res.body.error).to.equal('object');
        expect(typeof res.body.error.message).to.equal('string');
        expect(res.body.error.message).to.equal('INSUFFICIENT!!!');
      });
  });

  after(() => {
    server.close();
  });
});
