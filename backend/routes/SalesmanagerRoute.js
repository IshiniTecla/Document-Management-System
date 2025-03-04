import express from 'express';
import bcrypt from 'bcrypt'
import Salesmanager from '../models/Salesmanager.js';
import jwt from 'jsonwebtoken'


const router = express.Router()

router.post('/', async (req, res) => {
    const { name,  NIC , email, phone , password, role, isApproved } = req.body;
    const user = await Salesmanager.findOne({ email });
    if (user) {
        return res.json({ message: "User already exists" });
        
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newSalesmanager = new Salesmanager({
        name,
        NIC,
        email,
        phone,
        password: hashPassword,
        role
    });

    await newSalesmanager.save();
    return res.json({ message: "Registered" });
});

router.get('/', async(req,res)=>{ // view all leaveagents

    try{

        const salesmanagers = await Salesmanager.find({})

        return res.status(200).json({
            
            data: salesmanagers
        })

    }catch(err){
        console.log(err.message)
        res.status(500).send({message: err.message})
    }
}) 

router.get('/:id', async(req,res)=>{ // view one 

    try{

        const {id} = req.params;
        const salesmanager = await Salesmanager.findById(id)

        return res.status(200).json({
            
            data: salesmanager
        })

    }catch(err){
        console.log(err.message)
        res.status(500).send({message: err.message})
    }
}) 

router.put('/:id', async(req, res)=>{ // update

    try {

        const {id} = req.params;
        const result = await Salesmanager.findByIdAndUpdate(id, req.body)

        if(!result){
            return res.status(404).json({message: 'complaint not found'})
        }

        return res.status(200).send({message: 'complaint update successfully'})
        
    } catch (error) {

        console.log(error.message)
        res.status(500).send({message: error.message})
        
    }
})

router.delete('/:id', async(req,res)=>{ // view one

    try{

        const {id} = req.params;
        const result = await Salesmanager.findByIdAndDelete(id)

        if(!result){
            return res.status(404).send({message:'complaint not found'})
        }

        return res.status(200).send({message: "complaint deleted successfuly"})

        
    }catch(err){
        console.log(err.message)
        res.status(500).send({message: err.message})
    }
}) 

router.post('/login', async (req, res) => { //login
    const { email, password } = req.body;
    try {
        const user = await Salesmanager.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email" });
        }
        
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Invalid password" });
        }
        
        const token = jwt.sign({ userId: user._id }, process.env.JWT, { expiresIn: '1d' });
        
        res.cookie('token', token, {
            httpOnly: true,
            // Secure: true, // Uncomment in production if served over HTTPS
            maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
            // SameSite: 'Lax' // Consider setting same-site policy based on your requirements
        });
        
        return res.json({ status: true, message: "Login successful" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get('/email/:email', async (req, res) => { // view one by email
    try {
        const email = req.params.email; // Extract email from URL params
        const salesmanager = await Salesmanager.findOne({ email:email })

        if (!salesmanager) {
            return res.status(404).json({ message: "Sales manager not found" });
        }

        return res.status(200).json({
            data: salesmanager
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});


export default router
