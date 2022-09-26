## Restaurant Reservation System


## Try the app for yourself

https://restaur-reserv-front-lg.herokuapp.com/dashboard

## Installation

1. Fork and clone this repository.
1. Run `cp ./back-end/.env.sample ./back-end/.env`.
1. Update the `./back-end/.env` file with the connection URL's to your ElephantSQL database instance.
1. Run `cp ./front-end/.env.sample ./front-end/.env`.
1. You should not need to make changes to the `./front-end/.env` file unless you want to connect to a backend at a location other than `http://localhost:5001`.
1. Run `npm install` to install project dependencies.
1. Run `npm run start:dev` to start your server in development mode.

If you have trouble getting the server to run, message me via LinkedIn https://www.linkedin.com/in/lev-j-gordon/

## Technologies used

- React.js accompanied with CSS and Bootstrap for front-end and styling 
- Node.js, Express, ElephantSQL, PostgreSQL and DBeaver for the back-end
- Deployed with Heroku

## SUMMARY AND SCREENSHOTS

This application was built with the follwoing purpose in mind: to increase the feasibility of managing multiple reservations as a restaurant owner or staff.
Without a digital system, keeping track of occupied/free tables AND their respective times for occupation is difficult to manage with a pen and paper and pretty much impossible within one's head alone. The more guests - the harder it is to maintain. Thus, a convenient digital solution is optimal. 

When reffering to the word "user", I actually mean the owner or staff.

let user = "owner" || "staff"        // :D


1. CREATE RESERVATION 

The user is able to create (add to the database) a reservation, based on information given by the guests. The user can create a reservation by nagivating to ('/reservations/new') , filling out the form and pressing submit, or pressing "New Reservation" in the top right corner of the dashboard ('/dashboard'). The new reservation will be stored and displayed on the dashboard, allowing the user to do certain actions with the reservation desribed below.

![new res](https://user-images.githubusercontent.com/104604753/192392303-a7c57518-0727-4b4b-b5b2-13cef5b415bf.png)

2. VIEW RESERVATIONS 

The user can view all existing reservations by navigating to the dashboard ('/dashboard') and utilizing the "previous" "next" and "today" buttons. Respectively, they will show you all the reservations on the previous day, next day and today. 

![dashboard](https://user-images.githubusercontent.com/104604753/192392267-e5ef577b-dcb3-4b9f-8fa3-a1d21f6afbcf.png)

3. EDIT RESERVATION

The user is able to edit and modify an already existing reservation. The user can edit a reservation by navigating to the dashboard ('/dashboard') and clicking the "edit" button on a reservation card, or navigating to ('/reservations/{reservation id}/edit'). 

![edit](https://user-images.githubusercontent.com/104604753/192392294-2dec6b45-6773-4e61-afaa-d583eddbd571.png)

4. DELETE RESERVATION

The user is capable of deleting a reservation. They can do so by navigating to the dashboard ('/dashboard') and then pressing the "cancel" button within a reservation card. A pop-up window will show in order to confirm their decision and avoid accidentals.

5. CREATE TABLE

The user may also create a table by navigating to ('/tables/new') or pressing "new table" in the top right of the dashboard ('/dashboard') screen ('/dashboard') . This will take them to a new page where they can fill out a form to create a new table. 

![new tab](https://user-images.githubusercontent.com/104604753/192392311-27f43f62-85c5-4524-aec8-1aebad18b3a5.png)

6. SEAT GUEST AT TABLE

The user can asign or "seat" guests to a specific table. This can be done by navigating to the dashboard ('/dashboard') and then pressing the "seat" button within a reservation card. The user will be transferred to ('/reservations/{reservation id}/seat') which will allow them to select the desired table. After the guests are seated, the table status will be updated to occupied and the reservation card will still be visible, with a status of "seated". 

![seat](https://user-images.githubusercontent.com/104604753/192392831-e35dbbbf-eab4-4f52-89e5-ab17a6906e9d.png)

7. CLEAR TABLE

The user can clear a table by pressing the "finish" button the table card, on the dashboard ('/dashboard'). After it is cleared - the associated reservation is deleted. 

![finish](https://user-images.githubusercontent.com/104604753/192392837-6f37d0ed-87a4-4618-b10f-898c12d3fc99.png)

8. SEARCH RESERVATIONS BY PHONE NUMBER

The user can search for reservations by the guests phone number by navigating to ('/search') or clicking "search" in the top right on the dashboard ('/dashboard'), the user may enter a phone number which will display all reservations associated with that number.  

![search](https://user-images.githubusercontent.com/104604753/192392322-55bb19e5-4e2b-428e-919f-f340376aec4a.png)







EXPANSION PLANS (post-bootcamp) :
- make the "create table" page show the current state of all tables. In hindsight this should eliminate the possibility of someone forgetting which tables are occupied.
- delete table button on table card
- edit table button on table card
- edit reservation form and new reservation form into one element being called twice with different params.
