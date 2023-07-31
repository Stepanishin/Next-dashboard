import mongoose from "mongoose";

const { Schema } = mongoose;

const starDataSchema = new Schema(
  {
    userName: {
      type: String,
    },
    userValue: {
      type: Number,
      default: 5,
    },
  },
  { _id: false }
);

const starSchema = new Schema(
  {
    value: {
      type: Number,
      default: 5,
    },
    data: [starDataSchema],
  },
  { _id: false }
);

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    stars: {
      type: starSchema,
      required: true,
    },
  },
  { timestamps: true }
);

//If the Post collection does not exist create a new one.
export default mongoose.models.Post || mongoose.model("Post", postSchema);
