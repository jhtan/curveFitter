$(document).ready( function () {
    var X = [], Y = []; // the data of the graph.

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

        X.push(x);
        Y.push(y);
        calculateA();
        calculateB();
        calculateX();

        var data = [[]];
        data[0].push([x, y]);
        return data;
    }

    /**
     * Calculate the a value.
     */
    function calculateA() {
        var a = 0;
        for(var i = 0; i< X.length; i++) {
            a += parseInt(X[i]);
        }

        $('#aValue').text(a);
    }

    function calculateB() {

    }

    function calculateX() {

    }

    $("#newXCoordinate, #newYCoordinate").change(function () {
        if($("#newXCoordinate").val() && $("#newYCoordinate").val()) { // validate null
            addPair($("#newXCoordinate").val(), $("#newYCoordinate").val()); // call to addPair

            $("#newXCoordinate").val(""); // clear the textbox
            $("#newYCoordinate").val(""); // clear the textbox
        }
    });
});