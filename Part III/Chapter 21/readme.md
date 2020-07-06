# Chapter 21
## Project: Skill-Sharing Website

The following exercises will involve modifying the system defined in this chapter. To work on them, make sure you download the code first (https://eloquentjavascript.net/code/skillsharing.zip), have Node installed https://nodejs.org, and have installed the project’s dependency with npm install.

###### Exercises:
<br>
1. <b>Disk persistence</b>

<br>The skill-sharing server keeps its data purely in memory. This means that when it crashes or is restarted for any reason, all talks and comments are lost.

Extend the server so that it stores the talk data to disk and automatically reloads the data when it is restarted. Do not worry about efficiency—do the simplest thing that works.

<br>
2. <b>Comment field resets</b>

<br>The wholesale redrawing of talks works pretty well because you usually can’t tell the difference between a DOM node and its identical replacement. But there are exceptions. If you start typing something in the comment field for a talk in one browser window and then, in another, add a comment to that talk, the field in the first window will be redrawn, removing both its content and its focus.

In a heated discussion, where multiple people are adding comments at the same time, this would be annoying. Can you come up with a way to solve it?

<br>