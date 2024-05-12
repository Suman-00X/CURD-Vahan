import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// import "./AddPerson.css"

const AddPerson = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        mobile: "",
        dob: "",
    });

    const handleChange = (e) => {
        console.log("click",e.target.name);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(formData);
            await axios.post("http://localhost:8000/add", formData);
            navigate("/");
        } catch (error) {
            console.error("Error adding person:", error);
        }
    };

    return (
        <div className="add-person-container">
            <h1>Add Person</h1>
            <form onSubmit={handleSubmit}>

                <label>
                    Full Name:
                    <input type="text" name="fullname" onChange={handleChange} />
                </label>

                <label>
                    Email :
                    <input type="email" name="email" onChange={handleChange} />
                </label>

                <label>
                    Mobile Number:
                    <input type="text" name="mobile" onChange={handleChange} />
                </label>

                <label>
                    DOB:
                    <input
                        type="date"
                        id="dob"
                        name="dob"
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">Add Person</button>
            </form>
        </div>
    );
};

export default AddPerson;