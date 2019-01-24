# parallax.js 
converts static page into dynamic one. Every absolutely positioned element can be animated using the global parallax() function.

Usage:
 parallax(element, ratio, duration, ease);
 
 /element passed can be type string as a regular class or ID selector, or a dom node object. 
 
 /ratio is the divider of the element-mouse distance. The result of the division is the distance of element movement. The default value, if nothing is passed is 20
 
 /duration in second is the time the element takes to complete the transition. The default value if nothing is passed is 3s. Max value is 10
 
 /ease should be passed as string like in css (ease-out, linear). The default is cubic-bezier(0.000, 0.000, 0.460, 1.1)
