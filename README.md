## This project was built for phase 1 of the Microsoft Student Accelerator programme, it's also my first journey into web development!

The requirements of the project were to: 

- Create a new web app with React + Typescript
- Connect the web app to a 3rd party REST API
- Allow the user to enter information relevant to the chosen API and display what the API returns based on what they entered
- Use a UI component library
- Use Docker to build our web app into a Docker image
- Use Azure Web App for Containers to deploy our docker image
- Use Github for source control

## This submission

This submission is a web-app that searches for anime on [myanimelist.net](https://myanimelist.net/) via the [Jikan](https://jikan.moe/) REST API. As this was my first time doing anything on the web, I tried to keep things simple as I would be learning a lot of different things at the same time.

The sites current functions are: 

- Searching for anime via the searchbar and displaying the results
- Displaying the current weeks schedule for anime releases on the homepage

Underneath the hood I had to figure out how to do a lot of things which I'd never even though about, particularly challenging for me were: 

- Getting the URL in the address bar to reflect the current page content
- Allowing the user to make use of the forward and back buttons in their browser
- Positioning things on the screen (why is centering things so hard?!)
- Getting the page to display properly on a range of screen widths (arbitrarily chosen to be anything fromm 320px to 1920px)

There's a lot of things I would've done differently now that I know more, as the more I learnt, the more time I spent going back to fix things I'd done earlier! There's also a lot of things I wanted to add but couldn't figure out.
