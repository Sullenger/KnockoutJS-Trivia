/**
 * Main View Model bound in our jquery call at the bottom of index.html
 */
function MainViewModel() {
  // Reference to 'this'
  const self = this;
  // Length 10 array of questionsAnswers objects
  self.questionsArray = ko.observableArray(populateQuestions());
  // Username
  self.userName = ko.observable("");
  // All answers submitted flag for rendering the results template
  self.answersSubmitted = ko.observable(false);
  // Current id in the questionsArray
  self.currentId = ko.observable(0);
  // Current template view
  self.currentTemplate = ko.observable("landing-container");
  // Progress through the trivia questions
  self.progress = ko.observable("");
  // Percentage of questions correct
  self.resultsPercent = ko.observable(20);
  // Percentage of progress for Progress bar
  self.percentage = ko.observable(0);
  // Results rank observable
  self.resultsRank = ko.observable("Expert");
  // HELPER FUNCTIONS

  // Handler for when the user selects an answer
  self.onRadioChange = function(data, event) {
    const selectedIndex = event.target.value;
    self.questionsArray()[self.currentId()].setAnswer(selectedIndex);
  };

  // Username setter
  self.submitUsername = function() {
    let inputName = $("#userName").val();
    if (!inputName || inputName === "") {
      inputName = "Player 1";
    }
    self.userName(inputName);
    self.currentTemplate("qa-container");
    self.updatePercentage();
  };

  // Click handler for previous button
  self.navigatePrevious = function() {
    const id = parseInt(self.currentId());
    if (id > 0) {
      self.currentId(id - 1);
      self.updatePercentage();
    }
  };

  // Click handler for next button
  self.navigateNext = function() {
    const id = parseInt(self.currentId());
    if (id < self.questionsArray().length - 1) {
      self.currentId(id + 1);
      self.updatePercentage();
    }
  };

  // Click handler for grading submission
  self.submitAll = function() {
    self.currentTemplate("results-container");
    self.answersSubmitted(true);
  };

  // Click handler for restart button
  self.restartGame = function() {
    self.questionsArray(populateQuestions());
    self.userName("");
    self.answersSubmitted(false);
    self.currentId(0);
    self.currentTemplate("landing-container");
    self.progress("");
    self.resultsPercent(0);
    self.percentage(0);
  };

  // Updates percentage for progress bar.
  // called by submitUsername, navigatePrevious, and navigateNext
  self.updatePercentage = function() {
    const id = parseInt(self.currentId());
    self.percentage((id + 1) * 10 + "%");
  };
}

/**
 * Helper function, calls on the files in /js folder to get the original 20
 * question array, and build an array of random questionsAnswers objects pulled
 * from that array.
 */
function populateQuestions() {
  const twentyQuestionsArray = getAllQuestionsAndAnswers();
  return buildQuestions(twentyQuestionsArray, 10);
}
