/* global queue */
/* global d3 */
/* global dc */
/* global crossfilter */
/* global $ */

queue()
 .defer(d3.json, "data/spreadOfFire.json")
 .await(function(error, fireData) {

  let fireCrossFilter = crossfilter(fireData);

  let year_dim = fireCrossFilter.dimension(dc.pluck('year'));
  
  let area_dim = fireCrossFilter.dimension(dc.pluck('province'));
  
  let fire_by_province = area_dim.group().reduceSum(dc.pluck('hectares'))
  
  let fire_by_year = year_dim.group().reduceSum(dc.pluck('hectares'))
  
  let kalimantan = year_dim.group().reduceSum(function(d) {
   if (d.province == 'kalimantan') {
    return +d.hectares;
   }
   else {
    return 0;
   }
  })
  let sumatera = year_dim.group().reduceSum(function(d) {
   if (d.province == 'sumatera') {
    return +d.hectares;
   }
   else {
    return 0;
   }
  })
   let sulawesi = year_dim.group().reduceSum(function(d) {
   if (d.province == 'sulawesi') {
    return +d.hectares;
   }
   else {
    return 0;
   }
  })


  let stackedChart = dc.barChart("#stacked-chart");
  stackedChart
   .width(500)
   .height(550)
   .margins({top:30, right:50, bottom:50, left:100})
   .dimension(year_dim)
   .group(sulawesi, "Sulawesi")
   .stack(sumatera, "Sumatera")
   .stack(kalimantan, "Kalimantan")
   .x(d3.scale.ordinal())
   .xUnits(dc.units.ordinal)
   .xAxisLabel("Years")
   .yAxisLabel("Hectares")
   .legend(dc.legend().x(400).y(50).itemHeight(15).gap(5));
  
  dc.barChart("#bar-chart")
   .width(500)
   .height(550)
   .margins({top:30, right:50, bottom:50, left:100})
   .dimension(area_dim)
   .group(fire_by_province)
   .transitionDuration(250)
   .x(d3.scale.ordinal())
   .xUnits(dc.units.ordinal)
   .xAxisLabel("Province")
   .yAxisLabel("Hectares")
   .yAxis().ticks(10);
   
   
    
   // dc.barChart("#line-graph")
   // .width(600)
   // .height(150)
   // .margins({top:10, right:50, bottom:30, left:150})
   // .dimension(year_dim)
   // .group(fire_by_year)
   // .transitionDuration(250)
   // .x(d3.scale.ordinal())
   // .xUnits(dc.units.ordinal)
   // .xAxisLabel("Year")
   // .yAxisLabel("Hectares")
   // .yAxis().ticks(5);

        dc.renderAll();
    })
    

  $("#save-forest").click(function () {
    $(".picture").remove();
    let toShuffle = $(".picture");
    while (toShuffle.length) {
      $("#image").append(toShuffle.splice(Math.floor(Math.random() * toShuffle.length), 1)[0]);
    }
  })