import React from "react";
import { createGlobalStyle } from 'styled-components';
import Header from './Header';
import MainContent from './MainContent';

const GlobalStyle = createGlobalStyle`
    html,
    body,
    body > div:first-child,
    div#__next,
    div#__next > div {
        // height: 100%;
        // overflow: hidden;
        // position: absolute;
    }

    body { 
        background: #FFFFFF;
        font: 11px menlo;
        color: #2C4251;
        margin-top: 0;
        margin-right: 0;
        margin-left: 0;
        height: 100%;
        overflow: auto;

        :not(pre) > code {
            padding: 3px 5px;
            color: #111111;
            border-radius: 3px;
            background: #f5f2f0;
        }
    
        h1, h2, h3, h4, h5, h6 {
            font-family: menlo;
            font-weight: 600;
        }
    
        h1 {
            font-size: 1.7em;
            line-height: 40px;
        }
    
        h3 {
            font-size: 1.4em;
        }
    
        a {
            text-decoration: none;
            color: #E7BB41;
        }
    
        .box {
            display: flex;
            height: 100%;
        }
    }
`

const Layout = props => (
    <div className="top">
        <GlobalStyle />
        <Header />
        <MainContent>
            {props.children}
        </MainContent>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.5.0/prism.min.js"></script>
    </div>
);

export default Layout;
