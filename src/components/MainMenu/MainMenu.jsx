import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../../firebase";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { doc } from "firebase/compat/firestore";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/compat/firestore";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function MainMenu() {
  // getting current user
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const [user, setUser] = useState("");

  const getUserDataById = async (userId) => {
    try {
      // getAuth()
      //   .getUser(user)
      //   .then((userRecord) => {
      //     // See the UserRecord reference doc for the contents of userRecord.
      //     console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
      //   })
      //   .catch((error) => {
      //     console.log("Error fetching user data:", error);
      //   });
    } catch (error) {
      console.error("Error retrieving user data:", error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is authenticated, allow access to the rout
        console.log("user from main menu", user.uid);
        setUser({ user });
      } else {
        console.log("no user");
      }
    });
    unsubscribe();
    getUserDataById(user);
  }, []);

  const handleLogout = async () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        alert("signout successfully");
        navigate("/auth");
        window.location.reload();
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };
  const handleSign = async () => {
    navigate("/auth");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <span className="navbar-brand" href="#">
        Task Manager APP
      </span>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <Link className="nav-link" to="/">
            <li className="nav-item">Tasks</li>
          </Link>
          <Link className="nav-link" to="/newtask">
            <li className="nav-item">New Task</li>
          </Link>
        </ul>
      </div>
      {user ? (
        <>
          <div
            className="gap-10"
            style={{ gap: "10px", display: "flex", alignItems: "center" }}
          >
            <button className="btn btn-primary" onClick={handleLogout}>
              Logout
            </button>
            <AccountCircleIcon />
            <p></p>
          </div>
        </>
      ) : (
        <button className="btn btn-primary" onClick={handleSign}>
          Sign in
        </button>
      )}
    </nav>
  );
}

export default MainMenu;
