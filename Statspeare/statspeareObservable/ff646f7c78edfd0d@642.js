function _1(md){return(
md`# Stats-peare
## Shakespeare through numbers`
)}

function _statspeare(__query,FileAttachment,invalidation){return(
__query(FileAttachment("statspeare@3.csv"),{from:{table:"statspeare"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:["Character","Words","Play"]}},invalidation)
)}

function _PlayCodes(){return(
['AWW', 'Ant', 'AYL', 'Err', 'Cor', 'Cym', 'Ham',
'1H4', '2H4', 'H5', '1H6', '2H6', '3H6', 'H8', 'JC', 'Jn', 'Lr',
'LLL', 'Mac', 'MM', 'MV', 'Wiv', 'MND', 'Ado', 'Oth', 'Per', 'R2',
'R3', 'Rom', 'Shr', 'Tmp', 'Tim', 'Tit', 'Tro', 'TN', 'TGV', 'TNK', 'WT']
)}

function _plays(d3,statspeare){return(
d3.group(statspeare, d => d.Play)
)}

function _playSelected(Inputs,plays){return(
Inputs.select(plays, {label: "Select a play:"})
)}

function _7(Plot,playSelected){return(
Plot.plot({
  width: 900,
  height: 600,
  marginLeft: 150,
  marks: [
    Plot.barX(playSelected, { x: "Words", y: "Character", tip: true }),
    Plot.ruleX([0])
  ]
})
)}

function _data(playSelected){return(
playSelected
)}

function _d3(require){return(
require("d3@6")
)}

function _height(width){return(
Math.min(width, 600)
)}

function _11(width){return(
width
)}

function _rad(height){return(
height/2 - 50
)}

function _getAngles(d3){return(
d3.pie()
    .sort(null) // Pour trier
    .value(d => d.Words)
)}

function _piedata(getAngles,playSelected){return(
getAngles(playSelected)
)}

function _getArcs(d3,rad){return(
d3.arc().innerRadius(0).outerRadius(rad)
)}

function _createPie(d3,width,height,piedata,getColors,getArcs,rad,playSelected)
{
  // PIE CREATION
  const svg = d3.create("svg")
      .attr("viewBox", [-width / 2 + 100, -height / 2, width, height]); // establish center of piechart
  
   var arcs = svg.selectAll("arc") // feed in visual data of the pie chart (i.e. angles)
                .data(piedata)
                .enter()
                .append("g")
                .attr("class", "arc")
                

  // establish color range
  var color = d3.scaleOrdinal(getColors);

  // draw the pie chart
  arcs.append("path")
        .attr("fill", function(d, i) {
            return color(i);
        })
        .attr("d", getArcs)
        .attr("stroke", "black");

  // add labels for major character
  var label = d3.arc()
                      .outerRadius(rad)
                      .innerRadius(rad + 80);
  var epsilon = 400;
  arcs.append("text")
               .attr("transform", function(d) { 
                        return "translate(" + label.centroid(d) + ")"; 
                })
               .text(function(d) { if(d.data.Words > epsilon){
                              return d.data.Character; }});

  // LEGEND CREATION
  var legendRectSize = 9;                                  
  var legendSpacing = 8;
  
  var legend = svg.selectAll('.legend')                     
          .data(color.domain())                                   
          .enter()                                                
          .append('g')                                            
          .attr('class', 'legend')                                
          .attr('transform', function(d, i) {                     
            var height = legendRectSize + legendSpacing;          
            var offset =  height * playSelected.length / 2;     
            var horz = 1.45* rad;                       
            var vert = i * height - offset;                       
            return 'translate(' + horz + ',' + vert + ')';        
          });                                                     

        legend.append('rect')                                     
          .attr('width', legendRectSize)                          
          .attr('height', legendRectSize)                         
          .style('fill', color)                                   
          .style('stroke', color);                                

        legend.append('text')                                     
          .attr('x', legendRectSize + legendSpacing)              
          .attr('y', legendRectSize + 1)              
          .text(function(d) {return playSelected[d].Character}); 

  return svg.node()
}


function _getColors(getKey,playSelected,playColors,PlayCodes,d3)
{
  let myPlayCode = getKey(playSelected)
  var myStartColor = playColors[PlayCodes.indexOf(myPlayCode)].startColor
  var myEndColor = playColors[PlayCodes.indexOf(myPlayCode)].endColor
  var colorInterpolator = d3.interpolateRgb(myStartColor, myEndColor);
  var steps = playSelected.length;

  var colorArray = d3.range(0, (1 + 1 / steps), 1 / (steps - 1)).map(function(d) {
        return colorInterpolator(d)
    });

  return colorArray.reverse() // lol changed my mind on coloration
}


