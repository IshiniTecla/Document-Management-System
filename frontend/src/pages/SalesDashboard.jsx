import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie, Bar, Line } from "react-chartjs-2";
import * as XLSX from "xlsx";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"
import "./SalesDashboard.css"
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
} from "chart.js";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement
);

export const SalesDashboard = () => {
    const [salesData, setSalesData] = useState([]);
    const [file, setFile] = useState(null);

    // Fetch sales data from backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/sales");
                setSalesData(response.data);
            } catch (error) {
                console.error("Error fetching sales data:", error);
            }
        };
        fetchData();
    }, []);

    // Handle file upload
    const handleFileUpload = async () => {
        if (!file) {
            alert("Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            await axios.post("http://localhost:5000/api/sales/upload", formData);
            alert("File uploaded successfully!");
            window.location.reload(); // Refresh to fetch new data
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Failed to upload file.");
        }
    };

    // Process data for Pie Chart (Sales Channel Distribution)
    const salesChannelCounts = salesData.reduce((acc, { salesChannel }) => {
        acc[salesChannel] = (acc[salesChannel] || 0) + 1;
        return acc;
    }, {});

    const salesChannelData = {
        labels: Object.keys(salesChannelCounts),
        datasets: [
            {
                label: "Sales Channel Distribution",
                data: Object.values(salesChannelCounts),
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
            },
        ],
    };

    // Bar Chart (Revenue per Region)
    const regionRevenue = salesData.reduce((acc, { region, revenue }) => {
        acc[region] = (acc[region] || 0) + revenue;
        return acc;
    }, {});

    const revenueChartData = {
        labels: Object.keys(regionRevenue),
        datasets: [
            {
                label: "Revenue (LKR)",
                data: Object.values(regionRevenue),
                backgroundColor: "#36A2EB",
            },
        ],
    };

    // Line Chart (Revenue Over Time)
    const revenueOverTime = salesData.reduce((acc, { orderDate, revenue }) => {
        const date = new Date(orderDate).toLocaleDateString();
        acc[date] = (acc[date] || 0) + revenue;
        return acc;
    }, {});

    const revenueTimeData = {
        labels: Object.keys(revenueOverTime),
        datasets: [
            {
                label: "Revenue Over Time",
                data: Object.values(revenueOverTime),
                borderColor: "#FF6384",
                backgroundColor: "rgba(255,99,132,0.2)",
                fill: true,
            },
        ],
    };

    return (
        <>
            <Navbar />
            <div className="salesdashboard-container">
                <h2>📊 Sales Dashboard</h2>

                {/* File Upload */}
                <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <button className="upload-btn" onClick={handleFileUpload}>Upload Excel</button>

                {/* Sales Charts */}
                {salesData.length > 0 && (
                    <div className="charts-container">
                        <div className="chart">
                            <h3>Sales Channel Distribution</h3>
                            <Pie data={salesChannelData} />
                        </div>

                        <div className="chart">
                            <h3>Revenue by Region</h3>
                            <Bar data={revenueChartData} />
                        </div>

                        <div className="chart">
                            <h3>Revenue Over Time</h3>
                            <Line data={revenueTimeData} />
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

