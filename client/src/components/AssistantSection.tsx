import React from 'react';
import ChatAssistant from './ChatAssistant';

export default function AssistantSection() {
  return (
    <section id="assistant-section" className="py-12 md:py-16 px-4 bg-gradient-to-b from-[#0A0E17] to-[#101520]">
      <div className="container mx-auto mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#F5F5F5]">
          AI Integration Consulting
        </h2>
        <p className="text-base md:text-lg max-w-2xl mx-auto text-[#B0BEC5]">
          Our AI specialists can help you integrate custom AI solutions tailored to your business needs.
        </p>
      </div>
      <ChatAssistant />
    </section>
  );
}
