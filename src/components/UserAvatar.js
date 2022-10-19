import React from 'react';
import { Link } from 'react-router-dom';

const UserAvatar = ({ className, user }) => {
  return (
    <Link to="/" className={`${className ? className : ''} flex`}>
      <div className=" avatar mr-2">
        <div className="w-10 aspect-square rounded-full">
          <img
            src="https://joeschmoe.io/api/v1/male/random"
            // src="https://placeimg.com/192/192/people"
            alt={user.name + ' ' + user.bio}
          />
        </div>
      </div>
      <p className="">
        <span className="font-medium text-gray-700">{user.name}</span>
        <small className="block text-gray-400">{user.bio}</small>
      </p>
    </Link>
  );
};

export default UserAvatar;
