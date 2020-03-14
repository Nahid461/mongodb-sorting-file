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
    .find();
    // .and([{name:"Emma"},{price:200}])
    //  .sort("-name")
    //  .select("-price")
    //  .limit(2);
     console.log(course);
 }
 
 //FetchCourses();


async function UpdateCourse(id) {
    // let course = await courseModel.findById(id);
    // if(!course) { return console.log("invalid id")};
    // course.name = "mani";
    // let data = await course.save();
    // console.log(data);

    // let course = await courseModel.Update({_id:id},{
    //     $set: {
    //          price:50000
    //     }
    //   }
    // );
    // console.log(course); 

    let course = await courseModel.findByIdAndUpdate(id,{
        $set: {
             price:40000
        }
      }, { new:true });
    console.log(course);
}

//UpdateCourse("5e69fa2827270a446091f2fc");

async function RemoveCourse(id){
    let course = await courseModel.findByIdAndRemove(id);
    if(!course) { return console.log("invalid id") };
    console.log("see you next time :'(");
}
//RemoveCourse("5e69fd6178e28d38ccd2ec94");