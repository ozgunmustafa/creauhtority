import React from 'react';
import {
  Bookmark,
  Comments,
  Like,
  LikeFilled,
  Reply,
  Share,
} from './partials/Icons';
import { useTranslation } from 'react-i18next';
import UserAvatar from './UserAvatar';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { likePost } from '../features/post/PostSlice';
import classNames from 'classnames';

const PostCard = ({
  post,
  isPostIndex,
  isUserIndex,
  isCategoryIndex,
  className,
}) => {
  const { t } = useTranslation();
  const { authenticatedUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const isUserLikedPost = (postt) => {
    post.likes.map((like) => {
      console.log('1xasdasd', like === authenticatedUser._id);
      if (like._id === authenticatedUser._id) {
        return true;
      } else {
        return false;
      }
    });
  };

  return (
    <div
      className={classNames({
        'block bg-white p-4 shadow-sm lg:hover:shadow-sm mb-2 lg:rounded-lg transition-all': true,
        'shadow-sm': isUserIndex,
        'bg-transparent p-0 shadow-none hover:shadow-none': isPostIndex,
      })}
    >
      {!isUserIndex && <UserAvatar className="mb-4" user={post.user} />}

      <Link
        to={`/post/${post.slug + '-' + post._id}`}
        className=" mb-2 text-[1.1rem] leading-[1.3]"
      >
        {post.content}
      </Link>
      {!isCategoryIndex && (
        <Link
          to={`/category/${post.category.slug + '-' + post.category._id}`}
          className="block w-fit p-2 my-2 text-sm bg-green-50 text-green-600 hover:text-green-500 font-medium py-1 "
        >
          #{post.category.title}
        </Link>
      )}

      {(post.likes.length > 0 || post.comments.length > 0) && (
        <div className="flex pt-2">
          {post.likes.length > 0 && (
            <button className="text-gray-600 text-sm  font-medium border-r-[1px] px-3 first:pl-0 last:border-r-0">
              {post.likes.length + ' ' + t('like')}
            </button>
          )}
          {post.comments.length > 0 && (
            <Link
              to={`/post/${post.slug + '-' + post._id}`}
              className="text-gray-600 text-sm  font-medium border-r-[1px] px-3 first:pl-0 last:border-r-0"
            >
              {post.comments.length + ' ' + t('comment')}
            </Link>
          )}
        </div>
      )}

      <div className="flex  py-2 ">
        <button
          className="w-[35px] h-[32px] flex items-center justify-center bg-gray-100 shadow-sm p-2 rounded-xl text-slate-600 mr-4"
          onClick={() => {
            dispatch(likePost(post._id));
          }}
        >
          {post.likes.length > 0 ? (
            post.likes.map((like) =>
              like._id === authenticatedUser._id ? (
                <LikeFilled className="w-[20px] " />
              ) : (
                <Like className="w-[20px]  " />
              ),
            )
          ) : (
            <Like className="w-[20px]  " />
          )}
        </button>
        {isPostIndex ? (
          <button className="w-[35px] h-[32px] flex items-center justify-center bg-gray-100 shadow-sm p-2 rounded-xl text-slate-500 mr-4">
            <Comments className="w-[18px] fill-slate-500 " />
          </button>
        ) : (
          <Link
            to={`/post/${post.slug + '-' + post._id}`}
            className="w-[35px] h-[32px] flex items-center justify-center bg-gray-100 shadow-sm p-2 rounded-xl text-slate-500 mr-4"
          >
            <Comments className="w-[18px] fill-slate-500 " />
          </Link>
        )}

        <button className="w-[35px] h-[32px] flex items-center justify-center ml-auto bg-gray-100 shadow-sm p-2 rounded-xl text-slate-500 mr-4">
          <Bookmark className="w-[18px] fill-slate-500 " />
        </button>
        <button className="w-[35px] h-[32px] flex items-center justify-center bg-gray-100 shadow-sm p-2 rounded-xl text-slate-500 mr-4">
          <Share className="w-[18px] fill-slate-500 " />
        </button>
      </div>
    </div>
  );
};

export default PostCard;
