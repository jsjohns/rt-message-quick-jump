console.log('"RT Message Quick Jump" extension loaded.');

var options = {
  gotoPreviousMessageKeyboardShortcut: 'ctrl+shift+up',
  gotoNextMessageKeyboardShortcut: 'ctrl+shift+down',
  includeHeaders: true,
  scrollDelay: 0,
};

var messageSelector = options['includeHeaders']
  ? 'div.ticket-transaction.message'
  : '.message-stanza:not(.open):not(.closed)';

var messages = $(messageSelector).get();

if (messages.length > 0)
  bindKeyboardShortcuts();

////////////////////////////////////////////////////////////////////////////////

function bindKeyboardShortcuts() {
  Mousetrap.bind(options['gotoPreviousMessageKeyboardShortcut'], gotoPreviousMessage);
  Mousetrap.bind(options['gotoNextMessageKeyboardShortcut'], gotoNextMessage);
}

function gotoPreviousMessage() {
  var p = previousMessage();
  if (p)
    scrollToDelayed(p);
}

function gotoNextMessage() {
  var n = nextMessage();
  if (n)
    scrollToDelayed(n);
}

function previousMessage() {
  var m = previousMessages();
  return m[m.length - 1];
}

function nextMessage() {
  return nextMessages()[0];
}

function previousMessages() {
    return messages.filter(function(m){ return isPreviousMessage(m); });
}

function nextMessages() {
  return messages.filter(function(m){ return isNextMessage(m); });
}

function isPreviousMessage(m) {
  return elementTop(m) < viewportTop();
}

function isNextMessage(m) {
  return elementTop(m) - 1 > viewportTop();
}

function scrollToDelayed(e) {
  return scrollTo(e, options['scrollDelay']);
}

function viewportTop() {
  return $(window).scrollTop();
};

function viewportBottom() {
  return viewportTop() + $(window).height();
};

function elementTop(e) {
  return $(e).offset().top;
};

function elementBottom(e) {
  return elementTop(e) + $(e).height();
};

function scrollTo(e, delay) {
  $('html, body').animate({ scrollTop: $(e).offset().top }, delay);
}
