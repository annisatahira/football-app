class List {
  constructor(selector, item, data) {
    this.selector = selector;
    this.listElement = item;
    this.data = data;
  }

  render() {
    this.data.forEach(item => {
      const dataELement = document.createElement(this.listElement);
      dataELement.item = item;
      this.selector.appendChild(dataELement);
    });
  }
}

export default List;
