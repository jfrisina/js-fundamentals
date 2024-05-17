/* ASSIGNMENT INSTRUCTIONS-------------------------------------

We have: 
    - 1 object    
    - 1 object nested within an object
    - 1 object with an array of nested objects
    - 1 array of objects

Our goal: 
    - transform everything into an array of objects
    - each object must contain the following info, along with the rest of their corresponding info:

    {
        "id": number,              
        "avg": number,
        <assignment_id>: number,
    }



    - Create a function named getLearnerData() that accepts these values as parameters, in the order listed: (CourseInfo, AssignmentGroup, [LearnerSubmission]), and returns the formatted result, which should be an array of objects as described above.


END COMMENTS----------------------------------------------------*/


// Provided data --------------------------------------------------
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };

  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];

// START CODE -----------------------------------------------------------------------------------------------

  function getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions) {
  // data validation
  if (AssignmentGroup.course_id != CourseInfo.id) {
    throw "Course info does not match";
  }
	const learners = {};
	
	// find learner ID by iterating over each submission
	LearnerSubmissions.forEach(submission => {
	  const learnerID = submission.learner_id;
  
    // set assignment ID variable;  
    const assignmentID = submission.assignment_id;
  
    // create learner object with placeholder values
	  if (!learners[learnerID]) { // if the learnerID is not already in our new object
		learners[learnerID] = {     // then create a new learner object 
		  id: learnerID,            // set learnerID
		  totalScore: 0,            // set total score with undefined as a placeholder
		  totalPossible: 0,         // set total points possible with undefined as a placeholder
		  scores: {}                // add an empty object for all of the learner's scores since they can have more than one
		};
	  }
  
    // find the assignment info based on the learnerID
	  const assignment = AssignmentGroup.assignments.find(assignment => assignment.id === assignmentID); // search for the assignment id and assign it to a variable

    // check if assignment is due yet, and skip if isn't
	  if (assignment && new Date(submission.submission.submitted_at) < new Date(assignment.due_at)) {
      return;
    }
  
    // check if assignment submitted late
		if (assignment && new Date(submission.submission.submitted_at) > new Date(assignment.due_at)) {
    const latePenalty = assignment.points_possible * 0.1; // Deduct 10% of total points possible for late submission
    submission.submission.score -= latePenalty; // Deduct penalty from submission score
  }
		
    // add data validation for 0 possible points
      if (assignment.points_possible === 0) {
         throw "cannot calculate due to 0";
      } else {
        // add score to total score
        learners[learnerID].totalScore += submission.submission.score; // update the learner's score from 0 to the actual value
        learners[learnerID].totalPossible += assignment.points_possible; // update the matching assignment's possible points from 0 to the actual value
        learners[learnerID].scores[assignmentID] = submission.submission.score / assignment.points_possible * 100; // learner's score in percentage format
	  }
  });

	// Calculate average score for each learner
	const result = []; // create empty array variable for final result
	for (const learnerID in learners) { // for... in loop based on learner ID in our newly created and updated learner object
	  const learner = learners[learnerID];  // set variable for learner ID from our new learner object
	  const avg = learner.totalScore / learner.totalPossible * 100; // set variable for calculating average learner score
	  const learnerObj = { // set a new object for our learner data
		id: learner.id, //populate the id with the learnerID 
		avg: avg, // add the average info 
		...learner.scores // add the learner scores using spread
	  };
	  result.push(learnerObj); // add the newly created object into the final result array 
	}
  


	return result; // return the final result
  }
  
  // Example usage:
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  console.log(result);