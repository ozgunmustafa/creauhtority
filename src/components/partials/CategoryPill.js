import classNames from 'classnames';
import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsCheck2 } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { followCategory } from '../../features/category/CategorySlice';
import { getFeaturedCategories } from '../../features/category/CategorySlice';

const CategoryPill = ({ category, active }) => {
  const dispatch = useDispatch();
  const { authenticatedUser, authToken } = useSelector((state) => state.auth);

  return (
    <span
      className={classNames({
        'flex items-center  font-medium rounded-full  pl-3 pr-0 py-0 text-sm mr-2 mb-2': true,
        'text-gray-700  bg-gray-200': !active,
        'text-blue-800  bg-blue-100': active,
      })}
    >
      <Link to={`category/${category.slug + '-' + category._id}`}>
        {category.title}
      </Link>
      <button
        className="p-2"
        onClick={() => {
          dispatch(followCategory(category._id));
          setTimeout(() => {
            dispatch(getFeaturedCategories());
          }, 500);
        }}
      >
        {active ? (
          <BsCheck2 size="22px" className="ml-1 p-1 " />
        ) : (
          <AiOutlinePlus
            size="22px"
            className="ml-1 bg-gray-300 rounded-full p-1"
          />
        )}
      </button>
    </span>
  );
};

export default CategoryPill;
