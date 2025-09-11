import express from "express";
import data from "./data/mock.json" with {type: "json"}

const app = express();

const PORT = 3000;

//using public folder at the root of the project
app.use(express.static("public"));

app.use("/images", express.static("images"));

//GET
app.get("/", (request, response) => {
    response.json(data);
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