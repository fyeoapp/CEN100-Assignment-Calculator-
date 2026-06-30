const calendarGrid = document.getElementById('calendar-grid');
const calendarSelectMode = document.getElementById('calendar-select-mode');
const selectStartBtn = document.getElementById('select-start-btn');
const selectDueBtn = document.getElementById('select-due-btn');
// const calendarTitle = document.querySelector('.calendar-title');

// // Add month/year selectors
// calendarTitle.innerHTML = `
//   <button id="prev-month" style="background:none;border:none;font-size:1.2em;cursor:pointer;">&#8592;</button>
//   <span id="calendar-month-label"></span>
//   <button id="next-month" style="background:none;border:none;font-size:1.2em;cursor:pointer;">&#8594;</button>
//   <select id="calendar-year" style="font-size:1em;margin-left:8px;"></select>
// `;

// const monthLabel = document.getElementById('calendar-month-label');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');
// const yearSelect = document.getElementById('calendar-year');

const startDateInput = document.getElementById('start-date');
const dueDateInput = document.getElementById('due-date');
const warningDiv = document.getElementById('deadline-warning');
const shortDeadlineWarning = document.getElementById('short-deadline-warning');

const assignmentSelectEl = document.getElementById('assignment-select');
const assignmentHeader = document.createElement('div');
// assignmentHeader.id = "assignment-header";
assignmentHeader.style = "color:#fff;font-size:1.3em;font-weight:bold;margin:18px 0 8px 0;";
const assignmentDesc = document.createElement('div');
assignmentDesc.id = "assignment-desc";
assignmentDesc.style = "color:#fff;font-size:1em;margin-bottom:8px;";
const dueDateInputEl = document.getElementById('due-date');

// const formRow = document.querySelector('.form-row');
//   if (formRow && !document.getElementById('assignment-header')) {
//     formRow.parentNode.insertBefore(assignmentHeader, formRow);
//     formRow.parentNode.insertBefore(assignmentDesc, formRow);
//   }

assignmentSelectEl.addEventListener('change', function() {
    const val = assignmentSelectEl.value;
    if (assignmentDetails[val]) {
      assignmentHeader.innerHTML = assignmentDetails[val].header;
      assignmentDesc.innerHTML = assignmentDetails[val].description;
      // dueDateInputEl.value = assignmentDetails[val].dueDate;
    } else {
      assignmentHeader.innerHTML = "";
      assignmentDesc.innerHTML = "";
      dueDateInputEl.value = "";
    }
    // Toggle the layout class so controls fill the bottom when an assignment is selected
    const centerCard = document.querySelector('.center-form-card');
    if (centerCard) {
      if (val) centerCard.classList.add('controls-fill');
      else centerCard.classList.remove('controls-fill');
    }
});


const assignmentDetails = {
  email: {
    header: "EMAIL ASSIGNMENT (2%)",
    description: `Professionally written email regarding job shadowing opportunities at a company of your choice.<br>
    <ul>
      <li>Be professional, introduce yourself, explain why you're inquiring, state your availability, and use a polite sign-off.</li>
      <li>Submit your email to the project manager (PM).</li>
    </ul>`,
    dueDate: "2025-09-18"
  },
  notebook: {
    header: "Personal Design Notebook (4%)",
    description: `
      <ul>
        <li>Draw original design of your choice (can include diagrams, explanations).</li>
        <li>Each entry builds off the last—follow instructions very closely.</li>
        <li>Make sure the original concept is improved each entry (do not make new designs after 1st entry).</li>
        <li><b>Due Dates:</b> Sept 18, Oct 16, Nov 13 (3 entries total, each worth 1.33%)</li>
      </ul>
    `,
    dueDate: "2025-09-18" // First due date as default
  },
  whmis: {
    header: "WHMIS Certification (2%)",
    description: `
      <ul>
        <li>D2L quizzes – mandatory completion.</li>
        <li>Marked based off of quiz score.</li>
      </ul>
    `,
    dueDate: "2025-10-16"
  },
  matlab: {
    header: "MATLAB Assignments (12%)",
    description: `
      <ul>
        <li>Complete 3-question assignment.</li>
        <li>Work in groups of 2-3 (students choose groups).</li>
        <li>Answer questions correctly.</li>
        <li>Listen to GA's lessons during tutorials.</li>
        <li><b>Due Dates:</b> Sept 25, Oct 2, Oct 9</li>
      </ul>
    `,
    dueDate: "2025-09-25" // First due date as default
  },
  disaster: {
    header: "Engineering Disaster Project (14%)",
    description: `
      <ul>
        <li>Write a formal report and short presentation on an engineering disaster of your choice.</li>
        <li>Students choose teams of 5-7.</li>
        <li>Follow rubric closely.</li>
        <li>Read <b>ALL</b> provided documents for maximum clarity.</li>
        <li>Recommended: Host weekly meetings on your own time to stay up to date on milestones.</li>
        <li><b>Due Dates:</b> Oct 23 and Oct 30</li>
      </ul>
    `,
    dueDate: "2025-10-23" // First due date as default
  },
  reverse: {
    header: "Reverse Engineering Project (20%)",
    description: `

      <ul>
        <li>Create a formal report and presentation on an original product that is continuously improved.</li>
        <li>Groups of 10-13.</li>
        <li>Follow rubric closely.</li>
        <li>Read <b>ALL</b> provided documents for maximum clarity.</li>
        <li>Recommended: Host weekly meetings on your own time to stay up to date on milestones.</li>
        <li><b>Due Dates:</b> Nov 6, Nov 13, Nov 20, Nov 27</li>
      </ul>
    `,
    dueDate: "2025-11-06" // First due date as default
  },
  final: {
    header: "Final Exam (24%)",
    description: `

      <ul>
        <li>100+ questions</li>
        <li>Cumulative, covers all course content</li>
        <li>2-hour in-person cumulative exam, Weeks 1–13
        <li>Bring student ID, calculator, and writing tools</li>
        <li>Check D2L for exact date/time/location</li>
        <li> PowerPoint presentations posted on D2L, Any completed assignments or quizzes (like WHMIS, Academic Integrity)
      </ul>
    `,
    dueDate: "" // Leave blank for TBD
  }
  // Add more assignments here as needed
};


