function ActivityModel(data) {
  this.target = null;
  this.molecule = null;
}

ActivityModel.prototype.toInternal = function(data) {
  this.target = data.target_chembl_id;
  this.molecule = data.molecule_chembl_id;
  this.value = parseFloat(data.pchembl_value);
  return this;
};

new Vue({
  el: '#app',
  created: function() {
    var margin = { top: 50, right: 50, bottom: 50, left: 100 },
      width = 1200 - margin.left - margin.right,
      height = 800 - margin.top - margin.bottom;

    var svg = d3
      .select('#pchembl')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    d3.json('/activities', function(data) {
      if (!data.length) {
        return;
      }
      data = data.map(function(activity) {
        return new ActivityModel().toInternal(activity);
      });
      var targets = data.map(function(activity) {
        return activity.target;
      });

      var molecules = data.map(function(activity) {
        return activity.molecule;
      });

      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(targets)
        .padding(0.01);
      svg
        .append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x));

      var y = d3
        .scaleBand()
        .range([height, 0])
        .domain(molecules)
        .padding(0.01);
      svg.append('g').call(d3.axisLeft(y));

      var tip = d3
        .tip()
        .attr('class', 'd3-tip')
        .style('visibility', 'visible')
        .offset([-20, 0])
        .html(function(d) {
          return "pChEMBL value: <span style='color:red'>" + d.value;
        });

      tip(svg.append('g'));

      var myColor = d3
        .scaleLinear()
        .range(['white', '#69b3a2'])
        .domain([1, 10]);

      svg
        .selectAll()
        .data(data, function(d) {
          return d.target + ':' + d.molecule;
        })
        .enter()
        .append('rect')
        .attr('x', function(d) {
          return x(d.target);
        })
        .attr('y', function(d) {
          return y(d.molecule);
        })
        .attr('width', x.bandwidth())
        .attr('height', y.bandwidth())
        .style('fill', function(d) {
          return myColor(d.value);
        })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);
    });
  }
});