function _playColors(){return(
[{startColor: 'rgb(241,207,38)', endColor:'rgb(254,250,236)'}, // AWW
 {startColor: 'rgb(151,25,26)', endColor:'rgb(253,228,239)'}, // Ant
{startColor: 'rgb(149,33,70)', endColor:'rgb(248,227,237)'}, // AYL
{startColor: 'rgb(121,193,23)', endColor:'rgb(234,251,176)'}, // Err
{startColor: 'rgb(0,72,107)', endColor:'rgb(135,35,118)'}, // Cor
{startColor: 'rgb(89,147,210)', endColor:'rgb(210,237,255)'}, // Cym
{startColor: 'rgb(0,145,182)', endColor:'rgb(210,237,255)'}, // Ham
{startColor: 'rgb(39,39,65)', endColor:'rgb(107,134,152)'}, // 1H4
{startColor: 'rgb(0,80,32)', endColor:'rgb(88,168,107)'}, // 2H4
{startColor: 'rgb(0,173,187)', endColor:'rgb(0,161,172)'}, // H5
{startColor: 'rgb(44,69,61)', endColor:'rgb(0,132,129)'}, // 1H6
{startColor: 'rgb(143,22,73)', endColor:'rgb(220,177,187)'}, // 2H6
{startColor: 'rgb(184,52,29)', endColor:'rgb(224,149,112)'}, //3H6
{startColor: 'rgb(226,146,31)', endColor:'rgb(252,191,104)'}, //H8
{startColor: 'rgb(0,122,191)', endColor:'rgb(156,226,246)'}, //JC
{startColor: 'rgb(2,33,88)', endColor:'rgb(129,169,223)'}, // Jn
{startColor: 'rgb(55,37,134)', endColor:'rgb(167,135,185)'}, //Lr
{startColor: 'rgb(238,232,197)', endColor:'rgb(227,196,121)'}, //LLL
{startColor: 'rgb(34,35,82)', endColor:'rgb(153,149,176)'}, // Mac
{startColor: 'rgb(114,168,85)', endColor:'rgb(162,91,36)'}, // MM
{startColor: 'rgb(49,63,51)', endColor:'rgb(222,238,212)'}, // MV
{startColor: 'rgb(42,60,159)', endColor:'rgb(238,193,187)'}, // Wiv
{startColor: 'rgb(187,180,109)', endColor: 'rgb(205,227,123)'}, // MND
{startColor: 'rgb(241,102,11)', endColor:'rgb(243,182,3)'}, // Ado
{startColor: 'rgb(132,2,2)', endColor:'rgb(246,77,31)'}, // Oth
{startColor: 'rgb(85,73,74)', endColor: 'rgb(227,145,106)'}, // Per
{startColor: 'rgb(00,25,00)', endColor:'rgb(12,127,12)'}, // R2
{startColor: 'rgb(221,119,36)', endColor:'rgb(254,215,70)'}, //R3
{startColor: 'rgb(112,33,9)', endColor:'rgb(234,157,187)'}, //Rom
{startColor: 'rgb(250,175,48)', endColor:'rgb(255,234,81)'}, //Shr
{startColor: 'rgb(184,140,15)', endColor:'rgb(254,237,1)'}, // Tmp
{startColor: 'rgb(162,49,34)', endColor:'rgb(228,53,45)'}, // Tim
{startColor: 'rgb(128,48,56)', endColor:'rgb(166,45,114)'}, // Tit
{startColor: 'rgb(110,9,37)', endColor:'rgb(216,137,31)'}, // Tro
{startColor: 'rgb(13,77,0)', endColor: 'rgb(215, 255, 190)'}, // TN
{startColor: 'rgb(122,54,41)', endColor:'rgb(214,110,52)'}, // TGV
{startColor: 'rgb(234,125,94)', endColor:'rgb(253,176,192)'}, // TNK
{startColor: 'rgb(39,158,188)', endColor:'rgb(150,213,244)'}]
)}

function _getKey(plays){return(
function getKey(val) {
  return [...plays].find(([key, value]) => val === value)[0];
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["statspeare@3.csv", {url: new URL("./files/717d56d8376b87f744e1702f3a7d859731ad99388fb3c9a078c538c5592704892763e45fe425fd15f7c8e45f3d554a0c5606e27fe08d60c88682d22e626dca4d.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("statspeare")).define("statspeare", ["__query","FileAttachment","invalidation"], _statspeare);
  main.variable(observer("PlayCodes")).define("PlayCodes", _PlayCodes);
  main.variable(observer("plays")).define("plays", ["d3","statspeare"], _plays);
  main.variable(observer("viewof playSelected")).define("viewof playSelected", ["Inputs","plays"], _playSelected);
  main.variable(observer("playSelected")).define("playSelected", ["Generators", "viewof playSelected"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","playSelected"], _7);
  main.variable(observer("data")).define("data", ["playSelected"], _data);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  main.variable(observer("height")).define("height", ["width"], _height);
  main.variable(observer()).define(["width"], _11);
  main.variable(observer("rad")).define("rad", ["height"], _rad);
  main.variable(observer("getAngles")).define("getAngles", ["d3"], _getAngles);
  main.variable(observer("piedata")).define("piedata", ["getAngles","playSelected"], _piedata);
  main.variable(observer("getArcs")).define("getArcs", ["d3","rad"], _getArcs);
  main.variable(observer("createPie")).define("createPie", ["d3","width","height","piedata","getColors","getArcs","rad","playSelected"], _createPie);
  main.variable(observer("getColors")).define("getColors", ["getKey","playSelected","playColors","PlayCodes","d3"], _getColors);
  main.variable(observer("playColors")).define("playColors", _playColors);
  main.variable(observer("getKey")).define("getKey", ["plays"], _getKey);
  return main;
}
