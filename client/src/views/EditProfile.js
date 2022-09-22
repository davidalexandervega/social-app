import React, { useState } from 'react';
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import { editProfile, toggleUpdate } from '../features/auth/authSlice';

import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';

import { ProfileCircled, RemoveSquare, UploadSquareOutline } from 'iconoir-react';

const EditProfile = () => {
  const { profileUsername } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userID, profileUser, updating } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!profileUser) navigate('/');
  }, [dispatch, navigate, profileUser]);

  const editProfileHeaderRef = useRef();
  const editProfileRef = useRef();
  useEffect(() => {
    if (profileUser && updating === false) {
      console.log(profileUser);
      const timer = setTimeout(() => {
        editProfileRef.current.classList.add('fade');
        editProfileHeaderRef.current.classList.add('fade');
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [profileUser, updating]);

  const [formData, setFormData] = useState({
    banner: profileUser.hasBanner,
    deleteBanner: false,
    picture: profileUser.hasPicture,
    deletePicture: false,
    bio: profileUser ? profileUser.bio : '',
  });

  const { banner, picture, bio } = formData;

  const cloudName = 'dgwf4o5mj';
  const cloudinary = new Cloudinary({
    cloud: {
      cloudName: cloudName,
    },
  });

  const bannerRef = useRef();
  const pictureRef = useRef();

  const onBannerInput = () => {
    if (bannerRef.current.files.length !== 0) {
      setFormData((prevState) => ({
        ...prevState,
        banner: URL.createObjectURL(bannerRef.current.files[0]),
        deleteBanner: true,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        banner: null,
        deleteBanner: true,
      }));
    }
  };

  const removeBanner = () => {
    if (banner) {
      setFormData((prevState) => ({
        ...prevState,
        banner: null,
        deleteBanner: true,
      }));
    }
    bannerRef.current.value = null;
  };

  const onPictureInput = () => {
    if (pictureRef.current.files.length !== 0) {
      setFormData((prevState) => ({
        ...prevState,
        picture: URL.createObjectURL(pictureRef.current.files[0]),
        deletePicture: true,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        picture: null,
        deletePicture: true,
      }));
    }
  };

  const removePicture = () => {
    if (picture) {
      setFormData((prevState) => ({
        ...prevState,
        picture: null,
        deletePicture: true,
      }));
    }
    pictureRef.current.value = null;
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      // this refers to the form control as e.target,
      // as each has a 'name' and 'value' attribute:
      [e.target.name]: e.target.value,
    }));
  };

  const charLeftRef = useRef();
  useEffect(() => {
    if (charLeftRef.current) charLeftRef.current.innerHTML = 200 - bio.length;
  }, [bio]);

  const onSubmit = () => {
    const profileData = {
      username: profileUsername,
      id: profileUser.id,
      hasBanner: formData.banner ? true : false,
      deleteBanner: formData.deleteBanner,
      hasPicture: formData.picture ? true : false,
      deletePicture: formData.deletePicture,
      bio: formData.bio,
    };
    dispatch(editProfile(profileData));
    setTimeout(() => {
      editProfileRef.current.classList.remove('fade');
      editProfileHeaderRef.current.classList.remove('fade');
    }, 10);
  };

  useEffect(() => {
    if (updating === true) {
      if (formData.banner && formData.banner !== true) {
        const bannerData = new FormData();
        bannerData.append('file', bannerRef.current.files[0]);
        bannerData.append('upload_preset', 'social');
        bannerData.append('public_id', profileUser.id);
        bannerData.append('folder', '/banners/');
        axios
          .post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, bannerData)
          .then((response) => console.log(response));
      }
      if (formData.picture && formData.picture !== true) {
        const pictureData = new FormData();
        pictureData.append('file', pictureRef.current.files[0]);
        pictureData.append('upload_preset', 'social');
        pictureData.append('public_id', profileUser.id);
        pictureData.append('folder', '/pictures/');
        axios
          .post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, pictureData)
          .then((response) => console.log(response));
      }
      setTimeout(() => {
        dispatch(toggleUpdate());
        navigate(`/users/${profileUsername}`);
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updating]);

  return (
    <div className="view">
      <div className="editViewHeader" ref={editProfileHeaderRef}>
        edit profile
      </div>
      {profileUser && profileUser.id === userID ? (
        <div className="viewBox editProfile" ref={editProfileRef}>
          <div className="profileBanner">
            {formData.banner ? (
              <>
                {formData.banner === true ? (
                  <AdvancedImage
                    cldImg={cloudinary.image(`/banners/${profileUser.id}`).setVersion(Date.now())}
                    className="bannerImage"
                  />
                ) : (
                  <img className="bannerImage" src={formData.banner} alt="new banner" />
                )}
              </>
            ) : null}
            <div className="editImageActions">
              <label className="fileUpload">
                <UploadSquareOutline className="editImageAction" />
                <input
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  className="fileInput"
                  ref={bannerRef}
                  onChange={() => onBannerInput()}
                />
              </label>
              <label>
                <RemoveSquare className="editImageAction" onClick={() => removeBanner()} />
              </label>
            </div>
          </div>
          <div className="editProfileBody">
            <div className="profilePicture">
              {formData.picture ? (
                <>
                  {formData.picture === true ? (
                    <AdvancedImage
                      cldImg={cloudinary
                        .image(`/pictures/${profileUser.id}`)
                        .setVersion(Date.now())}
                      className="profileImage"
                    />
                  ) : (
                    <img className="profileImage" src={formData.picture} alt="new profilepicture" />
                  )}
                </>
              ) : (
                <ProfileCircled height="150px" width="150px" strokeWidth="0.5" fill="whitesmoke" />
              )}
              <div className="editImageActions">
                <label className="fileUpload">
                  <UploadSquareOutline className="editImageAction" />
                  <input
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    className="fileInput"
                    ref={pictureRef}
                    onChange={() => onPictureInput()}
                  />
                </label>
                <label>
                  <RemoveSquare className="editImageAction" onClick={() => removePicture()} />
                </label>
              </div>
            </div>
            <div className="editProfileActions">
              <div className="solidButton longButton" onClick={() => onSubmit()}>
                save changes
              </div>
              <div
                className="solidButton redButton longButton"
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
