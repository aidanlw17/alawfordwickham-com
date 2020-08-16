---
title: 'GSoC 2019: Recording Similarity Indexing for AcousticBrainz'
author: Aidan Lawford-Wickham
date: '2019-08-26'
slug: gsoc_report
tags:
 - GSoC
 - Open Source
 - MetaBrainz
---

This summer, I had the opportunity to participate in my first Google Summer of Code with the MetaBrainz Foundation. Working on the AcousticBrainz project under the mentorship of Alastair Porter (alastairp), I used previous work on measuring track to track similarity as the basis for a similarity pipeline using the entire AB database.

### How did I get involved?

When I started applying for GSoC, I needed to find an organization that paired a challenging learning environment with a project of personal interest. Given my own passion for listening to music, playing music, and exploring its overlap with culture, MetaBrainz quickly became my top priority. I jumped on the [#metabrainz IRC channel](https://musicbrainz.org/doc/Communication/IRC#.23metabrainz) for the first time, and I’ve been active daily ever since!

From there, the whole community welcomed me with open arms and responded thoughtfully to my questions about setting up my local development environment. I made my first pull request for AcousticBrainz, [AB-387](https://tickets.metabrainz.org/browse/AB-387), which added the ability to include dataset and class descriptions when importing datasets as CSV files. This allowed me to work alongside my soon-to-be mentor for the first time and further acquaint myself with the acousticbrainz-server [source code](https://github.com/metabrainz/acousticbrainz-server).

I was excited about my first PR and wanted to contribute more. Not only was this a project related to my passions, but it had already begun to teach me about technologies that I hadn’t used before. I was struck by the possibility to contribute more, and work with great people on a non-profit, open source project. I quickly decided that MetaBrainz was the only place I would apply for GSoC and began to think about proposals. I read through the [previous work on recording similarity done by Philip Tovstogan](https://doi.org/10.5281/zenodo.1479769), which was based upon a PostgreSQL solution with shortcomings in terms of speed. With a strong supporting background, high community interest, and my own dreams of the possibilities to come from predicting similar tracks, I created a proposal to build a similarity pipeline using Spotify's nearest neighbours library, [Annoy](https://github.com/spotify/annoy). The timeline and tasks shown on the [full proposal](https://community.metabrainz.org/t/gsoc-2019-recording-similarity-index-with-annoy-for-acousticbrainz/423308) were adjusted throughout the summer, but the general objectives were maintained. Looking back on the summer now, the basic requirements for the project were as such:

- Using the previous work, define metrics for measuring similarity that will translate recording features from the AB database into vectors. Compute and store these vectors for every recording in the database.

- Create an Annoy index for each of these metrics, adding the metric's vector for each recording to the index.

- Develop methods of querying an index, such as outputting nearest neighbours (similar recordings) to a specific recording or many recordings, or finding the similarity between two recordings.

- Allow users to query the indices via an API.

- Create an evaluation that allows us to measure the success of our indices in the public eye, fine tune our parameters, and display index queries via a graphical user interface.

### Community Bonding Period

After losing sleep before the announcement, and a huge sigh of relief on May 6th, I was ecstatic to get started.

There was plenty of required reading, and I familiarized myself with the different elements of building similarity into AB. After discussing with Rob (ruaok) and Alastair and cementing our decision to use Annoy as the nearest neighbours algorithm of choice, I took to reading through Annoy documentation and making a small implementation to grasp the concepts. Annoy works blazing fast, and uses small, static files – these are points that would prove advantageous for us in terms of querying indices many times, as quickly as possible. Static index files allow for them to be shared across processes and could potentially make them simple to redistribute to others in the future – a major benefit for further similarity research.

I studied Philip’s previous work, gained an understanding of the metrics he used in his thesis, and reimplemented all of his [code](https://github.com/philtgun/acousticbrainz-server) to better grasp the concepts and use them as a basis for the summer. Much of Philip’s work was built to be easily expandable, and flexible to different types of metrics. Notably, when integrating it with a full pipeline including Annoy, priorities like speed meant that we lost some of this flexibility. I found this to be an interesting contrast between the code structure for an ongoing research purpose, and the code ready to be deployed in production on a website.

All the while, I kept a frequent dialogue with Alastair to gel as a team, clarify issues with the codebase, and further develop our plans for the pipeline. To build on my development skills, learn more about contributing guidelines and source control, and improve the site, I worked on some exciting PRs during the bonding period. Most notably, I completed [AB-406](https://tickets.metabrainz.org/browse/AB-406) over a series of 3 PRs, which allowed us to introduce a submission offset column in the low-level table to handle multiple submissions of a single recording. This reduced the need for complexity in queries to the API, decreasing the load on the server. Additionally, I added some documentation related to contributions and created an API endpoint that would allow users to only select specific features rather than an entire low-level document for a recording – aiming at reducing server load.

Last but not least, I got really involved with the [weekly meetings](https://musicbrainz.org/doc/MetaBrainz_Meeting) at MB! We have meetings every Monday on #metabrainz to give reviews of the last week, and discuss any other important community topics. I love this aspect of the community. Working remotely, it creates a strong team atmosphere and brings us all a bit closer together – even if we’re living time zones apart. During one meeting, we discussed whether or not past GSoC proposals should be available to students. What do you think? This prompted me to share [my own experience](https://community.metabrainz.org/t/gsoc-documentation/427172) with the application process at MetaBrainz and look into if/how we could improve it.

... And so it began, we dove into the first coding period.

### The Key Components, a Deeper Look

#### Computing Similarity Metrics

Having explored the previous similarity work from Philip, I used his definitions of metric classes and focused on developing a script to compute metrics for each recording in the database incrementally. Recognizing that we would also need a method of computing metrics for a single recording on submission, I made this script as open ended as possible. After successfully computing all metrics for the first time, we went through an iterative process of altering the logic and methodology to dramatically improve its speed. Ultimately, we used a query to get the batch of low-level recordings that haven’t had similarity computations, complete with their low-level data and all high-level models. Though we revised and found bugs in this script time and time again, I’m confident in saying that with perseverance we finally got it working.

Prior to the beginning of the project I had limited experience working with SQL databases, and this objective pushed me to develop new ways to approach problems, and gave me a much deeper understanding of PostgreSQL.

#### Building Annoy Indices

With all that vectorized recording data from the metrics computation, nothing sounds better than adding it to an ultra-fast index built for querying nearest neighbours! Feeding the data into an index and watching it output similar recordings in milliseconds became the most satisfying feeling. The Annoy library is a platform for nearest neighbours of all sorts, and it is generally simple: define the index, add items with an identifier and a vector, built the index, save it for later use, load it up, and then use its built-in methods to query for similar items. Easy, right? The added challenge is making this interface with recordings from our database as items, and meeting our needs in terms of speed and alterability when new items are added. Annoy is built without checks in many places, and we required a custom cycle of building, loading, and saving indices to ensure they were operable for our purposes (once an index is built, new items may not be added). At this point, the index model is open to saving new indices with different parameters, which allows us to tune as we further develop the pipeline.

After wrapping the index in a class that interfaced with our needs, we added scripts to build all indices and save them, and scripts to remove indices if need be. Currently, the project has 12 indices, one for each metric in use:

- MFCCs
- Weighted MFCCs
- GFCCs
- Weighted GFCCs
- BPM
- Key
- Onset Rate
- Moods
- Instruments
- Dortmund
- Rosamerica
- Tzanetakis

#### API Endpoints

Making API endpoints available was a high priority activity and was an exciting aspect of the project since it would allow users to interact with the data provided by a similarity pipeline. Using the index model, I created three API endpoints:

- Get the _n_ most similar recordings to a recording specified by an (MBID, offset) combination.
- Get the _n_ most similar recordings to a number of recordings that are specified (bulk endpoint).
- Get the distance between two recordings.

For each endpoint, a parameter indicates the metric in question, determining which index should be used. Currently, the endpoints also allow varying index parameters, such as the distance type (method of distance calculation) and number of trees used in building the index (precision increases with trees, while speed decreases).

A full explanation of the API endpoints is documented in the [source code](https://github.com/metabrainz/acousticbrainz-server/pull/364/files).

#### Baseline Evaluation

As I said, an index can be altered using multiple parameters that impact the build speed, query speed, and precision in finding nearest neighbours. Assessing the query results from our indices with public opinion is a top priority, since it gives us valuable data for understanding the quality of similarity predictions. With the evaluation we will be able to collect feedback from the community on a set of similar recordings – do they seem accurate, or should a recording have been more or less similar? What recording do you think is the most similar? With this sort of feedback, we can measure the success of different parameters for Annoy, eventually optimizing our results.

Moreover, this form of evaluation provides a graphical user interface to interact with similar recordings, as a user-friendly alternative to the API endpoints. Written using React, it feels snappy and fast, and I feel that it provides a pleasing display of similar recordings. At this point in the project I was glad to accept a frontend challenge which differed from the bulk of my work thus far.

### Documentation and Project Links

Similarity pipeline related:

- The project set-up documentation ([pull request](https://github.com/metabrainz/acousticbrainz-server/pull/362))
- The full similarity pipeline complete with evaluation ([pull request](https://github.com/metabrainz/acousticbrainz-server/pull/364))
- Code only for computing metrics ([pull request](https://github.com/metabrainz/acousticbrainz-server/pull/353))

Additional work:

- Specific low-level features endpoint ([pull request](https://github.com/metabrainz/acousticbrainz-server/pull/347))
- Integrate submission offsets into low-level table ([pull request 1](https://github.com/metabrainz/acousticbrainz-server/pull/339), [pull request 2](https://github.com/metabrainz/acousticbrainz-server/pull/340), and [pull request 3](https://github.com/metabrainz/acousticbrainz-server/pull/341))
- Bulk get items with single database query (closed, unnecessary) ([pull request](https://github.com/metabrainz/acousticbrainz-server/pull/337))
- Bug tracking and git workflow documentation ([pull request](https://github.com/metabrainz/acousticbrainz-server/pull/334))
- Dataset and class descriptions for CSV import/export ([pull request](https://github.com/metabrainz/acousticbrainz-server/pull/333))

### Going Forward

This summer allowed for us to build on previous similarity work to the point of developing a fast, full pipeline. At this point, there is still a vast amount of work to be continued on the pipeline and I am eager to see it through. In the upcoming year I plan to continue contributing to AcousticBrainz and the MetaBrainz Foundation as a whole. These are areas that I’m interested in continuing to develop for the recording similarity pipeline:

- Parameter tuning on Annoy indices
- Adding more metrics to cover other recording features
- Adding support for hybrid metrics that consider multiple features (this was started by Philip and should be integrated to provide more holistic similarity)
- Making indices available for offline use
- Creating statistics and visualizations of vectors for each metric

### Wrapping Up
To say the least, this has been a highly rewarding experience. MetaBrainz is a community full of extraordinary, thoughtful, and friendly developers and enthusiasts. I will be forever thankful for this opportunity and the lessons that I gained this summer. I am so excited to meet everyone at the summit this September! I’d like to personally thank my mentor, Alastair Porter (alastairp), for his perceptive guidance, his support, his friendship, and his own contributions to the project. Thanks to Robert Kaye (ruaok) for his support, thoughts, and enthusiasm towards this project, as well as for his dedication to MetaBrainz. Thanks to Google for making this all possible – SoC is a highly unique opportunity to learn about open source software and make new connections! Cheers.
