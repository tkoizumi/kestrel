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
            <div><h3>Dashboard</h3></div>
            <div>Server IP: 167.71.101.27</div>
            <div>CPU Usage: {usage}%</div>
            <div><Table data={arr} /></div>
        </div>

    )
}

export default Dashboard;