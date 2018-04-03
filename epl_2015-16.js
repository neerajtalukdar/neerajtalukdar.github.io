var topMargin=20, leftMargin=150, rightMargin= -400, bottomMargin=20;  
var xRadius=5, yRadius=5; //corner radiu of rectangular bars
    
var toggleTime=1000;    //time for transition between the diffeent states

var div = d3.select("body").append("div")   
  							.attr("class", "tooltip")               
  							.style("opacity", 0);    //tooltip to display details of each match on hover

var svgWidth=1000, svgHeight=200;    
var svg = d3.select(".first").append("svg").attr("width", svgWidth)
        .attr("height", svgHeight),
    margin = {top: topMargin, right: rightMargin, bottom: bottomMargin, left: leftMargin},
    width = 1000,
    height = 100;   //dimensions of svg
    
var x = d3.scaleBand().rangeRound([0, width]).padding(1),
    y = d3.scaleLinear().rangeRound([height, 0]);          //computes the scale according to the range in dataset


//////////////////////////////////////////////////////////////////////////////

/*
The following few hundred lines of code are essentially modular in the sense that there are 20 teams and hence there are 20 similar modules of code, with the  parameters meaning the same thing in each instance but the data set is different and so are the clas names. 

d.scored = Score of the home team
d.conceded = score of the away team
d.week = the week in which the game took place, there are 38 weeks of matches and hence there are 38 data points, it helps arrange the games according to a timeline

Class names have been given according to the following criteria:
Was the game a home or away game for the team concerned?
ASSIGN CLASS NAME: "name of the team concerned" or "awayteam"

What was the result for the team iindividually: Win, Loss or Draw?
ASSIGN CLASS NAME: "won" "lost" "draw" resp.

What was the result for the the team concerned: Win, Loss or Draw?
ASSIGN CLASS NAME: "team name" + won/draw/lost

Opacity of the rectangular bars have been defined according to these classes using CSS

.won=opacity:1.0;    
    
.lost=opacity: 0.25;
    
.draw=opacity: 0.55;

*/
    
//////////////////////////////////////Arsenal//////////////////////////////////    

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data/arsenal.tsv", function(d) {
  d.scored = +d.scored;
  return d;
}, function(error, data) {
  if (error) throw error;

  x.domain(data.map(function(d) { return d.week; }));
  y.domain([0, d3.max(data, function(d) { return d.scored; })]);

//  g.append("g")
//      .attr("class", "axis axis--x")
//      .attr("transform", "translate(0," + height + ")")
//      .call(d3.axisBottom(x));


  g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
  
  .attr("class", function(d) { 
        
        if(d.home=="Arsenal" && d.scored>(Math.abs(d.conceded)))
        return "bar arsenal won arswon"; 
        
        else if(d.home=="Arsenal" && d.scored<(Math.abs(d.conceded)))
        return "bar arsenal lost arslost";
      
        else if(d.home=="Arsenal" && (Math.abs(d.conceded))==d.scored)
        return "bar arsenal draw arsdraw";
      
      
        else if(Math.abs(d.conceded)<d.scored)
        return "bar awayteam won arslost";
        
        else if(Math.abs(d.conceded)==d.scored)
        return "bar awayteam draw arsdraw";
         
        else return "bar awayteam lost arswon"; 
    
    
    })
      .attr("x", function(d) { return x(d.week); })
      .attr("y", function(d) { return y(d.scored); })
        .attr("rx", xRadius)
        .attr("ry", yRadius)
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.scored); })
      .on('mouseover', function(d){

                               var info= div.style("opacity", 1)
							    .style("left", (d3.event.pageX+10) + "px")
							    .style("top", (d3.event.pageY-30) + "px")
                                .transition()
                                .duration(200)
                                .style("display", null)
							    .text(d.date + ":  " + d.home + " " + d.scored + "-" + Math.abs(d.conceded)+ " " + d.away);	
                               

    })
    .on("mouseout", function(d) {
							   
            div.transition()
               .duration(500)
               .style("display", "none");
							
        				});
    
    
    g.selectAll(".bar2")
    .data(data)
    .enter().append("rect")
      .attr("class", function(d) { 
        
        if(d.away=="Arsenal" && (Math.abs(d.conceded))>d.scored)
        return "bar arsenal won arswon"; 
        
        else if(d.away=="Arsenal" && (Math.abs(d.conceded))<d.scored)
        return "bar arsenal lost arslost";
        
        else if(d.away=="Arsenal" && (Math.abs(d.conceded))==d.scored)
        return "bar arsenal draw arsdraw";
        
        else if((Math.abs(d.conceded))<d.scored)
        return "bar awayteam lost arswon";
        
        else if((Math.abs(d.conceded))==d.scored)
        return "bar awayteam draw arsdraw";
       
        else return "bar awayteam won arslost"; 
    
    
    })
        
      .attr("x", function(d) { return x(d.week); })
      .attr("y", function(d) { return y(Math.max(0, d.conceded)); }) 
      .attr("rx", xRadius)
      .attr("ry", yRadius)     
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return Math.abs(y(d.conceded)- y(0)); })
      .on('mouseover', function(d){

                        div.style("opacity", 1)
							    .style("left", (d3.event.pageX+10) + "px")
							    .style("top", (d3.event.pageY-30) + "px")
                                .transition()
                                .duration(200)
                                .style("display", null)
							    .text(d.date + ":  " + d.home + " " + d.scored + "-" + Math.abs(d.conceded)+ " " + d.away);	
                       
                      
                              

    })
    .on("mouseout", function(d) {
 							   
            div.transition()
               .duration(500)
               .style("display", "none");
							
        				});
});
    
    
    
//////////////////////////////////////Aston Villa//////////////////////////////////
    

var svg2 = d3.select(".second").append("svg").attr("width", svgWidth)
        .attr("height", svgHeight),
    margin = {top: topMargin, right: rightMargin, bottom: bottomMargin, left: leftMargin},
    width = 400 - margin.left - margin.right,
    //height = +svg.attr("height") - margin.top - margin.bottom;
   // width = 200,
    height = 40;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.5),
    y = d3.scaleLinear().rangeRound([height, 0])
    

var g2 = svg2.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data/astonvilla.tsv", function(d) {
  d.scored = +d.scored;
  return d;
}, function(error, data) {
  if (error) throw error;

  x.domain(data.map(function(d) { return d.week; }));
  y.domain([0, d3.max(data, function(d) { return d.scored; })]);

//  g2.append("g")
//      .attr("class", "axis axis--x")
//      .attr("transform", "translate(0," + height + ")")
//      .call(d3.axisBottom(x));
// 

  g2.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", function(d) { 
        
        if(d.home=="Aston Villa" && d.scored>(Math.abs(d.conceded)))
        return "bar astonvilla won asvwon"; 
        
        else if(d.home=="Aston Villa" && d.scored<(Math.abs(d.conceded)))
        return "bar astonvilla lost asvlost";
      
        else if(d.home=="Aston Villa" && (Math.abs(d.conceded))==d.scored)
        return "bar astonvilla draw asvdraw";
      
      
        else if(Math.abs(d.conceded)<d.scored)
        return "bar awayteam won asvlost";
        
        else if(Math.abs(d.conceded)==d.scored)
        return "bar awayteam draw asvdraw";
         
        else return "bar awayteam lost asvwon"; 
    
    
    })
      .attr("x", function(d) { return x(d.week); })
      .attr("y", function(d) { return y(d.scored); })
        .attr("rx", xRadius)
        .attr("ry", yRadius)      
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.scored); })
      .on('mouseover', function(d){

							    
                                div.style("opacity", 1)
							    .style("left", (d3.event.pageX+10) + "px")
							    .style("top", (d3.event.pageY-30) + "px")
                                .transition()
                                .duration(200)
                                .style("display", null)
							    .text(d.date+":  "+d.home + " " + d.scored + "-" + Math.abs(d.conceded)+ " " + d.away);	
                               

    })
    .on("mouseout", function(d) {
    
            div.transition()
               .duration(500)
               .style("display", "none");
							
        				});
    
    
    
    g2.selectAll(".bar2")
    .data(data)
    .enter().append("rect")
      .attr("class", function(d) { 
        
        if(d.away=="Aston Villa" && (Math.abs(d.conceded))>d.scored)
        
        return "bar astonvilla won asvwon"; 
        
        else if(d.away=="Aston Villa" && (Math.abs(d.conceded))<d.scored)
        return "bar astonvilla lost asvlost";
        
        else if(d.away=="Aston Villa" && (Math.abs(d.conceded))==d.scored)
        return "bar astonvilla draw asvdraw";
       
        else if((Math.abs(d.conceded))<d.scored)
        return "bar awayteam lost asvwon";
        
        else if((Math.abs(d.conceded))==d.scored)
        return "bar awayteam draw asvdraw";
       
        else return "bar awayteam won asvlost"; 
    
    
    })
      .attr("x", function(d) { return x(d.week); })
      .attr("y", function(d) { return y(Math.max(0, d.conceded)); }) 
         .attr("rx", xRadius)
        .attr("ry", yRadius)     
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return Math.abs(y(d.conceded)- y(0)); })
      .on('mouseover', function(d){

                                div.style("opacity", 1)
							    .style("left", (d3.event.pageX+10) + "px")
							    .style("top", (d3.event.pageY-30) + "px")
                                .transition()
                                .duration(200)
                                .style("display", null)
							    .text(d.date+":  "+d.home + " " + d.scored + "-" + Math.abs(d.conceded)+ " " + d.away);	
                                

    })
    .on("mouseout", function(d) {
      					   
            div.transition()
               .duration(500)
               .style("display", "none");
							
        				}); 
});    
    
    
//////////////////////////Bournemouth////////////////////////////////
    
    var svg3 = d3.select(".third").append("svg").attr("width", svgWidth)
        .attr("height", svgHeight),
    margin = {top: topMargin, right: rightMargin, bottom: bottomMargin, left: leftMargin},
    width = 400 - margin.left - margin.right,
    //height = +svg.attr("height") - margin.top - margin.bottom;
   // width = 200,
    height = 40;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.5),
    y = d3.scaleLinear().rangeRound([height, 0])
    

var g3 = svg3.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data/bournemouth.tsv", function(d) {
  d.scored = +d.scored;
  return d;
}, function(error, data) {
  if (error) throw error;

  x.domain(data.map(function(d) { return d.week; }));
  y.domain([0, d3.max(data, function(d) { return d.scored; })]);
//
//  g3.append("g")
//      .attr("class", "axis axis--x")
//      .attr("transform", "translate(0," + height + ")")
//      .call(d3.axisBottom(x));
 

  g3.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", function(d) { 
        
        if(d.home=="Bournemouth" && d.scored>(Math.abs(d.conceded)))
        return "bar bournemouth won bouwon"; 
        
        else if(d.home=="Bournemouth" && d.scored<(Math.abs(d.conceded)))
        return "bar bournemouth lost boulost";
      
        else if(d.home=="Bournemouth" && (Math.abs(d.conceded))==d.scored)
        return "bar bournemouth draw boudraw";
      
      
        else if(Math.abs(d.conceded)<d.scored)
        return "bar awayteam won boulost";
        
        else if(Math.abs(d.conceded)==d.scored)
        return "bar awayteam draw boudraw";
         
        else return "bar awayteam lost bouwon"; 
    
    
    })
      .attr("x", function(d) { return x(d.week); })
      .attr("y", function(d) { return y(d.scored); })
      .attr("rx", xRadius)
      .attr("ry", yRadius)    
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.scored); })
      .on('mouseover', function(d){
//							d3.select(this)
//							    .style("opacity", 0.2);
							    
                                div.style("opacity", 1)
							    .style("left", (d3.event.pageX+10) + "px")
							    .style("top", (d3.event.pageY-30) + "px")
                                .transition()
                                .duration(200)
                                .style("display", null)
							    .text(d.date+":  "+d.home + " " + d.scored + "-" + Math.abs(d.conceded)+ " " + d.away);	
                             

    })
    .on("mouseout", function(d) {
						   
            div.transition()
               .duration(500)
               .style("display", "none");
							
        				});
    
    
    
    g3.selectAll(".bar2")
    .data(data)
    .enter().append("rect")
      .attr("class", function(d) { 
        
        if(d.away=="Bournemouth" && (Math.abs(d.conceded))>d.scored)
        return "bar bournemouth bouwon"; 
        
        else if(d.away=="Bournemouth" && (Math.abs(d.conceded))<d.scored)
        return "bar bournemouth lost boulost";
        
        else if(d.away=="Bournemouth" && (Math.abs(d.conceded))==d.scored)
        return "bar bournemouth draw boudraw";
       
        else if((Math.abs(d.conceded))<d.scored)
        return "bar awayteam lost bouwon";
        
        else if((Math.abs(d.conceded))==d.scored)
        return "bar awayteam draw boudraw";
       
        else return "bar awayteam won boulost"; 
    
    
    })
      .attr("x", function(d) { return x(d.week); })
      .attr("y", function(d) { return y(Math.max(0, d.conceded)); }) 
        .attr("rx", xRadius)
        .attr("ry", yRadius)   
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return Math.abs(y(d.conceded)- y(0)); })
    .on('mouseover', function(d){
						    
                                div.style("opacity", 1)
							    .style("left", (d3.event.pageX+10) + "px")
							    .style("top", (d3.event.pageY-30) + "px")
                                .transition()
                                .duration(200)
                                .style("display", null)
							    .text(d.date+":  "+d.home + " " + d.scored + "-" + Math.abs(d.conceded)+ " " + d.away);	
                               
    })
    .on("mouseout", function(d) {
      
        div.transition()
               .duration(500)
               .style("display", "none");
							
        				}); 
});    
    

    
//////////////////////////Chelsea////////////////////////////////

    var svg4 = d3.select(".fourth").append("svg").attr("width", svgWidth)
        .attr("height", svgHeight),
    margin = {top: topMargin, right: rightMargin, bottom: bottomMargin, left: leftMargin},
    width = 400 - margin.left - margin.right,
    height = 40;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.5),
    y = d3.scaleLinear().rangeRound([height, 0])
    

var g4 = svg4.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data/chelsea.tsv", function(d) {
  d.scored = +d.scored;
  return d;
}, function(error, data) {
  if (error) throw error;

  x.domain(data.map(function(d) { return d.week; }));
  y.domain([0, d3.max(data, function(d) { return d.scored; })]);

//  g2.append("g")
//      .attr("class", "axis axis--x")
//      .attr("transform", "translate(0," + height + ")")
//      .call(d3.axisBottom(x));
// 

  g4.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", function(d) { 
        
        if(d.home=="Chelsea" && d.scored>(Math.abs(d.conceded)))
        return "bar chelsea won chewon"; 
        
        else if(d.home=="Chelsea" && d.scored<(Math.abs(d.conceded)))
        return "bar chelsea lost chelost";
      
        else if(d.home=="Chelsea" && (Math.abs(d.conceded))==d.scored)
        return "bar chelsea draw chedraw";
      
      
        else if(Math.abs(d.conceded)<d.scored)
        return "bar awayteam won chelost";
        
        else if(Math.abs(d.conceded)==d.scored)
        return "bar awayteam draw chedraw";
         
        else return "bar awayteam lost chewon"; 
    
    
    })
      .attr("x", function(d) { return x(d.week); })
      .attr("y", function(d) { return y(d.scored); })
        .attr("rx", xRadius)
        .attr("ry", yRadius)   
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.scored); })
  .on('mouseover', function(d){
//							d3.select(this)
//							    .style("opacity", 0.2);
							    
                                div.style("opacity", 1)
							    .style("left", (d3.event.pageX+10) + "px")
							    .style("top", (d3.event.pageY-30) + "px")
                                .transition()
                                .duration(200)
                                .style("display", null)
							    .text(d.date+":  "+d.home + " " + d.scored + "-" + Math.abs(d.conceded)+ " " + d.away);	
                                

    })
    .on("mouseout", function(d) {
      						   
            div.transition()
               .duration(500)
               .style("display", "none");
							
        				});
    
    g4.selectAll(".bar2")
    .data(data)
    .enter().append("rect")
      .attr("class", function(d) { 
        
        if(d.away=="Chelsea" && (Math.abs(d.conceded))>d.scored)
        
        return "bar chelsea chewon"; 
        
        else if(d.away=="Chelsea" && (Math.abs(d.conceded))<d.scored)
        return "bar chelsea lost chelost";
        
        else if(d.away=="Chelsea" && (Math.abs(d.conceded))==d.scored)
        return "bar chelsea draw chedraw";
       
        else if((Math.abs(d.conceded))<d.scored)
        return "bar awayteam lost chewon";
        
        else if((Math.abs(d.conceded))==d.scored)
        return "bar awayteam draw chedraw";
       
        else return "bar awayteam won chelost"; 
    
    
    })
      .attr("x", function(d) { return x(d.week); })
      .attr("y", function(d) { return y(Math.max(0, d.conceded)); }) 
        .attr("rx", xRadius)
        .attr("ry", yRadius)   
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return Math.abs(y(d.conceded)- y(0)); })
      .on('mouseover', function(d){
				    
                                div.style("opacity", 1)
							    .style("left", (d3.event.pageX+10) + "px")
							    .style("top", (d3.event.pageY-30) + "px")
                                .transition()
                                .duration(200)
                                .style("display", null)
							    .text(d.date+":  "+d.home + " " + d.scored + "-" + Math.abs(d.conceded)+ " " + d.away);	
                                

    })
    .on("mouseout", function(d) {
      
          div.transition()
               .duration(500)
               .style("display", "none");
							
        				}); 
});  
    
    
    
    
    
