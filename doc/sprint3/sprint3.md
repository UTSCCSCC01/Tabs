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

For Sprint 3, our goals are as followed:
> Finish the the designated user stories for this sprint
> Complete all Sprint 3 deliverables mentioned in handout

### Trello Issues
Link to all Trello issues related to the goals above [here](https://trello.com/invite/b/0YuDT3a1/ATTIee650a0dca039f4fe68b0aac77b9b7e26F367871/scrum-board) Note, that you will be a member.

Note: Trello issues will be labeled as `inventory`, `navigation`, and `rent`, respective to the goals.

## User Stories / Task Breakdowns

- I as an accommodation admin should be able to view and set the monthly rent of all roommates and its due date so that we all know who needs to pay what and when they need to do it (Backend Connection)
    - TABS-22 "Add Rent" Page Backend
    - TABS-102 Connect Admin Rent Page Frontend and Backend
    - TABS-101 Connect Rent Popups Front End and Backend


- I as a roommate should be able to create (weekly, monthly) chores schedule (washing dishes, taking out trash, etc.) so my housemates and I can remember who needs to do what on which day (ADMIN)
    - TABS-108 Assign Chores/Tasks Admin page

- I as a roommate should receive reminders to do assigned chores/tasks at a set time so that my roommates do not have to waste time reminding me
    - TABS-110: Reminders (notifications) of upcoming task deadline

- I as a roommate should get reminders about all upcoming food expiration dates so my roommates and I can use the food and prevent waste
    - TABS-13 Reminders of upcoming expiration dates

- I as an accommodation admin should be able to add/remove appliances like washing machines so that the app accurately reflects the number available (Frontend)
    - TABS-105: Edit Appliances Admin Page

- I as a roommate should be able to inform the entire house that I am using an appliance like the washing machine so that they can find out without asking me or checking physically (Frontend) 
    - TABS-106 View Appliances page (Frontend) 
    - Tabs-116 Popups for Appliances and Tasks

- I as a roommate should be able to view daily chores/tasks so that I can be reminded of what I need to do today (Frontend & Backend)
    - TABS-107 View Chores/Tasks page (Frontend)
    - TABS-111 Tasks-Backend

- I as a roommate should be able to have a section in the inventory for items that I am not willing to share so that other roommates can avoid unknowingly using them (Frontend, Backend connection) [TABS-93, TABS-103, TABS-104]
    - TABS-93 Create checkbox during category creation view for private designation
    - TABS-103 Connect Private Category Backend and Frontend
    - TABS-104 Edit Category Page (Frontend Inventory)

- Additional Tasks:
    - Bug fixes, hot fixes, documentation, sprint deliverables

## Acceptance Criteria
- Features must work based on what they are ((generally))

- I as an accommodation admin should be able to view and set the monthly rent of all roommates and its due date so that we all know who needs to pay what and when they need to do it (Backend Connection)
    - Frontend should be able to add a new monthly rent
    - Backend should be able to view new or updated monthly rent added from database
    - Frontend should be able to modify a roomates rent amount

- I as a roommate should be able to create (weekly, monthly) chores schedule (washing dishes, taking out trash, etc.) so my housemates and I can remember who needs to do what on which day (ADMIN)
    - Frontend should be able to create chores/tasks
    - Frontend should be able to assign roommates to created chores/tasks

- I as a roommate should receive reminders to do assigned chores/tasks at a set time so that my roommates do not have to waste time reminding me
    - Frontend should be able to receive a push notification at the set time for a chore/task
    - Notification includes chore/task in question and details
    - Able to trigger the notification by setting a time/chore (for testing)

- I as a roommate should get reminders about all upcoming food expiration dates so my roommates and I can use the food and prevent waste
    - Frontend should be able to receive a push notification x amount of time before a food item expires
    - Notification includes food item and expiration details
    - Able to trigger the notification by setting a food item & expiration date (for testing)

I as an accommodation admin should be able to add/remove appliances like washing machines so that the app accurately reflects the number available (Frontend)
    - Frontend should have a button that allows the user to add a new appliance

- I as a roommate should be able to inform the entire house that I am using an appliance like the washing machine so that they can find out without asking me or checking physically (Frontend) 
    - Frontend should display appliances' name, availability, and schedule

- I as a roommate should be able to view daily chores/tasks so that I can be reminded of what I need to do today (Frontend & Backend)
    - Frontend should display a checklist of chores/tasks
    - Backend should keep track of a list of completed and uncompleted tasks

- I as a roommate should be able to have a section in the inventory for items that I am not willing to share so that other roommates can avoid unknowingly using them (Frontend, Backend connection) [TABS-93, TABS-103, TABS-104]
    - Frontend should have a checkbox in category creation for private designation
    - Backend should restrict non-admins from modifying private categories

## Spikes
- We realized that we needed to test our pages/components on both Android and iOS, as sometimes there were components that worked on one but not the other. This resulted in a number of bugs that needed to be hotfixed. Additionally, we were very ambitious in taking on a greater amount of story points and this resulted in more spikes and general activity towards the end of Sprint 3, as indicated by our burndown chart.


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
