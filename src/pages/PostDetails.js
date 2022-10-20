import React, { useEffect } from 'react';
import FloodLayout from '../components/FloodLayout';
import Layout from '../components/Layout';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCategoryReleatedPosts,
  getSinglePost,
  getSinglePostComments,
} from '../features/post/PostSlice';
import { useTranslation } from 'react-i18next';

import PostCard from '../components/PostCard';
import {
  PostPlaceholder,
  CommentPlaceholder,
} from '../components/partials/Placeholders';
import { Like, LikeFilled, Reply } from '../components/partials/Icons';
const PostDetails = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { slug } = useParams();
  const postId = slug.split('-').slice(-1)[0];

  const {
    data: post,
    comments: postComments,
    releatedPosts,
    loading,
    message,
  } = useSelector((state) => state.posts.postDetails);

  useEffect(() => {
    dispatch(getSinglePost(postId)).then((res) => {
      dispatch(
        getCategoryReleatedPosts({
          categoryId: res.payload.category._id,
          postId,
        }),
      );
    });
    dispatch(getSinglePostComments(postId));
  }, [dispatch, postId]);

  return (
    <Layout>
      <FloodLayout>
        {loading ? (
          <PostPlaceholder />
        ) : (
          <>
            <PostCard post={post} isPostIndex={true}></PostCard>

            <h3 className="font-bold text-xl mb-3 text-slate-600">
              {t('sectionTitle.comments')}
            </h3>

            {postComments.loading
              ? [...Array(3)].map((item, i) => (
                  <CommentPlaceholder
                    key={'post-cmnt-plch' + i}
                    className="mb-3 bg-slate-100 rounded-3xl max-w-[75%]"
                  />
                ))
              : postComments.data.map((comment) => (
                  <div
                    className="flex max-w-[75%] bg-slate-100 p-3 rounded-3xl mb-2 w-fit"
                    key={comment._id}
                  >
                    <div className=" avatar mr-2">
                      <div className="w-8 h-8 aspect-square rounded-full">
                        <img
                          src="https://joeschmoe.io/api/v1/male/random"
                          // src="https://placeimg.com/192/192/people"
                          alt="Tailwind-CSS-Avatar-component"
                        />
                      </div>
                    </div>
                    <p className="">
                      <span className="font-medium text-slate-700 leading-[1]">
                        {comment.user.name}
                      </span>
                      <span className="block text-base text-slate-500 mb-2">
                        {comment.content}
                      </span>
                      {/* <div className="flex gap-3">
                  <button className="flex gap-1 items-center px-2 py-1 bg-slate-200 rounded-full text-slate-500">
                    <Like /> Beğen
                  </button>

                  <button className="flex gap-1 items-center px-2 py-1 bg-slate-200 rounded-full text-slate-500">
                    <Reply /> Yanıtla
                  </button>
                </div> */}
                    </p>
                  </div>
                ))}
            <hr className="bg-gray-50 mt-4 mb-7" />

            {releatedPosts.length > 0 && (
              <h3 className="font-bold text-xl mb-3 text-slate-600">
                {t('sectionTitle.releatedPosts')}
              </h3>
            )}

            {releatedPosts.loading
              ? [...Array(3)].map((item, i) => (
                  <PostPlaceholder key={'releated-posts-plc-' + i} />
                ))
              : releatedPosts?.data.map((post, index) => (
                  <Link
                    to={`/post/${post.slug + '-' + post._id}`}
                    key={'releated-posts-' + index}
                  >
                    <PostCard post={post} />
                  </Link>
                ))}
          </>
        )}
      </FloodLayout>
    </Layout>
  );
};

export default PostDetails;