//////////////////////////Crystal Palace////////////////////////////////

var svg5 = d3.select(".fifth").append("svg").attr("width", svgWidth)
        .attr("height", svgHeight),
    margin = {top: topMargin, right: rightMargin, bottom: bottomMargin, left: leftMargin},
    width = 400 - margin.left - margin.right,
    //height = +svg.attr("height") - margin.top - margin.bottom;
   // width = 200,
    height = 40;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.5),
    y = d3.scaleLinear().rangeRound([height, 0])
    

var g5 = svg5.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data/crystalpalace.tsv", function(d) {
  d.scored = +d.scored;
  return d;
}, function(error, data) {
  if (error) throw error;

  x.domain(data.map(function(d) { return d.week; }));
  y.domain([0, d3.max(data, function(d) { return d.scored; })]);

//  g2.append("g")
//      .attr("class", "axis axis--x")
//      .attr("transform", "translate(0," + height + ")")
//      .call(d3.axisBottom(x));
// 

  g5.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", function(d) { 
        
        if(d.home=="Crystal Palace" && d.scored>(Math.abs(d.conceded)))
        return "bar crystalpalace won cpwon"; 
        
        else if(d.home=="Crystal Palace" && d.scored<(Math.abs(d.conceded)))
        return "bar crystalpalace lost cplost";
      
        else if(d.home=="Crystal Palace" && (Math.abs(d.conceded))==d.scored)
        return "bar crystalpalace draw cpdraw";
      
      
        else if(Math.abs(d.conceded)<d.scored)
        return "bar awayteam won cplost";
        
        else if(Math.abs(d.conceded)==d.scored)
        return "bar awayteam draw cpdraw";
         
        else return "bar awayteam lost cpwon"; 
    
    
    })
      .attr("x", function(d) { return x(d.week); })
      .attr("y", function(d) { return y(d.scored); })
        .attr("rx", xRadius)
        .attr("ry", yRadius)   
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.scored); })
      .on('mouseover', function(d){
					    
                                div.style("opacity", 1)
							    .style("left", (d3.event.pageX+10) + "px")
							    .style("top", (d3.event.pageY-30) + "px")
                                .transition()
                                .duration(200)
                                .style("display", null)
							    .text(d.date+":  "+d.home + " " + d.scored + "-" + Math.abs(d.conceded)+ " " + d.away);	
                       

    })
    .on("mouseout", function(d) {
							   
            div.transition()
               .duration(500)
               .style("display", "none");
							
        				});
    
    g5.selectAll(".bar2")
    .data(data)
    .enter().append("rect")
      .attr("class", function(d) { 
        
        if(d.away=="Crystal Palace" && (Math.abs(d.conceded))>d.scored)
        
        return "bar crystalpalace won cpwon"; 
        
        else if(d.away=="Crystal Palace" && (Math.abs(d.conceded))<d.scored)
        return "bar crystalpalace lost cplost";
        
        else if(d.away=="Crystal Palace" && (Math.abs(d.conceded))==d.scored)
        return "bar crystalpalace draw cpdraw";
       
       else if((Math.abs(d.conceded))<d.scored)
        return "bar awayteam lost cpwon";
        
        else if((Math.abs(d.conceded))==d.scored)
        return "bar awayteam draw cpdraw";
       
        else return "bar awayteam won cplost"; 
    
    
    })
      .attr("x", function(d) { return x(d.week); })
      .attr("y", function(d) { return y(Math.max(0, d.conceded)); }) 
        .attr("rx", xRadius)
        .attr("ry", yRadius)   
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return Math.abs(y(d.conceded)- y(0)); }).on('mouseover', function(d){
//							d3.select(this)
//							    .style("opacity", 0.2);
							    
                                div.style("opacity", 1)
							    .style("left", (d3.event.pageX+10) + "px")
							    .style("top", (d3.event.pageY-30) + "px")
                                .transition()
                                .duration(200)
                                .style("display", null)
							    .text(d.date+":  "+d.home + " " + d.scored + "-" + Math.abs(d.conceded)+ " " + d.away);	
                            

    })
    .on("mouseout", function(d) {
           div.transition()
               .duration(500)
               .style("display", "none");
							
        				}); 
});      
    
    
    
//////////////////////////Everton////////////////////////////////

    var svg6 = d3.select(".sixth").append("svg").attr("width", svgWidth)
        .attr("height", svgHeight),
    margin = {top: topMargin, right: rightMargin, bottom: bottomMargin, left: leftMargin},
    width = 400 - margin.left - margin.right,
    //height = +svg.attr("height") - margin.top - margin.bottom;
   // width = 200,
    height = 40;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.5),
    y = d3.scaleLinear().rangeRound([height, 0])
    

var g6 = svg6.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data/everton.tsv", function(d) {
  d.scored = +d.scored;
  return d;
}, function(error, data) {
  if (error) throw error;

  x.domain(data.map(function(d) { return d.week; }));
  y.domain([0, d3.max(data, function(d) { return d.scored; })]);

//  g2.append("g")
//      .attr("class", "axis axis--x")
//      .attr("transform", "translate(0," + height + ")")
//      .call(d3.axisBottom(x));
// 

  g6.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", function(d) { 
        
        if(d.home=="Everton" && d.scored>(Math.abs(d.conceded)))
        return "bar everton won evewon"; 
        
        else if(d.home=="Everton" && d.scored<(Math.abs(d.conceded)))
        return "bar everton lost evelost";
      
        else if(d.home=="Everton" && (Math.abs(d.conceded))==d.scored)
        return "bar everton draw evedraw";
      
      
        else if(Math.abs(d.conceded)<d.scored)
        return "bar awayteam won evelost";
        
        else if(Math.abs(d.conceded)==d.scored)
        return "bar awayteam draw evedraw";
         
        else return "bar awayteam lost evelost"; 
    
    
    })
      .attr("x", function(d) { return x(d.week); })
      .attr("y", function(d) { return y(d.scored); })
        .attr("rx", xRadius)
        .attr("ry", yRadius)   
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.scored); })
  .on('mouseover', function(d){
//							d3.select(this)
//							    .style("opacity", 0.2);
							    
                                div.style("opacity", 1)
							    .style("left", (d3.event.pageX+10) + "px")
							    .style("top", (d3.event.pageY-30) + "px")
                                .transition()
                                .duration(200)
                                .style("display", null)
							    .text(d.date+":  "+d.home + " " + d.scored + "-" + Math.abs(d.conceded)+ " " + d.away);	
                              

    })
    .on("mouseout", function(d) {
      
//            d3.select(this).style("opacity", 1)
							   
            div.transition()
               .duration(500)
               .style("display", "none");
							
        				});
    
    g6.selectAll(".bar2")
    .data(data)
    .enter().append("rect")
      .attr("class", function(d) { 
        
        if(d.away=="Everton" && (Math.abs(d.conceded))>d.scored)
        return "bar everton won evewon"; 
        
        else if(d.away=="Everton" && (Math.abs(d.conceded))<d.scored)
        return "bar everton lost evelost";
        
        else if(d.away=="Everton" && (Math.abs(d.conceded))==d.scored)
        return "bar everton draw evedraw";
       
        else if((Math.abs(d.conceded))<d.scored)
        return "bar awayteam lost evewon";
        
        else if((Math.abs(d.conceded))==d.scored)
        return "bar awayteam draw evedraw";
       
        else return "bar awayteam won evelost"; 
    
    
    
    })
      .attr("x", function(d) { return x(d.week); })
      .attr("y", function(d) { return y(Math.max(0, d.conceded)); }) 
      .attr("rx", xRadius)
      .attr("ry", yRadius)   
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return Math.abs(y(d.conceded)- y(0)); })
      .on('mouseover', function(d){
//							d3.select(this)
//							    .style("opacity", 0.2);
							    
                                div.style("opacity", 1)
							    .style("left", (d3.event.pageX+10) + "px")
							    .style("top", (d3.event.pageY-30) + "px")
                                .transition()
                                .duration(200)
                                .style("display", null)
							    .text(d.date+":  "+d.home + " " + d.scored + "-" + Math.abs(d.conceded)+ " " + d.away);	
                               

    })
    .on("mouseout", function(d) {
      
//            d3.select(this).style("opacity", 1)
							   
            div.transition()
               .duration(500)
               .style("display", "none");
							
        				}); 
});  
    

    
//////////////////////////Leicester////////////////////////////////

    var svg7 = d3.select(".seventh").append("svg").attr("width", svgWidth)
        .attr("height", svgHeight),
    margin = {top: topMargin, right: rightMargin, bottom: bottomMargin, left: leftMargin},
    width = 400 - margin.left - margin.right,
    //height = +svg.attr("height") - margin.top - margin.bottom;
   // width = 200,
    height = 40;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.5),
    y = d3.scaleLinear().rangeRound([height, 0])
    

var g7 = svg7.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data/leicester.tsv", function(d) {
  d.scored = +d.scored;
  return d;
}, function(error, data) {
  if (error) throw error;

  x.domain(data.map(function(d) { return d.week; }));
  y.domain([0, d3.max(data, function(d) { return d.scored; })]);

//  g2.append("g")
//      .attr("class", "axis axis--x")
//      .attr("transform", "translate(0," + height + ")")
//      .call(d3.axisBottom(x));
// 

  g7.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", function(d) { 
        
        if(d.home=="Leicester" && d.scored>(Math.abs(d.conceded)))
        return "bar leicester won leiwon"; 
        
        else if(d.home=="Leicester" && d.scored<(Math.abs(d.conceded)))
        return "bar leicester lost leilost";
      
        else if(d.home=="Leicester" && (Math.abs(d.conceded))==d.scored)
        return "bar leicester draw leidraw";
      
      
        else if(Math.abs(d.conceded)<d.scored)
        return "bar awayteam won leilost";
        
        else if(Math.abs(d.conceded)==d.scored)
        return "bar awayteam draw leidraw";
         
        else return "bar awayteam lost leiwon"; 
    
    
    })
      .attr("x", function(d) { return x(d.week); })
      .attr("y", function(d) { return y(d.scored); })
        .attr("rx", xRadius)
        .attr("ry", yRadius)   
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.scored); })
  .on('mouseover', function(d){
//							d3.select(this)
//							    .style("opacity", 0.2);
							    
                                div.style("opacity", 1)
							    .style("left", (d3.event.pageX+10) + "px")
							    .style("top", (d3.event.pageY-30) + "px")
                                .transition()
                                .duration(200)
                                .style("display", null)
							    .text(d.date+":  "+d.home + " " + d.scored + "-" + Math.abs(d.conceded)+ " " + d.away);	
            

    })
    .on("mouseout", function(d) {
      
//            d3.select(this).style("opacity", 1)
							   
            div.transition()
               .duration(500)
               .style("display", "none");
							
        				});
    
    g7.selectAll(".bar2")
    .data(data)
    .enter().append("rect")
      .attr("class", function(d) { 
        
        if(d.away=="Leicester" && (Math.abs(d.conceded))>d.scored)
        
        return "bar leicester won leiwon"; 
        
        else if(d.away=="Leicester" && (Math.abs(d.conceded))<d.scored)
        return "bar leicester lost leilost";
        
        else if(d.away=="Leicester" && (Math.abs(d.conceded))==d.scored)
        return "bar leicester draw leidraw";
       
       else if((Math.abs(d.conceded))<d.scored)
        return "bar awayteam lost leiwon";
        
        else if((Math.abs(d.conceded))==d.scored)
        return "bar awayteam draw leidraw";
       
        else return "bar awayteam won leilost"; 
    
    
    })
      .attr("x", function(d) { return x(d.week); })
      .attr("y", function(d) { return y(Math.max(0, d.conceded)); }) 
        .attr("rx", xRadius)
        .attr("ry", yRadius)   
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return Math.abs(y(d.conceded)- y(0)); })
    .on('mouseover', function(d){
//							d3.select(this)
//							    .style("opacity", 0.2);
							    
                                div.style("opacity", 1)
							    .style("left", (d3.event.pageX+10) + "px")
							    .style("top", (d3.event.pageY-30) + "px")
                                .transition()
                                .duration(200)
                                .style("display", null)
							    .text(d.date+":  "+d.home + " " + d.scored + "-" + Math.abs(d.conceded)+ " " + d.away);	
                 

    })
    .on("mouseout", function(d) {
      
//            d3.select(this).style("opacity", 1)
							   
            div.transition()
               .duration(500)
               .style("display", "none");
							
        				}); 
});  
    
       
 
//////////////////////////Liverpool////////////////////////////////

    var svg8 = d3.select(".eight").append("svg").attr("width", svgWidth)
        .attr("height", svgHeight),
    margin = {top: topMargin, right: rightMargin, bottom: bottomMargin, left: leftMargin},
    width = 400 - margin.left - margin.right,
    //height = +svg.attr("height") - margin.top - margin.bottom;
   // width = 200,
    height = 40;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.5),
    y = d3.scaleLinear().rangeRound([height, 0])
    

var g8 = svg8.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data/liverpool.tsv", function(d) {
  d.scored = +d.scored;
  return d;
}, function(error, data) {
  if (error) throw error;

  x.domain(data.map(function(d) { return d.week; }));
  y.domain([0, d3.max(data, function(d) { return d.scored; })]);

//  g2.append("g")
//      .attr("class", "axis axis--x")
//      .attr("transform", "translate(0," + height + ")")
//      .call(d3.axisBottom(x));
// 

  g8.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", function(d) { 
        
        if(d.home=="Liverpool" && d.scored>(Math.abs(d.conceded)))
        return "bar liverpool won livwon"; 
        
        else if(d.home=="Liverpool" && d.scored<(Math.abs(d.conceded)))
        return "bar liverpool lost livlost";
      
        else if(d.home=="Liverpool" && (Math.abs(d.conceded))==d.scored)
        return "bar liverpool draw livdraw";
      
      
        else if(Math.abs(d.conceded)<d.scored)
        return "bar awayteam won livlost";
        
        else if(Math.abs(d.conceded)==d.scored)
        return "bar awayteam draw livdraw";
         
        else return "bar awayteam lost livwon"; 
    
    
    })
      .attr("x", function(d) { return x(d.week); })
      .attr("y", function(d) { return y(d.scored); })
        .attr("rx", xRadius)
        .attr("ry", yRadius)   
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.scored); })
     .on('mouseover', function(d){
//							d3.select(this)
//							    .style("opacity", 0.2);
							    
                                div.style("opacity", 1)
							    .style("left", (d3.event.pageX+10) + "px")
							    .style("top", (d3.event.pageY-30) + "px")
                                .transition()
                                .duration(200)
                                .style("display", null)
							    .text(d.date+":  "+d.home + " " + d.scored + "-" + Math.abs(d.conceded)+ " " + d.away);	
                              

    })
    .on("mouseout", function(d) {
      
//            d3.select(this).style("opacity", 1)
							   
            div.transition()
               .duration(500)
               .style("display", "none");
							
        				});
    
    g8.selectAll(".bar2")
    .data(data)
    .enter().append("rect")
      .attr("class", function(d) { 
        
        if(d.away=="Liverpool" && (Math.abs(d.conceded))>d.scored)
        
        return "bar liverpool won livwon"; 
        
        else if(d.away=="Liverpool" && (Math.abs(d.conceded))<d.scored)
        return "bar liverpool lost livlost";
        
        else if(d.away=="Liverpool" && (Math.abs(d.conceded))==d.scored)
        return "bar liverpool draw livdraw";
       
       
       else if((Math.abs(d.conceded))<d.scored)
        return "bar awayteam lost livwon";
        
        else if((Math.abs(d.conceded))==d.scored)
        return "bar awayteam draw livdraw";
       
        else return "bar awayteam won livlost"; 
    
    
    })
      .attr("x", function(d) { return x(d.week); })
      .attr("y", function(d) { return y(Math.max(0, d.conceded)); }) 
        .attr("rx", xRadius)
        .attr("ry", yRadius)   
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return Math.abs(y(d.conceded)- y(0)); })
    .on('mouseover', function(d){
//							d3.select(this)
//							    .style("opacity", 0.2);
							    
                                div.style("opacity", 1)
							    .style("left", (d3.event.pageX+10) + "px")
							    .style("top", (d3.event.pageY-30) + "px")
                                .transition()
                                .duration(200)
                                .style("display", null)
							    .text(d.date+":  "+d.home + " " + d.scored + "-" + Math.abs(d.conceded)+ " " + d.away);	
                                

    })
    .on("mouseout", function(d) {
      
//            d3.select(this).style("opacity", 1)
							   
            div.transition()
               .duration(500)
               .style("display", "none");
							
        				}); 
});  
    

