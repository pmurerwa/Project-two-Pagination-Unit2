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

//Global constant 
const studentsPerPage = 9;

// Function to show a specific page of students
function showPage(list, page) {
  const startIndex = (page * studentsPerPage) - studentsPerPage; // Calculate the start index
  const endIndex = (page * studentsPerPage) - 1; // Calculate the end index
  const studentList = document.querySelector(".student-list"); // Select the student-list element
  
  studentList.innerHTML = ""; // Clear the previous contents

  // Loop over the list of students
  for (let i = 0; i < list.length; i++) {
   const student = list[i]; //To easily reference the specific student object in the subsequent code block without repeatedly using list[i]
    // Check if the current index is within the range for the current page
    if (i >= startIndex && i < endIndex) {
      // Create the HTML structure to only display students for the current page
      const studentHTML = `
        <li class="student-item cf">
          <div class="student-details">
            <img class="avatar" src="${student.picture.large}" alt="Profile Picture">
            <h3>${student.name.first} ${student.name.last}</h3>
            <span class="email">${student.email}</span>
          </div>
          <div class="joined-details">
            <span class="date">Joined ${student.registered.date}</span>
          </div>
        </li>

      `;
      // Insert the student HTML into the student-list
      studentList.insertAdjacentHTML("beforeend", studentHTML);
    }
  }
}


// Function to add pagination buttons
function addPagination(list) {
  const numberOfPages = Math.ceil(list.length / studentsPerPage); // Calculate number of pages
  const linkList = document.querySelector(".link-list");  // Select the link-list element
  linkList.innerHTML = ""; // Clear the previous contents of the link-list

  // Loop over the number of pages to create pagination buttons
  for (let i = 1; i <= numberOfPages; i++) {
    const button = `<li><button type="button">${i}</button></li>`;     // Create a button for each page
    linkList.insertAdjacentHTML("beforeend", button);     // Insert the button into the link-list
  }
  // Select the first pagination button and give it a class name of active
  const firstButton = linkList.querySelector("button");
  if (firstButton) {
   firstButton.className = 'active';
 }
  // Add event listener to link-list for pagination buttons
  linkList.addEventListener("click", (event) => {
   if (event.target.tagName === 'BUTTON') {
      document.querySelector('.active').className = ''; // Remove active class
      event.target.className = 'active'; // Add active class to clicked button
      const pageNumber = parseInt(event.target.textContent);
      showPage(list, pageNumber); // Call the showPage function with the list and the page number
    }
  });
}
// Exceeds Expectations part!

//Create the `addSearchComponent`function
function addSearchComponent() {
  const header = document.querySelector(".header");
  const searchHTML = `
      <label for="search" class="student-search">
         <span>Search by name</span>
         <input id="search" placeholder="Search by name...">
         <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label>
   `;
  header.insertAdjacentHTML("beforeend", searchHTML); // Insert the search bar

}

//Create the `searchStudents` function

function searchStudents(searchInput, list) {
   const searchTerm = searchInput.value.toLowerCase();
   const filteredList = list.filter(student => {
     const fullName = `${student.name.first.toLowerCase()} ${student.name.last.toLowerCase()}`;
     return fullName.includes(searchTerm); // Match search term
   });
 
   if (filteredList.length > 0) {
     showPage(filteredList, 1); // Show first page of results
     addPagination(filteredList); // Update pagination based on results
   } else {
     document.querySelector('.student-list').innerHTML = '<p class="no-results">No results found</p>';
     document.querySelector('.link-list').innerHTML = ''; // Clear pagination
   }
 }
 
 // Attach search functionality
 function handleSearch(list) {
   const searchInput = document.getElementById('search');
   const searchButton = document.querySelector('.student-search button');
   
   // Search on button click
   searchButton.addEventListener('click', () => searchStudents(searchInput, list));
 
   // Search on keyup for real-time filtering
   searchInput.addEventListener('keyup', () => searchStudents(searchInput, list));
 }
 

// Call the functions to initialize the page
addSearchComponent();
showPage(data, 1);
addPagination(data);
handleSearch(data);
