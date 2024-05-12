import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

import "./PersonList.css"

const PersonList = () => {
    const [person, setPerson] = useState([]);
    // const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchPerson = async () => {
            try {
                const response = await axios.get("http://localhost:8000/");
                setPerson(response.data);
            } catch (error) {
                console.error("Error fetching person:", error);
            }
        };
        fetchPerson();
    }, []);

    // const handleSearch = (e) => {
    //     setSearchTerm(e.target.value);
    // };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/delete/${id}`);
            const updatedPerson = person.filter((p) => p._id !== id);
            setPerson(updatedPerson);
        } catch (error) {
            console.error('Error deleting person:', error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // const filteredPerson = person.filter((p) => {
    //     return p.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    // });

    return (
        <div className="person-list-container">
            <h1>Person List</h1>
            <Link to="/add-person" className="add-person-link">Add Person</Link>

            {/* <div>
                <label>
                    Search:
                    <input type="text" onChange={handleSearch} />
                </label>
            </div> */}

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile Number</th>
                        <th>Date of Birth</th>
                        <th>Modify</th>
                        <th>Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {person.map((p) => (
                        <tr key={p._id}>
                            <td>{p.fullname}</td>
                            <td>{p.email}</td>
                            <td>{p.mobile}</td>
                            <td>{formatDate(p.dob)}</td>
                            <td>
                                <button className="modify">
                                    <Link to={`/update-person/${p._id}`}>Modify</Link>
                                </button>
                            </td>
                            <td>
                                <button className="delete" onClick={() => handleDelete(p._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PersonList;
