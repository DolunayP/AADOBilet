import React from 'react';

const Button = (props) => {
  return (
    <button className='text-white py-2 px-6 rounded text-xl md:ml-4 duration-500 border border-green-700' style={{ borderColor: '#31847A'}}>
      {props.children}
    </button>
  );
};

export default Button;
