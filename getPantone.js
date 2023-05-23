import dotenv from "dotenv";
dotenv.config();

// import { Configuration, OpenAIApi } from "openai";
// import { text, saludo } from "./prompt.js";
// const { OPENAI_API_KEY } = process.env;
// const configuration = new Configuration({
//   apiKey: OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(configuration);
// export const getPantone = async (req, res, next) => {
//   const shape = {
//     attributes: ["data"],
//   };
//   try {
//     const response = await openai.createCompletion({
//       model: "text-davinci-003",
//       prompt: `${text}. Return the response as a JSON object with a shape of ${JSON.stringify(shape)}.`,
//       temperature: 1.2,

//       max_tokens: 2000,
//       presence_penalty: 1,
//       frequency_penalty: 1,
//     });

//     res.send({
//       status: "ok",
//       data: JSON.parse(response.data.choices[0].message.content)
//     });
//   } catch (error) {
//     next(error);
//   }
// };

import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  // organization: process.env.OPENAI_ORGANIZATION,
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function handler(req, res) {
  const prompt =
    "Generate a list of three made-up book titles along with their authors and genres. Provide them in JSON format with the following keys: book_id, title, author, genre.";

  const shape = {
    attributes: ["data"],
  };

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `${prompt}. Return the response as a JSON object with a shape of ${JSON.stringify(
          shape
        )}.`,
      },
    ],
    temperature: 1.2,

    max_tokens: 2000,
    presence_penalty: 1,
    // frequency_penalty: 1,
  });
  const dataResponse = JSON.parse(completion.data.choices[0].message.content);
  res.send({
    status: "ok",
    data: dataResponse.attributes,
  });

  // const data = JSON.parse(completion.data.choices[0].message.content)

  // res.status(200).json({
  //   data
  // })
}
