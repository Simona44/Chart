import React, {Component} from "react";
import Chart from "../Chart/Chart";
import './Data.css';

class Data extends Component {

    constructor(){
        super();
        this.state = {
            daliSePodatociteProcitani: false,
            isWeeks: false
        }    
        this.onButtonClick = this.onButtonClick.bind(this);
    }
    componentDidMount() {
        fetch("./months.json", {
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }
          })
        .then(response => response.json())
        .then(data => {       
            this.parse({ data });
        });
    }
    onButtonClick() {
        this.setState({isWeeks: true, daliSePodatociteProcitani: false});
        fetch("./weeks.json", {
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }
          })
        .then(response => response.json())
        .then(data => {       
            this.parse({ data });
        });
    }
    parse(pom) {
        console.log(pom);
        let periods= pom.data.periods;  
        let period_names = [];          
        let incomes = [];          
        let expenses = [];           
        let profits = [];        

        for (let i = 0; i < periods.length; i++) {
            const single_period = periods[i];   
            period_names[i] = single_period.name;   // get name for each period and put it in the labels

            let incomes_per_period = single_period.incomes;
            let sum_of_incomes_per_period = 0;
            for (let j = 0; j < incomes_per_period.length; j++) {
                let single_income = incomes_per_period[j];
                sum_of_incomes_per_period += single_income.ammount;
            }

            let expenses_per_period = single_period.expenses;
            let sum_of_expenses_per_period = 0;
            for (let k = 0; k < expenses_per_period.length; k++) {
                let single_expense = expenses_per_period[k];
                sum_of_expenses_per_period += single_expense.ammount;
            }

            let profit = sum_of_incomes_per_period - sum_of_expenses_per_period;

            incomes[i] = sum_of_incomes_per_period;
            expenses[i] = sum_of_expenses_per_period;
            profits[i] = profit;
        }

        let datasets = [{
                label: "Income", 
                backgroundColor: "rgba(227, 38, 54, 0.25)",
                data: incomes,
                pointBorderColor: 'rgb(233, 219, 201)',
                lineTension: 0.01,
            }, {
                label: "Expenses", 
                backgroundColor: "rgba(0, 255, 0, 0.75)",
                data: expenses,
                lineTension: 0.01,
                pointBorderColor: 'rgb(233, 219, 201)'
            }, {
                label: "Profit", 
                backgroundColor: "yellow",
                data: profits,
                lineTension: 0.01,
                pointBorderColor: 'rgb(233, 219, 201)'
            }
        ];
        this.setState({period_names: period_names, datasets: datasets, daliSePodatociteProcitani: true});
    }

    render() {
        let daliSePodatociteProcitani = this.state.daliSePodatociteProcitani;
        let isWeeks = this.state.isWeeks;      
        let chart;
        if (daliSePodatociteProcitani === true) {
            chart = <Chart labels={ this.state.period_names } datasets={ this.state.datasets }/>;
        } else {
            chart = <p>Podatocite se vcituvaat</p>;
        }

        let title;
        if (isWeeks == true) {
            title = <h3 className="text header">Profit for current month</h3>;
        } else {
            title = <h3 className="text header">Profit for last 6 months for 2019</h3>;
        }
        return (
            <div className="main">

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8 col-md-offset-2">
                            { title }
                            <p className="text par">Does our company work with loss?</p> <br/>                         
                        </div>
                        <div className="row button col-md-6 col-md-offset-3">
                            <button className="btn btn-success" onClick={this.onButtonClick}>See profit for current month</button>
                        </div>
                    </div>
                    <div className="chart row" >
                       { chart }
                    </div>
                </div>
            </div>
        )
    }
}

export default Data;