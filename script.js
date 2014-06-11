$(document).ready( function () {
//    var X = [], Y = [], lnX = [], lnY = [], points = []; // the data of the graph.
//    var X = [2,4,6,8,10,12,15], Y = [0,10,18,32,45,52,65], lnX = [], lnY = [], points = []; // test data.
    var X = [4,6,8,10,12,15], Y = [10,18,32,45,52,65], lnX = [], lnY = [], points = []; // test data.

    getLogs();
    linealFunctionPoints();
    getTheModel();
    calculateA(X, Y);
    calculateB(X, Y);


    // Creation of the jQplot object.
    var plot = $.jqplot ("chartHolder", [points], {
        title: 'Ajuste de curvas',
        series: [{showMarker: false}]
    });

    /**
     * Generate the logarithmic data.
     */
    function getLogs() {
        for(var i = 0; i < X.length; i++) {
            lnX[i] = Math.log(X[i]);
        }

        for(var i = 0; i < Y.length; i++) {
            lnY[i] = Math.log(Y[i]);
        }
    }

    /**
     * Choosing the appropriate model.
     */
    function getTheModel() {
        // Lineal function.
        var a1 = calculateA(X, Y);
        var b1 = calculateB(X, Y);
        var r1 = calculateR(X, Y);
        $('#linA').text(Math.round(a1*100)/100);
        $('#linB').text(Math.round(b1*100)/100);
        $('#linR').text(Math.round(r1*100)/100);

        // Potential function.
        var a2 = calculateA(lnX, lnY);
        var b2 = calculateB(lnX, lnY);
        var r2 = calculateR(lnX, lnY);
        $('#potA').text(Math.round(a2*100)/100);
        $('#potB').text(Math.round(b2*100)/100);
        $('#potR').text(Math.round(r2*100)/100);

        // Logarithmic function.
        var a3 = calculateA(X, lnY);
        var b3 = calculateB(X, lnY);
        var r3 = calculateR(X, lnY);
        $('#logA').text(Math.round(a3*100)/100);
        $('#logB').text(Math.round(b3*100)/100);
        $('#logR').text(Math.round(r3*100)/100);

        // Exponential function.
        var a4 = calculateA(lnX, lnY);
        var b4 = calculateB(lnX, lnY);
        var r4 = calculateR(lnX, lnY);
        $('#expA').text(Math.round(a4*100)/100);
        $('#expB').text(Math.round(b4*100)/100);
        $('#expR').text(Math.round(r4*100)/100);

        if(Math.abs(1-r1)<Math.abs(1-r2) && Math.abs(1-r1)<Math.abs(1-r3) && Math.abs(1-r1)<Math.abs(1-r4)) {
            // It's selected the lineal model.
            
        } else if(Math.abs(1-r2)<Math.abs(1-r1) && Math.abs(1-r2)<Math.abs(1-r3) && Math.abs(1-r2)<Math.abs(1-r4)) {
            // It's selected the potential model.
        } else if(Math.abs(1-r3)<Math.abs(1-r1) && Math.abs(1-r3)<Math.abs(1-r2) && Math.abs(1-r3)<Math.abs(1-r4)) {
            // It's selected the logarithmic model.
        } else if(Math.abs(1-r4)<Math.abs(1-r1) && Math.abs(1-r4)<Math.abs(1-r2) && Math.abs(1-r4)<Math.abs(1-r3)) {
            // It's selected the exponential model.
        }
    }

    /**
     * Creating the points for a lineal function.
     */
    function linealFunctionPoints() {
        var a = calculateA(X, Y);
        var b = calculateB(X, Y);

        points = [];
        for (var i = -3; i <= 3; i+=0.1) {
            points.push([i, a*i+b]);
        }
    }

    function addPair(x, y) {
        $("#dataTable").prepend("<tr><td>"+x+"</td><td>"+y+"</td></tr>"); // puts the data in the screen.

        X.push(parseFloat(x));
        Y.push(parseFloat(y));
        lnX.push(Math.log(parseFloat(x)));
        lnY.push(Math.log(parseFloat(y)));
        linealFunctionPoints();

        // Redraw the chart.
        plot.destroy();
        plot = $.jqplot ("chartHolder", [points], {
            title: 'Ajuste de curvas',
            series: [{showMarker: false}]
        });
    }

    function Sumx(vX){
        var sumx = 0;
        
        for(var i=0; i< vX.length; i++) {
            sumx = sumx + parseInt(vX[i]);
        }
        return parseFloat(sumx);
    }

    function Sumy(vY){
        var sumy = 0;
        
        for(var i=0; i< vY.length; i++) {
            sumy += parseFloat(vY[i]);
        }
        return parseFloat(sumy);
    }

    function Sumx2(vX) {
        var sumx2=0;

        for(var i=0;i< vX.length; i++) {
            sumx2 += (parseFloat(vX[i]) * parseFloat(vX[i]));
        }

        return parseFloat(sumx2);
    }

    function Sumy2(vY) {
        var sumy2 = 0;

        for(var i=0;i< vY.length; i++) {
            sumy2 += (parseFloat(vY[i]) * parseFloat(vY[i]));
        }
        return parseFloat(sumy2);
    }

    function Sumxy(vX, vY) {
        var sumxy = 0;

        for(var i=0;i< vX.length; i++) {
            sumxy += (parseFloat(vX[i]) * parseFloat(vY[i]));
        }
        return parseFloat(sumxy);
    }

    function calculateA(vX, vY) {
        var n = (Sumx2(vX) * Sumy(vY)) - (Sumx(vX) * Sumxy(vX, vY));
        var m = (vX.length * Sumx2(vX)) - ((Sumx(vX)) * (Sumx(vX)));
        var a = parseFloat(n) / parseFloat(m);

        $('#aValue').text(a);
        $('#aValueRounded').text(Math.round(a * 100) / 100);

        return a;
    }

    function calculateB(vX, vY) {
        var n = (X.length * Sumxy(vX, vY)) - (Sumx(vX) * Sumy(vY));
        var m = (X.length * Sumx2(vX)) - (Sumx(vX) * Sumx(vX));
        var b = parseFloat(n) / parseFloat(m);

        $('#bValue').text(b);
        $('#bValueRounded').text(Math.round(b * 100) / 100);

        return b;
    }

    function calculateR(vX, vY) {
        var n = (X.length * Sumxy(vX, vY)) - (Sumx(vX) * Sumy(vY));
        var root = (X.length * Sumx2(vX) - (Sumx(vX)*Sumx(vX)))*(X.length*Sumy2(vY)-(Sumy(vY)*Sumy(vY)));
        var m = Math.sqrt(root);
        var r = parseFloat(n) / parseFloat(m);

        $('#rValue').text(r);

        return r;
    }

    //calculate Sy/x, Sa, Sb
    function Syx()
    {
        var Syx=0;
        var sumab=0;
        for( var i=0; i< X.length; i++)
        {
            sumab+=((a+b*X[i])-Y[i])*((a+b*X[i])-Y[i]);
        }
        Syx = Math.sqrt(samab/X.length()-2)
         
    }

    $("#newXCoordinate, #newYCoordinate").change(function () {
        if($("#newXCoordinate").val() && $("#newYCoordinate").val()) { // validate null
            addPair($("#newXCoordinate").val(), $("#newYCoordinate").val()); // call to addPair

            $("#newXCoordinate").val(""); // clear the textbox
            $("#newYCoordinate").val(""); // clear the textbox
        }
    });
});