# Manufacture Cars Parts

### A "Parts Manufacturer's Website"

For Live Site Link [Click Here](https://manufacturer-car-parts.web.app/).

## Server Side Features:

- CORS, JSONWEBTOKEN, EXPRESS MiddleWares used.
- MongoDB data collections added to store/read/update/delete targeted data.

#### Frameworks / Libraries / Database used in Back-End:

- Nodemon
- CORS
- Dot Env
- STRIPE
- Express
- MongoDb

## Client Side Features:

### Features(User):

- User can log in / Sign up and place order.
- Navigating user to the intended page after successful logging in & replace history.
- User will have a Dashboard route, where he/she will be able to see/update profile information.
- In Dashboard, there are several nested routes like My order/ Add a review.
- User will see his/her order details like payment,status etc in "My Orders".
- User can make Dummy Stripe Payment for unpaid orders.
- If not paid, user can cancel an order.
- User can add a feedback with rating stars in the "Ad a Review" route.
- User's Name will be rendered in Navbar, Once logged in.

### Features(Admin):

- Adding new product to the stock list and Updating Ui Instantly.
- Managing/Deleting Existing products.
- Managing Orders Admin can see all orders.
- Admin can Manage all users and Make any general user to Admin.

### Features(General):

- Logging in with Google.
- Implementation of protected route or private route.
- Reducing Stock qty once, order is placed.
- Notifying success or error messages to the user via hot-toast.
- Environmental variables use both in the client side and the server side.
- If page is not found then show "404 Not Found" route.

#### Frameworks / Libraries used in Front-End:

- Tailwind
- Axios
- STRIPE Payment
- Daisy UI
- UseQuery
- React hook form
- React router
- Firebase
- Firebase Hooks
- Hot toast
- Tailwind Elements
- FontAwesome
