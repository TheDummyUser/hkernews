import React from 'react'
import {FiHeart} from 'react-icons/fi';
const About = () => {
  return (
    <div className='font-mono grid p-5'>
  <p className='text-3xl'>about:</p>
  <div className=''>
    <div className='mt-10'>
      <p>
        Hacker News is a social news website focused on technology and entrepreneurship. It was created by the startup accelerator Y Combinator and is run by a small team of moderators. Users can submit links to articles, blog posts, or other online content related to technology, startups, programming, or other related topics. The content is then ranked based on user votes and comments, with the most popular content appearing at the top of the page. In addition to the front page, there are also sub-pages for jobs, ask and show where users can ask questions or showcase their projects. Hacker News is known for its engaged and knowledgeable community and has become a popular source of news and discussion for people in the tech industry.
      </p>
      <p className='grid place-items-center p-5'><a href="http://news.ycombinator.com">vist the official site.</a></p>
    </div>
  </div>
  <footer className='fixed bottom-0 w-full grid place-items-center py-2'>
    <p className='text-center flex items-center'>made with <FiHeart className='text-red-500 mx-1'/> by abhiram</p>
  </footer>
</div>
  )
}

export default About