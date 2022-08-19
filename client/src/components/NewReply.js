import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';

import { createReply } from '../features/reply/replySlice';

import '../assets/styles/NewReply.scss';
import { DoubleCheck, Cancel } from 'iconoir-react';

const NewReply = (props) => {
  const dispatch = useDispatch();
  const { post, resetReplies, replyDelta } = props;

  const [newReplyData, setNewReply] = useState({
    newReplyBody: '',
  });

  const { newReplyBody } = newReplyData;

  const onChange = (e) => {
    setNewReply((prevState) => ({
      ...prevState,
      // this refers to the form control as e.target,
      // as each has a 'name' and 'value' attribute:
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = () => {
    if (newReplyBody !== '') {
      const newReplyData = {
        id: uuidv4(),
        origin: post.id,
        body: newReplyBody,
        time: new Date(),
        likes: [],
      };

      setNewReply((prevState) => ({
        ...prevState,
        newReplyBody: '',
      }));

      replyDelta.current++;

      dispatch(createReply(newReplyData));
    }
  };

  const charLeftRef = useRef();
  useEffect(() => {
    charLeftRef.current.innerHTML = 200 - newReplyBody.length;
  }, [newReplyBody]);

  return (
    <div className="newReply">
      <textarea
        className="formControl newReplyBody"
        name="newReplyBody"
        value={newReplyBody}
        onChange={onChange}
        maxLength="200"
        placeholder="write your reply."
      />
      <div className="postActions newReplyActions">
        <span className="labelButton solidButton" onClick={() => onSubmit()}>
          reply &nbsp;
          <DoubleCheck />
        </span>
        &nbsp;
        <span className="charLeft" ref={charLeftRef}></span>
        &nbsp;
        <span
          className="labelButton solidButton redButton cancelNewPost"
          onClick={() => dispatch(resetReplies())}
        >
          <Cancel />
        </span>
      </div>
    </div>
  );
};

export default NewReply;
