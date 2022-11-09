# Gifhub

## Purpose

Born in Seattle on a January night out. This is a PWA for viewing locally saved gif and images. Gif and image links are entered and the underlying data is saved as a blob to IndexedDB. Users assign these blobs to playlists and view them in the SwiperJS player

There is a connection to a service for converting video links to clipped Gifs https://github.com/B12Howard/gifcreator, you will need to be authenticated to used it.

Demo https://gifhub.media/

## What is being used

IndexedDB (via Dexie wrapper)
Firebse Auth

Dexie (IndexDB wrapper)
React Beutiful DnD

## Netlify

Step 1: Install or create
Open your terminal and enter the following:

npm install -g create-react-app
create-react-app hello-world
cd hello-world
npm run build

npm install netlify-cli -g
netlify deploy --prod
Or deploy a create-react-app site with Netlify Functions support with just 1 click:

Step 2: Choose a new project
If you are using the netlify CLI, follow command line prompts and choose yes for new project and ./build as your deploy folder and voila you have a production React app!

If that was too hard to follow, here is a gif of me doing it:

You can also link to a GitHub repo for continuous deployment for specified branches and will grant you our nifty Deploy Preview feature.
https://docs.netlify.com/configure-builds/overview/

If you choose to use something for routing (like React Router for example), you will need to set up a redirect and rewrite rule for the single page app.

That redirect rule would look like this:

/\* /index.html 200
This redirect rule above will serve the index.html instead of giving a 404 no matter what URL the browser requests.

You can add redirect rules to the \_redirects file or to your netlify.toml config file. For more information on redirects on Netlify checkout the docs.

[[redirects]]
from = "/\*"
to = "/index.html"
status = 200
force = false
