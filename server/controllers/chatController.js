/* eslint-disable no-console */
/* eslint-disable import/extensions */
import mssgs from '../chat/chat.js';
import { openai } from './recommendationsController.js';

export default async function chat(req, res) {
  const { message } = req.body;
  mssgs.push({ role: 'user', content: message });
  if (mssgs.length > 20) {
    // clear messages and remain with the first one
    mssgs.splice(1, mssgs.length - 1);
  }
  try {
    const result = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: mssgs,
    });
    mssgs.filter((msg) => msg.role === 'user');
    const reply = result.data.choices[0].message.content;
    mssgs.push({ role: 'system', content: reply });
    res.status(200).json({ reply });
  } catch (error) {
    console.log(error);
    mssgs.pop();
    res.status(500).json({ error: 'There\'s been an error on our side, please try again' });
  }
}
