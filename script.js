$(document).ready( function () {
    var X = [2,4,6,8,10,12,15], Y = [0,10,18,32,45,52,65]; // the data of the graph.
    var a;
    var b;
    calculateA();
    calculateB();
    calculateR();
    /*var sinPoints = []; 
    for (var i=0; i<2*Math.PI; i+=0.1){ 
	sinPoints.push([i, 2*Math.sin(i-.8)]); 
    }*/

    var points = [[1,2],[2,3],[9,1]];
    var points2 = [[2, 4], [1, 3]];

    var plot = $.jqplot ("chartHolder", [points], {
        title: 'graph',
        series: [{showMarker: false}]
    });

    function addPair(x, y) {
        plot.destroy();
        plot = $.jqplot ("chartHolder", [points2], {
            title: ':O',
            series: [{showMarker: false}]
        });

        $("#dataTable").prepend("<tr><td>"+x+"</td><td>"+y+"</td></tr>");

        X.push(x);
        Y.push(y);
        calculateA();
        calculateB();
        calculateR();

        var data = [[]];
        data[0].push([x, y]);
        return data;
    }

    function Sumx(){
        var sumx=0;
        
        for(var i=0; i< X.length; i++)
        {
        sumx+=parseInt(X[i]);
        }
        return parseInt(sumx);
    }
    function Sumy(){
        var sumy=0;
        
        for(var i=0; i< Y.length; i++)
        {
        sumy+=parseInt(Y[i]);
        }
        return parseInt(sumy);
    }
    function Sumx2() {
        var sumx2=0;
        var x2=0;
        for(var i=0;i< X.length; i++)
        {
            sumx2 += (parseInt(X[i])*parseInt(X[i]));
            //x2=(parseInt(X[i])*parseInt(X[i]));
            //sumx2+=parseInt(x2);
            //alert("sumx2 = " + sumx2);
        }

        //alert("sumx2 = " + sumx2);

        return parseInt(sumx2);
    }
    function Sumy2() {
        var sumy2=0;
        var y2=0;
        for(var i=0;i< Y.length; i++)
        {
            y2=(parseInt(Y[i])*parseInt(Y[i]));
            sumy2+=y2;
        }
        return parseInt(sumy2);
    }
    function Sumxy() {
        var sumxy=0;
        var xy=0;
        for(var i=0;i< X.length; i++)
        {
            xy=(parseInt(X[i])*parseInt(Y[i]));
            sumxy+=xy;
        }
        return parseInt(sumxy);
    }

    function calculateA() {
        a = 0;
        /**for(var i = 0; i< X.length; i++) {
            a += parseInt(X[i]);
        }
        */

        var n=0;
        n=(Sumx2()*Sumy())-(Sumx()*Sumxy());
        var  m=0;
        m=(X.length*Sumx2())-((Sumx())*(Sumx()));
        //a=Sumx();
        //alert(n);
        //alert(m);
        a=parseInt(n)/parseInt(m);
        //a=Sumx2();

        $('#aValue').text(a);
        $('#aValueRounded').text(Math.round(a * 100) / 100);
    }

    function calculateB() {
        b=0;
        var n=0;
        n=(X.length*Sumxy())-(Sumx()*Sumy()); 
        var m=0;
        m=(X.length*Sumx2())-(Sumx()*Sumx());
        
        b=parseInt(n)/parseInt(m);
        $('#bValue').text(b);
        $('#bValueRounded').text(Math.round(b * 100) / 100);
    }

    function calculateR() {
        var r=0;
        var n=0;
        n = (X.length*Sumxy()) - (Sumx()*Sumy());
        var m=0;
        var raiz=1;
        raiz = (X.length*Sumx2()-(Sumx()*Sumx()))*(X.length*Sumy2()-(Sumy()*Sumy())); 
        m = Math.sqrt(raiz);
        r=parseInt(n)/parseInt(m);

        $('#rValue').text(r);



    }

    //calculate Sy/x, Sa, Sb
    function Syx()
    {
        var syx=0;
        var sumab=0;
        for( var i=0; i< X.length; i++)
        {
            sumab+=((a+b*X[i])-Y[i])*((a+b*X[i])-Y[i]);
        }
        Syx = Math.sqrt(sumab/X.length()-2);
        return syx; 
    }
    function Sb()
    {
        var sb=0;
        var m= Sumx2() - ((Sumx()*Sumx())/X.length);
        sb = syx()/Math.sqrt(m);
        return sb; 
    }

    function Sa()
    {
        var sa=0;
        var m=0;
        m = X.length*Sumx2() - (Sumx()*Sumx()); 
        sa= syx()*Math.sqrt(Sumx2()/m);
        return sa;
    }
    // /**

    function factorT()
    {
        matriz = new Array (); 
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
});