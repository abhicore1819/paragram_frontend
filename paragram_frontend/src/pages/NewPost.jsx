import { useCallback, useContext, useState } from "react";
import { TriangleAlert } from "lucide-react";
import SnackbarMessage from "../components/snackbar/SnackBarMessage";
import AddPost from "../service/uploads/NewPost";
import { AuthContext } from "../components/AuthProvider";
export default function NewPost({ onSubmit }) {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [isdisable, setDisable] = useState(true);
  const [state_msg, setStateMsg] = useState("");
  // ===== context data =====
  const { token, setToken } = useContext(AuthContext);
  // ===== context data =====
  const HandleChange = (e) => {
    (setText(e.target.value), setDisable(false));
  };

  const AddPostHandler = async () => {
    console.log(text, token);
    const resposne = await AddPost(text, token);
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length === 0) {
      setOpen(true);
      setStateMsg("warning");
      setText("");
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    } else {
      AddPostHandler();
      console.log("this time user typed something");
      setText("");
      setOpen(true);
      setStateMsg("success");
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    }
  };

  const curent_char = 0;
  const max_chars = 500;

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

        <form onSubmit={HandleSubmit}>
          <div className="flex-1 space-y-6 ">
            <div>
              <label className="text-sm font-semibold text-gray-300 block mb-2">
                Your Post
              </label>
              <textarea
                value={text}
                autoFocus
                onChange={HandleChange}
                maxLength={max_chars}
                placeholder="Write your thoughts here. Share honestly. Be yourself."
                className="w-full bg-[#0f0f0f] border border-gray-700 rounded-lg px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all resize-none h-40 font-medium leading-relaxed"
              />
              <div className="mt-2 flex justify-between items-center">
                <p className="text-xs text-gray-500"></p>
                {open ? (
                  state_msg === "warning" ? (
                    <SnackbarMessage
                      openstatus={open}
                      hideduration={3000}
                      severity={state_msg}
                      variant={"filled"}
                      display_message={
                        "Empty text can't be post, please type something"
                      }
                    />
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}

                {open ? (
                  state_msg === "success" ? (
                    <SnackbarMessage
                      openstatus={open}
                      hideduration={3000}
                      severity={state_msg}
                      variant={"filled"}
                      display_message={"Post added, will show on your feed"}
                    />
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="my-8 space-y-3">
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
              <p className="text-center text-xs text-slate-500">
                Your posts will be shared with the community. Stay respectful.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

//
