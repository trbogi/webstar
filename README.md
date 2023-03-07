# Webstar

## Table of contents

- [The project](#the-project)
- [Challanges](#challanges)
- [Prerequisites](#prerequisites)
- [Run project locally](#run-project-locally)
- [Built with](#built-with)
- [Links](#links)
- [Author](#author)


## The project

This a homework project for Webstar Csoport Kft. In this mini web application we can browse between Star Wars characters.

Features:
- Authentication
- Get Star Wars characters though REST API and display them
- CRUD operations (started but haven't finished yet)

## Challanges

Authentication: Before I started working on this project I researched the topic thoroughly, because I wasn't really familiar with JWT authentication. After some coding and searching I realized that the token we got from the backend doesn't contain any real, useful information (information about user, expiration time...). That was the reason I decided to make a simplified authentication. This means that the user is considered authenticated and logged in till they have the token (stored in local storage), that is until they log out.

Design: This was the first project when I used Sass. I tried my best but I know it has a lot more features I haven't even used. 
It gave me some hard time but it was a really exciting experience to work on a project where there are graphics and design plans in advance.

## Prerequisites
To run this project locally you need the following installed on your computer:
- Node.js
- The Angular CLI

## Run project locally
1. Download or clone the repository to your local machine:

    $ git clone https://github.com/trbogi/webstar.git


2. Run npm install inside the downloaded/cloned folder:

    $ npm install

3. Run ng serve inside the downloaded/cloned folder:

    $ ng serve

## Built with

- [Angular](https://angular.io/)
- [Sass](https://sass-lang.com/)

## Links

- GitHub repo: [https://github.com/trbogi/webstar](https://github.com/trbogi/webstar)

## Author

- GitHub - [trbogi](https://github.com/trbogi)
- LinkedIn - [Trencsényi Boglárka](https://www.linkedin.com/in/bogl%C3%A1rka-trencs%C3%A9nyi-16649720b/)
- E-mail - trencsenyi.bogi@gmail.com
