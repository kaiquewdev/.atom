# transpose-selection

A tiny Atom package that allows transposing the text of multiple selections.

With two selections, it simply swaps the two, from:

~~~
Alpha Beta
~~~

to

~~~
Beta Alpha
~~~

With multiple text selections, use the `Transpose Selection: Transpose`
command to move the text from one region to the next, and the text from the
last to the first. For example, if you select all the values in the next
object:

~~~js
var test = {
  "one":   "alpha",
  "two":   "beta",
  "three": "gamma",
  "four":  "delta",
  "five":  "epsilon",
};
~~~

And use the command, you will get the command result:

~~~js
var test = {
  "one":   "epsilon",
  "two":   "alpha",
  "three": "beta",
  "four":  "gamma",
  "five":  "delta",
};
~~~

The recommended keybinding is:

~~~coffee
'atom-text-editor:not([mini])':
  'ctrl-alt-t': 'transpose-selection:transpose'
~~~
