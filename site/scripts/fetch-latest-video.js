const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch'); // v2 recommended for CommonJS

const API_KEY = 'AIzaSyCLraFzpmCD9F2Qq-uFj55gJkIbfb0Mt60'; 
const CHANNEL_ID = 'UCp99vU6iXVMGTRISyEE8kag';

const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&maxResults=1&type=video`;

fetch(url)
  .then(res => res.json())
  .then(data => {
    if (!data.items || data.items.length === 0) {
      throw new Error('No videos found.');
    }

    const video = data.items[0];
    const snippet = video.snippet;
    const videoId = video.id.videoId;

    const videoData = {
      videoId,
      title: snippet.title,
      thumbnail: snippet.thumbnails.high.url,
      publishedAt: snippet.publishedAt
    };

    const outputDir = path.join(__dirname, '..', 'data');
    const outputPath = path.join(outputDir, 'latest-video.json');

    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(videoData, null, 2));

    console.log(`✅ Latest video info saved to ${outputPath}`);
  })
  .catch(err => {
    console.error('❌ Error fetching video:', err.message);
  });
