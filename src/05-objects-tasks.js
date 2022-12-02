/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Returns the rectangle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) { //  npm test test/05-objects-tests
  this.width = width;
  this.height = height;
  function getArea() {
    return this.width * this.height;
  }
  this.getArea = getArea;
}


/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}


/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  const obj = JSON.parse(json);
  Object.setPrototypeOf(obj, proto);
  return obj;
}


/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurrences
 *
 * All types of selectors can be combined using the combination ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string representation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

function buildSimpleSelector(type, identifier) {
  const selectorTypes = {
    element: {
      openingSyntax: '',
      closingSyntax: '',
    },
    class: {
      openingSyntax: '.',
      closingSyntax: '',
    },
    id: {
      openingSyntax: '#',
      closingSyntax: '',
    },
    attr: {
      openingSyntax: '[',
      closingSyntax: ']',
    },
    pseudoClass: {
      openingSyntax: ':',
      closingSyntax: '',
    },
    pseudoElement: {
      openingSyntax: '::',
      closingSyntax: '',
    },
  };
  const { openingSyntax, closingSyntax } = selectorTypes[type];

  return `${openingSyntax}${identifier}${closingSyntax}`;
}
class SelectorChain {
  constructor(type, identifier) {
    this.allSelectors = {};
    /*
    {
      type1: [identifier1, identifier2, ...],
      type2: [identifier1, identifier2, ...],
      ...
    }
    */
    this.selectorPriority = [
      ['element', 6], ['id', 5], ['class', 4], ['attr', 3],
      ['pseudoClass', 2], ['pseudoElement', 1],
    ];
    this.forbiddenDoubleTypes = ['element', 'id', 'pseudoElement'];
    this.priorityMap = new Map(this.selectorPriority);
    this.exeptionDoubleSelector = 'Element, id and pseudo-element '
    + 'should not occur more then one time inside the selector';
    this.exeptionOrder = 'Selector parts should be arranged '
    + 'in the following order: element, id, class, attribute, '
    + 'pseudo-class, pseudo-element';
    this.lastSelectorPriority = 7;
    this[type](identifier);
  }

  addSimpleSelector(type, identifier) {
    this.checkSelectorDouble(type);
    this.checkSelectorPriority(type);
    this.setToMapSelector(type, identifier);
    return this;
  }

  setToMapSelector(type, identifier) {
    if (!Object.prototype.hasOwnProperty.call(this.allSelectors, type)) {
      this.allSelectors[type] = [buildSimpleSelector(type, identifier)];
    } else {
      const valuesArray = this.allSelectors[type];
      valuesArray.push(buildSimpleSelector(type, identifier));
      this.allSelectors[type] = valuesArray;
    }
  }

  checkSelectorDouble(type) {
    if (this.forbiddenDoubleTypes.includes(type)
    && Object.prototype.hasOwnProperty.call(this.allSelectors, type)) {
      throw new Error(this.exeptionDoubleSelector);
    }
  }

  checkSelectorPriority(type) {
    const currentPriority = this.priorityMap.get(type);
    if (currentPriority > this.lastSelectorPriority) {
      throw new Error(this.exeptionOrder);
    }
    this.lastSelectorPriority = currentPriority;
  }

  element(identifier) {
    return this.addSimpleSelector('element', identifier);
  }

  id(identifier) {
    return this.addSimpleSelector('id', identifier);
  }

  class(identifier) {
    return this.addSimpleSelector('class', identifier);
  }

  attr(identifier) {
    return this.addSimpleSelector('attr', identifier);
  }

  pseudoClass(identifier) {
    return this.addSimpleSelector('pseudoClass', identifier);
  }

  pseudoElement(identifier) {
    return this.addSimpleSelector('pseudoElement', identifier);
  }

  static combine(selectorChainLeft, combinator, selectorChainRight) {
    const part = `${selectorChainLeft.stringify()} ${combinator}`;
    const part2 = `${part} ${selectorChainRight.stringify()}`;
    this.selectorsString += part2;
    return this;
  }

  stringify() {
    const selectorArrays = Object.values(this.allSelectors);
    return selectorArrays.flat().join('');
  }
}

const cssSelectorBuilder = {
  allSelectors: [],

  element(identifier) {
    return new SelectorChain('element', identifier);
  },

  id(identifier) {
    return new SelectorChain('id', identifier);
  },

  class(identifier) {
    return new SelectorChain('class', identifier);
  },

  attr(identifier) {
    return new SelectorChain('attr', identifier);
  },

  pseudoClass(identifier) {
    return new SelectorChain('pseudoClass', identifier);
  },

  pseudoElement(identifier) {
    return new SelectorChain('pseudoElement', identifier);
  },

  combine(selectorChainLeft, combinator, selectorChainRight) {
    const part = `${selectorChainLeft.stringify()} ${combinator}`;
    const part2 = `${part} ${selectorChainRight.stringify()}`;
    this.allSelectors.push(part2);
    return this;
  },
  stringify() {
    const allSelectorsChain = this.allSelectors.join('');
    this.allSelectors.length = 0;
    return allSelectorsChain;
  },
};

module.exports = {
  Rectangle,
  getJSON,
  fromJSON,
  cssSelectorBuilder,
};
