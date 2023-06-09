// const GIPHYAPI="TMpSyjGyIpQxJiUEPb3732bvjqR0nXBu";
// const gifURL =async ({keyword})=>{

//     try {
//         // const [gifUrl, setGifUrl] = useState("");
//         const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHYAPI}&q=${keyword.split(" ").join("")}&limit=1`);
//              let { data } = await response.json();
//              data=data[0].images.downsized_medium.url;
//              console.log("NEWWWWWWWWW",data);
//              return data;
//     } catch (error) {
//        console.log("ERROR IS COMING FROM HERE",error);
//     }
// }
// export default gifURL;


import { useEffect, useState } from "react";

const APIKEY = "TMpSyjGyIpQxJiUEPb3732bvjqR0nXBu";

const useFetch = ({ name }) => {
  const [gifUrl, setGifUrl] = useState("");

  const fetchGifs = async () => {
    try {
      const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&q=${name.split(" ").join("")}&limit=1`);
      const { data } = await response.json();

      setGifUrl(data[0].images.downsized_medium.url);
    } catch (error) {
      setGifUrl("https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284");
    }
  };

  useEffect(() => {
    if (name) fetchGifs();
  }, [name]);

  return gifUrl;
};

export default useFetch;