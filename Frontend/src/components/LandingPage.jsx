// import { button } from "@/components/ui/button";
import { FaRobot, FaComments, FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";
import './LandingPage.css'

export const LandingPage = () => {
  const [visible,setVisible] =useState(false);
  fetch('https://console.dialogflow.com/api-client/demo/embedded/7a0bf838-73b9-40d5-810a-d1e1aa262a2f', { /* ... */ })
  .then(response => response.json())
  .then(data => {
    // 2. Receive bot response
    console.log(data)
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <h1 className="text-4xl font-bold mb-4">Your AI-Powered Assistant</h1>
        {/* <iframe height="430" width="350" src="https://cc0d-2405-201-900f-301e-806c-1320-e4e-4a8d.ngrok-free.app/"></iframe> */}
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Chat with our intelligent assistant for instant solutions and insights.
        </p>
        <button className="mt-6 bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg" onClick={()=>setVisible(true)}>
          Try the Chatbot Now
        </button>
      </section>
      {visible && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          {/* Pop-up content */}
          {/* <div
            style={{
              backgroundColor: "#666666",
              padding: "20px",
              borderRadius: "8px",
              width: "80%",
              maxWidth: "600px",
              position: "relative",
            }}
          > */}
            {/* Close button */}
           {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium sint voluptatum eligendi pariatur! Officia explicabo dolore atque magnam nam omnis veritatis unde commodi debitis, pariatur ratione ut error fugiat saepe!
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus et esse consequatur aspernatur nisi quas mollitia quisquam omnis ducimus tempora. Eaque consequuntur, adipisci ratione molestiae laudantium, numquam ducimus repellat aut rem pariatur quos, officia laborum! Ipsam cupiditate aspernatur asperiores minus quibusdam fuga sapiente voluptas? Consequuntur et omnis error distinctio reiciendis.
           </p> */}
             
            <iframe  style={{ backgroundColor: 'yellow', borderRadius: '5%' ,color:'red'}} width = '350' height="430" allow="microphone;" src="https://console.dialogflow.com/api-client/demo/embedded/7a0bf838-73b9-40d5-810a-d1e1aa262a2f"></iframe>
            
          {/* </div> */}
        </div>
      )}
      {/* Features Section */}
      <section className="py-16 px-8 grid md:grid-cols-3 gap-8 text-center">
        <FeatureCard icon={<FaRobot size={40} />} title="AI-Powered" description="Engage with a smart assistant that learns and adapts." />
        <FeatureCard icon={<FaComments size={40} />} title="Natural Conversations" description="Talk like a human and get responses that make sense." />
        <FeatureCard icon={<FaShieldAlt size={40} />} title="Secure & Reliable" description="Privacy-focused chatbot with end-to-end security." />
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-gray-800">
        <h2 className="text-3xl font-bold text-center mb-6">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <StepCard step="1" title="Ask a Question" description="Type your query and let the chatbot analyze." />
          <StepCard step="2" title="Get Instant Response" description="AI provides accurate and helpful replies instantly." />
          <StepCard step="3" title="Improve & Learn" description="Chatbot adapts and enhances responses over time." />
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-16">
        <h2 className="text-3xl font-bold mb-4">Ready to Experience AI Like Never Before?</h2>
        <button className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg">
          Start Chatting
        </button>
      </section>
      
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} className="p-6 bg-gray-800 rounded-lg shadow-lg">
      <div className="mb-4 text-blue-400">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
}

function StepCard({ step, title, description }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} className="p-6 bg-gray-700 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold text-blue-400">Step {step}</h3>
      <h4 className="text-xl font-semibold mt-2">{title}</h4>
      <p className="text-gray-300 mt-2">{description}</p>
    </motion.div>
  );
}