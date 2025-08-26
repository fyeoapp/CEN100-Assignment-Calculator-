document.addEventListener('DOMContentLoaded', function() {
  // Expanded assignment breakdowns for each class/assignment
  const assignmentBreakdowns = {
    CEN100: {
      matlab: [
        { title: "Understand the Assignment", details: "Read and understand the assignment instructions. Clarify any doubts with your instructor." },
        { title: "Review MATLAB Concepts", details: "Review relevant MATLAB concepts and tutorials needed for the assignment." },
        { title: "Set Up MATLAB Environment", details: "Set up your MATLAB environment and create a project folder." },
        { title: "Draft Solution Plan", details: "Draft pseudocode or a flowchart for your solution." },
        { title: "Implement Section 1", details: "Write initial MATLAB code for the first section." },
        { title: "Test Section 1", details: "Test and debug the first section." },
        { title: "Implement Section 2", details: "Write code for the second section." },
        { title: "Test Section 2", details: "Test and debug the second section." },
        { title: "Integrate and Test", details: "Integrate all sections and test the complete program." },
        { title: "Optimize Code", details: "Review and optimize your code for efficiency." },
        { title: "Add Comments and Documentation", details: "Add comments and documentation to your code." },
        { title: "Final Testing", details: "Run final tests with sample data." },
        { title: "Prepare Submission", details: "Prepare your submission files." },
        { title: "Submit Assignment", details: "Submit your assignment before the deadline." }
      ],
      disaster: [
        "Read and understand the project requirements.",
        "Research several real-world engineering disasters.",
        "Select your disaster topic and get approval if needed.",
        "Gather sources and references.",
        "Draft a project outline and assign group roles (if group work).",
        "Begin writing the introduction and background.",
        "Analyze the disaster and document key findings.",
        "Create visuals, diagrams, or charts.",
        "Write the main body of the report.",
        "Draft the conclusion and recommendations.",
        "Edit and revise the report.",
        "Prepare for any presentations.",
        "Finalize and proofread the report.",
        "Submit your project and presentation materials."
      ],
      reverse: [
        "Select a device or process to reverse engineer.",
        "Research the device/process background.",
        "Disassemble/analyze and document findings.",
        "Take detailed notes and photographs.",
        "Create diagrams and sketches.",
        "Draft the introduction and objectives.",
        "Describe the disassembly/analysis process.",
        "Document each component or step.",
        "Analyze how the device/process works.",
        "Write your report draft.",
        "Review and finalize your documentation.",
        "Edit and proofread the report.",
        "Prepare your submission files.",
        "Submit your project."
      ],
      final: [
        "Gather all course notes and past assignments.",
        "List all exam topics and objectives.",
        "Create a detailed study schedule.",
        "Review one topic per session.",
        "Complete practice problems for each topic.",
        "Attend review sessions or study groups.",
        "Work through past exams and quizzes.",
        "Identify and focus on weak areas.",
        "Ask questions to your instructor or peers.",
        "Summarize key formulas and concepts.",
        "Take short breaks and rest.",
        "Review all summaries and notes.",
        "Prepare exam materials (ID, calculator, etc).",
        "Rest well before the exam day."
      ],
      whmis: [
        { title: "Access WHMIS Course", details: "Log in to D2L and locate the WHMIS Certification System course." },
        { title: "Complete Module 1", details: "Work through all content and quizzes in Module 1." },
        { title: "Complete Module 2", details: "Work through all content and quizzes in Module 2." },
        { title: "Review Results", details: "Check your quiz results and ensure both modules are complete." },
        { title: "Download Certificate", details: "Download or screenshot your WHMIS certificate if required." },
        { title: "Submit Proof", details: "Upload your certificate or proof of completion to D2L as instructed." }
      ],
      email: [
        { title: "Read Assignment Instructions", details: "Carefully read the EMAIL ASSIGNMENT instructions and requirements." },
        { title: "Draft Your Email", details: "Write a draft of your email, following the guidelines provided." },
        { title: "Review and Edit", details: "Check your email for clarity, tone, and professionalism. Edit as needed." },
        { title: "Finalize Email", details: "Make final adjustments and ensure all requirements are met." },
        { title: "Submit Assignment", details: "Submit your email assignment as instructed (via D2L or email)." }
      ],
      notebook: [
        { title: "Review Notebook Requirements", details: "Check the guidelines for your Personal Design Notebook entries." },
        { title: "Plan Weekly Entries", details: "Schedule time each week to update your notebook." },
        { title: "Create New Entries", details: "Add ~8 new entries for this submission period, reflecting on your design process and learning." },
        { title: "Organize and Format", details: "Ensure entries are organized, dated, and clearly written in OneNote." },
        { title: "Review and Edit", details: "Proofread your entries and make any necessary improvements." },
        { title: "Submit Notebook", details: "Share or submit your updated notebook as required (export, share link, or upload to D2L)." }
      ]
    },
  };

  function getStepDates(start, end, steps) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const totalDays = Math.max(1, Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)));
    const stepDates = [];
    for (let i = 0; i < steps; i++) {
      const stepDay = new Date(startDate.getTime() + (i * totalDays / (steps - 1)) * 24 * 60 * 60 * 1000);
      stepDates.push(stepDay.toISOString().slice(0, 10));
    }
    return stepDates;
  }

  function renderPlanningGuide(steps, stepDates) {
    const guideDiv = document.getElementById('planning-guide');
    let html = '';
    steps.forEach((step, i) => {
      html += `
        <div class="step-accordion" id="step-accordion-${i}">
          <button class="step-header" type="button" onclick="toggleStep(${i})">
            <span>Step ${i + 1}: ${stepDates[i]} – ${step.title}</span>
            <span class="step-icon">&#9654;</span>
          </button>
          <div class="step-content">${step.details}</div>
        </div>
      `;
    });
    guideDiv.innerHTML = html;
  }

  // Toggle function (add this globally)
  window.toggleStep = function(idx) {
    const acc = document.getElementById(`step-accordion-${idx}`);
    acc.classList.toggle('open');
  };

  // Only declare these ONCE:
  const startDateInput = document.getElementById('start-date');
  const dueDateInput = document.getElementById('due-date');
  const calendarGrid = document.getElementById('calendar-grid');
  const calendarSelectMode = document.getElementById('calendar-select-mode');
  const selectStartBtn = document.getElementById('select-start-btn');
  const selectDueBtn = document.getElementById('select-due-btn');
  const calendarTitle = document.getElementById('calendar-title');

  document.getElementById('calculate-btn').addEventListener('click', function() {
    const selectedAssignment = document.getElementById('assignment-select').value;
    const startDate = document.getElementById('start-date').value;
    const dueDate = document.getElementById('due-date').value;

    if (selectedAssignment && startDate && dueDate) {
      const steps = assignmentBreakdowns.CEN100[selectedAssignment];
      if (!steps) return;
      const stepDates = getStepDates(startDate, dueDate, steps.length);
      renderPlanningGuide(steps, stepDates);
      document.getElementById('planning-guide-container').scrollIntoView({ behavior: 'smooth' });
    } else {
      document.getElementById('planning-guide').innerHTML = '';
    }
  });
});