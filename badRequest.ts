// Handling a Bad Request

type AdviceSlipType = {
  slip: {
    id: number;
    advice: string;
  };
};

const fetchAdviceAndLog = (id: number) => {
  fetch(`https://api.adviceslip.com/advice/${id}`)
    .then((response: Response) => {
      if (!response.ok) {
        console.log(`Response not ok for ID: ${id}`);
        throw new Error(`Fetching advice ${id} did not work`);
      }

      return response.json();
    })
    .then((data: AdviceSlipType) => {
      const advice = data.slip.advice;
      console.log(`Advice ID: ${id}: ${advice}`);
    })
    .catch((error: Error) => {
      console.error(`Error: ${error.message}`);
    });
};

fetchAdviceAndLog(1);
fetchAdviceAndLog(2);
fetchAdviceAndLog(3);
fetchAdviceAndLog(99999999);