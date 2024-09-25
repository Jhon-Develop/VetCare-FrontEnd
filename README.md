# VetCare Frontend
### Veterinary Management System

## Table of Contents
- [Description](#description)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Project Scope](#project-scope)
- [Project Model](#project-model)
- [UML Class Diagrams](#uml-class-diagrams)
- [Component Architecture Mode](#component-architecture-mode)
- [Use Cases](#use-cases)
- [User Stories](#user-stories)
- [Functional Requirements](#functional-requirements)
- [Non-Functional Requirements](#non-functional-requirements)
- [URL endpoint documentation](#url-endpoint-documentation)
- [ClickUp project management](#clickup-project-management)

## Description
VetCare is a management system for veterinary clinics, designed to facilitate the administration of appointments, pets and related services. This frontend is designed with react to allow an interactive and pleasant interface.

## Technologies Used
- **Language:** JS, HTML, CSS 
- **Framework:** React, tailwindcss
- **Authentication:** JWT (JSON Web Tokens)
- **ORM:** Entity Framework Core

## Installation
### 1. Clone the repository:
git clone https://github.com/Jhon-Develop/VetCare_FrontEnd.git
cd VetCare_FrontEnd

### 2. Install dependencies:
npm install

### 3. Run the application:
npm start

# VetCare
## Because your pet is a member of your family!

VetCare was created to address the need to prevent pets, especially dogs, from being abandoned on the streets due to the high costs associated with their care. Research shows that 40% of Colombian families have some kind of pet in their home. Additionally, there is a significant number of stray dogs in need of assistance. Recent studies from La Salle University reveal that for every 100 dogs living with a family in Bogotá, Colombia, there are 38 stray dogs. And what about cats or other pets? This number can rapidly increase. But what is the reason behind so many dogs being left on the streets?
For many people, when they realize how expensive it is to care for a pet, they simply decide to abandon them, without considering how painful this can be for the animal. On top of that, many of these stray dogs are not neutered, leading to the overpopulation of street dogs.
VetCare will offer affordable prices for customers, helping Colombian citizens save hundreds of thousands of pesos in pet care costs, while also contributing to the control and improvement of the well-being of abandoned pets, particularly dogs.
VetCare is the solution for Colombian pet owners who feel forced to abandon their pets due to financial constraints, especially given the high costs of pet care in the country. Moreover, VetCare is dedicated to rescuing pets that have been abandoned and providing them with completely free treatment for any health issues they are facing.

## CHOSEN THEME
The chosen theme for this project  can be E-commerce & Health 

## OBJECTIVES
- Affordable Veterinary Care: Provide affordable medical care to pets, helping Colombian pet owners avoid abandonment due to high veterinary costs.
- Pet Rescue and Treatment: Rescue abandoned pets and offer them free medical care to improve their health and quality of life.
- User-Friendly Platform: Develop a user-centric platform that allows pet owners to easily manage their pets' information and schedule veterinary appointments.
- Health & E-Commerce Integration: Combine healthcare services with e-commerce functionality for booking appointments and purchasing related products or services online.
- Increase Awareness: Raise awareness about responsible pet ownership and the importance of neutering to control overpopulation.

## PROJECT SCOPE
VetCare will provide a digital platform for pet owners to manage their pets and schedule appointments with veterinarians. It will also serve as a tool for rescuing and treating stray pets. The scope includes:

- User Profile Management: Registered users can update their personal details, manage pet profiles, and view scheduled appointments.
- Pet Management: Users can add, update, or remove pets from their profile, providing detailed information such as breed, age, and medical history.
- Appointment Booking: Users can book veterinary appointments for their pets by selecting available time slots, providing information on the reason for the appointment, and receiving confirmation.
- Pet Rescue: Integration of a rescue feature to track and provide free treatment to stray pets.


# TEAM MEMBERS

1. **Mariana Perez Serna**
**GitHub:** mkserna
**Email:** mperezserna8@gmail.com
**LinkedIn:** https://www.linkedin.com/in/mariana-p%C3%A9rez-serna-829b4b200/

2. **Juan Diego Zuluaga Ramirez**  
**GitHub:** Jzulu22x  
**Email:** Juanzr1015@gmail.com  
**LinkedIn:** https://www.linkedin.com/in/juan-diego-zuluaga-ramirez-337aa12b3  

3. **Juan Jose Zapata**  
**GitHub:** Z4pata  
**Email:** zapata.devs@gmail.com  
**LinkedIn:** https://www.linkedin.com/in/juan-jose-zapata-fernandez-05b4412b9/  

4. **Jhon Edwin Asprilla Guisao**  
**GitHub:** Jhon-Develop  
**Email:** asprillajhon73@gmail.com  
**LinkedIn:** https://www.linkedin.com/in/jhon-asprilla-511534324/  

5. **Oscar Camilo Calle Gil**  
**GitHub:** OscarCalle0  
**Email:** Oscarcalle0@gmail.com  
**LinkedIn:** https://www.linkedin.com/in/oscar-calle-a19b27157/

6. **Leison Mosquera Mosquera**  
**GitHub:** Mosquera131  
**Email:** leison3131@hotmail.com  
**LinkedIn:** https://www.linkedin.com/in/leison-mosquera-27590b135/

## PROJECT MODEL

### DATABASE  MODEL
**Link:** https://drive.google.com/file/d/1FVyihJIJQxC58OSa47B7AgZC5eXzgC6U/view?usp=sharing

### UML CLASS DIAGRAMS
**Link:** https://drive.google.com/file/d/1aU4QSqbaf3VTS3j3sSFACUsAMotne9Ti/view?usp=sharing

### COMPONENT ARCHITECTURE MODE
**Link:** https://drive.google.com/file/d/1dVlBK4IXvNXKH61qZro8hqgrdx0B5pUY/view?usp=sharing

### USE CASES
**Link:** https://drive.google.com/file/d/1gh7MjKY4NmlL0kfs3aFTFnu93Lk42kNM/view?usp=sharing


## USER STORIES

### User Stories N°-1 : User Profile Management
**Title:** As a registered user, I want to be able to manage my profile to keep my information up to date and manage my pets.
**Description:**
- As a registered user,
- I want to be able to access my profile to update my personal information (name, last name, document type, document number, password, phone number and email),
- And manage the pets I have registered, including the ability to add new pets, update existing information and delete pets I no longer have.
**Acceptance Criteria:**
- User can access their profile from the navigation menu.
- The user can update their personal information and save it.
- User can view a list of their pets in their profile.
- The user can add a new pet to the profile, specifying details such as name, species, breed, age, etc.
- The user can edit the information of an existing pet.
- The user can remove a pet from their profile.
- Changes are reflected in real time and persist after refreshing the page.
**Technical tasks:**
- Create or modify the APIs needed to handle user information update and CRUD (Create, Read, Update, Delete) operations on pets.
- Implement views and components in React for profile and pet management, using Tailwind CSS for styling.
- Connect React forms to the backend in C# to process changes.
- Implement validations in the frontend and backend to make sure data is correct and complete before submitting or saving.


### User Story N° - 2 : Requesting Appointments for Pets
**Title:** As a registered user, I want to be able to request appointments for my pets to receive medical care at the veterinarian.
**Description:**
- As a registered user,
- I want to be able to request an appointment for one of my pets,
- To ensure that he/she receives the necessary medical care at the veterinarian.
**Acceptance Criteria:**
- The user can access the appointment section from the navigation menu.
- The user can select one of their registered pets for the appointment.
- The user can select an available date and time for the appointment.
- The user can provide additional details (reason for appointment, symptoms, etc.) when requesting the appointment.
- The system must confirm the availability of the appointment before finalizing the request.
- The user receives a confirmation of the appointment after the appointment has been requested.
- The user can see a summary of their scheduled appointments.
**Technical tasks:**
- Create or modify APIs needed to manage appointment request and check availability.
- Implement views and components in React for appointment management, including pet selection, dates and times.
- Connect React forms to the backend in C# to process appointment requests.
- Implement a calendar or date picker that displays available options for appointments.
- Implement validations in the frontend and backend to ensure that the requested appointments are valid and available.


## Functional Requirements

### 1. User Profile Management:
   - Registered users must be able to access and update their personal information, such as name, document type and number, password, phone number, and email.
   - Users can manage their registered pets by adding, updating, or deleting pet information.
   - Changes to profile information must be reflected in real-time and persist after the page is refreshed.

### 2. Pet Management:
   - Users can register new pets, providing details such as name, species, breed, and age.
   - Users can edit information for existing pets.
   - Users can remove pets they no longer own.

### 3. Appointment Request for Pets:
   - Registered users must be able to request veterinary appointments for their pets.
   - Users must select a registered pet, choose an available date and time, and provide additional details (reason for the appointment, symptoms, etc.).
   - The system must confirm the availability of the appointment before finalizing the request.
   - A confirmation of the appointment will be sent to the user.
   - Users can view a summary of their scheduled appointments.

### 4. Appointment Availability Control:
   - The system must allow users to view available dates and times for appointments.
   - Availability must be checked before finalizing the user’s appointment request.

 
 
 ## Non-Functional Requirements

### 1. Security:
   - The platform must ensure the protection of users' personal and sensitive data, such as pet information, through encryption and robust authentication.
   - Validations must be implemented on both the frontend and backend to ensure data is correct and complete.

### 2. Performance:
   - System response times must be fast, especially for high-interaction operations like profile updates and appointment requests.
   - Operations must be processed in real-time to provide a smooth user experience.

### 3. Scalability:
   - The system must be able to support an increasing number of registered users and appointment requests without compromising performance.
   - The architecture must allow for the future integration of new features without impacting existing functionality.

### 4. Usability:
   - The interface must be intuitive and easy to use for all types of users.
   - The design must be responsive, ensuring accessibility across mobile devices and desktops.

### 5. Maintainability:
   - The code must be well-documented and follow best development practices to facilitate future updates and system maintenance.

### 6. Availability:
   - The system must be available 24/7, with minimal downtime for scheduled maintenance tasks.


## URL endpoint documentation:
**Link:** https://vetcare-backend.azurewebsites.net/swagger/index.html


## ClickUp project management:
**Link:** https://app.clickup.com/9011199549/v/s/90110908493