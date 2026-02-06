import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="text-center mb-8 space-y-4">
      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
        IMAGE TO TEXT
      </h1>
      <p className="max-w-2xl mx-auto text-lg text-slate-600">
        Need to copy the text in an image? Use the Image to Text converter to extract the text from any image so that you can easily copy the text!
      </p>
    </div>
  );
};

export default Header;