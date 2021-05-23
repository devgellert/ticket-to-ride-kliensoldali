const wait = async (time = 300) =>
  await new Promise((resolve) => setTimeout(resolve, time));

export default wait;
