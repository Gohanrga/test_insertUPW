const URL = "http://localhost:3001/data";
export class ApiService {
  async post(parameters) {
    try {
      const data = { ...parameters, id: await this.getNextId() };
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.status === 200 || response.status === 201) {
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getNextId() {
    const response = await fetch(URL);
    const datas = await response.json();
    datas.sort((a, b) => b.id - a.id);
    return datas[0].id + 1;
  }
}
