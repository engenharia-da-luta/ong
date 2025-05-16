"use strict";

const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach((dropdown) => {
  const trigger = dropdown.querySelector(".dropdown__trigger");

  if (trigger) {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      dropdown.classList.toggle("dropdown--active");
    });
  }
});

document.addEventListener("click", (event) => {
  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector(".dropdown__trigger");
    if (
      dropdown.classList.contains("dropdown--active") &&
      trigger &&
      !trigger.contains(event.target)
    ) {
      dropdown.classList.remove("dropdown--active");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const meses = document.querySelectorAll(".cash-flow__mes");
  const tabelas = document.querySelectorAll(".cash-flow__table");

  meses.forEach((mes, index) => {
    mes.addEventListener("click", function () {
      tabelas.forEach((tabela) => {
        tabela.classList.remove("cash-flow__table--active");
      });
      tabelas[index].classList.add("cash-flow__table--active");
    });
  });
});

const cashPositiveElements = document.querySelectorAll(".cash--positive");
const cashNegativeElements = document.querySelectorAll(".cash--negative");
const cashPositiveTotalElement = document.querySelector(
  ".cash--positive-total"
);
const cashNegativeTotalElement = document.querySelector(
  ".cash--negative--total"
);
const cashTotalElements = document.querySelectorAll(".cash-manual");
const cashTotalElementsAuto = document.querySelectorAll(".cash-auto");

let cashSumPositive = 0;
let cashSumNegative = 0;

cashPositiveElements.forEach((element) => {
  const textoElemento = element.textContent.trim();
  const match = textoElemento.match(/(\d+([.,]\d+)?)/);

  if (match && match[1]) {
    const valorStr = match[1];
    const valorNum = parseFloat(valorStr.replace(",", "."));
    if (!isNaN(valorNum)) {
      cashSumPositive += valorNum;
    }
  }
});

cashNegativeElements.forEach((element) => {
  const textoElemento = element.textContent.trim();
  const match = textoElemento.match(/(\d+([.,]\d+)?)/);

  if (match && match[1]) {
    const valorStr = match[1];
    const valorNum = parseFloat(valorStr.replace(",", "."));
    if (!isNaN(valorNum)) {
      cashSumNegative += valorNum;
    }
  }
});
const cashSumPositiveFormatado = `R$${cashSumPositive
  .toFixed(2)
  .replace(".", ",")}`;
const cashSumNegativeFormatado = `R$${cashSumNegative
  .toFixed(2)
  .replace(".", ",")}`;

const cashTotal = cashSumPositive - cashSumNegative;
const cashTotalFormatado = `R$${cashTotal.toFixed(2).replace(".", ",")}`;

if (cashPositiveTotalElement) {
  cashPositiveTotalElement.textContent = cashSumPositiveFormatado;
}

if (cashNegativeTotalElement) {
  cashNegativeTotalElement.textContent = cashSumNegativeFormatado;
}

const cashTotalManual = "R$-15,61";

cashTotalElements.forEach((element) => {
  element.textContent = cashTotalManual;
  if (cashTotalManual.includes("-")) {
    element.classList.add("cash--negative-result");
    element.classList.remove("cash--positive-result");
    return;
  }

  element.classList.add("cash--positive-result");
  element.classList.remove("cash--negative-result");
});

cashTotalElementsAuto.forEach((element) => {
  element.textContent = cashTotalFormatado;
  if (cashTotal < 0) {
    element.classList.add("cash--negative-result");
    element.classList.remove("cash--positive-result");
    return;
  }

  element.classList.add("cash--positive-result");
  element.classList.remove("cash--negative-result");
});

document.addEventListener("DOMContentLoaded", () => {
  const categoryList = document.querySelector(".story__list");
  const cardsContainer = document.querySelector(".story__cards-content");
  const cards = Array.from(cardsContainer.children);

  function filterCards(category) {
    cards.forEach((card) => {
      if (category === "all") {
        card.classList.add("story__card--selected");
      } else {
        const isSelected = card.classList.contains(`story__card--${category}`);
        if (isSelected) {
          card.classList.add("story__card--selected");
        } else {
          card.classList.remove("story__card--selected");
        }
      }
    });
  }

  categoryList.addEventListener("click", (event) => {
    if (event.target.classList.contains("story__item")) {
      let selectedCategory = "all";

      switch (true) {
        case event.target.classList.contains("story__selected-all"):
          selectedCategory = "all";
          break;
        case event.target.classList.contains("story__selected-others"):
          selectedCategory = "other";
          break;
        case event.target.classList.contains("story__selected-gloves"):
          selectedCategory = "glove";
          break;
        case event.target.classList.contains("story__selected-clothes"):
          selectedCategory = "clothe";
          break;
      }
      filterCards(selectedCategory);
    }
  });

  filterCards("all");
});

function calculateStock() {
  const cards = document.querySelectorAll(".give-card");
  const totalStock = document.querySelector(".story__stock");

  if (totalStock) {
    const result = Array.from(cards).reduce((acumulador, card) => {
      const elementPrice = card.querySelector(".give-card__price .calc--sum");
      const elementStock = card.querySelector(
        ".give-card__stock .calc--multiply"
      );

      if (elementPrice && elementStock) {
        const priceText = elementPrice.textContent;
        const stockText = elementStock.textContent;

        const price = parseFloat(priceText);
        const stock = parseInt(stockText);

        if (!isNaN(price) && !isNaN(stock)) {
          return acumulador + price * stock;
        }
      }
      return acumulador;
    }, 0);

    totalStock.textContent = `Valor em estoque: R$${result.toFixed(2)}`;
  }
}

window.onload = calculateStock;
