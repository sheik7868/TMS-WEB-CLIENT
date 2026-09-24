# Application Name
TMS - Task Management System 

# Version
1.0.0

# Tools
Node – V18.16.0 
Microsoft Visual Studio Code – V1.83.1 

# Description
This is the Presentation layer of the TMS application. The user interacts with this layer only. From this layer the requests are made and forward to the GateWay.

# Features Names
```
Task Feature
Search Feature
```

# Components List
```
TopBar.tsx - This file contains the application info and the login user info. 
taskLayout.tsx - This file contains the count component , search component and the create button component.
taskList.tsx - This file contains the table component for the task. 
taskForm.tsx - This file contains the create and edit both form component.
Footer.tsx - This file contains the Powered by footer component.
```

# How to run ?
This is the Presentation layer which is interact with user. So, that for this layer you have to run all other layers namely GateWay , Rest Data Access and DataBase.

```
WebClient  --> GateWay --> Rest Data Access --> DataBase
```

# Commands
Please use this below commands to clone the code

```yml
git clone https://goveindia@dev.azure.com/goveindia/Gloud-Academy/_git/TMS-WEB-CLIENT -b {branch-name}
```

To install the required NPM packages run the following command
```yml
npm install
```

To run the service run the following command
```yml
npm run local
```

# Dependencies
For the WebClient to run perfectly the Database,Data-Access-Layer and the Gateway Layer must be up and connected.

WebClient -- > GateWay --> Data Access --> DataBase