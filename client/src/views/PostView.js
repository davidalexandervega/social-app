import React from 'react';
import { useParams } from 'react-router-dom';

const PostView = () => {
  const { id } = useParams();

  return <div>{id}</div>;
};

export default PostView;
