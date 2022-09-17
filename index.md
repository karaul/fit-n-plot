<!DOCTYPE html>
<html>
  <head>
    <!-- <link rel="stylesheet" href="./node_modules/dygraphs/dist/dygraph.css">
		<script type="text/javascript"  src="./node_modules/dygraphs/dist/dygraph.js"></script>
		<script type="text/javascript"  src="./node_modules/dygraphs/src/extras/crosshair.js"></script> -->
    <script
      type="text/javascript"
      src="./src/canvasjs/canvasjs.min.js"
    ></script>
    <!-- <script type="text/javascript"  src="./node_modules/median-quickselect/src/median-quickselect.js"></script> -->
    <!-- <style type="text/css"> .annotation {}</style>   table { width: 100%; } -->
    <style type="text/css">
      * {
        box-sizing: border-box;
      }

      .container {
        border: 5p;
        padding: 6px;
      }
      .column1 {
        width: 50%;
        float: left;
        padding: 2px;
      }
      .column2 {
        width: 50%;
        height: 240px;
        float: left;
        padding: 2px;
      }
    </style>
  </head>
  <body>
    <p>
      <label for="myfile">Input Data File:</label>
      <input id="myfile" type="file" value="" style="padding: 20px" />
      <!-- <input id="adddata" type="checkbox" value="false"> <label for="adddata">add data from file</label>  -->
      <!-- <p> <input id="addfile" type="file" value=''/> </p> -->
      <!-- <label for="xaxis">Choose x-axis:</label> -->
      <!-- <select name="x" id="xaxis"> -->
      <!-- <option value="distance">distance</option>  -->
      <!-- <option value="timestamp">time</option> -->
      <!-- </select>  -->
      &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
      &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp 
      <label for="filehist">Histogram Files:</label>
      <input id="filehist" type="file"  multiple="" value="" style="padding: 20px" />
  
    </p>

    Fit Function:
    <textarea cols="70" rows="1" id="eq"> 5.88 - 5.063*x + 1.03*x*x  </textarea>

    <br />

    <!-- <b>Preset functions:</b> <select id="presets">
<option selected="" id="custom">(custom)</option>
<option id="id">Identity</option>
<option id="sine">Sine Wave</option>
<option id="taylor">Taylor series</option>
<option id="sawtooth">Sawtooth</option>
</select>
</p>

<p><b>x range: </b> <input type="text" width="5" id="x1" value="-10">
to <input type="text" width="5" id="x2" value="10"></p> -->

    <p><button id="plot">plot fit</button></p>

    <!-- <font size=-1>&nbsp  Move mouse to see values. Click and drag to zoom. Double-click to restore</font><br/> -->

    <!-- <div id="plotarea" style="width:640px; height:480px;"></div> -->

    <!-- <div id="plothist" style="width:600px; height:300px;"></div> -->

    <div class="container">
      <div
        class="column1"
        id="plotarea"
        style="
          width: 50%;
          height: 480px;
          padding-left: 0pt;
          margin-bottom: 10px;
        "
      ></div>

      <div
        class="column2"
        id="plothist"
        style="
          width: 50%;
          height: 480px;
          padding-right: 0pt;
          margin-bottom: 10px;
        "
      ></div>
    </div>

    <input id="cleanall" type="button" value="Remove all fits" />
    <input
      id="cleanlast"
      type="button"
      value="Remove last fit"
      style="margin-left: 4em"
    />
  </body>

  <script type="text/javascript" src="./src/index.js"></script>
</html>
