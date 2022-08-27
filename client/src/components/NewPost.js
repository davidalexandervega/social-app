import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { createPost } from '../features/post/postSlice';

import '../assets/styles/NewPost.scss';
import { DoubleCheck, Cancel } from 'iconoir-react';

const NewPost = (props) => {
  const dispatch = useDispatch();
  const { newPostData, setNewPost, mode, setMode } = props;

  const { newPostBody } = newPostData;

  const fileRef = useRef();
  const cloudName = 'dgwf4o5mj';

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
        body: newPostBody,
        time: new Date(),
        likes: [],
        replies: [],
        image: fileRef.current.files.length !== 0 ? true : false,
      };

      if (fileRef.current.files.length !== 0) {
        const formData = new FormData();
        formData.append('file', fileRef.current.files[0]);
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
        &nbsp;
        <span className="charLeft" ref={charLeftRef}></span>
        &nbsp;
        {mode === 'expanded' ? (
          <span
            className="labelButton solidButton redButton cancelNewPost"
            onClick={() => setMode('collapsed')}
          >
            <Cancel />
          </span>
        ) : (
          ''
        )}
        &nbsp;
        <label className="fileUpload">
          img
          <input type="file" accept=".jpg, .jpeg, .png" className="fileInput" ref={fileRef}></input>
        </label>
      </div>
    </div>
  );
};

export default NewPost;
