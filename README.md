# Cellular Automata and Conway's "Game of Life"

---

Welcome to John Conway's "Game of Life"! This is a computer science
classic from 1970, a program that simulates a _cellular automaton_
(plural _automata_). It has connections to all kinds of different
aspects of computer science and nature.

Over the course of this week, students will work on creating their own
application in which users will be able to run different "Game of Life"
scenarios. This module leads the reader through the fundamentals of
Conways's "Game of Life" and will guide them through the process of
creating an app utilizing tools and frameworks that have been taught
over the course of their specific track.

![example-patterns](https://media.giphy.com/media/4VVZTvTqzRR0BUwNIH/giphy.gif)

[from Wikipedia](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Examples_of_patterns)

## Collaboration

This is a solo project, not a team project. Each person will be expected
to make their own repo and do their own coding.

That said, we _encourage_ cooperation during the Understand, Plan, and
Reflect phases of UPER. It's the Execution that everyone will have to do
their own work for.

This doesn't mean you can't ask for help during coding. Definitely feel
free to reach out. But there won't be any pair programming or splitting
the project into different chunks for different people.

## Clone this repo?

Or start from scratch?

Recommend starting from scratch. That way you'll have a clean commit
history and won't have to worry about merging changes from this
informational repo in yours.

## Objectives

- Student should be able to create a unique, high-quality project that
  can be added to a professional portfolio
- [Student should be able to describe the rules of Conway’s “Game of
  Life”](objectives/rules-game-life)
- [Student should be able to explain what cellular automata are and
  describe how they are useful in real
  life](objectives/explain-describe-ca)
- [Student should be able to correctly analyze the ‘Turing Completeness’
  of Conway’s “Game of Life”](objectives/turing-complete)
- Student should be able to implement a visualization of Conway’s “Game
  of Life” using technologies related to their specific
  track.
- [Student should be able to utilize "double buffering" to implement
  the game](objectives/double-buffer)

## MVP Features

### Preliminary Work

- Research Conway’s "Game of Life". Figure out how it works, why it’s
  useful, and how the notion of Turing Completeness is related to this
  topic.

### Building Your App

#### Visualizing the "Game of Life"

The main entry point of your application should house the visualization
of this cellular automaton. Include necessary components, such as:

- Grid to display cells.
- Cell objects or components that, at a minimum, should have:
  - Properties
    - current state: (alive, dead), (black, white)
    - Clickable/Tappable:
      - can be clicked to allow user to setup initial cell configuration
      - should NOT be clickable while simulation is running
    - Behaviors
      - Toggle state functionality: switch between alive & dead either
        because user manually toggled cell before starting simulation or
        simulation is running and rules of life caused cell to change
        state
- An appropriate data structure to hold a grid of cells that is at least
  25x25. Go as big as you want.
- Text to display current generation # being displayed
  - Utilize a timeout function to build the next generation of cells &
    update the display at the chosen time interval
- Button(s) that start & stop the animation
- Button to clear the grid
