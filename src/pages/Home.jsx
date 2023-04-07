import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment/moment';

import kakaotalkEmoticon from '../assets/kakaotalk-emoticon.gif';

const Home = () => {
  const options = {
    "Top stories": "topstories",
    "New stories": "newstories",
    "Ask Stories": "askstories",
    "Show Stories": "showstories",
    "Jobs": "jobstories",
  };

  const [selectedOption, setSelectedOption] = useState(options['Top stories']);
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
      <div className='m-5 font-mono text-xl'>
        <select className=' rounded-md bg-white p-2 m-5 font-mono text-xl' value={selectedOption} onChange={handleChange}>
          {Object.keys(options).map((key) => (
            <option value={options[key]} key={key}>
              {key}
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
        <div className=''>
  {stories.map((story) => (
    <div className="m-5" key={story.id}>
      <a href={story.url} className="mb-2 block">{story.title}</a>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <p>{story.timeString}</p>
        <a href={`https://news.ycombinator.com/user?id=${story.by}`} className="hover:text-blue-500">@{story.by}</a>
      </div>
    </div>
  ))}
</div>

      )}
    </div>
  );
};

export default Home;
