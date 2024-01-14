# Bike-booking_admin-panel
ReactJS + NodeJS + Express + MongoDB

To start in development mode use:

/server - npm run dev
/client - npm run start

An admin panel for a company that provides bicycle booking services

The functionality:
- user can add a bicycle with fields (ID, name, type, color, wheel size, price, description)
- added bicycle is displayed on the list of bicycles
- user can change the status of the bicycle (available/busy/unavailable) 
- user can remove a bicycle
- user can check stats on bicycles (number of bicycles, number of available bicycles, number of booked bicycles, average price of a bicycle)
  
SOLUTIONS:

On the backend side created a REST API that allows storing data mentioned above and calculating stats. 
On the frontend side React app that uses this API.

Data validation on frontend side
Components are reactively updated
Used Express to build REST API that satisfies the app functionality
Used MongoDB to store data
