# Class Range

Creates a range of numbers or characters between a
_start value_ (included) and a _stop value_ (not included).

## Features

- Accepts 1 to 4 arguments: _start_, _stop_, _step_ and _precision_;

- if only one argument is provided, is the _stop_ value, and _start_ is set to 0;

- the (optional, default 1) _step_ argument is the range increment (delta between two adjacent elements);
  -  must be greater than 0;
  -  for numeric range can be a decimal value;
  -  for characters sequences must be an integer;

- the (optional, default 0) _precision_ argument is a non negative integer
that indicates the number of decimal places for numeric elements.
For characters range is always set to 0.

- _start_ and _stop_ arguments can be:
  -  single characters;
  -  positive and negative numbers, integers or decimal;

- If _start_ < _stop_, automatically reverts the arguments;

## USAGE:

> const myRange = new Range(arg1, arg2?, arg3?, arg4?);
> 
> // get the elements
> > const elements = myRange.list;
> 
> // get the UTF-16 character codes of the elements;
> see details below
> > const utfCodes = myRange.uftCharCodes;

- if called with only one argument, it's the stop value, and
  - start is set to 0 (integer);
  - step is set to 1;
  - precision is set to 0;

- if _start_ or _stop_ are characters:
  - the string arguments are converted to utf-16 charCode;
  - if one of them is numeric, is treated as utf-16 charCode;
  - _precision_ is set to 0;
  - _step_ must be an integer;
  -  creates the sequence of utf-16 Codes between
_start_ and _stop_ incremented by _step_,
and then converts them back to the corresponding character;
> **NOTE:** Mixing different arguments types can lead to unexpected result!
> > Range(0, '2')
> - will set _start_ to 0 and _stop_ to 50
> - generate the sequence of characters between **null** and '**\x32**' (excluded)
>
> > Range('0', 2)
> - _start_ = '0' is converted to 48, _stop_ is set to 2;
> - _start_ is greater than _stop_, so arguments are swapped: _start_ is set to 2 and _stop_ to 48;
> - generate the sequence of characters between **\x02** and '**\x30**' (excluded)
>
> > Range('0', '2')
> - will set _start_ to 48 and _stop_ to 50
> - generate the sequence of **characters** between '0' (\x30) and '2' (\x32, excluded)
>
> > Range(0, 2)
> - will set _start_ to 0 and _stop_ to 2
> - generate the sequence of **numbers** between 0 and 2 (excluded)

- If _precision_ is omitted, it's set to the number of decimal places of the _step_ argument.

> **NOTE:** Javascript automatically remove trailing decimal zeroes when passes numerical arguments
to a function. So, passing 1.00 as _step_ will give a _precision_ = 0.
You must provide an explicit _precision_ argument or pass _step_ as string ('1.00');

## Properties and Methods
The Range Class has only getter methods. All properties are private;

### Range Parameters

- start: returns the range lower boundary;
- stop: returns the range upper boundary (excluded in resulting sequence);
- step: returns the range increment;
- precision: returns the numerical elements precision
- params: returns an Object with all of the above

### list:

returns an array containing all elements (number or characters)
from _start_ (included) and _stop_ (not included) incremented by
_step_ and rounded to _precision_ decimal places;

### utfCharCodes:

returns an array of the decimal value of utf-16 charCode of each element;
> **NOTE:** numeric values are converted to string and
> returned as the array of charCodes of each character.
> > 10 => [49, 48];
> > 
> > -1.5 => [ 45, 49, 46, 53 ]

 