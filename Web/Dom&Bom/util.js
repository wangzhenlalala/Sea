function addListener(element, eventName, handler, capture) {
    element.addEventListener(eventName, handler, !!capture);
}

function removeListener(element, eventName, handler, capture) {
    element.removeEventListener(eventName, handler, !!capture);
}