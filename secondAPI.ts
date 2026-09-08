type ChuckNorrisResponse = {
  icon_url: string;
  id: string;
  url: string;
  value: string;
};

const fetchChuckNorrisJoke = () => {
  fetch("https://api.chucknorris.io/jokes/random")
    .then((response: Response) => {
      if (!response.ok) {
        console.error("Failed to fetch the data");
      }
      return response.json();
    })
    .then((data: ChuckNorrisResponse) => {
      console.log(data.value);
    })
    .catch((error: unknown) => {
      console.error("unknown error occurred:", error);
    });
};

fetchChuckNorrisJoke();