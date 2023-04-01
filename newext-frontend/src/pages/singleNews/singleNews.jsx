import React, { useState } from 'react'
import Header from '../../components/homepage/Header/Header'
import Footer from '../../components/homepage/Footer/Footer'
import Newsdata from './newsdata.json'
import Livechat from '../../components/livechat/Livechat'
import ChatInput from '../../components/livechat/ChatInput'
import 'font-awesome/css/font-awesome.min.css'
import './post.css'

// first object or news to be displayed data fetched from .json file
const oneNews = Newsdata[0]

// dividing news content into paragraphs as api provides all the news in one paragraph
function splitString(str) {
  const periodIndices = [];
  let startIndex = 0;

  // Find the indices of all periods in the string
  while (true) {
    const periodIndex = str.indexOf(".", startIndex);
    if (periodIndex === -1) break;
    periodIndices.push(periodIndex);
    startIndex = periodIndex + 1;
  }

  // Extract the substrings using the period indices
  const firstSubstring = str.slice(0, periodIndices[1] + 1) + str.slice(periodIndices[2] + 1, periodIndices[3] + 1);
  const secondSubstring = str.slice(periodIndices[1] + 1, periodIndices[2] + 1);
  const thirdSubstring = str.slice(periodIndices[3] + 1);

  return [firstSubstring, secondSubstring, thirdSubstring];
}

// user comment component
const UserComment = ({username, time, comment, like}) => {
  return(
    <>
      <div className="user-comment_reply-container">
        <div className="username-container">
          <div className="username">{ username }</div>
          <div className="time">{ time }</div>
        </div>
        <div id='user-comment_reply'>in reply to manishmh</div>
        <div className="user-comment">
          <p>{ comment }</p>
        </div>
        <div className="comment-interaction">
          <div className="like">Like 
            <i className='fa fa-thumbs-up'></i>
            <div className="like-count">{ like }</div>
          </div>
          <div className="reply">Reply <i className='fa fa-reply'></i></div>
        </div>
      </div>
    </>
  )
}

// comment reply component
function CommentReply({ username, time, comment, like }) {
  return (
    <>
      <div className="user-comment_reply">
        <UserComment username={username} time={time} comment={comment} like={like} />
      </div>
    </>
  )
}

const SingleNews = ({}) => {
  const [copy, setCopy] = useState(false)
  // const [comment, setComment] = useState(false)

  // share the news and copy link content
  let copyText 
  copy == true ? copyText = "copied" : copyText = "copy link";

  // To fetch the current url of news and copy to the clipboard.
  async function copyToClip() {
    await navigator.clipboard.writeText(location.href);
    setCopy(true);
  }  

  //  word count to measure the readtime of the news
  const wordsLength = oneNews.content.split(" ").length;
  const readTime = Math.ceil(wordsLength / 183) // diving by 183 because it is the average human reading speed

  // calling splitSentences function to use in map function to display the paragraphs
  const splitSenteces = splitString(oneNews.content)
  console.log('splitsentecs', splitSenteces)

  return (
    <>
      <Header ></Header>
      <div className="post-chat_container">
        <div className="single-post">
          <div className="date-menu">
            <div className="date">{ oneNews.postedAt}</div>
            <div className="menu">
              <i className="fa fa-ellipsis-h" onClick={() => {}}></i>
             </div>
          </div>
          <h1 className="single-post_title">
            {oneNews.title}
          </h1>
          <div className="hashtag-readtime_container">
            <div className="hashtag">
              <h4>#sports</h4>
              <h4>#f1 racing</h4>
            </div>
            <div className="readtime">{readTime} mins read</div>
          </div>
          <div className="post-img_container">
            <img
              src={oneNews.image}
              alt="post image"
              /> 
              <div className="gradient-title_container">
                <h3 className='post-title'>The FIA president has revealed he is looking to expand the Formula 1 grid by appealing for expressions of interest for potential new teams.</h3>
              </div>
          </div>
          <div className="news-body">
            {splitSenteces.map(sent => {
              return(<p>{sent}</p>)
            })}
          </div>
        </div>
        <Livechat />
      </div>
      <div className="share-post">
        <h1>Share this post</h1>
        <div className="share-post_media">
          <div className="copy-link" onClick={copyToClip}>
            {!copy 
              ?
              (<span id='clone-symbol'><i className='fa fa-clone'></i></span>)
              : 
              (<span id='check-symbol'><i className='fa fa-check'></i></span>)
            }
            <span id='copy-text'>{ copyText }</span>
          </div>
          <div className="share-post_social">
            <div id='share-post_twitter' ><i className='fa fa-twitter'></i></div>
            <div id='share-post_linkedin' ><i className='fa fa-linkedin'></i></div>
          </div>
        </div>
      </div>
      <hr id='share-post_divider'/>
      <hr />
      <div className="comment-section">
        <div className="comment_input">
          <div className="heading">Comments <i className='fa fa-angle-right'></i></div>
          <ChatInput placeholder="Post a comment"/> 
          <button id='comment-post'>Post</button>
        </div> 
        <div className="users-comment_container">
          <div className="view-comment" onClick={e => setComment(true)}>View all comments <i className='fa fa-angle-down'></i></div>
          <div className="user-comment_container">
            <UserComment username="manishmh" time="20 mins ago" comment="Andretti would do miles better tha williams with better facilites and backing to improve them." like="12"/> 
            <CommentReply username="to the moon" time="10 mins ago" comment="manish build this comment section including every post in here." like="2"/>
            <UserComment username="to the moon" time="10 mins ago" comment="manish build this comment section including every post in here." like="2"/>
          </div>
        </div>
      </div>
    <Footer />
    </>
  )
}

export default SingleNews