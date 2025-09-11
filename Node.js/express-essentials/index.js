import express from "express";
import data from "./data/mock.json" with {type: "json"}

const app = express();

const PORT = 3000;

//using public folder at the root of the project
app.use(express.static("public"));
//use images folder for /images route
app.use("/images", express.static("images"));

//using express.json and express.urlencoded
// app.use(express.json());
app.use(express.urlencoded({extended: true}));

//GET
app.get("/", (request, response) => {
    response.json(data);
})

//POST express.json and express.urlencoded
app.post("/item", (request, response) => {
    console.log(request.body);
    response.send(request.body);
})

//GET with next()
app.get("/next", (request, response, next) => {
        console.log("The response will be send by the next function");
        next();
    }, (requset, response) => {
        response.send("This is a route with second callback")
    }
)

//GET with routing params
app.get("/class/:id", (request, response) => {
    const studentId = Number(request.params.id);

    const student = data.filter((student) => student.id === studentId);

    response.send(student);
});

//Route chaining
//GET
app.route("/class",)
    .get((request, response) => {
        response.send("This is a GET request at /class")
    })
    .post((request, response) => {
        response.send("This is a POST request at /class")
    })
    .put((request, response) => {
        response.send("This is a PUT request at /class")
    })

//GET - redirect method
app.get("/redirect", (request, response) => {
    response.redirect("https://www.w3schools.com/");
})


//POST
app.post("/create", (request, response) => {
    response.send("This is a POST request at /create")
})

//PUT
app.put("/edit", (request, response) => {
    response.send("This is a PUT request at /edit")
})

//DELETE
app.delete("/delete", (request, response) => {
    response.send("This is a DELETE request at /delete")
})

app.listen(PORT, () => {
    console.log(`The server is running on ${PORT}`);
    console.log(data);
})