//////////////////////////Manchester City////////////////////////////////

    var svg9 = d3.select(".ninth").append("svg").attr("width", svgWidth)
        .attr("height", svgHeight),
    margin = {top: topMargin, right: rightMargin, bottom: bottomMargin, left: leftMargin},
    width = 400 - margin.left - margin.right,
    //height = +svg.attr("height") - margin.top - margin.bottom;
   // width = 200,
    height = 40;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.5),
    y = d3.scaleLinear().rangeRound([height, 0])
    

var g9 = svg9.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data/manchestercity.tsv", function(d) {
  d.scored = +d.scored;
  return d;
}, function(error, data) {
  if (error) throw error;

  x.domain(data.map(function(d) { return d.week; }));
  y.domain([0, d3.max(data, function(d) { return d.scored; })]);

//  g2.append("g")
//      .attr("class", "axis axis--x")
//      .attr("transform", "translate(0," + height + ")")
//      .call(d3.axisBottom(x));
// 

  g9.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", function(d) { 
        
        if(d.home=="Man City" && d.scored>(Math.abs(d.conceded)))
        return "bar manchestercity won mcwon"; 
        
        else if(d.home=="Man City" && d.scored<(Math.abs(d.conceded)))
        return "bar manchestercity lost mclost";
      
        else if(d.home=="Man City" && (Math.abs(d.conceded))==d.scored)
        return "bar manchestercity draw mcdraw";
      
      
        else if(Math.abs(d.conceded)<d.scored)
        return "bar awayteam won mclost";
        
        else if(Math.abs(d.conceded)==d.scored)
        return "bar awayteam draw mcdraw";
         
        else return "bar awayteam lost mcwon"; 
    
    
    })
      .attr("x", function(d) { return x(d.week); })
      .attr("y", function(d) { return y(d.scored); })
        .attr("rx", xRadius)
        .attr("ry", yRadius)   
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.scored); })
  .on('mouseover', function(d){
//							d3.select(this)
//							    .style("opacity", 0.2);
							    
                                div.style("opacity", 1)
							    .style("left", (d3.event.pageX+10) + "px")
							    .style("top", (d3.event.pageY-30) + "px")
                                .transition()
                                .duration(200)
                                .style("display", null)
							    .text(d.date+":  "+d.home + " " + d.scored + "-" + Math.abs(d.conceded)+ " " + d.away);	
                                

    })
    .on("mouseout", function(d) {
      
//            d3.select(this).style("opacity", 1)
							   
            div.transition()
               .duration(500)
               .style("display", "none");
							
        				});
    
    g9.selectAll(".bar2")
    .data(data)
    .enter().append("rect")
      .attr("class", function(d) { 
        
        if(d.away=="Man City" && (Math.abs(d.conceded))>d.scored)
        
        return "bar manchestercity won mcwon"; 
        
        else if(d.away=="Man City" && (Math.abs(d.conceded))<d.scored)
        return "bar manchestercity lost mclost";
        
        else if(d.away=="Man City" && (Math.abs(d.conceded))==d.scored)
        return "bar manchestercity draw mcdraw";
       
        else if((Math.abs(d.conceded))<d.scored)
        return "bar awayteam lost mcwon";
        
        else if((Math.abs(d.conceded))==d.scored)
        return "bar awayteam draw mcdraw";
       
        else return "bar awayteam won mclost"; 
    
    
    })
      .attr("x", function(d) { return x(d.week); })
      .attr("y", function(d) { return y(Math.max(0, d.conceded)); }) 
      .attr("rx", xRadius)
      .attr("ry", yRadius)   
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return Math.abs(y(d.conceded)- y(0)); })
      .on('mouseover', function(d){
//							d3.select(this)
//							    .style("opacity", 0.2);
							    
                                div.style("opacity", 1)
							    .style("left", (d3.event.pageX+10) + "px")
							    .style("top", (d3.event.pageY-30) + "px")
                                .transition()
                                .duration(200)
                                .style("display", null)
							    .text(d.date+":  "+d.home + " " + d.scored + "-" + Math.abs(d.conceded)+ " " + d.away);	
                       

    })
    .on("mouseout", function(d) {
      
//            d3.select(this).style("opacity", 1)
							   
            div.transition()
               .duration(500)
               .style("display", "none");
							
        				}); 
});  
    

    
//////////////////////////Manchester United////////////////////////////////

    var svg10 = d3.select(".tenth").append("svg").attr("width", svgWidth)
        .attr("height", svgHeight),
    margin = {top: topMargin, right: rightMargin, bottom: bottomMargin, left: leftMargin},
    width = 400 - margin.left - margin.right,
    //height = +svg.attr("height") - margin.top - margin.bottom;
   // width = 200,
    height = 40;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.5),
    y = d3.scaleLinear().rangeRound([height, 0])
    

var g10 = svg10.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data/manchesterunited.tsv", function(d) {
  d.scored = +d.scored;
  return d;
}, function(error, data) {
  if (error) throw error;

  x.domain(data.map(function(d) { return d.week; }));
  y.domain([0, d3.max(data, function(d) { return d.scored; })]);

//  g2.append("g")
//      .attr("class", "axis axis--x")
//      .attr("transform", "translate(0," + height + ")")
//      .call(d3.axisBottom(x));
// 

  g10.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", function(d) { 
        
        if(d.home=="Man United" && d.scored>(Math.abs(d.conceded)))
        return "bar manchesterunited won muwon"; 
        
        else if(d.home=="Man United" && d.scored<(Math.abs(d.conceded)))
        return "bar manchesterunited lost mulost";
      
        else if(d.home=="Man United" && (Math.abs(d.conceded))==d.scored)
        return "bar manchesterunited draw mudraw";
      
      
        else if(Math.abs(d.conceded)<d.scored)
        return "bar awayteam won mulost";
        
        else if(Math.abs(d.conceded)==d.scored)
        return "bar awayteam draw mudraw";
         
        else return "bar awayteam lost muwon"; 
    
    
    })
      .attr("x", function(d) { return x(d.week); })
      .attr("y", function(d) { return y(d.scored); })
        .attr("rx", xRadius)
        .attr("ry", yRadius)   
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.scored); })
  .on('mouseover', function(d){
//							d3.select(this)
//							    .style("opacity", 0.2);
							    
                                div.style("opacity", 1)
							    .style("left", (d3.event.pageX+10) + "px")
							    .style("top", (d3.event.pageY-30) + "px")
                                .transition()
                                .duration(200)
                                .style("display", null)
							    .text(d.date+":  "+d.home + " " + d.scored + "-" + Math.abs(d.conceded)+ " " + d.away);	
                           

    })
    .on("mouseout", function(d) {
      
//            d3.select(this).style("opacity", 1)
							   
            div.transition()
               .duration(500)
               .style("display", "none");
							
        				});
    
    g10.selectAll(".bar2")
    .data(data)
    .enter().append("rect")
      .attr("class", function(d) { 
        
        if(d.away=="Man United" && (Math.abs(d.conceded))>d.scored)
        
        return "bar manchesterunited won muwon"; 
        
        else if(d.away=="Man United" && (Math.abs(d.conceded))<d.scored)
        return "bar manchesterunited lost mulost";
        
        else if(d.away=="Man United" && (Math.abs(d.conceded))==d.scored)
        return "bar manchesterunited draw mudraw";
       
        else if((Math.abs(d.conceded))<d.scored)
        return "bar awayteam lost muwon";
        
        else if((Math.abs(d.conceded))==d.scored)
        return "bar awayteam draw mudraw";
       
        else return "bar awayteam won mulost"; 
    
    
    })
      .attr("x", function(d) { return x(d.week); })
      .attr("y", function(d) { return y(Math.max(0, d.conceded)); }) 
        .attr("rx", xRadius)
        .attr("ry", yRadius)   
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return Math.abs(y(d.conceded)- y(0)); })
    .on('mouseover', function(d){
//							d3.select(this)
//							    .style("opacity", 0.2);
							    
                                div.style("opacity", 1)
							    .style("left", (d3.event.pageX+10) + "px")
							    .style("top", (d3.event.pageY-30) + "px")
                                .transition()
                                .duration(200)
                                .style("display", null)
							    .text(d.date+":  "+d.home + " " + d.scored + "-" + Math.abs(d.conceded)+ " " + d.away);	
                                

    })
    .on("mouseout", function(d) {
      
//            d3.select(this).style("opacity", 1)
							   
            div.transition()
               .duration(500)
               .style("display", "none");
							
        				}); 
}); 


////////////////Newcastle///////////////////

var svg11 = d3.select(".eleventh").append("svg").attr("width", svgWidth)
        .attr("height", svgHeight),
    margin = {top: topMargin, right: rightMargin, bottom: bottomMargin, left: leftMargin},
    width = 400 - margin.left - margin.right,
    //height = +svg.attr("height") - margin.top - margin.bottom;
   // width = 200,
    height = 40;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.5),
    y = d3.scaleLinear().rangeRound([height, 0])
    

var g11 = svg11.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data/newcastle.tsv", function(d) {
  d.scored = +d.scored;
  return d;
}, function(error, data) {
  if (error) throw error;

  x.domain(data.map(function(d) { return d.week; }));
  y.domain([0, d3.max(data, function(d) { return d.scored; })]);

//  g2.append("g")
//      .attr("class", "axis axis--x")
//      .attr("transform", "translate(0," + height + ")")
//      .call(d3.axisBottom(x));
// 

  g11.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", function(d) { 
        
        if(d.home=="Newcastle" && d.scored>(Math.abs(d.conceded)))
        return "bar newcastle won nuwon"; 
        
        else if(d.home=="Newcastle" && d.scored<(Math.abs(d.conceded)))
        return "bar newcastle lost nulost";
      
        else if(d.home=="Newcastle" && (Math.abs(d.conceded))==d.scored)
        return "bar newcastle draw nudraw";
      
      
        else if(Math.abs(d.conceded)<d.scored)
        return "bar awayteam won nulost";
        
        else if(Math.abs(d.conceded)==d.scored)
        return "bar awayteam draw nudraw";
         
        else return "bar awayteam lost nuwon"; 
    
    
    })
      .attr("x", function(d) { return x(d.week); })
      .attr("y", function(d) { return y(d.scored); })
        .attr("rx", xRadius)
        .attr("ry", yRadius)   
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.scored); })
  .on('mouseover', function(d){
//							d3.select(this)
//							    .style("opacity", 0.2);
							    
                                div.style("opacity", 1)
							    .style("left", (d3.event.pageX+10) + "px")
							    .style("top", (d3.event.pageY-30) + "px")
                                .transition()
                                .duration(200)
                                .style("display", null)
							    .text(d.date+":  "+d.home + " " + d.scored + "-" + Math.abs(d.conceded)+ " " + d.away);	
                           

    })
    .on("mouseout", function(d) {
      
//            d3.select(this).style("opacity", 1)
							   
            div.transition()
               .duration(500)
               .style("display", "none");
							
        				});
    
    g11.selectAll(".bar2")
    .data(data)
    .enter().append("rect")
      .attr("class", function(d) { 
        
        if(d.away=="Newcastle" && (Math.abs(d.conceded))>d.scored)
        
        return "bar newcastle won nuwon"; 
        
        else if(d.away=="Newcastle" && (Math.abs(d.conceded))<d.scored)
        return "bar newcastle lost nulost";
        
        else if(d.away=="Newcastle" && (Math.abs(d.conceded))==d.scored)
        return "bar newcastle draw nudraw";
       
        else if((Math.abs(d.conceded))<d.scored)
        return "bar awayteam lost nuwon";
        
        else if((Math.abs(d.conceded))==d.scored)
        return "bar awayteam draw nudraw";
       
        else return "bar awayteam won nulost"; 
    
    
    })
      .attr("x", function(d) { return x(d.week); })
      .attr("y", function(d) { return y(Math.max(0, d.conceded)); }) 
        .attr("rx", xRadius)
        .attr("ry", yRadius)   
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return Math.abs(y(d.conceded)- y(0)); })
    .on('mouseover', function(d){
//							d3.select(this)
//							    .style("opacity", 0.2);
							    
                                div.style("opacity", 1)
							    .style("left", (d3.event.pageX+10) + "px")
							    .style("top", (d3.event.pageY-30) + "px")
                                .transition()
                                .duration(200)
                                .style("display", null)
							    .text(d.date+":  "+d.home + " " + d.scored + "-" + Math.abs(d.conceded)+ " " + d.away);	
                        

    })
    .on("mouseout", function(d) {
      
//            d3.select(this).style("opacity", 1)
							   
            div.transition()
               .duration(500)
               .style("display", "none");
							
        				}); 
}); 
    



////////////////Norwich///////////////////

var svg12 = d3.select(".twelfth").append("svg").attr("width", svgWidth)
        .attr("height", svgHeight),
    margin = {top: topMargin, right: rightMargin, bottom: bottomMargin, left: leftMargin},
    width = 400 - margin.left - margin.right,
    //height = +svg.attr("height") - margin.top - margin.bottom;
   // width = 200,
    height = 40;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.5),
    y = d3.scaleLinear().rangeRound([height, 0])
    

var g12 = svg12.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data/norwich.tsv", function(d) {
  d.scored = +d.scored;
  return d;
}, function(error, data) {
  if (error) throw error;

  x.domain(data.map(function(d) { return d.week; }));
  y.domain([0, d3.max(data, function(d) { return d.scored; })]);

//  g2.append("g")
//      .attr("class", "axis axis--x")
//      .attr("transform", "translate(0," + height + ")")
//      .call(d3.axisBottom(x));
// 

  g12.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", function(d) { 
        
        if(d.home=="Norwich" && d.scored>(Math.abs(d.conceded)))
        return "bar norwich won norwichwon"; 
        
        else if(d.home=="Norwich" && d.scored<(Math.abs(d.conceded)))
        return "bar norwich lost norwichlost";
      
        else if(d.home=="Norwich" && (Math.abs(d.conceded))==d.scored)
        return "bar norwich draw norwichdraw";
      
      
        else if(Math.abs(d.conceded)<d.scored)
        return "bar awayteam won norwichlost";
        
        else if(Math.abs(d.conceded)==d.scored)
        return "bar awayteam draw norwichdraw";
         
        else return "bar awayteam lost norwichwon"; 
    
    
    })
      .attr("x", function(d) { return x(d.week); })
      .attr("y", function(d) { return y(d.scored); })
      .attr("rx", xRadius)
      .attr("ry", yRadius)   
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.scored); })
      .on('mouseover', function(d){
//							d3.select(this)
//							    .style("opacity", 0.2);
							    
                                div.style("opacity", 1)
							    .style("left", (d3.event.pageX+10) + "px")
							    .style("top", (d3.event.pageY-30) + "px")
                                .transition()
                                .duration(200)
                                .style("display", null)
							    .text(d.date+":  "+d.home + " " + d.scored + "-" + Math.abs(d.conceded)+ " " + d.away);	
                             

    })
    .on("mouseout", function(d) {
      
//            d3.select(this).style("opacity", 1)
							   
            div.transition()
               .duration(500)
               .style("display", "none");
							
        				});
    
    g12.selectAll(".bar2")
    .data(data)
    .enter().append("rect")
      .attr("class", function(d) { 
        
        if(d.away=="Norwich" && (Math.abs(d.conceded))>d.scored)
        
        return "bar norwich won norwichwon"; 
        
        else if(d.away=="Norwich" && (Math.abs(d.conceded))<d.scored)
        return "bar norwich lost norwichlost";
        
        else if(d.away=="Norwich" && (Math.abs(d.conceded))==d.scored)
        return "bar norwich draw norwichdraw";
       
        else if((Math.abs(d.conceded))<d.scored)
        return "bar awayteam lost norwichwon";
        
        else if((Math.abs(d.conceded))==d.scored)
        return "bar awayteam draw norwichdraw";
       
        else return "bar awayteam won norwichlost"; 
    
    
    })
      .attr("x", function(d) { return x(d.week); })
      .attr("y", function(d) { return y(Math.max(0, d.conceded)); }) 
      .attr("rx", xRadius)
      .attr("ry", yRadius)   
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return Math.abs(y(d.conceded)- y(0)); })
      .on('mouseover', function(d){
//							d3.select(this)
//							    .style("opacity", 0.2);
							    
                                div.style("opacity", 1)
							    .style("left", (d3.event.pageX+10) + "px")
							    .style("top", (d3.event.pageY-30) + "px")
                                .transition()
                                .duration(200)
                                .style("display", null)
							    .text(d.date+":  "+d.home + " " + d.scored + "-" + Math.abs(d.conceded)+ " " + d.away);	
                              

    })
    .on("mouseout", function(d) {
      
//            d3.select(this).style("opacity", 1)
							   
            div.transition()
               .duration(500)
               .style("display", "none");
							
        				}); 
}); 


