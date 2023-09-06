import React from 'react'
import {IconUrlFromCode} from "../Services/WeatherService";

function Forecast({title,items}) {
    console.log(items)
  return ( 
  <div>  
    <div className='flex items-center justify-start mt-6'>
        <p className='text-white font-medium uppercase'>{title}</p>
    </div>
    
    <hr className='my-2'/>
    <div className='flex flex-row items-center justify-between text-white'>
        {/* <div className='flex flex-col items-center justify-center'>
            <p className='font-light text-sm'>
                04:30 PM
            </p>
            <img 
                className='w-12 my-1'
                src="http://openweathermap.org/img/wn/01d@2x.png" 
                alt="sun" 
            />
            <p className='font-medium'>24°</p>
        </div>
        <div className='flex flex-col items-center justify-center'>
            <p className='font-light text-sm'>
                04:30 PM
            </p>
            <img 
                className='w-12 my-1'
                src="http://openweathermap.org/img/wn/01d@2x.png" 
                alt="sun" 
            />
            <p className='font-medium'>24°</p>
        </div>
        <div className='flex flex-col items-center justify-center'>
            <p className='font-light text-sm'>
                04:30 PM
            </p>
            <img 
                className='w-12 my-1'
                src="http://openweathermap.org/img/wn/01d@2x.png" 
                alt="sun" 
            />
            <p className='font-medium'>24°</p>
        </div>
        <div className='flex flex-col items-center justify-center'>
            <p className='font-light text-sm'>
                04:30 PM
            </p>
            <img 
                className='w-12 my-1'
                src="http://openweathermap.org/img/wn/01d@2x.png" 
                alt="sun" 
            />
            <p className='font-medium'>24°</p>
        </div>
        <div className='flex flex-col items-center justify-center'>
            <p className='font-light text-sm'>
                04:30 PM
            </p>
            <img 
                className='w-12 my-1'
                src="http://openweathermap.org/img/wn/01d@2x.png" 
                alt="sun" 
            />
            <p className='font-medium'>24°</p>
        </div> */}
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center"
          >
            <p className="font-light text-sm">{item.title}</p>
            <img
              src={IconUrlFromCode(item.icon)}
              className="w-12 my-1"
              alt=""
            />
            <p className="font-medium">{`${item.temp.toFixed()}°`}</p>
          </div>
        ))}
    </div>

  </div>
  )
}

export default Forecast
