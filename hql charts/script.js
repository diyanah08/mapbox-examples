/* global queue */
/* global d3 */
/* global dc */
/* global crossfilter */

queue()
 .defer(d3.json, "data/hql.json")
 .await(function(error, hqlData) {

  let hqlCrossFilter = crossfilter(hqlData);

  let year_dim = hqlCrossFilter.dimension(dc.pluck('year'));
  
  let total_amount_year = year_dim.group().reduceSum(dc.pluck('amount'))

  let below_sec = year_dim.group().reduceSum(function(d) {
   if (d.hql == 'below-secondary') {
    return +d.amount;
   }
   else {
    return 0;
   }
  })
  let secondary = year_dim.group().reduceSum(function(d) {
   if (d.hql == 'secondary') {
    return +d.amount;
   }
   else {
    return 0;
   }
  })
  let dip = year_dim.group().reduceSum(function(d) {
   if (d.hql == 'diploma') {
    return +d.amount;
   }
   else {
    return 0;
   }
  })
  let uni = year_dim.group().reduceSum(function(d) {
   if (d.hql == 'university') {
    return +d.amount;
   }
   else {
    return 0;
   }
  })


  let stackedChart = dc.barChart("#stacked-chart");
  stackedChart
   .width(500)
   .height(500)
   .dimension(year_dim)
   .group(below_sec, "Below Secondary")
   .stack(secondary, "Secondary")
   .stack(dip, "Diploma")
   .stack(uni, "University")
   .x(d3.scale.ordinal())
   .xUnits(dc.units.ordinal)
   .legend(dc.legend().x(420).y(0).itemHeight(15).gap(5));
  stackedChart.margins().left = 50;
  stackedChart.margins().right = 100;

  let gender_dim = hqlCrossFilter.dimension(dc.pluck('gender'));
  
  let total_amount_gender = gender_dim.group().reduceSum(dc.pluck('amount'))

  let total_number_below_sec = gender_dim.group().reduceSum(function(d) {
   if (d.hql == 'below-secondary') {
    return +d.amount;
   }
   else {
    return 0;
   }
  });
  let total_number_secondary = gender_dim.group().reduceSum(function(d) {
   if (d.hql == 'secondary') {
    return +d.amount;
   }
   else {
    return 0;
   }
  });
  let total_number_dip = gender_dim.group().reduceSum(function(d) {
   if (d.hql == 'diploma') {
    return +d.amount;
   }
   else {
    return 0;
   }
  });
  let total_number_uni = gender_dim.group().reduceSum(function(d) {
   if (d.hql == 'university') {
    return +d.amount;
   }
   else {
    return 0;
   }
  });

  let stackedChart2 = dc.barChart("#stacked-chart-2");
  stackedChart2
   .width(500)
   .height(500)
   .dimension(gender_dim)
   .group(total_number_below_sec, "Below Secondary")
   .stack(total_number_secondary, "Secondary")
   .stack(total_number_dip, "Diploma")
   .stack(total_number_uni, "University")
   .x(d3.scale.ordinal())
   .xUnits(dc.units.ordinal)
   .legend(dc.legend().x(420).y(0).itemHeight(15).gap(5));
  stackedChart.margins().left = 50;
  stackedChart.margins().right = 100;

  var parseYear = d3.time.format("%Y").parse;
  hqlData.forEach(function(d) {
   d.year = parseYear(d.year);
  });

  var minYear = year_dim.bottom(1)[0].year;
  var maxYear = year_dim.top(1)[0].year;

  function amount_by_hql(hql) {
   return function(d) {
    if (d.hql === hql) {
     return +d.amount;
    }
    else {
     return 0;
    }
   }
  }
  let amountBelowSecondary = year_dim.group().reduceSum(function (a) {
    if (a.hql === "below-secondary") {
     return a.amount;
    } else {
     return 0;
    }
  });
  console.log(amountBelowSecondary)
  let amountSecondary = year_dim.group().reduceSum(function (d) {
    if (d.hql === "secondary") {
     return +d.amount;
    } else {
     return 0;
    }
  });
  let amountDiploma = year_dim.group().reduceSum(function (d) {
    if (d.hql === "diploma") {
     return +d.amount;
    } else {
     return 0;
    }
  });
  let amountUniversity = year_dim.group().reduceSum(function (d) {
    if (d.hql === "university") {
     return +d.amount;
    } else {
     return 0;
    }
  });
  // let amountSecondary = year_dim.group().reduceSum(amount_by_hql("secondary"));
  // let amountDiploma = year_dim.group().reduceSum(amount_by_hql("diploma"));
  // let amountUniversity = year_dim.group().reduceSum(amount_by_hql("university"));
  
  let hql_dim = hqlCrossFilter.dimension(dc.pluck('hql'));
  let total_amount = hql_dim.group().reduceSum(dc.pluck('amount'));

  let compositeChart = dc.compositeChart('#line-graph');
  compositeChart
   .width(990)
   .height(200)
   .dimension(year_dim)
   // .group(total_amount)
   .x(d3.time.scale().domain([minYear, maxYear]))
   .yAxisLabel("Amount")
   .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
   .renderHorizontalGridLines(true)
   .compose([
      dc.lineChart(compositeChart)
      .colors('green')
      .group(amountBelowSecondary, 'Below Secondary'),
      dc.lineChart(compositeChart)
      .colors('red')
      .group(amountSecondary, 'Secondary'),
      dc.lineChart(compositeChart)
      .colors('blue')
      .group(amountDiploma, 'Diploma'),
      dc.lineChart(compositeChart)
      .colors('yellow')
      .group(amountUniversity, 'University')
   ])
   .brushOn(false)
  
          // dc.lineChart("#line-graph")
          //   .width(1000)
          //   .height(300)
          //   .margins({top: 10, right: 50, bottom: 30, left: 50})
          //   .dimension(hql_dim)
          //   .group(total_amount)
          //   .transitionDuration(500)
          //   .x(d3.scale.ordinal())
          //   .xUnits(dc.units.ordinal)
          //   .xAxisLabel("Year")
          //   .yAxis().ticks(4);

  dc.barChart("#bar-chart")
   .width(300)
   .height(150)
   .dimension(hql_dim)
   .group(total_amount)
   .transitionDuration(250)
   .x(d3.scale.ordinal())
   .xUnits(dc.units.ordinal)
   .xAxisLabel("Person")
   .yAxis().ticks(5);


  dc.renderAll();
 })
