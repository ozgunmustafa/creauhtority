import React from 'react';
import { Link } from 'react-router-dom';
import slugify from 'slugify';

const UserAvatar = ({ className, user }) => {
  return (
    <Link
      to={`/user/${slugify(user.name + '-' + user._id, {
        replacement: '-',
        lower: true,
      })}`}
      className={`${className ? className : ''} flex`}
    >
      <div className=" avatar mr-2">
        <div className="w-10 aspect-square rounded-full">
          <img
            src="https://joeschmoe.io/api/v1/male/random"
            // src="https://placeimg.com/192/192/people"
            alt={user.name + ' ' + user.about}
          />
        </div>
      </div>
      <p className="">
        <span className="font-medium text-gray-700 line-clamp-1">
          {user.name}
        </span>
        <small className="block text-gray-400 line-clamp-1">{user.about}</small>
      </p>
    </Link>
  );
};

export default UserAvatar;
