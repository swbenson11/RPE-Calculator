# RPE Calculator

Project for learning Redux. Weightlifting set calculator. Takes in a weight and effort value (RPE) to calculate remaining sets.

Rpe is "Rate of Perceived Exertion", it's a tool for measuring effort in a set. If you feel you could do 1 more rep in a set it was an RPE of 9. If you have 2 left, that denotes an RPE of 8. This metric is pretty important in moderating training (specifically for compound lifts). The general idea is to maintain a RPE of 8-9 throughout the majority of your working sets. I set out to make a calculator that could tell me what my next set's weight should be given a target RPE.

Because of the many factors of the calculation I thought this project would make for a good opportunity to experiment with different JavaScript concepts I had been reading about. The calculation logic can be found in src/activities. This includes some tests, and a bunch of comments on my thoughts so a potential employer would be able to take a look.

For an example of me trying to develop a beautiful UI, check out [https://github.com/swbenson11/UI-and-svelt-demo](https://github.com/swbenson11/RPE-Calculator).

### Goals of project

- Working RPE calculator
- Demonstrate that I can in fact do "code"
- Learn Redux
- Experiment with functional programming in the calculation
