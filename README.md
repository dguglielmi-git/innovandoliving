
# InnovandoLiving Front-End - (e-Commerce Website)

This is an eCommerce project for InnovandoLiving business in Argentina. InnovandoLiving is a Furniture seller and Armchair manufacturer pretty famous in Buenos Aires.

# Architecture 
![Architectyre](./assets/architecture.png)

* [NodeJS Backend MercadoPago](https://github.com/dguglielmi-git/innovandoliving-mercadopago) - Backend project for payment processing through the gateway of MercadoPago.
* [Strapi Backend](https://github.com/dguglielmi-git/innovandoliving-backend) - Backend project required for website administration, CRUD of Products, system settings, etc.
## Getting Started 🚀

Have a look at 'Deploy' section to proceed with its deploy.


### Pre-requisites 📋
* [Google Maps API Configured](#) - You need to have available your Google Maps API into your GCP account. The API key is required for configuring this environment variable mentioned in the deploy section.

* [NodeJS Installed](#) - It is required to have installed NodeJS or at least, install it on a system that has NodeJs available.

* [NextJS Configurations](#) - In package.json verify that you find the following attributes inside Scripts section:
"build": "next build",
"export": "next build && next export"

If you don't find the "next.config.js" file inside the project, please create it with the following content:

module.exports = {
    distDir: "build",
};

* [Set the values to the URL environemnt variables](#) - got to .env.local and replace the right URLs for NEXT_PUBLIC_SERVER_ADDRESS and NEXT_PUBLIC_URL_MERCADOPAGO_BACKEND. Do it before deploying it.

## Deploy 📦

If all pre-requisites are successfully fulfilled, run the following commands inside your project's console:
'yarn export'

- Once this command ends its work, we should have a new folder called 'out'. This folder is the compiled version of your project.

Deploy on Netlify:
Drag and drop the 'out' folder inside your Netlify account for deploying this solution. Once you finish with this, you will have online your site.

After deploy it, go to 'Site Settings' -> 'Build & deploy' -> 'Environment' -> 'Environment variables' and set the following variables with your values.
[NEXT_PUBLIC_MAPS_API_KEY] && [NEXT_PUBLIC_STRIPE_TOKEN]

Examples:
NEXT_PUBLIC_MAPS_API_KEY=OUsaSyUFOSHjUdAa44XYzxcCONSXaCgkkdkLuz1
NEXT_PUBLIC_STRIPE_TOKEN=pk_test_51Ix2UOC5rKZURZ3Y6Z6GmYioksibjpEWgJdSRFnws9543f0MSiIUYghdepZ6bBqI23jWE3xKich5u6TSSOI9u47qKi22lQ5e3jh8



## Built with 🛠️


* [NextJS](https://nextjs.org/docs/getting-started) - The React Framework for Production.
* [Strapi](https://strapi.io/resource-center) - Design APIs fast, manage content easily.
* [FontAwesome](https://fontawesome.com/) - Vector icons and social logos on your website.
* [React Bootstrap](https://react-bootstrap.github.io/) - The most popular front-end framework.
* [MaterialUI](https://material-ui.com/) - React components for faster and easier web development.
* [PrimeReact - PrimeFaces](https://www.primefaces.org/primereact/) - The ultimate collection of design-agnostic, flexible and accessible React UI Components.
* [SemanticUI](https://semantic-ui.com/) - Development framework that helps create beautiful, responsive layouts using human-friendly HTML.
* [Jwt-Decode](https://www.npmjs.com/package/jwt-decode) - small browser library that helps decoding JWTs token which are Base64Url encoded.
* [react-country-flag](https://www.npmjs.com/package/react-country-flag) - React component for emoji/svg country flags.
* [react-toastify](https://www.npmjs.com/package/react-toastify) - React-Toastify allows you to add notifications to your app with ease. No more nonsense!
* [react-scrollable-feed](https://www.npmjs.com/package/react-scrollable-feed) - Smart scrolling for chat UIs and feeds.
* [react-player](https://www.npmjs.com/package/react-player) - A React component for playing a variety of URLs, including file paths, YouTube, Facebook, Twitch, SoundCloud, Streamable, Vimeo, Wistia, Mixcloud, DailyMotion and Kaltura.
* [Formik](https://formik.org/) - Formik is the world's most popular open source form library for React and React Native.
* [Yup](https://yarnpkg.com/package/yup) - Dead simple Object schema validation.
* [Internationalization i18n](https://react.i18next.com/) - react-i18next is a powerful internationalization framework for React / React Native which is based on i18next.
* [lodash](https://lodash.com/) - A modern JavaScript utility library delivering modularity, performance & extras.
* [SaSS](https://sass-lang.com/) - Sass is the most mature, stable, and powerful professional grade CSS extension language in the world.



## Version 📌

We used [SemVer](http://semver.org/) for versioning. Check out the whole version list available [tagsRepo](https://github.com/dguglielmi-git/innovandoliving/tags).


## Author ✒️

* **Daniel Guglielmi** - *Design, Architecture, Front-End, Backend, Documentation, Translation* - [dguglielmi-git](https://github.com/dguglielmi-git)


## License 📄

No license required.

## Thanks 🎁

* To the owners of InnovandoLiving for choosing me for this project.


---
⌨️ with ❤️ by [dguglielmi-git](https://github.com/dguglielmi-git) 😊