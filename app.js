const express=require('express')
const { default: mongoose, Model, Schema } = require('mongoose')
const app=express()
const bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))
app.set('view engine','ejs')
mongoose.connect('mongodb+srv://dineshstdy1:Asdfg123@cluster0.czxlchd.mongodb.net/?retryWrites=true&w=majority').then(
    console.log('connected')
)
const hema=new Schema(
    {
        title:String,
        description:String,
        duedate:Date
    }
)
const TodoModel=mongoose.model('todos',hema)
app.get('/',async(req,res)=>{
    let data=await TodoModel.find();
    res.render('home',{all:data})
})
app.get('/add',(req,res)=>{
    res.render('add')
})
app.get('/edit',async(req,res)=>{
    let data=await TodoModel.find();
    res.render('edit',{all:data})
})
app.post('/deleteOne',async(req,res)=>{
    let data=await TodoModel.deleteOne({title:req.body.mail});
    res.redirect('/')
})
app.post('/addtask',(req,res)=>{
    let task=new TodoModel({
        title:req.body.title,
        description:req.body.desc,
        duedate:req.body.type
    })
    task.save();
    res.redirect('/');
})
app.post('/e',async(req,res)=>{
    let task=await TodoModel.findOne({title:req.body.name})
    res.render('update',{all:task})
})
app.post('/update',async(req,res)=>{
    let data=await TodoModel.updateOne(
        {title:req.body.prev},
        {
            $set:{
                title:req.body.title,
                description:req.body.desc,
                duedate:req.body.type
            }
        }
    )
    res.redirect('/edit')
})
app.post('/deleteall',async(req,res)=>{
    let data=await TodoModel.deleteMany({ })
    res.redirect('add')
})
app.listen(5000,()=>{
    console.log('hello')
})