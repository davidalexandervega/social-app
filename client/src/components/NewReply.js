import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';

import { expandPost, createReply } from '../features/reply/replySlice';
import { createNotification } from '../features/notification/notificationSlice';

import '../assets/styles/NewReply.scss';
import { DoubleCheck, Cancel } from 'iconoir-react';

const NewReply = (props) => {
  const dispatch = useDispatch();
  const { post, resetReplies, replyDelta, postView, user, newReplyData, setNewReply } = props;
  const { username } = user;

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
      const replyID = uuidv4();

      const newReplyData = {
        id: replyID,
        username,
        userHasPicture: user.hasPicture,
        origin: post.id,
        body: newReplyBody,
        time: new Date(),
        likes: [],
      };

      replyDelta.current++;

      dispatch(createReply(newReplyData));

      if (post.user !== user.id) {
        const notificationData = {
          id: uuidv4(),
          time: new Date(),
          creatorID: user.id,
          creatorHasPicture: user.hasPicture,
          creatorUsername: username,
          recipientID: post.user,
          type: 'reply_post',
          object: post.id,
        };
        dispatch(createNotification(notificationData));
      }
    }

    if (postView) {
      setNewReply((prevState) => ({
        ...prevState,
        newReplyBody: '',
      }));
    }

    dispatch(expandPost(null));
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
        <span className="charLeft" ref={charLeftRef}></span>
        {postView !== true ? (
          <span
            className="labelButton solidButton redButton cancelNewPost"
            onClick={() => dispatch(resetReplies())}
          >
            <Cancel />
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default NewReply;
