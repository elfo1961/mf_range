// Range class source code
class Range {
    #stringRange;   // true for range of charaters
    #_elements;     // the resulting array
    #setParams = () => {
        const re = /^-?[\d]{1,}(\.[\d]{1,})?$/;   // match numbers provided as strings
        // convert string params to numeric.
        /*        if (typeof (this.start) == 'string' && re.test(this.start)) {
                    console.warn('start: converting string to number');
                    this.start = +this.start;
                }
                if (typeof (this.stop) == 'string' && re.test(this.stop)) {
                    console.warn('stop: converting string to number');
                    this.stop = +this.stop;
                }
        */
        // checks and normalize step
        if (typeof (this.step) == 'string') {
            if (re.test(this.step)) {
                this.step = +this.step;
            } else {
                throw new TypeError('step: must be a numerical value > 0');
            }
        }
        this.step = Math.abs(this.step);    // step must be > 0
        if (!this.step) {
            throw new TypeError('step: must be a numerical value > 0');
        }
        // check if is numeric or characters range
        if (typeof (this.start) == 'string') {
            if (this.start.length > 1) {
                throw new TypeError('strings range not (yet) implemented');
            } else {
                this.start = this.start.charCodeAt(0);
                this.#stringRange = true;
            }
        }
        if (typeof (this.stop) == 'string') {
            if (this.stop.length > 1) {
                throw new TypeError('strings range not (yet) implemented');
            } else {
                this.stop = this.stop.charCodeAt(0);
                this.#stringRange = true;
            }
        }
        if (this.#stringRange) {
            console.warn('characterRange: precision  must be 0 and step must be a positive integer. Normalized.');
            this.precision = 0; // no decimal allowed
            this.step = +this.step.toFixed();    // integer step only
        }
        // start must be < stop
        const arr = [this.start, this.stop].sort((a, b) => (a - b));
        this.start = arr[0];
        this.stop = arr[1];
    };
    constructor(...args) {
        function getPrecision(value) {
            if (typeof (value) == 'number') {
                value = value.toString();
            }
            value = value.split('.')[1];
            if (!value) {
                return 0;
            } else {
                return value.length;
            }
        }

        const l = args.length;
        this.#_elements = [];
        // l == 1 => { start = 0; stop = args[0]}
        // l  > 1 => { start = args[0], stop = args[1], step = args[2], precision = args[3]}
        if (!l || l > 4) {
            throw new RangeError('Usage: Range(arg1, arg2?, arg3?, arg4?])');
        }
        this.#setParams;
        this.#stringRange = false;  // default is Range of integers
        this.start = 0;
        this.stop = args[0];
        this.step = (args[2] ? args[2] : 1);
        this.precision = (args[3] ? +args[3] : getPrecision(this.step));
        if (isNaN(this.precision) || getPrecision(this.precision)) {
            throw new TypeError('Precision: must be an integer >= 0');
        }
        if (l > 1) {
            this.start = args[0];
            this.stop = args[1];
        }
        this.#setParams();
    }

    get list() {
        if (!this.#_elements.length) {
            this.#createRange();
        }
        return [...this.#_elements];
    }

    get charCodes() {
        const back = this.list.map(elem => {
            if (this.#stringRange) {
                return elem.charCodeAt(0);
            }
            return [...elem.toString()].map(c => {
                return c.charCodeAt(0);
            });
        });
        return back;
    }

    #createRange() {
        for (let i = this.start; i < this.stop; i += this.step) {
            let elem = +i.toFixed(this.precision);
            if (this.#stringRange) {
                elem = String.fromCharCode(elem);
            }
            this.#_elements.push(elem);
        }
    }
}

exports.Range = Range;
