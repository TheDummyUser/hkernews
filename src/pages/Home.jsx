import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment/moment';

import kakaotalkEmoticon from '../assets/kakaotalk-emoticon.gif';
import data from '../assets/hn.json';

const Home = () => {
  const [selectedOption, setSelectedOption] = useState('topstories');
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const url = `https://hacker-news.firebaseio.com/v0/${selectedOption}.json?print=pretty`;
    setIsLoading(true);
    axios
      .get(url)
      .then((response) => {
        const storyIds = response.data.slice(0, 40);
        const storyPromises = storyIds.map((storyId) =>
          axios.get(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`)
        );
        Promise.all(storyPromises)
          .then((responses) => {
            const stories = responses.map((response) => {
              const { id, title, url, time, by } = response.data;
              const timeString = moment.unix(time).fromNow();
              return { id, title, url, timeString, by };
            });
            setStories(stories);
            setIsLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setIsLoading(false);
          });
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [selectedOption]);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className='font-mono'>
      <h1 className='m-10 font-mono text-xl'>{selectedOption}</h1>
      <div className='flex justify-center items-center'>
        <select className='p-2 rounded-lg' value={selectedOption} onChange={handleChange}>
          {Object.keys(data).map((key) => (
            <option value={key} key={key}>
              {data[key]}
            </option>
          ))}
        </select>
      </div>
      {isLoading ? (
        <div className='flex justify-center items-center h-screen'>
          <img
            src={kakaotalkEmoticon}
            alt=''
            className='w-24 h-24 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
          />
        </div>
      ) : (
        <div className='grid place-items-center'>
          {stories.map((story) => (
            <div className='m-5 p-5 bg-slate-200 rounded-lg shadow-md ' key={story.id}>
              <a href={story.url} className='text-sm mb-2 md:text-base'>
                {story.title}, Read more.
              </a>
              <div className='flex space-x-2 text-xs md:text-base content-center'>
                <p>uploaded by: {story.by}</p>
                <p>uploaded: {story.timeString}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
