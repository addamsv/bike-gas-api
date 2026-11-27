const { doPOST } = require('../../index');
const { ENV } = require('../../app/constant');

describe('Products Endpoint tests', () => {
  test("create", () => {
    const data = JSON.stringify({
      "enabled": true,
      "owner": 1,
      "Title": "Shimano GRX-FC-RX610",
      "price": 20,
      "currency": "BYN",
      "brand": "Shimano",
      "Series": "",
      "Length": "13 hrs and 7 mins",
      "Language": "English",
      "ReleaseDate": "05-06-25",
      "Format": "Unabridged Audiobook",
      "Publisher": "Simon & Schuster Audio",
      "link": "#",
      "linkEx": "",
      "img": "images/GRX-FC-RX610.webp",
      "views": 1,
      "PublicationDate": "05-07-25",
      "Author": JSON.stringify([
        "Fredrik Backman"
      ]),
      "Narrated": JSON.stringify([
        "Marin Ireland"
      ]),
      "Translator": JSON.stringify([
        ""
      ]),
      "Genres": JSON.stringify([
        "Crankset"
      ]),
      "blocks": JSON.stringify([
        {
          "id": "1",
          "type": "TEXT",
          "title": "",
          "paragraphs": [
            "Most people don’t even notice them—three tiny figures sitting at the end of a long pier in the corner of one of the most famous paintings in the world. Most people think it’s just a depiction of the sea. But Louisa, an aspiring artist herself, knows otherwise, and she is determined to find out the story of these three enigmatic figures.",
            "Twenty-five years earlier, in a distant seaside town, a group of teenagers find refuge from their bruising home lives by spending long summer days on an abandoned pier, telling silly jokes, sharing secrets, and committing small acts of rebellion. These lost souls find in each other a reason to get up each morning, a reason to dream, a reason to love.",
            "Out of that summer emerges a transcendent work of art, a painting that will unexpectedly be placed into eighteen-year-old Louisa’s care. She embarks on a surprise-filled cross-country journey to learn how the painting came to be and to decide what to do with it. The closer she gets to the painting’s birthplace, the more nervous she becomes about what she’ll find. Louisa is proof that happy endings don’t always take the form we expect in this stunning testament to the transformative, timeless power of friendship and art."
          ]
        }
      ])
    });

    const res = doPOST({
      // parameter: { endpoint: "products", action: "create", method: "POST" },
      parameter: {
        rout: "api/v1/products",
        action: "create"
      },
      postData: {
        contents: JSON.stringify({
          authorization: ENV.BASIC_OAUTH,
          data
        })
      }
    });

  });
  test("read", () => {
  });
  test("update", () => {
  });
  test("delete", () => {
  });
});