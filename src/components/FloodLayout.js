import React, { useEffect } from 'react';
import UserAvatar from './UserAvatar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getPopularCategories } from '../features/category/CategorySlice';
import {
  Placeholder,
  PlaceholderItem,
  UserPlaceholder,
} from './partials/Placeholders';
import { getPopularUsers } from '../features/user/userSlice';
import { Link } from 'react-router-dom';

const FloodLayout = ({ children }) => {
  const dispatch = useDispatch();
  const {
    data: popularCategoriesData,
    loading: popularCategoriesLoading,
    message: popularCategoriesMessage,
  } = useSelector((state) => state.categories.popularCategories);

  const {
    data: popularUsersData,
    loading: popularUsersLoading,
    message: popularUsersMessage,
  } = useSelector((state) => state.users.popularUsers);

  useEffect(() => {
    dispatch(getPopularCategories());
    dispatch(getPopularUsers());
  }, [dispatch]);

  const { t } = useTranslation();

  return (
    <div className="flex  flex-wrap  lg:p-0">
      <div className="flex-1 lg:border-r lg:border-gray-100 lg:pr-8 mb-5">
        {children}
      </div>
      <div className="w-full flex-none lg:w-80 lg:pl-4 mb-5">
        <section className="px-4 lg:px-0">
          <h3 className="font-bold text-xl mb-3 text-slate-600">
            {t('sectionTitle.highlightCreators')}
          </h3>

          {popularUsersLoading
            ? [...Array(5)].map((item, index) => (
                <UserPlaceholder
                  className="border border-gray-100 mb-2 rounded-lg"
                  key={'user-plc-' + index}
                />
              ))
            : popularUsersData?.map((item, index) => (
                <UserAvatar
                  key={'user-avatar-' + index}
                  className="bg-white p-3 border border-gray-100 shadow-sm hover:shadow transition-all mb-2 rounded-lg"
                  user={item}
                />
              ))}
        </section>
        <hr className="bg-gray-100 my-5" />
        <section className="px-4 lg:px-0 py-4">
          <h3 className="font-bold text-xl mb-3 text-slate-600">
            {t('sectionTitle.popularCategories')}
          </h3>
          <div className="flex flex-col gap-2">
            {popularCategoriesLoading
              ? [...Array(5)].map((item, index) => (
                  <Placeholder key={'ctg-plchldr-' + index} className="mb-1">
                    <PlaceholderItem className="w-full h-[45px] p-3 rounded-md bg-gray-200" />
                  </Placeholder>
                ))
              : popularCategoriesData?.map((item, index) => (
                  <Link
                    to="/"
                    className="bg-white hover:bg-slate-200 hover:text-slate-600 transition-all border border-slate-200 text-slate-500 p-3 rounded-md text-sm font-medium"
                    key={'popular-cat-' + index}
                  >
                    {item.title}
                  </Link>
                ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default FloodLayout;
