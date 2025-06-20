async function convertCurrency() {
  const amount = document.getElementById("amount").value;
  const fromCurrency = document.getElementById("fromCurrency").value;
  const toCurrency = document.getElementById("toCurrency").value;
  const resultElement = document.getElementById("result");

  if (!amount || amount <= 0) {
    resultElement.textContent = "Por favor, insira um valor válido.";
    return;
  }

  try {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`); 
    const data = await response.json();
    const rate = data.rates[toCurrency];

    if (!rate) {
      resultElement.textContent = "Erro ao converter. Tente novamente.";
      return;
    }

    const convertedAmount = (amount * rate).toFixed(2);
    resultElement.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
  } catch (error) {
    console.error("Erro na conversão:", error);
    resultElement.textContent = "Erro ao carregar taxas de câmbio.";
  }
}