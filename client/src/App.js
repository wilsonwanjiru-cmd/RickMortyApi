import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ResidentDetails from './ResidentDetails'; // Import the component for resident details

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
        <div className="flex justify-center items-center h-screen"> {/* Center all content */}
            <div className="max-w-4xl w-full px-4"> {/* Set max-width and full width */}
                <div className="mt-6 mb-4">
                    <input
                        type="text"
                        placeholder="Search Location"
                        className="w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        onChange={handleSearch}
                        value={query}
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {locations && locations.map(location => ( // Add a conditional check for locations
                        <div key={location.id} className="bg-white border border-gray-300 p-4 rounded">
                            <h2 className="text-xl font-semibold mb-2 text-center">{location.name}</h2> {/* Align text at the center */}
                            <p className="text-center">Type: {location.type}</p> {/* Align text at the center */}
                            <h3 className="mt-2 text-center">Residents:</h3> {/* Align text at the center */}
                            <ul className="list-disc pl-6">
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
        </div>
    );
}

export default App;
