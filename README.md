# User quide 
There is example for post 
<img width="1044" alt="image" src="https://github.com/ReidenXerx/hackernews-client/assets/34869259/fdefb395-b5ce-41b2-85c5-3e784e0a9754">
Here you can see title information, link on the origin news, rank information that is shown in star based structure, date when the post was released, type of the post.
Also there is an interactive element with comments. When we click on it the comments appear in the **Comments** section below.
<img width="1101" alt="image" src="https://github.com/ReidenXerx/hackernews-client/assets/34869259/23395d83-3e8a-49f1-9e73-f74e5c60f8aa">

Here you can see comments section. It has a tree based structure that shows all comments in hierarchical view. Under the comments tree you can see a form for sending your comments (you can do this only locally because there is no comment sending API).
<img width="1140" alt="image" src="https://github.com/ReidenXerx/hackernews-client/assets/34869259/6973dafa-2ce1-4506-baed-38e5d3970b2c">
Perform mouse click on particular comment's reply button for changing it for reply. After then you need to input some comment text.

# Responsive design
## Desktop 
<img width="1045" alt="image" src="https://github.com/ReidenXerx/hackernews-client/assets/34869259/00d97bc5-1b74-4627-8af6-f1272828c73b">

## Tablet
<img width="506" alt="image" src="https://github.com/ReidenXerx/hackernews-client/assets/34869259/26f3fbac-5997-4454-8459-decb97141e08">

## Smartphone
<img width="406" alt="image" src="https://github.com/ReidenXerx/hackernews-client/assets/34869259/37e0de1d-4542-4384-bf9a-6559e8044b42">


# Used approaches
This section describes non-standard approaches used in this application.
## Recursive rendering
I created HOC for MUI tree item which implements recursive rendering for a tree item and dynamically renders a whole comments tree. Recursive rendering is very useful for tree based structures.
## pasteComments method provided via React Context
It's kind of non-common approach which I think is cool enough because we spawn actually a setter for a particular state in any component and get this method in any other component via Context. It's very handy and useful.
## Recursive getting whole comments tree
Unfortunately, hackernews API doesn't support batch requests and i was forced to send it consiquentally and it spends a time but anyway i have cool idea how it WOULD be if there would be API for batching and i could you provide it on interview.
## Proxy server for bypassing CORS restrictions in hackernews API
Vite it's really cool replacement for old one webpack. It can create proxy server under the hood for requesting any API.

# Open AI usage
1. Vite config for proxy server
2. Actual and **modern** Jest companions npm packages and usage of it.
3. Suggestion of MUI components in particular cases.

# Known issues
1. <img width="440" alt="image" src="https://github.com/ReidenXerx/hackernews-client/assets/34869259/c8284d8c-8b1c-4434-90b1-228d5ba3db29">

React for some reasons thinks that there is a missing key but actually it is not as you can see on the screen.

2. HackerNews comments include specific html elements inside their website. So there should be a validator for text cleaning. I implemented a very basic validator because the advanced one for this project will be overhead. Also i didn't use dangerouslySetInnerHTML because it's bad practice for safety reasons.

