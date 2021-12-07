import React from 'react'

const Posts = () => {
  return (
    <div className="row newsfeed-right-side-content mt-3">
    <div className="col-md-3 newsfeed-left-side sticky-top shadow-sm" id="sidebar-wrapper">
      <div className="card newsfeed-user-card h-100">
        <ul className="list-group list-group-flush newsfeed-left-sidebar">
          <li className="list-group-item">
            <h6>Home</h6>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center sd-active">
            <a href="index.html" className="sidebar-item"><img src="/images/icons/left-sidebar/newsfeed.png" alt="newsfeed" /> News Feed</a>
            <a href="#" className="newsfeedListicon"><i className='bx bx-dots-horizontal-rounded'></i></a>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <a href="messages.html" className="sidebar-item"><img src="/images/icons/left-sidebar/message.png" alt="message" /> Mensajes</a>
            <span className="badge badge-primary badge-pill">2</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <a href="groups.html" className="sidebar-item"><img src="/images/icons/left-sidebar/group.png" alt="group" /> Grupos</a>
            <span className="badge badge-primary badge-pill">17</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <a href="events.html" className="sidebar-item"><img src="/images/icons/left-sidebar/event.png" alt="event" /> Events</a>
            <span className="badge badge-primary badge-pill">3</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <a href="saved.html" className="sidebar-item"><img src="/images/icons/left-sidebar/saved.png" alt="saved" /> Saved</a>
            <span className="badge badge-primary badge-pill">8</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <a href="find-friends.html" className="sidebar-item"><img src="/images/icons/left-sidebar/find-friends.png" alt="find-friends" /> Find Friends</a>
            <span className="badge badge-primary badge-pill"><i className='bx bx-chevron-right'></i></span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <a href="matches.html" className="sidebar-item"><img src="/images/icons/left-sidebar/matches.png" alt="matches" /> Matches</a>
            <span className="badge badge-primary badge-pill"><i className='bx bx-chevron-right'></i></span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <a href="teams.html" className="sidebar-item"><img src="/images/icons/left-sidebar/team.png" alt="find-friends" /> Argon For Teams</a>
            <span className="badge badge-primary badge-pill"><i className='bx bx-chevron-right'></i></span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center newsLink">
            <a href="https://github.com/ArtMin96/argon-social" target="_blank" className="sidebar-item"><img src="/images/icons/left-sidebar/news.png" alt="find-friends" /> News</a>
            <span className="badge badge-primary badge-pill"><i className='bx bx-chevron-right'></i></span>
          </li>
        </ul>
      </div>
    </div>
    <div className="col-md-6 second-section" id="page-content-wrapper">
      <div className="mb-3">
        <div className="btn-group d-flex">
          <a href="index.html" className="btn btn-quick-links mr-3 ql-active">
            <img src="/images/icons/theme/speech.png" className="mr-2" alt="quick links icon" />
            <span className="fs-8">Speech</span>
          </a>
          <a href="messages.html" className="btn btn-quick-links mr-3">
            <img src="/images/icons/theme/listen.png" className="mr-2" alt="quick links icon" />
            <span className="fs-8">Listen</span>
          </a>
          <a href="watch.html" className="btn btn-quick-links">
            <img src="/images/icons/theme/watch.png" className="mr-2" alt="quick links icon" />
            <span className="fs-8">Watch</span>
          </a>
        </div>
      </div>
      <ul className="list-unstyled" style={{ marginBottom: 0 }}>
        <li className="media post-form w-shadow">
          <div className="media-body">
            <div className="form-group post-input">
              <textarea className="form-control" id="postForm" rows="2" placeholder="What's on your mind, Arthur?"></textarea>
            </div>
            <div className="row post-form-group">
              <div className="col-md-9">
                <button type="button" className="btn btn-link post-form-btn btn-sm">
                  <img src="/images/icons/theme/post-image.png" alt="post form icon" /> <span>Photo/Video</span>
                </button>
                <button type="button" className="btn btn-link post-form-btn btn-sm">
                  <img src="/images/icons/theme/tag-friend.png" alt="post form icon" /> <span>Tag Friends</span>
                </button>
                <button type="button" className="btn btn-link post-form-btn btn-sm">
                  <img src="/images/icons/theme/check-in.png" alt="post form icon" /> <span>Check In</span>
                </button>
              </div>
              <div className="col-md-3 text-right">
                <button type="button" className="btn btn-primary btn-sm">Publish</button>
              </div>
            </div>
          </div>
        </li>
      </ul>

      {/* <!-- Posts --> */}
      <div className="posts-section mb-5">
        <div className="post border-bottom p-3 bg-white w-shadow">
          <div className="media text-muted pt-3">
            <img src="/images/users/user-1.jpg" alt="Online user" className="mr-3 post-user-image" />
            <div className="media-body pb-3 mb-0 small lh-125">
              <div className="d-flex justify-content-between align-items-center w-100">
                <a href="#" className="text-gray-dark post-user-name">John Michael</a>
                <div className="dropdown">
                  <a href="#" className="post-more-settings" role="button" data-toggle="dropdown" id="postOptions" aria-haspopup="true" aria-expanded="false">
                    <i className='bx bx-dots-horizontal-rounded'></i>
                  </a>
                  <div className="dropdown-menu dropdown-menu-right dropdown-menu-lg-left post-dropdown-menu">
                    <a href="#" className="dropdown-item" aria-describedby="savePost">
                      <div className="row">
                        <div className="col-md-2">
                          <i className='bx bx-bookmark-plus post-option-icon'></i>
                        </div>
                        <div className="col-md-10">
                          <span className="fs-9">Save post</span>
                          <small id="savePost" className="form-text text-muted">Add this to your saved items</small>
                        </div>
                      </div>
                    </a>
                    <a href="#" className="dropdown-item" aria-describedby="hidePost">
                      <div className="row">
                        <div className="col-md-2">
                          <i className='bx bx-hide post-option-icon'></i>
                        </div>
                        <div className="col-md-10">
                          <span className="fs-9">Hide post</span>
                          <small id="hidePost" className="form-text text-muted">See fewer posts like this</small>
                        </div>
                      </div>
                    </a>
                    <a href="#" className="dropdown-item" aria-describedby="snoozePost">
                      <div className="row">
                        <div className="col-md-2">
                          <i className='bx bx-time post-option-icon'></i>
                        </div>
                        <div className="col-md-10">
                          <span className="fs-9">Snooze Lina for 30 days</span>
                          <small id="snoozePost" className="form-text text-muted">Temporarily stop seeing posts</small>
                        </div>
                      </div>
                    </a>
                    <a href="#" className="dropdown-item" aria-describedby="reportPost">
                      <div className="row">
                        <div className="col-md-2">
                          <i className='bx bx-block post-option-icon'></i>
                        </div>
                        <div className="col-md-10">
                          <span className="fs-9">Report</span>
                          <small id="reportPost" className="form-text text-muted">I'm concerned about this post</small>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <span className="d-block">3 hours ago <i className='bx bx-globe ml-3'></i></span>
            </div>
          </div>
          <div className="mt-3">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis voluptatem veritatis harum, tenetur, quibusdam voluptatum, incidunt saepe minus maiores ea atque sequi illo veniam sint quaerat corporis totam et. Culpa?</p>
          </div>
          <div className="d-block mt-3">
            <img src="https://scontent.fevn1-2.fna.fbcdn.net/v/t1.0-9/56161887_588993861570433_2896723195090436096_n.jpg?_nc_cat=103&_nc_eui2=AeFI0UuTq3uUF_TLEbnZwM-qSRtgOu0HE2JPwW6b4hIki73-2OWYhc7L1MPsYl9cYy-w122CCak-Fxj0TE1a-kjsd-KXzh5QsuvxbW_mg9qqtg&_nc_ht=scontent.fevn1-2.fna&oh=ea44bffa38f368f98f0553c5cef8e455&oe=5D050B05"
              className="post-content" alt="post image" />
          </div>
          <div className="mb-3">
            {/* <!-- Reactions --> */}
            <div className="argon-reaction">
              <span className="like-btn">
                <a href="#" className="post-card-buttons" id="reactions"><i className='bx bxs-like mr-2'></i> 67</a>
                <ul className="reactions-box dropdown-shadow">
                  <li className="reaction reaction-like" data-reaction="Like"></li>
                  <li className="reaction reaction-love" data-reaction="Love"></li>
                  <li className="reaction reaction-haha" data-reaction="HaHa"></li>
                  <li className="reaction reaction-wow" data-reaction="Wow"></li>
                  <li className="reaction reaction-sad" data-reaction="Sad"></li>
                  <li className="reaction reaction-angry" data-reaction="Angry"></li>
                </ul>
              </span>
            </div>
            <a href="#" className="post-card-buttons" id="show-comments"><i className='bx bx-message-rounded mr-2'></i> 5</a>
            <div className="dropdown dropup share-dropup">
              <a href="#" className="post-card-buttons" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className='bx bx-share-alt mr-2'></i> Share
              </a>
              <div className="dropdown-menu post-dropdown-menu">
                <a href="#" className="dropdown-item">
                  <div className="row">
                    <div className="col-md-2">
                      <i className='bx bx-share-alt'></i>
                    </div>
                    <div className="col-md-10">
                      <span>Share Now (Public)</span>
                    </div>
                  </div>
                </a>
                <a href="#" className="dropdown-item">
                  <div className="row">
                    <div className="col-md-2">
                      <i className='bx bx-share-alt'></i>
                    </div>
                    <div className="col-md-10">
                      <span>Share...</span>
                    </div>
                  </div>
                </a>
                <a href="#" className="dropdown-item">
                  <div className="row">
                    <div className="col-md-2">
                      <i className='bx bx-message'></i>
                    </div>
                    <div className="col-md-10">
                      <span>Send as Message</span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="border-top pt-3 hide-comments" style={{ display: "none" }}>
            <div className="row bootstrap snippets">
              <div className="col-md-12">
                <div className="comment-wrapper">
                  <div className="panel panel-info">
                    <div className="panel-body">
                      <ul className="media-list comments-list">
                        <li className="media comment-form">
                          <a href="#" className="pull-left">
                            <img src="/images/users/user-4.jpg" alt="" className="img-circle" />
                          </a>
                          <div className="media-body">
                            <form action="" method="" role="form">
                              <div className="row">
                                <div className="col-md-12">
                                  <div className="input-group">
                                    <input type="text" className="form-control comment-input" placeholder="Write a comment..." />

                                    <div className="input-group-btn">
                                      <button type="button" className="btn comment-form-btn" data-toggle="tooltip" data-placement="top" title="Tooltip on top"><i className='bx bxs-smiley-happy'></i></button>
                                      <button type="button" className="btn comment-form-btn comment-form-btn" data-toggle="tooltip" data-placement="top" title="Tooltip on top"><i className='bx bx-camera'></i></button>
                                      <button type="button" className="btn comment-form-btn comment-form-btn" data-toggle="tooltip" data-placement="top" title="Tooltip on top"><i className='bx bx-microphone'></i></button>
                                      <button type="button" className="btn comment-form-btn" data-toggle="tooltip" data-placement="top" title="Tooltip on top"><i className='bx bx-file-blank'></i></button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                        </li>
                        <li className="media">
                          <a href="#" className="pull-left">
                            <img src="/images/users/user-2.jpg" alt="" className="img-circle" />
                          </a>
                          <div className="media-body">
                            <div className="d-flex justify-content-between align-items-center w-100">
                              <strong className="text-gray-dark"><a href="#" className="fs-8">Karen Minas</a></strong>
                              <a href="#"><i className='bx bx-dots-horizontal-rounded'></i></a>
                            </div>
                            <span className="d-block comment-created-time">30 min ago</span>
                            <p className="fs-8 pt-2">
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, <a href="#">#consecteturadipiscing </a>.
                            </p>
                            <div className="commentLR">
                              <button type="button" className="btn btn-link fs-8">Like</button>
                              <button type="button" className="btn btn-link fs-8">Reply</button>
                            </div>
                          </div>
                        </li>
                        <li className="media">
                          <a href="#" className="pull-left">
                            <img src="https://bootdey.com/img/Content/user_2.jpg" alt="" className="img-circle" />
                          </a>
                          <div className="media-body">
                            <div className="d-flex justify-content-between align-items-center w-100">
                              <strong className="text-gray-dark"><a href="#" className="fs-8">Lia Earnest</a></strong>
                              <a href="#"><i className='bx bx-dots-horizontal-rounded'></i></a>
                            </div>
                            <span className="d-block comment-created-time">2 hours ago</span>
                            <p className="fs-8 pt-2">
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, <a href="#">#consecteturadipiscing </a>.
                            </p>
                            <div className="commentLR">
                              <button type="button" className="btn btn-link fs-8">Like</button>
                              <button type="button" className="btn btn-link fs-8">Reply</button>
                            </div>
                          </div>
                        </li>
                        <li className="media">
                          <a href="#" className="pull-left">
                            <img src="https://bootdey.com/img/Content/user_3.jpg" alt="" className="img-circle" />
                          </a>
                          <div className="media-body">
                            <div className="d-flex justify-content-between align-items-center w-100">
                              <strong className="text-gray-dark"><a href="#" className="fs-8">Rusty Mickelsen</a></strong>
                              <a href="#"><i className='bx bx-dots-horizontal-rounded'></i></a>
                            </div>
                            <span className="d-block comment-created-time">17 hours ago</span>
                            <p className="fs-8 pt-2">
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, <a href="#">#consecteturadipiscing </a>.
                            </p>
                            <div className="commentLR">
                              <button type="button" className="btn btn-link fs-8">Like</button>
                              <button type="button" className="btn btn-link fs-8">Reply</button>
                            </div>
                          </div>
                        </li>
                        <li className="media">
                          <div className="media-body">
                            <div className="comment-see-more text-center">
                              <button type="button" className="btn btn-link fs-8">See More</button>
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
        <div className="post border-bottom p-3 bg-white w-shadow">
          <div className="media text-muted pt-3">
            <img src="/images/users/user-2.jpg" alt="Online user" className="mr-3 post-user-image" />
            <div className="media-body pb-3 mb-0 small lh-125">
              <div className="d-flex justify-content-between align-items-center w-100">
                <a href="#" className="text-gray-dark post-user-name">Karen Minas</a>
                <div className="dropdown">
                  <a href="#" className="post-more-settings" role="button" data-toggle="dropdown" id="postOptions" aria-haspopup="true" aria-expanded="false">
                    <i className='bx bx-dots-horizontal-rounded'></i>
                  </a>
                  <div className="dropdown-menu dropdown-menu-right dropdown-menu-lg-left post-dropdown-menu">
                    <a href="#" className="dropdown-item" aria-describedby="savePost">
                      <div className="row">
                        <div className="col-md-2">
                          <i className='bx bx-bookmark-plus post-option-icon'></i>
                        </div>
                        <div className="col-md-10">
                          <span className="fs-9">Save post</span>
                          <small id="savePost" className="form-text text-muted">Add this to your saved items</small>
                        </div>
                      </div>
                    </a>
                    <a href="#" className="dropdown-item" aria-describedby="hidePost">
                      <div className="row">
                        <div className="col-md-2">
                          <i className='bx bx-hide post-option-icon'></i>
                        </div>
                        <div className="col-md-10">
                          <span className="fs-9">Hide post</span>
                          <small id="hidePost" className="form-text text-muted">See fewer posts like this</small>
                        </div>
                      </div>
                    </a>
                    <a href="#" className="dropdown-item" aria-describedby="snoozePost">
                      <div className="row">
                        <div className="col-md-2">
                          <i className='bx bx-time post-option-icon'></i>
                        </div>
                        <div className="col-md-10">
                          <span className="fs-9">Snooze Karen for 30 days</span>
                          <small id="snoozePost" className="form-text text-muted">Temporarily stop seeing posts</small>
                        </div>
                      </div>
                    </a>
                    <a href="#" className="dropdown-item" aria-describedby="reportPost">
                      <div className="row">
                        <div className="col-md-2">
                          <i className='bx bx-block post-option-icon'></i>
                        </div>
                        <div className="col-md-10">
                          <span className="fs-9">Report</span>
                          <small id="reportPost" className="form-text text-muted">I'm concerned about this post</small>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <span className="d-block">3 hours ago <i className='bx bx-globe ml-3'></i></span>
            </div>
          </div>
          <div className="mt-3">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis voluptatem veritatis harum, tenetur, quibusdam voluptatum, incidunt saepe minus maiores ea atque sequi illo veniam sint quaerat corporis totam et. Culpa?</p>
          </div>
          <div className="d-block mt-3">
            <video id="my_video_1" className="video-js vjs-default-skin post-content" width="640px" height="400px" controls preload="none" poster='https://scontent.fevn1-2.fna.fbcdn.net/v/t1.0-9/53323455_587990788367325_4529827897430507520_n.jpg?_nc_cat=100&_nc_eui2=AeF-F6s-7bevnyjZs6JbGj3WPqHUIRKQ4uJ2vH8L-OD-3KZPZFJ7GVOVSYewqLB1928c3NeJ-OWQgN9et1oxB4kpONH0rFMSpp1H-lfjwH2tzA&_nc_ht=scontent.fevn1-2.fna&oh=ab0d869caefae1260b3ff755e2e031ba&oe=5D07FF32'
              data-setup='{ "aspectRatio":"640:400", "playbackRates": [1, 1.5, 2] }'>
              <source src="https://vjs.zencdn.net/v/oceans.mp4" type='video/mp4' />
              <source src="https://vjs.zencdn.net/v/oceans.webm" type='video/webm' />
            </video>
          </div>
          <div className="mb-3">
            {/* <!-- Reactions --> */}
            <div className="argon-reaction">
              <span className="like-btn">
                <a href="#" className="post-card-buttons" id="reactions"><i className='bx bxs-like mr-2'></i> 67</a>
                <ul className="reactions-box dropdown-shadow">
                  <li className="reaction reaction-like" data-reaction="Like"></li>
                  <li className="reaction reaction-love" data-reaction="Love"></li>
                  <li className="reaction reaction-haha" data-reaction="HaHa"></li>
                  <li className="reaction reaction-wow" data-reaction="Wow"></li>
                  <li className="reaction reaction-sad" data-reaction="Sad"></li>
                  <li className="reaction reaction-angry" data-reaction="Angry"></li>
                </ul>
              </span>
            </div>
            <a href="#" className="post-card-buttons" id="show-comments"><i className='bx bx-message-rounded mr-2'></i> 5</a>
            <div className="dropdown dropup share-dropup">
              <a href="#" className="post-card-buttons" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className='bx bx-share-alt mr-2'></i> Share
              </a>
              <div className="dropdown-menu post-dropdown-menu">
                <a href="#" className="dropdown-item">
                  <div className="row">
                    <div className="col-md-2">
                      <i className='bx bx-share-alt'></i>
                    </div>
                    <div className="col-md-10">
                      <span>Share Now (Public)</span>
                    </div>
                  </div>
                </a>
                <a href="#" className="dropdown-item">
                  <div className="row">
                    <div className="col-md-2">
                      <i className='bx bx-share-alt'></i>
                    </div>
                    <div className="col-md-10">
                      <span>Share...</span>
                    </div>
                  </div>
                </a>
                <a href="#" className="dropdown-item">
                  <div className="row">
                    <div className="col-md-2">
                      <i className='bx bx-message'></i>
                    </div>
                    <div className="col-md-10">
                      <span>Send as Message</span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="border-top pt-3 hide-comments" style={{ display: "none" }}>
            <div className="row bootstrap snippets">
              <div className="col-md-12">
                <div className="comment-wrapper">
                  <div className="panel panel-info">
                    <div className="panel-body">
                      <ul className="media-list comments-list">
                        <li className="media comment-form">
                          <a href="#" className="pull-left">
                            <img src="/images/users/user-4.jpg" alt="" className="img-circle" />
                          </a>
                          <div className="media-body">
                            <form action="" method="" role="form">
                              <div className="row">
                                <div className="col-md-12">
                                  <div className="input-group">
                                    <input type="text" className="form-control comment-input" placeholder="Write a comment..." />

                                    <div className="input-group-btn">
                                      <button type="button" className="btn comment-form-btn" data-toggle="tooltip" data-placement="top" title="Tooltip on top"><i className='bx bxs-smiley-happy'></i></button>
                                      <button type="button" className="btn comment-form-btn comment-form-btn" data-toggle="tooltip" data-placement="top" title="Tooltip on top"><i className='bx bx-camera'></i></button>
                                      <button type="button" className="btn comment-form-btn comment-form-btn" data-toggle="tooltip" data-placement="top" title="Tooltip on top"><i className='bx bx-microphone'></i></button>
                                      <button type="button" className="btn comment-form-btn" data-toggle="tooltip" data-placement="top" title="Tooltip on top"><i className='bx bx-file-blank'></i></button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                        </li>
                        <li className="media">
                          <a href="#" className="pull-left">
                            <img src="/images/users/user-2.jpg" alt="" className="img-circle" />
                          </a>
                          <div className="media-body">
                            <div className="d-flex justify-content-between align-items-center w-100">
                              <strong className="text-gray-dark"><a href="#" className="fs-8">Karen Minas</a></strong>
                              <a href="#"><i className='bx bx-dots-horizontal-rounded'></i></a>
                            </div>
                            <span className="d-block comment-created-time">30 min ago</span>
                            <p className="fs-8 pt-2">
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, <a href="#">#consecteturadipiscing </a>.
                            </p>
                            <div className="commentLR">
                              <button type="button" className="btn btn-link fs-8">Like</button>
                              <button type="button" className="btn btn-link fs-8">Reply</button>
                            </div>
                          </div>
                        </li>
                        <li className="media">
                          <a href="#" className="pull-left">
                            <img src="https://bootdey.com/img/Content/user_2.jpg" alt="" className="img-circle" />
                          </a>
                          <div className="media-body">
                            <div className="d-flex justify-content-between align-items-center w-100">
                              <strong className="text-gray-dark"><a href="#" className="fs-8">Lia Earnest</a></strong>
                              <a href="#"><i className='bx bx-dots-horizontal-rounded'></i></a>
                            </div>
                            <span className="d-block comment-created-time">2 hours ago</span>
                            <p className="fs-8 pt-2">
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, <a href="#">#consecteturadipiscing </a>.
                            </p>
                            <div className="commentLR">
                              <button type="button" className="btn btn-link fs-8">Like</button>
                              <button type="button" className="btn btn-link fs-8">Reply</button>
                            </div>
                          </div>
                        </li>
                        <li className="media">
                          <a href="#" className="pull-left">
                            <img src="https://bootdey.com/img/Content/user_3.jpg" alt="" className="img-circle" />
                          </a>
                          <div className="media-body">
                            <div className="d-flex justify-content-between align-items-center w-100">
                              <strong className="text-gray-dark"><a href="#" className="fs-8">Rusty Mickelsen</a></strong>
                              <a href="#"><i className='bx bx-dots-horizontal-rounded'></i></a>
                            </div>
                            <span className="d-block comment-created-time">17 hours ago</span>
                            <p className="fs-8 pt-2">
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, <a href="#">#consecteturadipiscing </a>.
                            </p>
                            <div className="commentLR">
                              <button type="button" className="btn btn-link fs-8">Like</button>
                              <button type="button" className="btn btn-link fs-8">Reply</button>
                            </div>
                          </div>
                        </li>
                        <li className="media">
                          <div className="media-body">
                            <div className="comment-see-more text-center">
                              <button type="button" className="btn btn-link fs-8">See More</button>
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
        <div className="post border-bottom p-3 bg-white w-shadow">
          <div className="media text-muted pt-3">
            <img src="/images/users/user-4.jpg" alt="Online user" className="mr-3 post-user-image" />
            <div className="media-body pb-3 mb-0 small lh-125">
              <div className="d-flex justify-content-between align-items-center w-100">
                <a href="#" className="text-gray-dark post-user-name">Arthur Minasyan</a>
                <div className="dropdown">
                  <a href="#" className="post-more-settings" role="button" data-toggle="dropdown" id="postOptions" aria-haspopup="true" aria-expanded="false">
                    <i className='bx bx-dots-horizontal-rounded'></i>
                  </a>
                  <div className="dropdown-menu dropdown-menu-right dropdown-menu-lg-left post-dropdown-menu">
                    <a href="#" className="dropdown-item" aria-describedby="savePost">
                      <div className="row">
                        <div className="col-md-2">
                          <i className='bx bx-bookmark-plus post-option-icon'></i>
                        </div>
                        <div className="col-md-10">
                          <span className="fs-9">Save post</span>
                          <small id="savePost" className="form-text text-muted">Add this to your saved items</small>
                        </div>
                      </div>
                    </a>
                    <a href="#" className="dropdown-item" aria-describedby="hidePost">
                      <div className="row">
                        <div className="col-md-2">
                          <i className='bx bx-hide post-option-icon'></i>
                        </div>
                        <div className="col-md-10">
                          <span className="fs-9">Hide post</span>
                          <small id="hidePost" className="form-text text-muted">See fewer posts like this</small>
                        </div>
                      </div>
                    </a>
                    <a href="#" className="dropdown-item" aria-describedby="snoozePost">
                      <div className="row">
                        <div className="col-md-2">
                          <i className='bx bx-time post-option-icon'></i>
                        </div>
                        <div className="col-md-10">
                          <span className="fs-9">Snooze Arthur for 30 days</span>
                          <small id="snoozePost" className="form-text text-muted">Temporarily stop seeing posts</small>
                        </div>
                      </div>
                    </a>
                    <a href="#" className="dropdown-item" aria-describedby="reportPost">
                      <div className="row">
                        <div className="col-md-2">
                          <i className='bx bx-block post-option-icon'></i>
                        </div>
                        <div className="col-md-10">
                          <span className="fs-9">Report</span>
                          <small id="reportPost" className="form-text text-muted">I'm concerned about this post</small>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <span className="d-block">3 hours ago <i className='bx bx-globe ml-3'></i></span>
            </div>
          </div>
          <div className="mt-3">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis voluptatem veritatis harum, tenetur, quibusdam voluptatum, incidunt saepe minus maiores ea atque sequi illo veniam sint quaerat corporis totam et. Culpa?</p>
          </div>
          <div className="d-block mt-3">
            <img src="https://scontent.fevn1-2.fna.fbcdn.net/v/t1.0-9/54799225_2011170049005317_4866978526609276928_o.jpg?_nc_cat=107&_nc_eui2=AeEHQnVZPRAGrFMwQkvn9nKuaYZc2vCQIEISZzVqaGn3SkHJcmP_KHM2GGNG1UMbyL-HjX03GFyI0Rf3Ft1k0zlGmfGCEeuckyqHUN-a0JRe7A&_nc_ht=scontent.fevn1-2.fna&oh=d3a637e08353d870a8125f69c0b2b9ff&oe=5D4E5770"
              className="post-content" alt="post image" />
          </div>
          <div className="mb-3">
            {/* <!-- Reactions --> */}
            <div className="argon-reaction">
              <span className="like-btn">
                <a href="#" className="post-card-buttons" id="reactions"><i className='bx bxs-like mr-2'></i> 67</a>
                <ul className="reactions-box dropdown-shadow">
                  <li className="reaction reaction-like" data-reaction="Like"></li>
                  <li className="reaction reaction-love" data-reaction="Love"></li>
                  <li className="reaction reaction-haha" data-reaction="HaHa"></li>
                  <li className="reaction reaction-wow" data-reaction="Wow"></li>
                  <li className="reaction reaction-sad" data-reaction="Sad"></li>
                  <li className="reaction reaction-angry" data-reaction="Angry"></li>
                </ul>
              </span>
            </div>
            <a href="#" className="post-card-buttons" id="show-comments"><i className='bx bx-message-rounded mr-2'></i> 5</a>
            <div className="dropdown dropup share-dropup">
              <a href="#" className="post-card-buttons" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className='bx bx-share-alt mr-2'></i> Share
              </a>
              <div className="dropdown-menu post-dropdown-menu">
                <a href="#" className="dropdown-item">
                  <div className="row">
                    <div className="col-md-2">
                      <i className='bx bx-share-alt'></i>
                    </div>
                    <div className="col-md-10">
                      <span>Share Now (Public)</span>
                    </div>
                  </div>
                </a>
                <a href="#" className="dropdown-item">
                  <div className="row">
                    <div className="col-md-2">
                      <i className='bx bx-share-alt'></i>
                    </div>
                    <div className="col-md-10">
                      <span>Share...</span>
                    </div>
                  </div>
                </a>
                <a href="#" className="dropdown-item">
                  <div className="row">
                    <div className="col-md-2">
                      <i className='bx bx-message'></i>
                    </div>
                    <div className="col-md-10">
                      <span>Send as Message</span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="border-top pt-3 hide-comments" style={{ display: "none" }}>
            <div className="row bootstrap snippets">
              <div className="col-md-12">
                <div className="comment-wrapper">
                  <div className="panel panel-info">
                    <div className="panel-body">
                      <ul className="media-list comments-list">
                        <li className="media comment-form">
                          <a href="#" className="pull-left">
                            <img src="/images/users/user-4.jpg" alt="" className="img-circle" />
                          </a>
                          <div className="media-body">
                            <form action="" method="" role="form">
                              <div className="row">
                                <div className="col-md-12">
                                  <div className="input-group">
                                    <input type="text" className="form-control comment-input" placeholder="Write a comment..." />

                                    <div className="input-group-btn">
                                      <button type="button" className="btn comment-form-btn" data-toggle="tooltip" data-placement="top" title="Tooltip on top"><i className='bx bxs-smiley-happy'></i></button>
                                      <button type="button" className="btn comment-form-btn comment-form-btn" data-toggle="tooltip" data-placement="top" title="Tooltip on top"><i className='bx bx-camera'></i></button>
                                      <button type="button" className="btn comment-form-btn comment-form-btn" data-toggle="tooltip" data-placement="top" title="Tooltip on top"><i className='bx bx-microphone'></i></button>
                                      <button type="button" className="btn comment-form-btn" data-toggle="tooltip" data-placement="top" title="Tooltip on top"><i className='bx bx-file-blank'></i></button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                        </li>
                        <li className="media">
                          <a href="#" className="pull-left">
                            <img src="/images/users/user-2.jpg" alt="" className="img-circle" />
                          </a>
                          <div className="media-body">
                            <div className="d-flex justify-content-between align-items-center w-100">
                              <strong className="text-gray-dark"><a href="#" className="fs-8">Karen Minas</a></strong>
                              <a href="#"><i className='bx bx-dots-horizontal-rounded'></i></a>
                            </div>
                            <span className="d-block comment-created-time">30 min ago</span>
                            <p className="fs-8 pt-2">
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, <a href="#">#consecteturadipiscing </a>.
                            </p>
                            <div className="commentLR">
                              <button type="button" className="btn btn-link fs-8">Like</button>
                              <button type="button" className="btn btn-link fs-8">Reply</button>
                            </div>
                          </div>
                        </li>
                        <li className="media">
                          <a href="#" className="pull-left">
                            <img src="https://bootdey.com/img/Content/user_2.jpg" alt="" className="img-circle" />
                          </a>
                          <div className="media-body">
                            <div className="d-flex justify-content-between align-items-center w-100">
                              <strong className="text-gray-dark"><a href="#" className="fs-8">Lia Earnest</a></strong>
                              <a href="#"><i className='bx bx-dots-horizontal-rounded'></i></a>
                            </div>
                            <span className="d-block comment-created-time">2 hours ago</span>
                            <p className="fs-8 pt-2">
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, <a href="#">#consecteturadipiscing </a>.
                            </p>
                            <div className="commentLR">
                              <button type="button" className="btn btn-link fs-8">Like</button>
                              <button type="button" className="btn btn-link fs-8">Reply</button>
                            </div>
                          </div>
                        </li>
                        <li className="media">
                          <a href="#" className="pull-left">
                            <img src="https://bootdey.com/img/Content/user_3.jpg" alt="" className="img-circle" />
                          </a>
                          <div className="media-body">
                            <div className="d-flex justify-content-between align-items-center w-100">
                              <strong className="text-gray-dark"><a href="#" className="fs-8">Rusty Mickelsen</a></strong>
                              <a href="#"><i className='bx bx-dots-horizontal-rounded'></i></a>
                            </div>
                            <span className="d-block comment-created-time">17 hours ago</span>
                            <p className="fs-8 pt-2">
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, <a href="#">#consecteturadipiscing </a>.
                            </p>
                            <div className="commentLR">
                              <button type="button" className="btn btn-link fs-8">Like</button>
                              <button type="button" className="btn btn-link fs-8">Reply</button>
                            </div>
                          </div>
                        </li>
                        <li className="media">
                          <div className="media-body">
                            <div className="comment-see-more text-center">
                              <button type="button" className="btn btn-link fs-8">See More</button>
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
        <div className="d-flex justify-content-center my-5 load-post">
          <button type="button" className="btn btn-quick-link join-group-btn border shadow" data-toggle="tooltip" data-placement="top" data-title="Load More Post"><i className='bx bx-dots-horizontal-rounded'></i></button>
        </div>
      </div>
    </div>
    <div className="col-md-3 third-section">
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="weather-card-header d-flex justify-content-between align-items-center">
            <p className="fs-1 mb-0">11:37 PM</p>
            <a href="#" className="btn text-primary">California, CA <i className='bx bx-chevron-down'></i></a>
          </div>
          <div className="weather-quick align-items-center mt-4">
            <div className="row">
              <div className="col-md-8">
                <img src="/images/icons/weather/sun.png" width="40" height="40" alt="Weather icon" />
                <h1 className="weather-card display-4 ml-3">28<span className="text-muted">&deg;</span></h1>
              </div>
              <div className="col-md-4">
                <p className="mb-0 fs-1"><i className='bx bx-droplet'></i> 15%</p>
                <p className="mb-0 fs-1"><i className='bx bx-flag'></i> 10km/h</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Posts
