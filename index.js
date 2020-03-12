let mongoose = require("mongoose"); 

mongoose 
    .connect("mongodb://localhost/pk", { useNewUrlParser: true,  useUnifiedTopology: true })
    .then(() => console.log("db got connected"))
    .catch(error => console.log("something went wrong", error.message));


    let courseSchema = new mongoose.Schema({
        name: {type: String},
        courses: [String],
        isPublished: { type: Boolean },
        price: {type:Number},
        date: {type: Date, default: Date.now()}
    });

    let courseModel = mongoose.model("courses", courseSchema);

    async function CreateCourse() {
        let data = new courseModel({
            name:"Emma",
            courses:["VUE.js", "frontend"],
            isPublished: true,
            price: 25000
        });

        let item = await data.save();
        console.log(item);
    };

 //CreateCourse();

 async function FetchCourses() {
     let course = await courseModel
     //.find({name:"Emma"})
     //.find({price: {$gt:100, $lte:600}})
    //  .find({price: {
    //      $in: [100,200,600]
    //  }})
    .find()
    .and([{name:"Emma"},{price:200}])
     .sort("-name")
     .select("-price")
     .limit(2);
     console.log(course);
 }
 FetchCourses();

 