import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const PostListItem = (props) => {
    const tagStyle = {
        color: "#363537",
        fontSize: "11px",
        padding: "2px 6px",
        marginRight: "8px",
        display: "inline",
        borderRadius: "4px",
        textTransform: "uppercase",
        background: "#f5f2f0"
    }

    const tags = props.tags.map(
        tag => <li style={tagStyle} key={tag} className="tag">{tag}</li>
    );

    return (       
        <li className={props.className} key={props.slug}>
            <div>
                <span className="date">{props.date}</span>
                <Link to={`/blog/${props.slug}`} className="title">{props.title}</Link>
                <ul className="tags">
                    {tags}
                </ul>
            </div>
        </li>
    );
}

const StyledPostListItem = styled(PostListItem)`
    .tag {
        // margin: 4px;
    }

    div {
        display: flex;
        margin-bottom: 16px;
    }

    .date {
        flex: 0;
        color: #363537;
        font-weight: 400;
        // width: 30px;
        min-width: 100px;
    }

    .title {
        flex: 1;
        margin: 0px 20px 0px 20px;
        text-decoration: none;
        color: #363357;
        // color: #BF1A2F;
        // color: #363357;
        font-weight: bold;
        color: #E7BB41;
        min-width: 300px;
    }

    // .title:hover {
    //     // color: #363537;
    //     // color: #BF1A2F;
    //     // color: #363357;
    // }

    .tags {
        flex: 2;
        list-style-type: none;
    }
`;

export default StyledPostListItem;