// let selecting = 'start'; // 'start' or 'due'
// let selectedStart = null;
// let selectedDue = null;
// let calendarMonth = 8; // 0-indexed: 8 = September
// let calendarYear = 2026;

// Populate year dropdown (2022-2028 as example)
// for (let y = 2022; y <= 2028; y++) {
//   const opt = document.createElement('option');
//   opt.value = y;
//   opt.textContent = y;
//   if (y === calendarYear) opt.selected = true;
//   yearSelect.appendChild(opt);
// }


function getMonthName(monthIdx) {
  return [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ][monthIdx];
}

const today = new Date();
let viewYear = today.getFullYear();
let viewMonth = today.getMonth();
let startDate = null, endDate = null, selectingEnd = false;

const months=[
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const pad = n => String(n).padStart(2, '0');

const fmt = d => {
  if (!d) return '';
  const year  = d.getFullYear();
  const month = pad(d.getMonth() + 1);
  const day   = pad(d.getDate());
  return `${year}-${month}-${day}`;
};
const sameDay = (a,b) =>
  a && b &&
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const daysInMonth = (y,m) => new Date(y, m + 1, 0).getDate();

const monthLabel = document.getElementById('monthLabel');
const yearSelect = document.getElementById('yearSelect');
const daysGrid = document.getElementById('daysGrid');
const startDisplay= document.getElementById('startDisplay');
const endDisplay = document.getElementById('endDisplay');

for (let y = today.getFullYear() - 5; y <= today.getFullYear() + 5; y++) {
  const opt = document.createElement('option');
  opt.value = y;
  opt.textContent = y;
  if (y === today.getFullYear()) opt.selected = true;
  yearSelect.appendChild(opt);
}

function checkDeadlineWarning() {
  const start = startDate;
  const end = endDate;

  if (start && end) {
    const diffTime = end - start;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    if (diffDays <= 3) {
      // Trigger smooth show for critical warning
      warningDiv.classList.add('show');
      shortDeadlineWarning.classList.remove('show');
    } else if (diffDays < 5) {
      // Trigger smooth show for moderate warning
      warningDiv.classList.remove('show');
      shortDeadlineWarning.classList.add('show');
    } else {
      // Hide both smoothly
      warningDiv.classList.remove('show');
      shortDeadlineWarning.classList.remove('show');
    }
    
  } else {
    warningDiv.classList.remove('show');
    shortDeadlineWarning.classList.remove('show');
  }
}

function updateFooter() {
  startDisplay.value = fmt(startDate);
  endDisplay.value   = fmt(endDate);

}

function renderCalendar(){
  monthLabel.textContent = `${months[viewMonth]} ${viewYear}`;
  const dim = daysInMonth(viewYear, viewMonth)
  const firstDow = new Date(viewYear, viewMonth, 1).getDay();
  daysGrid.innerHTML='';

  for(let i = 0; i < firstDow; i++){
    const el = document.createElement('div');
    el.className='day empty';
    daysGrid.appendChild(el);
  }

  for (let d = 1; d <= dim; d++){
    const date = new Date(viewYear, viewMonth, d);
    const el = document.createElement('div');
    el.className='day';
    el.textContent=d;

    if (sameDay(date, today)) el.classList.add('today');
    if (sameDay(date, startDate)) el.classList.add('selected-start');
    if (sameDay(date, endDate)) el.classList.add('selected-end');
    if (startDate && endDate && date > startDate && date < endDate){
      el.classList.add('in-range');
    }
    el.addEventListener('click', () => onDayClick(date));
    daysGrid.appendChild(el);
  }
}

function onDayClick(date){
  if(!startDate ||(startDate && endDate)){
    startDate = date;
    endDate = null;
    selectingEnd = true;
  }
  else if (selectingEnd){
    if(date< startDate) {
      endDate = startDate;
      startDate = date;
    }
    else endDate = date;
    selectingEnd = false;
  }
  updateFooter();
  renderCalendar();
  checkDeadlineWarning();
}

document.getElementById('prevBtn').onclick = () => {
  viewMonth--;
  if (viewMonth < 0) { viewMonth = 11; viewYear--; }
  yearSelect.value = viewYear;
  renderCalendar();
};

document.getElementById('nextBtn').onclick = () => {
  viewMonth++;
  if (viewMonth > 11) { viewMonth = 0; viewYear++; }
  yearSelect.value = viewYear;
  renderCalendar();
};

yearSelect.onchange = () => {
  viewYear = parseInt(yearSelect.value);
  renderCalendar();
};

document.getElementById('clearBtn').onclick = () => {
  startDate    = null;
  endDate      = null;
  selectingEnd = false;
  updateFooter();
  renderCalendar();
};

document.getElementById('generateBtn').onclick = () => {
  const timelineDiv = document.getElementById('timelineBreakdown')
  timelineDiv.classList.add('show');
  requestAnimationFrame(() => {
    timelineDiv.scrollIntoView({ 
      behavior: "smooth", 
      block: "start" 
    });
  });
};

function parseInput(str) {
  const parts = str.split('-');              // ["2026", "06", "15"]
  if (parts.length !== 3) return null;

  const year  = parseInt(parts[0]);
  const month = parseInt(parts[1]) - 1;     // back to zero-indexed for Date constructor
  const day   = parseInt(parts[2]);

  if (isNaN(year) || isNaN(month) || isNaN(day)) return null;

  const d = new Date(year, month, day);     // local time, no UTC shift

  // Validate the date is real (e.g. rejects Feb 30)
  if (d.getFullYear() !== year || d.getMonth() !== month || d.getDate() !== day) return null;

  return d;
}

startDisplay.addEventListener('change', () => {
  console.log(startDisplay.value);
  const parsed = parseInput(startDisplay.value);
  console.log(parsed);
  if (parsed) {
    startDate = parsed;
    if (endDate && startDate > endDate) endDate = null;
    viewYear  = startDate.getFullYear();
    viewMonth = startDate.getMonth();
    yearSelect.value = viewYear;
    renderCalendar();
    updateFooter();
  } else {
    startDisplay.value = fmt(startDate);
  }
});

endDisplay.addEventListener('change', () => {
  const parsed = parseInput(endDisplay.value);
  if (parsed) {
    endDate = parsed;
    if (startDate && endDate < startDate) {
      [startDate, endDate] = [endDate, startDate];
    }
    viewYear  = endDate.getFullYear();
    viewMonth = endDate.getMonth();
    yearSelect.value = viewYear;
    renderCalendar();
    updateFooter();
  } else {
    endDisplay.value = fmt(endDate);
  }
});


renderCalendar();
updateFooter();

let touchStartX = 0;
let touchStartY = 0;

function isMobileWidth(){
  return window.innerWidth < 1100;
}

daysGrid.addEventListener('touchstart', (e) => {
  if (!isMobileWidth()) return;
  touchStartX = e.changedTouches[0].screenX;
  touchStartY = e.changedTouches[0].screenY;
}, {passive: true});

daysGrid.addEventListener('touchend', (e) => {
  if (!isMobileWidth()) return;
  
  const touchEndX = e.changedTouches[0].screenX;
  const touchEndY = e.changedTouches[0].screenY;
  const diffX = touchEndX - touchStartX;
  const diffY = touchEndY - touchStartY;

  const SWIPE_THRESHOLD = 50;

  //ignore mostly-vertical gestures 
  if (Math.abs(diffX) < Math.abs(diffY)) return ;

  if (diffX > SWIPE_THRESHOLD){
    document.getElementById('prevBtn').click();
  } else if (diffX < -SWIPE_THRESHOLD){
    document.getElementById('nextBtn').click();
  }

}, {passive: true});

// function renderCalendar() {
//   monthLabel.textContent = `${getMonthName(calendarMonth)} ${calendarYear}`;
//   calendarGrid.innerHTML = '';
//   const headerRow = document.createElement('div');
//   headerRow.className = 'calendar-row calendar-header';
//   ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].forEach(d => {
//     const span = document.createElement('span');
//     span.textContent = d;
//     headerRow.appendChild(span);
//   });
//   calendarGrid.appendChild(headerRow);

//   const firstDay = new Date().getDay();
//   const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();

//   let day = 1;
//   for (let week = 0; week < 6;  week++) {
//     const row = document.createElement('div');
//     row.className = 'calendar-row';
//     for (let dow = 0; dow < 7; dow++) {
//       const cell = document.createElement('span');
//       if ((week === 0 && dow < firstDay) || day > daysInMonth) {
//         cell.textContent = '';
//       } else {
//         cell.textContent = day;
//         cell.style.cursor = 'pointer';
//         const dateStr = `${calendarYear}-${String(calendarMonth+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
//         cell.dataset.date = dateStr;
//         if (selectedStart === dateStr) cell.classList.add('calendar-active');
//         if (selectedDue === dateStr) {
//           cell.style.background = '#1857b8';
//           cell.style.color = '#fff';
//         }
//         cell.onclick = function() {
//           if (selecting === 'start') {
//             selectedStart = dateStr;
//             startDateInput.value = selectedStart;
//           } else {
//             selectedDue = dateStr;
//             dueDateInput.value = selectedDue;
//           }
//           renderCalendar();
//           checkDeadlineWarning(); // <-- Add this line
//         };
//         day++;
//       }
//       row.appendChild(cell);
//     }
//     calendarGrid.appendChild(row);
//     if (day > daysInMonth) break;
//   }
// }
// renderCalendar();

// selectStartBtn.onclick = function() {
//   selecting = 'start';
//   calendarSelectMode.textContent = 'Select Start Date';
// };
// selectDueBtn.onclick = function() {
//   selecting = 'due';
//   calendarSelectMode.textContent = 'Select Due Date';
// };

// prevMonthBtn.onclick = function() {
//   calendarMonth--;
//   if (calendarMonth < 0) {
//     calendarMonth = 11;
//     calendarYear--;
//     yearSelect.value = calendarYear;
//   }
//   renderCalendar();
// };
// nextMonthBtn.onclick = function() {
//   calendarMonth++;
//   if (calendarMonth > 11) {
//     calendarMonth = 0;
//     calendarYear++;
//     yearSelect.value = calendarYear;
//   }
//   renderCalendar();
// };
// yearSelect.onchange = function() {
//   calendarYear = parseInt(yearSelect.value, 10);
//   renderCalendar();
// };





// ///////////////////////////////////////FOR DARK MODE/////////////////////////////////
// 
// const modeToggle = document.getElementById('mode-toggle');
// const body = document.body; 
// Set initial mode from localStorage
//   if (localStorage.getItem('mode') === 'dark') {
//     body.classList.add('dark-mode');
//     modeToggle.textContent = '☀️ Light Mode';
//   }

//   modeToggle.addEventListener('click', () => {
//     body.classList.toggle('dark-mode');
//     if (body.classList.contains('dark-mode')) {
//       modeToggle.textContent = '☀️ Light Mode';
//       localStorage.setItem('mode', 'dark');
//     } else {
//       modeToggle.textContent = '🌙 Dark Mode';
//       localStorage.setItem('mode', 'light');
//     }

document.getElementById('assignment-form').addEventListener('submit', function(e) {
  e.preventDefault();

// Highlight the "Generate Timeline" and also the "Review & Save" steps in the stepper
// document.querySelectorAll('.center-stepper .step').forEach((el, idx) => {
//   if (idx === 1 || idx === 2) {
//     el.classList.add('active');
//     el.style.color = '#a009d7';
//     el.style.fontWeight = 'bold';
//   } else {
//     el.classList.remove('active');
//     el.style.color = idx === 0 ? '#a009d7' : '#888';
//     el.style.fontWeight = idx === 0 ? 'bold' : '500';
//   }
// });

const assignment = document.getElementById('assignment-select').value;
const start = startDisplay.value;
const due = endDisplay.value;
const breakdownDiv = document.getElementById('timelineBreakdown');

if (!assignment || !start || !due) {
  breakdownDiv.innerHTML = `<div style="color:#d7263d;font-weight:bold; justify-content: center; align-content: center;">Please select an assignment, start date, and due date.</div>`;
  return;
}

const startDay = new Date(start);
const dueDay = new Date(due);
const days = Math.floor((dueDay - startDay) / (1000 * 60 * 60 * 24));
if (days < 0) {
  breakdownDiv.innerHTML = `<div style="color:#d7263d;font-weight:bold;">Due date must be after start date.</div>`;
  return;
}
  // Block timeline generation if less than 5 days
  if (days < 5) {
    alert("Warning: The time between your start and due date is less than 5 days. This may not be enough time to complete the assignment. Consider contacting your professor for an extension.");
    return;
  }

function generateStepRanges(breakdown, startDate, days) {
  const steps = [];
  const stepCount = breakdown.length;
  // Calculate how many days per step (distribute as evenly as possible)
  const baseDaysPerStep = Math.floor((days + 1) / stepCount);
  let remainder = (days + 1) % stepCount;
  let currentDay = 1;

  for (let i = 0; i < stepCount; i++) {
    let daysForThisStep = baseDaysPerStep + (remainder > 0 ? 1 : 0);
    remainder--;

    const start = currentDay;
    const end = currentDay + daysForThisStep - 1;
    const startDateObj = new Date(startDate);
    startDateObj.setDate(startDateObj.getDate() + (start - 1));
    const endDateObj = new Date(startDate);
    endDateObj.setDate(endDateObj.getDate() + (end - 1));

    let dayLabel = daysForThisStep === 1
      ? `Day ${start} (${startDateObj.toLocaleDateString()})`
      : `Days ${start}-${end} (${startDateObj.toLocaleDateString()} to ${endDateObj.toLocaleDateString()})`;

    steps.push(`${dayLabel}: <br>${breakdown[i]}`);
    currentDay += daysForThisStep;
  }
  return steps;
}

let steps = [];
if (assignment === "email") {
  let breakdown = [
    `<b>Step 1: Research Your Field of Interest</b><br>
    Pick an engineering field you are curious about (e.g., civil, software, aerospace).<br>
    Use professional platforms (LinkedIn, company websites, Google) to find an engineer or company in that field.<br>
    Learn about their work and find out what inspires you.<br>
    <i>Tip: Use the CEN100 Writing Support Resources.</i>`,

    `<b>Step 2: Brainstorm and Justify Your Selection (Paragraph)</b><br>
    Draft a short paragraph (3–5 sentences) explaining:<br>
    - Why you chose this engineering discipline<br>
    - Why you chose that Engineer<br>
    - What about their work or projects connects with your interests and goals`,

    `<b>Phase 2: Drafting the Email</b><br>
    <b>Step 3: Write a Professional Email</b><br>
    <u>Follow these content guidelines:</u><br>
    <b>Subject Line:</b> Include course code: CEN100 and a short description (e.g., “Request for Job Shadowing Opportunity – CEN100”)<br>
    <b>Greeting:</b> Use correct title: Dear Dr./Mr./Ms./Mrs. [Last Name]<br>
    <b>Introduction:</b> State your name, program, and school. Mention your interest in their field and any related experiences (courses, clubs, etc.)<br>
    <b>Email Body:</b> Express interest in job shadowing. Mention a specific project or technology of theirs that inspires you. Suggest a general time frame for shadowing. Be respectful and flexible with their availability.<br>
    <b>Closing:</b> Thank them for their time. Include your full name and student number. End with: Sincerely, Best regards, etc.`,

    `<b>Phase 3: Reflection & Submission</b><br>
    <b>Step 4: Write a Short Reflection</b><br>
    In 1–2 short paragraphs, explain:<br>
    - Why you selected that company/engineer<br>
    - How you personalized the email<br>
    - What you learned about the engineering profession during your research`,

    `<b>Step 5: Submit Your Assignment</b><br>
    Send the following to your PM’s email address from your @torontomu.ca account:<br>
    - Drafted email (in the body of the email)<br>
    - Paragraph about your engineer/company selection<br>
    - Reflection paragraph<br>
    <b>Submission Checklist:</b><br>
    - Correct subject line with CEN100<br>
    - Proper greeting and closing<br>
    - No grammar or spelling mistakes<br>
    - Your name and student number included<br>
    - Sent from your TMU email address<br>
    - Attached or pasted all required components`
  ];
  steps = generateStepRanges(breakdown, startDate, days);
} else if (assignment === "notebook") {
  let breakdown = [
    `<b>Phase 1: Getting Started</b><br>
    <b>First Due Date:</b> September 18, 2024, at 3:00 PM<br>
    <b>Step 1: Set Up Your Engineering Notebook</b><br>
    - Use Microsoft OneNote (available through your TMU student account).<br>
    - Create a notebook titled: <i>YourFullName - CEN100 Design Notebook</i>.<br>
    - Organize entries by date; each entry goes on a separate page.<br>
    - Learn basic OneNote tools (drawing, typing, inserting images, audio, etc.).<br>
    <i>Tip: Use the CEN100 Writing Support Resources.</i>`,

    `<b>Step 2: Begin Making Entries</b><br>
    - Start brainstorming: What problems or design ideas interest you?<br>
    - Record all relevant material:<br>
    &nbsp;&nbsp;&bull; Notes<br>
    &nbsp;&nbsp;&bull; Sketches / free-body diagrams<br>
    &nbsp;&nbsp;&bull; Calculations<br>
    &nbsp;&nbsp;&bull; Assumptions<br>
    &nbsp;&nbsp;&bull; Meeting summaries<br>
    &nbsp;&nbsp;&bull; Observations and design thinking<br>
    &nbsp;&nbsp;&bull; Drafts for related assignments`,

    `<b>Step 3: Update Regularly</b><br>
    - Minimum suggestion: 2 entries per week<br>
    - Don’t delete — strike through instead if something changes.<br>
    - If you’re using a paper notebook, scan and upload pages into OneNote weekly.<br>
    - For 2nd and 3rd entries, do not start new ideas - build off and improve your previous ideas.`,

    `<b>Phase 2: Mid-Semester Check-In</b><br>
    <b>Mid Due Date:</b> October 16, 2024, at 3:00 PM<br>
    <b>Step 4: Midpoint Review</b><br>
    - Ensure consistent, dated entries.<br>
    - Include both individual and team project contributions.<br>
    - Reflect design process development so far — it doesn’t need to be polished, just complete and genuine.`,

    `<b>Step 5: Export & Submit (Mid Check-In)</b><br>
    - Export the current version of your OneNote notebook as a PDF.<br>
    - Upload to D2L &gt; Assignments &gt; Personal Design Notebook.<br>
    - Click Submit.`,

    `<b>Phase 3: Final Submission</b><br>
    <b>Final Due Date:</b> November 13, 2024, at 3:00 PM<br>
    <b>Step 6: Final Entries</b><br>
    - Ensure your notebook includes a full record of your design thinking process, from ideas to project contributions.<br>
    - Prioritize clarity, completeness, and organization.<br>
    - Avoid blank or missing weeks.`,

    `<b>Step 7: Export & Submit (Final Submission)</b><br>
    - Once completed, export the full notebook as a PDF.<br>
    - Submit the file via D2L under the same assignment dropbox.<br>
    - Double-check that your file is complete and all pages are legible (especially scanned images).`
  ];
  steps = generateStepRanges(breakdown, startDate, days);
} else if (assignment === "whmis") {
  let breakdown = [
    `<b>Step 1: Log into the WHMIS D2L Module</b><br>
  - Go to: <a href="https://my.torontomu.ca" target="_blank">my.torontomu.ca</a><br>
  - Open the WHMIS course shell<br>
  - Navigate to <b>Content</b><br>
  - Find the WHMIS eLearning Module<br>
  - You’ll see two modules:<br>
  &nbsp;&nbsp;&bull; Introduction to WHMIS<br>
  &nbsp;&nbsp;&bull; WHMIS Labels & Safety Data Sheets`,

    
    `<b>Step 2: Complete Each Module</b><br>
  - You can access each module in different formats:<br>
  &nbsp;&nbsp;&bull; Web version (with narration and visuals)<br>
  &nbsp;&nbsp;&bull; MP3 audio<br>
  &nbsp;&nbsp;&bull; PDF transcript<br>
  - Use the format that works best for your learning style.<br>
  - Watch or listen to the entire module<br>
  - Take notes on key terms: hazard symbols, SDS sheets, label types, etc.`,

    `<b>Step 3: Take the Module Quizzes</b><br>
  - After each module:<br>
  &nbsp;&nbsp;&bull; Return to the module description<br>
  &nbsp;&nbsp;&bull; Click the quiz link<br>
  &nbsp;&nbsp;&bull; Complete the quiz (you must score at least 80% to pass)<br>
  - You must pass both quizzes (one per module) to earn your certification.<br>
  <i>Tip: You can save your answers as you go and submit when finished.</i>`,

    `<b>Phase 2: Certification</b><br>
  <b>Step 4: Receive & Download Your WHMIS Award</b><br>
  - After passing both quizzes, you will automatically receive the WHMIS certificate (award)<br>
  - To access it:<br>
  &nbsp;&nbsp;&bull; Go to <b>Awards</b> in the course navigation bar in D2L<br>
  &nbsp;&nbsp;&bull; Find the WHMIS Award<br>
  &nbsp;&nbsp;&bull; Click to download or print it<br>
  - This is proof of your successful certification.`
  ];
  steps = generateStepRanges(breakdown, startDate, days);
} else if (assignment === "matlab") {
  let breakdown = [
    `<b>Step 1: Understand the Concepts</b><br>
  - Don’t just aim to finish—understand what predefined functions and matrix operations do.<br>
  - Review lecture examples first (see D2L slides).`,

    `<b>Step 2: Work With Your Partner</b><br>
  - Split the tasks fairly and review each other’s work.<br>
  - Make sure both partners understand the full script.`,

    `<b>Step 3: Write Clean, Commented Code</b><br>
  - Use clear variable names and explain your steps using comments.<br>
  - Keep the code organized and readable.`,

    `<b>Step 4: Test Your Code</b><br>
  - Run your script after each part to catch errors early.<br>
  - Check that your outputs make sense.`,

    `<b>Step 5: Use Student ID Correctly</b><br>
  - If a question uses your ID digits, assign them accordingly.`,

    `<b>Step 6: Ask for Help Early</b><br>
  - If you're stuck, ask your partner, the TA, or instructor.<br>
  - Don’t wait until the last day.`,

    `<b>Step 7: Follow Submission Rules Exactly</b><br>
  - Double-check you have followed all instructions for submission.`
  ];
  steps = generateStepRanges(breakdown, startDate, days);
} else if (assignment === "disaster") {
  let breakdown = [
    `<b>Step 1: Form Your Group</b><br>
  - Group size: 5–7 students.<br>
  - Ensure all members are committed and accessible for meetings and communication.`,

    `<b>Step 2: Select Your Disaster Topic</b><br>
  - Choose from the list provided or get approval for a custom topic.<br>
  - Make sure it has enough depth to analyze causes, consequences, ethics, etc.<br>
  <i>Suggested: Chernobyl, Challenger, Deepwater Horizon, Hyatt Walkway Collapse.</i>`,

    `<b>Phase 2: Pre-Paper Deliverables</b><br>
  <b>Due: Wednesday, October 26 @ 3:00 PM</b><br>
  <b>Step 3: Team Contract</b><br>
  - Use the template provided by your instructor.<br>
  - Define communication tools, meeting frequency, expectations, conflict resolution.<br>
  - All members must digitally sign the contract.<br>
  <i>Tip: Use the CEN100 Writing Support Resources.</i>`,

    `<b>Step 4: Project Task Outline</b><br>
  - Use the provided task template.<br>
  - Define research and writing responsibilities, presentation roles, deadlines.<br>
  - Track task progress and updates.`,

    `<b>Step 5: Extended Abstract (Max 500 words)</b><br>
  - Draft a summary: brief description of the disaster, key points for the final paper, expected outcomes or lessons learned.<br>
  - Keep it clear, concise, and structured.`,

    `<b>Step 6: Presentation (Max 5 minutes)</b><br>
  - At least 2 group members present.<br>
  - Include overview, progress, next steps, project timeline, and division of tasks.<br>
  - Use PowerPoint or Google Slides. Keep it visual, not text-heavy.`,

    `<b>Phase 3: Research and Writing the Paper</b><br>
  <b>Final Paper Due: Wednesday, November 2 @ 3:00 PM</b><br>
  <b>Step 7: Conduct In-Depth Research</b><br>
  - Gather at least 10 credible sources (journals, books, news, official reports).<br>
  - Use IEEE citation style from the start.`,

    `<b>Step 8: Write the Research Paper</b><br>
  - 10 pages (excluding title, references, appendices).<br>
  - Structure: Abstract, Introduction, Analysis, Recommendations, Conclusions, Acknowledgments, References, Breakdown of Duties.<br>
  - Address technical causes, timeline, ethics, consequences, and recommendations.<br>
  - Use diagrams/charts where needed.`,

    `<b>Step 9: Formatting</b><br>
  - Font: Times New Roman<br>
  - Size: 14 (title), 12 (headings), 11 (body)<br>
  - Spacing: Single-spaced<br>
  - Margins: 3.1 cm<br>
  - Figures/tables labeled and captioned.`,

    `<b>Step 10: Include Peer Review Template</b><br>
  - Each member evaluates others’ contributions.<br>
  - Include as appendix or separate page in your submission.`,

    `<b>Phase 4: Submission</b><br>
  - Submit all components via D2L.<br>
  - Proofread, correctly format, digitally sign where required.<br>
  - Upload before the deadlines (check D2L or ask PMs for specifics).`
  ];
  steps = generateStepRanges(breakdown, startDate, days);
} else if (assignment === "final") {
  let breakdown = [
    `<b>Phase 1: Preparation & Study</b><br>
  <b>Exam Period:</b> December 3–14, 2025 (exact date TBA)<br>
  <b>Format:</b> 2-hour in-person cumulative exam<br>
  <b>Coverage:</b> All lecture content and presentations from Weeks 1–13<br>
  <b>Submission:</b> Attend and write the exam in your assigned location`,

    `<b>Step 1: Track the Exam Date</b><br>
  - The exact exam date will be announced by the Registrar.<br>
  - Check your MyServiceHub account and course D2L shell regularly.<br>
  <i>Tip: If you have an exam conflict, notify your instructor and FYEO within two weeks of the schedule release.</i>`,

    `<b>Step 2: Gather Study Materials</b><br>
  - Organize lecture notes from all 13 weeks<br>
  - Download PowerPoint presentations from D2L<br>
  - Review completed assignments/quizzes (WHMIS, Academic Integrity, etc.)<br>
  - Review your Design Notebook for inspiration<br>
  <i>Tip: Use the FYEO Exam Tips. Consider sharing notes with classmates.</i>`,

    `<b>Step 3: Review Week-by-Week</b><br>
  - Systematically review all lecture topics, focusing on key sessions:<br>
  &nbsp;&nbsp;&bull; Introduction to Engineering & FEAS<br>
  &nbsp;&nbsp;&bull; Teamwork and Academic Integrity<br>
  &nbsp;&nbsp;&bull; WHMIS and Engineering Safety<br>
  &nbsp;&nbsp;&bull; Engineering Disciplines<br>
  &nbsp;&nbsp;&bull; Design Process, Reverse Engineering, Ethics<br>
  &nbsp;&nbsp;&bull; Career Planning & Professional Practice<br>
  - Summarize each lecture in 5–7 bullet points<br>
  - Highlight key terms, definitions, and case studies<br>
  - Practice explaining concepts in your own words`,

    `<b>Phase 2: Practice & Final Prep</b><br>
  <b>Step 4: Create a Study Schedule</b><br>
  - Use a calendar to break down your study time:<br>
  &nbsp;&nbsp;&bull; Nov 25–Dec 1: Review lectures/notes (Weeks 1–6)<br>
  &nbsp;&nbsp;&bull; Dec 2–4: Review lectures/notes (Weeks 7–13)<br>
  &nbsp;&nbsp;&bull; 2–3 days before exam: Practice questions, review flagged material`,

    `<b>Step 5: Simulate the Exam</b><br>
  - Set a timer for 2 hours and write a mock exam<br>
  - Create questions from lecture slides and test yourself<br>
  - Practice short answers on:<br>
  &nbsp;&nbsp;&bull; Ethical responsibilities of an engineer<br>
  &nbsp;&nbsp;&bull; Difference between supplier and workplace WHMIS labels<br>
  &nbsp;&nbsp;&bull; How to validate an engineering design<br>
  <i>Optional: Quiz with friends or book a study session with Engineering ACES.</i>`,

    `<b>Pre-Exam Day Checklist</b><br>
  - Check your exam time and location on MyServiceHub<br>
  - Pack necessary supplies (pens, ID, calculator if allowed)<br>
  - Get a full night’s sleep<br>
  - Eat something light and stay hydrated`,

    `<b>Final Submission Checklist</b><br>
  <b>At the exam:</b><br>
  - Arrive 15–30 minutes early<br>
  - Bring valid TMU Student ID<br>
  - Follow all proctoring rules and instructions<br>
  - Write your best – this is worth 24–34% of your final grade`
  ];
  steps = generateStepRanges(breakdown, startDate, days);
} else if (assignment === "reverse") {
  let breakdown = [
    `<b>Phase 1: Team Formation and Planning</b><br>
    <b>Deadline:</b> ASAP (Well before November 10)<br>
    <b>Step 1: Form Your Group</b><br>
    - Group Size: Approximately 10–12 students<br>
    - Confirm availability and commitment from each member<br>
    - Decide on team communication tools (e.g., WhatsApp, Text, Discord)<br>
    - Schedule weekly meetings (virtual/in-person)`,

    `<b>Step 2: Select a Covid-Related Product or Process to Redesign</b><br>
    - Choose a real product/process currently used during or after the pandemic<br>
    - It must be functional but has room for improvement (not failed)<br>
    - Refer to theme areas (Health, Travel, Education, Community)<br>
    - Get instructor approval if choosing a unique or custom topic`,

    `<b>Phase 2: Pre-Project Deliverables</b><br>
    <b>Due:</b> Wednesday, November 10 @ 3:00 PM<br>
    <b>Step 3: Team Contract</b><br>
    - Tip: Use the CEN100 Writing Support Resources<br>
    - Use the provided template<br>
    - Define: communication method, meeting schedule and attendance expectations, deadlines and task ownership, conflict resolution strategy<br>
    - All members must sign digitally`,

    `<b>Step 4: Project Task Outline</b><br>
    - Use the instructor's template or Google Sheets<br>
    - Assign: research responsibilities (background, technical, market), writing roles (sections of the final report), presentation roles (who presents what)<br>
    - Set deadlines for internal drafts and meetings<br>
    - Track progress weekly`,

    `<b>Phase 3: Proposal Phase</b><br>
    <b>Proposal Due:</b> Wednesday, November 17 @ 3:00 PM<br>
    <b>Step 5: Write the Proposal (Max 500 Words)</b><br>
    - Include: Cover Sheet (project title, team member info, course, instructor, etc.)<br>
    - Background: What is the product/process? What problem does it solve? Why isn’t the current version ideal for post-COVID use?<br>
    - Proposed Redesign: Brief overview of anticipated changes/improvements<br>
    - Milestones + Work Division: Timeline of phases and who will do what`,

    `<b>Phase 4: Design, Research & Iteration</b><br>
    <b>Final Report & Presentation Due:</b> Wednesday, November 24 @ 3:00 PM<br>
    <b>Step 6: Conduct Technical Research</b><br>
    - Reverse engineer the product: How does it work? Materials used (create Bill of Materials), sketch or draw the original design<br>
    - Analyze: sustainability, UX, cost, performance, accessibility, public value, etc.<br>
    - Collect 10+ credible sources (IEEE style)`,

    `<b>Step 7: Design Iterations</b><br>
    - Create three versions of your redesign:<br>
    &nbsp;&nbsp;&bull; Version 1: Initial idea<br>
    &nbsp;&nbsp;&bull; Version 2: Refined based on evaluation<br>
    &nbsp;&nbsp;&bull; Version 3: Final model<br>
    - Each version must have: sketch or model, evaluation explanation (what worked, what didn’t)`,

    `<b>Phase 5: Report and Presentation</b><br>
    <b>Due:</b> Wednesday, November 24 @ 3:00 PM<br>
    <b>Step 8: Write the Final Report (Min 5000 words)</b><br>
    - Structure: Abstract (Max 250 words), Introduction, Background (technical analysis of original), Evaluation, Redesign Proposal (3 versions, evaluation), Marketing (create one ad, identify/explain target market), References (10+ in IEEE format), Appendices (optional: sketches, mockups, calculations)<br>
    - Formatting: Font: Times New Roman, Size: 14 (title), 12 (headings), 11 (body), Spacing: Single-spaced, Margins: 3.1 cm, Figures/tables must be labeled and captioned`,

    `<b>Step 9: Prepare and Deliver the Presentation</b><br>
    - Group presentation: 15 minutes + 5 mins Q&A<br>
    - Use PowerPoint or Google Slides<br>
    - Content to include: overview of original product, limitations for post-COVID, redesign process (3 iterations), final design and evaluation, marketing strategy<br>
    - Keep slides visual and concise<br>
    - Everyone must speak; one person shares the screen<br>
    - Practice multiple times as a group`,

    `<b>Phase 6: Final Review and Peer Assessment</b><br>
    <b>Peer Review Due:</b> December 2 @ 3:00 PM<br>
    <b>Step 10: Peer Review</b><br>
    - Complete using the disaster project peer review template<br>
    - Evaluate each team member fairly<br>
    - Submit as a separate document or in an appendix`
  ];
  steps = generateStepRanges(breakdown, startDate, days);
} else {
  // Generic fallback for other assignments
  steps = [`Days 1-${days + 1} (${startDate.toLocaleDateString()} to ${dueDate.toLocaleDateString()}): Work on your assignment. Break your work into research, drafting, editing, and final review as needed.`];
}

breakdownDiv.innerHTML = `
    <div style="font-weight:bold;color:#a009d7;margin-bottom:18px;font-size:1.35em;">Step-by-Step Timeline:</div>
    <ol style="padding-left:32px;">
      ${steps.map(step => `<li style="margin-bottom:18px;line-height:1.7;">${step}</li>`).join('')}
    </ol>
    <div style="display:flex; gap:16px; margin-top:24px;">
      <button id="download-timeline-btn" style="background:#ffe14d;color:#222;font-weight:bold;font-size:1.15em;border:none;border-radius:10px;padding:14px 32px;cursor:pointer;box-shadow:0 2px 8px rgba(80,0,120,0.08);">
        Save and Download
      </button>
      <button id="feedback-btn" style="background:#1857b8;color:#fff;font-weight:600;font-size:1.13em;border:none;border-radius:10px;padding:14px 32px;cursor:pointer;box-shadow:0 2px 8px rgba(80,0,120,0.08);display:flex;align-items:center;gap:8px;"
        onclick="window.open('https://docs.google.com/forms/d/e/1FAIpQLScGjoCU9KW7aR4jlmjI10SKbpqavCE4X8C2ceFkaLExmEQukg/viewform?usp=sharing&ouid=103979447744273921797', '_blank');">
        📝 Calculator Feedback
      </button>
    </div>
`;

// Scroll to the timeline breakdown after generating it

// Add PDF download logic
setTimeout(() => {
  const btn = document.getElementById('download-timeline-btn');
  if (btn) {
    btn.onclick = function() {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({
        orientation: "p",
        unit: "pt",
        format: "a4"
      });

      // Get the timeline HTML and convert to plain text for PDF
      const timelineHtml = breakdownDiv.querySelector('ol').innerHTML;
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = timelineHtml;
      const stepsText = Array.from(tempDiv.querySelectorAll('li')).map(li => li.innerText);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text("Step-by-Step Timeline", 40, 50);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);

      const pageHeight = doc.internal.pageSize.height;
      const margin = 40;
      let y = 80;
      const lineHeight = 18;

      stepsText.forEach((step, idx) => {
        // Split long steps into lines that fit the page width
        const lines = doc.splitTextToSize(step, 500);
        lines.forEach((line, i) => {
          if (y > pageHeight - margin) {
            doc.addPage();
            y = margin;
          }
          doc.text(line, margin, y);
          y += lineHeight;
        });
        y += 6; // Extra space between steps
      });

      doc.save("assignment-timeline.pdf");
    };
  }

  // Add feedback button logic
  const feedbackBtn = document.getElementById('feedback-btn');
  if (feedbackBtn) {
    feedbackBtn.onclick = function() {
      window.open('https://docs.google.com/forms/d/e/1FAIpQLScGjoCU9KW7aR4jlmjI10SKbpqavCE4X8C2ceFkaLExmEQukg/viewform?usp=sharing&ouid=103979447744273921797', '_blank');
    };
  }
}, 0);
});


