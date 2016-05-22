  HTMLWidgets.widget({
  // Called by widget bindings to register a new type of widget. The definition
  // object can contain the following properties:
  // - name (required) - A string indicating the binding name, which will be
  //   used by default as the CSS classname to look for.
  // - initialize (optional) - A function(el) that will be called once per
  //   widget element; if a value is returned, it will be passed as the third
  //   value to renderValue.
  // - renderValue (required) - A function(el, data, initValue) that will be
  //   called with data. Static contexts will cause this to be called once per
  //   element; Shiny apps will cause this to be called multiple times per
  //   element, as the data changes.
  name: 'ftree_widget',

  type: 'output',

 // example code from diagonalNetwork.js in networkD3 package 
 initialize: function(el, width, height) {
	 width = 960,height = 800;
//var svg = d3.select("#body").append("svg").attr("width", 1000).attr("height", 1000)
    d3.select(el).append("svg")
      .style("width", "100%")
      .style("height", "100%")
	 .call(zm = d3.behavior.zoom().scaleExtent([.5,3]).on("zoom", redraw)).append("g")
	 .attr("transform", "translate(" + 350 + "," + 20 + ")");
	zm.translate([350, 20]);
//var tree = d3.layout.tree()

    d3.select(el).append("svg")
      .style("width", "100%")
      .style("height", "100%")

    return d3.layout.tree();

  },

  resize: function(el, width, height, tree) {
// resize function not used

  },

  renderValue: function(el, x, tree) {
	  
	  var root = x.root;
var duration = 750,rectW = 124,rectH = 90,TrectH = 24;
//var tree = d3.layout.tree()
tree.nodeSize([rectW*1.15, rectH*1.2])
tree.separation(function(a, b) { return (a.parent == b.parent ? 1 : 1.2); });
//var svg = d3.select("#body").append("svg").attr("width", 1000).attr("height", 1000)
//.call(zm = d3.behavior.zoom().scaleExtent([.5,3]).on("zoom", redraw)).append("g")
//.attr("transform", "translate(" + 350 + "," + 20 + ")");
//zm.translate([350, 20]);
root.x0 = 0;
root.y0 = height / 2;
function collapse(d) {
if (d.children) {
d._children = d.children; 
d._children.forEach(collapse);
d.children = null;}}
root.children.forEach(collapse);
update(root);
d3.select("#body").style("height", "800px");
function update(source) {
var nodes = tree.nodes(root)
links = tree.links(nodes);
var node = svg.selectAll("g.node")
.data(nodes, function (d) {
return d.id || (d.id = ++i);});
var nodeEnter = node.enter().append("g")
.attr("class", "node")
.attr("transform", function (d) {
return "translate(" + source.x0 + "," + source.y0 + ")";})
.on("click", click);
nodeEnter.append("rect")
.attr("width", rectW)
.attr("height", TrectH)
.attr("stroke", function (d) {
return d._children ? "blue" : "black";})
.attr("stroke-width", 1)
.style("fill", function (d) {
return d._children ? "lightcyan" : "#fff";});
nodeEnter.append("text")
.attr("x", rectW/2)
.attr("y", 10)
.attr("text-anchor", "middle")
.text(function (d) {
return d.name;});
nodeEnter.append("text")
.attr("x", rectW/2)
.attr("y", 17)
.attr("dy", ".35em")
.attr("text-anchor", "middle")
.text(function (d) {
return d.name2;});
var orGate="m 75,65 c  -1.4, -10, .6, -22 -15, -30 -15.6, 8, -13.4, 20, -15, 30, 0, 0 3, -8 15, -8 10, 0 15, 8 15, 8 z";
var andGate="m 45,50 0,15 30,0 0,-15  a15,15 .2 0,0 -15,-15 a15,15 .2 0,0 -15,15";
var condGate="m 45,50 0,15 30,0 0,-15  a15,15 .2 0,0 -15,-15 a15,15 .2 0,0 -15,15 m 0,10 30,0";
var inhibitGate="m 60,35 -15,6.340 0,17.3205 15,6.340  15,-6.340 0,-17.3205 z";
var alarmGate="m 75,65 c  -1.4, -10, .6, -22 -15, -30 -15.6, 8, -13.4, 20, -15, 30, 0, 0 3, -8 15, -8 10, 0 15, 8 15, 8 z m -30,0 v5 c0, 0 3, -8 15, -8 10, 0 15, 8 15, 8 v-5";
var component="m 75, 50 a15,15 .2 0,0 -15,-15 a15,15 .2 0,0 -15,15 a15,15 .2 0,0 15,15 a15,15 .2 0,0 15,-15";
nodeEnter.append("path")
.attr("d",  
function(d) {switch (d.type) {
case 10 : return(orGate);
break;
case 11 : return(andGate);
break;
case 12 : return(inhibitGate);
break;
case 13 : return(alarmGate);
break;
case 14 : return(condGate);
break;
default : return(component);
}})
.attr({stroke:"black",
"stroke-width":1.5, 
"stroke-linejoin":"round", 
fill: "#fff"});
nodeEnter.append("text")
.attr("x", rectW / 2-2)
.attr("y", TrectH  + 25)
.attr("text-anchor", "middle")
.attr("fill", "red")
.text(function (d) {
return d.id;});
nodeEnter.append("text")
.attr("x", rectW/2+18)
.attr("y", TrectH  + 12)
.attr("text-anchor", "left")
.attr("fill", "green")
.text(function (d) { return d.cfr>0 ? "Fail Rate":"";});
nodeEnter.append("text")
.attr("x", rectW/2+18)
.attr("y", TrectH  + 24)
.attr("text-anchor", "left")
.attr("fill", "green")
.text(function (d) {return d.cfr>0 ? (d.cfr).toExponential(4):"";});
nodeEnter.append("text")
.attr("x", rectW/2+18)
.attr("y", TrectH  + 36)
.attr("text-anchor", "left")
.attr("fill", "navy")
.text(function (d) { return d.pbf>0 ? "Prob":"";});     
nodeEnter.append("text")
.attr("x", rectW/2+18)
.attr("y", TrectH  + 48)
.attr("text-anchor", "left")
.attr("fill", "navy")
.text(function (d) {return d.pbf>0 ? (d.pbf).toExponential(4):"" ;});
nodeEnter.append("text")
.attr("x", -3)
.attr("y", TrectH  + 12)
.attr("text-anchor", "left")
.attr("fill", "black")
.text(function (d) { return d.type==13 ? "Human":"";});
nodeEnter.append("text")
.attr("x", -3)
.attr("y", TrectH  + 24)
.attr("text-anchor", "left")
.attr("fill", "black")
.text(function (d) { return d.type==13 ? "Response":"";});
nodeEnter.append("text")
.attr("x", -3)
.attr("y", TrectH  + 36)
.attr("text-anchor", "left")
.attr("fill", "black")
.text(function (d) { return d.type==13 ? "Failure":"";});
nodeEnter.append("text")
.attr("x", -3)
.attr("y", TrectH  + 48)
.attr("text-anchor", "left")
.attr("fill", "black")
.text(function (d) { return d.type==13 ? "Ph="+parseFloat(d.phf_pz.toFixed(2)) :"";});  
nodeEnter.append("text")
.attr("x", rectW/2)
.attr("y", TrectH  + 60)
.attr("text-anchor", "middle")
.attr("fill", "maroon")
.text(function (d) { return d.type==2 ? "T="+parseFloat(d.interval.toFixed(4)) +" Po=" +parseFloat(d.phf_pz.toFixed(5)) :"";});             
var nodeUpdate = node.transition()
.duration(duration)
.attr("transform", function (d) {
return "translate(" + d.x + "," + d.y + ")";});
nodeUpdate.select("rect")
.attr("width", rectW)
.attr("height", TrectH)
.attr("stroke", function (d) {
return d._children ? "blue" : "black";})
.attr("stroke-width", 1)
.style("fill", function (d) {
return d._children ? "lightcyan" : "#fff";});
nodeUpdate.select("text")
.style("fill-opacity", 1);
var nodeExit = node.exit().transition()
.duration(duration)
.attr("transform", function (d) {
return "translate(" + source.x + "," + source.y + ")";})
.remove();
nodeExit.select("rect")
.attr("width", rectW)
.attr("height", TrectH)
.attr("stroke", "black")
.attr("stroke-width", 1);
nodeExit.select("text");
var link = svg.selectAll("path.link")
.data(links, function (d) {
return d.target.id;});
link.enter().insert("path", "g")
.attr("class", "link")
.attr("x", rectW / 2)
.attr("y", rectH / 2)
.attr("d", function (d) {
var o = {
x: source.x0,
y: source.y0};
return elbow({
source: o,
target: o});});
link.transition()
.duration(duration)
.attr("d", elbow);
link.exit().transition()
.duration(duration)
.attr("d", function (d) {
var o = {
x: source.x,
y: source.y};
return elbow({
source: o,
target: o});})
.remove();
nodes.forEach(function (d) {
d.x0 = d.x;
d.y0 = d.y;});}
function click(d) {
if (d.children) {
d._children = d.children;
d.children = null;
} else {
d.children = d._children;
d._children = null;}
update(d);}
function redraw() {
svg.attr("transform",
"translate(" + d3.event.translate + ")"
+ " scale(" + d3.event.scale + ")");}
function elbow(d) {
var sourceY = d.source.y+TrectH,
sourceX = d.source.x+rectW/2-2,
targetY = d.target.y+TrectH+20,
targetX = d.target.x+rectW/2-2;
return "M" + sourceX + "," + sourceY
+ "V" + (sourceY+targetY)/2
+ "H" + targetX
+ "V" + targetY;}
});