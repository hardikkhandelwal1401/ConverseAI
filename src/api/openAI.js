import {apiKey} from '../constants';
import axios from 'axios';
const client = axios.create({
  headers: {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  },
});

const chatgptUrl = 'https://api.openai.com/v1/chat/completions';
const dalleUrl = 'https://api.openai.com/v1/images/generations';

export const apiCall = async (prompt, messages) => {
  try {
    const res = await client.post(chatgptUrl, {
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `I will give you a prompt and you want to tell me if this message want to generate an AI picture, image, art or anything similar? prompt is : ${prompt} . Simply answer with a yes or no.`,
        },
      ],
    });
    let isArt = res.data?.choices[0]?.message?.content;
    isArt = isArt.trim();
    if (isArt.toLowerCase().includes('yes')) {
      console.log('dalle api call');
      return dalleApiCall(prompt, messages);
    } else {
      console.log('chatgpt api call');
      return chatgptApiCall(prompt, messages);
    }
  } catch (err) {
    console.log('error: ', err);
    // throw err;
    return Promise.resolve({success: false, msg: err.message});
  }
};

const chatgptApiCall = async (prompt, messages) => {
  try {
    const res = await client.post(chatgptUrl, {
      model: 'gpt-3.5-turbo',
      messages,
    });

    let answer = res.data?.choices[0]?.message?.content;
    messages.push({role: 'assistant', content: answer.trim()});
    console.log('chat response', answer);
    // return {success: true, data: messages};
    return Promise.resolve({success: true, data: messages});
  } catch (err) {
    console.log('error: ', err);
    // throw err;
    return Promise.resolve({success: false, msg: err.message});
  }
};

const dalleApiCall = async (prompt, messages) => {
  try {
    const res = await client.post(dalleUrl, {
      prompt,
      n: 1,
      size: '512x512',
    });

    let url = res?.data?.data[0]?.url;
    console.log('image url: ', url);
    messages.push({role: 'assistant', content: url});
    // return {success: true, data: messages};
    return Promise.resolve({success: true, data: messages});
  } catch (err) {
    console.log('error: ', err);
    // throw err;
    return Promise.resolve({success: false, msg: err.message});
  }
};

// import {apiKey} from '../constants';
// import axios from 'axios';
// const client = axios.create({
//   headers: {
//     Authorization: `Bearer ${apiKey}`,
//     'Content-Type': 'application/json',
//   },
// });

// const chatgptUrl = 'https://api.openai.com/v1/chat/completions';
// const dalleUrl = 'https://api.openai.com/v1/images/generations';

// export const apiCall = async (prompt, messages) => {
//   try {
//     const res = await axios.post(
//       chatgptUrl,
//       {
//         model: 'gpt-3.5-turbo',
//         messages: [
//           {
//             role: 'user',
//             content: `Does this message want to generate an AI picture, image, art or anything similar? ${prompt} . Simply answer with a yes or no.`,
//           },
//         ],
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${apiKey}`,
//         },
//       },
//     );
//     console.log(res.data);
//     if (res.status === 200) {
//       let isArt = res.data.choices[0].message.content;
//       isArt = isArt.trim();
//       if (isArt.toLowerCase().includes('yes')) {
//         console.log('dalle api call');
//         return await dalleApiCall(prompt, messages);
//       } else {
//         console.log('chatgpt api call');
//         return await chatgptApiCall(prompt, messages);
//       }
//     }
//     return 'An internal error occurred';
//   } catch (err) {
//     console.log('error: ', err);
//     throw err;
//     // return Promise.resolve({success: false, msg: err.message});
//   }

//   // prompt = prompt.toLowerCase();
//   // let isArt = prompt.includes('image') || prompt.includes('sketch') || prompt.includes('art') || prompt.includes('picture') || prompt.includes('drawing');
//   // if(isArt){
//   //     console.log('dalle api call');
//   //     return dalleApiCall(prompt, messages)
//   // }else{
//   //     console.log('chatgpt api call')
//   //     return chatgptApiCall(prompt, messages);
//   // }
// };

// const chatgptApiCall = async (prompt, messages) => {
//   try {
//     const res = await axios.post(
//       chatgptUrl,
//       {
//         model: 'gpt-3.5-turbo',
//         messages: [
//           {
//             role: 'user',
//             content: prompt,
//           },
//         ],
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${openAIAPIKey}`,
//         },
//       },
//     );

//     let answer = res.data.choices[0]?.message?.content;
//     messages.push({role: 'assistant', content: answer.trim()});
//     return JSON.stringify({success: true, data: this.messages});
//     // console.log('chat response', answer);
//     // return {success: true, data: messages};
//     // return Promise.resolve({success: true, data: messages});
//   } catch (err) {
//     console.log('error: ', err);
//     throw err;
//     // return Promise.resolve({success: false, msg: err.message});
//   }
// };

// const dalleApiCall = async (prompt, messages) => {
//   try {
//     const res = await axios.post(
//       dalleUrl,
//       {
//         prompt,
//         n: 1,
//         size: '512x512',
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${openAIAPIKey}`,
//         },
//       },
//     );

//     let url = res.data.data[0]?.url;
//     // console.log('image url: ',url);
//     messages.push({role: 'assistant', content: url});
//     return JSON.stringify({success: true, data: this.messages});
//     // return {success: true, data: messages};
//     // return Promise.resolve({success: true, data: messages});
//   } catch (err) {
//     console.log('error: ', err);
//     throw err;
//     // return Promise.resolve({success: false, msg: err.message});
//   }
// };
