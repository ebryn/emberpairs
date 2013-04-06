// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require handlebars.runtime
//= require ember
//= require_self
//= require_tree .

App = Ember.Application.create()

App.Person = Ember.Object.extend({
  name: null,
  twitter: null,
  github: null,

  toJSON: function() {
    return this.getProperties('name', 'twitter', 'github');
  },

  save: function() {
    return $.post("/api/people", {person: this.toJSON()});
  }
});

App.Person.find = function() {
  var people = Ember.ArrayProxy.create({content: [], isLoaded: false});
  $.getJSON("/api/people.json").then(function(data) {
    people.set('content', data.people);
    people.set('isLoaded', true);
  });
  return people;
};

App.ApplicationRoute = Ember.Route.extend({
  model: function() {
    return App.Person.find();
  }
});

App.ApplicationController = Ember.ArrayController.extend({
  init: function() {
    this._super();
    if (window.GITHUB_INFO) {
      this.set('user', App.Person.create(window.GITHUB_INFO));
    }
  },

  submit: function() {
    var user = this.get('user');
    user.save();
    this.get('content').pushObject(user);
    this.set('user', null);
  }
});
