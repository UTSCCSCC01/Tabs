# Release Planning Meeting

## Participants

Klein Harrigan, Young Chen, Gigi Cheang, John Ma, Tyler Cong, Crystal Huang

## Release goals

### Inventory

For this project, we wish to allow the user to have access to an inventory system where they can add, modify, and delete the number of items in each category. This all should be accompanied by an easy-to-use user interface on the frontend so that the user can effeciently use our app.

One part of the inventory we're paying special attention to is the foods section, where the user will have the ability to set an expiration date as well as letting other members know to not touch their food (along with the default item settings).

Relevant user stories to this section are:


- I as a roommate should be able to modify the inventory so that it accurately represents the quantities of items we all have
- I as a roommate should be able to view and sort the food inventory by scarcity so that I can know what I should buy at the grocery store
- I as a roommate should be able to add and view expiration dates for food items so that all members of the household can see how long each item will last
- I as a roommate should get reminders about all upcoming food expiration dates so my roomates and I can use the food and prevent waste
- I as a roommate should be able to have a section in the inventory for items that I am not willing to share so that other roommates can avoid unknowingly using them

### Rent

Of course, one important part of keeping roommates around is to help pay the rent. Our app should be able to be notify the tenants that their rent needs to be paid near the payment date, and on a similar note, tenants should also be allowed to borrow money from each other (debt) and our app will keep track of those amounts.

The landlord should be able to set the monthly (or for whatever time period they set) rent, and each tenant should be able to see who still needs to pay that rent so that they can make sure everyone has paid.

Relevant user stories:

- I as an accommodation admin should be able to set the monthly rent of all roommates and its due date so that we all know who needs to pay what and when they need to do it 
- I as a roommate should get reminders about rent if it is due soon so that I can remember it before it is due 
- I as a roommate should be able to access a menu which states how much money is owed between myself and other roommates so that I do not have to keep track of it manually 
- I as a roommate should be able to form debt agreements with other roommates to signify that one of us owes the other money 

### Communication

Another important of being a roommates is communication. We plan to have a messaging system in our app, where the user will be able to text their fellow roommates. This messaging part of our app will be separated into two types: private messages between roommates and group messsages amongst all the roommates.

Another feature of our app will be anonymous messages. A roommates would be able to leave an anonymous message for another roommate as a general reminder or as a way to leave a complaint against them if they're doing something unlikeable.

As with the other parts of our app, this one should also be easy to use, and since this will include messaging, the messages the user sees should also be updated each time a new message is sent.

Sometimes, it may be awkward or weird to make an announcement each time you're doing something, so our app should also let the tenants set their status on their profile, so they can let everyone know what they're doing currently.

Relevant user stories:


- I as a roommate should be able to individually and as a group text my other roommates so that we can communicate both privately and publicly
- I as a roommate should be able to send and receive anonymous notes to another roommate so that all housemates can disclose sensitive advice or complaints respectfully 
- I as a roommate should be able to inform the entire house that I am busy and currently cannot respond to contact so they do not think I am ignoring them 

### Tasks

The app should also offer a way for roommates to delegate the household tasks or chores to one another so that the daily upkeep of the house is maintained. This means that each roommate is able to schedule chores, assign chores to people, and view the chores they've been assigned to. They'll be able to set the status of their chore, so that other roommates know if the chore still needs to be completed or if it has already been completed.

Like the rent system in our app, the tenants will receive reminders when they have chores assigned to them, as well as reminders when they have chores that need to be done soon.


- I as a roommate should be able to create (weekly, monthly) chores schedule (washing dishes, taking out trash, etc) so my housemates and I can remember who needs to do what on which day
- I as a roommate should be able to view daily chores/tasks so that I can be reminded of what I need to do today 
- I as a roommate should receive reminders to do assigned chores/tasks at a set time so that my roommates do not have to waste time reminding me
- I as a roommate should be able to delegate the chore/task to another roommate in the event I am unable to complete it so that the whole house knows that the delegate needs to do it in my stead

### Appliances

Roommates using our app will be able to see the available appliances that they can use, as well as notify other roommates that an applicance is in use when they're using it. The user interface for this page should be intuitive and quick to use, as we don't want the roommate to spend more time navigating our app than actually doing the chore.

Relevant user stories:

- I as a roommate should be able to inform the entire house that I am using an appliance like the washing machine so that they can find out without asking me or checking physically 

### Admin/landlord controls

Admins/landlords of a house will be able to modify information in the houses they own. This includes the tenants that live there, the appliances that are available, and the monthly rent to be paid. All this will be through an admin portal seperate from the usual roommate section so that the admin knows that they're viewing/editing important information in the app, and not just viewing what everyone else can see.

Relevant user stories:

- I as an accommodation admin should be able to add/remove appliances like washing machines so that the app accurately reflects the number available
- I as an accommodation admin should be able to add roommates to my home so that they can also interact with the app
- I as an accommodation admin should be able to remove roommates from my home so that they can no longer interact with the house on the app after moving out
- I as an accommodation admin should be able to set the monthly rent of all roommates and its due date so that we all know who needs to pay what and when they need to do it

## Completion date

We want to get everything done by the end of sprint 4, so for now the tentative completion date is November 18, 2022 (based on the tutorial schedule).
