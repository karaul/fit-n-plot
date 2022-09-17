document.addEventListener("DOMContentLoaded", function () {
  function guessDelimiters(text, possibleDelimiters) {
    return possibleDelimiters.filter(weedOut);

    function weedOut(delimiter) {
      var cache = -1;
      return text.split("\n").every(checkLength);

      function checkLength(line) {
        if (!line) {
          return true;
        }

        var length = line.split(delimiter).length;
        if (cache < 0) {
          cache = length;
        }
        return cache === length && length > 1;
      }
    }
  }

  function transpose(a) {
    return a[0].map(function (_, c) {
      return a.map(function (r) {
        return r[c];
      });
    });
  }

  document.getElementById("cleanall").onclick = function (e) {
    for (let k = chart.options.data.length - 1; k > 1; k--) {
      chart.options.data.pop();
    }
    chart.render();
  };
  document.getElementById("cleanlast").onclick = function (e) {
    chart.options.data.pop();
    chart.render();
  };

  var fReader = new FileReader();

  var fileInput = document.getElementById("myfile");
  var fileHist = document.getElementById("filehist");

  var filename = "";

  fileInput.onchange = function (e) {
    var file = this.files[0];
    filename = file.name;
    fReader.readAsText(file);
  };

  fileHist.onchange = function (e) {
    //console.log(this.files);
    for (var i = 0; i < this.files.length; i++) {
      var fReaderHist = new FileReader();
      var file = this.files[i];
      var filename = file.name;
      fReaderHist.onload = (function (file) {
        return function (e) {
          readHist(e, file)
        };
      })(filename);
      fReaderHist.readAsText(file);
    }

    charHist.render();
  };

  var xStart, xEnd;
  var dataY = [];
  var dataYErr = [];

  var chart = new CanvasJS.Chart("plotarea", {
    title: {
      text: "Data Plot + Fit Function"
    },
    zoomEnabled: true,
    zoomType: "xy", // "x","y", "xy"
    //,rangeChanging: updateMapSegment
    //,animationEnabled: true
    theme: "light2", // "light1", "light2", "dark1", "dark2"
    //axisX: { gridThickness: 0.5, snapToDataPoint: true },
    //axisY: { gridThickness: 0.5, snapToDataPoint: true },
    //axisY2: axisY2ops,
    legend: {
      fontSize: 15,
      horizontalAlign: "right", // "center" , "right" "left"
      verticalAlign: "top", // "top" , "bottom" center
      //,cursor: "pointer"
      //,itemclick: toggleDataSeries
      itemclick: toggleDataSeries,
    },
    data: [{
        type: "error",
        showInLegend: false,
        //legendText: "input",
        name: "Error",
        //whiskerLength: 0.5,
        toolTipContent: '<span style="color:#C0504E">{name}</span>: {y[0]} - {y[1]}',
        dataPoints: dataYErr,
      },
      {
        type: "scatter",
        showInLegend: false,
        //legendText: "Input Data",
        //markerType: "circle", //"triangle",
        //markerColor: "#ffffff",
        //fillOpacity: .1,
        //markerSize: 4,
        //markerBorderColor: "#00B000",
        //markerBorderThickness: 0.5,
        toolTipContent: "<b>X: </b>{x} <br/><b>Yexp: </b>{y}k",
        dataPoints: dataY,
      },
    ],
  });

  var charHist = new CanvasJS.Chart("plothist", {
    theme: "light2",
    title: {
      text: "Parameter PDF"
    },
    legend: {
      fontSize: 15,
      horizontalAlign: "right", // "center" , "right" "left"
      verticalAlign: "top", // "top" , "bottom" center
      //,cursor: "pointer"
      //,itemclick: toggleDataSeries
      itemclick: toggleDataSeries,
    },
    data: []
  });


  fReader.onload = function (e) {
    //console.log(e.target.result); /// <-- this contains an ArrayBuffer
    var text = e.target.result;
    var lines = text.split(/[\r\n]+/g); // tolerate both Windows and Unix linebreaks

    linestart = 0;
    for (var i = linestart; i < lines.length; i++) {
      lines[i] = lines[i].trim().replace(/\s{2,}/g, " ");
    }
    var delim = guessDelimiters(lines[8] + "\n" + lines[9], [" ", "\t", ","]);
    xStart = 999999999;
    xEnd = -999999999;
    for (var i = linestart; i < lines.length; i++) {
      var s = lines[i].split(delim[0]);
      if (isNaN(parseFloat(s[0]))) {} else {
        var x = parseFloat(s[0]);
        dataY.push({
          x: x,
          y: parseFloat(s[1])
        });
        dataYErr.push({
          x: x,
          y: [
            parseFloat(s[1]) - parseFloat(s[2]),
            parseFloat(s[1]) + parseFloat(s[2]),
          ],
        });
        if (xStart > x) {
          xStart = x;
        }
        if (xEnd < x) {
          xEnd = x;
        }
      }
    }

    //console.log(dataY);
    //console.log(xEnd);
    chart.render();
    //data = transpose(data);
  };

  readHist = function (e, filename) {
    //console.log(e.target.result); /// <-- this contains an ArrayBuffer
    //var filename=e.name;
    //console.log(fReaderHist.filename);
    var text = e.target.result;
    //console.log(text);
    var lines = text.split(/[\r\n]+/g); // tolerate both Windows and Unix linebreaks

    linestart = 0;
    for (var i = linestart; i < lines.length; i++) {
      lines[i] = lines[i].trim().replace(/\s{2,}/g, " ");
    }
    var delim = guessDelimiters(lines[8] + "\n" + lines[9], [" ", "\t", ","]);
    //xStart = 999999999;
    //xEnd = -999999999;
    var nHist = charHist.options.data.length || 0;
    charHist.options.data.push({
      type: "column",
      showInLegend: true,
      legendText: filename,
      dataPoints: []
    });
    for (var i = linestart; i < lines.length; i++) {
      var s = lines[i].split(delim[0]);
      if (isNaN(parseFloat(s[0]))) {} else {
        charHist.options.data[nHist].dataPoints.push({
          x: parseFloat(s[0]),
          y: parseFloat(s[1]),
        });
        //if( xStart > x  ) { xStart = x;}
        //if( xEnd < x  ) { xEnd = x;}
      }
    }

    charHist.render();

  };

  document.getElementById("plot").onclick = function () {
    var eq = document.getElementById("eq").value;
    eval("fn = function(x) { return " + eq + " ;} ");
    var data = [];
    var Nbin = 100;
    var xs = (xEnd - xStart) / Nbin;
    // console.log(xStart,xEnd,xs)    
    for (var i = 0; i < Nbin + 1; i++) {
      var x = xStart + i * xs;
      //   return [ 5.88 - 5.063*x + 1.03*x*x ];
      var y = fn(x);
      //var y = 5.88 - 5.063*x + 1.03*x*x;
      //console.log(x, y);
      data.push({
        x: x,
        y: y
      });
    }
    chart.options.data.push({
      type: "line",
      showInLegend: true,
      legendText: "fit: " + eq,
      dataPoints: data,
    });
    chart.render();
  };

  /*       var plot;  // defined below
      var select = document.getElementById("presets");
      var presets = {
        'id': [ -10, 10, 'function(x) {\n  return x;\n}' ],
        'sine': [ -10, 10, 'function(x) {\n  return Math.sin(x);\n}' ],
        'taylor': [ -3, 3, 'function(x) {\n  return [Math.cos(x), 1 - x*x/2 + x*x*x*x/24];\n}' ],
        'sawtooth': [-10, 10, 'function(x) {\n  var y = 0;\n  for (var i = 1; i < 20; i+=2) {\n    y += Math.sin(i * x)/i;\n  }\n  var final = 1 - 2*(Math.abs(Math.floor(x / Math.PI)) % 2);\n  return [4/Math.PI * y, final];\n}' ]
      };
      select.onchange = function() {
        var sel = select.selectedIndex;
        var id = select.options[sel].id;

        if (id == "custom") { return; }
        document.getElementById("x1").value = presets[id][0];
        document.getElementById("x2").value = presets[id][1];
        document.getElementById("eq").value = presets[id][2];
        plot();
      };

      var plotButton = document.getElementById("plot");
      plot = function() {
        var eq = document.getElementById("eq").value;
        eval("fn = " + eq);

        var graph = document.getElementById("graph_div");
        var width = parseInt(graph.style.width, 10);
        var x1 = parseFloat(document.getElementById("x1").value);
        var x2 = parseFloat(document.getElementById("x2").value);
        var xs = 1.0 * (x2 - x1) / width;

        var data = [];
        for (var i = 0; i < width; i++) {
          var x = x1 + i * xs;
          var y = fn(x);
          var row = [x];
          if (y.length > 0) {
            for (var j = 0; j < y.length; j++) {
              row.push(y[j]);
            }
          } else {
            row.push(y);
          }
          data.push(row);
        }

        new Dygraph(graph, data);
      };
      plotButton.onclick = plot;
      plot();
	*/

  function toggleDataSeries(e) {
    if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    e.chart.render();
  };

});