$(document).ready( function () {
//    var X = [], Y = [], lnX = [], lnY = [], points = []; // the data of the graph.
//    var X = [4,6,8,10,12,15], Y = [10,18,32,45,52,65], lnX = [], lnY = [], points = []; // test data for lineal.
    var X = [1.2, 1.5, 2.5, 3, 4.5, 5.1, 7.1, 8.1], Y = [1.2, 1.8, 5, 9, 19.5, 32.5, 55, 80], lnX = [], lnY = [], points = []; // test data for potential.
//    var X = [0.2, 0.4, 0.6, 0.8, 1, 1.2], Y = [5.2, 10.7, 20.5, 37.8, 74.6, 140.6], lnX = [], lnY = [], points = []; // test data for potential.
    getLogs();
    getTheModel();

//    setTimeout( function () {
//        redrawTheChart();
//        alert(':P');
//    }, 3000);

    // Creation of the jQplot object.
    var plot = $.jqplot ("chartHolder", [points], {
        title: 'Gráfica Linealizada',
        series: [{showMarker: false}],
        axes: {
            xaxis: {label: "X"},
            yaxis: {label: "Y"}
        }
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
        $('#linR').text(Math.round(r1*1000000)/1000000);

        // Potential function.
        var ea2=0;//variable para hacer el cambio d evar e^A*
        
        var a2 = calculateA(lnX, lnY);
        var b2 = calculateB(lnX, lnY);
        var r2 = calculateR(lnX, lnY);
        ea2=Math.pow(Math.E,a2);
        $('#potA').text(Math.round(ea2*100)/100);
        $('#potB').text(Math.round(b2*100)/100);
        $('#potR').text(Math.round(r2*1000000)/1000000);

        // Logarithmic function.
        var a3 = calculateA(lnX, Y);
        var b3 = calculateB(lnX, Y);
        var r3 = calculateR(lnX, Y);
        $('#logA').text(Math.round(a3*100)/100);
        $('#logB').text(Math.round(b3*100)/100);
        $('#logR').text(Math.round(r3*1000000)/1000000);

        // Exponential function.
        var a4 = calculateA(X, lnY);
        var b4 = calculateB(X, lnY);
        var r4 = calculateR(X, lnY);
        var ea=0;//variable para hacer el cambio d evar e^A*
        ea=Math.pow(Math.E,a4);
        $('#expA').text(Math.round(ea*100)/100);
        $('#expB').text(Math.round(b4*100)/100);
        $('#expR').text(Math.round(r4*1000000)/1000000);

        if(Math.abs(1-r1)<Math.abs(1-r2) && Math.abs(1-r1)<Math.abs(1-r3) && Math.abs(1-r1)<Math.abs(1-r4)) {
            // It's selected the lineal model.
            $('#collapseDecisionTable').text('Se eligió el modelo lineal');
            calculateA(X, Y);
            calculateB(X, Y);
            linealFunctionPoints();

            var sa = Sa(a1, b1, X, Y);
            var sb = Sb(a1, b1, X, Y);
            $('#saValue').text(sa);
            $('#sbValue').text(sb);
        } else if(Math.abs(1-r2)<Math.abs(1-r1) && Math.abs(1-r2)<Math.abs(1-r3) && Math.abs(1-r2)<Math.abs(1-r4)) {
            // It's selected the potential model.
            $('#collapseDecisionTable').text('Se eligió el modelo potencial');
            calculateA(lnX, lnY);
            calculateB(lnX, lnY);
            potentialFunctionPoints();
        } else if(Math.abs(1-r3)<Math.abs(1-r1) && Math.abs(1-r3)<Math.abs(1-r2) && Math.abs(1-r3)<Math.abs(1-r4)) {
            // It's selected the logarithmic model.
            $('#collapseDecisionTable').text('Se eligió el modelo logarítmico');
            calculateA(lnX, Y);
            calculateB(lnX, Y);
            logarithmicFunctionPoints();
        } else if(Math.abs(1-r4)<Math.abs(1-r1) && Math.abs(1-r4)<Math.abs(1-r2) && Math.abs(1-r4)<Math.abs(1-r3)) {
            // It's selected the exponential model.
            $('#collapseDecisionTable').text('Se eligió el modelo exponencial');
            calculateA(X, lnY);
            calculateB(X, lnY);
            exponentialFunctionPoints();
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

    /**
     * Creating the points for a potential function.
     */
    function potentialFunctionPoints() {
        var a = Math.pow(Math.E,calculateA(lnX, lnY));
        $('#aValue').text(a);
        var b = calculateB(lnX, lnY);
        var r = calculateR(lnX, lnY);

        points = [];
        for (var i = -3; i <= 3; i+=0.1) {
            points.push([i, a*i+b]);
        }

        points2 = [];
        for(var i= 0; i< X.length; i++) {
            points2.push([X[i], Y[i]]);
        }

        var plot2= $.jqplot ("chartHolder2", [points2], {
            title: 'Modelo Potencial',
            series: [{showLine: false}],
            axes: {
                xaxis: {label: "log X"},
                yaxis: {label: "log Y", tickSpacing: 10000}
            }
        });
    }

    /**
     * Creating the points for a exponential function.
     */
    function exponentialFunctionPoints() {
        var a = calculateA(X, Y);
        var b = calculateB(X, Y);

        points = [];
        for (var i = -3; i <= 3; i+=0.1) {
            points.push([i, a*Math.pow(b, i)]);
        }
    }

    /**
     * Creating the points for a logarithmic function.
     */
    function logarithmicFunctionPoints() {
        var a = calculateA(X, Y);
        var b = calculateB(X, Y);

        points = [];
        for (var i = -3; i <= 3; i+=0.1) {
            points.push([i, a+b*Math.log(i)]);
        }
    }

    function addPair(x, y) {
        $("#dataTable").prepend("<tr><td>"+x+"</td><td>"+y+"</td></tr>"); // puts the data in the screen.

        X.push(parseFloat(x));
        Y.push(parseFloat(y));
        lnX.push(Math.log(parseFloat(x)));
        lnY.push(Math.log(parseFloat(y)));
        linealFunctionPoints();
        redrawTheChart();
    }

    function redrawTheChart() {
        plot.destroy();
        plot = $.jqplot ("chartHolder", [points], {
            title: 'Ajuste de curvas',
            series: [{showMarker: false}]
        });
    }

    function Sumx(vX){
        var sumx = 0;
        
        for(var i=0; i< vX.length; i++) {
            sumx = sumx + parseFloat(vX[i]);
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
        var n = (vX.length * Sumxy(vX, vY)) - (Sumx(vX) * Sumy(vY));
        var root = parseFloat( (vX.length * Sumx2(vX) - (Sumx(vX)*Sumx(vX)))*(X.length*Sumy2(vY)-(Sumy(vY)*Sumy(vY))) );
        var m = Math.sqrt(root);
        var r = parseFloat(n) / parseFloat(m);

        $('#rValue').text(r);

        return r;
    }

    //calculate Sy/x, Sa, Sb
    function Syx(a, b, vX, vY) {
        var sumab = 0;
        for( var i=0; i< vX.length; i++) {
            sumab += ((a+b*vX[i])-vY[i]) * ((a+b*vX[i])-vY[i]);
        }
        return Math.sqrt(sumab/vX.length-2);
    }

    function Sb(a, b, vX, vY) {
        var sb=0;
        var m = Sumx2(vX) - ((Sumx(vX)*Sumx(vX))/vX.length);
        return Syx(a, b, vX, vY)/Math.sqrt(m);
    }

    function Sa(a, b, vX, vY) {
        var sa=0;
        var m=0;
        m = vX.length*Sumx2(vX) - (Sumx(vX)*Sumx(vX));
        return Syx(a, b, vX, vY)*Math.sqrt(Sumx2(vX)/m);
    }

    function factorT() {
        var matriz = new Array ();
        matriz[0] = new Array (1.000 , 3.078, 6.314, 12.706, 31.821, 63.657, 127.3, 318.31, 636.62); 
        matriz[1] = new Array (0.816, 1.886, 2.920, 4.303, 6.965, 9.925, 14.089, 23.326, 31.598); 
        matriz[2] = new Array (0.765, 1.638, 2.353, 3.182, 4.541, 5.841, 7.453, 10.213, 12.924);
        matriz[3] = new Array (0.741, 1.533, 2.132, 2.776, 3.747, 4.604, 5.598, 7.173, 8.610); 
        matriz[4] = new Array (0.727, 1.476, 2.015, 2.571, 3.365, 4.032, 4.773, 5.893, 6.869); 
        matriz[5] = new Array (0.718, 1.440, 1.943, 2.447, 3.143, 3.707, 4.317, 5.208, 5.959); 
        matriz[6] = new Array (0.711, 1.415, 1.895, 2.365, 2.998, 3.499, 4.029, 4.785, 5.408); 
        matriz[7] = new Array (0.706, 1.397, 1.860, 2.306, 2.896, 3.355, 3.833, 4.501, 5.041); 
        matriz[8] = new Array (0.703, 1.383, 1.833, 2.262, 2.821, 3.250, 3.690, 4.297, 4.781); 
        matriz[9] = new Array (0.700, 1.372, 1.812, 2.228, 2.764, 3.169, 3.581, 4.144, 4.587); 
        matriz[10] = new Array (0.697, 1.363, 1.796, 2.201, 2.718, 3.106, 3.497, 4.025, 4.437); 
        /**
        matriz[11] = new Array (0.695, 1.356, 1.782, 2.179, 2.681, 3.055, 3.428, 3.930. 4.318); 
        matriz[12] = new Array (0.694, 1.350, 1.771, 2.160, 2.650, 3.012, 3.372, 3.852, 4.221); 
        matriz[13] = new Array (0.692, 1.345, 1.761, 2.145, 2.624, 2.977, 3.326, 3.787, 4.140);
        matriz[14] = new Array (0.691, 1.341, 1.753, 2.131, 2.602, 2.297, 3.286, 3.733, 4.073);    
        matriz[15] = new Array (0.690, 1.337, 1.746, 2.120, 2.583, 2.921, 3.252, 3.686, 4.015);    
        matriz[16] = new Array (0.689, 1.333, 1.740, 2.110, 2.567, 2.898, 3.222, 3.646, 3.965);    
        matriz[17] = new Array (0.688, 1.330, 1.734, 2.101, 2.552, 2.878, 3.197, 3.610, 3.922);    
        matriz[18] = new Array (0.688, 1.328, 1.729, 2.093, 2.539, 2.861, 3.174, 3.579, 3.883);    
        matriz[19] = new Array (0.687, 1.395, 1.725, 2.086, 2.528, 2.845, 3.153, 3.555, 3.850);    
        matriz[20] = new Array (0.686, 1.323, 1.721, 2.080, 2.518, 2.831, 3.135, 3.527, 3.819);
        matriz[21] = new Array (0.686, 1.321, 1.717, 2.074, 2.508, 2.819, 3.119, 3.505, 3.792);    
        matriz[22] = new Array (0.685, 1.319, 1.714, 2.069, 2.500, 2.807, 3.104, 3.485, 3.767);    
        matriz[23] = new Array (0.685, 1.318, 1.711, 2.064, 2.492, 2.797, 3.091, 3.467, 3.745);    
        matriz[24] = new Array (0.684, 1.316, 1.708, 2.060, 2.485, 2.787, 3.078, 3.450, 3.725);    
        matriz[25] = new Array (0.684, 1.315, 1.706, 2.056, 2.479, 2.779, 3.067, 3.435, 3.707);
        matriz[26] = new Array (0.684, 1.314, 1.703, 2.052, 2.473, 2.771, 3.057, 3.421, 3.690);    
        matriz[27] = new Array (0.683, 1.313, 1.701, 2.048, 2.467, 2.763, 3.047, 3.408, 3.674);    
        matriz[28] = new Array (0.683, 1.311, 1.699, 2.045, 2.462, 2.746, 3.038, 3.396, 3.659);    
        matriz[29] = new Array (0.683, 1.310, 1.697, 2.042, 2.457, 2.750, 3.030, 3.385, 3.696); 
       
        */
       
       var n=0;
       n = X.length-2;
       var student;
       student=0;
       //student
       switch (student) {
        case 0:
            return matriz[n][0];
            break;
        case 1:
            return matriz[n][1];
            break;
        case 2:
            return matriz[n][2];
            break;
        case 3:
            return matriz[n][3];
            break;
        case 4:
            return matriz[n][4];
            break;
        case 5:
            return matriz[n][5];
            break;
        case 6:
            return matriz[n][6];
            break;
        case 7:
            return matriz[n][7];
            break;
        case 8:
            return matriz[n][8];
            break;
        default:
            alert("NO SE PUEDE BRO..");    

        }
       /**
       }else{alert("No se puede bro..."}

        //a +- Sa*factorT
        //b +- Sb*factorT
*/
    }

    $("#newXCoordinate, #newYCoordinate").change(function () {
        if($("#newXCoordinate").val() && $("#newYCoordinate").val()) { // validate null
            addPair($("#newXCoordinate").val(), $("#newYCoordinate").val()); // call to addPair

            $("#newXCoordinate").val(""); // clear the textbox
            $("#newYCoordinate").val(""); // clear the textbox
        }
    });

    // Show and hide the table decision table of models.
    $('#collapseDecisionTable').click( function () {
        $('#decisionTable').toggle("slow");
    });
});