const strings = require('../Strings');
const emailHandler = require('../handlers/events/email');

const event = global.events;

event.on(strings.SEND_EMAIL, emailHandler);
