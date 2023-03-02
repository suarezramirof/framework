import fs from "fs/promises";

class FileContainer {
  constructor(route) {
    this.route = route;
  }

  async getAll() {
    const items = await fs.readFile(this.route, "utf-8");
    return JSON.parse(items);
  }

  async get(id) {
    const [item] = await this.getAll().map((elem) => elem.id == id);
    return item;
  }

  async add(item) {
    const items = await this.getAll();
    items.push({...item, id: items.length + 1});
    await this.updateAll(items);
  }

  async updateAll(data) {
    await fs.writeFile(this.route, JSON.stringify(data), "utf-8");
  }

  async delete(id) {
    const items = await this.getAll();
    const newItems = items.filter((elem) => elem.id != id);
    this.updateAll(newItems);
  }
}

export default FileContainer;
