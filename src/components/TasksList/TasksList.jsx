import React, { useEffect, useState } from "react";
import moment from "moment";
import TaskItem from "./TaskItem";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "../../firebase";
import Swal from "sweetalert2";

// import { firestore } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function TodoList() {
  let navigate = useNavigate();
  const [data, setData] = useState([]);
  const [user, setUser] = useState("");
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is authenticated, allow access to the rout
        console.log("user", user.uid);
        setUser(user.uid);
      } else {
        console.log("no user");
        // User is not authenticated, redirect to login or another route
      }
    });
    unsubscribe();
  }, []);
 
  useEffect(() => {
    const getData = async () => {
      try {
        // const userId = user.toString(); // Convert user ID to string

        const querySnapshot = await getDocs(
          query(collection(db, "users"), where("userID", "==", user))
        );
        const taskData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(taskData);
        console.log("Data fetched successfully");
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    if (user) {
      getData();
    }
  }, [user]);
  console.log("data : ", data);

  const handleaAdd = () => {
    navigate("/newtask");
  };

 
  return (
    <div className="container mt-4 d-flex">
      <div className="row gap-10">
        {data.map((item, index) => (
          <TaskItem key={index} task={item} />
        ))}
        <a
          className=""
          style={{
            color: "inherit",
            cursor: "pointer",
            textDecoration: "none",
            margin: "auto 120px",
          }}
          onClick={handleaAdd}
        >
          <p
            style={{
              fontSize: "70px",
              color: "grey",
              display: "flex",
              alignItems: "center",
              justifyContent: "center ",
              margin: "auto",
            }}
          >
            +
          </p>
        </a>
      </div>
    </div>
  );
}

export default TodoList;
