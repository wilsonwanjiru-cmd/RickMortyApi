import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ResidentDetails from './ResidentDetails'; // Import the component for resident details
import './App.css'; // Import CSS file for styling

function App() {
    
    const [locations, setLocations] = useState([]);
    const [query, setQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`/api/locations?name=${query}`); // Update URL to point to Flask backend
                setLocations(data.results);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [query]);

    const handleSearch = event => {
        setQuery(event.target.value);
    };

    return (
        <div className="App">
            <div className="search">
                <input
                    type="text"
                    placeholder="Search Location"
                    className="input"
                    onChange={handleSearch}
                    value={query}
                />
            </div>
            <div className="results">
                {locations && locations.map(location => ( // Add a conditional check for locations
                    <div key={location.id} className="location-card">
                        <h2>{location.name}</h2>
                        <p>Type: {location.type}</p>
                        <h3>Residents:</h3>
                        <ul>
                            {location.residents.map(residentUrl => (
                                <li key={residentUrl}>
                                    <ResidentDetails residentUrl={residentUrl} /> {/* Pass resident URL to ResidentDetails component */}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;


