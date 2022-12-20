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
import { FiSend } from 'react-icons/fi';

import PostCard from '../components/PostCard';
import {
  PostPlaceholder,
  CommentPlaceholder,
} from '../components/partials/Placeholders';
import { Like, LikeFilled, Reply } from '../components/partials/Icons';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import BlankProfilePicture from '../components/partials/BlankProfilePicture';
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

            <div className="bg-white lg:bg-transparent p-4 lg:p-0">
              <h3 className="font-bold text-xl mb-3 text-slate-600">
                {t('sectionTitle.comments')}
              </h3>

              {postComments.loading
                ? [...Array(3)].map((item, i) => (
                    <CommentPlaceholder
                      key={'post-cmnt-plch' + i}
                      className="mb-3  rounded-3xl max-w-[75%]"
                    />
                  ))
                : postComments.data.map((comment) => (
                    <div
                      className="flex max-w-[75%]  py-2  mb-2 w-fit"
                      key={comment._id}
                    >
                      {comment?.user?.profile_img ? (
                        <img
                          src={comment?.user?.profile_img}
                          // src="https://placeimg.com/192/192/people"
                          alt={comment.user.name + ' ' + comment.user.about}
                        />
                      ) : (
                        <BlankProfilePicture
                          text={comment?.user?.name}
                          size="40px"
                          classNames='mr-2'
                        />
                      )}
                      <p className="">
                        <span className="font-medium text-slate-700 leading-[1]">
                          {comment.user.name}
                        </span>
                        <span className="block text-base text-slate-500 ">
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
              <div className="flex mt-4">
                <div className="w-11 h-11 mr-2 border aspect-square rounded-full">
                  <img
                    src="https://placeimg.com/192/192/people"
                    className="rounded-full"
                    alt="Tailwind-CSS-Avatar-component"
                  />
                </div>
                <div className="w-full flex flex-col  items-end">
                  <Formik
                    initialValues={{ content: '', post_id: postId }}
                    validate={(values) => {
                      const errors = {};
                      if (!values.content) {
                        errors.content = 'Comment is required.';
                      }
                      return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                      console.log('Form submitto');
                      setSubmitting(false);
                    }}
                    validateOnChange={false}
                    validateOnBlur={false}
                  >
                    {({ isSubmitting }) => (
                      <Form className="w-full flex flex-col relative">
                        <Field
                          type="text"
                          name="content"
                          placeholder="Comment here"
                          className="form-input bg-white w-full h-12 rounded-full pr-[85px]"
                        />
                        <ErrorMessage
                          name="content"
                          component="small"
                          className="block text-red-500"
                        />
                        <button
                          type="submit"
                          className="absolute top-2 right-2  h-8 flex items-center bg-white shadow px-3 py-2 hover:bg-slate-100 text-slate-500 shad transition-all  rounded-full text-sm"
                        >
                          <FiSend className="mr-1" /> Send
                        </button>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>

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
