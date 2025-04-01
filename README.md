# Documentation
**Explain the motivation for your application.  What can it allow someone to understand?**  
This application was designed to be an interactive site for people to examine earthquakes and gather information on them through interaction with filters and timelines. This can allow someone to understand where earthquakes are common, what times they occur most, the magnitude and depth distribution, or any other relevant earthquake data. We chose to use a timeline at the bottom as its easiest to display the trends over time as well as select period of time that may be of interest. For the bar charts for magnitude and depth, we thought that would be the best way to show their distributions as it is easy to interpret which is most prevalent and which do not occur often. Finally we provided some easy to use filters at the top to either show the map as street, topographical, or satellite, a size by magnitude toggle, a color drop down for by magnitude, depth, or year, and a date range picker to easily filter as to allow the most freedom to explore the data.

**Describe the data and include a link.**  
The data is a collection of all earthquakes between 2024 and up to March 3 of 2025. The set contains variables and values for all of the following data: time, latitude, longitude, depth, mag, magType, nst, gap, dmin, rms, net, id, updated, place, type, horizontalError, depthError, magError, magNst, status, locationSource, and magSource.  
<img width="1079" alt="image" src="https://github.com/user-attachments/assets/d33f1019-2174-4aa9-bcb4-00a2ec6df048" />  
Of this data we present the time, place, depth and magnitude by the way of a tooltip when hovering over a specific quake.  
<img width="568" alt="image" src="https://github.com/user-attachments/assets/5a15c671-e360-4376-a13e-68697235e92d" />  
And finally we use bar charts to show magnitude and depth as well as a line chart to show quakes over time.  
<img width="508" alt="image" src="https://github.com/user-attachments/assets/24717e22-4827-4c79-bd91-5b53d17765f0" />  
<img width="1429" alt="image" src="https://github.com/user-attachments/assets/cb73c163-25fa-439a-955c-3efdf6c90965" />  
data link: https://github.com/elipappas/VID_Project2/blob/main/leaflet-d3-example-2025/data/2024-2025.csv

**Explain each view of the data, the GUI, etc.  Explain how you can interact with your application, and how the views update in response to these interactions.**   

**This time, include a section with your design sketches and design justifications.**  

**1 section on what your application enables you to discover: Present some findings you arrive at with your application.**  

**1 section on your process- what libraries did you use?  How did you structure your code?  How can you access it and run it?  Link to your code (and the live application, if it is deployed online).**  

**Include a 2-3 minute demo video, showing your application in action.  The easiest way to record this is with a screen capture tool, which also captures audio- such as Quicktime.  Use a voiceover or video captions to explain your application.  Demo videos should be sufficient on their own, but can reference your documentation.  Include the name of the project, your name, the project components, and how your application works.  You can present it on your webpage or on youtube, but linked on your webpage.** 

https://youtu.be/SqJMKjUhsto 

**This time, document who on your team did which component of the project.  Ex.  If someone worked on the data, and on bar charts, list their effort on these components.**  
Eli Pappas - Level 2, Level 6 (show quake clicked on in the graph and bar charts), assisted with styling for clickability on charts

Nate Heath - Level 1, Level 3
