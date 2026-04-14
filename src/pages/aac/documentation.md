# Allied Work Documentation

Use this documentation to understand the various projects and components under the Allied Work umbrella, from the coding editor to the AutoCorrection function.

## Allied Work
Allied Work allows users to see where their robots will go on the game mat with the built-in visualizer. This is very helpful because many times teams are using trial and error to reach their desired location on the game mat. Not only can teams do this, but they can also code with ease. 

The Allied Workspace allows users to code in its native language called Allied Work. Allied Work is made to be simple so everybody can code their robot. When you are done coding your path, you can press the run button to see the path of the robot, then copy the Python code from the built-in Python generator.

## Allied AutoCorrection Blocks
Allied AutoCorrection is a beautiful and helpful function for all FLL teams. The function provides precision while running code. Imagine you are walking straight and you trip. Now you will get back in the same line you were walking in, and walk until you reach your final destination. Allied AutoCorrection is here to help the robot do the same.

One of the sensors used is the gyro sensor. A gyro sensor helps track the robot's pitch, yaw, and roll. The code essentially checks if the robot’s current yaw or heading is within a range of 5 degrees from the target. 

* **If Heading > Target:** The robot turns left until it is within range.
* **If Heading < Target:** The robot turns right until it reaches that range.

> **Note:** The code can be modified to run faster; however, increasing the speed often requires a larger acceptable range, while a smaller range typically demands more time.

## How they are related
You may be asking how an autocorrection software and an auto correction function are related. Well, in the Allied Work editor whenever you code a command for movement such as drive, it takes the Allied AutoCorrection function and uses it to give accurate movements. This synergy ensures that the visual path you plot matches the physical execution.

## How Does Allied AutoCorrection Work?
Allied AutoCorrection works by continuously monitoring the robot's orientation and position using sensors, primarily the gyro sensor. If the robot deviates from its intended path or heading, the system automatically calculates the necessary corrections and adjusts the motor outputs to bring the robot back on track.

### Multi-Sensor Fusion
Beyond the gyro sensor, Allied AutoCorrection can integrate data from:
* **Wheel Encoders:** To measure distance traveled and calculate $(x, y)$ coordinates.
* **Color Sensors:** To detect lines on the game mat and reset error accumulation.

The core of the auto-correction mechanism involves a **PID (Proportional-Integral-Derivative) controller**. This controller takes the error (the difference between the desired state and the actual state) and calculates an output to minimize that error.

## Benefits & Impact
The combination of Allied Work's intuitive coding environment and Allied AutoCorrection's precision offers significant benefits:

* **Learning Curve:** Drastically reduces the barrier for new team members.
* **Competition Performance:** Empowers teams to achieve higher scores by ensuring consistent, accurate robot movements.
* **Reliability:** Minimizes errors that lead to missed mission objectives, allowing focus on strategy.

## Future Enhancements
Future enhancements for Allied Work could include:
1. **Advanced Path Planning:** Dynamic obstacle avoidance.
2. **Vision Systems:** Integration for object recognition.
3. **Machine Learning:** Auto-tuning PID parameters based on previous run data.

## Community and Support
Building a strong community around Allied Work is essential. We provide forums, tutorials, and examples to empower users. Our dedicated support channel ensures teams receive timely assistance with calibration and implementation challenges.
