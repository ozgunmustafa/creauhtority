import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../components/Layout';
import { RiUserFollowLine, RiMailSendLine } from 'react-icons/ri';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, getUsersPosts } from '../features/user/userSlice';
import {
  Placeholder,
  PlaceholderItem,
  PostPlaceholder,
} from '../components/partials/Placeholders';
import PostCard from '../components/PostCard';
import ContentNull from '../components/partials/ContentNull';
const UserDetails = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { slug } = useParams();
  const userId = slug.split('-').slice(-1)[0];

  const { data: userData, loading: userIsLoading } = useSelector(
    (state) => state.users.userShown,
  );
  const { data: usersPosts, loading: usersPostsLoading } = useSelector(
    (state) => state.users.usersPosts,
  );
  const isRealValue = (obj) => {
    return obj && obj !== 'null' && obj !== 'undefined';
  };
  useEffect(() => {
    dispatch(getUser(userId));
    dispatch(getUsersPosts(userId));
  }, [dispatch, userId]);

  return (
    <Layout>
      <div className="flex  flex-wrap  ">
        <div className="flex-1 lg:border-r lg:border-gray-100 lg:pr-4 mb-5">
          {userIsLoading ? (
            <Placeholder className="p-6 flex flex-col items-center justify-center w-full h-[250px] bg-white rounded-lg border border-green-500 ">
              <PlaceholderItem className="w-[60] h-[60px] rounded-full bg-gray-100 mb-3" />
              <PlaceholderItem className="w-full h-[20px] rounded-full bg-gray-100 mb-1" />
              <PlaceholderItem className="w-1/2 h-[20px] rounded-full bg-gray-100 mb-3" />
              <PlaceholderItem className="w-full h-[40px] rounded-full !bg-gray-200" />
            </Placeholder>
          ) : (
            <section className="mb-3 lg:hidden ">
              <div className="flex flex-col items-center justify-center p-6 border-t-0 bg-white border  border-slate-200">
                <div className="avatar mb-2 relative">
                  <div className="w-20 aspect-square rounded-full border border-gray-200">
                    <img
                      src="https://i.pravatar.cc/300"
                      // src="https://placeimg.com/192/192/people"
                      alt="Voluptate in velit aute quis consectetur magna occaecat commodo labore velit."
                    />
                  </div>
                  <span className="bg-amber-200 text-slate-600 leading-[100%] p-1 px-2 rounded-full absolute -bottom-2 left-1/2 -translate-x-1/2 font-sans   text-[12px]">
                    creathor
                  </span>
                </div>
                <h1 className="text-xl font-medium text-gray-700 line-clamp-1 mb-1">
                  {userData.name}
                </h1>
                <small className="block text-gray-400 text-center mb-6">
                  {userData.about}
                </small>
                <div className="flex justify-center  items-center mb-7 w-full">
                  <button className="flex flex-col items-center flex-1 text-gray-600 text-sm  font-medium border-r-[1px] px-3 last:border-r-0">
                    <span className="font-medium">{usersPosts.length}</span>
                    {t('posts')}
                  </button>
                  <button className="flex flex-col items-center flex-1 text-gray-600 text-sm  font-medium border-r-[1px] px-3 last:border-r-0">
                    <span className="font-medium">
                      {userData.followers.length}
                    </span>{' '}
                    {t('followers')}
                  </button>
                  <button className="flex flex-col items-center flex-1 text-gray-600 text-sm  font-medium border-r-[1px] px-3 last:border-r-0">
                    <span className="font-medium">
                      {userData.followingCategory.length +
                        userData.followingUser.length}
                    </span>
                    {t('following')}
                  </button>
                </div>

                <div className="flex gap-2">
                  <button className="flex items-center bg-gray-100 border border-slate-200 rounded-full px-6 py-2 text-sm hover:bg-slate-300 hover:border-slate-400 hover:text-slate-600 transition-all">
                    <RiUserFollowLine className="mr-1" /> Follow
                  </button>
                  <button className="flex items-center bg-gray-100 border border-slate-200 rounded-full p-3  hover:bg-slate-300 hover:border-slate-400 hover:text-slate-600 transition-all">
                    <RiMailSendLine />
                  </button>
                </div>
              </div>
            </section>
          )}

          <section className="lg:p-0">
            {usersPostsLoading ? (
              [...Array(5)].map((item, i) => (
                <PostPlaceholder key={'ctg-plchldr' + i} />
              ))
            ) : usersPosts.length <= 0 ? (
              <ContentNull text="Content is not here." />
            ) : (
              usersPosts.map((post) => (
                <PostCard
                  post={post}
                  key={`flood-${post._id}`}
                  isUserIndex={true}
                  className=" border-gray-200 hover:border-gray-400"
                />
              ))
            )}
          </section>
        </div>
        <div className="w-full flex-none lg:w-96 lg:pl-4 mb-5">
          {userIsLoading ? (
            <Placeholder className="p-6 flex flex-col items-center justify-center w-full h-[250px] bg-white rounded-lg border border-green-500 ">
              <PlaceholderItem className="w-[60] h-[60px] rounded-full bg-gray-100 mb-3" />
              <PlaceholderItem className="w-full h-[20px] rounded-full bg-gray-100 mb-1" />
              <PlaceholderItem className="w-1/2 h-[20px] rounded-full bg-gray-100 mb-3" />
              <PlaceholderItem className="w-full h-[40px] rounded-full !bg-gray-200" />
            </Placeholder>
          ) : (
            <section className="mb-6 hidden lg:block ">
              <div className="flex flex-col items-center justify-center p-6 rounded-md bg-white border  border-slate-200">
                <div className="avatar mb-2 relative">
                  <div className="w-20 aspect-square rounded-full border border-gray-200">
                    <img
                      src="https://i.pravatar.cc/300"
                      // src="https://placeimg.com/192/192/people"
                      alt="Voluptate in velit aute quis consectetur magna occaecat commodo labore velit."
                    />
                  </div>
                  <span className="bg-amber-200 text-slate-600 leading-[100%] p-1 px-2 rounded-full absolute -bottom-2 left-1/2 -translate-x-1/2 font-sans   text-[12px]">
                    creathor
                  </span>
                </div>
                <h1 className="text-xl font-medium text-gray-700 line-clamp-1 mb-1">
                  {userData.name}
                </h1>
                <small className="block text-gray-400 text-center mb-6">
                  {userData.about}
                </small>
                <div className="flex justify-center  items-center mb-7 w-full">
                  <button className="flex flex-col items-center flex-1 text-gray-600 text-sm  font-medium border-r-[1px] px-3 last:border-r-0">
                    <span className="font-medium">{usersPosts.length}</span>
                    {t('posts')}
                  </button>
                  <button className="flex flex-col items-center flex-1 text-gray-600 text-sm  font-medium border-r-[1px] px-3 last:border-r-0">
                    <span className="font-medium">
                      {userData.followers.length}
                    </span>{' '}
                    {t('followers')}
                  </button>
                  <button className="flex flex-col items-center flex-1 text-gray-600 text-sm  font-medium border-r-[1px] px-3 last:border-r-0">
                    <span className="font-medium">
                      {userData.followingCategory.length +
                        userData.followingUser.length}
                    </span>{' '}
                    {t('following')}
                  </button>
                </div>

                <div className="flex gap-2">
                  <button className="flex items-center bg-gray-100 border border-slate-200 rounded-full px-6 py-2 text-sm hover:bg-slate-300 hover:border-slate-400 hover:text-slate-600 transition-all">
                    <RiUserFollowLine className="mr-1" /> Follow
                  </button>
                  <button className="flex items-center bg-gray-100 border border-slate-200 rounded-full p-3  hover:bg-slate-300 hover:border-slate-400 hover:text-slate-600 transition-all">
                    <RiMailSendLine />
                  </button>
                </div>
              </div>
            </section>
          )}

          <section className="mb-6 px-4">
            <h3 className="font-bold text-xl mb-3 text-slate-600">
              {t('sectionTitle.highlightCategories')}
            </h3>
            <div className="flex flex-wrap gap-1">
              {[...Array(5)]?.map((item, index) => (
                <Link
                  to="/categories/"
                  className="bg-slate-100 hover:bg-slate-200 hover:text-slate-600 transition-all border border-slate-200 text-slate-500 py-2 px-3 rounded-full text-sm font-medium"
                  key={'popular-cat-' + index}
                >
                  Frontend
                </Link>
              ))}
            </div>
          </section>
          <section className="px-4">
            <h3 className="font-bold text-xl mb-3 text-slate-600">
              {t('sectionTitle.highlightCreators')}
            </h3>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default UserDetails;
