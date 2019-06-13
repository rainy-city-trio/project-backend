// PROJECT BACKEND

const express = require("express")
const serverless = require("serverless-http")
const mysql=require("mysql")
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())


const connection=mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  // *** LEAVE THIS. THIS IS THE DATABASE NOT THE TABLE ***
  database:"todoapplication" 
})

//connection.connect()

// Fetch tasks - receives 
 app.get("/recipe/:id", function (request, response) {
   const ingredients=request.params.id
  const object = [ingredients,
    {
    title: 'tuna pasta bake',
    method: 'Preheat the oven to 180C/160C Fan/Gas 4. Cook the pasta in a saucepan of plenty of boiling water according to packet instructions. Drain and set aside. Meanwhile, for the sauce, melt the butter in a saucepan over a low heat and stir in the flour with a wooden spoon. Cook for 1 minute, or until the mixture darkens slightly. Slowly stir in the milk, stirring until smooth after each addition of milk. Stir in the mustard powder and continue to cook until the mixture thickens enough to coat the back of the spoon. Remove the pan from the heat and stir in most of the cheese, and all the sweetcorn, peas and spring onion. Season with salt and pepper. Stir the cooked pasta into the sauce. Spoon the tuna into the bottom of an ovenproof dish. Pour over the pasta and sauce. Tap the dish gently so the sauce pours into every nook and cranny. Sprinkle over the remaining grated cheese. Bake for 15-20 minutes, or until the sauce is bubbling and the top is a golden-brown. Serve immediately.',
    ingredients: ['pasta', 'butter', 'plain flour', 'milk', 'strong cheddar cheese', 'tuna', 'sweetcorn', 'parsley'],
    image: 'https://rct-project.s3.eu-west-2.amazonaws.com/tuna-pasta-bake.jpg',
    url: 'www.bbcgoodfood.com/recipes/9649/tuna-pasta-bake',
    seasonal: false,
    glutenFree: false,
    vegetarian: false,
    vegan: false,
    prepTime: 30
  }, 
  {
    title: 'Cheese on toast',
    method:'Put the bread in the toaster. slice some bland cheese when bread has turned into toast (check for a hard toasted surface to the bread) thickly spread some of the butter on it whack the cheese on top and throw it under the grill for a while withdraw from under the grill when the cheese has started to melt and bubble a little and eat whilst watching the football on TV with a can of Stella',
    url: 'www.bbcgoodfood.com/recipes/8391/cheese-on-toast',
    image: 'https://rct-project.s3.eu-west-2.amazonaws.com/cheese-on-toast.jpg',
    ingredients: ["bread", "cheese", "butter", "pepper"],
    seasonal: false,
    glutenFree: false,
    vegetarian: false,
    vegan: false,
    prepTime: 20
  },
  {
    title: 'Beef Burgers',
    method: 'Tip 500g beef mince into a bowl with 1 small diced onion and 1 egg, then mix. Divide the mixture into four. Lightly wet your hands. Carefully roll the mixture into balls, each about the size of a tennis ball. Set in the palm of your hand and gently squeeze down to flatten into patties about 3cm thick. Make sure all the burgers are the same thickness so that they will cook evenly. Put on a plate, cover with cling film and leave in the fridge to firm up for at least 30 mins. Heat the barbecue to medium hot (there will be white ash over the red hot coals – about 40 mins after lighting). Lightly brush 1 side of each burger with vegetable oil. Place the burgers, oil-side down, on the barbecue. Cook for 5 mins until the meat is lightly charred. Don’t move them around or they may stick. Oil the other side, then turn over using tongs. Don’t press down on the meat, as that will squeeze out the juices. Cook for 5 mins more for medium. If you like your burgers pink in the middle, cook 1 min less each side. For well done, cook 1 min more. Take the burgers off the barbecue. Leave to rest on a plate so that all the juices can settle inside. Slice 4 burger buns in half. Place, cut-side down, on the barbecue rack and toast for 1 min until they are lightly charred. Place a burger inside each bun, then top with your choice of accompaniment.',
    url: 'www.bbcgoodfood.com/recipes/1514/beef-burgers-learn-to-make',
    image: 'https://rct-project.s3.eu-west-2.amazonaws.com/beef-burgers.jpg',
    ingredients: ["onion", "beef mince", "egg", "burger buns","vegetable oil"],
    seasonal: false,
    glutenFree: false,
    vegetarian: false,
    vegan: false,
    prepTime: 20
  }
  ];
  
  
  response.send(object);
  });
  //   connection.query("SELECT * FROM Tasks", function(err,result,fields) {
  //  if (err!==null) {
  //    console.log("error fetching tasks", err)
  //    response.send(500)
  //  } else
  //     // response.json({ tasks:result })
  //     response.send({
  //       title: "Cheese on Toast",
  //       ingredients: "cheese, bread",
  //       url: "www.bbc.co.uk"
  //     })
  //   })
  // })


