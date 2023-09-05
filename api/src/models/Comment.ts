import mongoose, { Document, Schema } from "mongoose";

export type CommentDocument = Document & {
  text: string;
  link: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  createAt: Date;
};

const commentSchema = new Schema<CommentDocument>(
  {
    text: { type: String, required: true },
    link: { type: Schema.Types.ObjectId, ref: "Link", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    createAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model<CommentDocument>("Comment", commentSchema);

export default Comment;
