// useEffect(() => {
//   const insertTask = async () => {
//     try {
//       const docRef = await addDoc(collection(db, "users"), {
//         first: "Alan",
//         middle: "Mathison",
//         last: "Turing",
//         born: 1912,
//         userID: userId,
//       });

//       console.log("Document written with ID: ", docRef.id);
//       console.log("data added sucessfull");
//     } catch (e) {
//       console.error("Error adding document: ", e);
//     }
//   };
//   insertTask();
// }, []);

// useEffect(() => {
//   const getData = async () => {
//     try {
//       // await getDocs(collection(db, "user").where("userID", "==", user))
//       await getDocs(collection("users").where("born", "==", "1815")).then(
//         (task) => {
//           let taskData = task.docs.map((doc) => ({
//             ...doc.data(),
//             id: doc.id,
//           }));
//           console.log(taskData);
//           setData(taskData);
//         }
//       );

//       // .get()
//       // .then((querySnapshot) => {
//       //   const userTasks = [];
//       //   querySnapshot.forEach((doc) => {
//       //     userTasks.push({ id: doc.id, ...doc.data() });
//       //   });
//       //   console.log("user specific value : ", userTasks);
//       //   setData(userTasks);
//       // })
//       // .catch((error) => {
//       //   // Handle task retrieval error
//       // });

//       console.log("Data get sucessfully");
//     } catch (e) {
//       console.error("Error adding document: ", e);
//     }
//   };
//   getData();
// }, []);
// const [tasks, setTasks] = useState([
//   {
//     id: "1",
//     title: "Task 1",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pulvinar ornare nisi, in hendrerit tellus ultricies et. ",
//     createdDate: new Date(),
//     dueDate: moment().add(3, "days").format("DD-MM-yyyy"),
//     status: "New",
//   },
//   {
//     id: "2",
//     title: "Task 2",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pulvinar ornare nisi, in hendrerit tellus ultricies et. ",
//     createdDate: new Date(),
//     dueDate: moment().add(3, "days").format("DD-MM-yyyy"),
//     status: "New",
//   },
//   {
//     id: "3",
//     title: "Task 3",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pulvinar ornare nisi, in hendrerit tellus ultricies et. ",
//     createdDate: new Date(),
//     dueDate: moment().add(3, "days").format("DD-MM-yyyy"),
//     status: "Completed",
//   },
//   {
//     id: "4",
//     title: "Task 4",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pulvinar ornare nisi, in hendrerit tellus ultricies et. ",
//     createdDate: new Date(),
//     dueDate: moment().add(3, "days").format("DD-MM-yyyy"),
//     status: "Completed",
//   },
//   {
//     id: "5",
//     title: "Task 5",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pulvinar ornare nisi, in hendrerit tellus ultricies et. ",
//     createdDate: new Date(),
//     dueDate: moment().add(3, "days").format("DD-MM-yyyy"),
//     status: "New",
//   },
// ]);

// const displayTasks = () => {
//   return tasks.map((task) => {
//     return <TaskItem key={task.id} taskInfo={task} />;
//   });
// };
