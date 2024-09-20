/*
Treehouse Techdegree: Peace Murerwa
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

//console.log(data);

//Global variable to define how many items(students) to display per page
//It will be access in two different functions
const studentsPerPage = 9; 

/* 
Create the `showPage` function
* @param {number} list - the array of student data we are working with
* @param {number} page - the page number that we want to display.
* @return {number} - this function will create and insert/append the elements needed to display a "page" of nine students
*/
// Function to show a specific page of students
function showPage(list, page) {
  const startIndex = page * studentsPerPage - studentsPerPage; // Calculate the start index
  const endIndex = page * studentsPerPage; // Calculate the end index

  const studentList = document.querySelector(".student-list"); // Select the student-list element
  studentList.innerHTML = ""; // Clear the current contents of the student-list

  // Loop over the list of students
  for (let i = 0; i < list.length; i++) {
    // Check if the current index is within the range for the current page
    if (i >= startIndex && i < endIndex) {
      // Create the HTML structure for the student
      const studentHTML = `
         <li class="student-item">
            <div class="student-details">
               <img class="student-image" src="${list[i].picture.large}" alt="Profile Picture">
                  <h3 class="student-name">${list[i].name.title} ${list[i].name.first} ${list[i].name.last}</h3>
                  <p class="student-email">${list[i].email}</p>
                  <p class="student-registered">Registered: ${list[i].registered.date}</p>
            </div>
         </li>
      `;
      // Insert the student HTML into the student-list
      studentList.insertAdjacentHTML("beforeend", studentHTML);
    }
  }
}



/*
Create the `addPagination` function
* @param {number} list - the array of student  objects
* @return {number} - this function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
  const numberOfPages = Math.ceil(list.length / studentsPerPage); // Calculate number of pages

  // Select the link-list element
  const linkList = document.querySelector(".link-list");
  linkList.innerHTML = ""; // Clear the current contents of the link-list

  // Loop over the number of pages
  for (let i = 1; i <= numberOfPages; i++) {
    // Create a button for each page
    const buttonHTML = `
      <li>
         <button type="button">${i}</button>
      </li>
   `;
    // Insert the button HTML into the link-list
    linkList.insertAdjacentHTML("beforeend", buttonHTML);
  }

   // Select the first pagination button and give it a class name of active
  const firstButton = linkList.querySelector("button");
  if (firstButton) {
    firstButton.classList.add("active");
  }

  // Add event listener to link-list
  linkList.addEventListener("click", (event) => {
    // Check if a button was clicked
    if (event.target.tagName === "BUTTON") {
      const buttons = linkList.querySelectorAll("button"); // Remove active class from other buttons
      buttons.forEach((button) => button.classList.remove("active"));
      event.target.classList.add("active"); // Add active class to the clicked button
      showPage(list, parseInt(event.target.textContent)); // Call the showPage function with the list and the page number
    }
  });
}


// Exceeds Expectations part!
/*
Create the `addSearchComponent`function
* @return {number} - this function adds a search component
*/
function addSearchComponent() {
  const header = document.querySelector("header");
  const searchHTML = `
      <label for="search" class="student-search">
         <span>Search by name</span>
         <input id="search" placeholder="Search by name...">
         <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label>
   `;
  header.insertAdjacentHTML("beforeend", searchHTML);
}

/*
Create the `searchStudents` function
* @param {number} list - the array of student  objects
* @return {number} - this function will handle search functionality
*/
function searchStudents(list) {
  const searchInput = document.getElementById("search");

  // Event listener for real-time search
  searchInput.addEventListener("keyup", () => {
    const searchValue = searchInput.value.toLowerCase();
    const filteredStudents = list.filter((student) =>
      student.name.toLowerCase().includes(searchValue)
    );

    if (filteredStudents.length > 0) {
      showPage(filteredStudents, 1);
      addPagination(filteredStudents);
    } else {
      document.querySelector(".student-list").innerHTML =
        '<p class="no-results">No results found</p>';
      document.querySelector(".link-list").innerHTML = ""; // Clear pagination
    }
  });

  // Event listener for search button
  document
    .querySelector(".student-search button")
    .addEventListener("click", () => {
      const searchValue = searchInput.value.toLowerCase();
      const filteredStudents = list.filter((student) =>
        student.name.toLowerCase().includes(searchValue)
      );

      if (filteredStudents.length > 0) {
        showPage(filteredStudents, 1);
        addPagination(filteredStudents);
      } else {
        document.querySelector(".student-list").innerHTML =
          '<p class="no-results">No results found</p>';
        document.querySelector(".link-list").innerHTML = ""; // Clear pagination
      }
    });
}

// Call functions
// // Call the showPage function once the DOM is fully loaded
// document.addEventListener("DOMContentLoaded", () => {
//   showPage(data, 3); // Call the function with the student list and the desired page number
// });

// Call the functions to initialize the page
showPage(data, 1);
addPagination(data);
addSearchComponent();
searchStudents(data);
