let mongoose =require("mongoose");
mongoose.connect("mongodb://localhost/pk", { useNewUrlParser:
true, useUnifiedTopology: true })
    .then(() => console.log("connected to db"))
    .catch(error => console.log(`something went wrong ${error.message}`)
    );

    let authorSchema = new mongoose.Schema({
        name: { type: String },
        website: { type: String },
        address: { type:String },

    });

    let courseSchema = new mongoose.Schema({
        name: { type: String},
        author: { type: mongoose.Schema.Types.ObjectId,ref:"authors"}
    });

    let AuthorModel = mongoose.model("authors", authorSchema);
    let CourseModel = mongoose.model("courses", courseSchema);

    async function CreateAuthor(name,web,address) {
      let author = new AuthorModel({
          name: name,
          web: web,
          address: address
        });
        let data = await author.save();
        console.log(data);
    };
    async function CreateCourse(name,author) {
        let course  = new CourseModel({
            name: name,
            author: author
          });
          let data = await course.save();
          console.log(data);
      };

    //CreateAuthor("Rudyard", "www.rudy.com", "USA");
    //CreateCourse("Something Something part 2", "5e6f212552e95d373451ea05");


    async function AllCourseData() {
        let data = await CourseModel
        .find()
        .populate("author");
        console.log(data);

    }

    AllCourseData();
