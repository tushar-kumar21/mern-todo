const router = require('express').Router();

const todoItemsModel = require('../models/todoItems');

router.post("/api/item", async (req, res) => {

    const { title, description, category, dueDate, status } = req.body;

    try {
      const newItem = new todoItemsModel({
        title:title,
        description:description,
        category:category,
        dueDate:dueDate,
        status:status
      });
      const saveItem = await newItem.save();
      res.status(200).json(saveItem); 
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

router.get('/api/items',async(req,res)=>{
    try{
        const allTodoItems = await todoItemsModel.find({});
        res.status(200).json(allTodoItems)
    }catch(err){
        res.json(err);
    }
})

router.put("/api/item/:id", async(req,res)=>{
    try{
          const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id,{$set:req.body});
          res.status(200).json('Item Updated');
    }catch(err){
        res.json(err);
    }
})

router.delete('/api/item/:id', async (req,res)=>{
    try{
        const deleteItem = await todoItemsModel.findByIdAndDelete(req.params.id);
        res.status(200).json('Items Deleted');
    }catch(err){
        res.json(err);
    }
})

module.exports = router;