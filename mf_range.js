// Range class source code
class Range {
    #stringRange;   // true for range of charaters
    #_elements;     // the resulting array
    #_start;        // start boundary
    #_stop;         // stop boundary
    #_step;         // range increment
    #_precision;    // decimal places (numbers only)
    #setParams = () => {
        const re = /^-?[\d]{1,}(\.[\d]{1,})?$/;   // match numbers provided as strings
        // checks and normalize step
        if (typeof (this.#_step) == 'string') {
            if (re.test(this.#_step)) {
                this.#_step = +this.#_step;
            } else {
                throw new TypeError('step: must be a numerical value > 0');
            }
        }
        this.#_step = Math.abs(this.#_step);    // step must be > 0
        if (!this.#_step) {
            throw new TypeError('step: must be a numerical value > 0');
        }
        // check if is numeric or characters range
        if (typeof (this.#_start) == 'string') {
            if (this.#_start.length > 1) {
                throw new TypeError('strings range not (yet) implemented');
            } else {
                this.#_start = this.#_start.charCodeAt(0);
                this.#stringRange = true;
            }
        }
        if (typeof (this.#_stop) == 'string') {
            if (this.#_stop.length > 1) {
                throw new TypeError('strings range not (yet) implemented');
            } else {
                this.#_stop = this.#_stop.charCodeAt(0);
                this.#stringRange = true;
            }
        }
        if (this.#stringRange) {
            console.warn('characterRange: precision  must be 0 and step must be a positive integer. Normalized.');
            this.#_precision = 0; // no decimal allowed
            this.#_step = +this.#_step.toFixed();    // integer step only
        }
        // start must be < stop
        const arr = [this.#_start, this.#_stop].sort((a, b) => (a - b));
        this.#_start = arr[0];
        this.#_stop = arr[1];
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
            throw new RangeError('Usage: Range(arg1, arg2?, arg3?, arg4?)');
        }
        this.#setParams;
        this.#stringRange = false;  // default is Range of integers
        this.#_start = 0;
        this.#_stop = args[0];
        this.#_step = (args[2] ? args[2] : 1);
        this.#_precision = (args[3] ? +args[3] : getPrecision(this.#_step));
        if (isNaN(this.#_precision) || getPrecision(this.#_precision)) {
            throw new TypeError('Precision: must be an integer >= 0');
        }
        if (l > 1) {
            this.#_start = args[0];
            this.#_stop = args[1];
        }
        this.#setParams();
    }

    get list() {
        if (!this.#_elements.length) {
            this.#createRange();
        }
        return [...this.#_elements];
    }

    get utfCharCodes() {
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

    get start() {
        return this.#_start;
    }
    get stop() {
        return this.#_stop;
    }
    get step() {
        return this.#_step;
    }
    get precision() {
        return this.#_precision;
    }
    get params() {
        return {
            "start": this.start,
            "stop": this.stop,
            "step": this.step,
            "precision": this.precision
        }
    }

    #createRange() {
        for (let i = this.#_start; i < this.#_stop; i += this.#_step) {
            let elem = +i.toFixed(this.#_precision);
            if (this.#stringRange) {
                elem = String.fromCharCode(elem);
            }
            this.#_elements.push(elem);
        }
    }
}

exports.Range = Range;
