import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ResidentDetails({ residentUrl }) {
    const [resident, setResident] = useState(null);
    const [notes, setNotes] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const fetchResident = async () => {
            try {
                const { data } = await axios.get(`/api/residents?residentUrl=${residentUrl}`);
                if (isMounted) {
                    setResident(data);
                    const savedNotes = localStorage.getItem(`resident_${data.id}_notes`);
                    setNotes(savedNotes || ''); // Set notes from local storage if available
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchResident();

        return () => {
            isMounted = false; // Cleanup function to cancel ongoing tasks when the component is unmounted
        };
    }, [residentUrl]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        localStorage.setItem(`resident_${resident.id}_notes`, notes); // Save notes to local storage
        setIsEditing(false);
    };

    const handleChange = event => {
        setNotes(event.target.value);
    };

    if (!resident) return <div>Loading...</div>;

    return (
        <div className="resident-details">
            <img src={resident.image} alt={resident.name} />
            <p>Name: {resident.name}</p>
            <p>Status: {resident.status}</p>
            <p>Notes: {isEditing ? (
                <textarea value={notes} onChange={handleChange} />
            ) : (
                notes || 'No notes available'
            )}</p>
            {isEditing ? (
                <button onClick={handleSave}>Save</button>
            ) : (
                <button onClick={handleEdit}>Edit Notes</button>
            )}
        </div>
    );
}

export default ResidentDetails;


