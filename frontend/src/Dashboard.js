import { useState, useEffect } from "react";
import axios from 'axios';

const Dashboard = () => {
    const [usage, setUsage] = useState([]);
    const getUsage = async () => {
        const res = await axios.get('http://localhost:8000/api/monitor/cpu/get_usage');
        const data = res.data;
        setUsage(data.message);
    }
    useEffect(() => {
        getUsage();
    }, [])
    return (
        <div>
            <div>Dashboard</div>
            <div>CPU Usage: {usage}%</div>
        </div>

    )
}

export default Dashboard;