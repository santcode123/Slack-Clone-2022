import React from 'react';

export const LoadingFallback = ({ fallbackMessage }: { fallbackMessage: string }): React.ReactElement => {
  return <div className="loading-ui">Please wait....</div>;
};
