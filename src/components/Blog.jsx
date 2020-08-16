import React, { useState, useEffect, useRef } from "react";
import BlogView from '../components/BlogView';
import matter from 'gray-matter';
import files from "../../posts/**.md";

export default function Blog() {
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        // console.log('posts')
        // console.log(posts)
        // console.log('--dasffoaf')
        // console.log(fis)
        // glob('../../posts/**.md', files => {
        //     files.forEach(file => {
        //         console.log(file)
        //         // require(``../../posts/${file}``)
        //     });
        // });
        // const files = require('../../posts/**.md');
        setPosts(Object.keys(files).map(key => {
            // const slug = key
            //     .replace(/^.*[\\\/]/, '')
            //     .split('.')
            //     .slice(0, -1)
            //     .join('.');
            // console.log('--------------------')
            // console.log(files[key])
            const document = matter(files[key]);
            console.log(document)
            return {
                document,
                slug: key
            }
        }));
    }, []);

	return posts ? <BlogView posts={posts} /> : null;
}
