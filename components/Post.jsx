// ASSETS
import { FaBookmark, FaHeart, FaPaperPlane } from "react-icons/fa";
import { BsFillChatLeftFill, BsThreeDots } from "react-icons/bs";
import { BiHappy } from "react-icons/bi";
// REACT
import { useState, useEffect } from "react";
// NEXT-AUTH
import { useSession } from "next-auth/react";
// FIREBASE
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  query,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
// MOMENT
import Moment from "react-moment";

function Post({ id, image, profileImg, caption, username }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState([]);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    // QUERYS DB FOR COMMENTS FROM POST WITH PASSED IN ID, SET COMMENTS TO STATE
    onSnapshot(query(collection(db, "posts", id, "comments")), (snapshot) =>
      setComments(snapshot.docs)
    );
  }, [db, id]);

  useEffect(
    // GET COLLECTION => DB => POSTS => ID => LIKES && SET STATE LEVEL LIKES ARR TO RESULT
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    // MAPS LIKES IF CODITION MET RETURNS TRUE/FALSE
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );

  const sendComment = async (e) => {
    e.preventDefault();
    // COPY COMMENT VAR
    const commentToSend = comment;
    setComment("");

    // ADD COMMENT TO COMMENTS COLLECTION ATTACHED TO DOCUMENT BY ID
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };

  // EITHER ADDS OR DELETES LIKE DOCUMENT FROM FIREBASE
  const sendLike = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else if (!hasLiked) {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  };

  return (
    <div className="bg-gray-100 hover:shadow-lg hover:transition-all my-8 border rounded-xl">
      {/* HEADER OF POST */}
      <header className="flex items-center justify-between w-full bg-blue px-4 py-2">
        <div className="flex items-center">
          <img
            src={profileImg}
            className="rounded-full h-14 w-14 mr-4 object-cover"
            alt="user-avatar"
          />
          <p>{username}</p>
        </div>
        <BsThreeDots className="text-2xl  hover:scale-90 hover:transition-all cursor-pointer " />
      </header>
      {/* IMAGE OF POST */}
      <img src={image} alt="post-content" className="object-contain w-full" />
      {/* FOOTER OF POST */}

      {session && (
        <div className="flex justify-between p-2">
          <div className="flex space-x-4  text-2xl">
            <FaHeart
              className={`hover:scale-95 hover:transition-all cursor-pointer ${
                hasLiked && "text-red-500"
              }`}
              onClick={sendLike}
            />
            <BsFillChatLeftFill className="hover:scale-95 hover:transition-all cursor-pointer" />
            <FaPaperPlane className="hover:scale-95 hover:transition-all cursor-pointer" />
          </div>

          <FaBookmark className="text-2xl hover:scale-95 hover:transition-all cursor-pointer" />
        </div>
      )}

      <p className="ml-2 truncate">
        {likes.length > 0 && <p className="font-bold">{likes.length} likes</p>}
      </p>

      <p className="p-2 truncate">
        <span className="font-bold mr-4">{username}</span>
        {caption}
      </p>

      {comments.length > 0 && (
        <div className="px-8 py-2 h-fit max-h-40 overflow-y-scroll">
          {comments?.map((comment) => (
            <div
              key={comment.id}
              className="my-3 flex items-center justify-between"
            >
              <div className="flex items-center w-10/12 truncate">
                <img
                  src={comment.data().userImage}
                  alt="post-body"
                  className="h-[35px] w-[35px] rounded-full mr-2"
                />
                <p>
                  <span className="font-bold mr-2">
                    {comment.data().username}
                  </span>
                  {comment.data().comment}
                </p>
              </div>
              <Moment fromNow className="text-xs">
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {session && (
        <form className="flex items-center justify-between p-2">
          <BiHappy className="text-4xl hover:scale-95 hover:transition-all cursor-pointer" />
          <input
            type="text"
            className="flex-grow mx-2 p-1 outline-none border-none"
            placeholder="Create Post"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="px-2 py-1  rounded-lg text-blue-500 hover:bg-blue-500 hover:text-white hover:transition-all"
            type="submit"
            disabled={!comment}
            onClick={sendComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