////////////////Southampton///////////////////

var svg13 = d3.select(".thirteenth").append("svg").attr("width", svgWidth)
        .attr("height", svgHeight),
    margin = {top: topMargin, right: rightMargin, bottom: bottomMargin, left: leftMargin},
    width = 400 - margin.left - margin.right,
    //height = +svg.attr("height") - margin.top - margin.bottom;
   // width = 200,
    height = 40;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.5),
    y = d3.scaleLinear().rangeRound([height, 0])
    

var g13 = svg13.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data/southampton.tsv", function(d) {
  d.scored = +d.scored;
  return d;
}, function(error, data) {
  if (error) throw error;

  x.domain(data.map(function(d) { return d.week; }));
  y.domain([0, d3.max(data, function(d) { return d.scored; })]);

//  g2.append("g")
//      .attr("class", "axis axis--x")
//      .attr("transform", "translate(0," + height + ")")
//      .call(d3.axisBottom(x));
// 

  g13.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", function(d) { 
        
        if(d.home=="Southampton" && d.scored>(Math.abs(d.conceded)))
        return "bar southampton won souwon"; 
        
        else if(d.home=="Southampton" && d.scored<(Math.abs(d.conceded)))
        return "bar southampton lost soulost";
      
        else if(d.home=="Southampton" && (Math.abs(d.conceded))==d.scored)
        return "bar southampton draw soudraw";
      
      
        else if(Math.abs(d.conceded)<d.scored)
        return "bar awayteam won soulost";
        
        else if(Math.abs(d.conceded)==d.scored)
        return "bar awayteam draw soudraw";
         
        else return "bar awayteam lost souwon"; 
    
    
    })
      .attr("x", function(d) { return x(d.week); })
      .attr("y", function(d) { return y(d.scored); })
      .attr("rx", xRadius)
      .attr("ry", yRadius)   
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.scored); })
      .on('mouseover', function(d){
//							d3.select(this)
//							    .style("opacity", 0.2);
							    
                                div.style("opacity", 1)
							    .style("left", (d3.event.pageX+10) + "px")
							    .style("top", (d3.event.pageY-30) + "px")
                                .transition()
                                .duration(200)
                                .style("display", null)
							    .text(d.date+":  "+d.home + " " + d.scored + "-" + Math.abs(d.conceded)+ " " + d.away);	
                                

    })
    .on("mouseout", function(d) {
      
//            d3.select(this).style("opacity", 1)
							   
            div.transition()
               .duration(500)
               .style("display", "none");
							
        				});
    
    g13.selectAll(".bar2")
    .data(data)
    .enter().append("rect")
      .attr("class", function(d) { 
        
        if(d.away=="Southampton" && (Math.abs(d.conceded))>d.scored)
        
        return "bar southampton won souwon"; 
        
        else if(d.away=="Southampton" && (Math.abs(d.conceded))<d.scored)
        return "bar southampton lost soulost";
        
        else if(d.away=="Southampton" && (Math.abs(d.conceded))==d.scored)
        return "bar southampton draw soudraw";
       
        else if((Math.abs(d.conceded))<d.scored)
        return "bar awayteam lost souwon";
        
        else if((Math.abs(d.conceded))==d.scored)
        return "bar awayteam draw soudraw";
       
        else return "bar awayteam won soulost"; 
    
    
    })
      .attr("x", function(d) { return x(d.week); })
      .attr("y", function(d) { return y(Math.max(0, d.conceded)); }) 
      .attr("rx", xRadius)
      .attr("ry", yRadius)   
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return Math.abs(y(d.conceded)- y(0)); })
      .on('mouseover', function(d){
//							d3.select(this)
//							    .style("opacity", 0.2);
							    
                                div.style("opacity", 1)
							    .style("left", (d3.event.pageX+10) + "px")
							    .style("top", (d3.event.pageY-30) + "px")
                                .transition()
                                .duration(200)
                                .style("display", null)
							    .text(d.date+":  "+d.home + " " + d.scored + "-" + Math.abs(d.conceded)+ " " + d.away);	
                                

    })
    .on("mouseout", function(d) {
      
//            d3.select(this).style("opacity", 1)
							   
            div.transition()
               .duration(500)
               .style("display", "none");
							
        				}); 
}); 
    


////////////////Stoke///////////////////

var svg14 = d3.select(".fourteenth").append("svg").attr("width", svgWidth)
        .attr("height", svgHeight),
    margin = {top: topMargin, right: rightMargin, bottom: bottomMargin, left: leftMargin},
    width = 400 - margin.left - margin.right,
    //height = +svg.attr("height") - margin.top - margin.bottom;
   // width = 200,
    height = 40;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.5),
    y = d3.scaleLinear().rangeRound([height, 0])
    

var g14 = svg14.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data/stoke.tsv", function(d) {
  d.scored = +d.scored;
  return d;
}, function(error, data) {
  if (error) throw error;

  x.domain(data.map(function(d) { return d.week; }));
  y.domain([0, d3.max(data, function(d) { return d.scored; })]);

//  g2.append("g")
//      .attr("class", "axis axis--x")
//      .attr("transform", "translate(0," + height + ")")
//      .call(d3.axisBottom(x));
// 

  g14.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", function(d) { 
        
        if(d.home=="Stoke" && d.scored>(Math.abs(d.conceded)))
        return "bar stoke won stokewon"; 
        
        else if(d.home=="Stoke" && d.scored<(Math.abs(d.conceded)))
        return "bar stoke lost stokelost";
      
        else if(d.home=="Stoke" && (Math.abs(d.conceded))==d.scored)
        return "bar stoke draw stokedraw";
      
      
        else if(Math.abs(d.conceded)<d.scored)
        return "bar awayteam won stokelost";
        
        else if(Math.abs(d.conceded)==d.scored)
        return "bar awayteam draw stokedraw";
         
        else return "bar awayteam lost stokewon"; 
    
    
    })
      .attr("x", function(d) { return x(d.week); })
      .attr("y", function(d) { return y(d.scored); })
      .attr("rx", xRadius)
      .attr("ry", yRadius)   
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.scored); })
      .on('mouseover', function(d){
//							d3.select(this)
//							    .style("opacity", 0.2);
							    
                                div.style("opacity", 1)
							    .style("left", (d3.event.pageX+10) + "px")
							    .style("top", (d3.event.pageY-30) + "px")
                                .transition()
                                .duration(200)
                                .style("display", null)
							    .text(d.date+":  "+d.home + " " + d.scored + "-" + Math.abs(d.conceded)+ " " + d.away);	
                                
    })
    .on("mouseout", function(d) {
      
//            d3.select(this).style("opacity", 1)
							   
            div.transition()
               .duration(500)
               .style("display", "none");
							
        				});
    
    g14.selectAll(".bar2")
    .data(data)
    .enter().append("rect")
      .attr("class", function(d) { 
        
        if(d.away=="Stoke" && (Math.abs(d.conceded))>d.scored)
        
        return "bar stoke won stokewon"; 
        
        else if(d.away=="Stoke" && (Math.abs(d.conceded))<d.scored)
        return "bar stoke lost stokelost";
        
        else if(d.away=="Stoke" && (Math.abs(d.conceded))==d.scored)
        return "bar stoke draw stokedraw";
       
        else if((Math.abs(d.conceded))<d.scored)
        return "bar awayteam lost stokewon";
        
        else if((Math.abs(d.conceded))==d.scored)
        return "bar awayteam draw stokedraw";
       
        else return "bar awayteam won stokelost"; 
    
    
    })
      .attr("x", function(d) { return x(d.week); })
      .attr("y", function(d) { return y(Math.max(0, d.conceded)); }) 
      .attr("rx", xRadius)
      .attr("ry", yRadius)   
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return Math.abs(y(d.conceded)- y(0)); })
      .on('mouseover', function(d){
//							d3.select(this)
//							    .style("opacity", 0.2);
							    
                                div.style("opacity", 1)
							    .style("left", (d3.event.pageX+10) + "px")
							    .style("top", (d3.event.pageY-30) + "px")
                                .transition()
                                .duration(200)
                                .style("display", null)
							    .text(d.date+":  "+d.home + " " + d.scored + "-" + Math.abs(d.conceded)+ " " + d.away);	
                             

    })
    .on("mouseout", function(d) {
      
//            d3.select(this).style("opacity", 1)
							   
            div.transition()
               .duration(500)
               .style("display", "none");
							
        				}); 
}); 







////////////////Sunderland///////////////////

var svg15 = d3.select(".fifteenth").append("svg").attr("width", svgWidth)
        .attr("height", svgHeight),
    margin = {top: topMargin, right: rightMargin, bottom: bottomMargin, left: leftMargin},
    width = 400 - margin.left - margin.right,
    //height = +svg.attr("height") - margin.top - margin.bottom;
   // width = 200,
    height = 40;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.5),
    y = d3.scaleLinear().rangeRound([height, 0])
    

var g15 = svg15.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data/sunderland.tsv", function(d) {
  d.scored = +d.scored;
  return d;
}, function(error, data) {
  if (error) throw error;

  x.domain(data.map(function(d) { return d.week; }));
  y.domain([0, d3.max(data, function(d) { return d.scored; })]);

//  g2.append("g")
//      .attr("class", "axis axis--x")
//      .attr("transform", "translate(0," + height + ")")
//      .call(d3.axisBottom(x));
// 

  g15.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", function(d) { 
        
        if(d.home=="Sunderland" && d.scored>(Math.abs(d.conceded)))
        return "bar sunderland won sunwon"; 
        
        else if(d.home=="Sunderland" && d.scored<(Math.abs(d.conceded)))
        return "bar sunderland lost sunlost";
      
        else if(d.home=="Sunderland" && (Math.abs(d.conceded))==d.scored)
        return "bar sunderland draw sundraw";
      
      
        else if(Math.abs(d.conceded)<d.scored)
        return "bar awayteam won sunlost";
        
        else if(Math.abs(d.conceded)==d.scored)
        return "bar awayteam draw sundraw";
         
        else return "bar awayteam lost sunwon"; 
    
    
    })
      .attr("x", function(d) { return x(d.week); })
      .attr("y", function(d) { return y(d.scored); })
      .attr("rx", xRadius)
      .attr("ry", yRadius)   
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.scored); })
      .on('mouseover', function(d){
//							d3.select(this)
//							    .style("opacity", 0.2);
							    
                                div.style("opacity", 1)
							    .style("left", (d3.event.pageX+10) + "px")
							    .style("top", (d3.event.pageY-30) + "px")
                                .transition()
                                .duration(200)
                                .style("display", null)
							    .text(d.date+":  "+d.home + " " + d.scored + "-" + Math.abs(d.conceded)+ " " + d.away);	
                                

    })
    .on("mouseout", function(d) {
      
//            d3.select(this).style("opacity", 1)
							   
            div.transition()
               .duration(500)
               .style("display", "none");
							
        				});
    
    g15.selectAll(".bar2")
    .data(data)
    .enter().append("rect")
      .attr("class", function(d) { 
        
        if(d.away=="Sunderland" && (Math.abs(d.conceded))>d.scored)
        
        return "bar sunderland won sunwon"; 
        
        else if(d.away=="Sunderland" && (Math.abs(d.conceded))<d.scored)
        return "bar sunderland lost sunlost";
        
        else if(d.away=="Sunderland" && (Math.abs(d.conceded))==d.scored)
        return "bar sunderland draw sundraw";
       
        else if((Math.abs(d.conceded))<d.scored)
        return "bar awayteam lost sunwon";
        
        else if((Math.abs(d.conceded))==d.scored)
        return "bar awayteam draw sundraw";
       
        else return "bar awayteam won sunlost"; 
    
    
    })
      .attr("x", function(d) { return x(d.week); })
      .attr("y", function(d) { return y(Math.max(0, d.conceded)); }) 
      .attr("rx", xRadius)
      .attr("ry", yRadius)   
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return Math.abs(y(d.conceded)- y(0)); })
      .on('mouseover', function(d){
//							d3.select(this)
//							    .style("opacity", 0.2);
							    
                                div.style("opacity", 1)
							    .style("left", (d3.event.pageX+10) + "px")
							    .style("top", (d3.event.pageY-30) + "px")
                                .transition()
                                .duration(200)
                                .style("display", null)
							    .text(d.date+":  "+d.home + " " + d.scored + "-" + Math.abs(d.conceded)+ " " + d.away);	
                                
    })
    .on("mouseout", function(d) {
      
//            d3.select(this).style("opacity", 1)
							   
            div.transition()
               .duration(500)
               .style("display", "none");
							
        				}); 
}); 



////////////////Swansea///////////////////

var svg16 = d3.select(".sixteenth").append("svg").attr("width", svgWidth)
        .attr("height", svgHeight),
    margin = {top: topMargin, right: rightMargin, bottom: bottomMargin, left: leftMargin},
    width = 400 - margin.left - margin.right,
    //height = +svg.attr("height") - margin.top - margin.bottom;
   // width = 200,
    height = 40;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.5),
    y = d3.scaleLinear().rangeRound([height, 0])
    

var g16 = svg16.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data/swansea.tsv", function(d) {
  d.scored = +d.scored;
  return d;
}, function(error, data) {
  if (error) throw error;

  x.domain(data.map(function(d) { return d.week; }));
  y.domain([0, d3.max(data, function(d) { return d.scored; })]);

//  g2.append("g")
//      .attr("class", "axis axis--x")
//      .attr("transform", "translate(0," + height + ")")
//      .call(d3.axisBottom(x));
// 

  g16.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", function(d) { 
        
        if(d.home=="Swansea" && d.scored>(Math.abs(d.conceded)))
        return "bar swansea won swawon"; 
        
        else if(d.home=="Swansea" && d.scored<(Math.abs(d.conceded)))
        return "bar swansea lost swalost";
      
        else if(d.home=="Swansea" && (Math.abs(d.conceded))==d.scored)
        return "bar swansea draw swadraw";
      
      
        else if(Math.abs(d.conceded)<d.scored)
        return "bar awayteam won swalost";
        
        else if(Math.abs(d.conceded)==d.scored)
        return "bar awayteam draw swadraw";
         
        else return "bar awayteam lost swawon"; 
    
    
    })
      .attr("x", function(d) { return x(d.week); })
      .attr("y", function(d) { return y(d.scored); })
      .attr("rx", xRadius)
      .attr("ry", yRadius)   
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.scored); })
      .on('mouseover', function(d){
//							d3.select(this)
//							    .style("opacity", 0.2);
							    
                                div.style("opacity", 1)
							    .style("left", (d3.event.pageX+10) + "px")
							    .style("top", (d3.event.pageY-30) + "px")
                                .transition()
                                .duration(200)
                                .style("display", null)
							    .text(d.date+":  "+d.home + " " + d.scored + "-" + Math.abs(d.conceded)+ " " + d.away);	
                                

    })
    .on("mouseout", function(d) {
      
//            d3.select(this).style("opacity", 1)
							   
            div.transition()
               .duration(500)
               .style("display", "none");
							
        				});
    
    g16.selectAll(".bar2")
    .data(data)
    .enter().append("rect")
      .attr("class", function(d) { 
        
        if(d.away=="Swansea" && (Math.abs(d.conceded))>d.scored)
        return "bar swansea won swawon"; 
        
        else if(d.away=="Swansea" && (Math.abs(d.conceded))<d.scored)
        return "bar swansea lost swalost";
        
        else if(d.away=="Swansea" && (Math.abs(d.conceded))==d.scored)
        return "bar swansea draw swadraw";
       
        else if((Math.abs(d.conceded))<d.scored)
        return "bar awayteam lost swawon";
        
        else if((Math.abs(d.conceded))==d.scored)
        return "bar awayteam draw swadraw";
       
        else return "bar awayteam won swalost"; 
    
    
    })
      .attr("x", function(d) { return x(d.week); })
      .attr("y", function(d) { return y(Math.max(0, d.conceded)); }) 
      .attr("rx", xRadius)
      .attr("ry", yRadius)   
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return Math.abs(y(d.conceded)- y(0)); })
      .on('mouseover', function(d){
//							d3.select(this)
//							    .style("opacity", 0.2);
							    
                                div.style("opacity", 1)
							    .style("left", (d3.event.pageX+10) + "px")
							    .style("top", (d3.event.pageY-30) + "px")
                                .transition()
                                .duration(200)
                                .style("display", null)
							    .text(d.date+":  "+d.home + " " + d.scored + "-" + Math.abs(d.conceded)+ " " + d.away);	
                                

    })
    .on("mouseout", function(d) {
      
//            d3.select(this).style("opacity", 1)
							   
            div.transition()
               .duration(500)
               .style("display", "none");
							
        				}); 
}); 


