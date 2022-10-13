const { Router } = require("express"); //destructuring
const { model, Schema } = require("mongoose"); //destructuring
const router = Router();

const noteSchema = new Schema(
  {
    title: String,
    text: String,
    date: Date,
  },
  {
    collection: "note",
    versionKey: false,
  }
);

const Note = model("note", noteSchema); //create Model

router.get("/", (req, res) => {
  res.status(200).json({
    resultCode: 20000,
    resultData: "this is note note note",
  });
});

router.get("/findall", async (req, res) => {
  //response(200) finish before findall use async await to fix

  const findall = await Note.find({});
  res.status(200).json({
    resultCode: 20000,
    resultData: findall,
  });
});

router.post("/create", async (req, res) => {
  const { title, text } = req.body; //destructuring
  console.log(title, text);
  const result = await Note.create({
    title, // title: title,  another type of destructuring
    text, // text: text,
    date: Date.now(),
  });
  res.status(201).json({
    resultCode: 20100,
    resultDescription: "create success",
    resultData: result,
  });
});

router.post("/save", async (req, res) => {
  const { title, text } = req.body; //destructuring

  const note = new Note();
  note.title = title;
  note.text = text;
  note.save();
  res.status(201).json({
    resultCode: 20100,
    resultDescription: "create success",
    resultData: note,
  });
});

router.get('/findone/:id',async (req,res)=>{
    const {id} = req.params;
    const result = await Note.findById(id);
    res.status(200).json({
        resultCode: 20000,
        resultDescription: "Success",
        resultData: result
    })
    console.log(result)
})

router.put('/update/:id',async (req,res)=>{
    const {id} = req.params;
    const {title,text} = req.body
    
    await Note.findByIdAndUpdate(id,{
        title,  // title:title,
        text    // text:text
    })
    res.status(200).json({
        resultCode: 20000,
        resultDescription: "updated",
        // resultData: find_id
    })
})

router.delete('/delete/:id',async(req,res)=>{
    const {id} = req.params;

    const find_id = await Note.findByIdAndDelete(id)
    res.status(200).json({
        resultCode: 20000,
        resultDescription: "deleted",
        resultData: find_id
    })
})

module.exports = router;
