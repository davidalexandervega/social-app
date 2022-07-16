import React from 'react';
import '../assets/styles/LoginAnimation.scss';

const LoginAnimation = () => {
  return (
    <div className="loginAnimation">
      <div className="scene">
        <div className="cube">
          <div className="cube_face cube_face_front"></div>
          <div className="cube_face cube_face_back"></div>
          <div className="cube_face cube_face_right"></div>
          <div className="cube_face cube_face_left"></div>
          <div className="cube_face cube_face_top"></div>
          <div className="cube_face cube_face_bottom"></div>
        </div>
      </div>
    </div>
  );
};

export default LoginAnimation;
