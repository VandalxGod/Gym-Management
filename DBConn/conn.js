const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://sumittutu2506_db_user:ddvbbm6po5CEdUV3@gym.vhgxlrb.mongodb.net/')
  .then(() => console.log('DB connection successful!'))
  .catch(err => {
    console.log(err)
  });

  //video 16 8:06