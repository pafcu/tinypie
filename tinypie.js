/* TinyPie, generates SVG piecharts in JavaScript */
/* Licensed under the ISCL, see LICENSE */

var TinyPie = function() {
	var svgNS = 'http://www.w3.org/2000/svg';
	function constructPath(arcl,color,start) {
		var start = start*360/(2*Math.PI); /* Convert to degrees */
		arcl=-arcl; // Sign oddness due to SVG coordinate system
		if(start==0 && Math.cos(arcl)==1) // Only slice
			var d = "M 0,0 L 1,0 A 1,1 0 1,1 "+Math.cos(arcl)+","+(-1)*Math.sin(arcl)+" Z";
		else
			var d = "M 0,0 L 1,0 A 1,1 0 "+(arcl<-Math.PI)*1+",1 "+Math.cos(arcl)+","+(-1)*Math.sin(arcl)+" Z";

		var g = document.createElementNS(svgNS,'g');
		g.setAttribute('transform','rotate('+(start-90)+')');

		var path = document.createElementNS(svgNS,'path');
		path.setAttribute('stroke-width','0.01');
		path.setAttribute('stroke','black');
		path.setAttribute('fill',color);
		path.setAttribute('d',d);

		g.appendChild(path);
		return g;
	}
	/* Public functions */
	return {
		piechart : function(slices) {
			var pie = document.createElementNS(svgNS,'svg');
			pie.setAttribute('viewBox','-1.01 -1.01 2.02 2.02'); /* A bit bigger than unit circle to fit strokes */

			var circle = document.createElementNS(svgNS,'circle');
			circle.setAttribute('cx','0');
			circle.setAttribute('cy','0');
			circle.setAttribute('r','1');

			pie.appendChild(circle);

			var s=0;
			for(i in slices)
				s += slices[i][0];

			var sum=0;
			for(i in slices) {
				var scaled = slices[i][0]*2*Math.PI/s
				if(scaled>0) {
					pie.appendChild(constructPath(scaled,slices[i][1],sum));
					sum += scaled;
				}
			}
			return pie;
		}
	}
}();
