import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import './graficas.css';

// Registrar los componentes necesarios de Chart.js
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const Graficas = ({ userId }) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [temperatureData, setTemperatureData] = useState({});
    const [humidityData, setHumidityData] = useState({});
    const [sleepData, setSleepData] = useState({});
    const temperatureChartRef = useRef(null);
    const humidityChartRef = useRef(null);
    const sleepChartRef = useRef(null);
    const [temperatureOptions, setTemperatureOptions] = useState({});
    const [humidityOptions, setHumidityOptions] = useState({});
    const [sleepOptions, setSleepOptions] = useState({});

    const handleHomeClick = (event) => {
        event.preventDefault();
        navigate('/');
    };

    const handleRegistroClick = (event) => {
        event.preventDefault();
        navigate('/graficas');
    };

    const handleContactosClick = (event) => {
        event.preventDefault();
        navigate('/contactos');
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const fetchClimateData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/datos`);
                let  data = response.data;

                data = data.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));



                const recentData = data.slice(-7)

                const labels = recentData.map(d => d.fecha.split('T')[0]);
                const temperatureValues = data.map(d => d.temperatura);
                const humidityValues = data.map(d => d.humedad);
                
                // Opciones comunes para ambas gráficas
            const commonOptions = {
                scales: {
                    x: {
                        ticks: {
                            color: 'black', // Color de las etiquetas del eje X
                            font:{
                                size: 14,
                            }
                        },
                    },
                    y: {
                        ticks: {
                            color: 'black', // Color de las etiquetas del eje Y
                            font:{
                                size: 14,
                            }
                        },
                    },
                },
                plugins: {
                    legend: {
                        labels: {
                            color: 'black', // Color de las etiquetas de la leyenda
                            font:{
                                size: 14,
                            }
                        },
                    },
                },
            };


                // Establecer datos de temperatura
                setTemperatureData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Temperatura (°C)',
                            data: temperatureValues,
                            backgroundColor: 'rgba(255,99,132,0.2)',
                            borderColor: 'rgba(255,99,132,1)',
                            borderWidth: 1,
                            fill: true,
                        },
                    ],
                });
                setTemperatureOptions(commonOptions);

                // Establecer datos de humedad
                setHumidityData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Humedad (%)',
                            data: humidityValues,
                            backgroundColor: 'rgba(54,162,235,0.2)',
                            borderColor: 'rgba(54,162,235,1)',
                            borderWidth: 1,
                            fill: true,
                        },
                    ],
                });
                setHumidityOptions(commonOptions);

            } catch (error) {
                console.error('Error al obtener datos climáticos:', error);
            }
        };

        const fetchSleepData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/datos`);
                let data = response.data;

                data = data.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

                data = data.filter(d => d.horas_sueno >= 0 && d.horas_sueno < 10);

                const recentData = data.slice(-7)

                const labels = recentData.map(d => d.fecha.split('T')[0]);
                const sleepHoursData = data.map(d => d.horas_sueno);

                const commonOptions = {
                    scales: {
                        x: {
                            ticks: {
                                color: 'black', // Color de las etiquetas del eje X
                                font:{
                                    size: 14,
                                }
                            },
                        },
                        y: {
                            ticks: {
                                color: 'black', // Color de las etiquetas del eje Y
                                font:{
                                    size: 14,
                                }
                            },
                        },
                    },
                    plugins: {
                        legend: {
                            labels: {
                                color: 'black', // Color de las etiquetas de la leyenda
                                font:{
                                    size: 14,
                                }
                            },
                        },
                    },
                };

                setSleepData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Horas de sueño',
                            data: sleepHoursData,
                            backgroundColor: 'rgba(75,192,192,0.4)',
                            borderColor: 'rgba(75,192,192,1)',
                            borderWidth: 1,
                            fill: true,
                        },
                    ],
                });
                setSleepOptions(commonOptions);
            } catch (error) {
                console.error('Error al obtener datos de sueño:', error);
            }
        };

        fetchClimateData();
        fetchSleepData();
    }, []); // Se agrega una dependencia vacía para evitar llamadas continuas

    return (
        <div className="graficas-container">
            <nav className="navbar5">
                <div className="navbar-logo">
                    <span>
                        SLEEP
                        <img src="logo.png" alt="Logo" className="logo-image" />
                        TRACK
                    </span>
                </div>
                <button className="hamburguesa" onClick={toggleMenu}>
                    <div className={`line ${isOpen ? 'open' : ''}`}></div>
                    <div className={`line ${isOpen ? 'open' : ''}`}></div>
                    <div className={`line ${isOpen ? 'open' : ''}`}></div>
                </button>
                <ul className={`navbar-links5 ${isOpen ? 'open' : ''}`}>
                    <li><a href="#" className="active" onClick={handleHomeClick}>INICIO</a></li>
                    <li><a href="#" onClick={handleRegistroClick}>DASHBOARD</a></li>
                    <li><a href="#" onClick={handleContactosClick}>CONTACTANOS</a></li>
                </ul>
            </nav>
            <div className="contenido">
                <div className="seccion-grafica">
                    <h2>Temperatura</h2>
                    {temperatureData && temperatureData.labels && temperatureData.labels.length > 0 ? (
                        <Line ref={temperatureChartRef} data={temperatureData} options={temperatureOptions}/>
                    ) : (
                        <p>Cargando datos de temperatura...</p>
                    )}
                </div>
                <div className="seccion-grafica">
                    <h2>Humedad</h2>
                    {humidityData && humidityData.labels && humidityData.labels.length > 0 ? (
                        <Line ref={humidityChartRef} data={humidityData} options={humidityOptions} />
                    ) : (
                        <p>Cargando datos de humedad...</p>
                    )}
                </div>
                <div className="seccion-grafica">
                    <h2>Horas de Sueño</h2>
                    {sleepData && sleepData.labels && sleepData.labels.length > 0 ? (
                        <Line ref={sleepChartRef} data={sleepData} options={sleepOptions} />
                    ) : (
                        <p>Cargando datos de horas de sueño...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Graficas;
