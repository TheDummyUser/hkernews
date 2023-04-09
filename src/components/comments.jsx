import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment/moment';

const Comments = ({ storyId, storyFeed }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    setIsHidden(true);
    setComments([]);
  }, [storyId]);

  const handleCommentsClick = () => {
    setIsLoading(true);
    axios
      .get(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`)
      .then((response) => {
        const { kids } = response.data;
        const commentPromises = kids.map((kid) =>
          axios.get(`https://hacker-news.firebaseio.com/v0/item/${kid}.json`)
        );
        Promise.all(commentPromises)
          .then((responses) => {
            const comments = responses.map((response) => {
              const { id, by, text, time } = response.data;
              const timeString = moment.unix(time).fromNow();
              // fix the text by decoding HTML entities
              const decodedText = new DOMParser().parseFromString(text, 'text/html').body.textContent;
              return { id, by, text: decodedText, timeString };
            });
            setComments(comments);
            setIsLoading(false);
            setIsHidden(false);
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

  const handleHideClick = () => {
    setIsHidden(true);
    setComments([]);
    setIsLoading(false);
  };

  let commentsButtonLabel = 'Show comments';
  if (storyFeed === 'Top stories') {
    commentsButtonLabel = 'Show top comments';
  } else if (storyFeed === 'New Stories') {
    commentsButtonLabel = 'Show new comments';
  } else if (storyFeed === 'Ask Stories') {
    commentsButtonLabel = 'Show ask comments';
  } else if (storyFeed === 'Show Stories') {
    commentsButtonLabel = 'Show show comments';
  } else if (storyFeed === 'Jobs Stories') {
    commentsButtonLabel = 'Show Jobs comments';
  }
  return (
    <div>
      {isHidden ? (
        <button onClick={handleCommentsClick} className='text-blue-500 hover:underline'>
          {commentsButtonLabel}
        </button>
      ) : (
        <button onClick={handleHideClick} className='text-blue-500 hover:underline'>
          Hide comments
        </button>
      )}
      {isLoading && <div>Loading comments...</div>}
      {!isLoading &&
        !isHidden &&
        comments.map((comment) => (
          <div key={comment.id} className="font-mono">
            <p className=' text-sm'>{comment.by}</p>
            <p className='text-sm text-gray-500'>{comment.timeString}</p>
            <p className='text-sm text-gray-700'>{comment.text}</p>
            <hr className='my-2' />
          </div>
        ))}
    </div>
  );
};

export default Comments;
