# Chapter 14
## The Document Object Model

###### Exercises:
<br>
1. <b>Build a table</b>

<br>An HTML table is built with the following tag structure:

```html
<table>
  <tr>
    <th>name</th>
    <th>height</th>
    <th>place</th>
  </tr>
  <tr>
    <td>Kilimanjaro</td>
    <td>5895</td>
    <td>Tanzania</td>
  </tr>
</table>
```

For each *row*, the `<table>` tag contains a `<tr>` tag. Inside of these `<tr>` tags, we can put cell elements: either heading cells `(<th>)` or regular cells `(<td>)`.

Given a data set of mountains, an array of objects with name, height, and place properties, generate the DOM structure for a table that enumerates the objects. It should have one column per key and one row per object, plus a header row with `<th>` elements at the top, listing the column names.

Write this so that the columns are automatically derived from the objects, by taking the property names of the first object in the data.

Add the resulting table to the element with an id attribute of "mountains" so that it becomes visible in the document.

Once you have this working, right-align cells that contain number values by setting their style.textAlign property to "right".

<br>
2. <b>Elements by tag name</b>

<br>The document.getElementsByTagName method returns all child elements with a given tag name. Implement your own version of this as a function that takes a node and a string (the tag name) as arguments and returns an array containing all descendant element nodes with the given tag name.

To find the tag name of an element, use its nodeName property. But note that this will return the tag name in all uppercase. Use the toLowerCase or toUpperCase string methods to compensate for this.

<br>
3. <b>The cat’s hat</b>

<br>Extend the cat animation defined earlier so that both the cat and his hat `(<img src="img/hat.png">)` orbit at opposite sides of the ellipse.

Or make the hat circle around the cat. Or alter the animation in some other interesting way.

To make positioning multiple objects easier, it is probably a good idea to switch to absolute positioning. This means that top and left are counted relative to the top left of the document. To avoid using negative coordinates, which would cause the image to move outside of the visible page, you can add a fixed number of pixels to the position values.

<br>