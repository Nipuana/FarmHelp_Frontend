import React, { useState } from "react";
import "../../css/FaqCss/faqPage.css";

const faqs = [
  {
    question: "What is a Payment Gateway?",
    answer: "A payment gateway is an eCommerce service that processes online payments for online as well as offline businesses. Payment gateways help accept payments by transferring key information from their merchant websites to issuing banks, card associations, and online wallet players. Payment gateways play a vital role in the online transaction process, which is the realization of value, and hence are seen as an important pillar of eCommerce.",
  },
  {
    question: "Do I need to pay to Instapay even when there is no transaction going on in my business?",
    answer: "No, Instapay does not charge a fee if no transactions occur in your business.",
  },
  {
    question: "What platforms does Instapay payment gateway support?",
    answer: "Instapay supports multiple platforms including web, mobile applications, and POS systems.",
  },
  {
    question: "Does Instapay provide international payments support?",
    answer: "Yes, Instapay supports international transactions with multiple currency options.",
  },
  {
    question: "Is there any setup fee or annual maintenance fee that I need to pay regularly?",
    answer: "Instapay may have setup fees or annual maintenance fees, depending on the plan you choose.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="faq-container">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-content">
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${index === activeIndex ? "active" : ""}`}
              onClick={() => setActiveIndex(index)}
            >
              <span className="faq-icon">🔵</span>
              <p>{faq.question}</p>
              <span className="faq-arrow">➜</span>
            </div>
          ))}
        </div>
        <div className="faq-detail">
          <h3>{faqs[activeIndex].question}</h3>
          <p>{faqs[activeIndex].answer}</p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
