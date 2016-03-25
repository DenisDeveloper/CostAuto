<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" />
  <title>Отображение ломаной</title>
  <link rel="stylesheet" href="master.css" media="screen" title="no title" charset="utf-8">
  <script src="http://maps.api.2gis.ru/2.0/loader.js"></script>
  <script src="//d3js.org/d3.v3.min.js"></script>
</head>

<body>
  <div id="map" style="width: 100%; height: 100%;"></div>

  <script src="TrackResultEW.js" charset="utf-8"></script>
  <script src="data.js" charset="utf-8"></script>
  <script>
    window.bezier = function(t, p0, p1, p2, p3) {
      var cX = 3 * (p1.x - p0.x),
        bX = 3 * (p2.x - p1.x) - cX,
        aX = p3.x - p0.x - cX - bX;

      var cY = 3 * (p1.y - p0.y),
        bY = 3 * (p2.y - p1.y) - cY,
        aY = p3.y - p0.y - cY - bY;

      var x = (aX * Math.pow(t, 3)) + (bX * Math.pow(t, 2)) + (cX * t) + p0.x;
      var y = (aY * Math.pow(t, 3)) + (bY * Math.pow(t, 2)) + (cY * t) + p0.y;

      return {
        x: x,
        y: y
      };
    }

    window.fooo = function(p0, p1, p2, p3) {
      var res = [];
      for (var i = 0; i < 1; i += 0.1) {
        var p = bezier(i, p0, p1, p2, p3);
        res.push([p.x, p.y]);
      }
      return res;
    }

    DG.then(function() {
      var map = DG.map('map', {
        center: [53.705298, 91.374502],
        zoom: 5
      });

      var coords = dataRes.map(function(v) {
        return {
          coords: Array(
            [v.source.lat, v.source.lng], [v.path[0], v.path[1]], [v.path[2], v.path[3]], [v.target.lat, v.target.lng]
          ),
          w: v.source.selfPrice,
          color: 'rgb(' + v.color[0] + ',' + v.color[1] + ',' + v.color[2] + ')'
        }
      });



      for (var i = 0; i < coords.length; i++) {
        var gg = coords[i].coords;
        var res = fooo({
          x: gg[0][0],
          y: gg[0][1]
        }, {
          x: gg[1][0],
          y: gg[1][1]
        }, {
          x: gg[2][0],
          y: gg[2][1]
        }, {
          x: gg[3][0],
          y: gg[3][1]
        });

        var polyline = DG.polyline(res, {
          className: 'we',
          color: coords[i].color
        }).addTo(map);

        map.fitBounds(polyline.getBounds());
      }

      d3.selectAll('.we').attr('marker-mid', 'url(#we)');
      d3.selectAll('svg').append("svg:defs").selectAll("marker")
        .data(["we", "ew"])
        .enter().append("svg:marker")
        .attr("id", String)
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 0)
        .attr("refY", 0)
        // .attr('markerUnits', 'userSpaceOnUse')
        .attr("markerWidth", 4)
        .attr("markerHeight", 4)
        .attr("orient", "auto")
        .append("svg:path")
        .style('fill', 'rgb(124, 123, 123)')
        .attr("d", "M0,-5L10,0L0,5");
      // debugger;
    });
  </script>
</body>

</html>
