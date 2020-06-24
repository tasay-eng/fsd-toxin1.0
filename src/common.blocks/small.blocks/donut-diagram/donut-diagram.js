function drawPieSlice(ctx,centerX, centerY, radius, startAngle, endAngle, color ){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(centerX,centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
}
function separateWhite(ctx,centerX, centerY, startAngle){
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(centerX,centerY);
    ctx.arc(centerX, centerY, 10, startAngle, startAngle+10);
    ctx.closePath();
    ctx.fill();
}

function Piechart(options){
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.colors = options.colors;
    console.log(this.colors)
    this.draw = function(){
        let total_value = 0;
        let color_index = 0;
        for (let categ in this.options.data){
            let val = this.options.data[categ];
            total_value += val;
        }
 
        let start_angle = 0;
        for (categ in this.options.data){
            val = this.options.data[categ];
            let slice_angle = 2 * Math.PI * val / total_value;
 
            drawPieSlice(
                this.ctx,
                this.canvas.width/2,
                this.canvas.height/2,
                Math.min(this.canvas.width/2,this.canvas.height/2),
                start_angle,
                start_angle+slice_angle,
                this.colors[color_index%this.colors.length]
            );
            separateWhite(this.ctx, this.canvas.width/2, this.canvas.height/2, start_angle+slice_angle);
 
            start_angle += slice_angle;
            color_index++;
        }
 
        //drawing a white circle over the chart
        //to create the doughnut chart
        if (this.options.doughnutHoleSize){
            drawPieSlice(
                this.ctx,
                this.canvas.width/2,
                this.canvas.height/2,
                this.options.doughnutHoleSize * Math.min(this.canvas.width/2,this.canvas.height/2),
                0,
                2 * Math.PI,
                "#fff"
            );
        }
        
        //добавление легенды
        if (this.options.legend){
            color_index = 0;
            let legendHTML = "";
            for (categ in this.options.data){
                legendHTML += "<div><span style='display:inline-block;width:20px;background-color:"+this.colors[color_index++]+";'>&nbsp;</span> "+categ+"</div>";
            }
            this.options.legend.innerHTML = legendHTML;
        }
 
    }
}
var legend = document.querySelector('#d-legend')
var estimations = {
    "великолепно": 4,
    "хорошо": 2,
    "удовлетворительно": 2,
    "разочарован": 0
};

var DougnutEstime = new Piechart(
    {
        canvas:diagram,
        data:estimations,
        colors:["#fde23e","#f16e23", "#57d9ff","#937e88"],
        doughnutHoleSize:0.9,
        legend: legend
    }
);
DougnutEstime.draw();