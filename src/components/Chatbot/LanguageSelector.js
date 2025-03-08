const LanguageSelector = (props) => {
    const handleLanguageChange = (language) => {
      // Update the chatbot's state with the selected language
      props.setState((prevState) => ({
        ...prevState,
        language: language,
      }));
  
      // Send a confirmation message
      props.actionProvider.addMessageToState("Language set to: " + language);
    };
  
    return (
      <div>
        <button onClick={() => handleLanguageChange("en")}>English</button>
        <button onClick={() => handleLanguageChange("es")}>Español</button>
        <button onClick={() => handleLanguageChange("fr")}>Français</button>
        <button onClick={() => handleLanguageChange("de")}>Deutsch</button>
        <button onClick={() => handleLanguageChange("ta")}>தமிழ் (Tamil)</button>
        {/* Add more languages as needed */}
      </div>
    );
  };
  