# ClapClass.io -- A Treehacks 2019 Project

## Inspiration
We sit randomly in a large lecture hall, rush out when class ends. It’s never easy to find new, trustworthy buddies with similar interests and schedule. 

## Core objective
Clapclass.io is a smart platform to help students find study buddies with similar study philosophy and schedule while providing a series of useful tools to boost cooperation in study groups.

## Interface
Home
Login/Signup
Dashboard
Find buddy
My Groups

Interface design can be found at ClapClass_processon. 

### Home
Simple Welcome page with login/Signup button

### Login/Signup

### Survey
Collect info about user study philosophy

## How we built it

## Challenges we ran into

## Accomplishments that We are proud of

## What we learned

## TODO

### Add Class
Simple interface to select what class 

### Dashboard
Partially working. Framework completed, need to put things inside.
Dashboard page to guide users to enter Group-Matching/My Groups.

Group-Matching leads to Partner Page. 
My Groups leads to lecture notes sharing, when2meet, etc.

### Partner Page
A row of checkboxes at the top. Each cooresponds to a class which you haven't have a study group for. Select multiple boxes to indicate which classes you want a study group.

A list of recommendations below the checkboxes. These are recommendations of viable plans.(each plan is a combination of several groups, together cover all the classes checked). Beside each plan you can apply

##API
get_user_name(userid) // Given a userId, return the corresponding username
get_stu_id(userid) // return the stuId given a userId
get_user_name(stuid) // return the username of corresponding stuId
get_user_list() // return a dictionary of {studentid: username}
get_userId_list() // return a dictionary of {userid : studentid}
get_subject_list() // return a list of all subjects
get_classes_list(subject) // return a list of all classes of a certain subject
get_user_class(userid) // return a list of all classes a certain userid is taking
get_class_user(class) // return all users of a certain class, return type:stuid
get_same_class(userid1, userid2) // return a list of all the same classes of userid1, userid2
get_same_user(class1, class2) // return a list of all the same users of two classes

