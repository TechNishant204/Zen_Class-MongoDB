// this is a sequence of commands to be executed in mongo shell
db = connect('mongodb://localhost/myDatabase');

use ZenClassDB;  // create a database named ZenClassDB if doesn't exist


// Design database for Zen class programme
// users
// codekata
// attendance
// topics
// tasks
// company_drives
// mentors

db.createCollection("users")
db.createCollection("codekata")
db.createCollection("attendance")
db.createCollection("topics")
db.createCollection("tasks")
db.createCollection("companyDrives")
db.createCollection("mentors")

// ADD DATA TO YOUR COLLECTION

// add users
db.users.insertMany([
    { _id: ObjectId("1"), name: "ansh saxena", email: "ansh@main.com", codekataSolved: 120 },
    { _id: ObjectId("2"), name: "priyanka yadav", email: "priyanka@email.com", codekataSolved: 80 }
]);

// add codekata
db.codekata.insertMany([
    {
        _id: ObjectId("1"),
        userId: ObjectId("1"),
        userName: "ansh saxena",
        problemsSolved: [
            { problemId: "P101", solvedAt: ISODate("2025-03-01") },
            { problemId: "P102", solvedAt: ISODate("2025-03-02") }
        ],
        totalSolved: 120
    },
    {
        _id: ObjectId("2"),
        userId: ObjectId("2"),
        userName: "priyanka saxena",
        problemsSolved: [
            { problemId: "P103", solvedAt: ISODate("2025-03-01") },
            { problemId: "P104", solvedAt: ISODate("2025-03-03") }
        ],
        totalSolved: 80
    }
]);

// add attendance
db.attendance.insertMany([
    {
        _id: ObjectId("1"),
        userId: ObjectId("1"),
        userName: "ansh saxena",
        attendanceRecords: [
            { date: ISODate("2025-03-01"), status: "present" },
            { date: ISODate("2025-03-02"), status: "absent" }
        ]
    },
    {
        _id: ObjectId("2"),
        userId: ObjectId("2"),
        userName: "priyanka saxena",
        attendanceRecords: [
            { date: ISODate("2025-03-01"), status: "absent" },
            { date: ISODate("2025-03-02"), status: "present" }
        ]
    }
]);

// add topics
db.topics.insertMany([
    { _id: ObjectId("301"), name: "JavaScript Basics", taughtOn: ISODate("2025-10-01"), mentorId: ObjectId("101"), mentorName: "Mentor A" },
    { _id: ObjectId("302"), name: "MongoDB Fundamentals", taughtOn: ISODate("2025-10-15"), mentorId: ObjectId("101"), mentorName: "Mentor A" }
]);

// add tasks
db.tasks.insertMany([
    {
        _id: ObjectId("201"),
        topicId: ObjectId("301"),
        topicName: "JavaScript Basics",
        description: "Complete your JS problems",
        dueDate: ISODate("2025-10-20"),
        submissions: [
            { userId: ObjectId("1"), userName: "ansh saxena", status: "submitted", submittedAt: ISODate("2025-10-19") },
            { userId: ObjectId("2"), userName: "priyanka yadav", status: "not submitted" }
        ]
    },
    {
        _id: ObjectId("202"),
        topicId: ObjectId("302"),
        topicName: "MongoDB Fundamentals",
        description: "Write MongoDB Aggregation queries",
        dueDate: ISODate("2025-10-30"),
        submissions: [
            { userId: ObjectId("1"), userName: "ansh saxena", status: "submitted", submittedAt: ISODate("2025-10-28") }
        ]
    }
]);

// add company drives
db.companyDrives.insertMany([
    {
        _id: ObjectId("401"),
        companyName: "Google",
        date: ISODate("2025-02-15"),
        studentsAppeared: [
            { userId: ObjectId("1"), userName: "ansh saxena" }
        ]
    },
    {
        _id: ObjectId("402"),
        companyName: "Amazon",
        date: ISODate("2025-02-25"),
        studentsAppeared: [
            { userId: ObjectId("2"), userName: "priyanka yadav" }
        ]
    }
]);

// add mentors
db.mentors.insertOne({
    name: "Mentor A",
    mentees: [
        { userId: ObjectId("1"), userName: "ansh saxena" },
        { userId: ObjectId("2"), userName: "priyanka yadav" }
    ]
});

// QUERIES

// 1. Find all the topics and tasks which are taught in the month of October
db.topics.find({
    taughtOn: { $gte: ISODate("2024-10-01"), $lte: ISODate("2024-10-31") }
});

db.tasks.find({
    dueDate: { $gte: ISODate("2024-10-01"), $lte: ISODate("2024-10-31") }
});

// 2. Find all the company drives between 15 Oct 2020 and 31 Oct 2020
db.companyDrives.find({
    date: { $gte: ISODate("2020-10-15"), $lte: ISODate("2020-10-31") }
});

// 3. Find all the company drives and students who appeared for placement
db.companyDrives.find({});

// 4. Find the number of problems solved by each user in codekata
db.codekata.find({}, { userName: 1, totalSolved: 1 });

// 5. Find all the mentors with who has the mentee's count more than 15
db.mentors.find({
    mentees: { $size: { $gt: 15 } }
});

// 6. Find the users who were absent and did not submit a task between 15 Oct 2020 and 31 Oct 2020
db.attendance.find({
    "attendanceRecords.date": { $gte: ISODate("2020-10-15"), $lte: ISODate("2020-10-31") },
    "attendanceRecords.status": "absent"
});

db.tasks.find({
    "submissions.status": { $ne: "submitted" },
    dueDate: { $gte: ISODate("2020-10-15"), $lte: ISODate("2020-10-31") }
});

// NB - we didn't do aggregations yet to solve 6. properly
