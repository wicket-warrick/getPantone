import dotenv from "dotenv";
dotenv.config();
import { generateError } from "./generateError.js";

//* CONFIGURAION AI

import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

//* CREATE FUNCTION

export const getPantone = async (req, res, next) => {
  const prompt =
  "Genera un pantone de colores, a partir del color principal #baba13.Dicho pantone será usado para una página web sobre arte floral, que comercializa sus productos. El pantone debe transmitir las siguientes sensaciones:inegridad,estabilidad,confianza,energía,felicidad,brillo,creatividad,amistad,lujo,nobleza,magia,sabiduria,armonñia,vida,fiabilidad,salud,sofisticacion,Los colores irán relacionados con cada uno de los siguientes elementos de la página web:1.Texto principal 2.Texto secundario 3.marcos,lineas,bordes 4.fondos de texto eimagen 5.botones. 6.color iconos.Se incluirá una muestra de cada color seleccionado.la respuesta será un archivo JSOn con la siguiente,en donde cada color contará con las sigguientes propiedades:hexColor,name,application,muestraWeb";

// FETCH API

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `${prompt}.`,
        },
      ],
      temperature: 1.2,

      max_tokens: 2000,
      presence_penalty: 1,
    });

// GENERATE AND SEND DATA

    const dataResponse = JSON.parse(completion.data.choices[0].message.content);
    res.send({
      status: "ok",
      data: dataResponse,
    });
  } catch (error) {
    next(generateError(error.message, error.httpStatus));
  }
};
