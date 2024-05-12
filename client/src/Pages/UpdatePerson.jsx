import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Importing useParams
import { useNavigate } from 'react-router-dom'; // Importing useNavigate
import axios from 'axios';
import "./UpdatePerson.css"

const UpdatePerson = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        id: `${params.id}`,
        fullname: '',
        email: '',
        mobile: '',
        dob: '',
    });


    useEffect(() => {
        const fetchPerson = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/get-one/${params.id}`);
                const personData = response.data;
                // Parse and format the date of birth
                const dobDate = new Date(personData.dob);
                const formattedDOB = `${dobDate.getDate()}/${dobDate.getMonth() + 1}/${dobDate.getFullYear()}`;
                // Update the state with formatted DOB
                setFormData({ ...personData, dob: formattedDOB });
            } catch (error) {
                console.error('Error fetching person:', error);
            }
        };
        fetchPerson();
    }, [params.id]);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:8000/update/${params.id}`, formData);
            navigate("/");
        } catch (error) {
            console.error('Error updating person:', error);
        }
    };

    return (
        <div className="update-person-container">
            <h1>Update Person</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Full Name:
                    <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} />
                </label>

                <label>
                    Email :
                    <input type="text" name="email" value={formData.email} onChange={handleChange} />
                </label>

                <label>
                    Mobile Number:
                    <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} />
                </label>

                <label>
                    DOB:
                    <input
                        type="text"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">Update Person</button>
            </form>
        </div>
    );
};

export default UpdatePerson;
