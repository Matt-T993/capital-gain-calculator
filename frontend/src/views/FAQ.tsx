import { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { FAQdata } from '../data/data';

interface FAQItem {
  Question: string;
  Text: string[];
}

interface FAQCategory {
  Topic: string;
  QuestionsAndText: FAQItem[];
}

function FAQ() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openAccordion, setOpenAccordion] = useState<string>('');
  const [suggestions, setSuggestions] = useState<
    {
      categoryIndex: number;
      itemIndex: number;
      question: string;
    }[]
  >([]);

  const handleTopicClick = (topic: string) => {
    setSelectedTopic(topic);
    setOpenAccordion('');
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === '') {
      setSuggestions([]);
    } else {
      const suggestedQuestions = FAQdata.flatMap((category: FAQCategory, categoryIndex: number) =>
        category.QuestionsAndText.filter(
          (item: FAQItem) =>
            item.Question.toLowerCase().includes(query.toLowerCase()) ||
            category.Topic.toLowerCase().includes(query.toLowerCase())
        ).map((item: FAQItem) => ({
          categoryIndex,
          itemIndex: category.QuestionsAndText.indexOf(item),
          question: item.Question,
        }))
      ).slice(0, 5);

      setSuggestions(suggestedQuestions);
    }
  };
  const handleSuggestionClick = (categoryIndex: number, itemIndex: number) => {
    const selectedCategory = FAQdata[categoryIndex];
    const selectedQuestion = selectedCategory.QuestionsAndText[itemIndex];
    const accordionIndex = `${categoryIndex}-${itemIndex}`;

    // Set the selected topic, open the selected accordion, and set the search query
    setSelectedTopic(selectedCategory.Topic);
    setOpenAccordion(accordionIndex);
    setSearchQuery(selectedQuestion.Question);

    // Clear suggestions to hide the suggestion dropdown
    setSuggestions([]);

    // Scroll to the selected accordion and text
    const matchedSection = document.getElementById(`faq-item-${accordionIndex}`);
    if (matchedSection) {
      matchedSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleAccordion = (question: string) => {
    if (openAccordion === question) {
      setOpenAccordion('');
    } else {
      setOpenAccordion(question);
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col min-h-screen">
      <div className="container mt-20 mx-auto p-8 lg:flex lg:justify-center flex-grow">
        <header className="fixed top-0 inset-x-0 z-50 flex flex-col sm:flex-row items-center sm:items-start text-white p-4 lg:px-8">
          <h1 className="flex-1 mb-6 sm:mb-0 text-3xl font-bold text-center sm:text-left text-black">
            Capital Gains Calculator
          </h1>
          <nav className="flex items-center space-x-2 justify-center sm:justify-start mb-4 sm:mb-0">
            <Link
              to="/login"
              className="font-bold rounded-lg transition-colors duration-300 hover:underline text-gray-500"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="font-semibold p-1.5 px-4 sm:px-8 bg-purple-500 rounded-lg transition-colors duration-300 hover:bg-purple-600"
            >
              Get Started
            </Link>
          </nav>
        </header>
        <div className="lg:w-1/2 m-10">
          <img src="/CGCLogo.png" alt="CGC Logo" className="mt-10" />
          <h1 className="text-3xl font-semibold mt-8 mb-8 text-center">How can we help?</h1>
          <div className="mb-4 relative">
            <input
              type="text"
              placeholder="Search FAQs"
              value={searchQuery}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            {searchQuery.trim() !== '' && suggestions.length > 0 && (
              <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() =>
                      handleSuggestionClick(suggestion.categoryIndex, suggestion.itemIndex)
                    }
                  >
                    {suggestion.question}
                  </div>
                ))}
              </div>
            )}
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-8">Topics</h2>
          <ul>
            {FAQdata.map((category: FAQCategory, categoryIndex: number) => (
              <li
                key={categoryIndex}
                className={`cursor-pointer ${
                  selectedTopic === category.Topic ? 'text-blue-500 font-bold' : ''
                }`}
                onClick={() => handleTopicClick(category.Topic)}
              >
                {category.Topic}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:w-1/2 m-10 mt-30">
          <div
            className={
              selectedTopic === null ? 'hidden' : 'h-50 overflow-y-auto border border-gray-400 p-2'
            }
            style={{ maxHeight: '500px' }}
          >
            {selectedTopic !== null &&
              FAQdata.find((category) => category.Topic === selectedTopic)?.QuestionsAndText.map(
                (item: FAQItem, itemIndex: number) => (
                  <div key={itemIndex}>
                    <hr />
                    <button
                      type="button"
                      className={`flex items-center justify-between w-full p-5 font-medium text-left ${
                        openAccordion === item.Question
                          ? 'text-gray-500'
                          : 'text-black-600 dark:text-black-500 hover:underline'
                      } border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 mb-6`}
                      onClick={() => toggleAccordion(item.Question)}
                      aria-expanded={openAccordion === item.Question}
                    >
                      <span className="flex items-center">{item.Question}</span>
                      <svg
                        data-accordion-icon
                        className={`w-3 h-3 rotate-${
                          openAccordion === item.Question ? '180' : '0'
                        } shrink-0`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5 5 1 1 5"
                        />
                      </svg>
                    </button>
                    <div
                      className={`${
                        openAccordion === item.Question ? '' : 'hidden'
                      } p-5 border border-b-0 border-gray-200 `}
                    >
                      {item.Text.map((text, textIndex) => (
                        <p key={textIndex} className="mb-2 text-gray-500 dark:text-gray-400">
                          {text}
                        </p>
                      ))}
                    </div>
                  </div>
                )
              )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default FAQ;
