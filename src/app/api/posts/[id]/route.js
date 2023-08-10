import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Post from "@/models/Post";

export const GET = async (request, { params }) => {
  const { id } = params;

  try {
    await connect();

    const post = await Post.findById(id);

    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  const { id } = params;
  const { commentId } = await request.json(); // Получаем ID комментария, который нужно удалить

  try {
    await connect();

    await Post.findByIdAndDelete(id);

    return new NextResponse("Post has been deleted", { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const PUT = async (request, { params }) => {
  const { id } = params;

  const body = await request.json();

  try {
    await connect();

    const post = await Post.findById(id);
    if (!post) {
      return new NextResponse("Post Not Found", { status: 404 });
    }

    if (body.action === "add") {
      post.comments.push(body.commentsData);
    }

    if (body.action === "delete") {
      const commentIndex = post.comments.findIndex((comment) => {
        return comment.id.toString() === body.commentId;
      });
      if (commentIndex > -1) {
        post.comments.splice(commentIndex, 1);
      }
    }

    const updatedPost = await post.save();

    return new NextResponse(JSON.stringify(updatedPost), { status: 200 });
  } catch (err) {
    console.error(err); // This will log the error to your server console
    return new NextResponse("Database Error", { status: 500 });
  }
};
