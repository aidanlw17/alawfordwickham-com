import React from "react";
import styled from "styled-components";
import PostListItem from './PostListItem';

function BlogView(props) {
    const reformatDate = (fullDate) => {
        const date = new Date(fullDate);
        return date.toDateString().slice(4);
    }

    const posts = props.posts.map(post => {
        console.log(post)
        return <PostListItem
                key={post.slug}
                slug={post.slug}
                title={post.document.data.title}
                date={reformatDate(post.document.data.date)}
                tags={post.document.data.tags}
                content={post.document.content}
        />
    });

    return (
        <div className={props.className}>
        <div className="container">
            <p><strong>[aidan@noodlab ~]$</strong> ls -lt</p>
            <ul>
                {posts}
            </ul>
        </div>
        </div>
    );
}

const StyledBlogView = styled(BlogView)`
    .container {
        font-size: 1.2em;
        width: 56%;
        min-width: 470px;
        min-height: 450px;
        background: #FFFFFF;
        color: #363537;
        margin: 3em auto;
        padding-right: 100px;
        padding-left: 100px;
    }

    ul {
        list-style-type: none;
        padding-left: 0px;
    }
`;

export default StyledBlogView;
