import Card from "./Card.js";
import { initialCards } from "./constants.js";

initialCards.forEach((item) => {
  const card = new Card(item.name, item.link);
  const cardElement = card.generateCard();

  document.querySelector('.elements').prepend(cardElement);
});