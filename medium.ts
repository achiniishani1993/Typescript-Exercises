// Task 4: Fetching Advice

const fetchAdvice = async (): Promise<void> => {
  try {
    const response = await fetch("https://api.adviceslip.com/advice");
    if (!response.ok) {
      throw new Error("Fetching did not work");
    }
    const data = await response.json();
    console.log(data.slip.advice);
  } catch (error) {
    console.log("Error fetching advice:", error);
  }
};
fetchAdvice();

// Task 5: Checking the Response

const fetchAdviceById = async (id: number) => {
  try {
    const response = await fetch(`https://api.adviceslip.com/advice/${id}`);
    if (!response.ok) {
      throw new Error("Fetching did not work");
    }
    const data = await response.json();
    console.log(`Advice ID: ${id}: ${data.slip.advice}`);
  } catch (error) {
    console.log(`Sorry, unable fetch advice #${id}. Please try again later.`);
    console.error("Error fetching advice:", error);
  }
};

fetchAdviceById(11);
// fetchAdviceById(99999999);

// Task 6: Two Fetches in a Row

const twoAdvice = async (id1: number, id2: number) => {
  try {
    const response1 = await fetch(`https://api.adviceslip.com/advice/${id1}`);
    if (!response1.ok) throw new Error("Fetching did not work");
    const adviceOne = await response1.json();
    console.log(`Advice one is`, adviceOne);

    const response2 = await fetch(`https://api.adviceslip.com/advice/${id2}`);
    if (!response2.ok) throw new Error("Fetching did not work");
    const adviceTwo = await response2.json();
    console.log(`Advice two is`, adviceTwo);

  } catch (error) {
    console.log(`Sorry, unable to fetch advice ${id1}, ${id2}. Please try again later.`);
    console.error("Error fetching advice:", error);
  }
};

twoAdvice(11, 15);