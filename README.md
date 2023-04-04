# Class Range
Creates an array of numbers or characters between a
_start value_ (included) and a _stop value_ (not included).
## Features
- Works with single characters, integers or decimal numbers;
- Accepts 1 to 4 arguments: _start_, _stop_, _step_ and _precision_;
- if called with only one argument, it's the stop value, and start is set to 0;
- if start or stop are characters, creates a range of characters;
- the _step_ argument (optional, default 1) for numeric range can be a decimal value;
for characters must be an integer. Must be greater than 0;
- the _precision_ argument (optional) is a non negative integer
that indicates the number of decimal places of the numeric range elements.
If not provided, precision is set to the number of decimal places of the step argument.
For characters range is always set to 0.
 