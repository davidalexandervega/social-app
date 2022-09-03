import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchUser } from '../features/auth/authSlice';
import { fetchUserPosts, reset as resetPosts } from '../features/post/postSlice';

import Post from '../components/Post';

import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';

import { ProfileCircled } from 'iconoir-react';

import '../assets/styles/Profile.scss';

const Profile = () => {
  const { username } = useParams();
  const dispatch = useDispatch();

  const { user, profileUser } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.post);

  const cloudinary = new Cloudinary({
    cloud: {
      cloudName: 'dgwf4o5mj',
    },
  });

  useEffect(() => {
    dispatch(fetchUser(username));
    dispatch(fetchUserPosts(username));
  }, [dispatch, username]);

  const profileRef = useRef();
  useEffect(() => {
    if (profileUser) {
      const timer = setTimeout(() => {
        profileRef.current.classList.add('fade', 'slide');
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [profileUser]);

  useEffect(() => {
    return () => {
      console.log('reset');
      dispatch(resetPosts());
    };
  }, []);

  return (
    <div className="view">
      {profileUser ? (
        <>
          <div className="profile" ref={profileRef}>
            <div className="profileBanner">
              {profileUser.banner === true ? (
                <AdvancedImage
                  cldImg={cloudinary.image(`/banners/${profileUser.id}`)}
                  className="bannerImage"
                />
              ) : null}
            </div>
            <div className="profileHeader">
              <div className="profilePicture">
                {profileUser.picture === true ? (
                  <AdvancedImage
                    cldImg={cloudinary.image(`/banners/${profileUser.id}`)}
                    className="bannerImage"
                  />
                ) : (
                  <ProfileCircled height="9em" width="9em" strokeWidth="0.5" fill="whitesmoke" />
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
              </div>
            </div>
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
