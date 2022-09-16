import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { createPost } from '../features/post/postSlice';

import '../assets/styles/NewPost.scss';
import { DoubleCheck, Cancel } from 'iconoir-react';

const NewPost = (props) => {
  const dispatch = useDispatch();
  const { newPostData, setNewPost, mode, setMode } = props;
  const { newPostBody, newPostImg, disableFile } = newPostData;

  const { username, picture } = useSelector((state) => state.auth);

  const fileRef = useRef();
  const uploadButtonRef = useRef();
  const cloudName = 'dgwf4o5mj';

  const onFileInput = () => {
    if (fileRef.current.files.length !== 0) {
      setNewPost((prevState) => ({
        ...prevState,
        newPostImg: fileRef.current.files[0],
        disableFile: true,
      }));
    } else {
      setNewPost((prevState) => ({
        ...prevState,
        newPostImg: null,
      }));
    }
  };

  const removeFile = () => {
    if (newPostImg) {
      setNewPost((prevState) => ({
        ...prevState,
        newPostImg: null,
      }));
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
    newPostImg
      ? (uploadButtonRef.current.style.color = 'cornflowerblue')
      : (uploadButtonRef.current.style.color = 'black');
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
    if (newPostBody !== '') {
      const postID = uuidv4();
      const newPostData = {
        id: postID,
        username: username,
        userPicture: picture,
        body: newPostBody,
        time: new Date(),
        likes: [],
        replies: [],
        image: newPostImg ? true : false,
      };

      if (newPostImg) {
        const formData = new FormData();
        formData.append('file', newPostImg);
        formData.append('upload_preset', 'social');
        formData.append('public_id', postID);
        formData.append('folder', '/posts/');
        axios
          .post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, formData)
          .then((response) => console.log(response));
      }

      setNewPost((prevState) => ({
        ...prevState,
        newPostBody: '',
        newPostImg: null,
        disableFile: false,
      }));

      if (mode === 'expanded') {
        setMode('collapsed');
      }

      dispatch(createPost(newPostData));
    }
  };

  const charLeftRef = useRef();
  useEffect(() => {
    charLeftRef.current.innerHTML = 200 - newPostBody.length;
  }, [newPostBody]);

  return (
    <div className="newPost">
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
        <label className="fileUpload" ref={uploadButtonRef} onClick={() => removeFile()}>
          img
          <input
            type="file"
            accept=".jpg, .jpeg, .png"
            className="fileInput"
            ref={fileRef}
            onChange={() => onFileInput()}
            disabled={disableFile}
          ></input>
        </label>
        {mode === 'expanded' ? (
          <span
            className="labelButton solidButton redButton cancelNewPost"
            onClick={() => setMode('collapsed')}
          >
            <Cancel />
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default NewPost;
