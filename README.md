# Documentation
**Explain the motivation for your application.  What can it allow someone to understand?**  
This application was designed to be an interactive site for people to examine earthquakes and gather information on them through interaction with filters and timelines. This can allow someone to understand where earthquakes are common, what times they occur most, the magnitude and depth distribution, or any other relevant earthquake data.

**Describe the data and include a link.**  
The data is a collection of all earthquakes between 2024 and up to March 3 of 2025. The set contains variables and values for all of the following data: time, latitude, longitude, depth, mag, magType, nst, gap, dmin, rms, net, id, updated, place, type, horizontalError, depthError, magError, magNst, status, locationSource, and magSource.  Of this data we present the depth, magnitude and time in different ways such as graphs or bar charts, and we present the place and other stats in the tooltip when hovering over a specific quake.  
data link: https://github.com/elipappas/VID_Project2/blob/main/leaflet-d3-example-2025/data/2024-2025.csv

**Explain each view of the data, the GUI, etc.  Explain how you can interact with your application, and how the views update in response to these interactions.**   

**This time, include a section with your design sketches and design justifications.**  

**1 section on what your application enables you to discover: Present some findings you arrive at with your application.**

Our application allows one to discover fault lines in the earth's crust. You can also see how deep these fault lines go by filtering by depth and filtering by time shows the frequency of earthquake events. You can very easily find that many of the most active areas are on top of the deepest fault lines. You can also see that many earthquakes occur within a small area within a very short time frame, so what we might feel as a single earthquake could be many shifts in the earth's crust propogated out from a single event. 

**1 section on your process- what libraries did you use?  How did you structure your code?  How can you access it and run it?  Link to your code (and the live application, if it is deployed online).**  

We structured our code in an object-oriented manner. Each area in the visualization has it's own object whose class definition can be found in one of the files depthBarChart.js, leafletMap.js, magnitudeBarChart.js, and timeSeriesChart.js. We used uninitialized variables that are later defined and passed functions as arguments to the visualization constructors in the main script for connecting the different components together (such as giving the timeSeriesChart brushing the ability to filter the data shown in the leafletMap and more). As long the browser the webpage is accessed with can run javascript, the application can be run simply by opening the index.html file. Our application is also hosted at: https://elipappas.github.io/VID_Project2/leaflet-d3-example-2025/ .

**Include a 2-3 minute demo video, showing your application in action.  The easiest way to record this is with a screen capture tool, which also captures audio- such as Quicktime.  Use a voiceover or video captions to explain your application.  Demo videos should be sufficient on their own, but can reference your documentation.  Include the name of the project, your name, the project components, and how your application works.  You can present it on your webpage or on youtube, but linked on your webpage.** 

https://youtu.be/SqJMKjUhsto 

**This time, document who on your team did which component of the project.  Ex.  If someone worked on the data, and on bar charts, list their effort on these components.**  
Eli Pappas - Level 2, Level 6 (show quake clicked on in the graph and bar charts), assisted with styling for clickability on charts

Nate Heath - Level 1, Level 3

Freja Kahle - Level 5, assisted in bug fixing for level 4
