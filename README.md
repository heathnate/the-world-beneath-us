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
The page starts by drawing the users attention to the leaflet map, which shows a dot at the location of each earthquake, each of which displays more data if the user hovers over them. The map also allows for zooming in to get a closer look at any specific geographic location. To the right of the map are two bar charts, these show the number of earthquakes sorted by magnitude or depth. If the user selectes a bar the leaflet map filters its data to only show the earthquakes represented by that bar. Meaning if you only want to see where earthquakes of a specific magnitude were located you could do so by selecting the appropriate bar. Finally there is a time series chart below the map, which shows the frequency of earthquakes over time. If the user selects a range in this it also filters the leaflet map, showing only the earthquakes that happened over a specific time span. This can also be achieved by manually selecting dates in a selection above the leaflet map.

**This time, include a section with your design sketches and design justifications.**  
![image](https://github.com/elipappas/VID_Project2/blob/main/leaflet-d3-example-2025/images/project%202%20sketch.png)
We were not certain what to design our page to look like, but we knew what elements were needed and chose a layout that highlights the central elements, the leaflet map, while supporting it and filling all available space so that no scrolling is required on the page.


**1 section on what your application enables you to discover: Present some findings you arrive at with your application.**

Our application allows one to discover fault lines in the earth's crust.

![image](https://github.com/user-attachments/assets/46d98cd9-4c7d-4db1-b4d4-2c03db68d9ee)

You can also see how deep these fault lines go by filtering by depth and filtering by time shows the frequency of earthquake events. You can very easily find that many of the most active areas are on top of the deepest fault lines. 

![image](https://github.com/user-attachments/assets/094eb746-764d-40c5-b2ed-595fb53a7613)

You can also see that many earthquakes occur within a small area within a very short time frame, so what we might feel as a single earthquake could be many shifts in the earth's crust propogated out from a single event. 

![image](https://github.com/user-attachments/assets/03bad7b9-ae72-4926-af1e-fb64a951361c)

**1 section on your process- what libraries did you use?  How did you structure your code?  How can you access it and run it?  Link to your code (and the live application, if it is deployed online).**  

We structured our code in an object-oriented manner. The only external library we used was [D3](https://d3js.org/). Each area in the visualization has it's own object whose class definition can be found in one of the files depthBarChart.js, leafletMap.js, magnitudeBarChart.js, and timeSeriesChart.js.

![image](https://github.com/user-attachments/assets/46ac15e7-96c7-49b3-be32-11d0ca7dda78)

We used uninitialized variables that are later defined and passed functions as arguments to the visualization constructors in the main script for connecting the different components together (such as giving the timeSeriesChart brushing the ability to filter the data shown in the leafletMap and more). 

![image](https://github.com/user-attachments/assets/dfda7272-47bf-4292-9a9e-7d63efd9811b) 

As long as the browser the webpage is accessed with can run javascript, the application can be run simply by opening the index.html file. Our application is also hosted at: https://elipappas.github.io/VID_Project2/leaflet-d3-example-2025/ .

**Include a 2-3 minute demo video, showing your application in action.  The easiest way to record this is with a screen capture tool, which also captures audio- such as Quicktime.  Use a voiceover or video captions to explain your application.  Demo videos should be sufficient on their own, but can reference your documentation.  Include the name of the project, your name, the project components, and how your application works.  You can present it on your webpage or on youtube, but linked on your webpage.** 

https://youtu.be/SqJMKjUhsto 

**This time, document who on your team did which component of the project.  Ex.  If someone worked on the data, and on bar charts, list their effort on these components.**  
Eli Pappas - Level 2, Level 6 (show quake clicked on in the graph and bar charts), assisted with styling for clickability on charts

Nate Heath - Level 1, Level 3

Freja Kahle - Level 5, assisted in bug fixing for level 4

Nick Bryant - Level 4
