function getTime() {
			var d = new Date();

			var s = leadingZeros(d.getFullYear(), 4) + '-'
					+ leadingZeros(d.getMonth() + 1, 2) + '-'
					+ leadingZeros(d.getDate(), 2) + ' ' +

					leadingZeros(d.getHours(), 2) + ':'
					+ leadingZeros(d.getMinutes(), 2);

			return s;
		}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var vid = getParameterByName('v');


//words chart
var chart;

function requestData_words() {
    $.ajax({
        url: '/live-words/' + vid,
        success: function(point) {
            var series = chart.series[0],
                shift = series.data.length > 20;

            for(var i = 0; i < 5; i++){
                chart.series[i].name = point[i][0];
                chart.series[i].legendItem = chart.series[i].legendItem.destroy();
                chart.series[i].legendGroup = chart.series[i].legendGroup.destroy();
                chart.series[i].setData([point[i][1]]);
            }


            chart.isDirtyLegend = true;
            chart.redraw(false);
            // call it again after one second
            setTimeout(requestData_words, 5000);
        },
        cache: false
    });
}

$(document).ready(function() {
    Highcharts.setOptions({
		colors: ["#D61C4E", "#FAC213", "#F77E21", "#FEF9A7"  , "#9A86A4"]
	});

    chart = new Highcharts.Chart({
        chart: {
            backgroundColor: '#DAD9FB',
            width: 600,
            height: 300,
            renderTo: 'words-container',
            defaultSeriesType: 'bar',
            events: {
                load: requestData_words
            }

        },
        credits: {
            enabled : false
        },
        legend:{
          align: 'right',
          x: -80,
          verticalAlign: 'top',
          y: 0,
          floating: true,
          backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
          borderColor: '#CCC',
          borderWidth: 1,
          shadow: false
        },
        title: {
            text: '',
            verticalAlign: 'vertical',
        },
        tooltip:{
            enabled:false
        },
        xAxis: {
            title : "??????",
            labels: {
                enabled: false
            },

        },
        yAxis: {
            title: "?????? ???",
        },
        series: [{
            name: 'Word 1',
            data: [
            ]
        },{
            name: 'Word 2',
            data: [
            ]
        },{
            name: 'Word 3',
            data: [
            ]
        },{
            name: 'Word 4',
            data: [
            ]
        },{
            name: 'Word 5',
            data: [
            ]
        }],
        exporting: {
            enabled: false
        },

    });

});

// segment chart
var chart_segment;

function requestData_segment() {
    $.ajax({
        url: '/live-segment/'  + vid,
        success: function(point) {
            var series = chart_segment.series[0],
                shift = series.data.length > 20;
            var dataSet = [{name: '?????? ??????', y: 0}, {name: '?????? ??????', y: 0}];
            dataSet[0].y = point[0];
            dataSet[1].y = point[1];
            chart_segment.series[0].setData(dataSet);

            chart_segment.redraw(false);
            $("tspan").remove('#segment_text');

            if(point[0] > 65){
                //???????????? ????????? ????????? ?????? ??? ???,??? ?????? ??????
                chart_segment.renderer.text('<div id = "segment_text"><p>??????</p></div>',null, null, chart_segment.resetZoom, {
                    }).attr({
                       align: 'center',
                       verticalAlign: 'middle'
                    }).add().css({fontSize: '25px', color: '#035397'}).align({
                       align: 'center',
                       verticalAlign: 'middle',
                       x: 5,
                       y: 5
                    }, false, null);
            }
            else if((point[0] <= 65) && (point[0] >= 30)){
                //???????????? ????????? ????????? ?????? ??? ???,??? ?????? ??????
                chart_segment.renderer.text('<div id = "segment_text"><p>??????</p></div>',null, null, chart_segment.resetZoom, {
                    }).attr({
                       align: 'center',
                       verticalAlign: 'middle'
                    }).add().css({fontSize: '25px', color: 'gray'}).align({
                       align: 'center',
                       verticalAlign: 'middle',
                       x: 5,
                       y: 5
                    }, false, null);
            }
            else{
                //???????????? ????????? ????????? ?????? ??? ???,??? ?????? ??????
                chart_segment.renderer.text('<div id = "segment_text"><p>??????</p></div>',null, null, chart_segment.resetZoom, {
                    }).attr({
                       align: 'center',
                       verticalAlign: 'middle'
                    }).add().css({fontSize: '25px', color: '#FF5959'}).align({
                       align: 'center',
                       verticalAlign: 'middle',
                       x: 5,
                       y: 5
                    }, false, null);
            }

            chart_segment.redraw();
            // call it again after one second
            setTimeout(requestData_segment, 5000);
        },
        cache: false
    });
}

$(document).ready(function() {
    chart_segment = new Highcharts.Chart({
  chart: {
      events: {
            load: requestData_segment


        },
      renderTo: 'segment-container',
      type: 'pie',
      spacingRight:0,//?????? ?????? ?????? ??????(default 10)
      style: {
      color: '#444',
      fontWeight: '400',
      width: 300,
      height: 300,

    },

  	backgroundColor:'rgba(255, 255, 255, 0)'
  },
  	credits: {enabled: false}, //highchart ???????????? ????????????
    title: {
    	text: '',
    },
    legend: {
      layout: 'vertical',//?????? ?????? ?????? ??? vertical??? ??????.(default horizontal)
      align:'center',
      verticalAlign: 'middle',
      x: -4,
      y: -2,
      itemMarginTop: 5,//?????? margin top ??????(bottom??? ??????.)
      symbolHeight: 10,
      symbolWidth: 10,
      symbolPadding: 5,
      symbolRadius: 0,
      itemStyle: {
        color: '#444',
        fontSize: '16px',
        fontWeight:'normal'
      }
     },
     plotOptions: {
       pie: {//??????(??????)?????? ?????? ?????? ??????.
       dataLabels: {
       enabled: false,
       distance: -20,
       },
       }
     },
     series: [{
       type: 'pie',
       name:'',
       innerSize: '60%',//?????? ?????? ????????? ?????? ?????? ????????? ??????.(?????? ?????? ?????? ?????? ??????)
       data:[
       	{
       	  name: "??????",
          y: 47,
          color: "#035397",
        },
        {
          name: "??????",
          y: 34,
          color: "#FF5959",
        }
        ],

	}],
	exporting: {
            enabled: false
    },
});
});