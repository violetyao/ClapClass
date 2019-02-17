# ClapClass.io -- A Treehacks 2019 Project

## Inspiration
We sit randomly in a large lecture hall, rush out when class ends. It’s never easy to find new, trustworthy buddies with similar interests and schedule. 

## Core objective
Clapclass.io is a smart platform to help students find study buddies with similar study philosophy and schedule while providing a series of useful tools to boost cooperation in study groups.

### Group Matching
Aside from current course load, ClapClass asks users to fill out a work philosophy survey, including attitudes towards extra credits, preferred studying time, preference over pulling an all nighter or planning tasks for several days, etc. Based on what classes users are taking and their respective study habits, we match a user with several recommended study groups. Cliking on different groups’ info pages, user will decide which study group to join.

The matching algorithm that computes the “correlation” between the user and study a group, we make sure the group covers the classes that the user selected, and rank each group based on the combination of the correlations between the user and each of the group member. 

To speed up the computation, we use priority queue to store the groups and their respective ranking.

#### Partner Page
A row of checkboxes at the top. Each cooresponds to a class which you haven't have a study group for. Select multiple boxes to indicate which classes you want a study group.

A list of recommendations below the checkboxes. These are recommendations of viable plans.(each plan is a combination of several groups, together cover all the classes checked). Beside each plan you can apply


### Study Group Toolkit
#### Co-note-taking
Taking notes on Google Doc with your study group! 
#### When-to-Meet
Easy Interface to schedule a meeting and reserve study room in Library.

## Interface
![alt text](https://github.com/violetyao/treehacks/blob/master/sketch/ClapClass_processon%201.25%20am.jpg)

## How we built it
We used Firebase as our backend. We used vanilla JS and jQuery as our frontend. We also used python packages including beautifulsoup, requests, and json to acquire and process class information. 

## Challenges we ran into
We are totally new in web development. It took us a while to pick up things.
Race conditions are hard to deal with. Hard to rewrite code to accommodate callback functions.

## Accomplishments that we are proud of
Crawled 6000+ classes in less than an hour.

## What we learned
How to use different libraries, such as firebase APIs and NoSQL, and Dreamweaver is a great tool to visualize and locate code!

## What's next for ClapClass
We would incorporate more study group features, such as grabing food together when group members' available time slots are close during meal time. We also plan to implement a credit system. Showing up on time for group meetings and sharing lecture notes will increase credit and vice versa. 

## API
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
