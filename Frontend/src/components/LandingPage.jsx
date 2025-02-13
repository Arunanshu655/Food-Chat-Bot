// import { button } from "@/components/ui/button";
import { FaRobot, FaComments, FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion";

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <h1 className="text-4xl font-bold mb-4">Your AI-Powered Assistant</h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Chat with our intelligent assistant for instant solutions and insights.
        </p>
        <button className="mt-6 bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg">
          Try the Chatbot Now
        </button>
      </section>

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