////////////////Tottenham///////////////////

var svg17 = d3.select(".seventeenth").append("svg").attr("width", svgWidth)
        .attr("height", svgHeight),
    margin = {top: topMargin, right: rightMargin, bottom: bottomMargin, left: leftMargin},
    width = 400 - margin.left - margin.right,
    //height = +svg.attr("height") - margin.top - margin.bottom;
   // width = 200,
    height = 40;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.5),
    y = d3.scaleLinear().rangeRound([height, 0])
    

var g17 = svg17.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data/tottenham.tsv", function(d) {
  d.scored = +d.scored;
  return d;
}, function(error, data) {
  if (error) throw error;

  x.domain(data.map(function(d) { return d.week; }));
  y.domain([0, d3.max(data, function(d) { return d.scored; })]);

//  g2.append("g")
//      .attr("class", "axis axis--x")
//      .attr("transform", "translate(0," + height + ")")
//      .call(d3.axisBottom(x));
// 

  g17.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", function(d) { 
        
        if(d.home=="Tottenham" && d.scored>(Math.abs(d.conceded)))
        return "bar tottenham won totwon"; 
        
        else if(d.home=="Tottenham" && d.scored<(Math.abs(d.conceded)))
        return "bar tottenham lost totlost";
      
        else if(d.home=="Tottenham" && (Math.abs(d.conceded))==d.scored)
        return "bar tottenham draw totdraw";
      
      
        else if(Math.abs(d.conceded)<d.scored)
        return "bar awayteam won totlost";
        
        else if(Math.abs(d.conceded)==d.scored)
        return "bar awayteam draw totdraw";
         
        else return "bar awayteam lost totwon"; 
    
    
    })
      .attr("x", function(d) { return x(d.week); })
      .attr("y", function(d) { return y(d.scored); })
      .attr("rx", xRadius)
      .attr("ry", yRadius)   
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.scored); })
      .on('mouseover', function(d){
//							d3.select(this)
//							    .style("opacity", 0.2);
							    
                                div.style("opacity", 1)
							    .style("left", (d3.event.pageX+10) + "px")
							    .style("top", (d3.event.pageY-30) + "px")
                                .transition()
                                .duration(200)
                                .style("display", null)
							    .text(d.date+":  "+d.home + " " + d.scored + "-" + Math.abs(d.conceded)+ " " + d.away);	
                                

    })
    .on("mouseout", function(d) {
      
//            d3.select(this).style("opacity", 1)
							   
            div.transition()
               .duration(500)
               .style("display", "none");
							
        				});
    
    g17.selectAll(".bar2")
    .data(data)
    .enter().append("rect")
      .attr("class", function(d) { 
        
        if(d.away=="Tottenham" && (Math.abs(d.conceded))>d.scored)
        return "bar tottenham won totwon"; 
        
        else if(d.away=="Tottenham" && (Math.abs(d.conceded))<d.scored)
        return "bar tottenham lost totlost";
        
        else if(d.away=="Tottenham" && (Math.abs(d.conceded))==d.scored)
        return "bar tottenham draw totdraw";
       
        else if((Math.abs(d.conceded))<d.scored)
        return "bar awayteam lost totwon";
        
        else if((Math.abs(d.conceded))==d.scored)
        return "bar awayteam draw totdraw";
       
        else return "bar awayteam won totlost"; 
    
    
    })
      .attr("x", function(d) { return x(d.week); })
      .attr("y", function(d) { return y(Math.max(0, d.conceded)); }) 
      .attr("rx", xRadius)
      .attr("ry", yRadius)   
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return Math.abs(y(d.conceded)- y(0)); })
      .on('mouseover', function(d){
//							d3.select(this)
//							    .style("opacity", 0.2);
							    
                                div.style("opacity", 1)
							    .style("left", (d3.event.pageX+10) + "px")
							    .style("top", (d3.event.pageY-30) + "px")
                                .transition()
                                .duration(200)
                                .style("display", null)
							    .text(d.date+":  "+d.home + " " + d.scored + "-" + Math.abs(d.conceded)+ " " + d.away);	
                                

    })
    .on("mouseout", function(d) {
      
//            d3.select(this).style("opacity", 1)
							   
            div.transition()
               .duration(500)
               .style("display", "none");
							
        				}); 
}); 


////////////////Watford///////////////////

var svg18 = d3.select(".eighteenth").append("svg").attr("width", svgWidth)
        .attr("height", svgHeight),
    margin = {top: topMargin, right: rightMargin, bottom: bottomMargin, left: leftMargin},
    width = 400 - margin.left - margin.right,
    //height = +svg.attr("height") - margin.top - margin.bottom;
   // width = 200,
    height = 40;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.5),
    y = d3.scaleLinear().rangeRound([height, 0])
    

var g18 = svg18.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data/watford.tsv", function(d) {
  d.scored = +d.scored;
  return d;
}, function(error, data) {
  if (error) throw error;

  x.domain(data.map(function(d) { return d.week; }));
  y.domain([0, d3.max(data, function(d) { return d.scored; })]);

//  g2.append("g")
//      .attr("class", "axis axis--x")
//      .attr("transform", "translate(0," + height + ")")
//      .call(d3.axisBottom(x));
// 

  g18.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", function(d) { 
        
        if(d.home=="Watford" && d.scored>(Math.abs(d.conceded)))
        return "bar watford won watwon"; 
        
        else if(d.home=="Watford" && d.scored<(Math.abs(d.conceded)))
        return "bar watford lost watlost";
      
        else if(d.home=="Watford" && (Math.abs(d.conceded))==d.scored)
        return "bar watford draw watdraw";
      
      
        else if(Math.abs(d.conceded)<d.scored)
        return "bar awayteam won watlost";
        
        else if(Math.abs(d.conceded)==d.scored)
        return "bar awayteam draw watdraw";
         
        else return "bar awayteam lost watwon"; 
    
    
    })
      .attr("x", function(d) { return x(d.week); })
      .attr("y", function(d) { return y(d.scored); })
      .attr("rx", xRadius)
      .attr("ry", yRadius)   
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.scored); })
      .on('mouseover', function(d){
//							d3.select(this)
//							    .style("opacity", 0.2);
							    
                            div.style("opacity", 1)
							    .style("left", (d3.event.pageX+10) + "px")
							    .style("top", (d3.event.pageY-30) + "px")
                                .transition()
                                .duration(200)
                                .style("display", null)
							    .text(d.date+":  "+d.home + " " + d.scored + "-" + Math.abs(d.conceded)+ " " + d.away);	
                               

    })
    .on("mouseout", function(d) {
      
//            d3.select(this).style("opacity", 1)
							   
            div.transition()
               .duration(500)
               .style("display", "none");	
        				});
    
    g18.selectAll(".bar2")
    .data(data)
    .enter().append("rect")
      .attr("class", function(d) { 
        
        if(d.away=="Watford" && (Math.abs(d.conceded))>d.scored)
        return "bar watford won watwon"; 
        
        else if(d.away=="Watford" && (Math.abs(d.conceded))<d.scored)
        return "bar watford lost watlost";
        
        else if(d.away=="Watford" && (Math.abs(d.conceded))==d.scored)
        return "bar watford draw watdraw";
       
        else if((Math.abs(d.conceded))<d.scored)
        return "bar awayteam lost watwon";
        
        else if((Math.abs(d.conceded))==d.scored)
        return "bar awayteam draw watdraw";
       
        else return "bar awayteam won watlost"; 
    
    
    })
      .attr("x", function(d) { return x(d.week); })
      .attr("y", function(d) { return y(Math.max(0, d.conceded)); }) 
      .attr("rx", xRadius)
      .attr("ry", yRadius)   
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return Math.abs(y(d.conceded)- y(0)); })
      .on('mouseover', function(d){
//							d3.select(this)
//							    .style("opacity", 0.2);
							    
                                div.style("opacity", 1)
							    .style("left", (d3.event.pageX+10) + "px")
							    .style("top", (d3.event.pageY-30) + "px")
                                .transition()
                                .duration(200)
                                .style("display", null)
							    .text(d.date+":  "+d.home + " " + d.scored + "-" + Math.abs(d.conceded)+ " " + d.away);	
                               

    })
    .on("mouseout", function(d) {
      
//            d3.select(this).style("opacity", 1)
							   
            div.transition()
               .duration(500)
               .style("display", "none");
							
        				}); 
}); 


////////////////WestBrom///////////////////

var svg19 = d3.select(".nineteenth").append("svg").attr("width", svgWidth)
        .attr("height", svgHeight),
    margin = {top: topMargin, right: rightMargin, bottom: bottomMargin, left: leftMargin},
    width = 400 - margin.left - margin.right,
    //height = +svg.attr("height") - margin.top - margin.bottom;
   // width = 200,
    height = 40;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.5),
    y = d3.scaleLinear().rangeRound([height, 0])
    

var g19 = svg19.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data/westbrom.tsv", function(d) {
  d.scored = +d.scored;
  return d;
}, function(error, data) {
  if (error) throw error;

  x.domain(data.map(function(d) { return d.week; }));
  y.domain([0, d3.max(data, function(d) { return d.scored; })]);

//  g2.append("g")
//      .attr("class", "axis axis--x")
//      .attr("transform", "translate(0," + height + ")")
//      .call(d3.axisBottom(x));
// 

  g19.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", function(d) { 
        
        if(d.home=="West Brom" && d.scored>(Math.abs(d.conceded)))
        return "bar westbrom won wbawon"; 
        
        else if(d.home=="West Brom" && d.scored<(Math.abs(d.conceded)))
        return "bar westbrom lost wbalost";
      
        else if(d.home=="West Brom" && (Math.abs(d.conceded))==d.scored)
        return "bar westbrom draw wbadraw";
      
      
        else if(Math.abs(d.conceded)<d.scored)
        return "bar awayteam won wbalost";
        
        else if(Math.abs(d.conceded)==d.scored)
        return "bar awayteam draw wbadraw";
         
        else return "bar awayteam lost wbawon"; 
    
    
    })
      .attr("x", function(d) { return x(d.week); })
      .attr("y", function(d) { return y(d.scored); })
      .attr("rx", xRadius)
      .attr("ry", yRadius)   
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.scored); })
      .on('mouseover', function(d){

                            div.style("opacity", 1)
							    .style("left", (d3.event.pageX+10) + "px")
							    .style("top", (d3.event.pageY-30) + "px")
                                .transition()
                                .duration(200)
                                .style("display", null)
							    
                                

    })
    .on("mouseout", function(d) {

            div.transition()
               .duration(500)
               .style("display", "none");	
        				});
    
    g19.selectAll(".bar2")
    .data(data)
    .enter().append("rect")
      .attr("class", function(d) { 
        
        if(d.away=="West Brom" && (Math.abs(d.conceded))>d.scored)
        return "bar westbrom won wbawon"; 
        
        else if(d.away=="West Brom" && (Math.abs(d.conceded))<d.scored)
        return "bar westbrom lost wbalost";
        
        else if(d.away=="West Brom" && (Math.abs(d.conceded))==d.scored)
        return "bar westbrom draw wbadraw";
       
        else if((Math.abs(d.conceded))<d.scored)
        return "bar awayteam lost wbawon";
        
        else if((Math.abs(d.conceded))==d.scored)
        return "bar awayteam draw wbadraw";
       
        else return "bar awayteam won wbalost"; 
    
    
    })
      .attr("x", function(d) { return x(d.week); })
      .attr("y", function(d) { return y(Math.max(0, d.conceded)); }) 
      .attr("rx", xRadius)
      .attr("ry", yRadius)   
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return Math.abs(y(d.conceded)- y(0)); })
      .on('mouseover', function(d){

                                div.style("opacity", 1)
							    .style("left", (d3.event.pageX+10) + "px")
							    .style("top", (d3.event.pageY-30) + "px")
                                .transition()
                                .duration(200)
                                .style("display", null)
							    .text(d.date+":  "+d.home + " " + d.scored + "-" + Math.abs(d.conceded)+ " " + d.away);	
                              

    })
    .on("mouseout", function(d) {
							   
            div.transition()
               .duration(500)
               .style("display", "none");
							
        				}); 
});



////////////////WestHam///////////////////

var svg20 = d3.select(".twentieth").append("svg").attr("width", svgWidth)
        .attr("height", svgHeight),
    margin = {top: topMargin, right: rightMargin, bottom: bottomMargin, left: leftMargin},
    width = 400 - margin.left - margin.right,
    //height = +svg.attr("height") - margin.top - margin.bottom;
   // width = 200,
    height = 40;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.5),
    y = d3.scaleLinear().rangeRound([height, 0])
    

var g20 = svg20.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data/westham.tsv", function(d) {
  d.scored = +d.scored;
  return d;
}, function(error, data) {
  if (error) throw error;

  x.domain(data.map(function(d) { return d.week; }));
  y.domain([0, d3.max(data, function(d) { return d.scored; })]);

//  g2.append("g")
//      .attr("class", "axis axis--x")
//      .attr("transform", "translate(0," + height + ")")
//      .call(d3.axisBottom(x));
// 

  g20.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", function(d) { 
        
        if(d.home=="West Ham" && d.scored>(Math.abs(d.conceded)))
        return "bar westham won whuwon"; 
        
        else if(d.home=="West Ham" && d.scored<(Math.abs(d.conceded)))
        return "bar westham lost whulost";
      
        else if(d.home=="West Ham" && (Math.abs(d.conceded))==d.scored)
        return "bar westham draw whudraw";
      
      
        else if(Math.abs(d.conceded)<d.scored)
        return "bar awayteam won whulost";
        
        else if(Math.abs(d.conceded)==d.scored)
        return "bar awayteam draw whudraw";
         
        else return "bar awayteam lost whuwon"; 
    
    
    })
      .attr("x", function(d) { return x(d.week); })
      .attr("y", function(d) { return y(d.scored); })
      .attr("rx", xRadius)
      .attr("ry", yRadius)   
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.scored); })
      .on('mouseover', function(d){
							    
                            div.style("opacity", 1)
							    .style("left", (d3.event.pageX+10) + "px")
							    .style("top", (d3.event.pageY-30) + "px")
                                .transition()
                                .duration(200)
                                .style("display", null)
							    .text(d.date+":  "+d.home + " " + d.scored + "-" + Math.abs(d.conceded)+ " " + d.away);	
                                

    })
    .on("mouseout", function(d) {
      
            div.transition()
               .duration(500)
               .style("display", "none");	
        				});
    
    g20.selectAll(".bar2")
    .data(data)
    .enter().append("rect")
      .attr("class", function(d) { 
        
        if(d.away=="West Ham" && (Math.abs(d.conceded))>d.scored)
        return "bar westham won whuwon"; 
        
        else if(d.away=="West Ham" && (Math.abs(d.conceded))<d.scored)
        return "bar westham lost whulost";
        
        else if(d.away=="West Ham" && (Math.abs(d.conceded))==d.scored)
        return "bar westham draw whudraw";
       
        else if((Math.abs(d.conceded))<d.scored)
        return "bar awayteam lost whuwon";
        
        else if((Math.abs(d.conceded))==d.scored)
        return "bar awayteam draw whudraw";
       
        else return "bar awayteam won whulost"; 
    
    
    })
      .attr("x", function(d) { return x(d.week); })
      .attr("y", function(d) { return y(Math.max(0, d.conceded)); }) 
      .attr("rx", xRadius)
      .attr("ry", yRadius)   
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return Math.abs(y(d.conceded)- y(0)); })
      .on('mouseover', function(d){

                                div.style("opacity", 1)
							    .style("left", (d3.event.pageX+10) + "px")
							    .style("top", (d3.event.pageY-30) + "px")
                                .transition()
                                .duration(200)
                                .style("display", null)
							    .text(d.date+":  "+d.home + " " + d.scored + "-" + Math.abs(d.conceded)+ " " + d.away);	
                                
    })
    .on("mouseout", function(d) {
      

            div.transition()
               .duration(500)
               .style("display", "none");
							
        				}); 
});
   

