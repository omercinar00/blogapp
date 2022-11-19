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

export const AddUser = (blog) => {
  const db = getDatabase();
  const userRef = ref(db, "blogcontent");
  const newUserRef = push(userRef);
  set(newUserRef, {
    title: blog.title,
    photoUrl: blog.photoUrl,
    content: blog.content,
    email: blog.email,
  });
};

export const GetUser = () => {
  const [contactList, setContactList] = useState();
  useEffect(() => {
    const db = getDatabase();
    const userRef = ref(db, "blogcontent");
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      const baglantiArray = [];

      for (let id in data) {
        baglantiArray.push({ id, ...data[id] });
      }
      setContactList(baglantiArray);
    });
  }, []);
  return { contactList };
};
export const DeleteUser = (id) => {
  const db = getDatabase();
  const userRef = ref(db, "blogcontent");
  remove(ref(db, "blogcontent/" + id));
};

export const EditUser = (value) => {
  const db = getDatabase();
  const updates = {};

  updates["blogcontent/" + value.id] = value;
  return update(ref(db), updates);
};
