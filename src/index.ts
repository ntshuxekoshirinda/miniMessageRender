import express from 'express';
import type { Request, Response} from 'express';
import path from 'path';
import type { Message, NewMessageBody } from './types.ts';

const app = express();
const __dirname = path.resolve();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'src/public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views/'));



const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

app.get("/", (req, res) => {
  res.render("index", {
    title: "Mini Messageboard",
    messages:messages });
});

app.get("/new", (req: Request, res: Response) => {
  res.render("form", { title: "New Message" });
});


app.post("/", (req: express.Request<{}, {}, NewMessageBody>, res: express.Response) => {
  const { messageUser, messageText } = req.body;

  messages.push({
    text: messageText,
    user: messageUser,
    added: new Date()
  });

  res.redirect("/");
});

app.get("/message/:id", (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    const message = messages[id];
    if (message) {
        res.render("message", { title: "Message Details", message: message });
    } else {
        res.status(404).send("Message not found");
    }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
}); 