//Create new tasks
app.post("/recipe", function(request, response){
  const object = [{
    title: 'tuna pasta bake',
    method: 'Preheat the oven to 180C/160C Fan/Gas 4. Cook the pasta in a saucepan of plenty of boiling water according to packet instructions. Drain and set aside. Meanwhile, for the sauce, melt the butter in a saucepan over a low heat and stir in the flour with a wooden spoon. Cook for 1 minute, or until the mixture darkens slightly. Slowly stir in the milk, stirring until smooth after each addition of milk. Stir in the mustard powder and continue to cook until the mixture thickens enough to coat the back of the spoon. Remove the pan from the heat and stir in most of the cheese, and all the sweetcorn, peas and spring onion. Season with salt and pepper. Stir the cooked pasta into the sauce. Spoon the tuna into the bottom of an ovenproof dish. Pour over the pasta and sauce. Tap the dish gently so the sauce pours into every nook and cranny. Sprinkle over the remaining grated cheese. Bake for 15-20 minutes, or until the sauce is bubbling and the top is a golden-brown. Serve immediately.',
    ingredients: ['pasta', 'butter', 'plain flour', 'milk', 'strong cheddar cheese', 'tuna', 'sweetcorn', 'parsley'],
    image: 'https://rct-project.s3.eu-west-2.amazonaws.com/tuna-pasta-bake.jpg',
    url: 'www.bbcgoodfood.com/recipes/9649/tuna-pasta-bake',
    seasonal: false,
    glutenFree: false,
    vegetarian: false,
    vegan: false,
    prepTime: 30
  }, 
  {
    title: 'Cheese on toast',
    method:'Put the bread in the toaster. slice some bland cheese when bread has turned into toast (check for a hard toasted surface to the bread) thickly spread some of the butter on it whack the cheese on top and throw it under the grill for a while withdraw from under the grill when the cheese has started to melt and bubble a little and eat whilst watching the football on TV with a can of Stella',
    url: 'www.bbcgoodfood.com/recipes/8391/cheese-on-toast',
    image: 'https://rct-project.s3.eu-west-2.amazonaws.com/cheese-on-toast.jpg',
    ingredients: ["bread", "cheese", "butter", "pepper"],
    seasonal: false,
    glutenFree: false,
    vegetarian: false,
    vegan: false,
    prepTime: 20
  },
  {
    title: 'Beef Burgers',
    method: 'Tip 500g beef mince into a bowl with 1 small diced onion and 1 egg, then mix. Divide the mixture into four. Lightly wet your hands. Carefully roll the mixture into balls, each about the size of a tennis ball. Set in the palm of your hand and gently squeeze down to flatten into patties about 3cm thick. Make sure all the burgers are the same thickness so that they will cook evenly. Put on a plate, cover with cling film and leave in the fridge to firm up for at least 30 mins. Heat the barbecue to medium hot (there will be white ash over the red hot coals – about 40 mins after lighting). Lightly brush 1 side of each burger with vegetable oil. Place the burgers, oil-side down, on the barbecue. Cook for 5 mins until the meat is lightly charred. Don’t move them around or they may stick. Oil the other side, then turn over using tongs. Don’t press down on the meat, as that will squeeze out the juices. Cook for 5 mins more for medium. If you like your burgers pink in the middle, cook 1 min less each side. For well done, cook 1 min more. Take the burgers off the barbecue. Leave to rest on a plate so that all the juices can settle inside. Slice 4 burger buns in half. Place, cut-side down, on the barbecue rack and toast for 1 min until they are lightly charred. Place a burger inside each bun, then top with your choice of accompaniment.',
    url: 'www.bbcgoodfood.com/recipes/1514/beef-burgers-learn-to-make',
    image: 'https://rct-project.s3.eu-west-2.amazonaws.com/beef-burgers.jpg',
    ingredients: ["onion", "beef mince", "egg", "burger buns","vegetable oil"],
    seasonal: false,
    glutenFree: false,
    vegetarian: false,
    vegan: false,
    prepTime: 20
  }
  ];
  const ing = request.body
  response.send(object,ing)

  connection.query('INSERT INTO Tasks SET?', taskToBeSaved, function (error, results, fields){
    if (error) {
      console.log("Error saving new task",error)
      response.status(500).json({
        error: error
      })
    }
    else {
      response.json({
        taskId: results.insertId})
      

    }
  })
})


