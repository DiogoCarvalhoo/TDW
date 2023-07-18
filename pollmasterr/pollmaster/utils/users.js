import { collection, getDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { firestore } from "./firebase";

const getUser = async (name) => {
  const userRef = doc(firestore, "users", name);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data();
  }
};

const createUser = async (name) => {
  let userData = await getUser(name);
  if (userData == undefined) {
    await setDoc(doc(firestore, "users", name), {
      pollsCriadas: 0,
      pollsLiked: 0,
    });
  }
};

const addPollCreation = async (name) => {
  let userData = await getUser(name);
  updateDoc(doc(firestore, "users", name), {
    pollsCriadas: userData.pollsCriadas + 1,
    pollsLiked: userData.pollsLiked,
  });
};

const addPollLike = async (name) => {
  let userData = await getUser(name);
  updateDoc(doc(firestore, "users", name), {
    pollsCriadas: userData.pollsCriadas,
    pollsLiked: userData.pollsLiked + 1,
  });
};

const removePollLike = async (name) => {
  let userData = await getUser(name);
  updateDoc(doc(firestore, "users", name), {
    pollsCriadas: userData.pollsCriadas,
    pollsLiked: userData.pollsLiked - 1,
  });
};

export { getUser, createUser, addPollCreation, addPollLike, removePollLike };
