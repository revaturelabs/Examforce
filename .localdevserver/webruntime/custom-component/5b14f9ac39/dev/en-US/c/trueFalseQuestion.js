Webruntime.define('lwc/trueFalseQuestion', ['lwc', 'lightning/configProvider'], function (lwc, configProvider) { 'use strict';

    function stylesheet(hostSelector, shadowSelector, nativeShadow) {
      return "\n" + (nativeShadow ? (":host {display: block;}") : (hostSelector + " {display: block;}")) + "\n";
    }
    var _implicitStylesheets = [stylesheet];

    function tmpl($api, $cmp, $slotset, $ctx) {
      const {
        t: api_text,
        h: api_element,
        d: api_dynamic,
        gid: api_scoped_id,
        b: api_bind,
        k: api_key,
        i: api_iterator,
        f: api_flatten
      } = $api;
      const {
        _m0,
        _m1,
        _m2,
        _m3,
        _m4,
        _m5
      } = $ctx;
      return [api_element("fieldset", {
        key: 14
      }, [api_element("legend", {
        className: $cmp.computedLegendClass,
        key: 1
      }, [$cmp.required ? api_element("abbr", {
        classMap: {
          "slds-required": true
        },
        attrs: {
          "title": $cmp.i18n.required
        },
        key: 0
      }, [api_text("*")]) : null, api_dynamic($cmp.label)]), api_element("div", {
        classMap: {
          "slds-form-element__control": true
        },
        key: 12
      }, api_flatten([$cmp.isRadio ? api_iterator($cmp.transformedOptions, function (option) {
        return api_element("span", {
          classMap: {
            "slds-radio": true
          },
          key: api_key(6, option.value)
        }, [api_element("input", {
          attrs: {
            "type": "radio",
            "name": $cmp.name,
            "id": api_scoped_id(option.indexId)
          },
          props: {
            "checked": option.isChecked,
            "value": option.value,
            "required": $cmp.required,
            "disabled": $cmp.disabled
          },
          key: 2,
          on: {
            "change": _m0 || ($ctx._m0 = api_bind($cmp.handleChange)),
            "focus": _m1 || ($ctx._m1 = api_bind($cmp.handleFocus)),
            "blur": _m2 || ($ctx._m2 = api_bind($cmp.handleBlur))
          }
        }, []), api_element("label", {
          classMap: {
            "slds-radio__label": true
          },
          attrs: {
            "for": api_scoped_id(option.indexId)
          },
          key: 5
        }, [api_element("span", {
          classMap: {
            "slds-radio_faux": true
          },
          key: 3
        }, []), api_element("span", {
          classMap: {
            "slds-form-element__label": true
          },
          key: 4
        }, [api_dynamic(option.label)])])]);
      }) : [], $cmp.isButton ? api_element("div", {
        classMap: {
          "slds-radio_button-group": true
        },
        key: 11
      }, api_iterator($cmp.transformedOptions, function (option) {
        return api_element("span", {
          classMap: {
            "slds-button": true,
            "slds-radio_button": true
          },
          key: api_key(10, option.value)
        }, [api_element("input", {
          attrs: {
            "type": "radio",
            "name": $cmp.name,
            "id": api_scoped_id(option.indexId)
          },
          props: {
            "checked": option.isChecked,
            "value": option.value,
            "required": $cmp.required,
            "disabled": $cmp.disabled
          },
          key: 7,
          on: {
            "change": _m3 || ($ctx._m3 = api_bind($cmp.handleChange)),
            "focus": _m4 || ($ctx._m4 = api_bind($cmp.handleFocus)),
            "blur": _m5 || ($ctx._m5 = api_bind($cmp.handleBlur))
          }
        }, []), api_element("label", {
          classMap: {
            "slds-radio_button__label": true
          },
          attrs: {
            "for": api_scoped_id(option.indexId)
          },
          key: 9
        }, [api_element("span", {
          classMap: {
            "slds-radio_faux": true
          },
          key: 8
        }, [api_dynamic(option.label)])])]);
      })) : null])), $cmp._helpMessage ? api_element("div", {
        classMap: {
          "slds-form-element__help": true
        },
        attrs: {
          "data-help-message": true,
          "id": api_scoped_id("help-message")
        },
        key: 13
      }, [api_dynamic($cmp._helpMessage)]) : null])];
    }

    var _tmpl = lwc.registerTemplate(tmpl);
    tmpl.stylesheets = [];

    if (_implicitStylesheets) {
      tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets);
    }
    tmpl.stylesheetTokens = {
      hostAttribute: "lightning-radioGroup_radioGroup-host",
      shadowAttribute: "lightning-radioGroup_radioGroup"
    };

    var labelRequired = 'required';

    function assert(condition, message) {
      {
        if (!condition) {
          throw new Error(message);
        }
      }
    }

    /**
    An emitter implementation based on the Node.js EventEmitter API:
    https://nodejs.org/dist/latest-v6.x/docs/api/events.html#events_class_eventemitter
    **/
    class EventEmitter {
      constructor() {
        this.registry = {};
      }
      /**
      Registers a listener on the emitter
      @method EventEmitter#on
      @param {String} name - The name of the event
      @param {Function} listener - The callback function
      @return {EventEmitter} - Returns a reference to the `EventEmitter` so that calls can be chained
      **/


      on(name, listener) {
        this.registry[name] = this.registry[name] || [];
        this.registry[name].push(listener);
        return this;
      }
      /**
      Registers a listener on the emitter that only executes once
      @method EventEmitter#once
      @param {String} name - The name of the event
      @param {Function} listener - The callback function
      @return {EventEmitter} - Returns a reference to the `EventEmitter` so that calls can be chained
      **/


      once(name, listener) {
        const doOnce = function () {
          listener.apply(null, arguments);
          this.removeListener(name, doOnce);
        }.bind(this);

        this.on(name, doOnce);
        return this;
      }
      /**
      Synchronously calls each listener registered with the specified event
      @method EventEmitter#emit
      @param {String} name - The name of the event
      @return {Boolean} - Returns `true` if the event had listeners, `false` otherwise
      **/


      emit(name) {
        const args = Array.prototype.slice.call(arguments, 1);
        const listeners = this.registry[name];
        let count = 0;

        if (listeners) {
          listeners.forEach(listener => {
            count += 1;
            listener.apply(null, args);
          });
        }

        return count > 0;
      }
      /**
      Removes the specified `listener` from the listener array for the event named `name`
      @method EventEmitter#removeListener
      @param {String} name - The name of the event
      @param {Function} listener - The callback function
      @return {EventEmitter} - Returns a reference to the `EventEmitter` so that calls can be chained
      **/


      removeListener(name, listener) {
        const listeners = this.registry[name];

        if (listeners) {
          for (let i = 0, len = listeners.length; i < len; i += 1) {
            if (listeners[i] === listener) {
              listeners.splice(i, 1);
              return this;
            }
          }
        }

        return this;
      }

    }

    function classListMutation(classList, config) {
      Object.keys(config).forEach(key => {
        if (typeof key === 'string' && key.length) {
          if (config[key]) {
            classList.add(key);
          } else {
            classList.remove(key);
          }
        }
      });
    }

    /**
    A string normalization utility for attributes.
    @param {String} value - The value to normalize.
    @param {Object} config - The optional configuration object.
    @param {String} [config.fallbackValue] - The optional fallback value to use if the given value is not provided or invalid. Defaults to an empty string.
    @param {Array} [config.validValues] - An optional array of valid values. Assumes all input is valid if not provided.
    @return {String} - The normalized value.
    **/
    function normalizeString(value, config = {}) {
      const {
        fallbackValue = '',
        validValues,
        toLowerCase = true
      } = config;
      let normalized = typeof value === 'string' && value.trim() || '';
      normalized = toLowerCase ? normalized.toLowerCase() : normalized;

      if (validValues && validValues.indexOf(normalized) === -1) {
        normalized = fallbackValue;
      }

      return normalized;
    }
    /**
    A boolean normalization utility for attributes.
    @param {Any} value - The value to normalize.
    @return {Boolean} - The normalized value.
    **/

    function normalizeBoolean(value) {
      return typeof value === 'string' || !!value;
    }

    const isIE11 = isIE11Test(navigator);
    const isChrome = isChromeTest(navigator);
    const isSafari = isSafariTest(navigator); // The following functions are for tests only

    function isIE11Test(navigator) {
      // https://stackoverflow.com/questions/17447373/how-can-i-target-only-internet-explorer-11-with-javascript
      return /Trident.*rv[ :]*11\./.test(navigator.userAgent);
    }
    function isChromeTest(navigator) {
      // https://stackoverflow.com/questions/4565112/javascript-how-to-find-out-if-the-user-browser-is-chrome
      return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    }
    function isSafariTest(navigator) {
      // via https://stackoverflow.com/questions/49872111/detect-safari-and-stop-script
      return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    }

    /**
     * Set an attribute on an element, if it's a normal element
     * it will use setAttribute, if it's an LWC component
     * it will use the public property
     *
     * @param {HTMLElement} element The element to act on
     * @param {String} attribute the attribute to set
     * @param {Any} value the value to set
     */
    function smartSetAttribute(element, attribute, value) {
      if (element.tagName.match(/^LIGHTNING/i)) {
        attribute = attribute.replace(/-\w/g, m => m[1].toUpperCase());
        element[attribute] = value ? value : null;
      } else if (value) {
        element.setAttribute(attribute, value);
      } else {
        element.removeAttribute(attribute);
      }
    }

    /**
     * @param {HTMLElement} element Element to act on
     * @param {Object} values values and attributes to set, if the value is
     *                        falsy it the attribute will be removed
     */

    function synchronizeAttrs(element, values) {
      if (!element) {
        return;
      }

      const attributes = Object.keys(values);
      attributes.forEach(attribute => {
        smartSetAttribute(element, attribute, values[attribute]);
      });
    }
    /**
     * Get the actual DOM id for an element
     * @param {HTMLElement|String} el The element to get the id for (string will just be returned)
     *
     * @returns {String} The DOM id or null
     */

    function getRealDOMId(el) {
      if (el && typeof el === 'string') {
        return el;
      } else if (el) {
        return el.getAttribute('id');
      }

      return null;
    }

    let idCounter = 0;
    function generateUniqueId(prefix = 'input') {
      idCounter++;
      return `${prefix}-${idCounter}`;
    }

    /**
     Represents an object which keeps track of a user's interacting state.
     @constructor InteractingState
     @param {Object} options - The options object.
     @param {Object} [options.duration=2000] - The number of milliseconds of idle time to wait before exiting the interacting state.
     @param {Object} [options.debounceInteraction=false] - Whether to debounce interaction to ignore consecutive leave-enter interactions.
     **/

    class InteractingState {
      constructor(options) {
        const duration = options && options.duration >= 0 ? options.duration : 2000;
        this.eventemitter = new EventEmitter();
        this._interacting = false;
        this._debouncedLeave = debounce(this.leave.bind(this), duration);
        this._debounceInteraction = options && options.debounceInteraction;
        this._interactedRecently = false;

        if (this._debounceInteraction) {
          // debounce leave until a short time later
          this._debouncedEmitLeave = debounce(() => {
            if (!this._interacting) {
              this._interactedRecently = false;
              this.eventemitter.emit('leave');
            }
          }, 200); // debounce enter until left

          this._debouncedEmitEnter = () => {
            if (!this._interactedRecently) {
              this._interactedRecently = true;
              this.eventemitter.emit('enter');
            }
          };
        }
      }
      /**
       Checks whether or not we are in the interacting state.
       @method InteractingState#isInteracting
       @return {Boolean} - Whether or not we are interacting.
       **/


      isInteracting() {
        return this._interacting;
      }
      /**
       Enters the interacting state.
       @method InteractingState#enter
       @returns {void}
       **/


      enter() {
        if (!this._interacting) {
          this._interacting = true;

          if (this._debounceInteraction) {
            this._debouncedEmitEnter();
          } else {
            this.eventemitter.emit('enter');
          }
        }
      }
      /**
       Registers a handler to execute when we enter the interacting state.
       @method InteractingState#onenter
       @param {Function} handler - The callback function.
       **/


      onenter(handler) {
        this.eventemitter.on('enter', handler);
      }
      /**
       Leaves the interacting state.
       @method InteractingState#leave
       @returns {void}
       **/


      leave() {
        if (this._interacting) {
          this._interacting = false;

          if (this._debounceInteraction) {
            this._debouncedEmitLeave();
          } else {
            this.eventemitter.emit('leave');
          }
        }
      }
      /**
       Registers a handler to execute when we leave the interacting state.
       @method InteractingState#onleave
       @param {Function} handler - The callback function.
       **/


      onleave(handler) {
        this.eventemitter.on('leave', handler);
      }
      /**
       Signals the start of the transition into the interacting state and
       schedules a transition out of the interacting state after an idle
       duration. Calling this method multiple times will reset the timer.
       @method InteractingState#interacting
       @returns {void}
       **/


      interacting() {
        this.enter();

        this._debouncedLeave();
      }

    }
    /**
     Creates a debounced function that delays invoking `func` until after
     `delay` milliseconds have elapsed since the last time the debounced
     function was invoked.
     @function debounce
     @param {Function} func - The function to debounce
     @param {Number} delay - The number of milliseconds to delay
     @param {Object} options - The options object
     @param {Boolean} options.leading - Specify invoking on the leading edge of the timeout
     @return {Function} - debounced function
     **/

    function debounce(func, delay, options) {
      const _options = options || {};

      let invokeLeading = _options.leading;
      let timer;
      return function debounced() {
        const args = Array.prototype.slice.apply(arguments);

        if (invokeLeading) {
          func.apply(this, args);
          invokeLeading = false;
        }

        clearTimeout(timer); // eslint-disable-next-line @lwc/lwc/no-async-operation

        timer = setTimeout(function () {
          func.apply(this, args);
          invokeLeading = _options.leading; // reset for next debounce sequence
        }, delay);
      };
    }

    var labelBadInput = 'Enter a valid value.';

    var labelPatternMismatch = 'Your entry does not match the allowed pattern.';

    var labelRangeOverflow = 'The number is too high.';

    var labelRangeUnderflow = 'The number is too low.';

    var labelStepMismatch = 'Your entry isn\'t a valid increment.';

    var labelTooLong = 'Your entry is too long.';

    var labelTooShort = 'Your entry is too short.';

    var labelTypeMismatch = 'You have entered an invalid format.';

    var labelValueMissing = 'Complete this field.';

    const constraintsSortedByPriority = ['customError', 'badInput', 'patternMismatch', 'rangeOverflow', 'rangeUnderflow', 'stepMismatch', 'tooLong', 'tooShort', 'typeMismatch', 'valueMissing'];
    const defaultLabels = {
      badInput: labelBadInput,
      customError: labelBadInput,
      patternMismatch: labelPatternMismatch,
      rangeOverflow: labelRangeOverflow,
      rangeUnderflow: labelRangeUnderflow,
      stepMismatch: labelStepMismatch,
      tooLong: labelTooLong,
      tooShort: labelTooShort,
      typeMismatch: labelTypeMismatch,
      valueMissing: labelValueMissing
    };

    function resolveBestMatch(validity) {
      let validityState;

      if (validity && validity.valid === false) {
        validityState = 'badInput';
        constraintsSortedByPriority.some(stateName => {
          if (validity[stateName] === true) {
            validityState = stateName;
            return true;
          }

          return false;
        });
      }

      return validityState;
    }

    function computeConstraint(valueProvider, constraint) {
      const provider = valueProvider[constraint];

      if (typeof provider === 'function') {
        return provider();
      }

      if (typeof provider === 'boolean') {
        return provider;
      }

      return false;
    } // We're doing the below to avoid exposing the constraintsProvider in the ValidityState


    function newValidityState(constraintsProvider) {
      class ValidityState {
        get valueMissing() {
          return computeConstraint(constraintsProvider, 'valueMissing');
        }

        get typeMismatch() {
          return computeConstraint(constraintsProvider, 'typeMismatch');
        }

        get patternMismatch() {
          return computeConstraint(constraintsProvider, 'patternMismatch');
        }

        get tooLong() {
          return computeConstraint(constraintsProvider, 'tooLong');
        }

        get tooShort() {
          return computeConstraint(constraintsProvider, 'tooShort');
        }

        get rangeUnderflow() {
          return computeConstraint(constraintsProvider, 'rangeUnderflow');
        }

        get rangeOverflow() {
          return computeConstraint(constraintsProvider, 'rangeOverflow');
        }

        get stepMismatch() {
          return computeConstraint(constraintsProvider, 'stepMismatch');
        }

        get customError() {
          return computeConstraint(constraintsProvider, 'customError');
        }

        get badInput() {
          return computeConstraint(constraintsProvider, 'badInput');
        }

        get valid() {
          return !(this.valueMissing || this.typeMismatch || this.patternMismatch || this.tooLong || this.tooShort || this.rangeUnderflow || this.rangeOverflow || this.stepMismatch || this.customError || this.badInput);
        }

      }

      return new ValidityState();
    }

    function buildSyntheticValidity(constraintProvider) {
      return Object.freeze(newValidityState(constraintProvider));
    }
    function getErrorMessage(validity, labelMap) {
      const key = resolveBestMatch(validity);

      if (key) {
        return labelMap[key] ? labelMap[key] : defaultLabels[key];
      }

      return '';
    }
    class FieldConstraintApi {
      constructor(inputComponentProvider, constraintProviders) {
        assert(typeof inputComponentProvider === 'function');
        this._inputComponentProvider = inputComponentProvider;
        this._constraintsProvider = Object.assign({}, constraintProviders);

        if (!this._constraintsProvider.customError) {
          this._constraintsProvider.customError = () => typeof this._customValidityMessage === 'string' && this._customValidityMessage !== '';
        }
      }

      get validity() {
        if (!this._constraint) {
          this._constraint = buildSyntheticValidity(this._constraintsProvider);
        }

        return this._constraint;
      }

      checkValidity() {
        const isValid = this.validity.valid;

        if (!isValid) {
          if (this.inputComponent) {
            this.inputComponent.dispatchEvent(new CustomEvent('invalid', {
              cancellable: true
            }));
          }
        }

        return isValid;
      }

      reportValidity(callback) {
        const valid = this.checkValidity(); // the input might have been removed from the DOM by the time we query it

        if (this.inputComponent) {
          this.inputComponent.classList.toggle('slds-has-error', !valid);

          if (callback) {
            callback(this.validationMessage);
          }
        }

        return valid;
      }

      setCustomValidity(message) {
        this._customValidityMessage = message;
      }

      get validationMessage() {
        return getErrorMessage(this.validity, {
          customError: this._customValidityMessage,
          badInput: this.inputComponent.messageWhenBadInput,
          patternMismatch: this.inputComponent.messageWhenPatternMismatch,
          rangeOverflow: this.inputComponent.messageWhenRangeOverflow,
          rangeUnderflow: this.inputComponent.messageWhenRangeUnderflow,
          stepMismatch: this.inputComponent.messageWhenStepMismatch,
          tooShort: this.inputComponent.messageWhenTooShort,
          tooLong: this.inputComponent.messageWhenTooLong,
          typeMismatch: this.inputComponent.messageWhenTypeMismatch,
          valueMissing: this.inputComponent.messageWhenValueMissing
        });
      }

      get inputComponent() {
        if (!this._inputComponentElement) {
          this._inputComponentElement = this._inputComponentProvider();
        }

        return this._inputComponentElement;
      }

    }

    const VARIANT = {
      STANDARD: 'standard',
      LABEL_HIDDEN: 'label-hidden',
      LABEL_STACKED: 'label-stacked',
      LABEL_INLINE: 'label-inline'
    };
    /**
    A variant normalization utility for attributes.
    @param {Any} value - The value to normalize.
    @return {Boolean} - The normalized value.
    **/

    function normalizeVariant(value) {
      return normalizeString(value, {
        fallbackValue: VARIANT.STANDARD,
        validValues: [VARIANT.STANDARD, VARIANT.LABEL_HIDDEN, VARIANT.LABEL_STACKED, VARIANT.LABEL_INLINE]
      });
    }

    function isEmptyString(s) {
      return s === undefined || s === null || typeof s === 'string' && s.trim() === '';
    }

    const proto = {
      add(className) {
        if (typeof className === 'string') {
          this[className] = true;
        } else {
          Object.assign(this, className);
        }

        return this;
      },

      invert() {
        Object.keys(this).forEach(key => {
          this[key] = !this[key];
        });
        return this;
      },

      toString() {
        return Object.keys(this).filter(key => this[key]).join(' ');
      }

    };
    function classSet(config) {
      if (typeof config === 'string') {
        const key = config;
        config = {};
        config[key] = true;
      }

      return Object.assign(Object.create(proto), config);
    }

    const i18n = {
      required: labelRequired
    };
    /**
     * A radio button group that can have a single option selected.
     */

    class LightningRadioGroup extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this.type = 'radio';
        this.label = void 0;
        this.options = void 0;
        this.messageWhenValueMissing = void 0;
        this.name = generateUniqueId();
        this._required = false;
        this._disabled = false;
        this._helpMessage = void 0;
        this._value = void 0;
      }

      synchronizeA11y() {
        const inputs = this.template.querySelectorAll('input');
        Array.prototype.slice.call(inputs).forEach(input => {
          synchronizeAttrs(input, {
            'aria-describedby': this.computedUniqueHelpElementId
          });
        });
      }

      connectedCallback() {
        this.classList.add('slds-form-element');
        this.updateClassList();
        this.interactingState = new InteractingState();
        this.interactingState.onleave(this.showHelpMessageIfInvalid.bind(this));
      }

      updateClassList() {
        classListMutation(this.classList, {
          'slds-form-element_stacked': this.variant === VARIANT.LABEL_STACKED,
          'slds-form-element_horizontal': this.variant === VARIANT.LABEL_INLINE
        });
      }

      renderedCallback() {
        this.synchronizeA11y();
      }
      /**
       * Specifies the value of the selected radio button.
       * @type {object}
       */


      get value() {
        return this._value;
      }

      set value(value) {
        this._value = value;
      }

      get radioButtonElements() {
        return this.template.querySelectorAll('input');
      }
      /**
       * If present, the radio group is disabled and users cannot interact with it.
       * @type {boolean}
       * @default false
       */


      get disabled() {
        return this._disabled;
      }

      set disabled(value) {
        this._disabled = normalizeBoolean(value);
      }
      /**
       * If present, a radio button must be selected before the form can be submitted.
       * @type {boolean}
       * @default false
       */


      get required() {
        return this._required;
      }

      set required(value) {
        this._required = normalizeBoolean(value);
      }
      /**
       * The variant changes the appearance of the radio group.
       * Accepted variants include standard, label-hidden, label-inline, and label-stacked.
       * This value defaults to standard.
       * Use label-hidden to hide the label but make it available to assistive technology.
       * Use label-inline to horizontally align the label and radio group.
       * Use label-stacked to place the label above the radio group.
       * @type {string}
       * @default standard
       */


      get variant() {
        return this._variant || VARIANT.STANDARD;
      }

      set variant(value) {
        this._variant = normalizeVariant(value);
        this.updateClassList();
      }

      get i18n() {
        return i18n;
      }

      get transformedOptions() {
        const {
          options,
          value
        } = this;

        if (Array.isArray(options)) {
          return options.map((option, index) => ({
            label: option.label,
            value: option.value,
            isChecked: value === option.value,
            indexId: `radio-${index}`
          }));
        }

        return [];
      }

      get isRadio() {
        return this.normalizedType === 'radio';
      }

      get isButton() {
        return this.normalizedType === 'button';
      }

      get normalizedType() {
        return normalizeString(this.type, {
          fallbackValue: 'radio',
          validValues: ['radio', 'button']
        });
      }
      /**
       * Represents the validity states that an element can be in, with respect to constraint validation.
       * @type {object}
       */


      get validity() {
        return this._constraint.validity;
      }
      /**
       * Returns the valid attribute value (Boolean) on the ValidityState object.
       * @returns {boolean} Indicates whether the radio group has any validity errors.
       */


      checkValidity() {
        return this._constraint.checkValidity();
      }
      /**
       * Displays the error messages and returns false if the input is invalid.
       * If the input is valid, reportValidity() clears displayed error messages and returns true.
       * @returns {boolean} - The validity status of the input fields.
       */


      reportValidity() {
        return this._constraint.reportValidity(message => {
          this._helpMessage = message;
        });
      }
      /**
       * Sets a custom error message to be displayed when the radio group value is submitted.
       * @param {string} message - The string that describes the error. If message is an empty string, the error message
       *     is reset.
       */


      setCustomValidity(message) {
        this._constraint.setCustomValidity(message);
      }
      /**
       * Shows the help message if the form control is in an invalid state.
       */


      showHelpMessageIfInvalid() {
        this.reportValidity();
      }
      /**
       * Sets focus on the first radio input element.
       */


      focus() {
        const firstRadio = this.template.querySelector('input');

        if (firstRadio) {
          firstRadio.focus();
        }
      }

      handleFocus() {
        this.interactingState.enter();
        this.dispatchEvent(new CustomEvent('focus'));
      }

      handleBlur() {
        this.interactingState.leave();
        this.dispatchEvent(new CustomEvent('blur'));
      }

      handleChange(event) {
        event.stopPropagation(); // Stop input element from propagating event up and instead propagate from radio group

        this.interactingState.interacting();
        const value = Array.from(this.radioButtonElements).filter(radioButton => radioButton.checked).map(radioButton => radioButton.value).toString();
        this._value = value;
        this.dispatchEvent(new CustomEvent('change', {
          detail: {
            value
          },
          composed: true,
          bubbles: true,
          cancelable: true
        }));
      }

      get computedUniqueHelpElementId() {
        return getRealDOMId(this.template.querySelector('[data-help-message]'));
      }

      get _constraint() {
        if (!this._constraintApi) {
          this._constraintApi = new FieldConstraintApi(() => this, {
            valueMissing: () => !this.disabled && this.required && isEmptyString(this.value)
          });
        }

        return this._constraintApi;
      }

      get computedLegendClass() {
        const classnames = classSet('slds-form-element__legend slds-form-element__label');
        return classnames.add({
          'slds-assistive-text': this.variant === VARIANT.LABEL_HIDDEN
        }).toString();
      }

    }

    LightningRadioGroup.delegatesFocus = true;

    lwc.registerDecorators(LightningRadioGroup, {
      publicProps: {
        type: {
          config: 0
        },
        label: {
          config: 0
        },
        options: {
          config: 0
        },
        messageWhenValueMissing: {
          config: 0
        },
        name: {
          config: 0
        },
        value: {
          config: 3
        },
        disabled: {
          config: 3
        },
        required: {
          config: 3
        },
        variant: {
          config: 3
        },
        validity: {
          config: 1
        }
      },
      publicMethods: ["checkValidity", "reportValidity", "setCustomValidity", "showHelpMessageIfInvalid", "focus"],
      track: {
        _required: 1,
        _disabled: 1,
        _helpMessage: 1,
        _value: 1
      }
    });

    var _lightningRadioGroup = lwc.registerComponent(LightningRadioGroup, {
      tmpl: _tmpl
    });

    function stylesheet$1(hostSelector, shadowSelector, nativeShadow) {
      return "_:-ms-lang(x)" + shadowSelector + ", svg" + shadowSelector + " {pointer-events: none;}\n";
    }
    var _implicitStylesheets$1 = [stylesheet$1];

    function tmpl$1($api, $cmp, $slotset, $ctx) {
      const {
        fid: api_scoped_frag_id,
        h: api_element
      } = $api;
      return [api_element("svg", {
        className: $cmp.computedClass,
        attrs: {
          "focusable": "false",
          "data-key": $cmp.name,
          "aria-hidden": "true"
        },
        key: 1
      }, [api_element("use", {
        attrs: {
          "xlink:href": lwc.sanitizeAttribute("use", "http://www.w3.org/2000/svg", "xlink:href", api_scoped_frag_id($cmp.href))
        },
        key: 0
      }, [])])];
    }

    var _tmpl$1 = lwc.registerTemplate(tmpl$1);
    tmpl$1.stylesheets = [];

    if (_implicitStylesheets$1) {
      tmpl$1.stylesheets.push.apply(tmpl$1.stylesheets, _implicitStylesheets$1);
    }
    tmpl$1.stylesheetTokens = {
      hostAttribute: "lightning-primitiveIcon_primitiveIcon-host",
      shadowAttribute: "lightning-primitiveIcon_primitiveIcon"
    };

    var dir = 'ltr';

    var _tmpl$2 = void 0;

    // Taken from https://github.com/jonathantneal/svg4everybody/pull/139
    // Remove this iframe-in-edge check once the following is resolved https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/8323875/
    const isEdgeUA = /\bEdge\/.(\d+)\b/.test(navigator.userAgent);
    const inIframe = window.top !== window.self;
    const isIframeInEdge = isEdgeUA && inIframe;
    var isIframeInEdge$1 = lwc.registerComponent(isIframeInEdge, {
      tmpl: _tmpl$2
    });

    // Taken from https://git.soma.salesforce.com/aura/lightning-global/blob/999dc35f948246181510df6e56f45ad4955032c2/src/main/components/lightning/SVGLibrary/stamper.js#L38-L60
    function fetchSvg(url) {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();

        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              resolve(xhr.responseText);
            } else {
              reject(xhr);
            }
          }
        };
      });
    }

    // Which looks like it was inspired by https://github.com/jonathantneal/svg4everybody/blob/377d27208fcad3671ed466e9511556cb9c8b5bd8/lib/svg4everybody.js#L92-L107
    // Modify at your own risk!

    const newerIEUA = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/;
    const webkitUA = /\bAppleWebKit\/(\d+)\b/;
    const olderEdgeUA = /\bEdge\/12\.(\d+)\b/;
    const isIE = newerIEUA.test(navigator.userAgent) || (navigator.userAgent.match(olderEdgeUA) || [])[1] < 10547 || (navigator.userAgent.match(webkitUA) || [])[1] < 537;
    const supportsSvg = !isIE && !isIframeInEdge$1;
    var supportsSvg$1 = lwc.registerComponent(supportsSvg, {
      tmpl: _tmpl$2
    });

    /**
    This polyfill injects SVG sprites into the document for clients that don't
    fully support SVG. We do this globally at the document level for performance
    reasons. This causes us to lose namespacing of IDs across sprites. For example,
    if both #image from utility sprite and #image from doctype sprite need to be
    rendered on the page, both end up as #image from the doctype sprite (last one
    wins). SLDS cannot change their image IDs due to backwards-compatibility
    reasons so we take care of this issue at runtime by adding namespacing as we
    polyfill SVG elements.

    For example, given "/assets/icons/action-sprite/svg/symbols.svg#approval", we
    replace the "#approval" id with "#${namespace}-approval" and a similar
    operation is done on the corresponding symbol element.
    **/
    const svgTagName = /svg/i;

    const isSvgElement = el => el && svgTagName.test(el.nodeName);

    const requestCache = {};
    const symbolEls = {};
    const svgFragments = {};
    const spritesContainerId = 'slds-svg-sprites';
    let spritesEl;
    function polyfill(el) {
      if (!supportsSvg$1 && isSvgElement(el)) {
        if (!spritesEl) {
          spritesEl = document.createElement('svg');
          spritesEl.xmlns = 'http://www.w3.org/2000/svg';
          spritesEl['xmlns:xlink'] = 'http://www.w3.org/1999/xlink';
          spritesEl.style.display = 'none';
          spritesEl.id = spritesContainerId;
          document.body.insertBefore(spritesEl, document.body.childNodes[0]);
        }

        Array.from(el.getElementsByTagName('use')).forEach(use => {
          // We access the href differently in raptor and in aura, probably
          // due to difference in the way the svg is constructed.
          const src = use.getAttribute('xlink:href') || use.getAttribute('href');

          if (src) {
            // "/assets/icons/action-sprite/svg/symbols.svg#approval" =>
            // ["/assets/icons/action-sprite/svg/symbols.svg", "approval"]
            const parts = src.split('#');
            const url = parts[0];
            const id = parts[1];
            const namespace = url.replace(/[^\w]/g, '-');
            const href = `#${namespace}-${id}`;

            if (url.length) {
              // set the HREF value to no longer be an external reference
              if (use.getAttribute('xlink:href')) {
                use.setAttribute('xlink:href', href);
              } else {
                use.setAttribute('href', href);
              } // only insert SVG content if it hasn't already been retrieved


              if (!requestCache[url]) {
                requestCache[url] = fetchSvg(url);
              }

              requestCache[url].then(svgContent => {
                // create a document fragment from the svgContent returned (is parsed by HTML parser)
                if (!svgFragments[url]) {
                  const svgFragment = document.createRange().createContextualFragment(svgContent);
                  svgFragments[url] = svgFragment;
                }

                if (!symbolEls[href]) {
                  const svgFragment = svgFragments[url];
                  const symbolEl = svgFragment.querySelector(`#${id}`);
                  symbolEls[href] = true;
                  symbolEl.id = `${namespace}-${id}`;
                  spritesEl.appendChild(symbolEl);
                }
              });
            }
          }
        });
      }
    }

    const validNameRe = /^([a-zA-Z]+):([a-zA-Z]\w*)$/;
    let pathPrefix;
    const tokenNameMap = Object.assign(Object.create(null), {
      action: 'lightning.actionSprite',
      custom: 'lightning.customSprite',
      doctype: 'lightning.doctypeSprite',
      standard: 'lightning.standardSprite',
      utility: 'lightning.utilitySprite'
    });
    const tokenNameMapRtl = Object.assign(Object.create(null), {
      action: 'lightning.actionSpriteRtl',
      custom: 'lightning.customSpriteRtl',
      doctype: 'lightning.doctypeSpriteRtl',
      standard: 'lightning.standardSpriteRtl',
      utility: 'lightning.utilitySpriteRtl'
    });
    const defaultTokenValueMap = Object.assign(Object.create(null), {
      'lightning.actionSprite': '/assets/icons/action-sprite/svg/symbols.svg',
      'lightning.actionSpriteRtl': '/assets/icons/action-sprite/svg/symbols.svg',
      'lightning.customSprite': '/assets/icons/custom-sprite/svg/symbols.svg',
      'lightning.customSpriteRtl': '/assets/icons/custom-sprite/svg/symbols.svg',
      'lightning.doctypeSprite': '/assets/icons/doctype-sprite/svg/symbols.svg',
      'lightning.doctypeSpriteRtl': '/assets/icons/doctype-sprite/svg/symbols.svg',
      'lightning.standardSprite': '/assets/icons/standard-sprite/svg/symbols.svg',
      'lightning.standardSpriteRtl': '/assets/icons/standard-sprite/svg/symbols.svg',
      'lightning.utilitySprite': '/assets/icons/utility-sprite/svg/symbols.svg',
      'lightning.utilitySpriteRtl': '/assets/icons/utility-sprite/svg/symbols.svg'
    });

    const getDefaultBaseIconPath = (category, nameMap) => defaultTokenValueMap[nameMap[category]];

    const getBaseIconPath = (category, direction) => {
      const nameMap = direction === 'rtl' ? tokenNameMapRtl : tokenNameMap;
      return configProvider.getToken(nameMap[category]) || getDefaultBaseIconPath(category, nameMap);
    };

    const getMatchAtIndex = index => iconName => {
      const result = validNameRe.exec(iconName);
      return result ? result[index] : '';
    };

    const getCategory = getMatchAtIndex(1);
    const getName = getMatchAtIndex(2);
    const isValidName = iconName => validNameRe.test(iconName);
    const getIconPath = (iconName, direction = 'ltr') => {
      pathPrefix = pathPrefix !== undefined ? pathPrefix : configProvider.getPathPrefix();

      if (isValidName(iconName)) {
        const baseIconPath = getBaseIconPath(getCategory(iconName), direction);

        if (baseIconPath) {
          // This check was introduced the following MS-Edge issue:
          // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/9655192/
          // If and when this get fixed, we can safely remove this block of code.
          if (isIframeInEdge$1) {
            // protocol => 'https:' or 'http:'
            // host => hostname + port
            const origin = `${window.location.protocol}//${window.location.host}`;
            return `${origin}${pathPrefix}${baseIconPath}#${getName(iconName)}`;
          }

          return `${pathPrefix}${baseIconPath}#${getName(iconName)}`;
        }
      }

      return '';
    };

    class LightningPrimitiveIcon extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this.iconName = void 0;
        this.src = void 0;
        this.svgClass = void 0;
        this.size = 'medium';
        this.variant = void 0;
        this.privateIconSvgTemplates = configProvider.getIconSvgTemplates();
      }

      get inlineSvgProvided() {
        return !!this.privateIconSvgTemplates;
      }

      renderedCallback() {
        if (this.iconName !== this.prevIconName && !this.inlineSvgProvided) {
          this.prevIconName = this.iconName;
          const svgElement = this.template.querySelector('svg');
          polyfill(svgElement);
        }
      }

      get href() {
        return this.src || getIconPath(this.iconName, dir);
      }

      get name() {
        return getName(this.iconName);
      }

      get normalizedSize() {
        return normalizeString(this.size, {
          fallbackValue: 'medium',
          validValues: ['xx-small', 'x-small', 'small', 'medium', 'large']
        });
      }

      get normalizedVariant() {
        // NOTE: Leaving a note here because I just wasted a bunch of time
        // investigating why both 'bare' and 'inverse' are supported in
        // lightning-primitive-icon. lightning-icon also has a deprecated
        // 'bare', but that one is synonymous to 'inverse'. This 'bare' means
        // that no classes should be applied. So this component needs to
        // support both 'bare' and 'inverse' while lightning-icon only needs to
        // support 'inverse'.
        return normalizeString(this.variant, {
          fallbackValue: '',
          validValues: ['bare', 'error', 'inverse', 'warning', 'success']
        });
      }

      get computedClass() {
        const {
          normalizedSize,
          normalizedVariant
        } = this;
        const classes = classSet(this.svgClass);

        if (normalizedVariant !== 'bare') {
          classes.add('slds-icon');
        }

        switch (normalizedVariant) {
          case 'error':
            classes.add('slds-icon-text-error');
            break;

          case 'warning':
            classes.add('slds-icon-text-warning');
            break;

          case 'success':
            classes.add('slds-icon-text-success');
            break;

          case 'inverse':
          case 'bare':
            break;

          default:
            // if custom icon is set, we don't want to set
            // the text-default class
            if (!this.src) {
              classes.add('slds-icon-text-default');
            }

        }

        if (normalizedSize !== 'medium') {
          classes.add(`slds-icon_${normalizedSize}`);
        }

        return classes.toString();
      }

      resolveTemplate() {
        const name = this.iconName;

        if (isValidName(name)) {
          const [spriteName, iconName] = name.split(':');
          const template = this.privateIconSvgTemplates[`${spriteName}_${iconName}`];

          if (template) {
            return template;
          }
        }

        return _tmpl$1;
      }

      render() {
        if (this.inlineSvgProvided) {
          return this.resolveTemplate();
        }

        return _tmpl$1;
      }

    }

    lwc.registerDecorators(LightningPrimitiveIcon, {
      publicProps: {
        iconName: {
          config: 0
        },
        src: {
          config: 0
        },
        svgClass: {
          config: 0
        },
        size: {
          config: 0
        },
        variant: {
          config: 0
        }
      },
      fields: ["privateIconSvgTemplates"]
    });

    var _lightningPrimitiveIcon = lwc.registerComponent(LightningPrimitiveIcon, {
      tmpl: _tmpl$1
    });

    function tmpl$2($api, $cmp, $slotset, $ctx) {
      const {
        c: api_custom_element,
        d: api_dynamic,
        b: api_bind,
        h: api_element
      } = $api;
      const {
        _m0,
        _m1
      } = $ctx;
      return [api_element("button", {
        className: $cmp.computedButtonClass,
        attrs: {
          "name": $cmp.name,
          "accesskey": $cmp.computedAccessKey,
          "title": $cmp.computedTitle,
          "type": $cmp.normalizedType,
          "value": $cmp.value,
          "aria-label": $cmp.computedAriaLabel,
          "aria-expanded": $cmp.computedAriaExpanded,
          "aria-live": $cmp.computedAriaLive,
          "aria-atomic": $cmp.computedAriaAtomic
        },
        props: {
          "disabled": $cmp.disabled
        },
        key: 2,
        on: {
          "focus": _m0 || ($ctx._m0 = api_bind($cmp.handleButtonFocus)),
          "blur": _m1 || ($ctx._m1 = api_bind($cmp.handleButtonBlur))
        }
      }, [$cmp.showIconLeft ? api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
        props: {
          "iconName": $cmp.iconName,
          "svgClass": $cmp.computedIconClass,
          "variant": "bare"
        },
        key: 0
      }, []) : null, api_dynamic($cmp.label), $cmp.showIconRight ? api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
        props: {
          "iconName": $cmp.iconName,
          "svgClass": $cmp.computedIconClass,
          "variant": "bare"
        },
        key: 1
      }, []) : null])];
    }

    var _tmpl$3 = lwc.registerTemplate(tmpl$2);
    tmpl$2.stylesheets = [];
    tmpl$2.stylesheetTokens = {
      hostAttribute: "lightning-button_button-host",
      shadowAttribute: "lightning-button_button"
    };

    function tmpl$3($api, $cmp, $slotset, $ctx) {
      return [];
    }

    var _tmpl$4 = lwc.registerTemplate(tmpl$3);
    tmpl$3.stylesheets = [];
    tmpl$3.stylesheetTokens = {
      hostAttribute: "lightning-primitiveButton_primitiveButton-host",
      shadowAttribute: "lightning-primitiveButton_primitiveButton"
    };

    const ARIA_DESCRIBEDBY = 'aria-describedby';
    const ARIA_CONTROLS = 'aria-controls';
    /**
     * Primitive for button, buttonIcon and buttonIconStateful
     */

    class LightningPrimitiveButton extends lwc.LightningElement {
      /**
       * Specifies whether this button should be displayed in a disabled state.
       * Disabled buttons can't be clicked. This value defaults to false.
       *
       * @type {boolean}
       * @default false
       */
      get disabled() {
        return this.state.disabled;
      }

      set disabled(value) {
        this.state.disabled = normalizeBoolean(value);
      }

      set accessKey(value) {
        this.state.accesskey = value;
      }
      /**
       * Specifies a shortcut key to activate or focus an element.
       *
       * @type {string}
       */


      get accessKey() {
        return this.state.accesskey;
      }

      get computedAccessKey() {
        return this.state.accesskey;
      }
      /**
       * Displays tooltip text when the mouse cursor moves over the element.
       *
       * @type {string}
       */


      get title() {
        return this.state.title;
      }

      set title(value) {
        this.state.title = value;
      }
      /**
       * Label describing the button to assistive technologies.
       *
       * @type {string}
       */


      get ariaLabel() {
        return this.state.ariaLabel;
      }

      set ariaLabel(value) {
        this.state.ariaLabel = value;
      }

      get computedAriaLabel() {
        return this.state.ariaLabel;
      }
      /**
       * A space-separated list of element IDs that provide descriptive labels for the button.
       *
       * @type {string}
       */


      get ariaDescribedBy() {
        return this.state.ariaDescribedBy;
      }

      set ariaDescribedBy(value) {
        this.state.ariaDescribedBy = value;
        const button = this.template.querySelector('button');
        synchronizeAttrs(button, {
          [ARIA_DESCRIBEDBY]: value
        });
      }
      /**
       * A space-separated list of element IDs whose presence or content is controlled by this button.
       *
       * @type {string}
       */


      get ariaControls() {
        return this.state.ariaControls;
      }

      set ariaControls(value) {
        this.state.ariaControls = value;
        const button = this.template.querySelector('button');
        synchronizeAttrs(button, {
          [ARIA_CONTROLS]: value
        });
      }
      /**
       * Indicates whether an element that the button controls is expanded or collapsed.
       * Valid values are 'true' or 'false'. The default value is undefined.
       *
       * @type {string}
       * @default undefined
       */


      get ariaExpanded() {
        return this.state.ariaExpanded;
      }

      set ariaExpanded(value) {
        this.state.ariaExpanded = normalizeString(value, {
          fallbackValue: undefined,
          validValues: ['true', 'false']
        });
      }

      get computedAriaExpanded() {
        return this.state.ariaExpanded || null;
      }

      set ariaLive(value) {
        this.state.ariaLive = value;
      }
      /**
       * Indicates that the button can be updated when it doesn't have focus.
       * Valid values are 'polite', 'assertive', or 'off'. The polite value causes assistive
       * technologies to notify users of updates at a low priority, generally without interrupting.
       * The assertive value causes assistive technologies to notify users immediately,
       * potentially clearing queued speech updates.
       *
       * @type {string}
       */


      get ariaLive() {
        return this.state.ariaLive;
      }

      get computedAriaLive() {
        return this.state.ariaLive;
      }
      /**
       * Indicates whether assistive technologies present all, or only parts of,
       * the changed region. Valid values are 'true' or 'false'.
       *
       * @type {string}
       */


      get ariaAtomic() {
        return this.state.ariaAtomic || null;
      }

      set ariaAtomic(value) {
        this.state.ariaAtomic = normalizeString(value, {
          fallbackValue: undefined,
          validValues: ['true', 'false']
        });
      }

      get computedAriaAtomic() {
        return this.state.ariaAtomic || null;
      }
      /**
       * Sets focus on the element.
       */


      focus() {}

      constructor() {
        super(); // Workaround for an IE11 bug where click handlers on button ancestors
        // receive the click event even if the button element has the `disabled`
        // attribute set.

        this._initialized = false;
        this.state = {
          accesskey: null,
          ariaAtomic: null,
          ariaControls: null,
          ariaDescribedBy: null,
          ariaExpanded: null,
          ariaLabel: null,
          ariaLive: null,
          disabled: false
        };

        if (isIE11) {
          this.template.addEventListener('click', event => {
            if (this.disabled) {
              event.stopImmediatePropagation();
            }
          });
        }
      }

      renderedCallback() {
        if (!this._initialized) {
          const button = this.template.querySelector('button');
          synchronizeAttrs(button, {
            [ARIA_CONTROLS]: this.state.ariaControls,
            [ARIA_DESCRIBEDBY]: this.state.ariaDescribedBy
          });
          this._initialized = true;
        }
      }

    }

    lwc.registerDecorators(LightningPrimitiveButton, {
      publicProps: {
        disabled: {
          config: 3
        },
        accessKey: {
          config: 3
        },
        title: {
          config: 3
        },
        ariaLabel: {
          config: 3
        },
        ariaDescribedBy: {
          config: 3
        },
        ariaControls: {
          config: 3
        },
        ariaExpanded: {
          config: 3
        },
        ariaLive: {
          config: 3
        },
        ariaAtomic: {
          config: 3
        }
      },
      publicMethods: ["focus"],
      track: {
        state: 1
      },
      fields: ["_initialized"]
    });

    var LightningPrimitiveButton$1 = lwc.registerComponent(LightningPrimitiveButton, {
      tmpl: _tmpl$4
    });

    /**
     * A clickable element used to perform an action.
     */

    class LightningButton extends LightningPrimitiveButton$1 {
      constructor(...args) {
        super(...args);
        this.name = void 0;
        this.value = void 0;
        this.label = void 0;
        this.variant = 'neutral';
        this.iconName = void 0;
        this.iconPosition = 'left';
        this.type = 'button';
        this.title = null;
        this._order = null;
      }

      render() {
        return _tmpl$3;
      }

      get computedButtonClass() {
        return classSet('slds-button').add({
          'slds-button_neutral': this.normalizedVariant === 'neutral',
          'slds-button_brand': this.normalizedVariant === 'brand',
          'slds-button_outline-brand': this.normalizedVariant === 'brand-outline',
          'slds-button_destructive': this.normalizedVariant === 'destructive',
          'slds-button_text-destructive': this.normalizedVariant === 'destructive-text',
          'slds-button_inverse': this.normalizedVariant === 'inverse',
          'slds-button_success': this.normalizedVariant === 'success',
          'slds-button_first': this._order === 'first',
          'slds-button_middle': this._order === 'middle',
          'slds-button_last': this._order === 'last'
        }).toString();
      }

      get computedTitle() {
        return this.title;
      }

      get normalizedVariant() {
        return normalizeString(this.variant, {
          fallbackValue: 'neutral',
          validValues: ['base', 'neutral', 'brand', 'brand-outline', 'destructive', 'destructive-text', 'inverse', 'success']
        });
      }

      get normalizedType() {
        return normalizeString(this.type, {
          fallbackValue: 'button',
          validValues: ['button', 'reset', 'submit']
        });
      }

      get normalizedIconPosition() {
        return normalizeString(this.iconPosition, {
          fallbackValue: 'left',
          validValues: ['left', 'right']
        });
      }

      get showIconLeft() {
        return this.iconName && this.normalizedIconPosition === 'left';
      }

      get showIconRight() {
        return this.iconName && this.normalizedIconPosition === 'right';
      }

      get computedIconClass() {
        return classSet('slds-button__icon').add({
          'slds-button__icon_left': this.normalizedIconPosition === 'left',
          'slds-button__icon_right': this.normalizedIconPosition === 'right'
        }).toString();
      }

      handleButtonFocus() {
        this.dispatchEvent(new CustomEvent('focus'));
      }

      handleButtonBlur() {
        this.dispatchEvent(new CustomEvent('blur'));
      }
      /**
       * Sets focus on the button.
       */


      focus() {
        if (this._connected) {
          this.template.querySelector('button').focus();
        }
      }
      /**
       * Clicks the button.
       */


      click() {
        if (this._connected) {
          this.template.querySelector('button').click();
        }
      }
      /**
       * {Function} setOrder - Sets the order value of the button when in the context of a button-group or other ordered component
       * @param {String} order -  The order string (first, middle, last)
       */


      setOrder(order) {
        this._order = order;
      }
      /**
       * Once we are connected, we fire a register event so the button-group (or other) component can register
       * the buttons.
       */


      connectedCallback() {
        this._connected = true;
        const privatebuttonregister = new CustomEvent('privatebuttonregister', {
          bubbles: true,
          detail: {
            callbacks: {
              setOrder: this.setOrder.bind(this),
              setDeRegistrationCallback: deRegistrationCallback => {
                this._deRegistrationCallback = deRegistrationCallback;
              }
            }
          }
        });
        this.dispatchEvent(privatebuttonregister);
      }

      disconnectedCallback() {
        this._connected = false;

        if (this._deRegistrationCallback) {
          this._deRegistrationCallback();
        }
      }

    }

    LightningButton.delegatesFocus = true;

    lwc.registerDecorators(LightningButton, {
      publicProps: {
        name: {
          config: 0
        },
        value: {
          config: 0
        },
        label: {
          config: 0
        },
        variant: {
          config: 0
        },
        iconName: {
          config: 0
        },
        iconPosition: {
          config: 0
        },
        type: {
          config: 0
        }
      },
      publicMethods: ["focus", "click"],
      track: {
        title: 1,
        _order: 1
      }
    });

    var _lightningButton = lwc.registerComponent(LightningButton, {
      tmpl: _tmpl$3
    });
    LightningButton.interopMap = {
      exposeNativeEvent: {
        click: true,
        focus: true,
        blur: true
      }
    };

    function tmpl$4($api, $cmp, $slotset, $ctx) {
      const {
        d: api_dynamic,
        h: api_element,
        c: api_custom_element,
        b: api_bind
      } = $api;
      const {
        _m0
      } = $ctx;
      return [api_element("div", {
        key: 0
      }, [api_dynamic($cmp.question)]), api_element("div", {
        classMap: {
          "answers": true
        },
        key: 2
      }, [api_custom_element("lightning-radio-group", _lightningRadioGroup, {
        props: {
          "name": "radioGroup",
          "label": "Radio Group",
          "options": "{ label: 'True', value: true },\n                                        { label: 'False', value: false }",
          "value": $cmp.userAnswer,
          "type": "radio"
        },
        key: 1
      }, [])]), api_element("div", {
        classMap: {
          "testButton": true
        },
        key: 4
      }, [api_custom_element("lightning-button", _lightningButton, {
        classMap: {
          "slds-m-left_x-small": true
        },
        props: {
          "variant": "base",
          "label": "Base",
          "title": "Looks like a link"
        },
        key: 3,
        on: {
          "click": _m0 || ($ctx._m0 = api_bind($cmp.logToConsole))
        }
      }, [])])];
    }

    var _tmpl$5 = lwc.registerTemplate(tmpl$4);
    tmpl$4.stylesheets = [];
    tmpl$4.stylesheetTokens = {
      hostAttribute: "lwc-trueFalseQuestion_trueFalseQuestion-host",
      shadowAttribute: "lwc-trueFalseQuestion_trueFalseQuestion"
    };

    class TrueFalseQuestion extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this.question = void 0;
        this.correctAnswer = void 0;
        this.userAnswer = void 0;
        this.question = "Is Kat and Matt's component pretty awesome?";
        this.correctAnswer = true;
      }

      logToConsole() {
        console.log(this.userAnswer);
      }

    }

    lwc.registerDecorators(TrueFalseQuestion, {
      publicProps: {
        question: {
          config: 0
        },
        correctAnswer: {
          config: 0
        }
      },
      fields: ["userAnswer"]
    });

    var trueFalseQuestion = lwc.registerComponent(TrueFalseQuestion, {
      tmpl: _tmpl$5
    });

    return trueFalseQuestion;

});
