import React from 'react'
import {FiHeart} from 'react-icons/fi';
const About = () => {
  return (
    <div className='font-mono'>
      <div className='m-10 text-4xl'>about:</div>
      <div className='items-center p-10 pt-4 pb-3 justify-between'>
           Hacker News is a social news website focused on technology and entrepreneurship. 
             It was created by the startup accelerator Y Combinator and is run by a small team of moderators. 
          Users can submit links to articles, blog posts, or other online content related to technology, startups, programming, 
          or other related topics. The content is then ranked based on user votes and comments, with the most popular content appearing
          at the top of the page. In addition to the front page, there are also sub-pages for jobs, ask and show where users can ask questions 
           or showcase their projects. Hacker News is known for its
           engaged and knowledgeable community and has become a popular source of news and discussion for people in the tech industry.
      <div className=' text-blue-500'><a href="https://news.ycombinator.com/">visit the official site</a></div>
      <div className='flex items-center'>made with &nbsp;<FiHeart/><a href="https://portfolio-grim909.vercel.app/" className=' underline text-blue-500'>&nbsp;by Abhiram</a></div>
      </div>
    </div>
  )
}

export default About