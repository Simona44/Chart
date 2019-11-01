import React, {Component} from "react"; 
import {Line} from 'react-chartjs-2'; 

class Chart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {
                labels: props.labels,                
                datasets: props.datasets
            }
        }
    }

    render(){
        return (
            <div>
                <Line
                    data= {this.state.data}
                    options = {{
                    title:{
                        display: true,
                        text: "Financial state in our Company",
                        fontSize:20
                    },
                    legend: {
                        display: true,
                        position: "bottom",           
                    }
                }} 
                />
            </div>         
        )
    }
}

export default Chart;