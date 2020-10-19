const faker = require("faker");
const seed = require("./seed-images");

function getSeedData() {
  const data = [];
  const images = seed.getSeedImages();

  let num = 0;

  while (num < 100) {
    data.push({
      image: faker.random.arrayElement(images),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      status: faker.random.arrayElement(["Offline", "Online"]),
      specialty: faker.random.arrayElement([
        "Palm Reading",
        "Card Reading",
        "Fortune Telling",
        "Astrology",
      ]),
      language: faker.random.arrayElement([
        "German",
        "English",
        "Spanish",
        "Chinese",
        "Russian",
        "French",
        "Swedish",
        "Danish",
      ]),
      reviews: faker.random.arrayElement([1, 2, 3, 4, 5]),
    });
    num++;
  }

  return data;
}

module.exports = { getSeedData };