// app.post("/recipe", function(request, response){
//   const taskToBeSaved = request.body
//   connection.query('INSERT INTO Tasks SET?', taskToBeSaved, function (error, results, fields){
//     if (error) {
//       console.log("Error saving new task",error)
//       response.status(500).json({
//         error: error
//       })
//     }
//     else {
//       response.json({
//         taskId: results.insertId})
//     }
//   })
// })


//UPDATE tasks
app.put("/tasks/:id", function (request, response) {
//  const customer = request.body
   const id=request.params.id
  // connection.query('UPDATE Tasks SET description = "'+taskToBeUpdated.description+'", done = '+taskToBeUpdated.completed+', userid = '+taskToBeUpdated.userid+' WHERE taskid = '+taskId, function(err, result, fields) {
    connection.query('UPDATE Tasks SET done = 1 WHERE taskId = '+id, function(err, result, fields) { 
      
       
    
      if (err!==null) {
      console.log("Something went wrong updating the task", err)
      response.send(500)
    } else {
    response.send ("Item Updated")}
  })
})

//Delete tasks
app.delete("/tasks/:id", function (request, response) {
  const id=request.params.id;
  connection.query("DELETE FROM Tasks WHERE taskId = ?", [id], function(err, result, fields) {
    if (err!==null) {
      console.log("Something went wrong deleting the task", err);
      response.send(500);
    } else {
    response.send ("Item Deleted")}
  });
});


module.exports.handler = serverless(app);

// endpoints:
// https://dfjt88pc3a.execute-api.eu-west-2.amazonaws.com/dev/recipe/{ing1:"carrots",ing2:"pasta",ing3:"minced beef",ing4:"onions"}
// GET - https://dfjt88pc3a.execute-api.eu-west-2.amazonaws.com/dev/recipe
// DELETE - https://dfjt88pc3a.execute-api.eu-west-2.amazonaws.com/dev/tasks/{ids}
// POST - https://dfjt88pc3a.execute-api.eu-west-2.amazonaws.com/dev/recipe/{ids}
// PUT - https://dfjt88pc3a.execute-api.eu-west-2.amazonaws.com/dev/tasks/{ids}



// functions:
//   tasks: project-dev-tasks


// to deploy:- serverless deploy function --function tasks
// if just the tasks file has been update you can use 'serverless deploy' on its own
  // host: "todoapplication.cfwgd2eitm3t.eu-west-2.rds.amazonaws.com",
  // user:"root",
  // password:"bradford1",