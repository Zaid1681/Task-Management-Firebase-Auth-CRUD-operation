import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { db } from "../../firebase";
import EditTask from "./EditTask";
import { useNavigate } from "react-router-dom";

function TaskItem(task) {
  let navigate = useNavigate();

  // console.log("key", task.task.id);
  // console.log("task in taksItem", task.task);
  // const borderColor = task.status === "New" ? "border-primary" : "";
  const handleaAdd = () => {
    navigate("/newtask");
  };
  const taskDelete = async (id) => {
    // e.preventDeafult();
    try {
      window.confirm("Are you sure  ?");
      console.log("Each task id :", id);
      const data = doc(db, "users", id);
      await deleteDoc(data);
      window.location.reload();
    } catch (error) {
      console.log("Erorr from Delete task : ", error);
    }
  };
  return (
    <div className="card m-1 col-3 p-0 border " style={{ width: "140%" }}>
      <div
        className="card-body"
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        }}
      >
        <div className="">
          <div className="row">
            <div className="col">
              <h5 className="card-title">{task.task.title}</h5>
            </div>
            <div className="col text-right">
              <small>
                {new Date(task.task.Date).toISOString().split("T")[0]}
              </small>
            </div>
          </div>

          <p
            className="card-text p-10 "
            style={{
              display: "flex",
            }}
          >
            {task.task.Description}
          </p>
          <p
            className="card-text p-10 "
            style={{
              display: "flex",
            }}
          >
            {task.task.deadline}
          </p>
        </div>
        <div
          className="row"
          style={{
            gap: "10px",
            padding: "10px 10px",
          }}
        >
          <button
            href="/"
            onClick={() => {
              taskDelete(task.task.id);
            }}
            type="submit"
            className="btn btn-danger card-link"
          >
            Delete
          </button>
          {console.log("task.task", task.task)}
          {/* <button> */}
          <EditTask task={task.task} />
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
