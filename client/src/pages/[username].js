// import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
// import { useState, useRef, useEffect } from "react";
// import Tooltip from "react-simple-tooltip";
// import { GLOBAL_TYPES } from "../../redux/actions/globalTypes";
// import { postDataAPI } from "../../utils/fetchData";
// import { getUserProfileById } from "../../redux/actions/profileAction";
// import { CopyToClipboard } from "react-copy-to-clipboard";
// import Toast from "../../components/alert/Toast";

const Profile = () => {
  const { username } = useParams();
  console.log('username', username);
  // const { auth, profile } = useSelector((state) => state);
  // const dispatch = useDispatch();

  // const [userData, setUserData] = useState([]);
  // const [userNameCopy, setUserNameCopy] = useState(false);
  // const [showInputUserName, setShowInputUserName] = useState(false);
  // const [showInputIntro, setShowInputIntro] = useState(false);

  // const [username, setUserName] = useState("");
  // const [intro, setIntro] = useState("");
  // let inputUserNameRef = useRef();
  // let inputIntroRef = useRef();

  // useEffect(() => {
  //   if (id === auth.user._id) {
  //     console.log("PERFIL PROPIO");
  //     setUserData([auth.user]);
  //     setIntro(auth.user.story);
  //   } else {
  //     dispatch(getUserProfileById({ users: profile.users, id, auth }));
  //     const newUserData = profile.users.filter((user) => user._id === id);

  //     console.log(newUserData);
  //     setUserData(newUserData);

  //     if(newUserData.story)
  //     setIntro(newUserData.story);
  //   }
  // }, [id, auth, profile.users, dispatch, setUserData]);

  // console.log(userData);

  // const submitSetUserName = async (e) => {
  //   postDataAPI(`setUserName`, { username }, auth.token)
  //     .then((res) => {
  //       let newArr = [];
  //       newArr.push(res.data.user);

  //       // console.log("newArr", newArr);
  //       // console.log("userData", userData);
  //       setUserData(newArr);
  //       setShowInputUserName(false);

  //       // return dispatch({
  //       //   type: GLOBAL_TYPES.ALERT,
  //       //   payload: { success: res.data.msg },
  //       // });
  //       return;
  //     })
  //     .catch((err) => {
  //       return dispatch({
  //         type: GLOBAL_TYPES.ALERT,
  //         payload: {
  //           error: err.response.data.msg ? err.response.data.msg : err,
  //         },
  //       });
  //     });
  // };

  // const submitSetIntro = async (e) => {
  //   postDataAPI(`setStory`, { story: intro }, auth.token)
  //     .then((res) => {
  //       let newArr = [];
  //       newArr.push(res.data.user);

  //       // console.log("newArr", newArr);
  //       // console.log("userData", userData);
  //       setUserData(newArr);
  //       setShowInputIntro(false);

  //       // return dispatch({
  //       //   type: GLOBAL_TYPES.ALERT,
  //       //   payload: { success: res.data.msg },
  //       // });
  //       return;
  //     })
  //     .catch((err) => {
  //       return dispatch({
  //         type: GLOBAL_TYPES.ALERT,
  //         payload: {
  //           error: err.response.data.msg ? err.response.data.msg : err,
  //         },
  //       });
  //     });
  // };

  return (
    <div>
      Perfil del usuario {username}
    </div>
  );
};

export default Profile;
