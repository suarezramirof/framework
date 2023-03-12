const random = (cant) => {
  const obj = {};
  for (let i = 0; i < cant; i++) {
    const rndm = Math.ceil(Math.random() * 1000);
    obj[rndm] = obj[rndm] ? obj[rndm] + 1 : 1;
  }
  return obj;
};

process.on("message", (msg) => {
  const rndms = random(msg);
  process.send(rndms);
  process.exit();
});
