import { useState, useEffect } from "react";
import axios from 'axios';
import Table from './Table';

const Dashboard = () => {
    const [usage, setUsage] = useState([]);
    const getUsage = async () => {
        const res = await axios.get('http://167.71.101.27:8000/api/monitor/cpu/get_usage');
        const data = res.data;
        setUsage(data.message);
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
            <div><Table /></div>
        </div>

    )
}

export default Dashboard;