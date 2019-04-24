# Cycle Source
by Sivan Adler


My final, solo project created during my time at the [Flatiron School](https://flatironschool.com/)

[![Cycle Source Video Demo](https://img.youtube.com/vi/VolgRFBhA1A/0.jpg)](https://www.youtube.com/watch?v=VolgRFBhA1A)

## TECHNOLOGIES
- React
- Redux
- Ruby on Rails
- Amazon Web Services (AWS)
- Twilio
- Google Maps API
- React-Big-Calendar
- Google-Maps-React
- Custom CSS

## DESCRIPTION
Cycle Source is a web application that is designed to allow users to find and book spin classes near them. Cycle Source was built using a React/Redux front end and a Ruby on Rails back end. I used Amazon Web Services (AWS) to host my images and configured Twilio to send a confirmation text message notification to the user with the details of the specific class they just booked. Users have different authorizations based on whether they login as a rider or an instructor. As a rider, users are able to search for spin studios in their area, review a studio and/or an instructor, and book a spin class (choosing the specific bike they would like to use). As an instructor, users can see a list of all of their classes and the names of each rider that is currently signed up. Instructors cannot reserve spin classes or review studios/other instructors, but they can search and view that data.

## INSTALL
1. Clone down this repository to your local machine. 
2. Clone down the [backend repository](https://github.com/sivanadler/cycle-source-backend) to your local machine.
3. Run ```bundle install``` in your terminal after cloning down the backend repository. 
4. Before launching the app, you'll need to launch our database. In your terminal for the backend repository, run ```rails db:create```, ```rails db:migrate```, and ```rails db:seed```.
5. Run ```rails s``` in that same terminal session to launch our server.
6. Once your server is running, run ```npm install``` in your terminal for the front-end cloned repository.
7. Once you have installed the npm packages installed and you've started your rails server, run ``` npm start ``` in your terminal for the front-end repository. You will be prompted to start your server on another port (since your backend is already running). Type ```y``` to continue.


## CONTRIBUTORS GUIDE
1. Fork and clone this repository.
2. Fork and clone the [backend repository](https://github.com/sivanadler/cycle-source-backend) .
3. Create your feature branch ```git checkout -b my-new-feature```.
4. Commit your changes ```git commit -m 'Add some feature'```.
5. Push to the branch ```git push origin my-new-feature```.
6. Create a new Pull Request.
