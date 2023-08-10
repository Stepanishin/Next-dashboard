import mongoose from "mongoose";

const { Schema } = mongoose;

const CommentDataSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  parentId: {
    type: String || null,
    required: false,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
  },
  stars: {
    type: Number,
    required: false,
  },
});

const commentSchema = new Schema({
  data: [CommentDataSchema],
});

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
    rate: {
      type: Number,
      required: true,
    },
    comments: {
      type: [CommentDataSchema],
      default: [],
      required: false,
    },
  },
  { timestamps: true }
);

//If the Post collection does not exist create a new one.
export default mongoose.models.Post || mongoose.model("Post", postSchema);
