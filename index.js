import express from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const route = express.Router();
const port = 5000;

app.use("/v1", route);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: "checkstocksize@gmail.com",
    pass: "ithjoanwlzmruqef",
  },
  secure: true,
});

route.post("/sendMail", (req, res) => {
  const { email, product } = req.body;
  const mailData = {
    from: "checkstocksize@gmail.com",
    to: email,
    subject: "Entrada en stock del producto: " + product,
    html:
      "<b>Hola! </b><br> El producto " +
      product +
      " que tienes en seguimiento ha entrado en stock.<br/>",
  };

  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      return console.log(error);
    }
    res.status(200).send({ message: "Mail send", message_id: info.messageId });
  });
});
