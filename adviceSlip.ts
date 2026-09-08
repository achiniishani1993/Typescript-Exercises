// A Different Advice Slip

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
        throw new Error("Fetching did not work");
      }

      return response.json();
    })
    .then((data: AdviceSlipType) => {
      const advice = data.slip.advice;
      console.log(`Advice ID: ${id}: ${advice}`);
    })
    .catch((error: Error) => {
      console.error(error);
    });
};

fetchAdviceAndLog(1);
fetchAdviceAndLog(2);
fetchAdviceAndLog(3);
