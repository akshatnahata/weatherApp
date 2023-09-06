import React from 'react'

function TopButtons({setQuery}) {
    const cities = [
        {
            id:1,
            title:"New York"
        },
        {
            id:2,
            title:"London"
        },
        {
            id:3,
            title:"Paris"
        },
        {
            id:4,
            title:"Mumbai"
        },
        {
            id:5,
            title:"Tokyo"
        }
    ]
  return (
    <div className='flex item-center justify-around my-6'>
      {cities.map((city)=>(
        <button 
        key={city.id} 
        className='text-white text-lg font-medium'
        onClick={() => setQuery({ q: city.title })}
        >
          {city.title}
        </button>
      ))}
    </div>
  );
}

export default TopButtons
