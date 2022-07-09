import React from 'react';
import '../assets/styles/LoginAnimation.scss';

const LoginAnimation = () => {
  return (
    <div className="loginAnimation">
      <div class="scene">
        <div class="cube">
          <div class="cube_face cube_face_front"></div>
          <div class="cube_face cube_face_back"></div>
          <div class="cube_face cube_face_right"></div>
          <div class="cube_face cube_face_left"></div>
          <div class="cube_face cube_face_top"></div>
          <div class="cube_face cube_face_bottom"></div>
        </div>
      </div>
    </div>
  );
};

export default LoginAnimation;
