import { useCallback, useContext, useState } from "react";
import { TriangleAlert } from "lucide-react";
import SnackbarMessage from "../components/snackbar/SnackBarMessage";
import AddPost from "../service/uploads/NewPost";
import { AuthContext } from "../components/AuthProvider";

export default function NewPost({ onSubmit }) {
  // ===== State variables =====
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [isdisable, setDisable] = useState(true);
  const [state_msg, setStateMsg] = useState("");
  // ===== State variables =====

  // ===== Auth context =====
  const { token, setToken } = useContext(AuthContext);
  // ===== Auth context =====

  // Handles textarea input changes
  const HandleChange = (e) => {
    // Update textarea value and enable the post button
    (setText(e.target.value), setDisable(false));
  };

  // Sends the post data to the backend
  const AddPostHandler = async () => {
    console.log(text, token);

    // Call API to create a new post
     const resposne = await AddPost(text, token);
  };

  // Handles form submission
  const HandleSubmit = (e) => {
    e.preventDefault();

    // Prevent empty or whitespace-only posts
    if (text.trim().length === 0) {
      setOpen(true);
      setStateMsg("warning");
      setText("");

      // Hide warning snackbar after 3 seconds
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    } else {
      // Upload the post
      AddPostHandler();

      console.log("this time user typed something");

      // Reset textarea
      setText("");

      // Show success snackbar
      setOpen(true);
      setStateMsg("success");

      // Hide success snackbar after 3 seconds
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    }
  };


  return (
    <div className="min-h-screen bg-black p-4 flex flex-col">
      <div className="max-w-md mx-auto w-full flex flex-col flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-100 mb-2">
            Write a Post
          </h1>
          <p className="text-gray-400 text-sm">
            Share what's on your mind. It's safe here.
          </p>
        </div>

        <div className="flex-1 space-y-6 ">
          <div>
            <label className="text-sm font-semibold text-gray-300 block mb-2">
              Your Post
            </label>
            <textarea
              value={text}
              autoFocus
              onChange={HandleChange}
              placeholder="Write your thoughts here. Share honestly. Be yourself."
              className="w-full bg-[#0f0f0f] border border-gray-700 rounded-lg px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all resize-none h-40 font-medium leading-relaxed"
            />
            <div className="mt-2 flex justify-between items-center">
              <p className="text-xs text-gray-500">
                {/* {charCount} / {maxChars} characters */}
              </p>
            </div>

            <div className="my-8 space-y-3">
              {/* Submit button */}
              <button
                onClick={HandleSubmit}
                className={
                  isdisable
                    ? "w-full transition-all duration-300 bg-gray-700 text-black font-bold py-4 rounded-lg text-lg"
                    : "w-full bg-white text-black font-bold py-4 rounded-lg text-lg"
                }
              >
                Post
              </button>

              {/* Community guideline message */}
              <p className="text-center text-xs text-slate-500">
                Your posts will be shared with the community. Stay respectful.
              </p>
            </div>
          </div>
        </form>
        {/* ===== Post form ===== */}
      </div>
    </div>
  );
}