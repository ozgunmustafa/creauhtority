import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FloodLayout from '../components/FloodLayout';
import Layout from '../components/Layout';
import CategoryPill from '../components/partials/CategoryPill';
import {
  Placeholder,
  PlaceholderItem,
  PostPlaceholder,
} from '../components/partials/Placeholders';
import PostCard from '../components/PostCard';
import { Link } from 'react-router-dom';

import { getFeaturedCategories } from '../features/category/CategorySlice';
import { getHomeFlood } from '../features/post/PostSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { featuredCategories } = useSelector((state) => state.categories);
  const {
    floodPosts,
    loading: postsLoading,
    error: postsError,
  } = useSelector((state) => state.posts);
  const { loading } = useSelector((state) => state.settings);

  const { authenticatedUser } = useSelector((state) => state.auth);

  const isUserFollowingCategory = (category) => {
    if (category.followers.includes(authenticatedUser._id)) {
      return true;
    } else {
      return;
    }
  };

  useEffect(() => {
    dispatch(getFeaturedCategories());
    dispatch(getHomeFlood());
  }, [dispatch]);

  return (
    <Layout>
      <FloodLayout>
        <div className="flex flex-wrap">
          {loading
            ? [...Array(5)].map((item, i) => (
                <Placeholder key={'ctg-plchldr' + i} className="mb-2 mr-2">
                  <PlaceholderItem className="w-[150px] h-[38px] rounded-full bg-gray-200" />
                </Placeholder>
              ))
            : featuredCategories.data?.map((category) => (
                <CategoryPill
                  category={category}
                  key={category._id}
                  active={isUserFollowingCategory(category)}
                />
              ))}
        </div>
        <section className="">
          {postsLoading
            ? [...Array(5)].map((item, i) => (
                <PostPlaceholder key={'ctg-plchldr' + i} />
              ))
            : floodPosts?.map((post) => (
                <PostCard post={post} key={`flood-${post._id}`} />
              ))}
        </section>
      </FloodLayout>
    </Layout>
  );
};

export default Home;
