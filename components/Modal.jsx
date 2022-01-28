// RECOIL
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { postsState } from "../atoms/postAtom";
// REACT
import { useEffect, useRef, useState } from "react";
// ASSETS
import { FaCamera } from "react-icons/fa";
// FIREBASE
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
  query,
  getDocs,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadString } from "firebase/storage";
// NEXT AUTH
import { useSession } from "next-auth/react";
function Modal() {
  const { data: session } = useSession();
  const [posts, setPosts] = useRecoilState(postsState);
  const [open, setOpen] = useRecoilState(modalState);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const filePickerRef = useRef(null);
  const captionRef = useRef(null);

  const uploadPost = async () => {
    if (loading) return;

    setLoading(true);

    // CREATE REFERENCE TO DOC AND ADD IT TO POSTS COLLECTION IN DB
    const docRef = await addDoc(collection(db, "posts"), {
      username: session.user.username,
      caption: captionRef.current.value,
      profileImg: session.user.image,
      timeStamp: serverTimestamp(),
    });

    // CREATE IMAGE REF IN FIREBASE STORAGE, UPLOAD IMAGE TO FIREBASE
    const imageRef = ref(storage, `posts/${docRef.id}/image`);
    await uploadString(imageRef, selectedFile, "data_url").then(
      // RETRIEVE DOWNLOAD URL FROM FIREBASE STORAGE AFTER UPLOAD COMPLETE
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);

        // ADD DOWNLOAD URL REFERENCE TO IMAGE TO DOCUMENT
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      }
    );

    // CREATE QUERY FOR DB
    const q = query(collection(db, "posts"));

    // GET DOCS WITH SPECIFIED QUERY
    const querySnapshot = await getDocs(q);
    // INIT EMPTY ARRAY IN FUNCTION SCOPE
    const posts = [];
    // PUSHES EACH DOCUMENT FROM SNAPSHOT INTO POSTS FUNCTION SCOPE ARRAY
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, data: doc.data() });
      return;
    });
    // REINITIALISE FALSE VALUES
    setOpen(false);
    setLoading(false);
    setSelectedFile(null);
    // SETS FUNCTION SCOPE POSTS TO GLOBAL STATE OBJECT
    setPosts(posts);
  };

  const addImageToPost = (e) => {
    // INTIALIZE FILE READER
    const reader = new FileReader();

    // IF THERE IS A FILE AT POSITION 0 READ FILE AS DATA URL
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    // SET SELECTED FILE IN STATE AS RESULT OF READER
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  // CLOSE MODAL
  useEffect(() => {
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    });
  }, []);

  return (
    open && (
      <div className="fixed top-0 w-full h-screen">
        <div className="w-full h-full bg-gray-800 bg-opacity-70 z-1 flex items-center justify-center">
          <div className="bg-white h-[300px] w-[300px] md:h-[400px] md:w-[400px] lg:w-[500px] lg:h-[500px] p-4 rounded-lg">
            <div className="flex flex-col items-center justify-between w-full h-full  ">
              <div className="flex flex-col items-center justify-center w-full p-2">
                {selectedFile ? (
                  <img
                    src={selectedFile}
                    alt="user-selected-image"
                    className="w-full object-contain cursor-pointer max-h-[300px]"
                    onClick={() => setSelectedFile(null)}
                  />
                ) : (
                  <div
                    className="p-3 bg-gray-200 rounded-lg mb-2 hover:scale-95 hover:transition-all cursor-pointer"
                    // SIMULATES A CLICK ON A HIDDEN REF FIELD SO WE GET A CUSTOM FILE UPLOAD BUTTON
                    onClick={() => filePickerRef.current.click()}
                  >
                    <FaCamera className="text-4xl text-blue-500" />
                  </div>
                )}
                {!selectedFile && <h1 className="font-bold">Upload a Photo</h1>}
              </div>
              {/* HIDDEN FILE BUTTON */}
              <div>
                <input
                  ref={filePickerRef}
                  type="file"
                  hidden
                  onChange={addImageToPost}
                />
              </div>
              <div className="w-full p-2">
                <input
                  type="text"
                  className="border-none mb-4 p-2 outline-none w-full text-center bg-gray-100"
                  ref={captionRef}
                  placeholder="Please enter a caption..."
                />
                <button
                  type="button"
                  disabled={!selectedFile}
                  className=" bg-blue-500 text-white  p-4 w-full rounded-lg hover:scale-95 hover:transition-all cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
                  onClick={uploadPost}
                >
                  {loading ? "Uploading" : "Upload Post"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Modal;
