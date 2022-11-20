import firebase from "./firebase";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
  update,
} from "firebase/database";
import { useEffect, useState } from "react";

export const AddBlog = (blog) => {
  const db = getDatabase();
  const userRef = ref(db, "blogcontent");
  const newUserRef = push(userRef);
  set(newUserRef, {
    title: blog?.title,
    photoUrl: blog?.photoUrl,
    content: blog?.content,
    email: blog?.email,
    displayName:blog?.displayName,
    userphotoUrl:blog?.userphotoUrl
  });
};

export const GetBlog = () => {
  const [postList, setPostList] = useState();
  useEffect(() => {
    const db = getDatabase();
    const userRef = ref(db, "blogcontent");
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      const baglantiArray = [];

      for (let id in data) {
        baglantiArray.push({ id, ...data[id] });
      }
      setPostList(baglantiArray);
    });
  }, []);
  return { postList };
};
export const DeleteBlog = (id) => {
  const db = getDatabase();
  const userRef = ref(db, "blogcontent");
  remove(ref(db, "blogcontent/" + id));
};

export const EditBlog = (value) => {
  const db = getDatabase();
  const updates = {};

  updates["blogcontent/" + value.id] = value;
  return update(ref(db), updates);
};
