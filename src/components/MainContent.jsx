import React from "react";
import styled from "styled-components";

const MainContent = props => {
    return (
        <div className={props.className}>
        <div className="main-box">
        {/* <div className="main-box-head"><span>:prev current - index next:</span></div> */}
            {props.children}
            <div className="sitemap">
                <p>Made with <span>&lt;3</span> by</p>
                <p className="name">Aidan Lawford-Wickham</p>
                <p>on January 5, 2020</p>
            </div>
        </div>
        </div>
    );
}

const StyledMainContent = styled(MainContent)`
    .main-box {
        // border: 1px solid #5A5353;
        width: 100%;
        // height: 100%;
        // height: 90%;
        // margin-top: 15px;
        // margin-left: 15px;
        // margin-right: 15px;
        // margin-bottom: 15px;
        // bottom: -400px;
        // flex: 1 1 auto;
        // align-content: center;
        // overflow: auto;
    }

    .sitemap {
        position: fixed;
        bottom: 14px;
        left: 14px;
    }

    span {
        color: #BF1A2F;
        font-weight: bold;
    }

    .name {
        font-weight: bold;
        color: #363537;
    }

    // .main-box-head {
    //     height: 2em;
    //     background: #4A4545;
    //     color: #E6EBE0;
    //     font-family: monospace;
    //     font-size: 0.9em;
    //     text-align: center;
    //     // vertical-align: center;
    //     line-height: 2em;
    // }

    // h5 {
    //     color: #5A5353;
    //     text-align: center;
    // }
`

export default StyledMainContent;