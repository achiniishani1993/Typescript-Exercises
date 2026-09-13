// Task 7: Combining a Promise and a Fetch

const flipCoin = () => {
  return new Promise((resolve, reject) => {
    const outcome = Math.random() > 0.5;
    outcome ? resolve("win") : reject("lose");
  });
};

const finalOutput = async () => {
  try {
    const results = await flipCoin();
    // console.log(results);
      const apiCall = await fetch(`https://api.adviceslip.com/advice`);
      if (!apiCall.ok) throw new Error("Fetching did not work");
      const advice = await apiCall.json();
      console.log(advice);
  } catch (error) {
    console.log("Flip was failed... Try again!!");
  }
};

finalOutput();

// Task 8: Running Promises at the Same Time

const fetchAdvice = async (id: number) => {
  const response = await fetch(`https://api.adviceslip.com/advice/${id}`);
  if (!response.ok) {
    throw new Error(`Fetching advice #${id} did not work`);
  }
  return response.json();
};

const twoAdviceAtSameTime = async (id1: number, id2: number) => {
  try {
    const [adviceOne, adviceTwo] = await Promise.all([
      fetchAdvice(id1),
      fetchAdvice(id2),
    ]);

    console.log(`Advice one:`, adviceOne);
    console.log(`Advice two:`, adviceTwo);

    return { adviceOne, adviceTwo };
  } catch (error) {
    console.log(`Failed to fetch advice ${id1} or ${id2}. Please try again later.`, error);
  }
};

twoAdviceAtSameTime(11, 15);

// Task 9: Your Own Async Function

const getCurrentTemperature = async (latitude: number, longitude: number) => {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    const temperature = data.current_weather.temperature;

    console.log(`Current temperature: ${temperature}°C`);
    return temperature;

  } catch (error) {
    console.log(`Request failed... try again later!`, error);
  }
};

getCurrentTemperature(23.05, 12.69);