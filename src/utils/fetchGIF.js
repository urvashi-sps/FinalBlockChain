import { useEffect, useState } from "react";
// require("dotenv").config();
// const useFetch = ({ keyword }) => {
//   const [gifUrl, setGifUrl] = useState("");
  const GIPHYAPI="TMpSyjGyIpQxJiUEPb3732bvjqR0nXBu";
//   const fetchGifs = async () => {
//     try {
//       const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHYAPI}&q=${keyword.split(" ").join("")}&limit=1`);
//       console.log("THIS IS RESPONSE",response);
//       const { data } = await response.json();
     
//     //   setGifUrl(data[0]?.images?.downsized_medium.url);
//     setGifUrl("BLABLABLAAAAAAA");
//     } catch (error) {
//       setGifUrl("https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284");
//     }
//   };

//   useEffect(() => {
//     if (keyword) fetchGifs();
//   }, [keyword]);

//   return gifUrl;
// };


const gifURL =async ({keyword})=>{

    try {
        // const [gifUrl, setGifUrl] = useState("");
        const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHYAPI}&q=${keyword.split(" ").join("")}&limit=1`);
           console.log("THIS IS RESPONSE",response);
             let { data } = await response.json();
             data=data[0].url;
             return data;
    } catch (error) {
       console.log("ERROR IS COMING FROM HERE",error);
    }
}
export default gifURL;