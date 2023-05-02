# Shopping-cart 


## Link to this website
This website is hosted using netlify and the link is mentioned below:
https://yourshoppingstore.netlify.app

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## About the project

This is a single-page web application using AngularJS  that allows
users to view and manage products in cart. The application allows users to edit, delete,
and add products to their cart. The application  also includes a persistent login and
registration page, and persists the product list and user data in the browser's storage.

## Working of the project

### Authenticaion
This project has an authentication page where user can either Login or Signup.
The authentication is done using Firebase & only after a successful authenticaion the user can enter in the home page of the application.
The project uses autoLogin features that enables user to automatically login in case the website is refreshed.
Also it provides autoLogout features that makes user to automatically logout after some specified amount of time.
When a user does login or signup the Firebase sends some data like email, token and tokenExpirationTime.
#### AutoLogin
The data sent by Firebase is stored inside the localStorage of the browser so that it can't be deleted during a refresh and that data is used to autoLogin the user after a refresh.
#### AutoLogout
The Firebase also sends the tokenExpirationTime, after this time the token becomes invalid and the user is autoLogged out of the applicaion.
However user can perform a self logout by clicking on the logout button

#### Data storage
The data is stored inside the JSON file (data.JSON) inside the assets folder.

### Home
After a successful authenticaion, the user enters in the home page.
At first, the data is fetched from the data.JSON file present inside the assets folder.
Inside the home page, the user can perform the following actions
1.Add items to cart.

2.update the item's quantity.

3.Remove the item from the cart.

4.Checkout the items in the cart

5.And can finally logout of the application

#### CheckOut
CheckOut is a dynamic component.
It is enabled after the user clicks the checkOut button in home page.
It is backdrop that hides rest of the page.
The checkOut component display the Price details (number of items and its price, discount, delivery charges and total amount).
The user can click the close button inside the checkouk backdrop to close the component.

### Logout
Finally, user can logout and the item added to the cart along with its price details is stored inside the local storage of the browser.
After logout, the user authentication data(token, tokenExpirationTime etc.) is removed from the local storage and the user needs to authenticate again for enterting inside the home page.





## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
