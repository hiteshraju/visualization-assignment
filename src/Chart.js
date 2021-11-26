import React , { useEffect , useState } from 'react';
import './css/Chart.css';
import { Line , Bar , Pie , Doughnut} from 'react-chartjs-2';
import axios from 'axios';
import ReactWordcloud from 'react-wordcloud';

function Chart() {


    const [count, setCount] = useState(null);
    const [area, setArea] = useState(null)
    const [number, setNumber] = useState(null)
    const [food, setFood] = useState(null)
    const [online, setOnline] = useState(null)
    const [total, setTotal] = useState(null)

    const options = {
        
        enableTooltip: true,
        deterministic: false,
        fontFamily: "Poppins",
        fontSizes: [25, 25],
        fontStyle: "bold",
        fontWeight: "normal",
        padding: 1,
        rotations: 3,
        rotationAngles: [0, 90],
        scale: "sqrt",
        spiral: "archimedean",
        transitionDuration: 500
      };

    const scales = {
        scales: {
            xAxes: [{
                gridLines: {
                    display:false
                }
            }],
            yAxes: [{
                gridLines: {
                    display:false
                }   
            }]
        }
    }


    useEffect(() => {

        async function info(){

            const axios = require('axios').default;

            axios.get('https://www.buyeazzy.com/Barcodes/zomato.php')
            .then(function(response) {
                console.log(response)
                setCount(response.data.count)
                setArea(response.data.area)
                setNumber(response.data.number);
                setFood(response.data.food)
                setOnline(response.data.online)
                setTotal(response.data.total)
            });
        }

        info()
        

        
    }, [])

    const labels = food;
    const data = {
    labels: labels,
    datasets: [{
        label: 'Top Cuisine Preferences in Bangalore',
        data: number,
        backgroundColor: ['#fc8019'],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
    }],
    options: {
        legend: {
            display: true,
            position: 'bottom',
            labels: {
                fontColor: '#333'
            }
        }
    }
    
    };

    const line_labels = area;
    const line_data = {
    labels: line_labels,
    datasets: [{
        label: 'Prominent Areas for eateries in Bangalore',
        data: count,
        backgroundColor: ['#670D91'],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
    }],
    
    };

    const pie_labels = online;
    const pie_data = {
    labels: pie_labels,
    datasets: [{
        label: 'Online Orders in restarants',
        data: total,
        backgroundColor: ['#0DDFB0','#0A876B'],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
    }],
    
    };

    return (
        <div className="charts">
            <h1 className="text-center mt-10 mb-10">Restaurant Analysis in Bangalore based on Zomato</h1>
            
            <div className="chart__body">
                <div className="chart__type">
                    <Bar data={data} options={scales}  />
                </div>
                <div className="chart__type">
                <Bar data={line_data}  />
                </div>
            </div>
            <div className="chart__body mt-20 mb-20">
                <div className="chart__type">
                    <Pie height="40vh" width="80vw" data={pie_data}  />
                </div>
            </div>
         
            {/* <Bar data={data} />
            <Pie data={data} /> */}
        </div>
    )
}

export default Chart
