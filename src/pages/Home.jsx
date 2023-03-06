import React,{useState, useEffect} from 'react';
import axios from "axios";
import moment from 'moment/moment';
import kakaotalkEmoticon from '../assets/kakaotalk-emoticon.gif'

const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('https://hacker-news.firebaseio.com/v0/topstories.json')
      .then(response => {
        const topStories = response.data.slice(0, 40);
        const storyPromises = topStories.map(storyId =>
          axios.get(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`)
        );
        Promise.all(storyPromises)
          .then(responses => {
            const stories = responses.map(response => {
              const { id, title, url, time, by } = response.data;
              const timeString = moment.unix(time).fromNow();
              return { id, title, url, timeString, by };
            });
            setData(stories);
            setIsLoading(false);
          })
          .catch(error => {
            console.log(error);
            setIsLoading(false);
          });
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className='font-mono'>
      <h1 className='m-10 font-mono text-xl'>Top Stories</h1>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
        <img 
          src={kakaotalkEmoticon} alt=""
          className="w-24 h-24 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" 
        />
      </div>
      ) : (
        <div className='grid place-items-center'>
          {data.map(story => (
            <div className='m-5 p-5 bg-slate-200 rounded-lg shadow-md ' key={story.id}>
              <a href={story.url} className=" text-sm mb-2 md:text-base">{story.title}, Read more.</a>
              <div className='flex space-x-2 text-xs md:text-base content-center'>
                <p>uploaded by: {story.by}</p>
                <p>uploaded:  {story.timeString}</p>
              </div> 
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home
