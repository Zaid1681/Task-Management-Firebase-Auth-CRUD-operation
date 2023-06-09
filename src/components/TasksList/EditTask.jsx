import { doc, updateDoc, getDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../firebase";
import Swal from "sweetalert2";

const EditTask = ({ task }) => {
  console.log("task inside the edit task", task);
  //   const [editTask, setEditTask] = useState([task]);
  const [title, setTitle] = useState([task.title]);
  const [des, setDes] = useState([task.Description]);
  const [date, setDate] = useState([task.Date]);
  console.log("Edit task usestate", title[0]);

  //   const saveChange = async (e) => {
  //     e.preventDefault();
  //     console.log("update title: ", title);
  //     console.log("update des: ", des);
  //     console.log("update date: ", date);
  //     try {
  //       const taskDocument = doc(db, "users", task.id);
  //       const docSnapshot = await getDoc(taskDocument);
  //       if (docSnapshot.exists()) {
  //         const currentData = docSnapshot.data();
  //         await updateDoc(taskDocument, {
  //           title: title || currentData.title,
  //           Description: des || currentData.Description,
  //           Date: date || currentData.Date,
  //         });
  //         console.log("Document successfully updated!");
  //       } else {
  //         console.log("Document not found!");
  //       }
  //     } catch (error) {
  //       console.log("Error in the save changes button ", error);
  //     }
  //   };
  const saveChange = async (e) => {
    e.preventDefault();
    console.log("update title: ", title);
    console.log("update des: ", des);
    console.log("update date: ", date);
    try {
      const taskDocument = doc(db, "users", task.id);
      const docSnapshot = await getDoc(taskDocument);
      if (docSnapshot.exists()) {
        const currentData = docSnapshot.data();

        // Convert arrays to strings
        const updatedTitle = Array.isArray(title) ? title.join(", ") : title;
        const updatedDescription = Array.isArray(des) ? des.join(", ") : des;
        const updatedDate = Array.isArray(date) ? date.join(", ") : date;

        await updateDoc(taskDocument, {
          title: updatedTitle || currentData.title,
          Description: updatedDescription || currentData.Description,
          Date: updatedDate || currentData.Date,
        });
        console.log("Document successfully updated!");
      } else {
        console.log("Document not found!");
      }
    } catch (error) {
      console.log("Error in the save changes button: ", error);
    }
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Task Updated",
      showConfirmButton: false,
      timer: 1500,
    });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="edit">
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target={`#id${task.id}`}
      >
        Update Task
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id={`id${task.id}`}
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content" style={{ padding: "10px" }}>
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Task
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">...</div>
            <div className="model-input">
              <form action="/">
                <div className="form-group">
                  <label for="title">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    defaultValue={title}
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
                    // defaultValue={editTask[0].Description}
                    defaultValue={des}
                    // onChange={(e) => setDes(e.target.value)}
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
                    // defaultValue={editTask[0].Date}
                    defaultValue={date}
                    // onChange={handleDateChange}
                    onChange={(e) => setDate(e.target.value)}
                    aria-describedby="emailHelp"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                onClick={saveChange}
                className="btn btn-primary"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
