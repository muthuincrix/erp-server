const mongoose = require("mongoose");

const schema = mongoose.Schema(
 {
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    orgId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Org"
    },
    message:[
        {
            _id:false,
            type:{
                type: String,
                required: true
            },
            description:{
                type: String,
                required: true
            },
            status:{
                type: Boolean,
                default: false,
                required: true
            },
            title:{
                type: String,
                required: true
            },
            link:
            {
                type: String,

            }
        }
    ]
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Notification", schema);
