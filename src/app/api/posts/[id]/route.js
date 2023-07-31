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

    const userIndex = post.stars.data.findIndex(
      (star) => star.userName === body.userName
    );

    if (userIndex !== -1) {
      // The user has already rated, update the rating
      post.stars.data[userIndex].userValue = body.userValue;
    } else {
      // The user has not rated, add a new rating
      post.stars.data.push({
        userName: body.userName,
        userValue: body.userValue,
      });
    }

    const updatedPost = await post.save();

    return new NextResponse(JSON.stringify(updatedPost), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
