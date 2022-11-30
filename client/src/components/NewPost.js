import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { createPost } from '../features/post/postSlice';

import '../assets/styles/NewPost.scss';
import { DoubleCheck, Cancel, Check } from 'iconoir-react';

const NewPost = (props) => {
  const dispatch = useDispatch();
  const { newPostData, setNewPost, expanded, setExpanded } = props;
  const { newPostBody, newPostImg, disableFile } = newPostData;
  const { postEnabled } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
  const { username } = user;
  const cloudName = 'dgwf4o5mj';

  const fileRef = useRef();
  const uploadButtonRef = useRef();

  // handle rendering based upon the view size:
  const newPostRef = useRef();
  useEffect(() => {
    if (postEnabled && expanded) {
      newPostRef.current.style.opacity = '1';
      newPostRef.current.style.display = 'flex';
    } else if (postEnabled) {
      newPostRef.current.style.opacity = '0';
      newPostRef.current.style.display = 'flex';
      setTimeout(() => {
        newPostRef.current.style.opacity = '1';
      }, 10);
    }
    if (!postEnabled) {
      newPostRef.current.style.display = 'none';
    }
  }, [postEnabled, expanded]);

  // add file and disable the input,
  // allowing the custom file removal handler to be interactable:
  const onFileInput = () => {
    if (fileRef.current.files.length !== 0) {
      setNewPost((prevState) => ({
        ...prevState,
        newPostImg: fileRef.current.files[0],
        disableFile: true,
      }));
    }
  };

  const removeFile = () => {
    if (newPostImg) {
      setNewPost((prevState) => ({
        ...prevState,
        newPostImg: null,
      }));
      // the timeout is necessary to prevent the input from activating
      // upon file removal:
      setTimeout(() => {
        setNewPost((prevState) => ({
          ...prevState,
          disableFile: false,
        }));
      }, 1000);
    }
    fileRef.current.value = null;
  };

  useEffect(() => {
    if (newPostImg) {
      uploadButtonRef.current.className = 'fileUpload fileLoaded';
    } else {
      uploadButtonRef.current.className = 'fileUpload';
    }
  }, [newPostImg]);

  const onChange = (e) => {
    setNewPost((prevState) => ({
      ...prevState,
      // this refers to the form control as e.target,
      // as each has a 'name' and 'value' attribute:
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = () => {
    // checking that the post body is neither empty nor whitespace:
    if (newPostBody.replace(/\s+/g, '') !== '') {
      const postID = uuidv4();
      const newPostData = {
        id: postID,
        userID: user.id,
        username: username,
        userPictureID: user.pictureID,
        body: newPostBody,
        time: new Date(),
        likes: [],
        replies: [],
        image: newPostImg ? true : false,
      };

      if (newPostImg) {
        if (expanded) setExpanded(false);
        setNewPost((prevState) => ({
          ...prevState,
          newPostBody: '',
          newPostImg: null,
          disableFile: false,
        }));

        const formData = new FormData();
        formData.append('file', newPostImg);
        formData.append('upload_preset', 'social');
        formData.append('public_id', postID);
        formData.append('folder', '/social-app/posts/');
        axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, formData).then(() => {
          dispatch(createPost(newPostData));
        });
      } else {
        setNewPost((prevState) => ({
          ...prevState,
          newPostBody: '',
          newPostImg: null,
          disableFile: false,
        }));

        if (expanded) setExpanded(false);

        dispatch(createPost(newPostData));
      }
    }
  };

  const charLeftRef = useRef();
  useEffect(() => {
    charLeftRef.current.innerHTML = 200 - newPostBody.length;
  }, [newPostBody]);

  const [isHovering, setHovering] = useState(false);

  return (
    <div className="newPost fade" ref={newPostRef}>
      <textarea
        className="formControl newPostBody"
        name="newPostBody"
        value={newPostBody}
        onChange={onChange}
        maxLength="200"
        placeholder="talk about what's going on."
      />
      <div className="postActions newPostActions">
        <span className="labelButton solidButton" onClick={() => onSubmit()}>
          post &nbsp;
          <DoubleCheck />
        </span>
        <span className="charLeft" ref={charLeftRef}></span>
        <label
          className="fileUpload"
          ref={uploadButtonRef}
          onMouseOver={() => setHovering(true)}
          onMouseOut={() => setHovering(false)}
          onClick={() => removeFile()}
        >
          img
          {newPostImg ? (
            <div className="fileIndicator">
              {isHovering ? (
                <Cancel height="0.9em" width="0.9em" />
              ) : (
                <Check height="0.9em" width="0.9em" />
              )}
            </div>
          ) : null}
          <input
            type="file"
            accept=".jpg, .jpeg, .png"
            className="fileInput"
            ref={fileRef}
            onChange={() => onFileInput()}
            disabled={disableFile}
          ></input>
        </label>
        {expanded ? (
          <span
            className="labelButton solidButton redButton cancelNewPost"
            onClick={() => setExpanded(false)}
          >
            <Cancel />
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default NewPost;