/////////////////////////////////////////////////////////////////////
/*
Helps add a focus element to the button that is clicked, i.e. the state that is activated; This has been done for each team rather than a generic manner to make the selections independent across the teams. The methods have been commented on only for the first instance.
*/

////////////////////LeicesterActive/////////////////
$("#leicesterplayed").click(function(){
    
    //Removes all the borders from all the buttons by removing "activate" class
    $("#leicesterwon").removeClass("activate");
    $("#leicesterdraw").removeClass("activate");
    $("#leicesterlost").removeClass("activate");
    $("#leicesterplayed").removeClass("activate");
    
     //Adds the border to the button that's been clicked by adding "activate" class
    $(this).addClass("activate");

});
    
$("#leicesterwon").click(function(){
    $("#leicesterwon").removeClass("activate");
    $("#leicesterdraw").removeClass("activate");
    $("#leicesterlost").removeClass("activate");
    $("#leicesterplayed").removeClass("activate");
    
    $(this).addClass("activate");

});

$("#leicesterdraw").click(function(){

    $("#leicesterwon").removeClass("activate");
    $("#leicesterdraw").removeClass("activate");
    $("#leicesterlost").removeClass("activate");
    $("#leicesterplayed").removeClass("activate");
    
    $(this).addClass("activate");

});

$("#leicesterlost").click(function(){

   
    $("#leicesterwon").removeClass("activate");
    $("#leicesterdraw").removeClass("activate");
    $("#leicesterlost").removeClass("activate");
    $("#leicesterplayed").removeClass("activate");
    
   
    $(this).addClass("activate");

});


    
////////////////////ArsenalActive/////////////////
$("#arsenalplayed").click(function(){
    $("#arsenalwon").removeClass("activate");
    $("#arsenaldraw").removeClass("activate");
    $("#arsenallost").removeClass("activate");
    $("#arsenalplayed").removeClass("activate");
    $(this).addClass("activate");

});
    
$("#arsenalwon").click(function(){
    $("#arsenalwon").removeClass("activate");
    $("#arsenaldraw").removeClass("activate");
    $("#arsenallost").removeClass("activate");
    $("#arsenalplayed").removeClass("activate");
    
    $(this).addClass("activate");

});

$("#arsenaldraw").click(function(){

    $("#arsenalwon").removeClass("activate");
    $("#arsenaldraw").removeClass("activate");
    $("#arsenallost").removeClass("activate");
    $("#arsenalplayed").removeClass("activate");
    
    $(this).addClass("activate");

});

$("#arsenallost").click(function(){

    
    $("#arsenalwon").removeClass("activate");
    $("#arsenaldraw").removeClass("activate");
    $("#arsenallost").removeClass("activate");
    $("#arsenalplayed").removeClass("activate");
    

    $(this).addClass("activate");

});


////////////////////tottenhamActive/////////////////
$("#tottenhamplayed").click(function(){
    $("#tottenhamwon").removeClass("activate");
    $("#tottenhamdraw").removeClass("activate");
    $("#tottenhamlost").removeClass("activate");
    $("#tottenhamplayed").removeClass("activate");
    $(this).addClass("activate");

});
    
$("#tottenhamwon").click(function(){
    $("#tottenhamwon").removeClass("activate");
    $("#tottenhamdraw").removeClass("activate");
    $("#tottenhamlost").removeClass("activate");
    $("#tottenhamplayed").removeClass("activate");
    
    $(this).addClass("activate");

});

$("#tottenhamdraw").click(function(){

    $("#tottenhamwon").removeClass("activate");
    $("#tottenhamdraw").removeClass("activate");
    $("#tottenhamlost").removeClass("activate");
    $("#tottenhamplayed").removeClass("activate");
    
    $(this).addClass("activate");

});

$("#tottenhamlost").click(function(){

    
    $("#tottenhamwon").removeClass("activate");
    $("#tottenhamdraw").removeClass("activate");
    $("#tottenhamlost").removeClass("activate");
    $("#tottenhamplayed").removeClass("activate");
    
  
    $(this).addClass("activate");

});



////////////////////mancityActive/////////////////
$("#mancityplayed").click(function(){
    $("#mancitywon").removeClass("activate");
    $("#mancitydraw").removeClass("activate");
    $("#mancitylost").removeClass("activate");
    $("#mancityplayed").removeClass("activate");
    $(this).addClass("activate");

});
    
$("#mancitywon").click(function(){
    $("#mancitywon").removeClass("activate");
    $("#mancitydraw").removeClass("activate");
    $("#mancitylost").removeClass("activate");
    $("#mancityplayed").removeClass("activate");
    
    $(this).addClass("activate");

});

$("#mancitydraw").click(function(){

    $("#mancitywon").removeClass("activate");
    $("#mancitydraw").removeClass("activate");
    $("#mancitylost").removeClass("activate");
    $("#mancityplayed").removeClass("activate");
    
    $(this).addClass("activate");

});

$("#mancitylost").click(function(){

    
    $("#mancitywon").removeClass("activate");
    $("#mancitydraw").removeClass("activate");
    $("#mancitylost").removeClass("activate");
    $("#mancityplayed").removeClass("activate");
    
    $(this).addClass("activate");

});


////////////////////manunitedActive/////////////////
$("#manunitedplayed").click(function(){
    $("#manunitedwon").removeClass("activate");
    $("#manuniteddraw").removeClass("activate");
    $("#manunitedlost").removeClass("activate");
    $("#manunitedplayed").removeClass("activate");
    $(this).addClass("activate");

});
    
$("#manunitedwon").click(function(){
    $("#manunitedwon").removeClass("activate");
    $("#manuniteddraw").removeClass("activate");
    $("#manunitedlost").removeClass("activate");
    $("#manunitedplayed").removeClass("activate");
    
    $(this).addClass("activate");

});

$("#manuniteddraw").click(function(){

    $("#manunitedwon").removeClass("activate");
    $("#manuniteddraw").removeClass("activate");
    $("#manunitedlost").removeClass("activate");
    $("#manunitedplayed").removeClass("activate");
    
    $(this).addClass("activate");

});

$("#manunitedlost").click(function(){

    $("#manunitedwon").removeClass("activate");
    $("#manuniteddraw").removeClass("activate");
    $("#manunitedlost").removeClass("activate");
    $("#manunitedplayed").removeClass("activate");
    
    $(this).addClass("activate");

});


////////////////////SouthamptonActive/////////////////
$("#southamptonplayed").click(function(){
    $("#southamptonwon").removeClass("activate");
    $("#southamptondraw").removeClass("activate");
    $("#southamptonlost").removeClass("activate");
    $("#southamptonplayed").removeClass("activate");
    $(this).addClass("activate");

});
    
$("#southamptonwon").click(function(){
    $("#southamptonwon").removeClass("activate");
    $("#southamptondraw").removeClass("activate");
    $("#southamptonlost").removeClass("activate");
    $("#southamptonplayed").removeClass("activate");
    
    $(this).addClass("activate");

});

$("#southamptondraw").click(function(){

    $("#southamptonwon").removeClass("activate");
    $("#southamptondraw").removeClass("activate");
    $("#southamptonlost").removeClass("activate");
    $("#southamptonplayed").removeClass("activate");
    
    $(this).addClass("activate");

});

$("#southamptonlost").click(function(){

    //We remove all the borders from all the buttons
    $("#southamptonwon").removeClass("activate");
    $("#southamptondraw").removeClass("activate");
    $("#southamptonlost").removeClass("activate");
    $("#southamptonplayed").removeClass("activate");
    
    //Wwe add the border to the button that's been clicked
    $(this).addClass("activate");

});



////////////////////WestHamActive/////////////////
$("#westhamplayed").click(function(){
    $("#westhamwon").removeClass("activate");
    $("#westhamdraw").removeClass("activate");
    $("#westhamlost").removeClass("activate");
    $("#westhamplayed").removeClass("activate");
    $(this).addClass("activate");

});
    
$("#westhamwon").click(function(){
    $("#westhamwon").removeClass("activate");
    $("#westhamdraw").removeClass("activate");
    $("#westhamlost").removeClass("activate");
    $("#westhamplayed").removeClass("activate");
    
    $(this).addClass("activate");

});

$("#westhamdraw").click(function(){

    $("#westhamwon").removeClass("activate");
    $("#westhamdraw").removeClass("activate");
    $("#westhamlost").removeClass("activate");
    $("#westhamplayed").removeClass("activate");
    
    $(this).addClass("activate");

});

$("#westhamlost").click(function(){

    $("#westhamwon").removeClass("activate");
    $("#westhamdraw").removeClass("activate");
    $("#westhamlost").removeClass("activate");
    $("#westhamplayed").removeClass("activate");
    
    $(this).addClass("activate");

});


////////////////////LiverpoolActive/////////////////
$("#liverpoolplayed").click(function(){
    $("#liverpoolwon").removeClass("activate");
    $("#liverpooldraw").removeClass("activate");
    $("#liverpoollost").removeClass("activate");
    $("#liverpoolplayed").removeClass("activate");
    $(this).addClass("activate");

});
    
$("#liverpoolwon").click(function(){
    $("#liverpoolwon").removeClass("activate");
    $("#liverpooldraw").removeClass("activate");
    $("#liverpoollost").removeClass("activate");
    $("#liverpoolplayed").removeClass("activate");
    
    $(this).addClass("activate");

});

$("#liverpooldraw").click(function(){

    $("#liverpoolwon").removeClass("activate");
    $("#liverpooldraw").removeClass("activate");
    $("#liverpoollost").removeClass("activate");
    $("#liverpoolplayed").removeClass("activate");
    
    $(this).addClass("activate");

});

$("#liverpoollost").click(function(){

    $("#liverpoolwon").removeClass("activate");
    $("#liverpooldraw").removeClass("activate");
    $("#liverpoollost").removeClass("activate");
    $("#liverpoolplayed").removeClass("activate");
    
    $(this).addClass("activate");

});


////////////////////StokeActive/////////////////
$("#stokeplayed").click(function(){
    $("#stokewon").removeClass("activate");
    $("#stokedraw").removeClass("activate");
    $("#stokelost").removeClass("activate");
    $("#stokeplayed").removeClass("activate");
    $(this).addClass("activate");

});
    
$("#stokewon").click(function(){
    $("#stokewon").removeClass("activate");
    $("#stokedraw").removeClass("activate");
    $("#stokelost").removeClass("activate");
    $("#stokeplayed").removeClass("activate");
    
    $(this).addClass("activate");

});

$("#stokedraw").click(function(){
    $("#stokewon").removeClass("activate");
    $("#stokedraw").removeClass("activate");
    $("#stokelost").removeClass("activate");
    $("#stokeplayed").removeClass("activate");
    
    $(this).addClass("activate");

});

$("#stokelost").click(function(){
    $("#stokewon").removeClass("activate");
    $("#stokedraw").removeClass("activate");
    $("#stokelost").removeClass("activate");
    $("#stokeplayed").removeClass("activate");
    
    $(this).addClass("activate");

});

////////////////////ChelseaActive/////////////////
$("#chelseaplayed").click(function(){
    $("#chelseawon").removeClass("activate");
    $("#chelseadraw").removeClass("activate");
    $("#chelsealost").removeClass("activate");
    $("#chelseaplayed").removeClass("activate");
    $(this).addClass("activate");

});
    
$("#chelseawon").click(function(){
    $("#chelseawon").removeClass("activate");
    $("#chelseadraw").removeClass("activate");
    $("#chelsealost").removeClass("activate");
    $("#chelseaplayed").removeClass("activate");
    
    $(this).addClass("activate");

});

$("#chelseadraw").click(function(){
    $("#chelseawon").removeClass("activate");
    $("#chelseadraw").removeClass("activate");
    $("#chelsealost").removeClass("activate");
    $("#chelseaplayed").removeClass("activate");
    
    $(this).addClass("activate");

});

$("#chelsealost").click(function(){
    $("#chelseawon").removeClass("activate");
    $("#chelseadraw").removeClass("activate");
    $("#chelsealost").removeClass("activate");
    $("#chelseaplayed").removeClass("activate");
    
    $(this).addClass("activate");

});


////////////////////SunderlandActive/////////////////
$("#sunderlandplayed").click(function(){
    $("#sunderlandwon").removeClass("activate");
    $("#sunderlanddraw").removeClass("activate");
    $("#sunderlandlost").removeClass("activate");
    $("#sunderlandplayed").removeClass("activate");
    $(this).addClass("activate");

});
    
$("#sunderlandwon").click(function(){
    $("#sunderlandwon").removeClass("activate");
    $("#sunderlanddraw").removeClass("activate");
    $("#sunderlandlost").removeClass("activate");
    $("#sunderlandplayed").removeClass("activate");
    
    $(this).addClass("activate");

});

$("#sunderlanddraw").click(function(){
    $("#sunderlandwon").removeClass("activate");
    $("#sunderlanddraw").removeClass("activate");
    $("#sunderlandlost").removeClass("activate");
    $("#sunderlandplayed").removeClass("activate");
    
    $(this).addClass("activate");

});

$("#sunderlandlost").click(function(){
    $("#sunderlandwon").removeClass("activate");
    $("#sunderlanddraw").removeClass("activate");
    $("#sunderlandlost").removeClass("activate");
    $("#sunderlandplayed").removeClass("activate");
    
    $(this).addClass("activate");

});


////////////////////WatfordActive/////////////////
$("#watfordplayed").click(function(){
    $("#watfordwon").removeClass("activate");
    $("#watforddraw").removeClass("activate");
    $("#watfordlost").removeClass("activate");
    $("#watfordplayed").removeClass("activate");
    $(this).addClass("activate");

});
    
$("#watfordwon").click(function(){
    $("#watfordwon").removeClass("activate");
    $("#watforddraw").removeClass("activate");
    $("#watfordlost").removeClass("activate");
    $("#watfordplayed").removeClass("activate");
    
    $(this).addClass("activate");

});

$("#watforddraw").click(function(){
    $("#watfordwon").removeClass("activate");
    $("#watforddraw").removeClass("activate");
    $("#watfordlost").removeClass("activate");
    $("#watfordplayed").removeClass("activate");
    
    $(this).addClass("activate");

});

$("#watfordlost").click(function(){
    $("#watfordwon").removeClass("activate");
    $("#watforddraw").removeClass("activate");
    $("#watfordlost").removeClass("activate");
    $("#watfordplayed").removeClass("activate");
    
    $(this).addClass("activate");

});


////////////////////SwanseaActive/////////////////
$("#swanseaplayed").click(function(){
    $("#swanseawon").removeClass("activate");
    $("#swanseadraw").removeClass("activate");
    $("#swansealost").removeClass("activate");
    $("#swanseaplayed").removeClass("activate");
    $(this).addClass("activate");

});
    
$("#swanseawon").click(function(){
    $("#swanseawon").removeClass("activate");
    $("#swanseadraw").removeClass("activate");
    $("#swansealost").removeClass("activate");
    $("#swanseaplayed").removeClass("activate");
    
    $(this).addClass("activate");

});

$("#swanseadraw").click(function(){
    $("#swanseawon").removeClass("activate");
    $("#swanseadraw").removeClass("activate");
    $("#swansealost").removeClass("activate");
    $("#swanseaplayed").removeClass("activate");
    
    $(this).addClass("activate");

});

