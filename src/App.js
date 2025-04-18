import { useState } from "react";
import axios from "axios";

export default function App() {
  const [userInput, setuserInput] = useState("");
  const [botResponse, setbotResponse] = useState("");

  const handleSend = async () => {
    const options = {
      method: 'POST',
      url: 'https://cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com/v1/chat/completions',
      headers: {
        'x-rapidapi-key': 'cadd832d6amsh8738bb17654f2e2p1e976cjsn367653dcb34f',
        'x-rapidapi-host': 'cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      data: {
        messages: [
          {
            role: 'user',
            content: userInput
          }
        ],
        model: 'gpt-4o',
        max_tokens: 100,
        temperature: 0.9
      }
    };
    
    try {
      const response = await axios.request(options);
      console.log(response.data);
      const text = response?.data?.choices?.[0]?.message?.content;
      setbotResponse(text);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center w-screen h-screen gap-10 bg-gray-900 text-white">
      <div className="text-4xl font-bold pt-8">Querymind</div>

      <input
        className="border border-gray-600 w-1/2 p-3 rounded-md bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder="Enter your query..."
        onChange={(e) => setuserInput(e.target.value)}
      />

      <button
        className="border-none rounded-md bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-semibold transition duration-300"
        onClick={handleSend}
      >
        Submit
      </button>

      <div className="w-1/2 min-h-[100px] p-4 bg-gray-800 rounded-md flex justify-center items-center text-center">
        {botResponse || <span className="text-gray-400">Query response will appear here...</span>}
      </div>
    </div>
  );
}
