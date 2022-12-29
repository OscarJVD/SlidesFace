const Posts = ({ username, userData }) => {
  console.log(userData)
  return (
    <>
      {userData.map((user, index) => (
        <div key={user._id + index}>
          {/* POSTS */}
          <ul className="list-unstyled" style={{ marginBottom: 0 }}>
            <li className="media post-form w-shadow">
              <div className="media-body">
                <div className="form-group post-input">
                  <textarea
                    className="form-control"
                    id="postForm"
                    rows="2"
                  placeholder={`¿Qué estás pensando, ${user.firstname}?`}
                   />
                </div>
                <div className="row post-form-group">
                  <div className="col-md-9">
                    <button
                      type="button"
                      className="btn btn-link post-form-btn btn-sm align-items-center d-inline-flex text-decoration-none justify-content-center"
                    >
                      <i className="fas fa-images fa-2x text-success" />
                      <span className="text-initial fw-bold text-muted text-initial">
                        &nbsp; Foto / video
                      </span>
                    </button>
                    &nbsp;&nbsp;&nbsp;
                    <button
                      type="button"
                      className="btn btn-link post-form-btn btn-sm align-items-center d-inline-flex text-decoration-none justify-content-center"
                    >
                      <i className="fas fa-user-friends fa-2x text-primary" />
                      <span className="text-muted text-initial fw-bold">
                        &nbsp;Etiqueta Amigos
                      </span>
                    </button>
                    &nbsp;&nbsp;&nbsp;
                    <button
                      type="button"
                      className="btn btn-link post-form-btn btn-sm align-items-center d-inline-flex text-decoration-none justify-content-center"
                    >
                      <i className="fas fa-smile fa-2x fa-outline-dark-yellow" />
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
                  <i className="bx bxs-cog" /> Manage Posts
                </button>
                <button
                  type="button"
                  className="btn btn-quick-link join-group-btn border btn-sm tmo-buttons"
                >
                  <i className="bx bx-align-middle" /> List View
                </button>
                <button
                  type="button"
                  className="btn btn-quick-link join-group-btn border btn-sm tmo-buttons"
                >
                  <i className="bx bxs-grid-alt" /> Grid View
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
                      <i className="bx bx-dots-horizontal-rounded" />
                    </a>
                    <div className="dropdown-menu dropdown-menu-right dropdown-menu-lg-left post-dropdown-menu">
                      <a
                        href="#"
                        className="dropdown-item"
                        aria-describedby="savePost"
                      >
                        <div className="row">
                          <div className="col-md-2">
                            <i className="bx bx-bookmark-plus post-option-icon" />
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
                            <i className="bx bx-hide post-option-icon" />
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
                            <i className="bx bx-time post-option-icon" />
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
                            <i className="bx bx-block post-option-icon" />
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
                  3 hours ago <i className="bx bx-globe ml-3" />
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
                    <i className="bx bxs-like mr-2" /> 67
                  </a>
                  <ul className="reactions-box dropdown-shadow">
                    <li
                      className="reaction reaction-like"
                      data-reaction="Like"
                     />
                    <li
                      className="reaction reaction-love"
                      data-reaction="Love"
                     />
                    <li
                      className="reaction reaction-haha"
                      data-reaction="HaHa"
                     />
                    <li
                      className="reaction reaction-wow"
                      data-reaction="Wow"
                     />
                    <li
                      className="reaction reaction-sad"
                      data-reaction="Sad"
                     />
                    <li
                      className="reaction reaction-angry"
                      data-reaction="Angry"
                     />
                  </ul>
                </span>
              </div>

              <a
                href="#"
                className="post-card-buttons"
                id="show-comments"
              >
                <i className="bx bx-message-rounded mr-2" /> 5
              </a>
              <div className="dropdown dropup share-dropup">
                <a
                  href="#"
                  className="post-card-buttons"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="bx bx-share-alt mr-2" /> Share
                </a>
                <div className="dropdown-menu post-dropdown-menu">
                  <a href="#" className="dropdown-item">
                    <div className="row">
                      <div className="col-md-2">
                        <i className="bx bx-share-alt" />
                      </div>
                      <div className="col-md-10">
                        <span>Share Now (Public)</span>
                      </div>
                    </div>
                  </a>
                  <a href="#" className="dropdown-item">
                    <div className="row">
                      <div className="col-md-2">
                        <i className="bx bx-share-alt" />
                      </div>
                      <div className="col-md-10">
                        <span>Share...</span>
                      </div>
                    </div>
                  </a>
                  <a href="#" className="dropdown-item">
                    <div className="row">
                      <div className="col-md-2">
                        <i className="bx bx-message" />
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
                                          <i className="bx bxs-smiley-happy" />
                                        </button>
                                        <button
                                          type="button"
                                          className="btn comment-form-btn comment-form-btn"
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title="Tooltip on top"
                                        >
                                          <i className="bx bx-camera" />
                                        </button>
                                        <button
                                          type="button"
                                          className="btn comment-form-btn comment-form-btn"
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title="Tooltip on top"
                                        >
                                          <i className="bx bx-microphone" />
                                        </button>
                                        <button
                                          type="button"
                                          className="btn comment-form-btn"
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title="Tooltip on top"
                                        >
                                          <i className="bx bx-file-blank" />
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
                                  <i className="bx bx-dots-horizontal-rounded" />
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
                                  <i className="bx bx-dots-horizontal-rounded" />
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
                                  <i className="bx bx-dots-horizontal-rounded" />
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
          {/* END POSTS */}
        </div>
      ))}
    </>
  )
}

export default Posts
