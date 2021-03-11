import Note from "../models/note.js";
import mongoose from "mongoose";

export const getNotes = async (req, res) => {
  try {
    const postMessages = await Note.find({ user: req.userId });
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createNote = async (req, res) => {
  const note = req.body;
  req.body.user = req.userId;
  const newPost = new Note(note);

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateNote = async (req, res) => {
  const _id = req.params.id;
  const note = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");

  const updatedPost = await Note.findByIdAndUpdate(_id, note, {
    new: true,
  });
  res.json(updatedPost);
};

export const deleteNote = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await Note.findByIdAndDelete(id);
    res.status(200).json(id);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