$("#swansealost").click(function(){
    $("#swanseawon").removeClass("activate");
    $("#swanseadraw").removeClass("activate");
    $("#swansealost").removeClass("activate");
    $("#swanseaplayed").removeClass("activate");
    
    $(this).addClass("activate");

});


////////////////////WestbromActive/////////////////
$("#westbromplayed").click(function(){
    $("#westbromwon").removeClass("activate");
    $("#westbromdraw").removeClass("activate");
    $("#westbromlost").removeClass("activate");
    $("#westbromplayed").removeClass("activate");
    $(this).addClass("activate");

});
    
$("#westbromwon").click(function(){
    $("#westbromwon").removeClass("activate");
    $("#westbromdraw").removeClass("activate");
    $("#westbromlost").removeClass("activate");
    $("#westbromplayed").removeClass("activate");
    
    $(this).addClass("activate");

});

$("#westbromdraw").click(function(){
    $("#westbromwon").removeClass("activate");
    $("#westbromdraw").removeClass("activate");
    $("#westbromlost").removeClass("activate");
    $("#westbromplayed").removeClass("activate");
    
    $(this).addClass("activate");

});

$("#westbromlost").click(function(){
    $("#westbromwon").removeClass("activate");
    $("#westbromdraw").removeClass("activate");
    $("#westbromlost").removeClass("activate");
    $("#westbromplayed").removeClass("activate");
    
    $(this).addClass("activate");

});



////////////////////CrystalPalaceActive/////////////////
$("#crystalpalaceplayed").click(function(){
    $("#crystalpalacewon").removeClass("activate");
    $("#crystalpalacedraw").removeClass("activate");
    $("#crystalpalacelost").removeClass("activate");
    $("#crystalpalaceplayed").removeClass("activate");
    $(this).addClass("activate");

});
    
$("#crystalpalacewon").click(function(){
    $("#crystalpalacewon").removeClass("activate");
    $("#crystalpalacedraw").removeClass("activate");
    $("#crystalpalacelost").removeClass("activate");
    $("#crystalpalaceplayed").removeClass("activate");
    
    $(this).addClass("activate");

});

$("#crystalpalacedraw").click(function(){
    $("#crystalpalacewon").removeClass("activate");
    $("#crystalpalacedraw").removeClass("activate");
    $("#crystalpalacelost").removeClass("activate");
    $("#crystalpalaceplayed").removeClass("activate");
    
    $(this).addClass("activate");

});

$("#crystalpalacelost").click(function(){
    $("#crystalpalacewon").removeClass("activate");
    $("#crystalpalacedraw").removeClass("activate");
    $("#crystalpalacelost").removeClass("activate");
    $("#crystalpalaceplayed").removeClass("activate");
    
    $(this).addClass("activate");

});

////////////////////BournemouthActive/////////////////
$("#bournemouthplayed").click(function(){
    $("#bournemouthwon").removeClass("activate");
    $("#bournemouthdraw").removeClass("activate");
    $("#bournemouthlost").removeClass("activate");
    $("#bournemouthplayed").removeClass("activate");
    $(this).addClass("activate");

});
    
$("#bournemouthwon").click(function(){
    $("#bournemouthwon").removeClass("activate");
    $("#bournemouthdraw").removeClass("activate");
    $("#bournemouthlost").removeClass("activate");
    $("#bournemouthplayed").removeClass("activate");
    
    $(this).addClass("activate");

});

$("#bournemouthdraw").click(function(){
    $("#bournemouthwon").removeClass("activate");
    $("#bournemouthdraw").removeClass("activate");
    $("#bournemouthlost").removeClass("activate");
    $("#bournemouthplayed").removeClass("activate");
    
    $(this).addClass("activate");

});

$("#bournemouthlost").click(function(){
    $("#bournemouthwon").removeClass("activate");
    $("#bournemouthdraw").removeClass("activate");
    $("#bournemouthlost").removeClass("activate");
    $("#bournemouthplayed").removeClass("activate");
    
    $(this).addClass("activate");

});


////////////////////NewcastleActive/////////////////
$("#newcastleplayed").click(function(){
    $("#newcastlewon").removeClass("activate");
    $("#newcastledraw").removeClass("activate");
    $("#newcastlelost").removeClass("activate");
    $("#newcastleplayed").removeClass("activate");
    $(this).addClass("activate");

});
    
$("#newcastlewon").click(function(){
    $("#newcastlewon").removeClass("activate");
    $("#newcastledraw").removeClass("activate");
    $("#newcastlelost").removeClass("activate");
    $("#newcastleplayed").removeClass("activate");
    
    $(this).addClass("activate");

});

$("#newcastledraw").click(function(){
    $("#newcastlewon").removeClass("activate");
    $("#newcastledraw").removeClass("activate");
    $("#newcastlelost").removeClass("activate");
    $("#newcastleplayed").removeClass("activate");
    
    $(this).addClass("activate");

});

$("#newcastlelost").click(function(){
    $("#newcastlewon").removeClass("activate");
    $("#newcastledraw").removeClass("activate");
    $("#newcastlelost").removeClass("activate");
    $("#newcastleplayed").removeClass("activate");
    
    $(this).addClass("activate");

});


////////////////////NorwichActive/////////////////
$("#norwichplayed").click(function(){
    $("#norwichwon").removeClass("activate");
    $("#norwichdraw").removeClass("activate");
    $("#norwichlost").removeClass("activate");
    $("#norwichplayed").removeClass("activate");
    $(this).addClass("activate");

});
    
$("#norwichwon").click(function(){
    $("#norwichwon").removeClass("activate");
    $("#norwichdraw").removeClass("activate");
    $("#norwichlost").removeClass("activate");
    $("#norwichplayed").removeClass("activate");
    
    $(this).addClass("activate");

});

$("#norwichdraw").click(function(){
    $("#norwichwon").removeClass("activate");
    $("#norwichdraw").removeClass("activate");
    $("#norwichlost").removeClass("activate");
    $("#norwichplayed").removeClass("activate");
    
    $(this).addClass("activate");

});

$("#norwichlost").click(function(){
    $("#norwichwon").removeClass("activate");
    $("#norwichdraw").removeClass("activate");
    $("#norwichlost").removeClass("activate");
    $("#norwichplayed").removeClass("activate");
    
    $(this).addClass("activate");

});


////////////////////AstonVillaActive/////////////////
$("#astonvillaplayed").click(function(){
    $("#astonvillawon").removeClass("activate");
    $("#astonvilladraw").removeClass("activate");
    $("#astonvillalost").removeClass("activate");
    $("#astonvillaplayed").removeClass("activate");
    $(this).addClass("activate");

});
    
$("#astonvillawon").click(function(){
    $("#astonvillawon").removeClass("activate");
    $("#astonvilladraw").removeClass("activate");
    $("#astonvillalost").removeClass("activate");
    $("#astonvillaplayed").removeClass("activate");
    
    $(this).addClass("activate");

});

$("#astonvilladraw").click(function(){
    $("#astonvillawon").removeClass("activate");
    $("#astonvilladraw").removeClass("activate");
    $("#astonvillalost").removeClass("activate");
    $("#astonvillaplayed").removeClass("activate");
    
    $(this).addClass("activate");

});

$("#astonvillalost").click(function(){
    $("#astonvillawon").removeClass("activate");
    $("#astonvilladraw").removeClass("activate");
    $("#astonvillalost").removeClass("activate");
    $("#astonvillaplayed").removeClass("activate");
    
    $(this).addClass("activate");

});


////////////////////EvertonActive/////////////////
$("#evertonplayed").click(function(){
    $("#evertonwon").removeClass("activate");
    $("#evertondraw").removeClass("activate");
    $("#evertonlost").removeClass("activate");
    $("#evertonplayed").removeClass("activate");
    $(this).addClass("activate");

});
    
$("#evertonwon").click(function(){
    $("#evertonwon").removeClass("activate");
    $("#evertondraw").removeClass("activate");
    $("#evertonlost").removeClass("activate");
    $("#evertonplayed").removeClass("activate");
    
    $(this).addClass("activate");

});

$("#evertondraw").click(function(){
    $("#evertonwon").removeClass("activate");
    $("#evertondraw").removeClass("activate");
    $("#evertonlost").removeClass("activate");
    $("#evertonplayed").removeClass("activate");
    
    $(this).addClass("activate");

});

$("#evertonlost").click(function(){
    $("#evertonwon").removeClass("activate");
    $("#evertondraw").removeClass("activate");
    $("#evertonlost").removeClass("activate");
    $("#evertonplayed").removeClass("activate");
    
    $(this).addClass("activate");

});






////////////ToggleFunctionsForView////////////////
/*
Filters which control what state to show on the canvas: 4 options: PLAYED, WIN, DRAW, LOSS
Filters are independent across teams 
*/



var win=1, draw=0.55, loss=0.2;



function showArsenalPlayed(){
    d3.selectAll('.bar.arsenal.won.arswon').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.bar.awayteam.lost.arswon').transition().duration(toggleTime).style("opacity", 0.25);
    d3.selectAll('.arsdraw').transition().duration(toggleTime).style("opacity", 0.55);
    d3.selectAll('.arslost').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.arsenal.lost').transition().duration(toggleTime).style("opacity", 0.2);

}



function showArsenalWon (){
   
    d3.selectAll('.arslost').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.arsdraw').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.bar.arsenal.won.arswon').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.bar.awayteam.lost.arswon').transition().duration(toggleTime).style("opacity", 0.25);

}   
    
    
function showArsenalDraw(){
  
    d3.selectAll('.arslost').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.arsdraw').transition().duration(toggleTime).style("opacity", 0.55);
    d3.selectAll('.arswon').transition().duration(toggleTime).style("opacity", 0);

}   
    
    
function showArsenalLost(){
   
    d3.selectAll('.arslost').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.arsenal.lost').transition().duration(toggleTime).style("opacity", 0.2);
    d3.selectAll('.arsdraw').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.arswon').transition().duration(toggleTime).style("opacity", 0);
}       
    

///////////Aston Villa///////////  

function showAstonVillaPlayed (){
    
    d3.selectAll('.bar.astonvilla.won.asvwon').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.bar.awayteam.lost.asvwon').transition().duration(toggleTime).style("opacity", 0.25);
    d3.selectAll('.asvdraw').transition().duration(toggleTime).style("opacity", 0.55);
    d3.selectAll('.asvlost').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.astonvilla.lost').transition().duration(toggleTime).style("opacity", 0.2);
}   

function showAstonVillaWon (){
    d3.selectAll('.asvlost').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.asvdraw').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.bar.astonvilla.won.asvwon').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.bar.awayteam.lost.asvwon').transition().duration(toggleTime).style("opacity", 0.25);
   
}   
    
    
function showAstonVillaDraw(){
    d3.selectAll('.asvlost').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.asvdraw').transition().duration(toggleTime).style("opacity", 0.55);
    d3.selectAll('.asvwon').transition().duration(toggleTime).style("opacity", 0);
}   
    
    
function showAstonVillaLost(){
    d3.selectAll('.asvlost').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.astonvilla.lost').transition().duration(toggleTime).style("opacity", 0.2);
    d3.selectAll('.asvdraw').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.asvwon').transition().duration(toggleTime).style("opacity", 0);
} 


///////////Bournemouth///////////  

function showBournemouthPlayed (){
    d3.selectAll('.bar.bournemouth.won.bouwon').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.bar.awayteam.lost.bouwon').transition().duration(toggleTime).style("opacity", 0.25);
    d3.selectAll('.boulost').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.bournemouth.lost').transition().duration(toggleTime).style("opacity", 0.2);
    d3.selectAll('.boudraw').transition().duration(toggleTime).style("opacity", 0.55);    
}  

function showBournemouthWon (){
    d3.selectAll('.boulost').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.boudraw').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.bar.bournemouth.won.bouwon').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.bar.awayteam.lost.bouwon').transition().duration(toggleTime).style("opacity", 0.25);
}   
    
    
function showBournemouthDraw(){
    d3.selectAll('.boulost').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.boudraw').transition().duration(toggleTime).style("opacity", 0.55);
    d3.selectAll('.bouwon').transition().duration(toggleTime).style("opacity", 0);
}   
    
    
function showBournemouthLost(){
    d3.selectAll('.boulost').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.bournemouth.lost').transition().duration(toggleTime).style("opacity", 0.2);
    d3.selectAll('boudraw').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.bouwon').transition().duration(toggleTime).style("opacity", 0);
} 


///////////Chelsea///////////  
function showChelseaPlayed(){
    
    d3.selectAll('.bar.chelsea.won.chewon').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.bar.awayteam.lost.chewon').transition().duration(toggleTime).style("opacity", 0.25);
    d3.selectAll('.chedraw').transition().duration(toggleTime).style("opacity", 0.55);
     d3.selectAll('.chelost').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.chelsea.lost').transition().duration(toggleTime).style("opacity", 0.2);
}   
  

function showChelseaWon(){
    d3.selectAll('.chelost').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.chedraw').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.bar.chelsea.won.chewon').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.bar.awayteam.lost.chewon').transition().duration(toggleTime).style("opacity", 0.25);
}   
    
  
function showChelseaDraw(){
    d3.selectAll('.chelost').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.chedraw').transition().duration(toggleTime).style("opacity", 0.55);
    d3.selectAll('.chewon').transition().duration(toggleTime).style("opacity", 0);
}   
    
function showChelseaLost(){
    d3.selectAll('.chelost').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.chelsea.lost').transition().duration(toggleTime).style("opacity", 0.2);
    d3.selectAll('.chedraw').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.chewon').transition().duration(toggleTime).style("opacity", 0);
}

///////////Crystal Palace///////////  
function showCrystalPalacePlayed (){
    
    d3.selectAll('.bar.crystalpalace.won.cpwon').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.bar.awayteam.lost.cpwon').transition().duration(toggleTime).style("opacity", 0.25);
    d3.selectAll('.cpdraw').transition().duration(toggleTime).style("opacity", 0.55);
    d3.selectAll('.cplost').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.crystalpalace.lost').transition().duration(toggleTime).style("opacity", 0.2);
} 

function showCrystalPalaceWon (){
    d3.selectAll('.cplost').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.cpdraw').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.bar.crystalpalace.won.cpwon').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.bar.awayteam.lost.cpwon').transition().duration(toggleTime).style("opacity", 0.25);
}   
    
    
function showCrystalPalaceDraw(){
    d3.selectAll('.cplost').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.cpdraw').transition().duration(toggleTime).style("opacity", 0.55);
    d3.selectAll('.cpwon').transition().duration(toggleTime).style("opacity", 0);
}   
    
    
function showCrystalPalaceLost(){
    d3.selectAll('.cplost').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.crystalpalace.lost').transition().duration(toggleTime).style("opacity", 0.2);
    d3.selectAll('.cpdraw').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.cpwon').transition().duration(toggleTime).style("opacity", 0);
} 


///////////Everton///////////  
function showEvertonPlayed (){

    d3.selectAll('.bar.everton.won.evewon').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.bar.awayteam.lost.evewon').transition().duration(toggleTime).style("opacity", 0.25);
    d3.selectAll('.evedraw').transition().duration(toggleTime).style("opacity", 0.55);
    d3.selectAll('.evelost').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.everton.lost').transition().duration(toggleTime).style("opacity", 0.2);
}  

function showEvertonWon (){
    d3.selectAll('.evelost').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.evedraw').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.bar.everton.won.evewon').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.bar.awayteam.lost.evewon').transition().duration(toggleTime).style("opacity", 0.25);
    
}   
    
    
function showEvertonDraw(){
    d3.selectAll('.evelost').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.evedraw').transition().duration(toggleTime).style("opacity", 0.55);
    d3.selectAll('.evewon').transition().duration(toggleTime).style("opacity", 0);
}   
    
    
function showEvertonLost(){
    d3.selectAll('.evelost').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.everton.lost').transition().duration(toggleTime).style("opacity", 0.2);
    d3.selectAll('.evedraw').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.evewon').transition().duration(toggleTime).style("opacity", 0);
} 


///////////Leicester///////////

function showLeicesterPlayed (){

    d3.selectAll('.bar.leicester.won.leiwon').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.bar.awayteam.lost.leiwon').transition().duration(toggleTime).style("opacity", 0.25);
     d3.selectAll('.leidraw').transition().duration(toggleTime).style("opacity", 0.55);
     d3.selectAll('.leilost').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.leicester.lost').transition().duration(toggleTime).style("opacity", 0.2);
} 

