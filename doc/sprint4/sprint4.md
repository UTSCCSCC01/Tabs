<p>
  <a href="#sprint-3-planning-meeting-&-participants">Meeting & Participants</a> •
  <a href="#goals">Goals</a> •
  <a href="#user-stories-task-breakdowns">User Stories & Task Breakdowns</a> •
  <a href="#user-stories-task-breakdowns">Spikes</a> •
  <a href="#team-capacity">Team Capacity</a>
</p>

## Sprint 3 Planning Meeting & Participants
____
10/24/2022: Sprint 3  Planning Meeting

Topics: Sprint 3 User Stories, Task Breakdowns, Planning Poker, Task Distribution, Assigning Deliverables

We have user stories that were broken down from Sprint 2, for instance a user story for a page frontend and another for its' backend connection. We prioritize the stories/tasks for connecting the frontend and backend of existing components. Additionally, we felt comfortable taking on more story points for this Sprint.

### Participants
All [Team Tabs members](https://github.com/UTSCCSCC01/Tabs/blob/main/doc/sprint0/team.md) were present (Gigi Cheang, Young Chen, Tyler Cong, Klein Harrigan, Crystal Huang, John Ma)

## Goals

For Sprint 4, our goals are as followed:
> Finish the the designated user stories for this sprint
> Complete all Sprint 4 deliverables mentioned in handout

### Trello Issues
Link to all Trello issues related to the goals above [here](https://trello.com/invite/b/0YuDT3a1/ATTIee650a0dca039f4fe68b0aac77b9b7e26F367871/scrum-board) Note, that you will be a member.

Note: Trello issues will be labeled as `inventory`, `navigation`, and `rent`, respective to the goals.

## User Stories / Task Breakdowns

- I as an accommodation admin should be able to add/remove appliances like washing machines so that the app accurately reflects the number available (Backend-connection)
    - TABS-117 Appliances Backend connection

- I as a roommate should be able to sign up and log in to the app using my phone number so that my information can be stored across devices
    - TABS-125 Signup/login connection
    - TABS-83 User DB model and typedefs
    - TABS-94-HouseMember-Backend
    - TABS-121 Login Page
    - TABS-84 Sign up page
    - TABS-120 House member dashboard (Rework home page and nav bar)

- I as a roommate should be able to inform the entire house that I am using an appliance like the washing machine so that they can find out without asking me or checking physically (Backend Connction)
    - TABS-117 Appliances Backend connection

- I as a roommate should be able to view other roommates’ usual sleeping hours/periods of preferred quiet time so I can avoid noise complaints
    - TABS-119: View Roommates' Profiles (See all roommates)
    - TABS-98: Roommate profile page (Individual)
    - TABS-128 Backend Connection for Roommate Profile Page (Individual)

- I as a roommate should be able to inform the entire house that I am busy and currently cannot respond to contact so they do not think I am ignoring them
    - TABS-40 Set status to busy or not busy on roommate profile page

- I as a roommate should be able to inform all other roommates of my usual sleeping hours, or periods of time where I would prefer less noise (online classes, exams, etc.) so my roommates can respect my quiet time
    - TABS-98: Roommate profile page (Individual)
    - TABS-128 Backend Connection for Roommate Profile Page (Individual)


- Additional Tasks:
    - Bug fixes, hot fixes, documentation, sprint deliverables

## Acceptance Criteria
- Features must work based on what they are ((generally))

- I as an accommodation admin should be able to add/remove appliances like washing machines so that the app accurately reflects the number available (Backend-connection)
    - The backend should have the functions necessary to add/remove appliances

- I as a roommate should be able to sign up and log in to the app using my phone number so that my information can be stored across devices
    - backend should have a login and sign up mutation
    - backend should be able to store a phone number as a username
    - frontend should have a menu to login and sign up

- I as a roommate should be able to inform the entire house that I am using an appliance like the washing machine so that they can find out without asking me or checking physically (Backend Connction)
    - backend should have a queue to who is using it
    - backend should have a scheduling mechanic for an appliance

- I as a roommate should be able to view other roommates’ usual sleeping hours/periods of preferred quiet time so I can avoid noise complaints
    - should have a profile to show the sleeping hours/preferred quiet time on the front end

- I as a roommate should be able to inform the entire house that I am busy and currently cannot respond to contact so they do not think I am ignoring them
    - should be able to change the profile status to busy or available on the frontend

- I as a roommate should be able to inform all other roommates of my usual sleeping hours, or periods of time where I would prefer less noise (online classes, exams, etc.) so my roommates can respect my quiet time
    - should have a way to put the sleeping hours/preferred quiet time on the front end


## Spikes
- A couple of spikes was that we had to do research on hashing passwords and storing them safely in the database, and figure out how to create a session for the user.


## Team Capacity
| Member         | Estimated hours of work per day |
| -------------  | --------------------------------|
| Gigi Cheang    | 2-3                             |
| Young Chen     | 1                               |
| Tyler Cong     | 2-3                             |
| Klein Harrigan | 3                               |
| Crystal Huang  | 3                               |
| John Ma        | 3                               |

### Total Team Capacity for Sprint 1 (2 weeks):
> 15 hours per day
>
> 105 hours per week
>
> 210 hours total
