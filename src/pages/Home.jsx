import React,{useState, useEffect} from 'react';
import axios from "axios";
import moment from 'moment/moment';
const Home = () => {
  const [data, setData] = useState([]);

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
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className='font-mono'>
      <h1 className='m-10 font-mono text-xl'>Top Stories</h1>
      <div>
        {data.map(story => (
          <div className='m-5 p-5 bg-slate-200 rounded-lg shadow-md ' key={story.id}>
            <p href={story.url} className=" text-sm mb-2 md:text-base">{story.title} | click here to view more.</p>
            <div className='flex space-x-2 text-xs md:text-base'>
              <p>uploaded by: {story.by}</p>
              <p>uploaded: {story.timeString}</p>
            </div> 
          </div>
        ))}
      </div>
    </div>
  );
}
export default Home