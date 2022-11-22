<p>
  <a href="#sprint-1-planning-meeting-&-participants">Meeting & Participants</a> •
  <a href="#goals">Goals</a> •
  <a href="#user-stories-task-breakdowns">User Stories & Task Breakdowns</a> •
  <a href="#user-stories-task-breakdowns">Spikes</a> •
  <a href="#team-capacity">Team Capacity</a>
</p>

## Sprint 2 Planning Meeting & Participants
____
09/26/2022: Sprint2  Planning Meeting

Topics: Sprint 2 User Stories, Task Breakdowns, Planning Poker, Task Distribution, Transferring to Trello

We noticed there were some bugs from Sprint 1 that we needed to fix. We prioritize fixing them first, then connecting the frontend and backend . We also transferred a lot of precreated tasks onto Trello from Jira.

### Participants
All [Team Tabs members](https://github.com/UTSCCSCC01/Tabs/blob/main/doc/sprint0/team.md) were present (Gigi Cheang, Young Chen, Tyler Cong, Klein Harrigan, Crystal Huang, John Ma)

## Goals

For Sprint 2, our goals are as followed:
> Fix small bugs/make changes for infrastructure
> Finish the the designated user stories for this sprint
> Complete all Sprint 2 deliverables mentioned in handout
### Trello Issues
Link to all Trello issues related to the goals above [here](https://trello.com/invite/b/0YuDT3a1/ATTIee650a0dca039f4fe68b0aac77b9b7e26F367871/scrum-board) Note, that you will be a member.

Note: Trello issues will be labeled as `inventory`, `navigation`, and `rent`, respective to the goals.

## User Stories / Task Breakdowns

- I as a roommate should be able to modify the inventory so that it accurately represents the quantities of items we all have
    - TABS-84 Connect Inventory frontend to backend

- I as a roommate should be able to access a menu which states how much money is owed between myself and other roommates (in real time) so that I do not have to keep track of it manually
    - TABS-85 Debt Page Frontend/Backend Connection


- I as an accommodation admin should be able to view and set the monthly rent of all roommates and its due date so that we all know who needs to pay what and when they need to do it (Frontend)
    - TABS-91 Rent Admin Page (Frontend)


- I as a roommate should be able to form debt agreements with other roommates to signify that one of us owes the other money
    - TABS-30 Accept Requested debt agreements
        - Backend
        - Frontend

- I as a roommate should be able to have a section in the inventory for items that I am not willing to share so that other roommates can avoid unknowingly using them
    - TABS-16 Designate inventory category as private

- Extra Tasks:
    - Bug fixes, and some clean up for future code (simplifying imports)

## Acceptance Criteria
- Features must work based on what they are (generally)


- I as a roommate should be able to modify the inventory so that it accurately represents the quantities of items we all have
    - requests of adding or subtracting values of an item  to the backend
    - frontend changes depending is what is on the backend
    - creating an item sends a request to create an object in the backend

- I as a roommate should get reminders about all upcoming food expiration dates so my roommates and I can use the food and prevent waste
    - Notifications should be scheduled to be able to be pushed

- I as a roommate should be able to access a menu which states how much money is owed between myself and other roommates (in real time) so that I do not have to keep track of it manually
    - Backend should be able to call data for the amounts owed
    - Frontend should display the money owed after requesting data from the backend

- I as an accommodation admin should be able to view and set the monthly rent of all roommates and its due date so that we all know who needs to pay what and when they need to do it (Frontend)
    - show a list of monthly rents of the house members after requesting for backend data

- I as a roommate should be able to form debt agreements with other roommates to signify that one of us owes the other money
    - backend end should have a way to flag if an agreement is accepted, rejected or done nothing at all to it
    - frontend should be able to display debt agreements and see who is requesting a debt agreement after calling for debt objects

- I as a roommate should be able to have a section in the inventory for items that I am not willing to share so that other roommates can avoid unknowingly using them
    - backend should restrict non-admins from modifying the data of the setion
    - frontend should not show categories that are restricted

## Spikes
- Some bugs/coding style issues are carried onto this sprint, so it needed to be fixed before working on the new user stories


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
