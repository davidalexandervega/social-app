import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { createPost } from '../features/post/postSlice';

import '../assets/styles/NewPost.scss';
import { DoubleCheck } from 'iconoir-react';

const NewPost = (props) => {
  const dispatch = useDispatch();
  const { newPostData, setNewPost } = props;

  const { newPostBody } = newPostData;

  const onChange = (e) => {
    setNewPost((prevState) => ({
      ...prevState,
      // this refers to the form control as e.target,
      // as each has a 'name' and 'value' attribute:
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = () => {
    const newPostData = {
      id: uuidv4(),
      body: newPostBody,
      time: new Date(),
      likes: [],
    };

    setNewPost((prevState) => ({
      ...prevState,
      newPostBody: '',
    }));

    dispatch(createPost(newPostData));
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
      <div className="postActions">
        <span className="labelButton solidButton" onClick={() => onSubmit()}>
          post&nbsp;
          <DoubleCheck />
        </span>
        &nbsp;
        <span ref={charLeftRef}></span>
      </div>
    </div>
  );
};

export default NewPost;
