import React, { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import {
  fetchProfile,
  ejectProfile,
  followUser,
  updateFollowing,
} from '../features/auth/authSlice';
import { fetchUserPosts, reset as resetPosts } from '../features/post/postSlice';
import { createNotification } from '../features/notification/notificationSlice';

import Post from '../components/Post';

import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { Check, Plus, ProfileCircled } from 'iconoir-react';
import { BallTriangle } from 'react-loading-icons';

import '../assets/styles/Profile.scss';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profileUsername } = useParams();
  const { user, profileUser } = useSelector((state) => state.auth);
  const { username } = user;
  const { posts, isSuccess } = useSelector((state) => state.post);

  // initialize cloudinary:
  const cloudName = 'dgwf4o5mj';
  const cloudinary = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  useEffect(() => {
    dispatch(resetPosts());
    dispatch(ejectProfile());

    dispatch(fetchProfile(profileUsername));
    dispatch(fetchUserPosts(profileUsername));
    return () => {
      dispatch(resetPosts());
    };
  }, [dispatch, profileUsername]);

  // handle transition:
  const profileRef = useRef();
  useEffect(() => {
    if (profileUser && isSuccess) {
      setTimeout(() => {
        profileRef.current.classList.add('fade');
      }, 10);
    }
  }, [profileUser, isSuccess]);

  const onFollowUser = () => {
    if (!profileUser.followers.includes(user.id)) {
      const notificationData = {
        id: uuidv4(),
        time: new Date(),
        creatorID: user.id,
        creatorPictureID: user.pictureID,
        creatorUsername: username,
        recipientID: profileUser.id,
        type: 'follow_user',
        objectID: profileUser.id,
      };
      dispatch(createNotification(notificationData));
    }

    const followData = {
      targetID: profileUser.id,
      creatorID: user.id,
    };

    dispatch(followUser(followData));
    dispatch(updateFollowing());
  };

  return (
    <div className="view">
      {profileUser && isSuccess ? (
        <>
          <div className="viewBox" ref={profileRef}>
            <div className="profileBanner">
              {!isNaN(profileUser.bannerID) ? (
                <AdvancedImage
                  cldImg={cloudinary
                    .image(`/social-app/banners/${profileUser.id}`)
                    .setVersion(profileUser.bannerID)}
                  className="bannerImage"
                />
              ) : null}
            </div>
            <div className="profileHeader">
              <div className="profilePicture">
                {!isNaN(profileUser.pictureID) ? (
                  <AdvancedImage
                    cldImg={cloudinary
                      .image(`/social-app/pictures/${profileUser.id}`)
                      .setVersion(profileUser.pictureID)}
                    className="profileImage"
                  />
                ) : (
                  <ProfileCircled
                    height="150px"
                    width="150px"
                    strokeWidth="0.5"
                    fill="whitesmoke"
                  />
                )}
              </div>
              <div className="profileHeaderRight">
                <div className="profileUsername">@{profileUser.username}</div>
                <div className="profileFollowing">{profileUser.following.length} following</div>
                <div className="profileFollowers">{profileUser.followers.length} followers</div>
                <div className="profilePostCount">{posts.length} posts</div>
                <div className="profileCreated">
                  initialized {new Date(profileUser.created).toLocaleDateString()}
                </div>
                <div className="profileActions">
                  {profileUser.id === user.id ? (
                    <div
                      className="solidButton"
                      onClick={() => navigate(`/users/${profileUser.username}/edit`)}
                    >
                      edit profile
                    </div>
                  ) : (
                    <div className="solidButton" onClick={() => onFollowUser()}>
                      {profileUser.followers.includes(user.id) ? (
                        <>
                          following &nbsp;
                          <Check />
                        </>
                      ) : (
                        <>
                          follow &nbsp;
                          <Plus />
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="profileBio">{profileUser.bio}</div>
          </div>
          <div className="profilePosts">
            {posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
            {posts.length === 0 ? <span className="clientMessage">no posts yet...</span> : null}
          </div>
        </>
      ) : (
        <span className="loadingContainer">
          <BallTriangle className="loadingIcon" stroke="#000000" strokeOpacity="0.7" height="2em" />
        </span>
      )}
    </div>
  );
};

export default Profile;
