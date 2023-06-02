# InnovandoLiving Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Below you will find the details of the published versions organized by: `[version Number - Release Date]`


---
## v2.0.0-rc - 2023-06-02

### Added
InnovandoLiving's backend has been moved to a Cloud Function architecture, and we've adapted the front-end communication to address delays in response time while the backend is waking up. This improvement ensures a seamless user experience and is part of our ongoing efforts to provide a reliable and high-performance platform for our users.


---
## v1.0.0-rc - 2022-03-15

After thorough testing, we're happy to announce that the beta version has performed well and we haven't identified any issues. We're excited to present the first release candidate, which includes all the features that we committed to delivering. Our team has worked hard to ensure that this release candidate meets the highest standards of quality and functionality, and we're confident that our users will find it intuitive and easy to use. We look forward to receiving feedback from our users and making any necessary improvements to ensure the best possible user experience.

---
## v1.0.0-beta - 2022-03-04

### Added
* Footer: The website features a generic footer section that is shared across all pages. This footer includes links to important sections of the website, such as the homepage, contact page, and frequently asked questions (FAQs) page.
* Continue Shopping Button: A new button has been added to the purchase flow that allows users to continue shopping. This button is available on the cart page and the final payment screen, and it allows users to add more products to their cart without losing the progress they've made in the purchasing process.
---
## v1.2.0-alpha - 2022-02-04

### Added
* Loading Screen: When pages are processing data, a loading screen will appear to notify the user that the system is working on their request.
* Query Functionality: Users can send queries about the product they're interested in from the product view or the processed order page. Once the product is purchased, users can continue sending queries from the order page.
* Query Views: The views for the owner and the client differ depending on the type of user. A client or support icon will be displayed in the chat when they send messages among themselves.
Product Search: Users can search for products using the search bar by typing in relevant keywords. The system will list the products matching the search criteria.
* Wishlist: If users are interested in a product but not ready to purchase, they can save it to their wishlist. When they decide to buy, they can easily access their wishlist, add the selected product to their cart and continue with the purchasing process.
* Language Support: The website is now available in German, French, Italian, Dutch, Portuguese, and Chinese, with seamless translation between the languages.

---
## v1.1.0-alpha - 2021-06-21

### Added
* Cart Confirmation: Before proceeding with the purchase, users will be prompted to confirm the contents of their cart.
* Purchase Progress: Users can view the steps of the purchase process, which helps them keep track of where they are and what's left to do.
* Final Payment Screen: This screen confirms the purchase and provides users with a final opportunity to review their order details before completing the payment process.
* Pending Payments: If the user has not paid the full amount, the order information will display the remaining balance.
* Payment Processing: This version includes a new payment processing functionality, which enables users to securely and efficiently complete their transactions.

---
## v1.0.0-alpha - 2021-06-12
There are missing some features, but the core is working and being tested, which may still cause crashes that will be fixed while it is being used.
The project contains the structure of pages that will be available but still are not all the functionalities available to be used.

### Added
* Account Management: Users can manage their personal information by filling out Full Name, Address, Email, and Password forms. The system also allows them to store multiple addresses to receive their orders.
* Authorization: Access to the website for queries and purchases is restricted to authorized users only.
* Cart: Users can browse the products and add them to their carts. They can review the contents of their carts before confirming the purchase.
* Product List: Users can view the list of available products and use the search functionality to find specific products.
* Order Placement: After confirming the products in their cart, users can place an order and select their preferred shipping and payment options.
* Product Details: Users can view detailed product information, including descriptions, pictures, and prices. They can also add products to their cart directly from this view.
* Language Support: The website is available in both English and Spanish, with seamless translation between the two languages.

