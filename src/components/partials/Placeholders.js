import React from 'react';

const Placeholder = ({ children, className }) => {
  return <div className={`placeholder ${className}`}>{children}</div>;
};
const PlaceholderItem = (props) => {
  return (
    <div
      style={{
        width: props.width,
        height: props.height,
        minWidth: props.width,
        minHeight: props.height,
      }}
      className={`placeholder-item placeholder-item_${props.type} ${
        props.className ? props.className : ''
      }`}
    ></div>
  );
};

const PostPlaceholder = ({ className }) => {
  return (
    <div className={`p-3 ${className}`}>
      <Placeholder>
        <div className="flex items-center mb-2">
          <PlaceholderItem
            type="rounded"
            width="50px"
            height="50px"
            className="mr-1"
          />
          <div className="flex flex-col w-full">
            <PlaceholderItem
              type="line"
              width="50%"
              height="22px"
              className="mb-1"
            />
            <PlaceholderItem type="line" width="75px" height="12px" />
          </div>
        </div>
        <PlaceholderItem type="line" height="18px" className="mb-1" />
        <PlaceholderItem type="line" height="18px" className="mb-1" />
        <PlaceholderItem type="line" height="18px" className="mb-3" />
        <div className="flex">
          <PlaceholderItem
            type="line"
            width="60px"
            height="16px"
            className="mr-1"
          />
          <PlaceholderItem
            type="line"
            width="60px"
            height="16px"
            className="mr-1"
          />
          <PlaceholderItem
            type="line"
            width="60px"
            height="16px"
            className="mr-1"
          />
        </div>
      </Placeholder>
    </div>
  );
};
const CommentPlaceholder = ({ className }) => {
  return (
    <div className={`p-3 ${className}`}>
      <Placeholder>
        <div className="flex items-center mb-2">
          <PlaceholderItem
            type="rounded"
            width="50px"
            height="50px"
            className="mr-1"
          />
          <div className="flex flex-col w-full">
            <PlaceholderItem
              type="line"
              width="50%"
              height="22px"
              className="mb-1"
            />
            <PlaceholderItem type="line" width="75px" height="12px" />
          </div>
        </div>
        <PlaceholderItem type="line" height="18px" className="mb-1" />
        <PlaceholderItem type="line" height="18px" className="mb-1" />
      </Placeholder>
    </div>
  );
};
export { Placeholder, PlaceholderItem, PostPlaceholder, CommentPlaceholder };
