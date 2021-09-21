const router=require("express").Router();
const { PrismaClient } = require("@prisma/client");

const { books } = new PrismaClient();

//read/see all data
router.get("/", async function(req, res){
    const names= await books.findMany({
        select: {
            id: true,
            name : true
        }
    });
      res.json(names);
});

//read/see specific data
router.get("/:id", async function(req, res){

    const { id } = req.params;

    const bookExists= await books.findUnique({
        where: {
            id: parseInt(id)
        },
        select:{
            name: true
        }
    });

    if(!bookExists)
    {
        res.status(400).json({
            msg: "ID doesn't exist"
        });
    }

    const book= await books.findFirst({
        where:{
            id : parseInt(id)
        },
        select:{
            id: true,
            name: true
        }
    });

    res.json(book);
});

//create/add a new data
router.post("/", async function(req, res){
    
    const { name } = req.body;

    const bookExists= await books.findUnique({
        where: {
            name : name
        },
        select :{
            name : true
        }
    });

    if(bookExists){
        return res.status(400).json({
            msg: "user already exists"
        })
    }

    //create
    const newUser= await books.create({
        data:{
            name: name
        }
    });

    res.json(newUser);

});

//delete data
router.delete("/:id", async function(req, res){

    const { id } = req.params;

    const bookExists= await books.findUnique({
        where: {
            id: parseInt(id)
        },
        select:{
            name: true
        }
    });

    if(!bookExists)
    {
        res.status(400).json({
            msg: "ID doesn't exist"
        });
    }

    const book= await books.delete({
        where:{
            id : parseInt(id)
        },
        select:{
            id: true,
            name: true
        }
    });

    res.json(book);
});


//put operation
router.put('/:id', async (req, res) => {

  const { id } = req.params
  const { name } = req.body;
  const book = await books.update({
    where: { id: Number(id) },
	
    data: { name },
  })
  res.json(students)
})


module.exports = router
