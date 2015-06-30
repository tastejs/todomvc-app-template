# D3.js • [TodoMVC](http://todomvc.com)

> D3.js is a JavaScript library for manipulating documents based on
  data. D3 helps you bring data to life using HTML, SVG, and CSS. D3’s
  emphasis on web standards gives you the full capabilities of modern
  browsers without tying yourself to a proprietary framework,
  combining powerful visualization components and a data-driven
  approach to DOM manipulation.


## Resources

- [Website](http://www.d3js.org)
- [Documentation](https://github.com/mbostock/d3/wiki)
- [Used by](https://github.com/mbostock/d3/wiki/Gallery#examples)
- [Blog](http://bost.ocks.org/mike/)

### Articles

- [General Update Pattern I] (http://bl.ocks.org/mbostock/3808218)
- [General Update Pattern II] (http://bl.ocks.org/mbostock/3808221)
- [General Update Pattern III](http://bl.ocks.org/mbostock/3808234)
- [How Selections Work] (http://bost.ocks.org/mike/selection/)
- [Three Little Circles] (http://bost.ocks.org/mike/circles/)

### Support

- [StackOverflow](http://stackoverflow.com/questions/tagged/d3.js)
- [Google Groups](https://groups.google.com/forum/#!forum/d3-js)
- [Twitter](https://twitter.com/mbostock)

*Let us [know](https://github.com/tastejs/todomvc/issues) if you
 discover anything worth sharing.*


## Implementation

The app was created with d3.js, by using its data binding, illustrated
in the [General Update Pattern](http://bl.ocks.org/mbostock/3808218)
series of articles.

The main idea is to bind each todo item to a DOM element with a
unique id (in this case the index and item description). If the model
is changed, d3.js will detect what parts of the DOM that no longer
have a representation in the model, and update the DOM accordingly.

### Minimal Example based on Three Little Circles

The goal is to bind data elemets to circles in a SVG.

When the update function is run for the first time, no circles do yet exist in the SVG. 

```
var list = [32, 57, 293];

function update() {

	var circles = svg.selectAll("circle")
		.data(list);

	circles.enter()
		.append("circle")
		.attr("cy", 60)
		.attr("cx", function(d, i) { return i * 100 + 30; });
		
	circles.exit().remove();

	circles.attr("r", function(d) { return Math.sqrt(d); });
}

```

The first selection binds each element in the list to a circle in the SVG. 

```
var circles = svg.selectAll("circle")
  .data(list);
```

Since no circles are yet created, they are put in an enter selection. By accessing the enter selection, new circles can be appended.

```
circles.enter()
	.append("circle")
	.attr("cy", 60)
	.attr("cx", function(d, i) { return i * 100 + 30; })
```

If elements are removed from the list, then elemnts in the SVG with no data binding are put in the exit selection, and can then be removed.

```
circles.exit().remove();
```

Finally, all circles, new and old, are updated for internal changes.

```
circles.attr("r", function(d) { return Math.sqrt(d); });
```

## Credit

Created by Andrej Lamov and Alexander Wingård
