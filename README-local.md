# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



///////////////////////////
1. Install dependencies - Vite , React
2. Configure Tailwind CSS
3. Header - Netflix logo
 --- Routing 
4. Hero Section - Netflix banner - relative with z index 0
5. Login Section - absolute with z index 10
 --- Validation of form
 --- useRef to get the input value
6. Authentication - using Firebase
 -- Create new project in firebase
 -- Install firebase package
 -- Configure firebase
 -- Authentication- Email/pass and github
 -- deploying App to production using firebase
7. Whenever user sign in or sign up , add details to redux store beacuse we need to access user details in other components. Then navigate to browse page.
    ---- Instead of dispatching an action again and again whenever user logged in, We will use the utility by fireBase called onAuthStateChanged to listen to the authentication state of the user. This will be used to dispatch.
    In Body.jsx file, we will use the utility to listen to the authentication state of the user. If the user is logged in, we will dispatch the action to add the user to the store. If the user is logged out, we will dispatch the action to remove the user from the store.
    --- What happened when we used onAuthStateChanged?---

    When using the onAuthStateChanged callback in Firebase Authentication, it is triggered whenever the user's authentication state changes. This can happen in several scenarios:

    Initial Authentication State: When the app starts, onAuthStateChanged is triggered with the current authentication state. If the user is already signed in, the callback will be triggered with the user's authentication data. If the user is not signed in, the callback will be triggered with a null user object.

    User Signs In: When a user successfully signs in, onAuthStateChanged is triggered with the user's authentication data.

    User Signs Out: When a user signs out, onAuthStateChanged is triggered with a null user object.

    User's Authentication State Changes: If the user's authentication state changes while the app is running (e.g., their authentication token expires or is refreshed), onAuthStateChanged will be triggered with the updated authentication data.----------------

    ----> We will use onAuthStateChanged inside the useEffect hook to listen to the authentication state of the user. This will ensure that the user's details are updated in the store whenever their authentication state changes.

    ---> After adding user to the store, we will navigate to the browse page. We will use navigate hook from react-router-dom to navigate to the browse page. 

    --- In Login.jsx, after sign in update the profile to display the name using api from firebase

    -- Fixed the bug-> when we write http://localhost:5173/browse , it was taking me to browse even if I am not logged in. And i was not able to write navigation logic after onAuthStateChanged beacuse it was initially in body.jsx and it was not under the child component of routing provider. I was providing routing in my Body.jsx. So i moved the onAuth StateChanged to the Header.jsx and now it is working fine.
    Now when my onAuthStateChanged will be triggered, it will be triggered in the Header.jsx and i can navigate to the browse page after adding user to the store.

    ---->>>> In useEffect, in header, useEffect is called whenever the component is mounted.(header is loaded).. But header can be loaded multiple times. It will keep on adding the user to the store multiple times. But when my component unmounts, we have to unsubscribe to onAuthStateChange . So we will use the return function in useEffect to unsubscribe to onAuthStateChange. This will prevent the user from being added to the store multiple times. onAuthStateChange also returns the unsubscribe function. So we will use that to unsubscribe to onAuthStateChange. 


8. Registered on tmdb and created app on tmdb to get access token. UsedNowPlaying API and defined the options in contants.jsx. made api call in browse .jsx to get the data from tmdb.
  ---> put this data in store and add new slice


9. in Browse.jsx---
   --- Main Container(top) with movie trailer
   --- With title and Play and more info button overlapping it
   --- But there is not trailer in our api
   --  But there is one more api in tmdb where we have to pass movie id it will give trailer of that
   

10. Made secondary Container
11. Gpt page
 --- Gpt search bar with multilingual support
 --- OpenAi api
 

