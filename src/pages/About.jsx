import React from 'react'
import {FiHeart} from 'react-icons/fi';
const About = () => {
  return (
    <div className='font-mono grid p-5'>
      <p className='text-3xl'>about:</p>
      <div className='mt-5'>
        <div className=''> {/* want to push the last text to the end as a footer. */}
        <p>
          Hacker News is a social news website focused on technology and entrepreneurship. It was created by the startup accelerator Y Combinator and is run by a small team of moderators. Users can submit links to articles, blog posts, or other online content related to technology, startups, programming, or other related topics. The content is then ranked based on user votes and comments, with the most popular content appearing at the top of the page. In addition to the front page, there are also sub-pages for jobs, ask and show where users can ask questions or showcase their projects. Hacker News is known for its engaged and knowledgeable community and has become a popular source of news and discussion for people in the tech industry.
        </p>
        <p className='grid place-items-center p-5'><a href="http://news.ycombinator.com">vist the official site.</a></p>
        </div>
        <footer className='grid place-content-center'>
        <p className='flex items-center'>made with <FiHeart/> by abhiram</p>
      </footer>
      </div>
    </div>
  )
}

export default About