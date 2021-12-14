import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Tooltip from "react-simple-tooltip";
import { GLOBAL_TYPES } from "../../redux/actions/globalTypes";
import { postDataAPI } from "../../utils/fetchData";
import { getUserProfileById } from "../../redux/actions/profileAction";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Toast from "../../components/alert/Toast";

const Profile = () => {
  const { id } = useParams();
  const { auth, profile } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState([]);
  const [userNameCopy, setUserNameCopy] = useState(false);
  const [showInputUserName, setShowInputUserName] = useState(false);
  const [showInputIntro, setShowInputIntro] = useState(false);

  const [username, setUserName] = useState("");
  const [intro, setIntro] = useState("");
  let inputUserNameRef = useRef();
  let inputIntroRef = useRef();

  useEffect(() => {
    if (id === auth.user._id) {
      console.log("PERFIL PROPIO");
      setUserData([auth.user]);
      setIntro(auth.user.story);
    } else {
      dispatch(getUserProfileById({ users: profile.users, id, auth }));
      const newUserData = profile.users.filter((user) => user._id === id);

      setUserData(newUserData);
      setIntro(newUserData[0].story);
    }
  }, [id, auth, profile.users, dispatch, setUserData]);

  // console.log(userData);

  const submitSetUserName = async (e) => {
    postDataAPI(`setUserName`, { username }, auth.token)
      .then((res) => {
        let newArr = [];
        newArr.push(res.data.user);

        // console.log("newArr", newArr);
        // console.log("userData", userData);
        setUserData(newArr);
        setShowInputUserName(false);

        // return dispatch({
        //   type: GLOBAL_TYPES.ALERT,
        //   payload: { success: res.data.msg },
        // });
        return;
      })
      .catch((err) => {
        return dispatch({
          type: GLOBAL_TYPES.ALERT,
          payload: {
            error: err.response.data.msg ? err.response.data.msg : err,
          },
        });
      });
  };

  const submitSetIntro = async (e) => {
    postDataAPI(`setStory`, { story: intro }, auth.token)
      .then((res) => {
        let newArr = [];
        newArr.push(res.data.user);

        // console.log("newArr", newArr);
        // console.log("userData", userData);
        setUserData(newArr);
        setShowInputIntro(false);

        // return dispatch({
        //   type: GLOBAL_TYPES.ALERT,
        //   payload: { success: res.data.msg },
        // });
        return;
      })
      .catch((err) => {
        return dispatch({
          type: GLOBAL_TYPES.ALERT,
          payload: {
            error: err.response.data.msg ? err.response.data.msg : err,
          },
        });
      });
  };

  return (
    <>
      {userNameCopy && (
        <Toast
          msg={{ title: "Nombre de usuario copiado", body: "" }}
          handleShow={() => {
            setUserNameCopy(false);
            dispatch({ type: GLOBAL_TYPES.ALERT, payload: {} });
          }}
          bgColor="bg-dark"
        />
      )}

      {userData.map((user, index) => (
        <div className="row profile-right-side-content" key={user._id + index}>
          <div className="user-profile">
            <div className="profile-header-background">
              <a href="#" className="profile-cover pointer">
                {user.banner ? (
                  <img
                    src={user.banner ? user.banner : ""}
                    alt="Banner de tu perfil en SlidesFace"
                    className="avatar img-circle bg-nothing pointer"
                  />
                ) : (
                  <div id="profileBanner" className="pointer"></div>
                )}
                {/* <img
                src={user.banner ? user.banner : ""}
                alt="Banner de tu perfil en SlidesFace"
                className="avatar img-circle bg-nothing pointer"
              /> */}
                <div className="cover-overlay zIndex-100 ">
                  <a href="#" className="btn btn-update-cover text-inherit">
                    <i className="fas fa-image"></i>
                    {user.banner ? (
                      <span> Actualizar foto de portada</span>
                    ) : (
                      <span> Agregar foto de portada</span>
                    )}
                  </a>
                </div>
              </a>
            </div>
            <div className="row profile-rows">
              <div className="col-md-3">
                <div className="profile-info-left">
                  <div className="text-center ">
                    <div className="profile-img w-shadow pointer">
                      <div className="profile-img-overlay pointer"></div>
                      <img
                        src={
                          user.avatar
                            ? user.avatar
                            : "https://res.cloudinary.com/solumobil/image/upload/v1639261011/user/icons8-usuario-masculino-en-c%C3%ADrculo-96_ipicdt.png"
                        }
                        alt="Foto de perfil en SlidesFace"
                        className="avatar img-circle pointer"
                      />
                      <div className="profile-img-caption pointer">
                        <label
                          htmlFor="updateProfilePic"
                          className="upload pointer"
                        >
                          <i className="fas fa-camera pointer"></i> Actualizar
                          <input
                            type="file"
                            id="updateProfilePicInput"
                            className="text-center upload pointer"
                          />
                        </label>
                      </div>
                    </div>
                    <p className="profile-fullname mt-3">{user.fullname}</p>

                    {user.username ? (
                      <p className="profile-username mb-3 text-muted pointer">
                        <CopyToClipboard
                          text={user.username}
                          onCopy={() => {
                            setUserNameCopy(true);

                            setTimeout(() => {
                              setUserNameCopy(false);
                            }, 7000);
                          }}
                        >
                          <span>@{user.username}</span>
                        </CopyToClipboard>
                      </p>
                    ) : (
                      <div>
                        {id === auth.user._id && (
                          <div className="p-1">
                            <div
                              className={`${
                                showInputUserName ? "d-none" : " "
                              }`}
                            >
                              @
                              <a
                                href="#"
                                onClick={() => {
                                  setShowInputUserName(true);
                                  setTimeout(() => {
                                    inputUserNameRef.current.focus();
                                  }, 100);
                                }}
                              >
                                Agrega tu nombre de
                                {user.gender == "male" ? (
                                  <span> usuario</span>
                                ) : (
                                  <span> usuaria</span>
                                )}
                              </a>
                            </div>
                            {/* CAMPO INGRESE USUARIO */}
                            <div
                              className={`d-flex justify-content-center text-center mt-2 ${
                                showInputUserName ? " " : "d-none"
                              }`}
                            >
                              <p className="profile-username mb-3 text-muted d-flex justify-content-center text-center">
                                <div className="input-group d-contents">
                                  @
                                  <input
                                    ref={inputUserNameRef}
                                    value={username}
                                    name="username"
                                    onChange={(e) =>
                                      setUserName(e.target.value)
                                    }
                                    type="text"
                                    placeholder="Usuario"
                                    className="border-0 outline-none w-50"
                                  />
                                  <Tooltip content="Guardar" placement="bottom">
                                    <button
                                      type="button"
                                      onClick={submitSetUserName}
                                      className="btn btn-primary btn-sm text-initial"
                                    >
                                      <i className="fas fa-save"></i>
                                    </button>
                                  </Tooltip>
                                  <Tooltip
                                    content="Cancelar"
                                    placement="bottom"
                                  >
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setShowInputUserName(false)
                                      }
                                      className="btn btn-danger btn-sm text-initial"
                                    >
                                      <i className="fas fa-window-close"></i>
                                    </button>
                                  </Tooltip>
                                </div>
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    <div className="container mt-3">
                      <div className="row justify-content-around d-flex">
                        <div className="col-md-4">
                          <h5 className="fw-bolder">
                            {user.following ? user.following.length : 0}
                          </h5>
                          <div>
                            <p className="text-muted fw-semi-bold">Siguiendo</p>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <h5 className="fw-bolder">
                            {user.followers ? user.followers.length : 0}
                          </h5>
                          <div>
                            <p className="text-muted fw-semi-bold">
                              Seguidores
                            </p>
                          </div>
                        </div>
                        {/* <div className="col-md-4">
                        <h5>Lorem🈹</h5>
                      </div> */}
                      </div>
                    </div>
                  </div>
                  <div className="intro mt-2">
                    <div className="d-flex">
                      <button
                        type="button"
                        className="btn btn-follow mr-3 text-inherit hover-text-white"
                      >
                        <i className="fas fa-plus"></i> Seguir
                      </button>

                      <button
                        type="button"
                        className="btn btn-start-chat ms-3"
                        data-toggle="modal"
                        data-target="#newMessageModal"
                      >
                        <i className="fas fa-comments"></i>
                        <span className="fs-8 text-initial"> Mensaje</span>
                      </button>

                      <button
                        type="button"
                        className="btn btn-follow hover-text-white"
                        id="moreMobile"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i className="fas fa-ellipsis-h"></i>
                        <span className="fs-8"> Más</span>
                      </button>

                      <div
                        className="dropdown-menu dropdown-menu-right profile-ql-dropdown"
                        aria-labelledby="moreMobile"
                      >
                        <a href="newsfeed.html" className="dropdown-item">
                          Timeline
                        </a>
                        <a href="about.html" className="dropdown-item">
                          About
                        </a>
                        <a href="followers.html" className="dropdown-item">
                          Followers
                        </a>
                        <a href="following.html" className="dropdown-item">
                          Following
                        </a>
                        <a href="photos.html" className="dropdown-item">
                          Photos
                        </a>
                        <a href="videos.html" className="dropdown-item">
                          Videos
                        </a>
                        <a href="check-ins.html" className="dropdown-item">
                          Check-Ins
                        </a>
                        <a href="events.html" className="dropdown-item">
                          Events
                        </a>
                        <a href="likes.html" className="dropdown-item">
                          Likes
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="intro mt-4 mv-hidden">
                    <div className="intro-item d-flex justify-content-between align-items-center mb-0 pb-0">
                      <h3 className="intro-about m-0 p-0">Detalles</h3>
                    </div>

                    {user.story && (
                      <div
                        className={`${
                          showInputUserName ? "d-none" : " "
                        } col-md-12 justify-content-center d-flex text-center pt-0 mt-0`}
                        style={{ wordBreak: "break-word" }}
                      >
                        <div className=" p-3 w-100 text-wrap">
                          <span className="fs-7 w-50 text-wrap">
                            {user.story}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* CAMPO INGRESE PRESENTACIÓN */}
                    {id === auth.user._id && (
                      <>
                        <div
                          className={`d-flex justify-content-center text-center mt-2 ${
                            showInputIntro ? " " : "d-none"
                          }`}
                        >
                          <p className="profile-username mb-3 text-muted d-flex justify-content-center text-center">
                            <div className="input-group d-flex">
                              <div className="col-12">
                                <textarea
                                  ref={inputIntroRef}
                                  value={intro}
                                  rows={4}
                                  name="intro"
                                  maxLength="60"
                                  onChange={(e) => setIntro(e.target.value)}
                                  placeholder="Describe quién eres"
                                  className="border p-2 outline-none w-100"
                                ></textarea>
                              </div>

                              <div className="col-12">
                                <Tooltip content="Guardar" placement="bottom">
                                  <button
                                    type="button"
                                    onClick={submitSetIntro}
                                    className="btn btn-primary btn-sm text-initial"
                                  >
                                    <i className="fas fa-save"></i>
                                  </button>
                                </Tooltip>
                                <Tooltip content="Cancelar" placement="bottom">
                                  <button
                                    type="button"
                                    onClick={() => setShowInputIntro(false)}
                                    className="btn btn-danger btn-sm text-initial ms-2"
                                  >
                                    <i className="fas fa-window-close"></i>
                                  </button>
                                </Tooltip>
                              </div>
                            </div>
                          </p>
                        </div>

                        <div
                          className={`${
                            showInputIntro ? "d-none" : " "
                          } col-md-12`}
                        >
                          <button
                            type="button"
                            onClick={() => {
                              setShowInputIntro(true);
                              setTimeout(() => {
                                inputIntroRef.current.focus();
                              }, 100);
                            }}
                            className="btn btn-sm d-block w-100 bg-neutro text-dark fw-less-bold fs-6 text-initial"
                          >
                            Editar presentación
                          </button>
                        </div>
                      </>
                    )}
                    {/* END CAMPO INGRESE PRESENTACIÓN */}

                    <div className="intro-item d-flex justify-content-between align-items-center">
                      <p className="intro-title text-muted">
                        <i className="bx bx-briefcase text-primary"></i> Web
                        Developer at <a href="#">Company Name</a>
                      </p>
                    </div>
                    <div className="intro-item d-flex justify-content-between align-items-center">
                      <p className="intro-title text-muted">
                        <i className="bx bx-map text-primary"></i> Lives in
                        <a href="#">City, Country</a>
                      </p>
                    </div>
                    <div className="intro-item d-flex justify-content-between align-items-center">
                      <p className="intro-title text-muted">
                        <i className="bx bx-time text-primary"></i> Last Login
                        <a href="#">
                          Online
                          <span className="ml-1 online-status bg-success"></span>
                        </a>
                      </p>
                    </div>
                    <Tooltip content="Editar" placement="bottom">
                      <div className="intro-item d-flex justify-content-between align-items-center text-center justify-content-center">
                        <a
                          href="#"
                          className="btn btn-primary  btn-sm btn-quick-link join-group-btn border w-100"
                        >
                          <i className="fas fa-edit text-white"></i>
                        </a>
                      </div>
                    </Tooltip>
                  </div>
                  <div className="intro mt-5 row mv-hidden">
                    <div className="col-md-4">
                      <img
                        src="assets/images/users/album/album-1.jpg"
                        width="95"
                        alt=""
                      />
                    </div>
                    <div className="col-md-4">
                      <img
                        src="assets/images/users/album/album-2.jpg"
                        width="95"
                        alt=""
                      />
                    </div>
                    <div className="col-md-4">
                      <img
                        src="assets/images/users/album/album-3.jpg"
                        width="95"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="intro mt-5 mv-hidden">
                    <div className="intro-item d-flex justify-content-between align-items-center">
                      <h3 className="intro-about">Other Social Accounts</h3>
                    </div>
                    <div className="intro-item d-flex justify-content-between align-items-center">
                      <p className="intro-title text-muted">
                        <i className="bx bxl-facebook-square facebook-color"></i>
                        <a href="#" target="_blank">
                          facebook.com/username
                        </a>
                      </p>
                    </div>
                    <div className="intro-item d-flex justify-content-between align-items-center">
                      <p className="intro-title text-muted">
                        <i className="bx bxl-twitter twitter-color"></i>
                        <a href="#" target="_blank">
                          twitter.com/username
                        </a>
                      </p>
                    </div>
                    <div className="intro-item d-flex justify-content-between align-items-center">
                      <p className="intro-title text-muted">
                        <i className="bx bxl-instagram instagram-color"></i>
                        <a href="#" target="_blank">
                          instagram.com/username
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-9 p-0">
                <div className="profile-info-right">
                  {/* <!-- Posts section --> */}
                  <div className="row">
                    <div className="col-md-9 profile-center">
                      <ul className="list-inline profile-links d-flex justify-content-between w-shadow rounded pointer">
                        <li className="list-inline-item profile-active">
                          <a href="#">Publicaciones</a>
                        </li>
                        <li className="list-inline-item">
                          <a href="#">Información</a>
                        </li>
                        <li className="list-inline-item">
                          <a href="friends.html">Amigos</a>
                        </li>
                        <li className="list-inline-item">
                          <a href="#">Fotos</a>
                        </li>
                        <li className="list-inline-item">
                          <a href="#">Más</a>
                          <i className="fas fa-sort-down text-dark ms-1"></i>
                        </li>
                        <li className="list-inline-item dropdown">
                          <a
                            href="#"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i className="fas fa-ellipsis-h"></i>
                          </a>
                          <div className="dropdown-menu dropdown-menu-right profile-ql-dropdown">
                            <a href="#" className="dropdown-item">
                              Activity Log
                            </a>
                            <a href="#" className="dropdown-item">
                              Videos
                            </a>
                            <a href="#" className="dropdown-item">
                              Check-Ins
                            </a>
                            <a href="#" className="dropdown-item">
                              Events
                            </a>
                            <a href="#" className="dropdown-item">
                              Likes
                            </a>
                          </div>
                        </li>
                      </ul>
                      <ul className="list-unstyled" style={{ marginBottom: 0 }}>
                        <li className="media post-form w-shadow">
                          <div className="media-body">
                            <div className="form-group post-input">
                              <textarea
                                className="form-control"
                                id="postForm"
                                rows="2"
                                placeholder={`¿Qué estás pensando, ${user.firstname}?`}
                              ></textarea>
                            </div>
                            <div className="row post-form-group">
                              <div className="col-md-9">
                                <button
                                  type="button"
                                  className="btn btn-link post-form-btn btn-sm align-items-center d-inline-flex text-decoration-none justify-content-center"
                                >
                                  <i className="fas fa-images fa-2x text-success"></i>
                                  <span className="text-initial fw-bold text-muted text-initial">
                                    &nbsp; Foto / video
                                  </span>
                                </button>
                                &nbsp;&nbsp;&nbsp;
                                <button
                                  type="button"
                                  className="btn btn-link post-form-btn btn-sm align-items-center d-inline-flex text-decoration-none justify-content-center"
                                >
                                  <i className="fas fa-user-friends fa-2x text-primary"></i>
                                  <span className="text-muted text-initial fw-bold">
                                    &nbsp;Etiqueta Amigos
                                  </span>
                                </button>
                                &nbsp;&nbsp;&nbsp;
                                <button
                                  type="button"
                                  className="btn btn-link post-form-btn btn-sm align-items-center d-inline-flex text-decoration-none justify-content-center"
                                >
                                  <i className="fas fa-smile fa-2x fa-outline-dark-yellow"></i>
                                  <span className="text-muted text-initial fw-bold">
                                    &nbsp;Emoción / Suceso
                                  </span>
                                </button>
                              </div>
                              <div className="col-md-3 text-right">
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                >
                                  Publicar
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                      <div className="bg-white profile-posts-options mt-5 mb-4 py-3 d-flex justify-content-between shadow-sm">
                        <div className="col-md-3 col-sm-12">
                          <h6 className="timeline-title">Posts</h6>
                        </div>
                        <div className="col-md-9 col-sm-12">
                          <div className="timeline-manage">
                            <button
                              type="button"
                              className="btn btn-quick-link join-group-btn border btn-sm tmo-buttons"
                            >
                              <i className="bx bxs-cog"></i> Manage Posts
                            </button>
                            <button
                              type="button"
                              className="btn btn-quick-link join-group-btn border btn-sm tmo-buttons"
                            >
                              <i className="bx bx-align-middle"></i> List View
                            </button>
                            <button
                              type="button"
                              className="btn btn-quick-link join-group-btn border btn-sm tmo-buttons"
                            >
                              <i className="bx bxs-grid-alt"></i> Grid View
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="post border-bottom p-3 bg-white w-shadow">
                        <div className="media text-muted pt-3">
                          <img
                            src="assets/images/users/user-4.jpg"
                            alt="Online user"
                            className="mr-3 post-user-image"
                          />
                          <div className="media-body pb-3 mb-0 small lh-125">
                            <div className="d-flex justify-content-between align-items-center w-100">
                              <span className="post-type text-muted">
                                <a
                                  href="#"
                                  className="text-gray-dark post-user-name mr-2"
                                >
                                  Arthur Minasyan
                                </a>
                                updated his cover photo.
                              </span>
                              <div className="dropdown">
                                <a
                                  href="#"
                                  className="post-more-settings"
                                  role="button"
                                  data-toggle="dropdown"
                                  id="postOptions"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                >
                                  <i className="bx bx-dots-horizontal-rounded"></i>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right dropdown-menu-lg-left post-dropdown-menu">
                                  <a
                                    href="#"
                                    className="dropdown-item"
                                    aria-describedby="savePost"
                                  >
                                    <div className="row">
                                      <div className="col-md-2">
                                        <i className="bx bx-bookmark-plus post-option-icon"></i>
                                      </div>
                                      <div className="col-md-10">
                                        <span className="fs-9">Save post</span>
                                        <small
                                          id="savePost"
                                          className="form-text text-muted"
                                        >
                                          Add this to your saved items
                                        </small>
                                      </div>
                                    </div>
                                  </a>
                                  <a
                                    href="#"
                                    className="dropdown-item"
                                    aria-describedby="hidePost"
                                  >
                                    <div className="row">
                                      <div className="col-md-2">
                                        <i className="bx bx-hide post-option-icon"></i>
                                      </div>
                                      <div className="col-md-10">
                                        <span className="fs-9">Hide post</span>
                                        <small
                                          id="hidePost"
                                          className="form-text text-muted"
                                        >
                                          See fewer posts like this
                                        </small>
                                      </div>
                                    </div>
                                  </a>
                                  <a
                                    href="#"
                                    className="dropdown-item"
                                    aria-describedby="snoozePost"
                                  >
                                    <div className="row">
                                      <div className="col-md-2">
                                        <i className="bx bx-time post-option-icon"></i>
                                      </div>
                                      <div className="col-md-10">
                                        <span className="fs-9">
                                          Snooze Arthur for 30 days
                                        </span>
                                        <small
                                          id="snoozePost"
                                          className="form-text text-muted"
                                        >
                                          Temporarily stop seeing posts
                                        </small>
                                      </div>
                                    </div>
                                  </a>
                                  <a
                                    href="#"
                                    className="dropdown-item"
                                    aria-describedby="reportPost"
                                  >
                                    <div className="row">
                                      <div className="col-md-2">
                                        <i className="bx bx-block post-option-icon"></i>
                                      </div>
                                      <div className="col-md-10">
                                        <span className="fs-9">Report</span>
                                        <small
                                          id="reportPost"
                                          className="form-text text-muted"
                                        >
                                          I'm concerned about this post
                                        </small>
                                      </div>
                                    </div>
                                  </a>
                                </div>
                              </div>
                            </div>
                            <span className="d-block">
                              3 hours ago <i className="bx bx-globe ml-3"></i>
                            </span>
                          </div>
                        </div>
                        <div className="mt-3">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Quis voluptatem veritatis harum, tenetur,
                            quibusdam voluptatum, incidunt saepe minus maiores
                            ea atque sequi illo veniam sint quaerat corporis
                            totam et. Culpa?
                          </p>
                        </div>
                        <div className="d-block mt-3">
                          <img
                            src="assets/images/users/post/post-1.jpg"
                            className="w-100 mb-3"
                            alt="post image"
                          />
                        </div>
                        <div className="mb-2">
                          {/* <!-- Reactions --> */}
                          <div className="argon-reaction">
                            <span className="like-btn">
                              <a
                                href="#"
                                className="post-card-buttons"
                                id="reactions"
                              >
                                <i className="bx bxs-like mr-2"></i> 67
                              </a>
                              <ul className="reactions-box dropdown-shadow">
                                <li
                                  className="reaction reaction-like"
                                  data-reaction="Like"
                                ></li>
                                <li
                                  className="reaction reaction-love"
                                  data-reaction="Love"
                                ></li>
                                <li
                                  className="reaction reaction-haha"
                                  data-reaction="HaHa"
                                ></li>
                                <li
                                  className="reaction reaction-wow"
                                  data-reaction="Wow"
                                ></li>
                                <li
                                  className="reaction reaction-sad"
                                  data-reaction="Sad"
                                ></li>
                                <li
                                  className="reaction reaction-angry"
                                  data-reaction="Angry"
                                ></li>
                              </ul>
                            </span>
                          </div>

                          <a
                            href="#"
                            className="post-card-buttons"
                            id="show-comments"
                          >
                            <i className="bx bx-message-rounded mr-2"></i> 5
                          </a>
                          <div className="dropdown dropup share-dropup">
                            <a
                              href="#"
                              className="post-card-buttons"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i className="bx bx-share-alt mr-2"></i> Share
                            </a>
                            <div className="dropdown-menu post-dropdown-menu">
                              <a href="#" className="dropdown-item">
                                <div className="row">
                                  <div className="col-md-2">
                                    <i className="bx bx-share-alt"></i>
                                  </div>
                                  <div className="col-md-10">
                                    <span>Share Now (Public)</span>
                                  </div>
                                </div>
                              </a>
                              <a href="#" className="dropdown-item">
                                <div className="row">
                                  <div className="col-md-2">
                                    <i className="bx bx-share-alt"></i>
                                  </div>
                                  <div className="col-md-10">
                                    <span>Share...</span>
                                  </div>
                                </div>
                              </a>
                              <a href="#" className="dropdown-item">
                                <div className="row">
                                  <div className="col-md-2">
                                    <i className="bx bx-message"></i>
                                  </div>
                                  <div className="col-md-10">
                                    <span>Send as Message</span>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div
                          className="border-top pt-3 hide-comments"
                          style={{ display: "none" }}
                        >
                          <div className="row bootstrap snippets">
                            <div className="col-md-12">
                              <div className="comment-wrapper">
                                <div className="panel panel-info">
                                  <div className="panel-body">
                                    <ul className="media-list comments-list">
                                      <li className="media comment-form">
                                        <a href="#" className="pull-left">
                                          <img
                                            src="assets/images/users/user-4.jpg"
                                            alt=""
                                            className="img-circle"
                                          />
                                        </a>
                                        <div className="media-body">
                                          <form action="" method="" role="form">
                                            <div className="row">
                                              <div className="col-md-12">
                                                <div className="input-group">
                                                  <input
                                                    type="text"
                                                    className="form-control comment-input"
                                                    placeholder="Write a comment..."
                                                  />

                                                  <div className="input-group-btn">
                                                    <button
                                                      type="button"
                                                      className="btn comment-form-btn"
                                                      data-toggle="tooltip"
                                                      data-placement="top"
                                                      title="Tooltip on top"
                                                    >
                                                      <i className="bx bxs-smiley-happy"></i>
                                                    </button>
                                                    <button
                                                      type="button"
                                                      className="btn comment-form-btn comment-form-btn"
                                                      data-toggle="tooltip"
                                                      data-placement="top"
                                                      title="Tooltip on top"
                                                    >
                                                      <i className="bx bx-camera"></i>
                                                    </button>
                                                    <button
                                                      type="button"
                                                      className="btn comment-form-btn comment-form-btn"
                                                      data-toggle="tooltip"
                                                      data-placement="top"
                                                      title="Tooltip on top"
                                                    >
                                                      <i className="bx bx-microphone"></i>
                                                    </button>
                                                    <button
                                                      type="button"
                                                      className="btn comment-form-btn"
                                                      data-toggle="tooltip"
                                                      data-placement="top"
                                                      title="Tooltip on top"
                                                    >
                                                      <i className="bx bx-file-blank"></i>
                                                    </button>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </form>
                                        </div>
                                      </li>
                                      <li className="media">
                                        <a href="#" className="pull-left">
                                          <img
                                            src="assets/images/users/user-2.jpg"
                                            alt=""
                                            className="img-circle"
                                          />
                                        </a>
                                        <div className="media-body">
                                          <div className="d-flex justify-content-between align-items-center w-100">
                                            <strong className="text-gray-dark">
                                              <a href="#" className="fs-8">
                                                Karen Minas
                                              </a>
                                            </strong>
                                            <a href="#">
                                              <i className="bx bx-dots-horizontal-rounded"></i>
                                            </a>
                                          </div>
                                          <span className="d-block comment-created-time">
                                            30 min ago
                                          </span>
                                          <p className="fs-8 pt-2">
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit. Lorem
                                            ipsum dolor sit amet,
                                            <a href="#">
                                              #consecteturadipiscing
                                            </a>
                                            .
                                          </p>
                                          <div className="commentLR">
                                            <button
                                              type="button"
                                              className="btn btn-link fs-8"
                                            >
                                              Like
                                            </button>
                                            <button
                                              type="button"
                                              className="btn btn-link fs-8"
                                            >
                                              Reply
                                            </button>
                                          </div>
                                        </div>
                                      </li>
                                      <li className="media">
                                        <a href="#" className="pull-left">
                                          <img
                                            src="https://bootdey.com/img/Content/user_2.jpg"
                                            alt=""
                                            className="img-circle"
                                          />
                                        </a>
                                        <div className="media-body">
                                          <div className="d-flex justify-content-between align-items-center w-100">
                                            <strong className="text-gray-dark">
                                              <a href="#" className="fs-8">
                                                Lia Earnest
                                              </a>
                                            </strong>
                                            <a href="#">
                                              <i className="bx bx-dots-horizontal-rounded"></i>
                                            </a>
                                          </div>
                                          <span className="d-block comment-created-time">
                                            2 hours ago
                                          </span>
                                          <p className="fs-8 pt-2">
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit. Lorem
                                            ipsum dolor sit amet,
                                            <a href="#">
                                              #consecteturadipiscing
                                            </a>
                                            .
                                          </p>
                                          <div className="commentLR">
                                            <button
                                              type="button"
                                              className="btn btn-link fs-8"
                                            >
                                              Like
                                            </button>
                                            <button
                                              type="button"
                                              className="btn btn-link fs-8"
                                            >
                                              Reply
                                            </button>
                                          </div>
                                        </div>
                                      </li>
                                      <li className="media">
                                        <a href="#" className="pull-left">
                                          <img
                                            src="https://bootdey.com/img/Content/user_3.jpg"
                                            alt=""
                                            className="img-circle"
                                          />
                                        </a>
                                        <div className="media-body">
                                          <div className="d-flex justify-content-between align-items-center w-100">
                                            <strong className="text-gray-dark">
                                              <a href="#" className="fs-8">
                                                Rusty Mickelsen
                                              </a>
                                            </strong>
                                            <a href="#">
                                              <i className="bx bx-dots-horizontal-rounded"></i>
                                            </a>
                                          </div>
                                          <span className="d-block comment-created-time">
                                            17 hours ago
                                          </span>
                                          <p className="fs-8 pt-2">
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit. Lorem
                                            ipsum dolor sit amet,
                                            <a href="#">
                                              #consecteturadipiscing
                                            </a>
                                            .
                                          </p>
                                          <div className="commentLR">
                                            <button
                                              type="button"
                                              className="btn btn-link fs-8"
                                            >
                                              Like
                                            </button>
                                            <button
                                              type="button"
                                              className="btn btn-link fs-8"
                                            >
                                              Reply
                                            </button>
                                          </div>
                                        </div>
                                      </li>
                                      <li className="media">
                                        <div className="media-body">
                                          <div className="comment-see-more text-center">
                                            <button
                                              type="button"
                                              className="btn btn-link fs-8"
                                            >
                                              See More
                                            </button>
                                          </div>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 profile-quick-media">
                      <h6 className="text-muted timeline-title">
                        Recent Media
                      </h6>
                      <div className="quick-media">
                        <div className="media-overlay"></div>
                        <a href="#" className="quick-media-img">
                          <img
                            src="assets/images/users/album/album-1.jpg"
                            alt="Quick media"
                          />
                        </a>
                        <div className="media-overlay-content">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="media-overlay-owner">
                              <img
                                src="assets/images/users/user-12.png"
                                alt="Media owner image"
                              />
                              <span className="overlay-owner-name fs-9">
                                Irwin M. Spelle
                              </span>
                            </div>
                            <div className="dropdown">
                              <a
                                href="#"
                                className="overlay-more"
                                data-toggle="dropdown"
                                role="button"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="bx bx-dots-horizontal-rounded"></i>
                              </a>
                              <div className="dropdown-menu dropdown-menu-right nav-drop dropdown-shadow">
                                <a className="dropdown-item" href="#">
                                  Save post
                                </a>
                                <a className="dropdown-item" href="#">
                                  Turn on notifications
                                </a>
                              </div>
                            </div>
                          </div>

                          <div className="overlay-bottom d-flex justify-content-between align-items-center">
                            <div className="argon-reaction">
                              <span className="like-btn">
                                <a
                                  href="#"
                                  className="post-card-buttons"
                                  id="reactions"
                                >
                                  <i className="bx bxs-like mr-1"></i> 67
                                </a>
                                <ul className="reactions-box dropdown-shadow">
                                  <li
                                    className="reaction reaction-like"
                                    data-reaction="Like"
                                  ></li>
                                  <li
                                    className="reaction reaction-love"
                                    data-reaction="Love"
                                  ></li>
                                  <li
                                    className="reaction reaction-haha"
                                    data-reaction="HaHa"
                                  ></li>
                                  <li
                                    className="reaction reaction-wow"
                                    data-reaction="Wow"
                                  ></li>
                                  <li
                                    className="reaction reaction-sad"
                                    data-reaction="Sad"
                                  ></li>
                                  <li
                                    className="reaction reaction-angry"
                                    data-reaction="Angry"
                                  ></li>
                                </ul>
                              </span>
                            </div>
                            <div className="liked-users">
                              <img
                                src="assets/images/users/user-9.png"
                                alt="Liked users"
                              />
                              <img
                                src="assets/images/users/user-6.png"
                                alt="Liked users"
                              />
                              <img
                                src="assets/images/users/user-12.png"
                                alt="Liked users"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="quick-media">
                        <div className="media-overlay"></div>
                        <a href="#" className="quick-media-img">
                          <img
                            src="assets/images/users/album/album-2.jpg"
                            alt="Quick media"
                          />
                        </a>
                        <div className="media-overlay-content">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="media-overlay-owner">
                              <img
                                src="assets/images/users/user-12.png"
                                alt="Media owner image"
                              />
                              <span className="overlay-owner-name fs-9">
                                Irwin M. Spelle
                              </span>
                            </div>
                            <div className="dropdown">
                              <a
                                href="#"
                                className="overlay-more"
                                data-toggle="dropdown"
                                role="button"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="bx bx-dots-horizontal-rounded"></i>
                              </a>
                              <div className="dropdown-menu dropdown-menu-right nav-drop dropdown-shadow">
                                <a className="dropdown-item" href="#">
                                  Save post
                                </a>
                                <a className="dropdown-item" href="#">
                                  Turn on notifications
                                </a>
                              </div>
                            </div>
                          </div>

                          <div className="overlay-bottom d-flex justify-content-between align-items-center">
                            <div className="argon-reaction">
                              <span className="like-btn">
                                <a
                                  href="#"
                                  className="post-card-buttons"
                                  id="reactions"
                                >
                                  <i className="bx bxs-like mr-1"></i> 67
                                </a>
                                <ul className="reactions-box dropdown-shadow">
                                  <li
                                    className="reaction reaction-like"
                                    data-reaction="Like"
                                  ></li>
                                  <li
                                    className="reaction reaction-love"
                                    data-reaction="Love"
                                  ></li>
                                  <li
                                    className="reaction reaction-haha"
                                    data-reaction="HaHa"
                                  ></li>
                                  <li
                                    className="reaction reaction-wow"
                                    data-reaction="Wow"
                                  ></li>
                                  <li
                                    className="reaction reaction-sad"
                                    data-reaction="Sad"
                                  ></li>
                                  <li
                                    className="reaction reaction-angry"
                                    data-reaction="Angry"
                                  ></li>
                                </ul>
                              </span>
                            </div>
                            <div className="liked-users">
                              <img
                                src="assets/images/users/user-9.png"
                                alt="Liked users"
                              />
                              <img
                                src="assets/images/users/user-6.png"
                                alt="Liked users"
                              />
                              <img
                                src="assets/images/users/user-12.png"
                                alt="Liked users"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="quick-media">
                        <div className="media-overlay"></div>
                        <a href="#" className="quick-media-img">
                          <img
                            src="assets/images/users/album/album-3.jpg"
                            alt="Quick media"
                          />
                        </a>
                        <div className="media-overlay-content">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="media-overlay-owner">
                              <img
                                src="assets/images/users/user-12.png"
                                alt="Media owner image"
                              />
                              <span className="overlay-owner-name fs-9">
                                Irwin M. Spelle
                              </span>
                            </div>
                            <div className="dropdown">
                              <a
                                href="#"
                                className="overlay-more"
                                data-toggle="dropdown"
                                role="button"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="bx bx-dots-horizontal-rounded"></i>
                              </a>
                              <div className="dropdown-menu dropdown-menu-right nav-drop dropdown-shadow">
                                <a className="dropdown-item" href="#">
                                  Save post
                                </a>
                                <a className="dropdown-item" href="#">
                                  Turn on notifications
                                </a>
                              </div>
                            </div>
                          </div>

                          <div className="overlay-bottom d-flex justify-content-between align-items-center">
                            <div className="argon-reaction">
                              <span className="like-btn">
                                <a
                                  href="#"
                                  className="post-card-buttons"
                                  id="reactions"
                                >
                                  <i className="bx bxs-like mr-1"></i> 67
                                </a>
                                <ul className="reactions-box dropdown-shadow">
                                  <li
                                    className="reaction reaction-like"
                                    data-reaction="Like"
                                  ></li>
                                  <li
                                    className="reaction reaction-love"
                                    data-reaction="Love"
                                  ></li>
                                  <li
                                    className="reaction reaction-haha"
                                    data-reaction="HaHa"
                                  ></li>
                                  <li
                                    className="reaction reaction-wow"
                                    data-reaction="Wow"
                                  ></li>
                                  <li
                                    className="reaction reaction-sad"
                                    data-reaction="Sad"
                                  ></li>
                                  <li
                                    className="reaction reaction-angry"
                                    data-reaction="Angry"
                                  ></li>
                                </ul>
                              </span>
                            </div>
                            <div className="liked-users">
                              <img
                                src="assets/images/users/user-9.png"
                                alt="Liked users"
                              />
                              <img
                                src="assets/images/users/user-6.png"
                                alt="Liked users"
                              />
                              <img
                                src="assets/images/users/user-12.png"
                                alt="Liked users"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Profile;
