import React, { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchProfile, ejectProfile } from '../features/auth/authSlice';
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

  const { user, profileUser } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.post);

  const cloudName = 'dgwf4o5mj';
  const cloudinary = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  useEffect(() => {
    dispatch(ejectProfile());
    dispatch(fetchProfile(profileUsername));
    dispatch(fetchUserPosts(profileUsername));
  }, [dispatch, profileUsername]);

  const profileRef = useRef();
  useEffect(() => {
    if (profileUser) {
      const timer = setTimeout(() => {
        profileRef.current.classList.add('fade');
      }, 500);
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
          <div className="viewBox" ref={profileRef}>
            <div className="profileBanner">
              {profileUser.hasBanner ? (
                <AdvancedImage
                  cldImg={cloudinary.image(`/banners/${profileUser.id}`).setVersion(Date.now())}
                  className="bannerImage"
                />
              ) : null}
            </div>
            <div className="profileHeader">
              <div className="profilePicture">
                {profileUser.hasPicture ? (
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
                    <div className="solidButton longButton">following</div>
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
