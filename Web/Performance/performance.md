## RAIL
	Responsive: 100 -> 50 ms
	Animation: 16 -> 10ms
	Idle
	Load: 5s
	
## Target
	scrolling should be stick-to-finger fast, and animations and interactions should be silky smooth.
	
## Pixel pipeline
	Javascript(Html parse)
	Style recalculation
	Layout
	Paint (layers) 1) creating a list of draw calls, and 2) filling in the pixels.
	Composite
	
## layout property
	reflow the page 
	
## paint only property  
	repaint
## A property that requires neither layout nor paint, and the browser jumps to just do compositing.

## RequestAnimationFrame instead of setTimeout/setTimeintervl to make visutal changes  
## reduce or move heavy work in main thread. to Web Worker.  Web Workers do not have DOM access.
> taskFinishTime = window.performance.now();
	
***	
# Reduce the Scope and Complexity of Style Calculations	
## Reduce the complexity of your selectors
### Computed style calculation	
    1. The first part of computing styles is to create a set of matching selectors, which is essentially the browser figuring out which classes, pseudo-selectors and IDs apply to any given element.  

    2. The second part of the process involves taking all the style rules from the matching selectors and figuring out what final styles the element has.
## Reduce the number of elements being styled
	
	
	
	
	
	
	