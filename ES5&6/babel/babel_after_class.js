class Person {
    constructor(){
        this.name = "human";
    }
    say(){
    }
    specis  = 'human'
    static eat(){}
    static alter = '333'
}


"use strict";

function _instanceof(left, right) {
  if (
    right != null &&
    typeof Symbol !== "undefined" &&
    right[Symbol.hasInstance]
  ) {
    return right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!_instanceof(instance, Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var Person =
  /*#__PURE__*/
  (function() {
    function Person() {
      _classCallCheck(this, Person);

      _defineProperty(this, "specis", "human");

      this.name = "human";
    }

    _createClass(
      Person,
      [
        {
          key: "say",
          value: function say() {}
        }
      ],
      [
        {
          key: "eat",
          value: function eat() {}
        }
      ]
    );

    return Person;
  })();

_defineProperty(Person, "alter", "333");
