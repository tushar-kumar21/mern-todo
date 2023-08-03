const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { todoItemsModel, User } = require('../models/todoItems');
const bcrypt = require('bcryptjs')

console.log(todoItemsModel, User)
router.post("/api/item", async (req, res) => {

    const { title, description, category, dueDate, status } = req.body;

    try {
        const newItem = new todoItemsModel({
            title: title,
            description: description,
            category: category,
            dueDate: dueDate,
            status: status
        });
        const saveItem = await newItem.save();
        res.status(200).json(saveItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/api/items', async (req, res) => {
    try {
        const allTodoItems = await todoItemsModel.find({});
        res.status(200).json(allTodoItems)
    } catch (err) {
        res.json(err);
    }
})

router.put("/api/item/:id", async (req, res) => {
    try {
        const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id, { $set: req.body });
        res.status(200).json('Item Updated');
    } catch (err) {
        res.json(err);
    }
})

router.delete('/api/item/:id', async (req, res) => {
    try {
        const deleteItem = await todoItemsModel.findByIdAndDelete(req.params.id);
        res.status(200).json('Items Deleted');
    } catch (err) {
        res.json(err);
    }
})

router.post('/api/register', async (req, res) => {
    try {
        console.log(req.body)
        const { email, password } = req.body;

        if (!(email && password)) {
            res.status(400).send("cmpldlss")
        }
        const exisitingUser = await User.findOne({ email })
        if (exisitingUser) {
            res.status(401).send("existsujklfs")
        }

        const encPass = await bcrypt.hash(password, 10)

        const user = await User.create({
            email,
            password: encPass
        })
       const token = jwt.sign(
            {id:user._id, email},'slshdlasd',
            {
                expiresIn:'2h'
            }
        );
        user.token = token
        user.password = undefined
     
        res.status(201).json(user)

    } catch (err) {
        console.log(err)
    }
})

router.post('/api/login', async(req,res)=>{
    console.log(req.body)
    try{
        const { email, password } = req.body;

        if(!(email && password)){
           res.status(400).send('send all')
        }

        const user = await User.findOne({email})
        
        if(user && (await bcrypt.compare(password, user.password))){
            const token = jwt.sign(
                {id: user._id}, 'slshdlasd',
                {
                    expiresIn:'2h'
                }               
            )
            user.token = token
            user.password = undefined

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly:true
            }
            res.status(201).cookie("token", token, options).json({
                success: true,
                token,
                user            
            })
        }
        
    }catch(err){
        console.log(err)
    }
})

module.exports = router;