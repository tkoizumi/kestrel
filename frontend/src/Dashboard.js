import { useState, useEffect } from "react";
import axios from 'axios';
import Table from './Table';

const Dashboard = () => {
    const [usage, setUsage] = useState([]);
    const [arr, setArr] = useState([]);

    const getUsage = async () => {
        const process_data = [];
        const res = await axios.get('http://167.71.101.27:8000/api/monitor/cpu/get_usage');
        const data = res.data.message;

        const arr = data.split("**");
        setUsage(arr[0]);
        if (arr) {
            arr.shift();
        }
        for (let i = 0; i < arr.length; i++) {
            let obj = {}
            let row = arr[i].split(",");
            obj["pid"] = row[0];
            obj["cmd"] = row[1];
            obj["user"] = row[2];
            obj["nice"] = row[3];
            obj["system"] = row[4];
            process_data.push(obj);
        }
        //console.log(process_data);
        setArr(process_data);
    }
    useEffect(() => {
        const interval = setInterval(getUsage, 1500);
        return () => clearInterval(interval)
    }, [])
    return (
        <div className="container">
            <div class="container mt-4">
                <div class="row">
                    <div class="col-md-12 text-center">
                        <h1 class="display-4">Server Performance</h1>
                        <p class="lead">A program to provide real-time information about your linux machines.</p>
                    </div>
                </div>
            </div>
            <div class="container mt-5">
                <div class="row">
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Type of Server</h5>
                                <p class="card-text">Ubuntu 22.04</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Server Information</h5>
                                <p class="card-text">IP Address: 167.71.101.27</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">CPU Usage</h5>
                                <p class="card-text">{usage}%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div><Table data={arr} /></div>
        </div>

    )
}

export default Dashboard;