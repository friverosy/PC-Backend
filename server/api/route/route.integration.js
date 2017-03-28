'use strict';

var app = require('../..');
import request from 'supertest';

var newRoute;

describe('Route API:', function() {
  describe('GET /api/routes', function() {
    var routes;

    beforeEach(function(done) {
      request(app)
        .get('/api/routes')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          routes = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(routes).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/routes', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/routes')
        .send({
          name: 'New Route',
          info: 'This is the brand new route!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newRoute = res.body;
          done();
        });
    });

    it('should respond with the newly created route', function() {
      expect(newRoute.name).to.equal('New Route');
      expect(newRoute.info).to.equal('This is the brand new route!!!');
    });
  });

  describe('GET /api/routes/:id', function() {
    var route;

    beforeEach(function(done) {
      request(app)
        .get(`/api/routes/${newRoute._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          route = res.body;
          done();
        });
    });

    afterEach(function() {
      route = {};
    });

    it('should respond with the requested route', function() {
      expect(route.name).to.equal('New Route');
      expect(route.info).to.equal('This is the brand new route!!!');
    });
  });

  describe('PUT /api/routes/:id', function() {
    var updatedRoute;

    beforeEach(function(done) {
      request(app)
        .put(`/api/routes/${newRoute._id}`)
        .send({
          name: 'Updated Route',
          info: 'This is the updated route!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedRoute = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedRoute = {};
    });

    it('should respond with the original route', function() {
      expect(updatedRoute.name).to.equal('New Route');
      expect(updatedRoute.info).to.equal('This is the brand new route!!!');
    });

    it('should respond with the updated route on a subsequent GET', function(done) {
      request(app)
        .get(`/api/routes/${newRoute._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let route = res.body;

          expect(route.name).to.equal('Updated Route');
          expect(route.info).to.equal('This is the updated route!!!');

          done();
        });
    });
  });

  describe('PATCH /api/routes/:id', function() {
    var patchedRoute;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/routes/${newRoute._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Route' },
          { op: 'replace', path: '/info', value: 'This is the patched route!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedRoute = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedRoute = {};
    });

    it('should respond with the patched route', function() {
      expect(patchedRoute.name).to.equal('Patched Route');
      expect(patchedRoute.info).to.equal('This is the patched route!!!');
    });
  });

  describe('DELETE /api/routes/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/routes/${newRoute._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when route does not exist', function(done) {
      request(app)
        .delete(`/api/routes/${newRoute._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
