# Nearby-Coworks-Locator
Nearby Coworks Locator helps you to locate nearby coworks platform from your live location within the given radius. It's shows you available coworks with the Meeting Rooms specified with available time and dates.


# Steps To Setup
Before start backend development has to install following:
    Ruby with version  v2.7.1p83 (2020-03-31 revision a0c7c23c9c) [x86_64-linux]
    Rails with  version v5.2.4.4
    PostgreSQL 11.9 (Debian 11.9-0+deb10u1)


1. To Setup the Ruby On Rails In your System with

   +    link to setup ruby on rails with postgresql in your linux system -> https://www.digitalocean.com/community/tutorials/how-to-set-up-ruby-on-rails-with-postgres/.
   +    After successful setup check the ruby and rails version by using the command. ( ruby -v & rails -v
   +    then it will echo ruby 2.7.1p83 and Rails 5.2.4.4 means that you have installed Ruby On Rails successfully. )

2. Create Postgres User and Setup Postgres Database.

    +   Run the command 
        -   (a). $sudo -i -u postgres
        -   (b). CREATE USER vishal WITH PASSWORD 'vishal';
        -   (c). ALTER USER vishal CREATEDB;
        -   (d). ALTER USER vishal WITH SUPERUSER;
        -   (e). CREATE DATABASE app_development;
        -   (f). GRANT ALL PRIVILEGES ON DATABASE animall_development TO vishal;
        -   (e). \q (To exit from the postgres terminal.)

3. Clone the Nearby-Coworks-Locator project :

    +   Open a terminal and go to the folder where you want to create a clone of the project

    +   Run the command 
        -   (a). $git clone https://github.com/Vishal24367/Coworks-Locator.git

        -   (b). $cd backend
        -   (c). $bundle install
        -   (d). $rails db:create && rails db:migrate && rails db:seed (To create the database, To run the db migrations and to seed the mock data into the database.)
        -   (e). $rails s -b 0


4. Open Postman to perform/test the API.

    +   To fetch all the Nearby Coworks call this API.
        -   (a.) API-TYPE -> GET
        -   (b.) END-POINT -> localhost:3000/api/v1/coworks
        -   (c.) PARAMS-REQUIRED
                *   (1.) latitude -> current user live latitude
                *   (2.) longitude -> current user live longitude
                *   (3.) radius -> radius to find coworks with min value 1
                *   (4.) offset -> No. of coworks

    +   To get available meeting rooms of a individual cowork with available date and time slot call this API.
        -   (a.) API-TYPE -> GET
        -   (b.) END-POINT -> localhost:3000/api/v1/meeting_rooms
        -   (c.) PARAMS-REQUIRED
                *   (1.) uniqueKey -> selected cowork uniqueKey.

    +   To book a meeting room call this API.
        -   (a.) API-TYPE -> POST
        -   (b.) END-POINT -> localhost:3000/api/v1/time_slots/book_time_slot
        -   (c.) PARAMS-REQUIRED
                *   (1.) meeting_room_id -> selected meeting room id.
                *   (2.) available_date_id -> selected available date id.
                *   (3.) time_slot_id -> selected time slot id.
    
        
# Made By Vishal24367
