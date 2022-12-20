import React from 'react';
import { Link } from 'react-router-dom';
import slugify from 'slugify';
import BlankProfilePicture from './partials/BlankProfilePicture';

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
          {user?.profile_img ? (
            <img
              src="https://i.pravatar.cc/300"
              // src="https://placeimg.com/192/192/people"
              alt={user.name + ' ' + user.about}
            />
          ) : (
            <BlankProfilePicture text={user?.name} size="40px" />
          )}
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
