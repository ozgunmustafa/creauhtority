import React from 'react';
import UserAvatar from './UserAvatar';
import { useTranslation } from 'react-i18next';

const FloodLayout = ({ children }) => {
  const { t } = useTranslation();

  return (
    <div className="flex  flex-wrap  p-4 lg:p-0">
      <div className="flex-1 lg:border-r lg:border-gray-100 lg:pr-8 mb-5">
        {children}
      </div>
      <div className="w-full flex-none lg:w-80 lg:pl-4 mb-5">
        <section className="">
          <h3 className="font-bold text-xl mb-3 text-slate-600">
            {t('sectionTitle.highlightCreators')}
          </h3>
          {[...Array(7)].map((item, index) => (
            <UserAvatar
              key={'user-av-' + index}
              className="p-3 border border-gray-100 hover:border-gray-300 transition-all mb-2 rounded-lg"
              user={{
                name: 'Mustafa Özgün',
                bio: ' Frontend Developer | UI Designer',
              }}
            />
          ))}
        </section>
        <hr className="bg-gray-100 my-5" />
        <section>
          <h3 className="font-bold text-xl mb-3 text-slate-600">
            {t('sectionTitle.popularCategories')}
          </h3>
          <div className="flex flex-col gap-2">
            <div className="bg-gray-200 p-3 rounded-md text-sm font-medium">
              Frontend
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FloodLayout;
