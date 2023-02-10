export default class CurrencyExchange {
  static async getCurrency() {
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`);
      const jsonResponse = await response.json();
      if (!response.ok) {
        console.log(response);
        const errorMessage = `${response.status}`;
        throw new Error(errorMessage);
      }
      return jsonResponse;
    } catch(error) {
      return error;
    }
  }
}