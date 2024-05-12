import Person from "../Database/models.js";


export const getAllPerson = async(req, res) => {

    console.log("get all teacher controller");

    try{
        const persons = await Person.find();
        console.log("fetched all person from database", persons);
        res.json(persons);
    }
    catch (error) {
        res.status(500).json({error : 'Internal Server Error'});
    }
}

export const getOnePerson = async(req, res) =>{

    console.log("get one person controller called");
    const {id} = req.params;
    const OnePerson = await Person.findById(id);

    try{
        if(!OnePerson){
            res.ststus(404).json({error : "The Person you are searching can't be found in the database"});
        }
        res.json(OnePerson);
    }
    catch (error) {
        res.status(500).json({error: "Internal server error"});
    }
}


export const addPerson = async(req, res) => {

    console.log("add person controller called", req.body);
    const {fullname, email, mobile, dob} = req.body;
    

    try{
        const newPerson = new Person({fullname, email, mobile, dob});
        const savedPerson = await newPerson.save();

        res.status(201).json(savedPerson);
    }
    catch (error) {
        res.status(500).json({ error : "Internal server error"});
    }
}


export const updatePerson = async(req, res) => {

    console.log("update person controller called", req.body);
    const {id} = req.params;
    const {fullname, email, mobile, dob} = req.body;

    try{
        const updatedPerson = await Person.findByIdAndUpdate(
            id,
            {
            fullname, 
            email, 
            mobile, 
            dob
            },
            {new: true}
        );
        if(!updatedPerson){
            res.status(404).json({ error: "The Person you want to update can't be found in the database" });
        }

        res.status(200).json({message: "Updated successfully"})

    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const deletePerson = async(req, res) => {
    
    console.log("delete controller called");
    const { id } = req.params;
    
    try {
      const deletedPerson = await Teacher.findByIdAndDelete(id);
      
      if (!deletedPerson) {
        return res.status(404).json({ error: 'Person not found' });
      }
      res.json({ message: 'Person deleted successfully' });
    
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
}