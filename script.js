$(document).ready( function () {
    var X = [2,4,6,8,10,12,15], Y = [0,10,18,32,45,52,65]; // the data of the graph.
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
        var a = 0;
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
    }

    function calculateB() {
        var b=0;
        var n=0;
        n=(X.length*Sumxy())-(Sumx()*Sumy()); 
        var m=0;
        m=(X.length*Sumx2())-(Sumx()*Sumx());
        
        b=parseInt(n)/parseInt(m);
        $('#bValue').text(b);
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

    $("#newXCoordinate, #newYCoordinate").change(function () {
        if($("#newXCoordinate").val() && $("#newYCoordinate").val()) { // validate null
            addPair($("#newXCoordinate").val(), $("#newYCoordinate").val()); // call to addPair

            $("#newXCoordinate").val(""); // clear the textbox
            $("#newYCoordinate").val(""); // clear the textbox
        }
    });
});