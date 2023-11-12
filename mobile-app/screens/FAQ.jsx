import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  setSkill,
} from "react-native";
import { FAQdata } from "../data/data";


const FAQ = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [openAccordion, setOpenAccordion] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
    setOpenAccordion("");
  };

  const handleInputChange = (text) => {
    setSearchQuery(text);

    if (text.trim() === "") {
      setSuggestions([]);
    } else {
      const suggestedQuestions = FAQdata.flatMap((category, categoryIndex) =>
        category.QuestionsAndText.filter(
          (item) =>
            item.Question.toLowerCase().includes(text.toLowerCase()) ||
            category.Topic.toLowerCase().includes(text.toLowerCase())
        ).map((item) => ({
          categoryIndex,
          itemIndex: category.QuestionsAndText.indexOf(item),
          question: item.Question,
        }))
      ).slice(0, 5);

      setSuggestions(suggestedQuestions);
    }
  };

  const handleSuggestionClick = (categoryIndex, itemIndex) => {
    const selectedCategory = FAQdata[categoryIndex];
    const selectedQuestion = selectedCategory.QuestionsAndText[itemIndex];
    const accordionIndex = `${categoryIndex}-${itemIndex}`;

    setSelectedTopic(selectedCategory.Topic);
    setOpenAccordion(accordionIndex);
    setSearchQuery(selectedQuestion.Question);

    setSuggestions([]);
  };

  const toggleAccordion = (question) => {
    if (openAccordion === question) {
      setOpenAccordion("");
    } else {
      setOpenAccordion(question);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            textAlign: "center",
            color: "black",
          }}
        >
          FAQ
        </Text>
      </View>
      <ScrollView>
        <View style={{ margin: 10 }}>
          <Image
            source={require("../assets/CGCLogo.png")}
            style={{
              marginTop: 10,
            }}
          />
          <View
            style={{
              marginBottom: 10,
            }}
          >
            <TextInput
              placeholder="Search FAQs"
              value={searchQuery}
              onChangeText={(text) => handleInputChange(text)}
              style={{
                width: "100%",
                padding: 8,
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 8,
              }}
            />
            {searchQuery.trim() !== "" && suggestions.length > 0 && (
              <View
                style={{
                  position: "absolute",
                  marginTop: 40,
                  backgroundColor: "white",
                  borderWidth: 1,
                  borderColor: "gray",
                  borderRadius: 8,
                  shadowColor: "gray",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 1,
                  shadowRadius: 3,
                }}
              >
                {suggestions.map((suggestion, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      backgroundColor: "white",
                    }}
                    onPress={() =>
                      handleSuggestionClick(
                        suggestion.categoryIndex,
                        suggestion.itemIndex
                      )
                    }
                  >
                    <Text>{suggestion.question}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginTop: 50,
              marginBottom: 8,
              zIndex: 100,
            }}
          >
            Topics
          </Text>
          {FAQdata.map((category, categoryIndex) => (
            <TouchableOpacity
              key={categoryIndex}
              style={{
                borderWidth: 1,
                borderRadius: 8,
                borderColor:
                  selectedTopic === category.Topic
                    ? "lightblue"
                    : "transparent",
                backgroundColor:
                  selectedTopic === category.Topic ? "lightblue" : null,
                padding: 10,
              }}
              onPress={() => handleTopicClick(category.Topic)}
            >
              <Text
                style={{
                  color: selectedTopic === category.Topic ? "blue" : "black",
                }}
              >
                {category.Topic}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ margin: 10, marginTop: 30 }}>
          <ScrollView style={{ maxHeight: 500 }}>
            {selectedTopic !== null &&
              FAQdata.find(
                (category) => category.Topic === selectedTopic
              )?.QuestionsAndText.map((item, itemIndex) => (
                <View key={itemIndex}>
                  <View
                    style={{
                      borderWidth: 0.5,
                      borderColor: "gray",
                      borderRadius: 8,
                      margin: 0.5,
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        padding: 10,
                      }}
                      onPress={() => toggleAccordion(item.Question)}
                    >
                      <Text style={{ flex: 1 }}>{item.Question}</Text>
                      <View>
                        <Text>▼</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  {openAccordion === item.Question && (
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: "gray",
                        borderBottomLeftRadius: 8,
                        borderBottomRightRadius: 8,
                        padding: 10,
                      }}
                    >
                      {item.Text.map((text, textIndex) => (
                        <Text
                          key={textIndex}
                          style={{ marginBottom: 8, color: "gray" }}
                        >
                          {text}
                        </Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default FAQ;
