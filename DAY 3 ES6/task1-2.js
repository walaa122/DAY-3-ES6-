// Task 1
const Product = {
  ID: 1,
  product_Name: 'Phones',
  Price: 100.0,
  available: true,
  Expired: false,
  productDetails: new Proxy({}, {
    get: function (target, prop) {
      if (prop === 'details') {
        if (Product.available === true) {
          return `${Product.product_Name} price is ${Product.Price.toFixed(2) + '$'} and it is available`;
        } else {
          return `${Product.product_Name} price is ${Product.Price.toFixed(2)} and it is not available`;
        }
      }
    },
    set: function (target, prop, value) {
      if (prop === 'available' && value === true && Product.Expired === true) {
        throw new Error('This product was expired.');
      }
      Product[prop] = value;
      return true;
    }
  })
};

console.log(Product.productDetails.details);
Product.Expired = true;
Product.available = true;

//Task 2
fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(users => {
    const usersDiv = document.getElementById('users');

    users.forEach(user => {
      const nameHeader = document.createElement('h1');
      nameHeader.textContent = user.username;
      usersDiv.appendChild(nameHeader);

      const userInfoList = document.createElement('ul');
      const emailItem = document.createElement('li');
      emailItem.textContent = `Email: ${user.email}`;
      userInfoList.appendChild(emailItem);

      const phoneItem = document.createElement('li');
      phoneItem.textContent = `Phone: ${user.phone}`;
      userInfoList.appendChild(phoneItem);

      const companyItem = document.createElement('li');
      companyItem.textContent = `Company: ${user.company.name}`;
      userInfoList.appendChild(companyItem);

      usersDiv.appendChild(userInfoList);
    });
  })
  .catch(error => console.error(error));



