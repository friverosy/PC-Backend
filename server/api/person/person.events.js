/**
 * Person model events
 */

'use strict';

import {EventEmitter} from 'events';
import Person from './person.model';
var PersonEvents = new EventEmitter();

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Person.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    PersonEvents.emit(`${event}:${doc._id}`, doc);
    PersonEvents.emit(event, doc);
  };
}

export default PersonEvents;
