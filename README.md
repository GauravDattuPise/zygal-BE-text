

1. Login Page - Page 1
Features:
Two input fields for user email and password.
One login button to send a request to the backend.
User credentials are validated against a JSON file.
Successful login redirects to Page 2.
Access to Page 2 is granted only upon successful login.

2. Home Page - Page 2
Features:
Two input fields and four buttons.
Button 1: Submit data from the first input field.
Data is stored in a COOKIE and retrieved even after the user logs in again.
Button 2: Search data from COOKIE using the second input field.
Display searched data in the UI if the string matches stored COOKIE.
Button 3: Clear all COOKIE data.
Button 4: Logout from the account and redirect to the login page (Page 1).
COOKIE data remains intact unless the user clicks on Button 3.