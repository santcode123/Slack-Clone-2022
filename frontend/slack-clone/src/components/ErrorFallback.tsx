import React from 'react';

export const ErrorFallback = ({ errorMessage }: { errorMessage: string }): React.ReactElement => {
  return <div className="error-ui">{errorMessage}</div>;
};
