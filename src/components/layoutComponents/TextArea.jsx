import React from 'react'

export  function TextArea({id,title,row="2",classname="text-gray-500",onChange,name,value}) {
    const handleChange = (e) => {
        onChange(e);
      };
  return (
    <div>
      <label htmlFor={id} className={classname}>{title}</label>
      <textarea value={value} name={name} onChange={handleChange} id={id} className='w-full p-2 border rounded-md' rows={row}></textarea>
    </div>
  )
}
