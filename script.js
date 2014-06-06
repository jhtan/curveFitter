$(document).ready( function () {
    /*var sinPoints = []; 
    for (var i=0; i<2*Math.PI; i+=0.1){ 
	sinPoints.push([i, 2*Math.sin(i-.8)]); 
    }*/

    var points = [[1,2],[2,3],[9,1]];

    var plot = $.jqplot ("chartHolder", [points], {
	title: 'graph',
	series: [{showMarker: false}],
	dataRender: addPair
    });

    function addPair(x, y) {
	$("#dataTable").prepend("<tr><td>"+x+"</td><td>"+y+"</td></tr>");
	
	var data = [[]];
	data[0].push([x, y]);
	return data;
    }

    $("#newXCoordinate, #newYCoordinate").change(function () {
	if($("#newXCoordinate").val() && $("#newYCoordinate").val()) {
	    addPair($("#newXCoordinate").val(), $("#newYCoordinate").val());
	    $("#newXCoordinate").val("");
	    $("#newYCoordinate").val("");
	}
    });
});