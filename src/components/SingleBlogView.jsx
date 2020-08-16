import React, { useEffect, useState, useRef } from 'react';
import styled from "styled-components";
import { useParams } from 'react-router-dom';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import files from "../../posts/**.md";

const tagStyle = {
    // color: "#363537",
    fontSize: "11px",
    color: "#BF1A2F",
    padding: "2px 6px",
    marginRight: "8px",
    display: "inline",
    borderRadius: "4px",
    textTransform: "uppercase",
    // background: "#C8C8C8"
    background: "#F5F2F0"
}

const SingleBlogView = ({ className }) => {
    const [loaded, setLoaded] = useState(false);
    const params = useParams();
    const info = useRef({
        markdownBody: null,
        frontmatter: null,
        tags: null,
        url: null,
        twitterLink: null,
        date: null,
        title: null
    });

    useEffect(() => {
        const content = files[params.id]
        const data = matter(content);
        info.current.frontmatter = data.data;
        let frontmatter = data.data;
        info.current.markdownBody = data.content;
        info.current.tags = frontmatter.tags.map(
            tag => <li style={tagStyle} key={tag} className="tag">{tag}</li>
        );
        info.current.url = `https://www.noodlab.com/props/${frontmatter.slug}`;
        info.current.twitterLink = `http://twitter.com/share?text=${frontmatter.title}&url=${info.current.url}&via=aidanlw17`;
        info.current.date = frontmatter.date.toString().slice(0, 10);
        console.log('setting title...')
        info.current.title = frontmatter.title;
        setLoaded(true);
    }, []);

    return loaded ? (
        <div className={className}>
            <div className="container">
                <div className="header">
                    <h1 className="title">{info.current.title}</h1>
                    <p className="meta"><span className="date">Last updated: {info.current.date}</span> / <a href={info.current.twitterLink} target="_blank">share</a></p>
                    {info.current.tags}
                </div>
                <ReactMarkdown source={info.current.markdownBody}/>
            </div>
        </div>
    ) : null;
}

const StyledSingleBlogView = styled(SingleBlogView)`
    .container {
        font-size: 1.6em;
        // font-size: 1.5em;
        width: 56%;
        min-width: 470px;
        min-height: 450px;
        background: #FFFFFF;
        color: #363537;
        margin: 3em auto;
        margin-top: 1em;
        padding-right: 100px;
        padding-left: 100px;
        overflow: auto;
        font-family: 'Source Sans Pro';
        line-height: 30px;
    }
    .header {
        margin-bottom: 1.4em;
        line-height: 20px;
    }
    .meta > span {
        margin-right: 4px;
        color: #646464;
    }
    .meta > a {
        margin-left: 4px;
        color: #E7BB41;
        text-decoration: none;
        font-weight: bold;
    }
    .meta {
        font-weight: 100;
        font-size: 0.8em;
    }
`;

export default StyledSingleBlogView;
