import { useState } from 'react';

export function RangeComponent({valueDefault=1,text,valuemin,valuemax,onChange,name}) {
  const [value, setValue] = useState(valueDefault); // Valor inicial del slider

  const handleChange = (e) => {
    setValue(e.target.value);
    onChange(e)
  };

  return (
    <div className="pt-4">
        <section className='flex'>
        <label htmlFor="slider" className="text-sm text-gray-400 block">{text}</label>
        <label htmlFor="slider" className="text-sm text-black font-bold block pl-2">{value}%</label>
        </section>
      <input
        type="range"
        id="slider"
        min={valuemin}
        max={valuemax}
        value={value}
        name={name}
        onChange={handleChange}
        className="w-full bg-gray-300 appearance-none rounded h-2 focus:outline-none"
      />
    </div>
  );
}