function showLeicesterWon (){
    d3.selectAll('.leilost').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.leidraw').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.bar.leicester.won.leiwon').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.bar.awayteam.lost.leiwon').transition().duration(toggleTime).style("opacity", 0.25);
   
}   
    
    
function showLeicesterDraw(){
    d3.selectAll('.leilost').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.leidraw').transition().duration(toggleTime).style("opacity", 0.55);
    d3.selectAll('.leiwon').transition().duration(toggleTime).style("opacity", 0);
}   
    
    
function showLeicesterLost(){
    d3.selectAll('.leilost').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.leicester.lost').transition().duration(toggleTime).style("opacity", 0.2);
    d3.selectAll('.leidraw').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.leiwon').transition().duration(toggleTime).style("opacity", 0);
} 

    

///////////Liverpool///////////  

function showLiverpoolPlayed(){
   
    d3.selectAll('.bar.liverpool.won.livwon').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.bar.awayteam.lost.livwon').transition().duration(toggleTime).style("opacity", 0.25);
     d3.selectAll('.livdraw').transition().duration(toggleTime).style("opacity", 0.55);
    d3.selectAll('.livlost').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.liverpool.lost').transition().duration(toggleTime).style("opacity", 0.2);
} 

function showLiverpoolWon(){
    d3.selectAll('.livlost').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.livdraw').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.bar.liverpool.won.livwon').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.bar.awayteam.lost.livwon').transition().duration(toggleTime).style("opacity", 0.25);
    
}   
    
    
function showLiverpoolDraw(){
    d3.selectAll('.livlost').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.livdraw').transition().duration(toggleTime).style("opacity", 0.55);
    d3.selectAll('.livwon').transition().duration(toggleTime).style("opacity", 0);
}   
    
    
function showLiverpoolLost(){
    d3.selectAll('.livlost').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.liverpool.lost').transition().duration(toggleTime).style("opacity", 0.2);
    d3.selectAll('.livdraw').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.livwon').transition().duration(toggleTime).style("opacity", 0);
} 
    

///////////Man City/////////// 

function showManCityPlayed(){
    
    d3.selectAll('.bar.manchestercity.won.mcwon').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.bar.awayteam.lost.mcwon').transition().duration(toggleTime).style("opacity", 0.25);
     d3.selectAll('.mcdraw').transition().duration(toggleTime).style("opacity", 0.55);
     d3.selectAll('.mclost').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.manchestercity.lost').transition().duration(toggleTime).style("opacity", 0.2);
} 

function showManCityWon (){
    d3.selectAll('.mclost').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.mcdraw').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.bar.manchestercity.won.mcwon').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.bar.awayteam.lost.mcwon').transition().duration(toggleTime).style("opacity", 0.25);
}   
    
    
function showManCityDraw(){
    d3.selectAll('.mclost').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.mcdraw').transition().duration(toggleTime).style("opacity", 0.55);
    d3.selectAll('.mcwon').transition().duration(toggleTime).style("opacity", 0);
}   
    
    
function showManCityLost(){
    d3.selectAll('.mclost').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.manchestercity.lost').transition().duration(toggleTime).style("opacity", 0.2);
    d3.selectAll('.mcdraw').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.mcwon').transition().duration(toggleTime).style("opacity", 0);
} 
    

///////////Man United///////////  

function showManUnitedPlayed (){
    
    d3.selectAll('.bar.manchesterunited.won.muwon').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.bar.awayteam.lost.muwon').transition().duration(toggleTime).style("opacity", 0.25);
    d3.selectAll('.mudraw').transition().duration(toggleTime).style("opacity", 0.55);
    d3.selectAll('.mulost').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.manchesterunited.lost').transition().duration(toggleTime).style("opacity", 0.2);
}  

function showManUnitedWon (){
    d3.selectAll('.mulost').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.mudraw').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.bar.manchesterunited.won.muwon').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.bar.awayteam.lost.muwon').transition().duration(toggleTime).style("opacity", 0.25);
}   
    
    
function showManUnitedDraw(){
    d3.selectAll('.mulost').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.mudraw').transition().duration(toggleTime).style("opacity", 0.55);
    d3.selectAll('.muwon').transition().duration(toggleTime).style("opacity", 0);
}   
    
    
function showManUnitedLost(){
    d3.selectAll('.mulost').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.manchesterunited.lost').transition().duration(toggleTime).style("opacity", 0.2);
    d3.selectAll('.mudraw').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.muwon').transition().duration(toggleTime).style("opacity", 0);
} 


///////////Newcastle///////////
function showNewcastleUnitedPlayed (){
    d3.selectAll('.bar.newcastle.won.nuwon').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.bar.awayteam.lost.nuwon').transition().duration(toggleTime).style("opacity", 0.25);
    d3.selectAll('.nudraw').transition().duration(toggleTime).style("opacity", 0.55);
    d3.selectAll('.nulost').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.newcastle.lost').transition().duration(toggleTime).style("opacity", 0.2);
}   
    

function showNewcastleUnitedWon (){
    d3.selectAll('.nulost').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.nudraw').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.bar.newcastle.won.nuwon').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.bar.awayteam.lost.nuwon').transition().duration(toggleTime).style("opacity", 0.25);
}   
    
    
function showNewcastleUnitedDraw(){
    d3.selectAll('.nulost').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.nudraw').transition().duration(toggleTime).style("opacity", 0.55);
    d3.selectAll('.nuwon').transition().duration(toggleTime).style("opacity", 0);
}   
    
    
function showNewcastleUnitedLost(){
    d3.selectAll('.nulost').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.newcastle.lost').transition().duration(toggleTime).style("opacity", 0.2);
    d3.selectAll('.nudraw').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.nuwon').transition().duration(toggleTime).style("opacity", 0);
} 
   
///////////Norwich///////////  
function showNorwichPlayed (){
    d3.selectAll('.bar.norwich.won.norwichwon').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.bar.awayteam.lost.norwichwon').transition().duration(toggleTime).style("opacity", 0.25);
    d3.selectAll('.norwichdraw').transition().duration(toggleTime).style("opacity", 0.55);
    d3.selectAll('.norwichlost').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.norwich.lost').transition().duration(toggleTime).style("opacity", 0.2);
}   

function showNorwichWon (){
    d3.selectAll('.norwichlost').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.norwichraw').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.bar.norwich.won.norwichwon').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.bar.awayteam.lost.norwichwon').transition().duration(toggleTime).style("opacity", 0.25);
}   
    
    
function showNorwichDraw(){
    d3.selectAll('.norwichlost').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.norwichdraw').transition().duration(toggleTime).style("opacity", 0.55);
    d3.selectAll('.norwichwon').transition().duration(toggleTime).style("opacity", 0);
}   
    
    
function showNorwichLost(){
    d3.selectAll('.norwichlost').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.norwich.lost').transition().duration(toggleTime).style("opacity", 0.2);
    d3.selectAll('.norwichdraw').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.norwichwon').transition().duration(toggleTime).style("opacity", 0);
}  


///////////Southampton/////////// 
function showSouthamptonPlayed (){
    d3.selectAll('.bar.southampton.won.souwon').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.bar.awayteam.lost.souwon').transition().duration(toggleTime).style("opacity", 0.25);
    d3.selectAll('.soudraw').transition().duration(toggleTime).style("opacity", 0.55);
    d3.selectAll('.soulost').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.southampton.lost').transition().duration(toggleTime).style("opacity", 0.2);
} 

function showSouthamptonWon (){
    d3.selectAll('.soulost').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.soudraw').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.bar.southampton.won.souwon').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.bar.awayteam.lost.souwon').transition().duration(toggleTime).style("opacity", 0.25);
}   
    
    
function showSouthamptonDraw(){
    d3.selectAll('.soulost').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.soudraw').transition().duration(toggleTime).style("opacity", 0.55);
    d3.selectAll('.souwon').transition().duration(toggleTime).style("opacity", 0);
}   
    
    
function showSouthamptonLost(){
    d3.selectAll('.soulost').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.southampton.lost').transition().duration(toggleTime).style("opacity", 0.2);
    d3.selectAll('.soudraw').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.souwon').transition().duration(toggleTime).style("opacity", 0);
}  

///////////Stoke///////////  
function showStokePlayed (){
    d3.selectAll('.bar.stoke.won.stokewon').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.bar.awayteam.lost.stokewon').transition().duration(toggleTime).style("opacity", 0.25);
    d3.selectAll('.stokedraw').transition().duration(toggleTime).style("opacity", 0.55);
    d3.selectAll('.stokelost').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.stoke.lost').transition().duration(toggleTime).style("opacity", 0.2);
}  

function showStokeWon (){
    d3.selectAll('.stokelost').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.stokedraw').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.bar.stoke.won.stokewon').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.bar.awayteam.lost.stokewon').transition().duration(toggleTime).style("opacity", 0.25);
}   
    
    
function showStokeDraw(){
    d3.selectAll('.stokelost').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.stokedraw').transition().duration(toggleTime).style("opacity", 0.55);
    d3.selectAll('.stokewon').transition().duration(toggleTime).style("opacity", 0);
}   
    
    
function showStokeLost(){
    d3.selectAll('.stokelost').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.stoke.lost').transition().duration(toggleTime).style("opacity", 0.2);
    d3.selectAll('.stokedraw').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.stokewon').transition().duration(toggleTime).style("opacity", 0);
}  


///////////Sunderland/////////// 
function showSunderlandPlayed(){

    d3.selectAll('.bar.sunderland.won.sunwon').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.bar.awayteam.lost.sunwon').transition().duration(toggleTime).style("opacity", 0.25);
    d3.selectAll('.sundraw').transition().duration(toggleTime).style("opacity", 0.55);
    d3.selectAll('.sunlost').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.sunderland.lost').transition().duration(toggleTime).style("opacity", 0.2);
}   

function showSunderlandWon (){
    d3.selectAll('.sunlost').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.sundraw').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.bar.sunderland.won.sunwon').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.bar.awayteam.lost.sunwon').transition().duration(toggleTime).style("opacity", 0.25);
}   
    
    
function showSunderlandDraw(){
    d3.selectAll('.sunlost').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.sundraw').transition().duration(toggleTime).style("opacity", 0.55);
    d3.selectAll('.sunwon').transition().duration(toggleTime).style("opacity", 0);
}   
    
    
function showSunderlandLost(){
    d3.selectAll('.sunlost').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.sunderland.lost').transition().duration(toggleTime).style("opacity", 0.2);
    d3.selectAll('.sundraw').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.sunwon').transition().duration(toggleTime).style("opacity", 0);
}  


///////////Swansea///////////  
function showSwanseaPlayed (){
    d3.selectAll('.bar.swansea.won.swawon').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.bar.awayteam.lost.swawon').transition().duration(toggleTime).style("opacity", 0.25);
    d3.selectAll('.swadraw').transition().duration(toggleTime).style("opacity", 0.55);
    d3.selectAll('.swalost').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.swansea.lost').transition().duration(toggleTime).style("opacity", 0.2);
}   

function showSwanseaWon (){
    d3.selectAll('.swalost').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.swadraw').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.bar.swansea.won.swawon').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.bar.awayteam.lost.swawon').transition().duration(toggleTime).style("opacity", 0.25);
}   
    
    
function showSwanseaDraw(){
    d3.selectAll('.swalost').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.swadraw').transition().duration(toggleTime).style("opacity", 0.55);
    d3.selectAll('.swawon').transition().duration(toggleTime).style("opacity", 0);
}   
    
    
function showSwanseaLost(){
    d3.selectAll('.swalost').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.swansea.lost').transition().duration(toggleTime).style("opacity", 0.2);
    d3.selectAll('.swadraw').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.swawon').transition().duration(toggleTime).style("opacity", 0);
}  


///////////Tottenham///////////  
function showTottenhamPlayed (){
  
    d3.selectAll('.bar.tottenham.won.totwon').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.bar.awayteam.lost.totwon').transition().duration(toggleTime).style("opacity", 0.25);
    d3.selectAll('.totdraw').transition().duration(toggleTime).style("opacity", 0.55);
    d3.selectAll('.totlost').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.tottenham.lost').transition().duration(toggleTime).style("opacity", 0.2);
}  

function showTottenhamWon (){
    d3.selectAll('.totlost').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.totdraw').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.bar.tottenham.won.totwon').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.bar.awayteam.lost.totwon').transition().duration(toggleTime).style("opacity", 0.25);
}   
    
    
function showTottenhamDraw(){
    d3.selectAll('.totlost').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.totdraw').transition().duration(toggleTime).style("opacity", 0.55);
    d3.selectAll('.totwon').transition().duration(toggleTime).style("opacity", 0);
}   
    
    
function showTottenhamLost(){
    d3.selectAll('.totlost').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.tottenham.lost').transition().duration(toggleTime).style("opacity", 0.2);
    d3.selectAll('.totdraw').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.totwon').transition().duration(toggleTime).style("opacity", 0);
} 


///////////Watford/////////// 
function showWatfordPlayed (){
   
    d3.selectAll('.bar.watford.won.watwon').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.bar.awayteam.lost.watwon').transition().duration(toggleTime).style("opacity", 0.25);
    d3.selectAll('.watdraw').transition().duration(toggleTime).style("opacity", 0.55);
     d3.selectAll('.watlost').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.watford.lost').transition().duration(toggleTime).style("opacity", 0.2);
} 

function showWatfordWon (){
    d3.selectAll('.watlost').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.watdraw').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.bar.watford.won.watwon').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.bar.awayteam.lost.watwon').transition().duration(toggleTime).style("opacity", 0.25);
    
}   
    
    
function showWatfordDraw(){
    d3.selectAll('.watlost').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.watdraw').transition().duration(toggleTime).style("opacity", 0.55);
    d3.selectAll('.watwon').transition().duration(toggleTime).style("opacity", 0);
}   
    
    
function showWatfordLost(){
    d3.selectAll('.watlost').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.watford.lost').transition().duration(toggleTime).style("opacity", 0.2);
    d3.selectAll('.watdraw').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.watwon').transition().duration(toggleTime).style("opacity", 0);
}  

///////////WestBrom///////////  
function showWestBromPlayed(){
    d3.selectAll('.bar.westbrom.won.wbawon').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.bar.awayteam.lost.wbawon').transition().duration(toggleTime).style("opacity", 0.25);
    d3.selectAll('.wbadraw').transition().duration(toggleTime).style("opacity", 0.55);
    d3.selectAll('.wbalost').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.westbrom.lost').transition().duration(toggleTime).style("opacity", 0.2);
} 

function showWestBromWon (){
    d3.selectAll('.wbalost').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.wbadraw').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.bar.westbrom.won.wbawon').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.bar.awayteam.lost.wbawon').transition().duration(toggleTime).style("opacity", 0.25);
}   
    
    
function showWestBromDraw(){
    d3.selectAll('.wbalost').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.wbadraw').transition().duration(toggleTime).style("opacity", 0.55);
    d3.selectAll('.wbawon').transition().duration(toggleTime).style("opacity", 0);
}   
    
    
function showWestBromLost(){
    d3.selectAll('.wbalost').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.westbrom.lost').transition().duration(toggleTime).style("opacity", 0.2);
    d3.selectAll('.wbadraw').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.wbawon').transition().duration(toggleTime).style("opacity", 0);
}

///////////WestHam/////////// 
function showWestHamPlayed (){
    d3.selectAll('.bar.westham.won.whuwon').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.bar.awayteam.lost.whuwon').transition().duration(toggleTime).style("opacity", 0.25);
    d3.selectAll('.whudraw').transition().duration(toggleTime).style("opacity", 0.55);
    d3.selectAll('.whulost').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.westham.lost').transition().duration(toggleTime).style("opacity", 0.2);
} 

function showWestHamWon (){
    d3.selectAll('.whulost').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.whudraw').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.bar.westham.won.whuwon').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.bar.awayteam.lost.whuwon').transition().duration(toggleTime).style("opacity", 0.25);
}   
    
    
function showWestHamDraw(){
    d3.selectAll('.whulost').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.whudraw').transition().duration(toggleTime).style("opacity", 0.55);
    d3.selectAll('.whuwon').transition().duration(toggleTime).style("opacity", 0);
}   
    
    
function showWestHamLost(){
    d3.selectAll('.whulost').transition().duration(toggleTime).style("opacity", 1);
    d3.selectAll('.westham.lost').transition().duration(toggleTime).style("opacity", 0.2);
    d3.selectAll('.whudraw').transition().duration(toggleTime).style("opacity", 0);
    d3.selectAll('.whuwon').transition().duration(toggleTime).style("opacity", 0);
}
 


