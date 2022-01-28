// COMP
import { collection, getDocs, query } from "firebase/firestore";

import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { postsState } from "../atoms/postAtom";
import { db } from "../firebase";
import Post from "./Post";

// DUMMY DATA

function Posts() {
  const [posts, setPosts] = useRecoilState(postsState);
  const [loading, setLoading] = useState(true);

  // GETS ALL POSTS ON COMPONENT MOUNT
  useEffect(() => {
    const fetchPosts = async () => {
      // DEFINE QUERY
      const q = query(collection(db, "posts"));

      // GET SNAPSHOT OF QUERY
      const querySnapshot = await getDocs(q);
      // DEFINE FUNCTION SCOPE ARR POSTS
      const posts = [];
      // MAP OVER QUERYSNAPSHOT RESULTS AND PUSH INTO ARRAY
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        posts.push({ id: doc.id, data: doc.data() });

        return;
      });
      setPosts(posts);
    };
    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map((post, id) => (
        // ADD IMG + USERIMG WHEN DB CONNECTED
        <Post
          key={post.id}
          id={post.id}
          username={post.data.username}
          caption={post.data.caption}
          image={post.data.image}
          profileImg={post.data.profileImg}
        />
      ))}
    </div>
  );
}

export default Posts;
