import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const note = req.body.newNote;
  const newPost = new PostMessage(note);

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const _id = req.params.id;
  const note = req.body.updatedPost;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, note, {
    new: true,
  });
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await PostMessage.findByIdAndDelete(id);
    res.status(200).json(`${id} has been deleted`);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
