import React, { useState } from 'react';
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { fetchUser } from '../features/auth/authSlice';

import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';

import { ProfileCircled, RemoveSquare, UploadSquareOutline } from 'iconoir-react';

const EditProfile = () => {
  const { profileUsername } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userID, profileUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!profileUser) navigate('/');
  }, [dispatch, navigate, profileUser]);

  const [formData, setFormData] = useState({
    picture: '',
    banner: '',
    bio: profileUser ? profileUser.bio : '',
  });

  const { picture, banner, bio } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      // this refers to the form control as e.target,
      // as each has a 'name' and 'value' attribute:
      [e.target.name]: e.target.value,
    }));
  };

  const cloudinary = new Cloudinary({
    cloud: {
      cloudName: 'dgwf4o5mj',
    },
  });

  const uploadPictureRef = useRef();
  const pictureRef = useRef();
  const uploadBannerRef = useRef();
  const bannerRef = useRef();

  const onPictureInput = () => {
    if (pictureRef.current.files.length !== 0) {
      setFormData((prevState) => ({
        ...prevState,
        picture: pictureRef.current.files[0],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        picture: null,
      }));
    }
  };

  const removePicture = () => {
    if (picture) {
      setFormData((prevState) => ({
        ...prevState,
        newPostImg: null,
      }));
    }
    pictureRef.current.value = null;
  };

  const editProfileHeaderRef = useRef();
  const editProfileRef = useRef();
  useEffect(() => {
    if (profileUser) {
      const timer = setTimeout(() => {
        editProfileRef.current.classList.add('fade');
        editProfileHeaderRef.current.classList.add('fade');
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [profileUser]);

  const charLeftRef = useRef();
  useEffect(() => {
    if (charLeftRef.current) charLeftRef.current.innerHTML = 200 - bio.length;
  }, [bio]);

  return (
    <div className="view">
      <div className="editProfileHeader" ref={editProfileHeaderRef}>
        edit profile
      </div>
      {profileUser && profileUser.id === userID ? (
        <div className="profile editProfile" ref={editProfileRef}>
          <div className="profileBanner">
            {profileUser.banner === true ? (
              <AdvancedImage
                cldImg={cloudinary.image(`/banners/${profileUser.id}`)}
                className="bannerImage"
              />
            ) : null}
            <div className="editImageActions">
              <UploadSquareOutline
                className="editImageAction"
                height="1.75em"
                width="1.75em"
                strokeWidth="0.9"
                fill="rgba(245, 245, 245, 0.8)"
              />
              <RemoveSquare
                className="editImageAction"
                height="1.75em"
                width="1.75em"
                strokeWidth="0.9"
                fill="rgba(245, 245, 245, 0.8)"
              />
            </div>
          </div>
          <div className="editProfileBody">
            <div className="profilePicture">
              {profileUser.picture === true ? (
                <AdvancedImage
                  cldImg={cloudinary.image(`/pictures/${profileUser.id}`)}
                  className="profileImage"
                />
              ) : (
                <ProfileCircled height="150px" width="150px" strokeWidth="0.5" fill="whitesmoke" />
              )}
              <div className="editImageActions">
                <UploadSquareOutline
                  className="editImageAction"
                  height="1.75em"
                  width="1.75em"
                  strokeWidth="0.9"
                  fill="rgba(245, 245, 245, 0.8)"
                />
                <RemoveSquare
                  className="editImageAction"
                  height="1.75em"
                  width="1.75em"
                  strokeWidth="0.9"
                  fill="rgba(245, 245, 245, 0.8)"
                />
              </div>
            </div>
            <div className="editProfileActions">
              <div className="solidButton editProfileButton">save changes</div>
              <div
                className="solidButton redButton editProfileButton"
                onClick={() => navigate(`/users/${profileUsername}`)}
              >
                cancel
              </div>
            </div>
          </div>
          <div className="editBio">
            <label htmlFor="bio">bio</label>
            <textarea
              className="editBioControl"
              id="bio"
              name="bio"
              value={bio}
              onChange={onChange}
              maxLength="200"
            />
            <span className="charLeft" ref={charLeftRef}></span>
          </div>
        </div>
      ) : (
        <div>edit page is unavailable if it's not your account.</div>
      )}
    </div>
  );
};

export default EditProfile;
