import React from 'react';
import Layout from '../components/Layout';
import ContentNull from '../components/partials/ContentNull';

const NotFound = () => {
  return (
    <Layout>
      <ContentNull text="404 Not Found" />
    </Layout>
  );
};

export default NotFound;