document.getElementById('assignment-form').addEventListener('input', function() {
document.getElementById('timelineBreakdown').innerHTML = '';
});



const menuBtn = document.getElementById('menuBtn');
const menuPanel = document.getElementById('menuPanel');
const menuLinks = menuPanel.querySelectorAll('a');
const overlay = document.getElementById('overlay');
const bodyEl = document.body;
const sidebar = document.querySelector('.sidebar');
const rightColumn = document.querySelector('.logo-bg-column');

function toggleMenu(){
  const isOpen = menuPanel.classList.toggle('open');
  overlay.classList.toggle('visible', isOpen);
  menuBtn.classList.toggle('open', isOpen);
  menuBtn.setAttribute('aria-expanded', isOpen);
  menuPanel.setAttribute('aria-hidden', !isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
  menuLinks.forEach(link => {
    if (isOpen) {
      link.removeAttribute('tabindex');
    } else {
      link.setAttribute('tabindex', '-1');
    }
  });
}

function closeMenu(){
  menuPanel.classList.remove('open');
  overlay.classList.remove('visible');
  menuBtn.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
  menuPanel.setAttribute('aria-hidden', 'true');

  document.body.style.overflow = ''; 
  
  menuLinks.forEach(link => {
    link.setAttribute('tabindex', '-1');
  });
}

menuBtn.addEventListener('click', toggleMenu);
overlay.addEventListener('click', closeMenu);



