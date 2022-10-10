import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { fetchUser, editProfile, setLoading, reset } from '../features/auth/authSlice';
import { disablePost, enablePost } from '../features/post/postSlice';

import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';

import { ProfileCircled, RemoveSquare, UploadSquareOutline } from 'iconoir-react';
import { BallTriangle } from 'react-loading-icons';

const EditProfile = () => {
  const { profileUsername } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isSuccess } = useSelector((state) => state.auth);
  const { username } = user;

  // initialize cloudinary:
  const cloudName = 'dgwf4o5mj';
  const cloudinary = new Cloudinary({
    cloud: {
      cloudName: cloudName,
    },
  });

  // handle transition:
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

  // initialize edit form:
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
        banner: user.id,
      }));
    }
  };
  const removeBanner = () => {
    if (banner) {
      setProfileData((prevState) => ({
        ...prevState,
        banner: user.id,
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
        picture: user.id,
      }));
    }
  };
  const removePicture = () => {
    if (picture) {
      setProfileData((prevState) => ({
        ...prevState,
        picture: user.id,
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
    newProfileData.append('userID', user.id);
    isNaN(banner) && banner !== user.id
      ? newProfileData.append('banner', bannerRef.current.files[0])
      : newProfileData.append('banner', banner);
    isNaN(picture) && picture !== user.id
      ? newProfileData.append('picture', pictureRef.current.files[0])
      : newProfileData.append('picture', picture);
    newProfileData.append('bio', bio);

    // dispatch, transition the form, and start loading animation:
    dispatch(editProfile(newProfileData));
    editProfileRef.current.classList.remove('fade');
    editProfileHeaderRef.current.classList.remove('fade');
    setTimeout(() => {
      dispatch(setLoading(true));
    }, 750);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(fetchUser(user.id));
      dispatch(reset());
      navigate(`/users/${username}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <div className="view">
      {!isLoading ? (
        <>
          <div className="editViewHeader" ref={editProfileHeaderRef}>
            edit profile
          </div>
          {user && username === profileUsername ? (
            <div className="viewBox editProfile" ref={editProfileRef}>
              <div className="profileBanner">
                {!isNaN(banner) ? (
                  <AdvancedImage
                    cldImg={cloudinary
                      .image(`/social-app/banners/${user.id}`)
                      .setVersion(user.bannerID)}
                    className="bannerImage"
                  />
                ) : (
                  <>
                    {banner === user.id ? null : (
                      <img className="bannerImage" src={banner} alt="new banner" />
                    )}
                  </>
                )}
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
                  {!isNaN(picture) ? (
                    <AdvancedImage
                      cldImg={cloudinary
                        .image(`/social-app/pictures/${user.id}`)
                        .setVersion(user.pictureID)}
                      className="profileImage"
                    />
                  ) : (
                    <>
                      {picture === user.id ? (
                        <ProfileCircled
                          height="150px"
                          width="150px"
                          strokeWidth="0.5"
                          fill="whitesmoke"
                        />
                      ) : (
                        <img className="profileImage" src={picture} alt="new profilepicture" />
                      )}
                    </>
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
                  <div className="solidButton" onClick={() => onSubmit()}>
                    save changes
                  </div>
                  <div
                    className="solidButton redButton cancelEditProfile"
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
            <div className="editUnavailable">
              edit page is unavailable if it's not your account.
            </div>
          )}
        </>
      ) : (
        <span className="loadingContainer">
          <BallTriangle className="loadingIcon" stroke="#000000" strokeOpacity="0.7" height="2em" />
        </span>
      )}
    </div>
  );
};

export default EditProfile;
