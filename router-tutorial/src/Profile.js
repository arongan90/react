import React from "react";

const profileData = {
  donghan: {
    name: "박동한",
    description: "Frontend Devloper",
  },
  minju: {
    name: "신민주",
    description: "다우니 커뮤니케이션즈",
  },
};

const Profile = ({ match }) => {
  // 파라미터를 받아올 땐 match 안에 들어있는 params 값을 참조
  const { nickname } = match.params;
  const profile = profileData[nickname];
  if (!profile) {
    return <div>존재하지 않는 유저 입니다.</div>;
  }
  return (
    <div>
      <h3>
        {nickname} ({profile.name})
      </h3>
      <p>{profile.description}</p>
    </div>
  );
};

export default Profile;
