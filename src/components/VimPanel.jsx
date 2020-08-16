import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const VimPanel = ({ className }) => (
    <div className={className}>
        <div className="container">
            <div className="container-bottom">
                <p><strong>[aidan@noodlab ~]$</strong> cat about.md</p>
                <p>Hey, it's nice to meet you.</p>
                <p>I'm a software developer intern at <a href="https://www.ceridian.com/" target="_blank">Ceridian</a> and a student in <a href="https://engsci.utoronto.ca/explore_our_program/about_engsci/" target="_blank">Engineering Science at the University of Toronto</a>.</p>
                <br />
                <p>I was previously a Google Summer of Code student developer at <a href="https://www.metabrainz.org/" target="_blank">MetaBrainz Foundation Inc</a>.</p>
                <p>Find my other projects on <a href="https://www.github.com/aidanlw17" target="_blank">GitHub</a>, add me on <a href="https://www.linkedin.com/in/alawfordwickham/" target="_blank">LinkedIn</a>, and check out my <a href="/resume.pdf" target="_blank">resume</a>!</p>
                <p>You can also read about my work <a href="https://blog.metabrainz.org/2019/08/26/gsoc-2019-recording-similarity-indexing-for-acousticbrainz/" target="_blank">here</a>, or <Link to="/blog" target="_blank">here</Link>.</p>
                <br />
                <p>I enjoy challenging projects, competition, and the opportunity to collaborate with other developers.</p>
                <p>My technical interests include cloud computing, networking, operating systems, and machine learning.</p>
                <p>I <span>&lt;3</span> open source, and I'm an active contributor to the <a href="https://acousticbrainz.org/" target="_blank">AcousticBrainz project</a>.</p>
                <br />
                <p>I'm also fascinated by music, sports, mathematics, philosophy, and simulation theory.</p>
                <p>If I'm not hacking away, you'll probably find me doing something related to these things.</p>
                <br />
                <p>Shoot me an email, find me on Twitter, or chat with me on freenode IRC if you want to work together.</p>
                <p>... if you're a hiring manager, you can send an email my way too ;)</p>
                <ul>
                    <li>Email: <a href="mailto:alawfordwickham@mail.utoronto.ca" target="_blank"> alawfordwickham@mail.utoronto.ca</a></li>
                    <li>Twitter: <a href="https://twitter.com/aidanlw17" target="_blank">aidanlw17</a></li>
                    <li>Freenode IRC: aidanlw17</li>
                </ul>
            </div>
        </div>
    </div>
);

const StyledVimPanel = styled(VimPanel)`
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

    .title {
        font-size: 1em;
        padding-bottom: 0.6em;
        color: #E6EBE0;
    }

    li {
        list-style-type: none;
        padding: 0.2em;
    }

    a {
        text-decoration: none;
        font-weight: bold;
        color: #E7BB41;
    }

    span {
        color: #BF1A2F;
        font-weight: bold;
    }
`;

export default StyledVimPanel;
