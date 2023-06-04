const inquirer = require("inquirer");
const fs = require("fs");

const questions = [
  {
    name: "title",
    type: "input",
    message: "What is the title of your project?",
  },
  {
    name: "description",
    type: "input",
    message: "What is the description of your project?",
  },
  {
    name: "installation",
    type: "input",
    message: "What are the installation instructions for your project?",
  },
  {
    name: "usage",
    type: "input",
    message: "What are the usage instructions for your project?",
  },
  {
    name: "license",
    type: "list",
    message: "Choose a license for your project:",
    choices: ["MIT", "Apache 2.0", "GPL 3.0", "BSD 3-Clause", "None"],
  },
  {
    name: "contributing",
    type: "input",
    message: "What are the contribution guidelines for your project?",
  },
  {
    name: "tests",
    type: "input",
    message: "What are the test instructions for your project?",
  },
  {
    name: "questions",
    type: "confirm",
    message: "Do you want to add a questions section to your README?",
  },
  {
    name: "username",
    type: "input",
    message: "What is your GitHub username?",
    when: (answers) => answers.questions,
  },
  {
    name: "email",
    type: "input",
    message: "What is your email address?",
    when: (answers) => answers.questions,
  },
];

const generateTableOfContents = (answers) => {
  let tableOfContents = `## Table of Contents\n\n`;
  if (answers.installation) {
    tableOfContents += `- [Installation](#installation)\n`;
  }
  if (answers.usage) {
    tableOfContents += `- [Usage](#usage)\n`;
  }
  if (answers.license) {
    tableOfContents += `- [License](#license)\n`;
  }
  if (answers.contributing) {
    tableOfContents += `- [Contributing](#contributing)\n`;
  }
  if (answers.tests) {
    tableOfContents += `- [Tests](#tests)\n`;
  }
  if (answers.questions) {
    tableOfContents += `- [Questions](#questions)\n`;
  }
  return tableOfContents;
};

const generateLicenseBadge = (license) => {
  let badgeURL = "";
  let color = "blue";
  if (license === "None") {
    badgeURL = "https://img.shields.io/badge/License-None-red.svg";
    color = "red";
  } else {
    badgeURL = `https://img.shields.io/badge/License-${license}-${color}.svg`;
  }
  return `![License: ${license}](${badgeURL})\n`;
};

const generateGitHubLink = (username) => {
  return `[${username}](https://github.com/${username})\n`;
};

const writeREADME = (answers) => {
  
let readmeContent = `# ${answers.title}\n\n`;

if (answers.license) {
readmeContent += generateLicenseBadge(answers.license);
}

readmeContent += `${answers.description}\n\n`;
readmeContent += generateTableOfContents(answers);

if (answers.installation) {
readmeContent += `## Installation\n\n${answers.installation}\n\n`;
}
if (answers.usage) {
readmeContent += `## Usage\n\n${answers.usage}\n\n`;
}
if (answers.license) {
readmeContent += `## License\n\nThis project is licensed under the ${answers.license} license.\n\n`;
}
if (answers.contributing) {
readmeContent += `## Contributing\n\n${answers.contributing}\n\n`;
}
if (answers.tests) {
readmeContent += `## Tests\n\n${answers.tests}\n\n`;
}
if (answers.questions) {
readmeContent += `## Questions\n\nIf you have any questions, please contact me at ${
 answers.email
} or visit my GitHub profile at ${generateGitHubLink(answers.username)}`;
}

fs.writeFileSync("README.md", readmeContent);
};

inquirer.prompt(questions).then(writeREADME);