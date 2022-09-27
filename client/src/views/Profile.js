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

import '../assets/styles/Profile.scss';

const Profile = () => {
  const { profileUsername } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, profileUser } = useSelector((state) => state.auth);
  const { username } = user;
  const { posts } = useSelector((state) => state.post);

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

  const profileRef = useRef();
  useEffect(() => {
    if (profileUser) {
      const timer = setTimeout(() => {
        profileRef.current.classList.add('fade');
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [profileUser]);

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
        object: profileUser.id,
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
      {profileUser ? (
        <>
          <div className="viewBox" ref={profileRef}>
            <div className="profileBanner">
              {profileUser.bannerID ? (
                <AdvancedImage
                  cldImg={cloudinary.image(`/banners/${profileUser.id}`).setVersion(Date.now())}
                  className="bannerImage"
                />
              ) : null}
            </div>
            <div className="profileHeader">
              <div className="profilePicture">
                {profileUser.pictureID ? (
                  <AdvancedImage
                    cldImg={cloudinary.image(`/pictures/${profileUser.id}`).setVersion(Date.now())}
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
                      className="solidButton longButton"
                      onClick={() => navigate(`/users/${profileUser.username}/edit`)}
                    >
                      edit profile
                    </div>
                  ) : (
                    <div className="solidButton longButton" onClick={() => onFollowUser()}>
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
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Profile;
