console.log('"RT Message Quick Jump" extension loaded.');

var options = {
  gotoPreviousMessageKeyboardShortcut: 'ctrl+shift+up',
  gotoNextMessageKeyboardShortcut: 'ctrl+shift+down',
  includeHeaders: true,
  scrollDelay: 0,
};

// var messageSelector = options['includeHeaders']
//   ? 'div.ticket-transaction.message'
//   : '.message-stanza:not(.open):not(.closed)';



var messageSelector = '.transaction.message';
//
// var messages = $(messageSelector).get();
//
// if (messages.length > 0)
//   bindKeyboardShortcuts();

var messages;

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(function(mutations, observer) {
    // // fired when a mutation occurs
    // console.log(mutations, observer);
    messages = $(messageSelector).get();
    if (messages.length > 0)
      bindKeyboardShortcuts();
    // ...
});

// define what element should be observed by the observer
// and what types of mutations trigger the callback
observer.observe(document, {
  subtree: true,
  attributes: true
  //...
});


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

function isElementInViewport (el) {

    //special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
}
