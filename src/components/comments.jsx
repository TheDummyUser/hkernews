import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment/moment';

const Comments = ({ storyId }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCommentsClick = () => {
    setIsLoading(true);
    axios
      .get(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`)
      .then((response) => {
        const { kids } = response.data;
        const commentPromises = kids.map((kid) => axios.get(`https://hacker-news.firebaseio.com/v0/item/${kid}.json`));
        Promise.all(commentPromises)
          .then((responses) => {
            const comments = responses.map((response) => {
              const { id, by, text, time } = response.data;
              const timeString = moment.unix(time).fromNow();
              return { id, by, text, timeString };
            });
            setComments(comments);
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
  };

  return (
    <div>
      <button onClick={handleCommentsClick} className='text-blue-500 hover:underline'>
        comments
      </button>
      {isLoading && <div>Loading comments...</div>}
      {!isLoading &&
        comments.map((comment) => (
          <div key={comment.id}>
            <p className='font-bold'>{comment.by}</p>
            <p className='text-sm text-gray-500'>{comment.timeString}</p>
            <p>{comment.text}</p>
            <hr className='my-2' />
          </div>
        ))}
    </div>
  );
};

export default Comments;
