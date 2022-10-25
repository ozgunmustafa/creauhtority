import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../components/Layout';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PostPlaceholder } from '../components/partials/Placeholders';
import PostCard from '../components/PostCard';
import { getCategoryDetails } from '../features/category/CategorySlice';
import { FollowCategory } from '../components/partials/Icons';
const CategoryDetails = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { slug } = useParams();
  const categoryId = slug.split('-').slice(-1)[0];
  console.log(categoryId);

  const { data: categoryData, loading: categoryDataIsLoading } = useSelector(
    (state) => state.categories.categoryDetails,
  );

  useEffect(() => {
    dispatch(getCategoryDetails(categoryId));
  }, [dispatch, categoryId]);

  return (
    <Layout>
      {console.log(categoryData)}
      <div className="flex  flex-wrap  ">
        <div className="flex-1 lg:border-r lg:border-gray-100 lg:pr-4 mb-5">
          {categoryDataIsLoading ? (
            <span>....</span>
          ) : (
            <section className="mb-3 lg:hidden ">
              <div className="flex flex-col items-center justify-center p-6 bg-white  border-b border-green-500">
                <h1 className="text-xl font-medium text-gray-700 line-clamp-1 mb-1">
                  {categoryData.title}
                </h1>
                <small className="block text-gray-400 text-center mb-6">
                  {categoryData.description}
                </small>
                <div className="flex justify-center  items-center mb-7 w-full">
                  <div className="flex flex-col items-center flex-1 text-gray-600 text-sm  font-medium border-r-[1px] px-3 last:border-r-0">
                    <span className="font-medium text-lg">
                      {categoryData.posts.length}
                    </span>
                    {t('posts')}
                  </div>
                  <button className="flex flex-col items-center flex-1 text-gray-600 text-sm  font-medium border-r-[1px] px-3 last:border-r-0">
                    <span className="font-medium text-lg">
                      {categoryData.followers.length}
                    </span>{' '}
                    {t('followers')}
                  </button>
                </div>

                <div className="flex gap-2 w-full">
                  <button className="flex items-center justify-center w-full bg-green-500 text-white border border-slate-200 rounded-full px-6 py-2 text-sm hover:bg-green-600 hover:border-slate-400 transition-all">
                    <FollowCategory className="mr-1 w-4 h-4" /> Follow
                  </button>
                </div>
              </div>
            </section>
          )}
          <section className="">
            {categoryDataIsLoading
              ? [...Array(5)].map((item, i) => (
                  <PostPlaceholder key={'ctg-plchldr' + i} />
                ))
              : categoryData?.posts?.map((post) => (
                  <PostCard
                    post={post}
                    key={`category-post-${post._id}`}
                    isCategoryIndex={true}
                    className=" border-gray-200 hover:border-gray-400"
                  />
                ))}
          </section>
        </div>
        <div className="w-full flex-none lg:w-96 lg:pl-4 mb-5">
          {categoryDataIsLoading ? (
            <span>....</span>
          ) : (
            <section className="mb-6 hidden lg:block ">
              <div className="flex flex-col items-center justify-center p-6 rounded-md bg-white border  border-green-500">
                <h1 className="text-xl font-medium text-gray-700 line-clamp-1 mb-1">
                  {categoryData.title}
                </h1>
                <small className="block text-gray-400 text-center mb-6">
                  {categoryData.description}
                </small>
                <div className="flex justify-center  items-center mb-7 w-full">
                  <div className="flex flex-col items-center flex-1 text-gray-600 text-sm  font-medium border-r-[1px] px-3 last:border-r-0">
                    <span className="font-medium text-lg">
                      {categoryData.posts.length}
                    </span>
                    {t('posts')}
                  </div>
                  <button className="flex flex-col items-center flex-1 text-gray-600 text-sm  font-medium border-r-[1px] px-3 last:border-r-0">
                    <span className="font-medium text-lg">
                      {categoryData.followers.length}
                    </span>{' '}
                    {t('followers')}
                  </button>
                </div>

                <div className="flex gap-2 w-full">
                  <button className="flex items-center justify-center w-full bg-green-500 text-white border border-slate-200 rounded-full px-6 py-2 text-sm hover:bg-green-600 hover:border-slate-400 transition-all">
                    <FollowCategory className="mr-1 w-4 h-4" /> Follow
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

export default CategoryDetails;
