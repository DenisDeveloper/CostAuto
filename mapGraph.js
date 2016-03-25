import d3 from 'd3';
import $ from 'jquery';
import 'gisapi';

let bezier = (t, p0, p1, p2, p3)=>{
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

let calcPoints = (p0, p1, p2, p3)=>{
      var res = [];
      for (var i = 0; i < 1; i += 0.1) {
        var p = bezier(i, p0, p1, p2, p3);
        res.push([p.x, p.y]);
      }
      return res;
    }

let loadData = ()=>{
  d3.json("ds.json", function(json) {});
}

export default class MapGraph {
  constructor(jsonFileName) {
    this.json = jsonFileName;
  }

  show(){
    DG.then(() => {
      console.log('gis init');
      let map = DG.map('map', {
        center: [53.705298, 91.374502],
        zoom: 5
      });
    });
  }
}
