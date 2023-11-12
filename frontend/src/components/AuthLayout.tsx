import React from 'react';
import PageHeader from './PageHeader';
import Footer from './Footer';

function AuthLayout({ children }: { children: React.ReactNode }) {
  const childrenArray = React.Children.toArray(children);
  const mainContent = childrenArray[0];
  const sideContent = childrenArray.slice(1);

  return (
    <>
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="flex-1 p-2 md:p-4 lg:p-8">
        <PageHeader title="Capital Gains Calculator" />
        <div className="max-w-xs md:max-w-lg lg:max-w-xl mx-auto mt-16">{mainContent}</div>
      </div>
      {sideContent}
    </div>
   
    </>
  );
}

export default AuthLayout;
