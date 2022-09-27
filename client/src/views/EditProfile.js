import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { fetchUser, editProfile, reset } from '../features/auth/authSlice';
import { disablePost, enablePost } from '../features/post/postSlice';

import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';

import { ProfileCircled, RemoveSquare, UploadSquareOutline } from 'iconoir-react';

const EditProfile = () => {
  const { profileUsername } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isSuccess } = useSelector((state) => state.auth);
  const { username } = user;

  const cloudName = 'dgwf4o5mj';
  const cloudinary = new Cloudinary({
    cloud: {
      cloudName: cloudName,
    },
  });

  const editProfileHeaderRef = useRef();
  const editProfileRef = useRef();
  useEffect(() => {
    if (user) {
      dispatch(disablePost());
      setTimeout(() => {
        editProfileRef.current.classList.add('fade');
        editProfileHeaderRef.current.classList.add('fade');
      }, 200);
    } else {
      navigate('/');
    }
    return () => {
      dispatch(enablePost());
    };
  }, [dispatch, navigate, user]);

  const [profileData, setProfileData] = useState({
    banner: user ? user.bannerID : null,
    picture: user ? user.pictureID : null,
    bio: user ? user.bio : '',
  });
  const { banner, picture, bio } = profileData;

  const bannerRef = useRef();
  const pictureRef = useRef();

  const onBannerInput = () => {
    if (bannerRef.current.files.length !== 0) {
      setProfileData((prevState) => ({
        ...prevState,
        banner: URL.createObjectURL(bannerRef.current.files[0]),
      }));
    } else {
      setProfileData((prevState) => ({
        ...prevState,
        banner: '',
      }));
    }
  };
  const removeBanner = () => {
    if (banner) {
      setProfileData((prevState) => ({
        ...prevState,
        banner: '',
      }));
    }
    bannerRef.current.value = null;
  };

  const onPictureInput = () => {
    if (pictureRef.current.files.length !== 0) {
      setProfileData((prevState) => ({
        ...prevState,
        picture: URL.createObjectURL(pictureRef.current.files[0]),
      }));
    } else {
      setProfileData((prevState) => ({
        ...prevState,
        picture: '',
      }));
    }
  };
  const removePicture = () => {
    if (picture) {
      setProfileData((prevState) => ({
        ...prevState,
        picture: '',
      }));
    }
    pictureRef.current.value = null;
  };

  const onChange = (e) => {
    setProfileData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const charLeftRef = useRef();
  useEffect(() => {
    if (charLeftRef.current) charLeftRef.current.innerHTML = 200 - bio.length;
  }, [bio]);

  const onSubmit = () => {
    const newProfileData = new FormData();
    newProfileData.append('username', username);
    newProfileData.append('id', user.id);
    isNaN(banner) && banner !== ''
      ? newProfileData.append('banner', bannerRef.current.files[0])
      : newProfileData.append('banner', banner);
    isNaN(picture) && picture !== ''
      ? newProfileData.append('picture', pictureRef.current.files[0])
      : newProfileData.append('picture', picture);
    newProfileData.append('bio', bio);

    dispatch(editProfile(newProfileData));
    editProfileRef.current.classList.remove('fade');
    editProfileHeaderRef.current.classList.remove('fade');
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      dispatch(fetchUser(user.id));
      setTimeout(() => {
        navigate(`/users/${username}`);
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <div className="view">
      <div className="editViewHeader" ref={editProfileHeaderRef}>
        edit profile
      </div>
      {user && username === profileUsername ? (
        <div className="viewBox editProfile" ref={editProfileRef}>
          <div className="profileBanner">
            {banner ? (
              <>
                {!isNaN(banner) ? (
                  <AdvancedImage
                    cldImg={cloudinary.image(`/banners/${user.id}`).setVersion(user.bannerID)}
                    className="bannerImage"
                  />
                ) : (
                  <img className="bannerImage" src={banner} alt="new banner" />
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
              {picture ? (
                <>
                  {!isNaN(picture) ? (
                    <AdvancedImage
                      cldImg={cloudinary.image(`/pictures/${user.id}`).setVersion(user.pictureID)}
                      className="profileImage"
                    />
                  ) : (
                    <img className="profileImage" src={picture} alt="new profilepicture" />
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
                onClick={() => navigate(`/users/${username}`)}
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
