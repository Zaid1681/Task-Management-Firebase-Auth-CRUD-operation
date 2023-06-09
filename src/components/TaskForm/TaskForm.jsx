import React, { useEffect, useState } from "react";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "../../firebase";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { WindowSharp } from "@mui/icons-material";

function TaskForm() {
  const [user, setUser] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const navigate = useNavigate();

  // getting current user id
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

  const currentDate = new Date().toISOString().split("T")[0];
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const insertTask = async (e) => {
    e.preventDefault();
    if (user) {
      try {
        const docRef = await addDoc(collection(db, "users"), {
          title: title,
          Description: des,
          Date: new Date(selectedDate).toISOString().split("T")[0],
          userID: user,
        });

        console.log("Document written with ID: ", docRef.id);
        console.log("data added sucessfull");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Task Created",
        showConfirmButton: false,
        timer: 1500,
      });
      setSelectedDate("");
      setTitle("");
      setDes("");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      setTimeout(() => {
        Swal.fire({
          title: "<strong>No user found</strong>",
          icon: "info",
          html: "PLease login first",
          showCloseButton: true,
        });
        navigate("/auth");
      }, 2000);
      // window.location.reload();
    }
  };
  // Get the current date
  return (
    <div className="container col-sm-8 mt-4">
      <h4 className="mb-4">Add/Edit Task</h4>
      <form action="/" onSubmit={insertTask}>
        <div className="form-group">
          <label for="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="form-group">
          <label for="description">Description</label>
          <textarea
            rows="4"
            type="text"
            className="form-control"
            value={des}
            onChange={(e) => setDes(e.target.value)}
            id="description"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="form-group">
          <label for="dueDate">Due Date</label>
          <input
            type="date"
            className="form-control"
            id="dueDate"
            value={selectedDate}
            onChange={handleDateChange}
            aria-describedby="emailHelp"
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
