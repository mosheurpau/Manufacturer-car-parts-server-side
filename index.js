const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7s9sc.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const userCollection = client.db("car_parts").collection("user");
    const partsCollection = client.db("car_parts").collection("parts");
    const reviewsCollection = client.db("car_parts").collection("reviews");
    const bookingCollection = client.db("car_parts").collection("booking");

    app.get("/part", async (req, res) => {
      const query = {};
      const cursor = partsCollection.find(query);
      const parts = await cursor.toArray();
      res.send(parts);
    });

    app.post("/part", async (req, res) => {
      const newPart = req.body;
      const result = await partsCollection.insertOne(newPart);
      res.send(result);
    });

    app.get("/part/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const item = await partsCollection.findOne(query);
      res.send(item);
    });

    app.delete("/part/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await partsCollection.deleteOne(query);
      res.send(result);
    });

    // update Quantity
    app.put("/part/:id", async (req, res) => {
      const id = req.params.id;
      const updateQuantity = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          quantity: updateQuantity?.quantity,
        },
      };
      const result = await partsCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    app.get("/review", async (req, res) => {
      const query = {};
      const cursor = reviewsCollection.find(query);
      const reviews = await cursor.toArray();
      res.send(reviews);
    });

    app.post("/review", async (req, res) => {
      const newReview = req.body;
      const result = await reviewsCollection.insertOne(newReview);
      res.send(result);
    });

    app.get("/admin/:email", async (req, res) => {
      const email = req.params.email;
      const users = await userCollection.findOne({ email: email });
      const isAdmin = users?.role === "admin";
      res.send({ admin: isAdmin });
    });

    // app.post("/create-payment-intent", async (req, res) => {
    //   const service = req.body;
    //   const price = service.price;
    //   const amount = price * 100;
    //   const paymentIntent = await stripe.paymentIntents.create({
    //     amount: amount,
    //     currency: "usd",
    //     payment_method_types: ["card"],
    //   });

    //   res.send({ clientSecret: paymentIntent.client_secret });
    // });

    app.post("/booking", async (req, res) => {
      const bookings = req.body;
      const result = await bookingCollection.insertOne(bookings);
      res.send(result);
    });

    app.get("/booking", async (req, res) => {
      const query = {};
      const cursor = bookingCollection.find(query);
      const bookings = await cursor.toArray();
      res.send(bookings);
    });

    app.get("/orders/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await bookingCollection.findOne(query);
      res.send(result);
    });

    app.get("/booking/:email", async (req, res) => {
      const email = req.params.email;
      console.log(email);
      const query = { email: email };
      const cursor = await bookingCollection.find(query);
      const items = await cursor.toArray();
      console.log(items);
      res.send(items);
    });

    app.delete("/booking/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await bookingCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello From Manufacture Car Parts!");
});

app.listen(port, () => {
  console.log(`Car Parts app listening on port ${port}`);
});
