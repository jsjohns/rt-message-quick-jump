console.log('"RT Correspondence Quick Jump" extension loaded.');

var scrollToPreviousMessageKeyCombo = 'ctrl+shift+up';
var scrollToNextMessageKeyCombo = 'ctrl+shift+down';
var messageSelector = 'div.ticket-transaction.message';
var scrollDelay = 0;

var currentMessage = -1;

function scrollTo(element) {
  $('html, body').animate({ scrollTop: $(element).offset().top }, scrollDelay);
}

function messageCount() {
  return $(messageSelector).length;
}

function scrollToMessage(index) {
  scrollTo(messageSelector + ':eq(' + index + ')');
}

function scrollToPreviousMessage() {
  if (currentMessage < messageCount())
    scrollToMessage(++currentMessage);
}

function scrollToNextMessage() {
  if (currentMessage > 0)
    scrollToMessage(--currentMessage);
}

Mousetrap.bind(scrollToPreviousMessageKeyCombo, function(e, combo) {
    scrollToNextMessage();
});

Mousetrap.bind(scrollToNextMessageKeyCombo, function(e, combo) {
    scrollToPreviousMessage();
});
