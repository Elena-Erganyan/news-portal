import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";
import { v4 } from "uuid";


export const uploadFile = async (file, folderName, action) => {
  if (!file) return;

  const storageRef = ref(storage, `${folderName}/${v4() + file.name}`); // for files to have different names even if users choose the same ones
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on("state_changed",
    (snapshot) => {
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      console.log(`${file.name}: ${progress}`);
    },
    (err) => {
      console.log(err);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref)
        .then(url => action(url));
    }
  );
};

export const formatDate = (date) => {
  return date.toLocaleString("sv-SE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).replace(" ", "T");
};
