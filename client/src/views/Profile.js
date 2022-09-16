import React, { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchUser } from '../features/auth/authSlice';
import { fetchUserPosts, reset as resetPosts } from '../features/post/postSlice';

import Post from '../components/Post';

import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';

import { ProfileCircled } from 'iconoir-react';

import '../assets/styles/Profile.scss';

const Profile = () => {
  const { profileUsername } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { username, userID, profileUser } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.post);

  const cloudinary = new Cloudinary({
    cloud: {
      cloudName: 'dgwf4o5mj',
    },
  });

  useEffect(() => {
    dispatch(fetchUser(profileUsername));
    dispatch(fetchUserPosts(profileUsername));
  }, [dispatch, username, profileUsername]);

  const profileRef = useRef();
  useEffect(() => {
    if (profileUser) {
      const timer = setTimeout(() => {
        profileRef.current.classList.add('fade', 'slide');
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [profileUser]);

  useEffect(() => {
    dispatch(resetPosts());
    return () => {
      dispatch(resetPosts());
    };
  }, [dispatch]);

  return (
    <div className="view">
      {profileUser ? (
        <>
          <div className="profile" ref={profileRef}>
            <div className="profileBanner">
              {profileUser.banner ? (
                <AdvancedImage
                  cldImg={cloudinary.image(`/banners/${profileUser.id}`).setVersion(Date.now())}
                  className="bannerImage"
                />
              ) : null}
            </div>
            <div className="profileHeader">
              <div className="profilePicture">
                {profileUser.picture ? (
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
                  {profileUser.id === userID ? (
                    <div
                      className="solidButton editProfileButton"
                      onClick={() => navigate(`/users/${profileUser.username}/edit`)}
                    >
                      edit profile
                    </div>
                  ) : (
                    <div className="solidButton">follow</div>
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
